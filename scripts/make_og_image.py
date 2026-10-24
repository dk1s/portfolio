"""Generates the 1200x630 social share image (og:image).

Composed with PIL from system fonts so it renders identically everywhere and
needs no network fetch at build time. Mirrors the site's indigo dark variant:
deep indigo-navy canvas, yellow accents, bold geometric name, sans support line.

Layout is flow-based off measured glyph bounding boxes rather than hardcoded
offsets, so nothing collides if the fonts or sizes change.
"""

import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), "..", "public")

W, H = 1200, 630
BG = (19, 20, 32)  # #131420 deep indigo-navy canvas
SURFACE = (26, 27, 43)  # #1a1b2b
HAIRLINE = (47, 49, 69)  # #2f3145
ACCENT = (91, 91, 214)  # #5b5bd6 indigo
ACCENT_DEEP = (74, 74, 192)  # #4a4ac0
ACCENT_WARM = (244, 178, 70)  # #f4b246 warm yellow
INK = (244, 244, 247)  # near-white
INK_SOFT = (180, 181, 194)  # muted
INK_FAINT = (138, 140, 158)  # faintest

SANS = "/System/Library/Fonts/Supplemental/Arial.ttf"
SANS_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

MARGIN = 84
NAME_SIZE = 124


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def text_extents(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont):
    """Returns (x, y, width, height) of `text` with its origin at (0, 0)."""
    box = draw.textbbox((0, 0), text, font=f)
    return box[0], box[1], box[2] - box[0], box[3] - box[1]


def text_height(draw, text, f) -> int:
    return text_extents(draw, text, f)[3]


def glow(size: int, color, alpha: int) -> Image.Image:
    """Soft circular bloom, drawn small and upscaled for a smooth falloff."""
    small = max(8, size // 12)
    layer = Image.new("RGBA", (small, small), color + (0,))
    d = ImageDraw.Draw(layer)
    steps = 24
    for i in range(steps, 0, -1):
        r = small / 2 * (i / steps)
        a = int(alpha * (1 - i / steps) ** 1.7)
        d.ellipse([small / 2 - r, small / 2 - r, small / 2 + r, small / 2 + r], fill=color + (a,))
    return layer.resize((size, size), Image.LANCZOS).filter(ImageFilter.GaussianBlur(size / 40))


def paste_glow(img: Image.Image, size: int, color, alpha: int, xy) -> None:
    layer = glow(size, color, alpha)
    img.paste(layer, xy, layer)


def pill(d, x, y, text, f, pad=(24, 13), fill=SURFACE, fg=ACCENT, outline=HAIRLINE) -> int:
    tw = d.textlength(text, font=f)
    h = f.size + pad[1] * 2
    w = int(tw + pad[0] * 2)
    d.rounded_rectangle([x, y, x + w, y + h], radius=h / 2, fill=fill, outline=outline, width=2)
    _, oy, _, th = text_extents(d, text, f)
    d.text((x + pad[0], y + pad[1] - oy), text, font=f, fill=fg)
    return w


def main() -> None:
    img = Image.new("RGB", (W, H), BG)

    # Ambient indigo bloom, top-left, like the hero
    paste_glow(img, 900, ACCENT, 70, (-260, -340))
    paste_glow(img, 760, (58, 58, 128), 48, (W - 430, H - 400))

    # Hairline grid
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, W, 68):
        gd.line([(x, 0), (x, H)], fill=(244, 244, 247, 10), width=1)
    for y in range(0, H, 68):
        gd.line([(0, y), (W, y)], fill=(244, 244, 247, 10), width=1)
    img.paste(grid, (0, 0), grid)

    d = ImageDraw.Draw(img)
    trace = []

    # ---- Wordmark (top left) ----
    brand_f = font(SANS_BOLD, 25)
    y = 58
    d.text((MARGIN, y), "DEEPAK", font=brand_f, fill=INK)
    trace.append(("wordmark", y, y + brand_f.size))
    x = MARGIN + d.textlength("DEEPAK", font=brand_f)
    d.text((x + 7, y), ".", font=brand_f, fill=ACCENT_WARM)
    d.text((x + 19, y), "KUMAR", font=brand_f, fill=INK)

    # ---- Availability pill (top right) ----
    pill_f = font(SANS_BOLD, 20)
    pill_text = "AVAILABLE FOR HIRE"
    pill(
        d,
        W - MARGIN - int(d.textlength(pill_text, font=pill_f) + 48),
        54,
        pill_text,
        pill_f,
        fill=SURFACE,
        fg=ACCENT_WARM,
        outline=HAIRLINE,
    )

    # ---- Measure the whole stack, then place it as one block ----
    # The display face is now the geometric sans of the design system
    name_f = font(SANS_BOLD, NAME_SIZE)
    name_italic_f = name_f
    role_f = font(SANS, 33)
    sub_f = font(SANS, 25)

    h_first = text_height(d, "Deepak", name_f)
    h_last = text_height(d, "Kumar", name_italic_f)
    h_role = text_height(d, "Software Developer", role_f)
    h_sub = text_height(d, "React", sub_f)

    GAP_NAME = 26
    GAP_ROLE = 46
    GAP_SUB = 20

    block = h_first + GAP_NAME + h_last + GAP_ROLE + h_role + GAP_SUB + h_sub
    top_bound = 132          # below the wordmark row
    bottom_bound = H - 108   # above the footer rule
    y = top_bound + max(0, (bottom_bound - top_bound - block) // 2)

    # ---- Name, first line ----
    _, oy, _, _ = text_extents(d, "Deepak", name_f)
    d.text((MARGIN, y - oy), "Deepak", font=name_f, fill=INK)
    trace.append(("Deepak", y, y + h_first))
    y += h_first + GAP_NAME

    # ---- Name, second line, with an indigo vertical gradient ----
    grad_h = int(h_last * 1.7)
    grad = Image.new("RGB", (760, grad_h), ACCENT)
    gd2 = ImageDraw.Draw(grad)
    for i in range(grad_h):
        t = i / max(1, grad_h - 1)
        gd2.line(
            [(0, i), (760, i)],
            fill=(
                int(ACCENT[0] + (ACCENT_DEEP[0] - ACCENT[0]) * t),
                int(ACCENT[1] + (ACCENT_DEEP[1] - ACCENT[1]) * t),
                int(ACCENT[2] + (ACCENT_DEEP[2] - ACCENT[2]) * t),
            ),
        )
    mask = Image.new("L", (760, grad_h), 0)
    md = ImageDraw.Draw(mask)
    _, moy, _, _ = text_extents(md, "Kumar", name_italic_f)
    md.text((0, moy), "Kumar", font=name_italic_f, fill=255)
    img.paste(grad, (MARGIN, y), mask)
    trace.append(("Kumar", y, y + h_last))
    y += h_last + GAP_ROLE

    # ---- Role line ----
    _, oy, _, _ = text_extents(d, "Software Developer", role_f)
    rx = MARGIN
    d.text((rx, y - oy), "Software Developer", font=role_f, fill=INK)
    rx += d.textlength("Software Developer", font=role_f)
    d.text((rx + 16, y - oy), "at", font=role_f, fill=INK_FAINT)
    d.text((rx + 58, y - oy), "86 Agency", font=role_f, fill=INK_SOFT)
    trace.append(("role", y, y + h_role))
    y += h_role + GAP_SUB

    # ---- Supporting line ----
    _, oy, _, _ = text_extents(d, "React", sub_f)
    d.text(
        (MARGIN, y - oy),
        "React \u00b7 Next.js \u00b7 TypeScript \u00b7 Tailwind CSS \u00b7 Redux \u00b7 Zustand",
        font=sub_f,
        fill=INK_FAINT,
    )
    trace.append(("stack", y, y + h_sub))

    # ---- Footer rule + links ----
    d.line([(MARGIN, H - 80), (W - MARGIN, H - 80)], fill=HAIRLINE, width=2)
    link_f = font(SANS, 23)
    _, oy, _, _ = text_extents(d, "dk1s", link_f)
    d.text((MARGIN, H - 60 - oy), "dk1s.github.io/Portfolio", font=link_f, fill=ACCENT_WARM)
    right = "deepakkumarplacee@gmail.com"
    d.text(
        (W - MARGIN - d.textlength(right, font=link_f), H - 60 - oy),
        right,
        font=link_f,
        fill=INK_FAINT,
    )

    for name, top, bottom in trace:
        print(f"  {name:>10}: y {top:>3} -> {bottom:>3}  (h={bottom - top})")
    assert H - 80 > trace[-1][2], "content collided with the footer rule"

    path = os.path.join(OUT, "og-image.png")
    img.save(path, "PNG", optimize=True)
    print(f"wrote og-image.png ({W}x{H}, {os.path.getsize(path) // 1024} KB)")


if __name__ == "__main__":
    main()
