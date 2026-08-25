#!/usr/bin/env node
/**
 * Count labeled, selectable 图鉴 cards on the pages this expansion targeted.
 * Reads the shipped HTML (not a fixture copy). A card counts if it is a
 * button with class kid-figure, or a button inside a named atlas/figure grid.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');

const TARGETS = [
  { rel: 'nature/plants.html', min: 16, label: '叶子图鉴' },
  { rel: 'nature/birds.html', min: 16, label: '鸟喙图鉴' },
  { rel: 'nature/trees.html', min: 16, label: '树木图鉴' },
  { rel: 'nature/rivers.html', min: 12, label: '河流图鉴' },
  { rel: 'nature/soil.html', min: 12, label: '土壤图鉴' },
  { rel: 'nature/rocks.html', min: 8, label: '岩石图鉴' },
  { rel: 'nature/moon.html', min: 8, label: '月相图鉴' },
  { rel: 'nature/mammals.html', min: 12, label: '哺乳动物图鉴' },
  { rel: 'nature/stars.html', min: 12, label: '星空图鉴' },
  { rel: 'nature/volcano.html', min: 12, label: '火山图鉴' },
  { rel: 'games/color-lab.html', min: 12, label: '颜色图鉴' },
  { rel: 'games/air-lab.html', min: 12, label: '空气图鉴' },
  { rel: 'games/water-cycle.html', min: 12, label: '水循环图鉴' },
  { rel: 'games/chance-jar.html', min: 12, label: '概率图鉴' },
  { rel: 'games/money-lab.html', min: 12, label: '凑钱图鉴' },
  { rel: 'games/graph-lab.html', min: 12, label: '条形图图鉴' },
  { rel: 'games/sort-lab.html', min: 12, label: '排序图鉴' },
  { rel: 'games/balance-lab.html', min: 12, label: '杠杆图鉴' },
  { rel: 'nature/fish.html', min: 12, label: '鱼类图鉴' },
  { rel: 'nature/fungi.html', min: 12, label: '真菌图鉴' },
  { rel: 'nature/senses.html', min: 12, label: '五感图鉴' },
  { rel: 'games/lens-lab.html', min: 12, label: '透镜图鉴' },
  { rel: 'games/pulley-lab.html', min: 12, label: '滑轮图鉴' },
  { rel: 'games/mirror-lab.html', min: 12, label: '镜子图鉴' },
  { rel: 'nature/reptiles.html', min: 12, label: '爬行动物图鉴' },
  { rel: 'nature/habitats.html', min: 12, label: '栖息地图鉴' },
  { rel: 'nature/crystals.html', min: 12, label: '晶体图鉴' },
  { rel: 'games/friction-lab.html', min: 12, label: '摩擦图鉴' },
  { rel: 'games/spring-lab.html', min: 12, label: '弹簧图鉴' },
  { rel: 'games/bounce-lab.html', min: 12, label: '弹性图鉴' },
  { rel: 'nature/amphibians.html', min: 12, label: '两栖图鉴' },
  { rel: 'nature/foodweb.html', min: 12, label: '食物网图鉴' },
  { rel: 'nature/seasons.html', min: 12, label: '四季图鉴' },
  { rel: 'games/static-lab.html', min: 12, label: '静电图鉴' },
  { rel: 'games/spin-lab.html', min: 12, label: '旋转图鉴' },
  { rel: 'games/layer-lab.html', min: 12, label: '分层图鉴' },
  { rel: 'nature/migration.html', min: 12, label: '迁徙图鉴' },
  { rel: 'nature/nests.html', min: 12, label: '巢穴图鉴' },
  { rel: 'nature/teeth.html', min: 12, label: '牙齿图鉴' },
  { rel: 'games/volume-lab.html', min: 12, label: '体积图鉴' },
  { rel: 'games/scale-lab.html', min: 12, label: '天平图鉴' },
  { rel: 'games/echo-lab.html', min: 12, label: '回声图鉴' },
  { rel: 'nature/worms.html', min: 12, label: '蚯蚓图鉴' },
  { rel: 'nature/skeleton.html', min: 12, label: '骨骼图鉴' },
  { rel: 'nature/coral.html', min: 12, label: '珊瑚图鉴' },
  { rel: 'games/filter-lab.html', min: 12, label: '过滤图鉴' },
  { rel: 'games/area-lab.html', min: 12, label: '面积图鉴' },
  { rel: 'games/compass-lab.html', min: 12, label: '指南针图鉴' },
  { rel: 'nature/seeds.html', min: 12, label: '种子图鉴' },
  { rel: 'nature/eyes.html', min: 12, label: '眼睛图鉴' },
  { rel: 'nature/maps.html', min: 12, label: '地图图鉴' },
  { rel: 'games/siphon-lab.html', min: 12, label: '虹吸图鉴' },
  { rel: 'games/code-cards.html', min: 12, label: '指令图鉴' },
  { rel: 'games/thermo-lab.html', min: 12, label: '温度图鉴' },
  { rel: 'nature/digestion.html', min: 12, label: '消化图鉴' },
  { rel: 'games/incline-lab.html', min: 12, label: '斜面图鉴' },
  { rel: 'nature/clouds.html', min: 12, label: '云朵图鉴' },
  { rel: 'games/pendulum-lab.html', min: 12, label: '摆钟图鉴' },
  { rel: 'nature/fossils.html', min: 12, label: '化石图鉴' },
  { rel: 'games/gear-lab.html', min: 12, label: '齿轮图鉴' },
  { rel: 'nature/bees.html', min: 12, label: '蜜蜂图鉴' },
  { rel: 'games/capillary-lab.html', min: 12, label: '毛细图鉴' },
  { rel: 'nature/tides.html', min: 12, label: '潮汐图鉴' },
  { rel: 'games/pressure-lab.html', min: 12, label: '压强图鉴' },
  { rel: 'nature/lungs.html', min: 12, label: '呼吸图鉴' },
  { rel: 'nature/caves.html', min: 12, label: '洞穴图鉴' },
  { rel: 'games/convection-lab.html', min: 12, label: '对流图鉴' },
  { rel: 'nature/glaciers.html', min: 12, label: '冰川图鉴' },
  { rel: 'games/insulation-lab.html', min: 12, label: '保温图鉴' },
  { rel: 'nature/shells.html', min: 12, label: '贝壳图鉴' },
  { rel: 'games/wheel-lab.html', min: 12, label: '轮轴图鉴' },
  { rel: 'nature/feathers.html', min: 12, label: '羽毛图鉴' },
  { rel: 'games/screw-lab.html', min: 12, label: '螺旋图鉴' },
  { rel: 'nature/moss.html', min: 12, label: '苔藓地衣图鉴' },
  { rel: 'games/hydraulic-lab.html', min: 12, label: '液压图鉴' },
  { rel: 'games/dissolve-lab.html', min: 12, label: '溶解图鉴' },
  { rel: 'nature/ants.html', min: 12, label: '蚂蚁图鉴' },
  { rel: 'games/wedge-lab.html', min: 12, label: '楔子图鉴' },
  { rel: 'nature/spiders.html', min: 12, label: '蜘蛛丝图鉴' },
  { rel: 'games/prism-lab.html', min: 12, label: '分光图鉴' },
  { rel: 'nature/rainbow.html', min: 12, label: '彩虹图鉴' },
  { rel: 'games/cam-lab.html', min: 12, label: '凸轮图鉴' },
  { rel: 'nature/snow.html', min: 12, label: '雪图鉴' },
  { rel: 'games/rust-lab.html', min: 12, label: '锈蚀图鉴' },
  { rel: 'nature/frost.html', min: 12, label: '霜雪图鉴' },
  { rel: 'nature/dew.html', min: 12, label: '露水图鉴' },
  { rel: 'games/condense-lab.html', min: 12, label: '凝结图鉴' },
  { rel: 'nature/owls.html', min: 12, label: '猫头鹰图鉴' },
  { rel: 'games/resonance-lab.html', min: 12, label: '共振图鉴' },
  { rel: 'nature/bats.html', min: 12, label: '蝙蝠图鉴' },
  { rel: 'games/doppler-lab.html', min: 12, label: '多普勒图鉴' },
  { rel: 'nature/fireflies.html', min: 12, label: '萤火虫图鉴' },
  { rel: 'games/chemilum-lab.html', min: 12, label: '冷光图鉴' },
  { rel: 'nature/jellyfish.html', min: 12, label: '水母图鉴' },
  { rel: 'games/pulse-lab.html', min: 12, label: '脉冲图鉴' },
  { rel: 'nature/anemones.html', min: 12, label: '海葵图鉴' },
  { rel: 'games/latch-lab.html', min: 12, label: '卡扣图鉴' },
  { rel: 'nature/octopuses.html', min: 12, label: '章鱼图鉴' },
  { rel: 'games/suction-lab.html', min: 12, label: '吸盘图鉴' },
  { rel: 'nature/starfish.html', min: 12, label: '海星图鉴' },
  { rel: 'games/hydrostat-lab.html', min: 12, label: '水囊图鉴' },
  { rel: 'nature/seahorses.html', min: 12, label: '海马图鉴' },
  { rel: 'games/sticky-lab.html', min: 12, label: '贴力图鉴' },
  { rel: 'games/grip-lab.html', min: 12, label: '卷尾图鉴' },
  { rel: 'nature/crabs.html', min: 12, label: '螃蟹图鉴' },
  { rel: 'games/pinch-lab.html', min: 12, label: '钳子图鉴' },
  { rel: 'nature/penguins.html', min: 12, label: '企鹅图鉴' },
  { rel: 'nature/flamingos.html', min: 12, label: '火烈鸟图鉴' },
  { rel: 'games/oil-lab.html', min: 12, label: '油膜图鉴' },
  { rel: 'nature/snails.html', min: 12, label: '蜗牛图鉴' },
  { rel: 'games/slime-lab.html', min: 12, label: '黏液图鉴' },
  { rel: 'nature/lightning.html', min: 12, label: '闪电图鉴' },
  { rel: 'games/spark-lab.html', min: 12, label: '火花图鉴' },
  { rel: 'nature/hail.html', min: 12, label: '冰雹图鉴' },
  { rel: 'games/freeze-lab.html', min: 12, label: '冻结图鉴' },
  { rel: 'nature/whales.html', min: 12, label: '鲸鱼图鉴' },
  { rel: 'games/blowhole-lab.html', min: 12, label: '喷气孔图鉴' },
  { rel: 'nature/beavers.html', min: 12, label: '河狸图鉴' },
  { rel: 'games/dam-lab.html', min: 12, label: '水坝图鉴' },
  { rel: 'nature/dragonflies.html', min: 12, label: '蜻蜓图鉴' },
  { rel: 'games/wing-lab.html', min: 12, label: '翅膀图鉴' },
  { rel: 'nature/butterflies.html', min: 12, label: '蝴蝶图鉴' },
  { rel: 'games/chrysalis-lab.html', min: 12, label: '展翅图鉴' },
  { rel: 'nature/seagrass.html', min: 12, label: '海草图鉴' },
  { rel: 'games/bubble-lab.html', min: 12, label: '气泡图鉴' },
  { rel: 'nature/cicadas.html', min: 12, label: '蝉图鉴' },
  { rel: 'games/molt-lab.html', min: 12, label: '蜕壳图鉴' },
  { rel: 'nature/mangroves.html', min: 12, label: '红树图鉴' },
  { rel: 'games/snorkel-lab.html', min: 12, label: '通气管图鉴' },
  { rel: 'nature/kelp.html', min: 12, label: '海带图鉴' },
  { rel: 'games/holdfast-lab.html', min: 12, label: '固着图鉴' },
  { rel: 'nature/dandelions.html', min: 12, label: '蒲公英图鉴' },
  { rel: 'games/parachute-lab.html', min: 12, label: '降落伞图鉴' },
  { rel: 'nature/otters.html', min: 12, label: '海獭图鉴' },
  { rel: 'games/fur-air.html', min: 12, label: '毛气图鉴' },
  { rel: 'nature/turtles.html', min: 12, label: '龟图鉴' },
  { rel: 'games/dome-shell.html', min: 12, label: '圆顶图鉴' },
  { rel: 'nature/seals.html', min: 12, label: '海豹图鉴' },
  { rel: 'games/blubber-lab.html', min: 12, label: '脂肪图鉴' },
  { rel: 'nature/geckos.html', min: 12, label: '壁虎图鉴' },
  { rel: 'games/setae-lab.html', min: 12, label: '刚毛图鉴' },
  { rel: 'nature/plankton.html', min: 12, label: '浮游图鉴' },
  { rel: 'games/drift-lab.html', min: 12, label: '漂流图鉴' },
  { rel: 'nature/lotus.html', min: 12, label: '荷花图鉴' },
  { rel: 'games/bead-lab.html', min: 12, label: '滚珠图鉴' },
  { rel: 'nature/pinecones.html', min: 12, label: '松果图鉴' },
  { rel: 'games/humidity-lab.html', min: 12, label: '干湿图鉴' },
  { rel: 'nature/tidepools.html', min: 12, label: '潮池图鉴' },
  { rel: 'games/zone-lab.html', min: 12, label: '分区图鉴' },
  { rel: 'nature/sharks.html', min: 12, label: '鲨鱼图鉴' },
  { rel: 'games/denticle-lab.html', min: 12, label: '盾鳞图鉴' },
  { rel: 'nature/eels.html', min: 12, label: '电鳗图鉴' },
  { rel: 'games/amp-lab.html', min: 12, label: '电堆图鉴' },
  { rel: 'nature/cacti.html', min: 12, label: '仙人掌图鉴' },
  { rel: 'games/store-lab.html', min: 12, label: '储水图鉴' },
  { rel: 'nature/crows.html', min: 12, label: '乌鸦图鉴' },
  { rel: 'games/hook-lab.html', min: 12, label: '弯钩图鉴' },
  { rel: 'nature/hummingbirds.html', min: 12, label: '蜂鸟图鉴' },
  { rel: 'games/hover-lab.html', min: 12, label: '悬停图鉴' },
  { rel: 'nature/woodpeckers.html', min: 12, label: '啄木鸟图鉴' },
  { rel: 'games/shock-lab.html', min: 12, label: '减震图鉴' },
  { rel: 'nature/salmons.html', min: 12, label: '鲑鱼图鉴' },
  { rel: 'games/current-lab.html', min: 12, label: '逆流图鉴' },
  { rel: 'nature/chameleons.html', min: 12, label: '变色龙图鉴' },
  { rel: 'games/chroma-lab.html', min: 12, label: '鳞缝图鉴' },
  { rel: 'games/blend-lab.html', min: 12, label: '叠色图鉴' },
  { rel: 'nature/porcupines.html', min: 12, label: '豪猪图鉴' },
  { rel: 'games/quill-lab.html', min: 12, label: '空心刺图鉴' },
  { rel: 'nature/pandas.html', min: 12, label: '熊猫图鉴' },
  { rel: 'games/bamboo-lab.html', min: 12, label: '握竹图鉴' },
  { rel: 'nature/skunks.html', min: 12, label: '臭鼬图鉴' },
  { rel: 'games/spray-lab.html', min: 12, label: '喷雾图鉴' },
  { rel: 'nature/albatross.html', min: 12, label: '信天翁图鉴' },
  { rel: 'games/soar-lab.html', min: 12, label: '借风图鉴' },
  { rel: 'nature/camels.html', min: 12, label: '骆驼图鉴' },
  { rel: 'games/hump-lab.html', min: 12, label: '驼峰图鉴' },
  { rel: 'nature/squids.html', min: 12, label: '乌贼图鉴' },
  { rel: 'games/jet-lab.html', min: 12, label: '反冲图鉴' },
  { rel: 'nature/kingfishers.html', min: 12, label: '翠鸟图鉴' },
  { rel: 'games/dive-lab.html', min: 12, label: '入水图鉴' },
  { rel: 'nature/foxes.html', min: 12, label: '狐狸图鉴' },
  { rel: 'games/pounce-lab.html', min: 12, label: '弹跳图鉴' },
  { rel: 'nature/frogs.html', min: 12, label: '青蛙图鉴' },
  { rel: 'games/jump-lab.html', min: 12, label: '起跳图鉴' },
  { rel: 'nature/giraffes.html', min: 12, label: '长颈鹿图鉴' },
  { rel: 'games/neck-lab.html', min: 12, label: '长颈图鉴' },
  { rel: 'nature/peacocks.html', min: 12, label: '孔雀图鉴' },
  { rel: 'games/fan-lab.html', min: 12, label: '开屏图鉴' }
  ,{ rel: 'nature/armadillos.html', min: 12, label: '犰狳图鉴' },
  { rel: 'games/roll-lab.html', min: 12, label: '蜷球图鉴' }
  ,{ rel: 'nature/elephants.html', min: 12, label: '大象图鉴' },
  { rel: 'games/trunk-lab.html', min: 12, label: '长鼻图鉴' }
  ,{ rel: 'nature/hedgehogs.html', min: 12, label: '刺猬图鉴' },
  { rel: 'games/curl-lab.html', min: 12, label: '蜷刺图鉴' },
  { rel: 'nature/kangaroos.html', min: 16, label: '袋鼠图鉴' },
  { rel: 'games/hop-lab.html', min: 12, label: '回弹图鉴' }
  ,{ rel: 'nature/rhinos.html', min: 12, label: '犀牛图鉴' },
  { rel: 'games/horn-lab.html', min: 12, label: '角质图鉴' }
  ,{ rel: 'nature/hippos.html', min: 16, label: '河马图鉴' },
  { rel: 'games/sink-lab.html', min: 12, label: '沉浮图鉴' }
  ,{ rel: 'nature/sloths.html', min: 12, label: '树懒图鉴' },
  { rel: 'games/hang-lab.html', min: 12, label: '挂钩图鉴' }
  ,{ rel: 'nature/platypuses.html', min: 12, label: '鸭嘴兽图鉴' },
  { rel: 'games/bill-lab.html', min: 12, label: '电喙图鉴' }
  ,{ rel: 'nature/pangolins.html', min: 12, label: '穿山甲图鉴' },
  { rel: 'games/keratin-lab.html', min: 12, label: '叠瓦图鉴' }
  ,{ rel: 'nature/meerkats.html', min: 12, label: '狐獴图鉴' },
  { rel: 'games/sentry-lab.html', min: 12, label: '哨兵图鉴' }
  ,{ rel: 'nature/anteaters.html', min: 12, label: '食蚁兽图鉴' },
  { rel: 'games/tongue-lab.html', min: 12, label: '长舌图鉴' }
  ,{ rel: 'games/stand-lab.html', min: 12, label: '锁膝图鉴' }
  ,{ rel: 'nature/wombats.html', min: 12, label: '袋熊图鉴' },
  { rel: 'games/dig-lab.html', min: 12, label: '方便图鉴' }
  ,{ rel: 'nature/tapirs.html', min: 12, label: '貘图鉴' },
  { rel: 'games/snout-lab.html', min: 12, label: '短吻图鉴' }
  ,{ rel: 'nature/narwhals.html', min: 12, label: '独角鲸图鉴' },
  { rel: 'games/tusk-lab.html', min: 12, label: '牙尖图鉴' }
  ,{ rel: 'nature/aye-ayes.html', min: 12, label: '指狐猴图鉴' },
  { rel: 'games/tap-lab.html', min: 12, label: '敲听图鉴' }
  ,{ rel: 'nature/okapis.html', min: 12, label: '霍加狓图鉴' },
  { rel: 'games/stripe-lab.html', min: 12, label: '后纹图鉴' }
  ,{ rel: 'nature/axolotls.html', min: 12, label: '美西螈图鉴' },
  { rel: 'games/regen-lab.html', min: 12, label: '再长图鉴' }
  ,{ rel: 'nature/cassowaries.html', min: 12, label: '鹤鸵图鉴' },
  { rel: 'games/casque-lab.html', min: 12, label: '盔突图鉴' }
  ,{ rel: 'nature/capybaras.html', min: 12, label: '水豚图鉴' },
  { rel: 'games/wet-lab.html', min: 12, label: '湿岸图鉴' }
  ,{ rel: 'nature/manatees.html', min: 12, label: '海牛图鉴' },
  { rel: 'games/ballast-lab.html', min: 12, label: '压载图鉴' }
  ,{ rel: 'nature/kiwis.html', min: 12, label: '几维鸟图鉴' },
  { rel: 'games/nare-lab.html', min: 12, label: '喙尖图鉴' }
  ,{ rel: 'nature/tuataras.html', min: 12, label: '楔齿蜥图鉴' },
  { rel: 'games/parietal-lab.html', min: 12, label: '顶眼光图鉴' }
  ,{ rel: 'nature/puffins.html', min: 12, label: '海鹦图鉴' },
  { rel: 'games/carry-lab.html', min: 12, label: '叼鱼图鉴' }
  ,{ rel: 'nature/walrus.html', min: 12, label: '海象图鉴' },
  { rel: 'games/whisker-lab.html', min: 12, label: '触须图鉴' }
  ,{ rel: 'nature/lyrebirds.html', min: 12, label: '琴鸟图鉴' },
  { rel: 'games/mimic-lab.html', min: 12, label: '学声图鉴' }
  ,{ rel: 'nature/muskoxen.html', min: 12, label: '麝牛图鉴' },
  { rel: 'games/huddle-lab.html', min: 12, label: '挤圈图鉴' }
];

function countArrayObjects(html, name) {
  const hit = html.match(new RegExp('(?:var|const|let)\\s+' + name + '\\s*=\\s*\\['));
  if (!hit) return 0;
  const start = html.indexOf(hit[0]);
  const open = html.indexOf('[', start);
  let depth = 0;
  let end = -1;
  for (let i = open; i < html.length; i += 1) {
    const ch = html[i];
    if (ch === '[') depth += 1;
    else if (ch === ']') {
      depth -= 1;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end < 0) return 0;
  return (html.slice(open, end + 1).match(/\{\s*id\s*:/g) || []).length;
}

function countCards(html) {
  const staticBtns = [...html.matchAll(/<button\b[^>]*\bclass=["'][^"']*\bkid-figure\b[^"']*["']/gi)].length;
  const catalog = Math.max(
    countArrayObjects(html, 'LEAVES'),
    countArrayObjects(html, 'BIRDS'),
    countArrayObjects(html, 'PHASES')
  );
  return Math.max(staticBtns, catalog);
}

const rows = [];
for (const target of TARGETS) {
  const html = await readFile(join(ROOT, target.rel), 'utf8');
  const n = countCards(html);
  rows.push({ rel: target.rel, label: target.label, count: n, min: target.min });
  assert.ok(
    /图鉴/.test(html) || /atlas|phase-grid|kid-figure-grid|rock-grid/i.test(html),
    target.rel + ' must present a 图鉴/atlas surface'
  );
  assert.ok(n >= target.min, `${target.rel}: expected ≥${target.min} selectable 图鉴 cards, got ${n}`);
}

console.log(rows.map((row) => `${row.rel}\t${row.label}\t${row.count}`).join('\n'));
console.log('✓ shipped nature 图鉴 pages have multi-entry selectable cards');
