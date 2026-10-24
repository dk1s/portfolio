"""Generates the brand favicon set.

Indigo rounded tile, white "DK" monogram, warm-yellow bar. Rendered from
system fonts with PIL so the mark is identical on every machine and needs no
webfont at 16px. Palette: DESIGN.md §2.
"""

import os
from PIL import Image, ImageDraw, ImageFont

OUT = os.path.join(os.path.dirname(__file__), "..", "public")

BG = (91, 91, 214)      # #5B5BD6 indigo (hero background)
BG_INNER = (110, 110, 226)  # lighter indigo highlight
ACCENT = (244, 178, 70)  # #F4B246 warm yellow
INK = (255, 255, 255)  # white

SANS_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
SANS = "/System/Library/Fonts/Supplemental/Arial.ttf"

SS = 8  # supersample factor for smooth edges


def draw_mark(size: int) -> Image.Image:
    """Draws the monogram at `size` px, supersampled then downscaled."""
    big = size * SS
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # Rounded tile
    radius = int(big * 0.22)
    d.rounded_rectangle([0, 0, big - 1, big - 1], radius=radius, fill=BG)

    # Inner top highlight, echoing the site's card surfaces
    d.rounded_rectangle(
        [0, 0, big - 1, int(big * 0.55)],
        radius=radius,
        fill=BG_INNER,
    )
    # Re-square the bottom edge of the highlight so only the top corners round
    d.rectangle([0, int(big * 0.3), big - 1, int(big * 0.55)], fill=BG_INNER)

    # "DK" monogram
    font = ImageFont.truetype(SANS_BOLD, int(big * 0.56))
    text = "DK"
    box = d.textbbox((0, 0), text, font=font)
    tw, th = box[2] - box[0], box[3] - box[1]
    d.text(
        ((big - tw) / 2 - box[0], (big - th) / 2 - box[1]),
        text,
        font=font,
        fill=INK,
    )

    # Yellow underscore bar, the same device as the wordmark's period
    bar_w = int(big * 0.30)
    bar_h = max(2, int(big * 0.055))
    d.rounded_rectangle(
        [
            (big - bar_w) / 2,
            big * 0.79,
            (big + bar_w) / 2,
            big * 0.79 + bar_h,
        ],
        radius=bar_h / 2,
        fill=ACCENT,
    )

    return img.resize((size, size), Image.LANCZOS)


def main() -> None:
    for size, name in [
        (16, "favicon-16.png"),
        (32, "favicon-32.png"),
        (180, "apple-touch-icon.png"),
        (192, "icon-192.png"),
        (512, "favicon.png"),
    ]:
        path = os.path.join(OUT, name)
        draw_mark(size).save(path, "PNG", optimize=True)
        print(f"wrote {name} ({size}x{size}, {os.path.getsize(path) // 1024} KB)")


if __name__ == "__main__":
    main()
