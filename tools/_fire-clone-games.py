#!/usr/bin/env python3
"""Rewrite leftover plunge clone copy on games/nature from each page's title contrast."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GAMES = ROOT / "games"
NATURE = ROOT / "nature"

KEEP_PLUNGE = {
    "plunge-lab.html",
    "dive-lab.html",
    "sink-lab.html",
    "flap-lab.html",
    "fall-lab.html",
    "soak-lab.html",
}
KEEP_NATURE = {
    "sandgrouse.html",
    "gannets.html",
    "boobies.html",
    "albatross.html",
    "namib-beetles.html",
}


def parse_title(html: str) -> dict[str, str] | None:
    m = re.search(r"<title>([^<]+)</title>", html)
    if not m:
        return None
    part = m.group(1).split("·", 1)[-1].split("|")[0].strip().rstrip("？?")
    m2 = re.search(r"(.+?)才(.+?)，(.+?)就(.+)", part)
    if not m2:
        return None
    return {
        "ok_a": m2.group(1).strip(),
        "ok_r": m2.group(2).strip(),
        "fail_a": m2.group(3).strip(),
        "fail_r": m2.group(4).strip(),
    }


def clip(s: str, n: int) -> str:
    s = s.replace("？", "").replace("?", "")
    return s if len(s) <= n else s[:n]


def rewrite_game(path: Path) -> bool:
    if path.name in KEEP_PLUNGE or path.name == "index.html":
        return False
    t = path.read_text(encoding="utf-8")
    if "拍面" not in t and "不在翅贴进水" not in t and "进不去" not in t and "够贴\":\"太张" not in t:
        return False
    d = parse_title(t)
    if not d:
        return False
    orig = t
    ok_a, ok_r, fail_a, fail_r = d["ok_a"], d["ok_r"], d["fail_a"], d["fail_r"]
    ok_s, fail_s = clip(ok_r, 6), clip(fail_r, 6)
    ok_as, fail_as = clip(ok_a, 4), clip(fail_a, 4)

    t = t.replace("，不在翅贴进水", "")
    t = t.replace("不在翅贴进水", f"不在{fail_a}")

    t = t.replace('data-guess1="no" aria-pressed="false">进不去<', f'data-guess1="no" aria-pressed="false">{fail_s}<')
    t = t.replace("进去了，", f"{ok_s}，")
    t = t.replace("一样进去", f"一样{ok_s}")
    t = t.replace("算进去了吗", f"算{ok_s}了吗")
    t = t.replace("刚好也算进去", f"刚好也算{ok_s}")
    t = t.replace("才算进去", f"才算{ok_s}")
    t = t.replace("就能进去", f"就能{ok_s}")
    t = t.replace("才算进去。", f"才算{ok_s}。")
    t = t.replace("进不去", fail_s)

    t = t.replace('lastOk?"进去了":"拍面了"', f'lastOk?"{ok_s}":"{fail_s}"')
    t = t.replace("lastOk?\"进去了\":\"拍面了\"", f'lastOk?"{ok_s}":"{fail_s}"')
    t = t.replace('lastOk?"进去":"拍面"', f'lastOk?"{ok_s}":"{fail_s}"')
    t = t.replace('lastOk?"够贴":"太张"', f'lastOk?"{ok_as}":"{fail_as}"')

    t = t.replace("进去⇔", f"{ok_s}⇔")
    t = t.replace("，进去了。", f"，{ok_s}。")
    t = t.replace("才算进去。", f"才算{ok_s}。")
    t = t.replace("拍面了", f"{fail_s}")
    t = t.replace(">拍面<", f">{fail_s}<")

    # look-section leftover cap
    t = t.replace('<span class="kid-figure-cap">进去</span>', f'<span class="kid-figure-cap">{ok_s}</span>')

    if t != orig:
        path.write_text(t, encoding="utf-8")
        return True
    return False


def rewrite_nature(path: Path) -> bool:
    if path.name in KEEP_NATURE or path.name == "index.html":
        return False
    t = path.read_text(encoding="utf-8")
    if "进不去" not in t:
        return False
    orig = t
    t = t.replace("进不去", "不是这一招")
    if t != orig:
        path.write_text(t, encoding="utf-8")
        return True
    return False


def main() -> None:
    g = n = 0
    for p in sorted(GAMES.glob("*.html")):
        if rewrite_game(p):
            g += 1
    for p in sorted(NATURE.glob("*.html")):
        if rewrite_nature(p):
            n += 1
    print(f"games rewritten: {g}")
    print(f"nature rewritten: {n}")


if __name__ == "__main__":
    main()
