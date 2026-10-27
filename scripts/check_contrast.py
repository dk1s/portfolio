"""WCAG contrast audit for the design tokens in src/index.css.

Parses the `:root` and `.dark` token blocks and reports the contrast ratio of
every meaningful foreground/background pairing, so the palette can be verified
instead of eyeballed.

Usage: python3 scripts/check_contrast.py
Exits non-zero if a pairing fails its required ratio.
"""

import colorsys
import os
import re
import sys

CSS = os.path.join(os.path.dirname(__file__), "..", "src", "index.css")

# Text pairs: (foreground token, background token, required ratio, label)
# 4.5 = body text (WCAG AA), 3.0 = large text (>=24px) and UI components
TEXT_PAIRS = [
    ("foreground", "background", 4.5, "body text on canvas"),
    ("foreground", "card", 4.5, "body text on card"),
    ("foreground", "surface-2", 4.5, "body text on raised surface"),
    ("muted-foreground", "background", 4.5, "muted text on canvas"),
    ("muted-foreground", "card", 4.5, "muted text on card"),
    ("muted-foreground", "surface-2", 4.5, "muted text on raised surface"),
    ("muted-foreground", "muted", 4.5, "muted text on muted"),
    ("primary-foreground", "primary", 4.5, "text on brand button"),
    ("accent-foreground", "accent", 4.5, "text on accent surface"),
    ("card-foreground", "card", 4.5, "card text"),
    ("popover-foreground", "popover", 4.5, "popover text"),
    ("secondary-foreground", "secondary", 4.5, "secondary button text"),
    ("destructive-foreground", "destructive", 4.5, "destructive button text"),
    ("primary", "background", 3.0, "brand text/links on canvas"),
    ("primary", "card", 3.0, "brand text/links on card"),
    ("brand-ink", "brand-soft", 4.5, "brand ink on brand tint"),
    ("border", "background", 1.5, "hairline divider on canvas (decorative)"),
    ("border", "card", 1.5, "card edge on canvas (decorative)"),
    ("input", "background", 3.0, "input field edge (WCAG 1.4.11)"),
]


def parse_tokens(css: str) -> dict:
    """Returns {'light': {...}, 'dark': {...}} of HSL triplet strings."""
    out = {"light": {}, "dark": {}}
    # The first `:root` block is light, the `.dark` block is dark
    root_match = re.search(r":root\s*\{(.*?)\}", css, re.S)
    dark_match = re.search(r"\.dark\s*\{(.*?)\}", css, re.S)
    if root_match:
        for name, value in re.findall(r"--([\w-]+):\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%", root_match.group(1)) and []:
            pass
    for target, block in (("light", root_match), ("dark", dark_match)):
        if not block:
            continue
        body = block.group(1)
        for match in re.finditer(r"--([\w-]+):\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%;", body):
            name, h, s, l = match.group(1), *match.groups()[1:]
            out[target][name] = (float(h), float(s) / 100, float(l) / 100)
    return out


def hsl_to_rgb(h: float, s: float, l: float):
    r, g, b = colorsys.hls_to_rgb(h / 360, l, s)
    return r, g, b


def luminance(h: float, s: float, l: float) -> float:
    def channel(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = hsl_to_rgb(h, s, l)
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)


def contrast(fg, bg) -> float:
    l1, l2 = luminance(*fg), luminance(*bg)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def hex_of(t):
    return "#%02x%02x%02x" % tuple(int(round(c * 255)) for c in hsl_to_rgb(*t))


def main() -> None:
    with open(CSS, encoding="utf-8") as fh:
        css = fh.read()

    tokens = parse_tokens(css)
    failures = 0

    for theme in ("light", "dark"):
        block = tokens[theme]
        if not block:
            print(f"!! could not parse {theme} tokens")
            return 1
        print(f"\n{theme.upper()} THEME  (background {hex_of(block['background'])},"
              f" foreground {hex_of(block['foreground'])})")
        print("-" * 74)
        for fg_name, bg_name, required, label in TEXT_PAIRS:
            if fg_name not in block or bg_name not in block:
                print(f"  ?  {label}: token missing ({fg_name} / {bg_name})")
                continue
            ratio = contrast(block[fg_name], block[bg_name])
            ok = ratio >= required
            if not ok:
                failures += 1
            flag = "ok " if ok else "FAIL"
            print(f"  {flag} {ratio:5.2f}:1  (need {required:.1f})  {label}")

    print()
    if failures:
        print(f"{failures} pairing(s) below target.")
        return 1
    print("All pairings meet target.")
    return 0


if __name__ == "__main__":
    sys.exit(main())