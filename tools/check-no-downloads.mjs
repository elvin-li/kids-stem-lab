#!/usr/bin/env node
/**
 * 门禁工具不得往用户的下载目录写文件（静态判定，不启浏览器）
 *
 *   node tools/check-no-downloads.mjs
 *
 * 这道审计挡的是一类没人会当成 bug、但真实污染了用户机器的问题。
 *
 * 起因：`check-privacy.mjs` 为了验「关闭联网时不得有请求离开设备」，会逐个点击
 * 每一页上可见的 button；`verify.mjs` 和两套 E2E 也会点操作路径。这些点击里
 * 就包含「保存图片」「导出 JSON」「导出代码」这类导出控件，而 Chrome 的默认
 * 行为是把文件真的存进 ~/Downloads。跑一轮门禁多十几个文件，累积到过 302 个
 * （doodle-pad 的画 91 张、symmetry 的对称作品 57 张、足迹 JSON 53 个、
 * turtle 代码 52 个、评估 txt 49 个），文件名后面挂着 (1)…(55) 的序号。
 *
 * 这件事没有任何门禁看得见：所有审计都是绿的，因为落盘不影响任何断言。
 * 只有用户打开自己的下载目录才会发现。所以判定放在这里：
 *
 *   凡是自己启动 Chrome 的工具（静态参数里出现 --remote-debugging-port），
 *   都必须先取得共享 Chrome lease，并统一通过 chrome-lifecycle 启停；会点击页面
 *   的工具还必须在创建首个 target 前 fail-closed 地禁止浏览器下载。
 *
 * 为什么是 deny 而不是「审计时跳过导出按钮」：点导出这条路径本身就是要审计的
 * 对象——它会不会抛异常、会不会顺手把数据发到外部主机，都得真点下去才知道。
 * deny 只掐掉最后那步落盘，判定一点不少。
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TOOLS = fileURLToPath(new URL('.', import.meta.url)).replace(/\/$/, '');

/* 没有豁免。截图产物走 CDP + Node fs，和浏览器下载是两条路；截图工具同样能注入
   页面 JS 或点击导出控件，所以 lifecycle、lease 和 deny 对所有 launcher 一律强制。 */
const ALLOW = new Map();

/* 只实现本门禁需要的 JavaScript 词法层：注释和 regex 整体跳过，字符串/模板文本
   保留为 literal token，`${ ... }` 则递归回到代码模式。这样文本不能冒充调用，
   template interpolation 里的真实调用又不会被误删。 */
function tokenize(source) {
  const tokens = [];
  let index = 0;

  const push = (type, value, start, end = index) => {
    tokens.push({ type, value, start, end });
  };

  const escapeValue = (char) => ({
    n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', v: '\v', 0: '\0'
  })[char] ?? char;

  function readQuoted(quote) {
    const start = index;
    let value = '';
    index += 1;
    while (index < source.length) {
      const char = source[index];
      if (char === quote) {
        index += 1;
        push('string', value, start);
        return;
      }
      if (char === '\\') {
        if (index + 1 >= source.length) { index += 1; break; }
        const next = source[index + 1];
        if (next === '\n') { index += 2; continue; }
        if (next === '\r') {
          index += source[index + 2] === '\n' ? 3 : 2;
          continue;
        }
        value += escapeValue(next);
        index += 2;
        continue;
      }
      value += char;
      index += 1;
    }
    push('string', value, start);
  }

  function regexMayStart() {
    const previous = tokens[tokens.length - 1];
    if (!previous) return true;
    if (['string', 'number', 'regex', 'templateEnd'].includes(previous.type)) return false;
    if (previous.type === 'word') {
      return /^(?:await|case|delete|else|in|instanceof|new|of|return|throw|typeof|void|yield)$/.test(previous.value);
    }
    return ![')', ']', '}', '++', '--'].includes(previous.value);
  }

  function readRegex() {
    const start = index;
    let escaped = false;
    let inClass = false;
    index += 1;
    while (index < source.length) {
      const char = source[index];
      if (char === '\n' || char === '\r') break;
      index += 1;
      if (escaped) { escaped = false; continue; }
      if (char === '\\') { escaped = true; continue; }
      if (char === '[') { inClass = true; continue; }
      if (char === ']') { inClass = false; continue; }
      if (char === '/' && !inClass) break;
    }
    while (index < source.length && /[A-Za-z]/.test(source[index])) index += 1;
    push('regex', source.slice(start, index), start);
  }

  function readTemplate() {
    const start = index;
    push('templateStart', '`', start, start + 1);
    index += 1;
    let chunkStart = index;
    let value = '';

    const flush = () => {
      if (index > chunkStart) push('templateChunk', value, chunkStart, index);
      value = '';
    };

    while (index < source.length) {
      const char = source[index];
      if (char === '\\') {
        if (index + 1 >= source.length) { value += char; index += 1; continue; }
        const next = source[index + 1];
        if (next === '\n') { index += 2; continue; }
        if (next === '\r') {
          index += source[index + 2] === '\n' ? 3 : 2;
          continue;
        }
        value += escapeValue(next);
        index += 2;
        continue;
      }
      if (char === '`') {
        flush();
        const endStart = index;
        index += 1;
        push('templateEnd', '`', endStart);
        return;
      }
      if (char === '$' && source[index + 1] === '{') {
        flush();
        const expressionStart = index;
        index += 2;
        push('templateExprStart', '${', expressionStart, index);
        scanCode(true);
        chunkStart = index;
        continue;
      }
      value += char;
      index += 1;
    }
    flush();
  }

  function scanCode(stopAtTemplateBrace = false) {
    let braceDepth = 0;
    while (index < source.length) {
      const char = source[index];
      const next = source[index + 1];

      if (stopAtTemplateBrace && char === '}' && braceDepth === 0) {
        const start = index;
        index += 1;
        push('templateExprEnd', '}', start);
        return;
      }
      if (/\s/.test(char)) { index += 1; continue; }
      if (char === '/' && next === '/') {
        index += 2;
        while (index < source.length && source[index] !== '\n') index += 1;
        continue;
      }
      if (char === '/' && next === '*') {
        index += 2;
        while (index < source.length && !(source[index] === '*' && source[index + 1] === '/')) index += 1;
        if (index < source.length) index += 2;
        continue;
      }
      if (char === "'" || char === '"') { readQuoted(char); continue; }
      if (char === '`') { readTemplate(); continue; }
      if (char === '/' && regexMayStart()) { readRegex(); continue; }
      if (/[A-Za-z_$]/.test(char)) {
        const start = index;
        index += 1;
        while (index < source.length && /[\w$]/.test(source[index])) index += 1;
        push('word', source.slice(start, index), start);
        continue;
      }
      if (/\d/.test(char)) {
        const start = index;
        index += 1;
        while (index < source.length && /[\w.]/.test(source[index])) index += 1;
        push('number', source.slice(start, index), start);
        continue;
      }

      const start = index;
      const punctuator = ['===', '!==', '>>>', '**=', '=>', '==', '!=', '<=', '>=', '&&', '||',
        '??', '?.', '++', '--', '**', '...', '+=', '-=', '*=', '/=', '%=', '<<', '>>']
        .find((candidate) => source.startsWith(candidate, index)) || char;
      index += punctuator.length;
      push('punct', punctuator, start);
      if (stopAtTemplateBrace) {
        if (punctuator === '{') braceDepth += 1;
        else if (punctuator === '}') braceDepth -= 1;
      }
    }
  }

  scanCode();
  return tokens;
}

function pairTokens(tokens) {
  const pairs = new Map();
  const reverse = new Map();
  const stack = [];
  const wanted = { ')': '(', ']': '[', '}': '{' };
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (['(', '[', '{'].includes(token.value) || token.type === 'templateExprStart') {
      stack.push(index);
      continue;
    }
    const expected = token.type === 'templateExprEnd' ? '${' : wanted[token.value];
    if (!expected) continue;
    const open = stack.pop();
    if (open === undefined || tokens[open].value !== expected) continue;
    pairs.set(open, index);
    reverse.set(index, open);
  }
  return { pairs, reverse };
}

function staticLiteral(tokens, pairs, start, end) {
  while (start <= end && tokens[start]?.value === '(' && pairs.get(start) === end) {
    start += 1;
    end -= 1;
  }
  if (start === end && tokens[start]?.type === 'string') return tokens[start].value;
  if (tokens[start]?.type !== 'templateStart' || tokens[end]?.type !== 'templateEnd') return null;
  let value = '';
  for (let index = start + 1; index < end; index += 1) {
    if (tokens[index].type !== 'templateChunk') return null;
    value += tokens[index].value;
  }
  return value;
}

function parseImports(tokens, pairs) {
  const imports = [];
  for (let index = 0; index < tokens.length; index += 1) {
    if (tokens[index].value !== 'import' || tokens[index + 1]?.value === '(') continue;
    const record = { source: '', named: new Map(), namespace: '', defaultLocal: '' };
    let cursor = index + 1;

    if (tokens[cursor]?.type === 'word') {
      record.defaultLocal = tokens[cursor].value;
      cursor += tokens[cursor + 1]?.value === ',' ? 2 : 1;
    }
    if (tokens[cursor]?.value === '{') {
      const close = pairs.get(cursor);
      if (close === undefined) continue;
      for (let item = cursor + 1; item < close;) {
        if (tokens[item].type !== 'word') { item += 1; continue; }
        const imported = tokens[item].value;
        let local = imported;
        if (tokens[item + 1]?.value === 'as' && tokens[item + 2]?.type === 'word') {
          local = tokens[item + 2].value;
          item += 3;
        } else item += 1;
        record.named.set(imported, local);
        while (item < close && tokens[item].value !== ',') item += 1;
        if (tokens[item]?.value === ',') item += 1;
      }
      cursor = close + 1;
    } else if (tokens[cursor]?.value === '*' && tokens[cursor + 1]?.value === 'as') {
      record.namespace = tokens[cursor + 2]?.value || '';
      cursor += 3;
    }
    while (cursor < tokens.length && tokens[cursor].value !== 'from' && tokens[cursor].value !== ';') cursor += 1;
    if (tokens[cursor]?.value !== 'from' || tokens[cursor + 1]?.type !== 'string') continue;
    record.source = tokens[cursor + 1].value;
    imports.push(record);
    index = cursor + 1;
  }
  return imports;
}

function parseDefinitions(tokens, pairs, reverse) {
  const definitions = [];
  const parameterOpens = new Set();
  const classes = [];

  for (let index = 0; index < tokens.length; index += 1) {
    if (tokens[index].value === 'class' && tokens[index + 1]?.type === 'word') {
      let bodyOpen = index + 2;
      while (bodyOpen < tokens.length && tokens[bodyOpen].value !== '{') bodyOpen += 1;
      const bodyClose = pairs.get(bodyOpen);
      if (bodyClose !== undefined) classes.push({ name: tokens[index + 1].value, bodyOpen, bodyClose });
    }
    if (tokens[index].value !== 'function') continue;
    let cursor = index + 1;
    if (tokens[cursor]?.value === '*') cursor += 1;
    const name = tokens[cursor]?.type === 'word' ? tokens[cursor++].value : '';
    if (tokens[cursor]?.value !== '(') continue;
    const paramsOpen = cursor;
    const paramsClose = pairs.get(paramsOpen);
    const bodyOpen = paramsClose === undefined ? undefined : paramsClose + 1;
    const bodyClose = bodyOpen === undefined ? undefined : pairs.get(bodyOpen);
    if (tokens[bodyOpen]?.value !== '{' || bodyClose === undefined) continue;
    parameterOpens.add(paramsOpen);
    definitions.push({ kind: 'function', name, key: name, start: index, paramsOpen, paramsClose, bodyOpen, bodyClose });
  }

  for (const owner of classes) {
    for (let index = owner.bodyOpen + 1; index < owner.bodyClose;) {
      if (tokens[index].value === '{' && pairs.has(index)) { index = pairs.get(index) + 1; continue; }
      let cursor = index;
      while (['static', 'async', 'get', 'set', '*'].includes(tokens[cursor]?.value)) cursor += 1;
      const method = tokens[cursor]?.type === 'word' ? tokens[cursor].value : '';
      const paramsOpen = cursor + 1;
      const paramsClose = tokens[paramsOpen]?.value === '(' ? pairs.get(paramsOpen) : undefined;
      const bodyOpen = paramsClose === undefined ? undefined : paramsClose + 1;
      const bodyClose = bodyOpen === undefined ? undefined : pairs.get(bodyOpen);
      if (method && tokens[bodyOpen]?.value === '{' && bodyClose !== undefined) {
        parameterOpens.add(paramsOpen);
        definitions.push({
          kind: 'method', name: method, key: `${owner.name}.${method}`, start: index,
          paramsOpen, paramsClose, bodyOpen, bodyClose
        });
        index = bodyClose + 1;
      } else index += 1;
    }
  }

  for (let index = 0; index < tokens.length; index += 1) {
    if (tokens[index].value !== '=>') continue;
    let paramsOpen = -1;
    let paramsClose = index - 1;
    let start = index - 1;
    if (tokens[paramsClose]?.value === ')') {
      paramsOpen = reverse.get(paramsClose) ?? -1;
      start = paramsOpen;
    }
    if (tokens[start - 1]?.value === 'async') start -= 1;
    const bodyOpen = index + 1;
    const bodyClose = tokens[bodyOpen]?.value === '{' ? pairs.get(bodyOpen) : undefined;
    if (bodyClose === undefined) continue;
    if (paramsOpen >= 0) parameterOpens.add(paramsOpen);
    let name = '';
    if (tokens[start - 1]?.value === '=' && tokens[start - 2]?.type === 'word') name = tokens[start - 2].value;
    definitions.push({
      kind: 'arrow', name, key: name, start, paramsOpen, paramsClose,
      singleParam: paramsOpen < 0 && tokens[index - 1]?.type === 'word' ? tokens[index - 1].value : '',
      bodyOpen, bodyClose
    });
  }

  for (const definition of definitions) {
    definition.parent = definitions
      .filter((candidate) => candidate !== definition
        && candidate.bodyOpen < definition.start && definition.bodyClose < candidate.bodyClose)
      .sort((a, b) => (a.bodyClose - a.bodyOpen) - (b.bodyClose - b.bodyOpen))[0] || null;
    const params = [];
    if (definition.paramsOpen >= 0) {
      for (let index = definition.paramsOpen + 1; index < definition.paramsClose; index += 1) {
        if (tokens[index].type === 'word'
          && !['this', 'true', 'false', 'null', 'undefined'].includes(tokens[index].value)
          && tokens[index - 1]?.value !== '.') params.push(tokens[index].value);
      }
    } else if (definition.singleParam) params.push(definition.singleParam);
    definition.params = params;
  }

  return { definitions, parameterOpens };
}

function splitArguments(tokens, pairs, open, close) {
  const ranges = [];
  let start = open + 1;
  let index = start;
  while (index < close) {
    if (['(', '[', '{'].includes(tokens[index].value) || tokens[index].type === 'templateExprStart') {
      const paired = pairs.get(index);
      if (paired !== undefined) { index = paired + 1; continue; }
    }
    if (tokens[index].value === ',') {
      if (start <= index - 1) ranges.push([start, index - 1]);
      start = index + 1;
    }
    index += 1;
  }
  if (start <= close - 1) ranges.push([start, close - 1]);
  return ranges;
}

function parseCalls(tokens, pairs, reverse, definitions, parameterOpens) {
  const calls = [];
  const controls = new Set(['catch', 'for', 'if', 'import', 'switch', 'while', 'with']);

  const containingDefinition = (tokenIndex) => definitions
    .filter((definition) => definition.bodyOpen < tokenIndex && tokenIndex < definition.bodyClose)
    .sort((a, b) => (a.bodyClose - a.bodyOpen) - (b.bodyClose - b.bodyOpen))[0] || null;

  for (let open = 0; open < tokens.length; open += 1) {
    if (tokens[open].value !== '(' || parameterOpens.has(open)) continue;
    const close = pairs.get(open);
    if (close === undefined) continue;
    const previous = open - 1;
    let calleeStart = previous;
    let simpleName = '';
    let objectName = '';
    let fullName = '';
    let iife = null;

    if (tokens[previous]?.type === 'word') {
      simpleName = tokens[previous].value;
      if (controls.has(simpleName)) continue;
      if (tokens[previous - 1]?.value === '.' || tokens[previous - 1]?.value === '?.') {
        objectName = tokens[previous - 2]?.type === 'word' ? tokens[previous - 2].value : '';
        calleeStart = previous - 2;
      }
      fullName = objectName ? `${objectName}.${simpleName}` : simpleName;
    } else if (tokens[previous]?.value === '}' || tokens[previous]?.value === ')') {
      let lower = previous;
      if (tokens[previous].value === ')') lower = reverse.get(previous) ?? previous;
      iife = definitions
        .filter((definition) => definition.kind === 'arrow'
          && lower < definition.start && definition.bodyClose < previous)
        .sort((a, b) => b.start - a.start)[0] || null;
      if (!iife && tokens[previous].value === '}') {
        iife = definitions.find((definition) => definition.kind === 'arrow' && definition.bodyClose === previous) || null;
      }
      if (!iife) continue;
      calleeStart = lower;
      fullName = '<iife>';
    } else continue;

    const awaited = tokens[calleeStart - 1]?.value === 'await';
    const call = {
      open, close, calleeStart, simpleName, objectName, fullName, iife, awaited,
      start: tokens[calleeStart].start,
      end: tokens[close].end,
      context: containingDefinition(calleeStart),
      args: splitArguments(tokens, pairs, open, close)
    };
    call.promiseCaught = tokens[close + 1]?.value === '.'
      && tokens[close + 2]?.value === 'catch'
      && tokens[close + 3]?.value === '(';
    calls.push(call);
  }
  return calls;
}

function structuralRanges(tokens, pairs) {
  const falseRanges = [];
  const caughtRanges = [];

  for (let index = 0; index < tokens.length; index += 1) {
    if (tokens[index].value === 'if' && tokens[index + 1]?.value === '(') {
      const conditionClose = pairs.get(index + 1);
      const condition = conditionClose === index + 3 ? tokens[index + 2] : null;
      const falsy = condition && ((condition.type === 'word'
        && ['false', 'null', 'undefined'].includes(condition.value))
        || (condition.type === 'number' && /^0(?:[box]0+|\.0*)?$/i.test(condition.value)));
      if (falsy) {
        const consequent = conditionClose + 1;
        if (tokens[consequent]?.value === '{' && pairs.has(consequent)) {
          falseRanges.push([consequent + 1, pairs.get(consequent) - 1]);
        } else {
          let end = consequent;
          while (end < tokens.length && tokens[end].value !== ';') end += 1;
          falseRanges.push([consequent, end]);
        }
      }
    }

    if (tokens[index].value === 'try' && tokens[index + 1]?.value === '{') {
      const bodyClose = pairs.get(index + 1);
      if (bodyClose !== undefined && tokens[bodyClose + 1]?.value === 'catch') {
        let catchBody = bodyClose + 2;
        if (tokens[catchBody]?.value === '(' && pairs.has(catchBody)) catchBody = pairs.get(catchBody) + 1;
        const catchClose = tokens[catchBody]?.value === '{' ? pairs.get(catchBody) : undefined;
        let failClosed = false;
        for (let cursor = catchBody + 1; catchClose !== undefined && cursor < catchClose; cursor += 1) {
          if (tokens[cursor].value === 'throw') { failClosed = true; break; }
          if (tokens[cursor].value === 'process' && tokens[cursor + 1]?.value === '.') {
            const member = tokens[cursor + 2]?.value;
            if (member === 'exit' && tokens[cursor + 3]?.value === '(') { failClosed = true; break; }
            if (member === 'exitCode' && tokens[cursor + 3]?.value === '='
              && tokens[cursor + 4]?.type === 'number' && !/^0(?:\.0*)?$/.test(tokens[cursor + 4].value)) {
              failClosed = true;
              break;
            }
          }
        }
        /* 空 catch / 只记录日志仍会把 guard 失败变成成功路径；显式 throw/exit/nonzero
           exitCode 则让工具整体失败，art-shot 的顶层错误边界属于后一种。 */
        if (!failClosed) caughtRanges.push([index + 2, bodyClose - 1]);
      }
    }
  }
  return { falseRanges, caughtRanges };
}

function inRanges(index, ranges) {
  return ranges.some(([start, end]) => start <= index && index <= end);
}

function hasDenyProperty(tokens, pairs, range) {
  if (!range) return false;
  let [start, end] = range;
  if (tokens[start]?.value !== '{' || pairs.get(start) !== end) return false;
  for (let index = start + 1; index < end; index += 1) {
    if (['(', '[', '{'].includes(tokens[index].value) || tokens[index].type === 'templateExprStart') {
      const close = pairs.get(index);
      if (close !== undefined) { index = close; continue; }
    }
    const key = tokens[index].type === 'word' ? tokens[index].value
      : staticLiteral(tokens, pairs, index, index);
    if (key !== 'behavior' || tokens[index + 1]?.value !== ':') continue;
    return staticLiteral(tokens, pairs, index + 2, index + 2) === 'deny';
  }
  return false;
}

function callMethod(tokens, pairs, call) {
  if (call.simpleName !== 'send' || !call.args.length) return null;
  return staticLiteral(tokens, pairs, ...call.args[0]);
}

function comparePaths(left, right) {
  const length = Math.min(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return left.length - right.length;
}

function analyzeFile(source) {
  const tokens = tokenize(source);
  const { pairs, reverse } = pairTokens(tokens);
  const imports = parseImports(tokens, pairs);
  const { definitions, parameterOpens } = parseDefinitions(tokens, pairs, reverse);
  const calls = parseCalls(tokens, pairs, reverse, definitions, parameterOpens);
  const { falseRanges, caughtRanges } = structuralRanges(tokens, pairs);

  const debugTokens = tokens.filter((token) => ['string', 'templateChunk'].includes(token.type)
    && token.value.includes('--remote-debugging-port'));
  const firstDebugIndex = debugTokens.length ? Math.min(...debugTokens.map((token) => token.start)) : -1;

  const namedDefinitions = new Map();
  for (const definition of definitions) {
    if (!definition.key) continue;
    if (!namedDefinitions.has(definition.key)) namedDefinitions.set(definition.key, []);
    namedDefinitions.get(definition.key).push(definition);
  }
  const callsByContext = new Map();
  for (const call of calls) {
    const key = call.context || null;
    if (!callsByContext.has(key)) callsByContext.set(key, []);
    callsByContext.get(key).push(call);
  }
  for (const contextCalls of callsByContext.values()) contextCalls.sort((a, b) => a.start - b.start);

  const resolveDefinition = (call) => {
    if (call.iife) return call.iife;
    const exact = namedDefinitions.get(call.fullName);
    if (exact?.length) return exact[0];
    if (!call.objectName) return namedDefinitions.get(call.simpleName)?.[0] || null;
    return null;
  };
  const callbackForRange = ([start, end]) => definitions
    .filter((definition) => start <= definition.start && definition.bodyClose <= end)
    .sort((a, b) => (a.bodyClose - a.start) - (b.bodyClose - b.start))[0] || null;

  const guardCalls = calls.filter((call) => call.awaited && !call.promiseCaught
    && callMethod(tokens, pairs, call) === 'Browser.setDownloadBehavior'
    && hasDenyProperty(tokens, pairs, call.args[1]));
  const targetCalls = calls.filter((call) => callMethod(tokens, pairs, call) === 'Target.createTarget');
  const reachable = [];
  const guardEvents = [];
  const targetEvents = [];

  function walk(context, path, bindings, stack, inheritedCaught = false) {
    for (const call of callsByContext.get(context) || []) {
      if (inRanges(call.calleeStart, falseRanges)) continue;
      const eventPath = [...path, call.start];
      const caught = inheritedCaught || inRanges(call.calleeStart, caughtRanges);
      reachable.push({ call, path: eventPath, caught });
      if (guardCalls.includes(call)) guardEvents.push({ call, path: eventPath, caught });
      if (targetCalls.includes(call)) targetEvents.push({ call, path: eventPath });

      let child = bindings.get(call.simpleName) || resolveDefinition(call);
      if (!child || stack.has(child)) continue;
      const childBindings = new Map();
      for (let index = 0; index < child.params.length && index < call.args.length; index += 1) {
        const callback = callbackForRange(call.args[index]);
        if (callback) childBindings.set(child.params[index], callback);
      }
      walk(child, eventPath, childBindings, new Set([...stack, child]), caught);
    }
  }
  walk(null, [], new Map(), new Set());

  return {
    tokens, pairs, imports, calls, guardCalls, targetCalls, guardEvents, targetEvents, reachable,
    falseRanges, caughtRanges, firstDebugIndex
  };
}

function hasExactNamedImport(imports, source, names) {
  return imports.some((record) => record.source === source
    && names.every((name) => record.named.get(name) === name));
}

function importedLocal(imports, source, imported) {
  return imports.find((record) => record.source === source && record.named.has(imported))?.named.get(imported) || '';
}

function directChildProcessSpawns(analysis) {
  const simple = new Set();
  const namespaces = new Set();
  for (const record of analysis.imports.filter((item) => item.source === 'node:child_process')) {
    if (record.named.has('spawn')) simple.add(record.named.get('spawn'));
    if (record.namespace) namespaces.add(record.namespace);
    if (record.defaultLocal) namespaces.add(record.defaultLocal);
  }
  return analysis.calls.filter((call) => (!call.objectName && simple.has(call.simpleName))
    || (call.simpleName === 'spawn' && namespaces.has(call.objectName)));
}

const names = (await readdir(TOOLS)).filter((name) => name.endsWith('.mjs')).sort();
const missing = [];
const ok = [];
const allowed = [];
const staleAllow = new Set(ALLOW.keys());
const SELF = 'check-no-downloads.mjs';

let launcherCount = 0;
for (const name of names) {
  if (name === SELF) continue;
  const raw = await readFile(join(TOOLS, name), 'utf8');
  const analysis = analyzeFile(raw);
  if (analysis.firstDebugIndex < 0) continue;

  launcherCount += 1;
  if (ALLOW.has(name)) staleAllow.delete(name);

  const leaseImported = hasExactNamedImport(analysis.imports, './chrome-lease.mjs', ['acquireChromeLease']);
  const lifecycleImported = hasExactNamedImport(
    analysis.imports, './chrome-lifecycle.mjs', ['spawnChrome', 'stopChrome']
  );
  const leaseName = importedLocal(analysis.imports, './chrome-lease.mjs', 'acquireChromeLease');
  const spawnName = importedLocal(analysis.imports, './chrome-lifecycle.mjs', 'spawnChrome');
  const stopName = importedLocal(analysis.imports, './chrome-lifecycle.mjs', 'stopChrome');
  const leaseCalls = analysis.calls.filter((call) => !call.objectName && call.simpleName === leaseName && call.awaited);
  const spawnCalls = analysis.calls.filter((call) => !call.objectName && call.simpleName === spawnName && call.awaited);
  const stopCalls = analysis.calls.filter((call) => !call.objectName && call.simpleName === stopName && call.awaited);
  const reachableCalls = new Set(analysis.reachable.map((event) => event.call));

  if (!leaseImported) {
    missing.push(`${name}: 缺少 acquireChromeLease 的可执行 import`);
    continue;
  }
  if (!lifecycleImported) {
    missing.push(`${name}: 缺少可执行 import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs'`);
    continue;
  }
  if (directChildProcessSpawns(analysis).length) {
    missing.push(`${name}: 禁止直接调用 node:child_process spawn；必须使用 spawnChrome()`);
    continue;
  }
  if (!leaseCalls.length) {
    missing.push(`${name}: 缺少可执行且受 await 的 acquireChromeLease()`);
    continue;
  }
  if (Math.min(...leaseCalls.map((call) => call.start)) > analysis.firstDebugIndex) {
    missing.push(`${name}: acquireChromeLease() 晚于首个 --remote-debugging-port，Chrome 可能已启动`);
    continue;
  }
  if (!spawnCalls.length) {
    missing.push(`${name}: 缺少可执行且受 await 的 spawnChrome()`);
    continue;
  }
  if (Math.min(...spawnCalls.map((call) => call.start)) > analysis.firstDebugIndex) {
    missing.push(`${name}: await spawnChrome() 晚于首个 --remote-debugging-port`);
    continue;
  }
  if (!stopCalls.some((call) => reachableCalls.has(call))) {
    missing.push(`${name}: 缺少可达、可执行且受 await 的 stopChrome()`);
    continue;
  }

  /* ALLOW 只可能豁免下载 deny；lease 与进程生命周期永远不能豁免。 */
  if (ALLOW.has(name)) { allowed.push(name); continue; }

  const unreachableGuard = analysis.guardCalls.some((call) => inRanges(call.calleeStart, analysis.falseRanges));
  const swallowedGuard = analysis.guardCalls.some((call) => inRanges(call.calleeStart, analysis.caughtRanges));
  const validGuards = analysis.guardEvents.filter((event) => !event.caught)
    .sort((left, right) => comparePaths(left.path, right.path));
  const reachableTargets = [...analysis.targetEvents].sort((left, right) => comparePaths(left.path, right.path));

  if (!validGuards.length) {
    if (unreachableGuard) missing.push(`${name}: deny guard 位于不可达条件中`);
    else if (swallowedGuard) missing.push(`${name}: deny guard 被 try/catch 包住，失败后可能继续运行`);
    else missing.push(`${name}: 缺少可执行且受 await 的 deny guard（注释、文本、regex、未 await、未调用函数或 .catch() 吞错均不算）`);
  } else if (reachableTargets.length && comparePaths(reachableTargets[0].path, validGuards[0].path) < 0) {
    missing.push(`${name}: deny guard 晚于首个 Target.createTarget，页面可能已触发下载`);
  } else ok.push(name);
}

console.log(`Chrome 启动审计：${launcherCount} 个 direct launcher；${ok.length} 个交互工具通过，${allowed.length} 个例外放行`);
for (const name of ok) console.log(`  ✓ ${name}`);
for (const name of allowed) console.log(`  – ${name}（例外：${ALLOW.get(name)}）`);

let bad = 0;
if (missing.length) {
  bad = 1;
  console.log(`\n✗ ${missing.length} 个工具未满足 Chrome 启动安全要求：`);
  for (const message of missing) console.log(`      ${message}`);
  console.log('\n  每个 direct launcher 必须先执行');
  console.log("      import { acquireChromeLease } from './chrome-lease.mjs';");
  console.log("      import { spawnChrome, stopChrome } from './chrome-lifecycle.mjs';");
  console.log('      await acquireChromeLease();');
  console.log('      const chrome = await spawnChrome(...);');
  console.log('  并在可达的清理路径执行 await stopChrome(chrome)。连接浏览器后、创建 target 前还必须执行');
  console.log("      await client.send('Browser.setDownloadBehavior', { behavior: 'deny' });");
}

if (staleAllow.size) {
  console.log(`\n提示：ALLOW 里有 ${staleAllow.size} 条匹配不到任何 direct launcher，可以删了：`);
  for (const name of staleAllow) console.log(`      ${name}`);
}

if (!bad) console.log('\n  ✓ 所有 direct launcher 均先取得 lease、由 lifecycle 托管，且 fail-closed 禁止下载');
process.exit(bad);
