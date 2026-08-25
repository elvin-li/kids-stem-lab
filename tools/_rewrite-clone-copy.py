#!/usr/bin/env python3
"""One-off leftover-clone rewrite. Keep gannet/sandgrouse/plunge lessons intact."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NATURE = ROOT / "nature"
GAMES = ROOT / "games"

BIRD = {
    "albatross", "anhingas", "antbirds", "arctic-terns", "auklets", "auks", "avocets",
    "barbets", "barn-owls", "bee-eaters", "birds", "birds-of-paradise", "bitterns",
    "boobies", "bowerbirds", "bulbuls", "buntings", "bustards", "caracaras", "cardinals",
    "cassowaries", "catbirds", "chickadees", "condors", "coots", "cormorants", "cotingas",
    "coursers", "crakes", "cranes", "crossbills", "crows", "cuckoos", "curlews", "dippers",
    "dovekies", "dowitchers", "drongos", "dunlins", "egrets", "emus", "fairy-wrens",
    "feathers", "flamingos", "flycatchers", "frigatebirds", "frogmouths", "fulmars",
    "gannets", "godwits", "goldfinches", "grackles", "grebes", "greenshanks", "guillemots",
    "gulls", "hamerkops", "herons", "hoatzins", "honeyeaters", "honeyguides", "hoopoes",
    "hornbills", "hummingbirds", "ibises", "jacanas", "jays", "kakapos", "kingfishers",
    "kinglets", "kiwis", "knots", "kookaburras", "lammergeiers", "larks", "loons",
    "lyrebirds", "magpies", "manakins", "martins", "meadowlarks", "mockingbirds",
    "moorhens", "motmots", "murres", "mynas", "nighthawks", "nightingales", "nightjars",
    "nuthatches", "oilbirds", "orioles", "oropendolas", "ospreys", "ostriches",
    "ovenbirds", "owls", "oxpeckers", "oystercatchers", "peacocks", "pelicans",
    "penguins", "peregrines", "phalaropes", "pipits", "pittas", "plovers", "potoos",
    "pratincoles", "prions", "ptarmigans", "puffins", "quetzals", "rails", "razorbills",
    "redshanks", "rheas", "riflebirds", "roadrunners", "robins", "rollers", "ruffs",
    "sanderlings", "sandgrouse", "sandpipers", "secretary-birds", "secretarybirds",
    "seriemas", "shearwaters", "shelducks", "shoebills", "shrikes", "skimmers", "skuas",
    "snipes", "sparrows", "spoonbills", "starlings", "stilts", "storks", "storm-petrels",
    "sunbirds", "sunbitterns", "surfbirds", "swallows", "swifts", "tanagers", "tattlers",
    "terns", "thick-knees", "thrushes", "tinamous", "tits", "toucans", "towhees",
    "treecreepers", "trogons", "tropicbirds", "turnstones", "vireos", "vultures",
    "wagtails", "warblers", "waxwings", "weaver-birds", "weaverbirds", "whimbrels",
    "willets", "woodcocks", "woodcreepers", "woodpeckers", "wrens", "wrynecks",
    "yellowlegs",
}

KEEP_BIRD_LESSON = {"gannets.html", "boobies.html", "albatross.html", "sandgrouse.html"}
KEEP_PLUNGE = {"plunge-lab.html", "dive-lab.html", "sink-lab.html", "flap-lab.html", "fall-lab.html"}
KEEP_SOAK = {"sandgrouse.html", "soak-lab.html"}
KEEP_JIN = {"gannets.html", "plunge-lab.html", "dive-lab.html", "sink-lab.html", "boobies.html"}
KEEP_HEADDOWN = {"fisher-lab.html", "nuthatchwalk-lab.html", "headstand-lab.html"}
KEEP_TAIL = {"sandgrouse.html"}  # 尾脂腺 contrast is the lesson

FISH_HINT = re.compile(
    r"(shark|fish|eel|ray|tuna|salmon|sturgeon|gar|pike|skate|hagfish|lamprey|"
    r"coelacanth|bichir|bowfin|oarfish|opah|marlin|sailfish|swordfish|tarpon|"
    r"paddlefish|boxfish|cowfish|filefish|frogfish|lionfish|stonefish|surgeon|"
    r"trigger|parrotfish|wrasse|clownfish|seahorse|hatchet|barreleye|viperfish|"
    r"dragonfish|lantern|goblin|nurse|wobbegong|thresher|hammerhead|megamouth|"
    r"basking|catshark|cookie|guitarfish|sawfish|flounder|mudskipper|lungfish|"
    r"blobfish|snailfish|pearlfish|rabbitfish|pinecone-fish|leaf-fish|"
    r"flying-fish|flying-gurnard|archer|arapaima|gars|pikes|salmons|skates|"
    r"moray|conger|ribbon|garden|gulper|wolf-eel|weever|stargazer)"
)
FROG_HINT = re.compile(r"(frog|toad|salamander|newt|tadpole|caecilian|axolotl|olm|hellbender)")
REPTILE_HINT = re.compile(
    r"(snake|lizard|gecko|turtle|crocodile|tuatara|chameleon|iguana|anole|"
    r"basilisk|chuckwalla|gila|komodo|gharial|python|rattlesnake|sidewinder|"
    r"frilled-lizard|horned-lizard|thorny|leatherback|matamata|snapping-turtle)"
)
PLANT_HINT = re.compile(
    r"(plant|tree|fig|cact|baobab|sequoia|welwitschia|rafflesia|bromeliad|"
    r"resurrection|lithops|sundew|pitcher|venus|bladderwort|titan-arum|"
    r"dandelion|lotus|kelp|seagrass|mangrove|moss|lichen|fungi|pinecone|"
    r"sensitive|strangler)"
)
BUG_HINT = re.compile(
    r"(bee|ant|beetle|spider|bug|fly|moth|butter|wasp|mosquito|dragonfly|"
    r"damselfly|cricket|katydid|manti|millipede|centipede|tick|mite|scorpion|"
    r"ladybug|weevil|earwig|mayfly|stonefly|dobson|cranefly|midge|glowworm|"
    r"bagworm|treehopper|pillbug|flea|firefly|cicada|cockroach|lacewing|"
    r"caddis|springtail|harvestmen|spittle|inchworm|velvet-worm|tardigrade|"
    r"whirligig|water-strider|water-boatman|water-scorpion|backswimmer|"
    r"assassin|bombardier|click-beetle|dung-beetle|stag-beetle|diving-beetle|"
    r"namib|leafcutter|trapjaw|honeypot|fig-wasp|potter|mason|paper-wasp|"
    r"hornet|yellowjacket|bumble|orchid-manti|praying|peacock-spider|portia|"
    r"bolas|net-casting|trapdoor|jumping-spider|diving-bell|antlion)"
)
CRAB_HINT = re.compile(r"(crab|shrimp|lobster|barnacle|horseshoe)")
SEA_HINT = re.compile(
    r"(jelly|sponge|anemone|coral|star|urchin|cucumber|comb-jelly|nudibranch|"
    r"octopus|squid|clam|scallop|nautilus|cuttle|chiton|cone-snail|brittle|"
    r"man-of-war|box-jell|plankton|christmas-tree-worm|giant-tube|fireworm)"
)

FLAP = "张开以后拍在水面；再高的崖也补不了少掉的贴。"
OILGLAND = re.compile(
    r"<p>多数鸟用尾脂腺把羽上油，水珠滚走才飞得动。[^<]*</p>"
)
WET_Q = "孩子说「湿」时，指的是黄水细丝吸水，还是在说「它比较渴」？让他再指一次肚皮和水珠。"
WET_Q2 = "孩子说「湿」时，指的是推浪细丝吸水，还是在说「它比较渴」？让他再指一次肚皮和水珠。"
WET_GENERIC = "孩子说对了时，指的是本页这一招，还是在说「它比较想」？让他再指一次关键部位。"


def taxon(stem: str) -> str:
    if stem in BIRD:
        return "鸟"
    if FISH_HINT.search(stem):
        return "鱼"
    if FROG_HINT.search(stem):
        return "蛙"
    if REPTILE_HINT.search(stem):
        return "爬"
    if PLANT_HINT.search(stem):
        return "植物"
    if BUG_HINT.search(stem):
        return "虫"
    if CRAB_HINT.search(stem):
        return "蟹"
    if SEA_HINT.search(stem):
        return "海生"
    return "兽"


def lesson_from_title(html: str) -> str:
    m = re.search(r"<title>([^<]+)</title>", html)
    if not m:
        return "本页这一招"
    title = m.group(1)
    part = title.split("·", 1)[-1].split("|")[0].strip().rstrip("？?")
    part = re.split(r"[，,]", part)[0].strip()
    return part or "本页这一招"


def rewrite_nature(path: Path) -> int:
    name = path.name
    stem = path.stem
    t = path.read_text(encoding="utf-8")
    orig = t
    kind = taxon(stem)

    # Named pages first, so later generic swaps do not eat their strings.
    if name == "ladybugs.html":
        t = t.replace("同一只、同一片海，先只改", "同一只、同一片叶子，先只改")
        t = t.replace("够贴、不太张，头朝下被放下；干燥或没贴紧，被吃。再问它是不是蜣螂滚球：不是，蜣螂滚球在表面，它要插进去。",
                      "黄水够、关节不干，对方才放下；没有黄水，就被吃。再问它是不是蜣螂滚球：不是，蜣螂把球推着走，它要渗出黄水。")
        t = t.replace("头朝下被放下；没有黄水或没贴紧时，被吃。", "黄水够时对方才放下；没有黄水时就被吃。")
        t = t.replace("舞台上的「带回」读数只比较肚皮湿不湿、油不油，不是某一只的说明书。",
                      "舞台上的读数只比较黄水够不够，不是某一只的说明书。")
        t = t.replace("进去了，腿关节渗出黄水冲下去", "放下了，腿关节渗出黄水")
        t = t.replace("还能冲进去吗？", "还能被放下吗？")
        t = t.replace("为什么要先渗黄，再冲下去？", "为什么要先渗黄，再被放下？")
        t = t.replace("拍面和插进去，哪一步被抹掉了？", "渗黄和被放下，哪一步被抹掉了？")
        t = t.replace("没有黄水，为什么带不回？", "没有黄水，为什么会被吃？")
        t = t.replace("没有黄水就把这一吸卖掉", "没有黄水就把这一招卖掉")
        t = t.replace("油太多就把这一吸卖掉", "没有黄水就把这一招卖掉")
        t = t.replace("肚皮够湿、油不太多，黄水才吸住水。", "黄水够、关节不干，对方才放下。")
        t = t.replace(">带不回<", ">放不下<")
        t = t.replace("还能带回", "还能放下")

    if name == "orcas.html":
        t = t.replace("才把冰上的冲下来的鸟", "才把冰上的冲下来的鲸")
        t = t.replace("同一只、同一片海，先只改「几头一起推浪有多够」。够贴、不太张，头朝下把冰上的冲下来；一头推或没贴紧，推不动。再问它是不是白鲸额瓜：不是，白鲸额瓜在表面，它要插进去。",
                      "同一处先只改「几头一起还是一头」。几头一起推浪，冰上的才冲得下来；一头推，推不动。再问它是不是白鲸额瓜：不是，白鲸用额瓜，它要几头一起推浪。")
        t = t.replace("舞台上的「带回」读数只比较肚皮湿不湿、油不油，不是某一只的说明书。",
                      "舞台上的读数只比较几头一起还是一头，不是某一只的说明书。")
        t = t.replace("如果他说「一头推更能成」——拍面和插进去，哪一步被抹掉了？",
                      "如果他说「一头推也能成」——一起推浪这一步被抹掉了吗？")
        t = t.replace("一头推，为什么带不回？", "一头推，为什么推不动？")

    if name == "crossbills.html":
        t = t.replace('<label for="xbS">翅贴得有多紧：', '<label for="xbS">交叉喙有多够：')
        t = t.replace('<label for="xbC">翅膀张得有多开：', '<label for="xbC">直喙戳有多偏：')
        t = t.replace("翅够贴、不太张时，头朝下看得见信号；直喙戳或没贴紧时，认不出。",
                      "喙交叉时才撬得开松果；直喙去戳，撬不开。")
        t = t.replace("进去了，交叉喙冲下去", "撬开了，交叉喙撬松果")
        t = t.replace("还能冲进去吗？", "还能撬开吗？")
        t = t.replace("不能，直喙戳，冲不进去", "不能，直喙戳，撬不开")

    if name == "gannets.html":
        t = t.replace('aria-label="腹羽吸水"', 'aria-label="头朝下冲进"')
        t = t.replace('<span class="kid-figure-cap">腹羽吸水</span><span class="kid-figure-fact">油太多就把这一吸卖掉</span>',
                      '<span class="kid-figure-cap">头朝下冲进</span><span class="kid-figure-fact">头朝下、翅贴身才插进水；不是腹羽运水</span>')
        t = t.replace("油太多，水珠从背上滚走了", "翅膀张开，拍在水面上")
        t = t.replace("能，肚皮干着飞一趟也行", "能，翅膀张着也行")
        t = t.replace("soak: { name:\"腹羽吸水\", score:4, cx:200, cy:170, say:\"腹羽吸水：对照做错了，这一招就不算。\" }",
                      "soak: { name:\"头朝下冲进\", score:4, cx:200, cy:170, say:\"头朝下冲进：翅贴身才插进水。\" }")
        t = t.replace("人编的：刺蜥用背沟导露。鲣鸟比的是这一招海绵",
                      "人编的：刺蜥用背沟导露。鲣鸟比的是翅贴身冲进水")
        t = t.replace("<span>肚湿</span>", "<span>翅贴</span>")
        t = t.replace("<span>带回水（算）</span>", "<span>插进（算）</span>")
        t = t.replace(">带回了？<", ">进去了？<")

    if name == "horseshoe-crabs.html":
        t = t.replace("肚皮浸湿，腹羽吸住水，带回了。", "书鳃扇开，划得动。")

    if name == "peregrines.html":
        t = t.replace("翅够贴、不太张时，头朝下冲得快；翅膀张开或没贴紧时，被风拖住。",
                      "翅贴身时冲得快；翅膀张开时被风拖住。")
        t = t.replace("<span>肚湿</span>", "<span>贴翅</span>")
        t = t.replace("<span>带回水（算）</span>", "<span>冲速（算）</span>")
        t = t.replace(">带回了？<", ">冲得快？<")
        t = t.replace("进去了，翅贴身俯冲冲下去", "冲得快，翅贴身俯冲")

    if name == "angwantibos.html":
        t = t.replace("对上这一招时，掉不下去；手指张开或没贴紧时，掉下去。",
                      "手指扣成一个圈抓紧才掉不下去；手指张开就掉下去。")
        t = t.replace("<span>肚湿</span>", "<span>扣握</span>")
        t = t.replace("<span>带回水（算）</span>", "<span>抓紧（算）</span>")
        t = t.replace(">带回了？<", ">抓紧了？<")
        t = t.replace("进去了，手指扣成一个圈抓紧冲下去", "抓紧了，手指扣成一个圈")

    skip_bring = name in KEEP_SOAK or name in {
        "gannets.html", "peregrines.html", "angwantibos.html", "crossbills.html",
        "ladybugs.html", "orcas.html",
    }

    if name not in KEEP_BIRD_LESSON and kind != "鸟":
        t = re.sub(r"这种(「[^」]{0,80}」)的鸟", rf"这种\1的{kind}", t)
        t = re.sub(r"这种([^<「]{0,80}?)的鸟", rf"这种\1的{kind}", t)
        t = t.replace("抓鸟课", "抓真的课")
        t = t.replace("追真鸟", "追真的")
        t = t.replace("别追真鸟", "别追真的")
        t = t.replace("不许去追真鸟", "不许去追真的")
        t = t.replace("抓真鸟", "抓真的")

    if name not in KEEP_JIN:
        t = t.replace('id="gnOkOut">进<', 'id="gnOkOut">对<')
        t = t.replace('id="xbOkOut">进<', 'id="xbOkOut">对<')

    if not skip_bring:
        t = t.replace(">带回了？<", ">对了？<")
        t = t.replace("<span>肚湿</span>", "<span>这一招</span>")
        t = t.replace("<span>带回水（算）</span>", "<span>对偏（算）</span>")
        t = t.replace("还能带回", "还能成")
        t = t.replace(">带不回<", ">不成<")
        t = t.replace("带不回", "不成")

    if name not in KEEP_TAIL:
        t = OILGLAND.sub(
            "<p>对照页用另一套零件。本页第一完成句只比这一招，不要把对照并进来。</p>",
            t,
        )

    t = t.replace(WET_Q, WET_GENERIC)
    t = t.replace(WET_Q2, WET_GENERIC)
    if kind != "鸟":
        t = t.replace("本页能当抓鸟课吗？", "本页能当去抓真的课吗？")
        t = t.replace("本页能当抓真的课吗？", "本页能当去抓真的课吗？")

    # duplicate 请换X、Y或Y
    t = re.sub(r"请换([^、<>]{1,40})、([^、<>]{1,40})或\2来比", r"请换\1或\2来比", t)

    if name == "ladybugs.html":
        t = t.replace('id="gnOkOut">进<', 'id="gnOkOut">放<')
        t = t.replace('id="gnOkOut">对<', 'id="gnOkOut">放<')
    if name == "crossbills.html":
        t = t.replace("<span>这一招</span>", "<span>交叉</span>")
        t = t.replace("<span>对偏（算）</span>", "<span>撬开（算）</span>")
        t = t.replace(">对了？<", ">撬开了？<")

    if t != orig:
        path.write_text(t, encoding="utf-8")
        return 1
    return 0


def rewrite_game(path: Path) -> int:
    name = path.name
    t = path.read_text(encoding="utf-8")
    orig = t
    lesson = lesson_from_title(t)

    if name not in KEEP_PLUNGE and FLAP in t:
        t = t.replace(FLAP, f"少了本页这一招。差在{lesson}，不在翅贴进水。")

    if name not in KEEP_HEADDOWN:
        t = t.replace('<span class="kid-figure-cap">头朝下</span>',
                      '<span class="kid-figure-cap">姿势</span>')

    if name not in KEEP_SOAK and name not in KEEP_PLUNGE:
        t = t.replace("不许去追真鸟", "不许去追真的")
        t = t.replace("别追真鸟", "别追真的")
        t = t.replace("追真鸟", "追真的")
        # keep 水边 only if the page is actually about water; cheap heuristic
        if "水" not in lesson and "海" not in lesson and "浪" not in lesson:
            t = t.replace("水边只远远看", "只远远看")

    if t != orig:
        path.write_text(t, encoding="utf-8")
        return 1
    return 0


def main() -> None:
    n = g = 0
    for p in sorted(NATURE.glob("*.html")):
        if p.name == "index.html":
            continue
        n += rewrite_nature(p)
    for p in sorted(GAMES.glob("*.html")):
        if p.name == "index.html":
            continue
        g += rewrite_game(p)
    print(f"nature rewritten: {n}")
    print(f"games rewritten: {g}")


if __name__ == "__main__":
    main()
