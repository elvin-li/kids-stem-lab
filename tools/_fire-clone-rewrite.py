#!/usr/bin/env python3
"""Rewrite leftover gannet/sandgrouse clone copy from each page's title contrast."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NATURE = ROOT / "nature"
GAMES = ROOT / "games"

KEEP_ALL = {
    "sandgrouse.html",
    "gannets.html",
    "boobies.html",
    "albatross.html",
    "namib-beetles.html",
    "soak-lab.html",
}
KEEP_ZHANG = {"angwantibos.html", "gannets.html", "peregrines.html"}
KEEP_WING = {"gannets.html", "boobies.html", "peregrines.html", "anhingas.html"}
KEEP_DIVE = {
    "gannets.html",
    "boobies.html",
    "plunge-lab.html",
    "dive-lab.html",
    "sink-lab.html",
}


def fail_clause(html: str) -> str:
    m = re.search(r'data-gn-g2="no"[^>]*>([^<]+)', html)
    if not m:
        return ""
    return m.group(1).split("，")[0].strip()


def fail_short(clause: str) -> str:
    s = re.sub(r"^像", "", clause).strip()
    if s.startswith("用") and len(s) > 3:
        s = s[1:]
    if len(s) > 5:
        s = s[:5]
    return s or "对照"


def fail_result(html: str) -> str:
    m = re.search(r'<h2 id="lookTitle">([^<]+)', html)
    if m and "就" in m.group(1):
        return m.group(1).split("就")[-1].rstrip("。？?")
    return "做不对了"


def rewrite_nature(path: Path) -> bool:
    name = path.name
    if name in KEEP_ALL or name == "index.html":
        return False
    t = path.read_text(encoding="utf-8")
    orig = t
    clause = fail_clause(t)
    short = fail_short(clause)
    result = fail_result(t)

    if name not in KEEP_ZHANG and "张开" not in clause:
        t = t.replace("、张开 ", f"、{short} ")

    t = t.replace("水珠就滚走", f"就{result}")
    t = t.replace("孩子说「湿」时", "孩子说对了时")

    if name not in KEEP_WING:
        t = t.replace("翅膀贴身", "")

    t = t.replace("向海面", "")
    if name not in KEEP_DIVE:
        t = t.replace("拍在水上", "")
        t = t.replace("进去了，", "对了，")
        t = t.replace("还能冲进去吗", "还能成吗")
        t = t.replace("冲不进去", "做不成")
        t = t.replace("再冲下去", "再做成")
        t = t.replace("冲下去", "")

    t = re.sub(r"  +", " ", t)
    t = t.replace("一只 ", "一只")
    t = t.replace("狼软牙", "狼软牙")  # no-op safety
    # collapse leftover "一只土狼软牙" is fine; "一只土狼 软牙" already squeezed

    if name == "knots.html":
        t = t.replace("那是换羽变色，不是运水的海绵。", "那是换羽变色，不是挤群躲鹰。")
        t = t.replace("不是腹羽运水。", "不是细嘴点走。")
        t = t.replace("比的是大群，不是腹羽运水", "比的是大群，不是细嘴点走")

    if t != orig:
        path.write_text(t, encoding="utf-8")
        return True
    return False


def rewrite_stoop(path: Path) -> bool:
    t = path.read_text(encoding="utf-8")
    orig = t
    t = t.replace('<span class="kid-figure-cap">张开</span>', '<span class="kid-figure-cap">张翅</span>')
    t = t.replace('<span class="kid-figure-cap">张开也行</span>', '<span class="kid-figure-cap">张翅也行</span>')
    t = t.replace("换贴翅和张开", "换贴翅和张翅")
    t = t.replace("还是张开？", "还是张翅？")
    t = t.replace("贴翅还是张开", "贴翅还是张翅")
    t = t.replace("贴翅和张开都试", "贴翅和张翅都试")
    t = t.replace("或张开试一次", "或张翅试一次")
    t = t.replace('<span class="kid-figure-cap">张开的鹰</span>', '<span class="kid-figure-cap">张翅的鹰</span>')
    if t != orig:
        path.write_text(t, encoding="utf-8")
        return True
    return False


def main() -> None:
    n = 0
    for p in sorted(NATURE.glob("*.html")):
        if rewrite_nature(p):
            n += 1
    g = 0
    stoop = GAMES / "stoop-lab.html"
    if stoop.exists() and rewrite_stoop(stoop):
        g += 1
    print(f"nature rewritten: {n}")
    print(f"games rewritten: {g}")


if __name__ == "__main__":
    main()
