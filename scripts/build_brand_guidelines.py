"""
PGP — Prime Golden Properties · Brand Guidelines (2026 Edition)

Builds a proper visual brand bible PDF.
Output: /Users/gautammm/PGP Website/pgp-site/PGP-Brand-Guidelines.pdf
"""

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.units import mm


# Monkey-patch Canvas with setCharSpace + a tracked drawString that uses a
# text object internally so character spacing actually renders.
def _setCharSpace(self, val):
    self.__char_space = val

def _drawString_tracked(self, x, y, text, mode=None):
    spacing = getattr(self, "_Canvas__char_space", 0)
    if not spacing:
        return _ORIG_DRAW_STRING(self, x, y, text, mode) if mode is not None else _ORIG_DRAW_STRING(self, x, y, text)
    t = self.beginText(x, y)
    t.setFont(self._fontname, self._fontsize)
    t.setFillColor(self._fillColorObj)
    t.setCharSpace(spacing)
    t.textOut(text)
    self.drawText(t)

def _drawCentredString_tracked(self, x, y, text, mode=None):
    spacing = getattr(self, "_Canvas__char_space", 0)
    if not spacing:
        return _ORIG_DRAW_CENTRED(self, x, y, text, mode) if mode is not None else _ORIG_DRAW_CENTRED(self, x, y, text)
    w = self.stringWidth(text, self._fontname, self._fontsize)
    extra = spacing * (len(text) - 1)
    new_x = x - (w + extra) / 2
    _drawString_tracked(self, new_x, y, text)

def _drawRightString_tracked(self, x, y, text, mode=None):
    spacing = getattr(self, "_Canvas__char_space", 0)
    if not spacing:
        return _ORIG_DRAW_RIGHT(self, x, y, text, mode) if mode is not None else _ORIG_DRAW_RIGHT(self, x, y, text)
    w = self.stringWidth(text, self._fontname, self._fontsize)
    extra = spacing * (len(text) - 1)
    new_x = x - (w + extra)
    _drawString_tracked(self, new_x, y, text)

_ORIG_DRAW_STRING = Canvas.drawString
_ORIG_DRAW_CENTRED = Canvas.drawCentredString
_ORIG_DRAW_RIGHT = Canvas.drawRightString
Canvas.setCharSpace = _setCharSpace
Canvas.drawString = _drawString_tracked
Canvas.drawCentredString = _drawCentredString_tracked
Canvas.drawRightString = _drawRightString_tracked

# ----------------------------------------------------------------------
# Brand colours
# ----------------------------------------------------------------------
DEEP    = HexColor("#0F3D2E")
DEEP2   = HexColor("#163F30")
CREAM   = HexColor("#F8F5EF")
GOLD    = HexColor("#D4A017")
GOLDS   = HexColor("#F2C75C")   # soft
GOLDG   = HexColor("#FFD580")   # glow
INK     = HexColor("#1A1A1A")
INKM    = HexColor("#4D5D55")
INKF    = HexColor("#8A9A90")
LINE    = HexColor("#E5DDD0")

# Built-in font substitutes:
#   Times-Roman / Times-Italic / Times-Bold / Times-BoldItalic  ≈ Playfair Display
#   Helvetica / Helvetica-Bold / Helvetica-Oblique              ≈ Montserrat

SERIF      = "Times-Roman"
SERIF_BOLD = "Times-Bold"
SERIF_IT   = "Times-Italic"
SERIF_BI   = "Times-BoldItalic"
SANS       = "Helvetica"
SANS_BOLD  = "Helvetica-Bold"
SANS_OB    = "Helvetica-Oblique"

PAGE_W, PAGE_H = A4
M = 48  # outer margin

OUT = "/Users/gautammm/PGP Website/pgp-site/PGP-Brand-Guidelines.pdf"

# ----------------------------------------------------------------------
# Helpers
# ----------------------------------------------------------------------
def fill_page(c, color):
    c.setFillColor(color)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

def gold_rule(c, x1, x2, y, w=0.7):
    c.setStrokeColor(GOLD)
    c.setLineWidth(w)
    c.line(x1, y, x2, y)

def tracked(text, spacing=2.5):
    """Letter-spaced text — Reportlab doesn't expose tracking directly, so we
    insert a thin space between each char approximation by using setCharSpace."""
    return text

def draw_header(c, section_title, page_no):
    c.setFont(SANS_BOLD, 7.5)
    c.setFillColor(GOLD)
    c.setCharSpace(2)
    c.drawString(M, PAGE_H - M + 8, "PGP · BRAND GUIDELINES")
    c.setCharSpace(0)

    c.setFillColor(INKM)
    c.setFont(SANS, 7.5)
    c.drawRightString(PAGE_W - M, PAGE_H - M + 8, section_title.upper())

    # gold thin rule under header
    gold_rule(c, M, PAGE_W - M, PAGE_H - M + 2, w=0.5)

    # page number bottom right in gold
    c.setFont(SANS_BOLD, 7.5)
    c.setFillColor(GOLD)
    c.setCharSpace(2)
    c.drawRightString(PAGE_W - M, M - 18, f"PG · {page_no:02d}")
    c.setCharSpace(0)

    # tagline bottom left
    c.setFillColor(INKF)
    c.setFont(SERIF_IT, 8)
    c.drawString(M, M - 18, "Land that turns into legacy.")

def section_title(c, eyebrow, title, y, dark=False):
    """Draws an eyebrow + headline block. Returns the y where content can start."""
    eyebrow_color = GOLD if not dark else GOLD
    title_color   = INK if not dark else CREAM

    # eyebrow
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(eyebrow_color)
    c.setCharSpace(3)
    c.drawString(M, y, eyebrow.upper())
    c.setCharSpace(0)

    # short gold rule
    gold_rule(c, M, M + 28, y - 8, w=1.0)

    # title
    c.setFont(SERIF, 30)
    c.setFillColor(title_color)
    c.drawString(M, y - 50, title)

    return y - 70

# ----------------------------------------------------------------------
# Page 1 · Cover
# ----------------------------------------------------------------------
def page_cover(c):
    fill_page(c, DEEP)

    # subtle gold corner glow
    c.saveState()
    c.setFillColor(Color(0.83, 0.63, 0.09, alpha=0.10))
    c.circle(PAGE_W - 80, PAGE_H - 80, 220, fill=1, stroke=0)
    c.setFillColor(Color(0.83, 0.63, 0.09, alpha=0.06))
    c.circle(60, 100, 220, fill=1, stroke=0)
    c.restoreState()

    # top eyebrow
    c.setFont(SANS_BOLD, 9)
    c.setFillColor(GOLD)
    c.setCharSpace(4)
    c.drawCentredString(PAGE_W / 2, PAGE_H - 110, "EST. 2013 · CHEYYAR TALUK · TIRUVANNAMALAI")
    c.setCharSpace(0)

    # gold short rule
    gold_rule(c, PAGE_W / 2 - 22, PAGE_W / 2 + 22, PAGE_H - 124, w=1.2)

    # main wordmark
    c.setFont(SERIF, 56)
    c.setFillColor(CREAM)
    c.drawCentredString(PAGE_W / 2, PAGE_H / 2 + 70, "PRIME GOLDEN")
    c.setFont(SERIF_IT, 56)
    c.setFillColor(GOLD)
    c.drawCentredString(PAGE_W / 2, PAGE_H / 2 + 18, "Properties.")

    # divider rule
    gold_rule(c, PAGE_W / 2 - 60, PAGE_W / 2 + 60, PAGE_H / 2 - 18, w=0.6)

    # subtitle
    c.setFont(SANS_BOLD, 10)
    c.setFillColor(GOLDS)
    c.setCharSpace(4)
    c.drawCentredString(PAGE_W / 2, PAGE_H / 2 - 44, "BRAND GUIDELINES · 2026 EDITION")
    c.setCharSpace(0)

    # bottom tagline
    c.setFont(SERIF_IT, 13)
    c.setFillColor(CREAM)
    c.drawCentredString(PAGE_W / 2, M + 28, "Land that turns into legacy.")

    # bottom small caption
    c.setFont(SANS, 7.5)
    c.setFillColor(Color(0.97, 0.96, 0.94, alpha=0.45))
    c.setCharSpace(2.5)
    c.drawCentredString(PAGE_W / 2, M + 8, "INTERNAL USE · KEEP CURRENT")
    c.setCharSpace(0)

    c.showPage()

# ----------------------------------------------------------------------
# Page 2 · Contents
# ----------------------------------------------------------------------
def page_contents(c):
    fill_page(c, CREAM)
    draw_header(c, "Contents", 2)

    y = section_title(c, "What's in this book", "Contents.", PAGE_H - 130)

    items = [
        ("01", "Brand essence",        "The mission, the voice, and the three pillars."),
        ("02", "Colour system",        "The palette, hex codes, and the 60/30/10 rule."),
        ("03", "Typography",           "Playfair Display, Montserrat, scale & tracking."),
        ("04", "Logo usage",           "Clear-space, minimum size, and the do's & don'ts."),
        ("05", "Voice & tone",         "How we sound on the page. What we never say."),
        ("06", "Photography",          "The PGP look — and the AI-tells we reject."),
        ("07", "Application examples", "Nav, hero, card, footer — built in the system."),
        ("08", "Guard-rails",          "Six yes/no questions to vet any future visual."),
    ]

    y = PAGE_H - 220
    for num, title, body in items:
        # number
        c.setFont(SERIF, 18)
        c.setFillColor(GOLD)
        c.drawString(M, y, num)
        # title
        c.setFont(SERIF_BOLD, 14)
        c.setFillColor(INK)
        c.drawString(M + 42, y, title)
        # body
        c.setFont(SANS, 9)
        c.setFillColor(INKM)
        c.drawString(M + 42, y - 14, body)
        # rule
        c.setStrokeColor(LINE)
        c.setLineWidth(0.5)
        c.line(M, y - 24, PAGE_W - M, y - 24)
        y -= 50

    c.showPage()

# ----------------------------------------------------------------------
# Page 3 · Brand essence
# ----------------------------------------------------------------------
def page_essence(c):
    fill_page(c, CREAM)
    draw_header(c, "01 · Brand Essence", 3)

    y = section_title(c, "01 · brand essence",
                      "We sell quiet land, not noise.", PAGE_H - 130)

    body_lines = [
        "Prime Golden Properties is a twelve-year-old family-run real estate house in",
        "Tamil Nadu. We do three things, and only three: we sell DTCP-approved",
        "plots in Cheyyar Taluk; we build turnkey homes on them at honest per-",
        "square-foot rates; and we help long-time landowners resell their plots when",
        "their season changes. Three hundred and ten families have signed with us",
        "since 2013, and most of them have referred their cousins.",
    ]
    c.setFont(SERIF, 12)
    c.setFillColor(INKM)
    yy = y - 6
    for line in body_lines:
        c.drawString(M, yy, line)
        yy -= 18

    # quote block
    yy -= 16
    c.setFillColor(GOLD)
    c.rect(M, yy - 60, 3, 60, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont(SERIF_IT, 16)
    c.drawString(M + 14, yy - 8, "We are quietly relentless. We don't shout.")
    c.drawString(M + 14, yy - 28, "We don't dress up. We just show up.")
    c.setFillColor(INKM)
    c.setFont(SANS, 8)
    c.setCharSpace(2)
    c.drawString(M + 14, yy - 50, "— THE FOUNDING TEAM, 2013")
    c.setCharSpace(0)

    # three pillars header
    yy -= 90
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(3)
    c.drawString(M, yy, "THE THREE PILLARS")
    c.setCharSpace(0)
    gold_rule(c, M, M + 28, yy - 8, w=1)

    yy -= 38
    pillars = [
        ("Heritage.",
         "Twelve years, one corridor.",
         "Operating since 2013 from a single back-office in Chennai. Our oldest customers' children are now buying their second plot. Continuity is the moat."),
        ("Honesty.",
         "What's listed is what you pay.",
         "DTCP approvals, parent documents, EC, and patta — verified up-front. Per-sq-ft construction rates published online. Government charges itemised. No verbal commitments."),
        ("Locality.",
         "One pocket, run end-to-end.",
         "We work three villages within Cheyyar Taluk. Not thirty. Same team handles plot, build, and resale, so the file you start with is the file you finish with."),
    ]

    # 3 columns
    col_w = (PAGE_W - 2*M - 32) / 3
    for i, (title, sub, body) in enumerate(pillars):
        x = M + i * (col_w + 16)

        # gold number
        c.setFont(SANS_BOLD, 8)
        c.setFillColor(GOLD)
        c.setCharSpace(2)
        c.drawString(x, yy, f"0{i+1}")
        c.setCharSpace(0)

        # title
        c.setFont(SERIF_BOLD, 18)
        c.setFillColor(INK)
        c.drawString(x, yy - 22, title)

        # sub (wrapped to column width so it doesn't run into next column)
        c.setFont(SERIF_IT, 10.5)
        c.setFillColor(GOLD)
        sub_end_y = wrap_text(c, sub, x, yy - 38, col_w, leading=13)

        # body wrapped, starting below the wrapped sub
        c.setFont(SANS, 9)
        c.setFillColor(INKM)
        wrap_text(c, body, x, sub_end_y - 4, col_w, leading=12)

    c.showPage()

def wrap_text(c, text, x, y, max_w, leading=11):
    """Naïve word-wrap for body text. Returns final y."""
    words = text.split()
    line = ""
    for w in words:
        test = (line + " " + w).strip()
        if c.stringWidth(test, c._fontname, c._fontsize) <= max_w:
            line = test
        else:
            c.drawString(x, y, line)
            y -= leading
            line = w
    if line:
        c.drawString(x, y, line)
        y -= leading
    return y

# ----------------------------------------------------------------------
# Page 4 · Colour palette
# ----------------------------------------------------------------------
def page_colours(c):
    fill_page(c, CREAM)
    draw_header(c, "02 · Colour System", 4)

    y = section_title(c, "02 · colour", "The palette, in three roles.",
                      PAGE_H - 130)

    intro = ("Three colours do the heavy lifting. The rest exist to support them. "
             "Stay within these exact hexes — no hue drift, no \"close enough.\"")
    c.setFont(SANS, 10)
    c.setFillColor(INKM)
    wrap_text(c, intro, M, y - 6, PAGE_W - 2*M - 200, leading=14)

    # Three primary swatches across the top
    y_sw = y - 60
    primaries = [
        ("Deep Green",  "#0F3D2E", DEEP,  "Surface · Hero · Footer",  CREAM),
        ("Cream",       "#F8F5EF", CREAM, "Paper · Nav · Cards",      INK),
        ("Gold",        "#D4A017", GOLD,  "Accent · CTAs · Eyebrows", DEEP),
    ]
    sw_w = (PAGE_W - 2*M - 24) / 3
    sw_h = 160
    for i, (name, hexv, col, role, text_col) in enumerate(primaries):
        x = M + i * (sw_w + 12)
        # swatch
        c.setFillColor(col)
        c.roundRect(x, y_sw - sw_h, sw_w, sw_h, 10, fill=1, stroke=0)
        # name on swatch
        c.setFont(SERIF_BOLD, 18)
        c.setFillColor(text_col)
        c.drawString(x + 14, y_sw - 30, name)
        # hex
        c.setFont(SANS_BOLD, 9)
        c.setCharSpace(2.5)
        c.drawString(x + 14, y_sw - 46, hexv)
        c.setCharSpace(0)
        # role under swatch
        c.setFont(SANS, 9)
        c.setFillColor(INKM)
        c.drawString(x, y_sw - sw_h - 14, role)

    # secondary swatches — 5 across
    y_sec = y_sw - sw_h - 50
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(3)
    c.drawString(M, y_sec, "SUPPORTING TONES")
    c.setCharSpace(0)
    gold_rule(c, M, M + 28, y_sec - 8, w=1)

    y_sec -= 30
    secondaries = [
        ("Gold Soft", "#F2C75C", GOLDS, INK),
        ("Gold Glow", "#FFD580", GOLDG, INK),
        ("Ink",       "#1A1A1A", INK,   CREAM),
        ("Ink Mute",  "#4D5D55", INKM,  CREAM),
        ("Line",      "#E5DDD0", LINE,  INK),
    ]
    s_w = (PAGE_W - 2*M - 4*10) / 5
    s_h = 90
    for i, (name, hexv, col, tc) in enumerate(secondaries):
        x = M + i * (s_w + 10)
        c.setFillColor(col)
        c.roundRect(x, y_sec - s_h, s_w, s_h, 8, fill=1, stroke=0)
        c.setFont(SERIF_BOLD, 12)
        c.setFillColor(tc)
        c.drawString(x + 10, y_sec - 22, name)
        c.setFont(SANS_BOLD, 8)
        c.setCharSpace(2)
        c.drawString(x + 10, y_sec - 36, hexv)
        c.setCharSpace(0)

    # ratio rule
    y_r = y_sec - s_h - 36
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(3)
    c.drawString(M, y_r, "THE 60 · 30 · 10 RULE")
    c.setCharSpace(0)
    gold_rule(c, M, M + 28, y_r - 8, w=1)

    # ratio bar
    bar_y = y_r - 32
    bar_h = 22
    bar_total = PAGE_W - 2*M
    # 60% deep
    c.setFillColor(DEEP)
    c.rect(M, bar_y - bar_h, bar_total * 0.60, bar_h, fill=1, stroke=0)
    # 30% cream
    c.setFillColor(CREAM)
    c.rect(M + bar_total * 0.60, bar_y - bar_h, bar_total * 0.30, bar_h, fill=1, stroke=0)
    # 10% gold
    c.setFillColor(GOLD)
    c.rect(M + bar_total * 0.90, bar_y - bar_h, bar_total * 0.10, bar_h, fill=1, stroke=0)
    # labels under
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(INK)
    c.setCharSpace(2)
    c.drawString(M, bar_y - bar_h - 14, "60% · SURFACE")
    c.drawString(M + bar_total * 0.60, bar_y - bar_h - 14, "30% · SECONDARY")
    c.drawString(M + bar_total * 0.90 - 6, bar_y - bar_h - 14, "10% · GOLD")
    c.setCharSpace(0)

    # explainer
    c.setFont(SANS, 9)
    c.setFillColor(INKM)
    explainer = ("Surface (deep green or cream, depending on the section) covers most of "
                 "the canvas. Secondary tones do the heavy lifting for text. Gold is a "
                 "spice — used for moments that demand the eye. Never the wallpaper.")
    wrap_text(c, explainer, M, bar_y - bar_h - 32, PAGE_W - 2*M, leading=12)

    c.showPage()

# ----------------------------------------------------------------------
# Page 5 · Typography I (Playfair specimen)
# ----------------------------------------------------------------------
def page_typography_1(c):
    fill_page(c, CREAM)
    draw_header(c, "03 · Typography", 5)

    y = section_title(c, "03 · typography", "Playfair Display.", PAGE_H - 130)

    c.setFont(SANS, 10)
    c.setFillColor(INKM)
    intro = ("Our display typeface. We use it for headlines, project names, and the "
             "one italicised emotional word per phrase — for example, the legacy in "
             "\"Land that turns into legacy.\"")
    wrap_text(c, intro, M, y - 6, PAGE_W - 2*M, leading=13)

    # The big specimen
    yy = y - 50
    c.setFont(SERIF, 96)
    c.setFillColor(INK)
    c.drawString(M, yy - 70, "Aa Bb Cc")
    c.setFont(SERIF_IT, 96)
    c.setFillColor(GOLD)
    c.drawString(M, yy - 160, "legacy.")

    # weights demo
    yy = yy - 220
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(3)
    c.drawString(M, yy, "WEIGHTS")
    c.setCharSpace(0)
    gold_rule(c, M, M + 28, yy - 8, w=1)

    yy -= 30
    weights = [
        ("Regular 400",  SERIF,    "Land that turns into legacy."),
        ("Medium 500",   SERIF,    "Land that turns into legacy."),
        ("SemiBold 600", SERIF_BOLD, "Land that turns into legacy."),
        ("Italic 400",   SERIF_IT, "Land that turns into legacy."),
        ("Bold 700",     SERIF_BOLD, "Land that turns into legacy."),
    ]
    for label, font, sample in weights:
        c.setFont(SANS, 8.5)
        c.setFillColor(INKM)
        c.drawString(M, yy, label)
        c.setFont(font, 22)
        c.setFillColor(INK)
        c.drawString(M + 90, yy + 2, sample)
        yy -= 32

    # rules
    yy -= 16
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(3)
    c.drawString(M, yy, "RULES")
    c.setCharSpace(0)
    gold_rule(c, M, M + 28, yy - 8, w=1)

    yy -= 22
    rules = [
        "Letter-spacing tight at display sizes — track in by ~2 %.",
        "Italic emphasis only for one word per heading. Never a whole sentence.",
        "Never set body copy in Playfair. It belongs to titles and quotes.",
    ]
    c.setFont(SANS, 10)
    c.setFillColor(INKM)
    for r in rules:
        c.setFillColor(GOLD)
        c.drawString(M, yy, "—")
        c.setFillColor(INKM)
        c.drawString(M + 14, yy, r)
        yy -= 14

    c.showPage()

# ----------------------------------------------------------------------
# Page 6 · Typography II (Montserrat + scale)
# ----------------------------------------------------------------------
def page_typography_2(c):
    fill_page(c, CREAM)
    draw_header(c, "03 · Typography", 6)

    y = section_title(c, "03 · typography", "Montserrat.", PAGE_H - 130)

    c.setFont(SANS, 10)
    c.setFillColor(INKM)
    intro = ("The voice of every UI surface — body copy, button labels, "
             "navigation links, and uppercase micro-labels (eyebrows).")
    wrap_text(c, intro, M, y - 6, PAGE_W - 2*M, leading=13)

    # weight scale
    yy = y - 38
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(3)
    c.drawString(M, yy, "WEIGHT SCALE")
    c.setCharSpace(0)
    gold_rule(c, M, M + 28, yy - 8, w=1)

    yy -= 30
    weights = [
        ("Light 300",    SANS,       "The PGP team has been here since 2013."),
        ("Regular 400",  SANS,       "The PGP team has been here since 2013."),
        ("Medium 500",   SANS_BOLD,  "The PGP team has been here since 2013."),
        ("SemiBold 600", SANS_BOLD,  "The PGP team has been here since 2013."),
        ("Bold 700",     SANS_BOLD,  "The PGP team has been here since 2013."),
    ]
    for label, font, sample in weights:
        c.setFont(SANS, 8.5)
        c.setFillColor(INKM)
        c.drawString(M, yy, label)
        c.setFont(font, 13)
        c.setFillColor(INK)
        c.drawString(M + 90, yy, sample)
        yy -= 22

    # size scale
    yy -= 14
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(3)
    c.drawString(M, yy, "SIZE SCALE")
    c.setCharSpace(0)
    gold_rule(c, M, M + 28, yy - 8, w=1)

    yy -= 26
    sizes = [
        ("Headline",      SERIF,      30, "Land that turns into legacy."),
        ("Section title", SERIF,      22, "Three doors. One trusted partner."),
        ("Card title",    SERIF_BOLD, 16, "Sulaman Nagar."),
        ("Body",          SANS,       11, "DTCP-approved plots, honest construction."),
        ("Eyebrow",       SANS_BOLD,   9, "EST. 2013 · CHEYYAR OUTSKIRTS"),
    ]
    for label, font, size, sample in sizes:
        c.setFont(SANS, 8.5)
        c.setFillColor(INKM)
        c.drawString(M, yy, label)
        c.setFont(font, size)
        c.setFillColor(INK)
        if label == "Eyebrow":
            c.setCharSpace(3)
            c.setFillColor(GOLD)
            c.drawString(M + 110, yy, sample)
            c.setCharSpace(0)
        else:
            c.drawString(M + 110, yy + 2, sample)
        yy -= (size + 14)

    # tracking note
    yy -= 6
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(3)
    c.drawString(M, yy, "LETTER-SPACING")
    c.setCharSpace(0)
    gold_rule(c, M, M + 28, yy - 8, w=1)

    yy -= 22
    rules = [
        "Body: 0em.",
        "Eyebrow caps: track to 0.18–0.24em. Gold colour.",
        "Display: tight, ~-0.02em.",
    ]
    c.setFont(SANS, 10)
    c.setFillColor(INKM)
    for r in rules:
        c.setFillColor(GOLD)
        c.drawString(M, yy, "—")
        c.setFillColor(INKM)
        c.drawString(M + 14, yy, r)
        yy -= 14

    c.showPage()

# ----------------------------------------------------------------------
# Page 7 · Logo usage
# ----------------------------------------------------------------------
def draw_pgp_logo_mock(c, x, y, w, h, on_dark=False):
    """Draws a stylised representation of the PGP logo lockup inside (x,y,w,h).
    Top half = pin + diamond emblem. Bottom half = PRIME GOLDEN PROPERTIES wordmark."""
    cx = x + w / 2

    # ----- TOP HALF: emblem (occupies upper 55% of the box) -----
    emblem_h = h * 0.55
    emblem_bottom = y + h - emblem_h
    emblem_top = y + h

    # Pin marker (golden, hollow)
    pin_r = min(emblem_h * 0.18, w * 0.10)
    pin_cy = emblem_top - pin_r * 1.3
    c.setFillColor(GOLD)
    c.circle(cx, pin_cy, pin_r, fill=1, stroke=0)
    c.setFillColor(CREAM)
    c.circle(cx, pin_cy, pin_r * 0.45, fill=1, stroke=0)
    # Pin tail (small downward triangle)
    p = c.beginPath()
    p.moveTo(cx - pin_r * 0.5, pin_cy - pin_r * 0.85)
    p.lineTo(cx + pin_r * 0.5, pin_cy - pin_r * 0.85)
    p.lineTo(cx, pin_cy - pin_r * 1.6)
    p.lineTo(cx - pin_r * 0.5, pin_cy - pin_r * 0.85)
    c.setFillColor(GOLD)
    c.drawPath(p, fill=1, stroke=0)

    # Diamond plot symbol — two triangles meeting at centre
    dia_w = min(w * 0.34, emblem_h * 0.6)
    dia_h = dia_w * 0.5
    dia_cy = emblem_bottom + dia_h * 0.5
    # left (deep green)
    pL = c.beginPath()
    pL.moveTo(cx, dia_cy + dia_h)
    pL.lineTo(cx - dia_w / 2, dia_cy)
    pL.lineTo(cx, dia_cy - dia_h * 0.5)
    pL.lineTo(cx, dia_cy + dia_h)
    c.setFillColor(DEEP)
    c.drawPath(pL, fill=1, stroke=0)
    # right (gold)
    pR = c.beginPath()
    pR.moveTo(cx, dia_cy + dia_h)
    pR.lineTo(cx + dia_w / 2, dia_cy)
    pR.lineTo(cx, dia_cy - dia_h * 0.5)
    pR.lineTo(cx, dia_cy + dia_h)
    c.setFillColor(GOLD)
    c.drawPath(pR, fill=1, stroke=0)

    # ----- BOTTOM HALF: wordmark (occupies lower 45%) -----
    text_top = y + h - emblem_h
    # "PRIME GOLDEN" — drawn as ONE centered group with two colours
    font_size = min(h * 0.13, w * 0.10)
    c.setFont(SERIF_BOLD, font_size)
    prime_w = c.stringWidth("PRIME", SERIF_BOLD, font_size)
    space_w = c.stringWidth(" ", SERIF_BOLD, font_size)
    golden_w = c.stringWidth("GOLDEN", SERIF_BOLD, font_size)
    total_w = prime_w + space_w + golden_w
    start_x = cx - total_w / 2

    wordmark_y = text_top - font_size * 0.4
    c.setFillColor(DEEP if not on_dark else CREAM)
    c.drawString(start_x, wordmark_y, "PRIME")
    c.setFillColor(GOLD)
    c.drawString(start_x + prime_w + space_w, wordmark_y, "GOLDEN")

    # PROPERTIES + gold rules on either side
    prop_y = wordmark_y - font_size * 0.7
    prop_font = font_size * 0.55
    c.setFont(SANS_BOLD, prop_font)
    prop_w = c.stringWidth("PROPERTIES", SANS_BOLD, prop_font) + (prop_font * 0.15 * 9)
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.6)
    rule_y = prop_y + prop_font * 0.35
    rule_inset = prop_w / 2 + 6
    c.line(cx - rule_inset - 16, rule_y, cx - rule_inset, rule_y)
    c.line(cx + rule_inset, rule_y, cx + rule_inset + 16, rule_y)
    c.setFillColor(INK if not on_dark else CREAM)
    c.setCharSpace(1.5)
    c.drawCentredString(cx, prop_y, "PROPERTIES")
    c.setCharSpace(0)

    # tagline
    tag_y = prop_y - prop_font * 1.8
    c.setFont(SERIF_IT, prop_font * 0.85)
    c.setFillColor(INKM if not on_dark else Color(0.97, 0.96, 0.94, alpha=0.7))
    c.drawCentredString(cx, tag_y, "Right Location. Right Decision.")

def page_logo(c):
    fill_page(c, CREAM)
    draw_header(c, "04 · Logo", 7)

    y = section_title(c, "04 · logo",
                      "One logo, two surfaces.", PAGE_H - 130)

    intro = ("The logo is a transparent PNG. The wordmark and tagline live inside it. "
             "Never recreate the wordmark in another typeface beside it.")
    c.setFont(SANS, 10)
    c.setFillColor(INKM)
    wrap_text(c, intro, M, y - 6, PAGE_W - 2*M, leading=13)

    # Two-up: logo on cream / logo on deep
    yy = y - 60
    half = (PAGE_W - 2*M - 20) / 2

    # Cream surface example
    c.setFillColor(CREAM)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.roundRect(M, yy - 160, half, 160, 10, fill=1, stroke=1)
    draw_pgp_logo_mock(c, M + half*0.25, yy - 145, half*0.5, 130, on_dark=False)
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(2)
    c.drawString(M + 12, yy - 154, "ON CREAM · NO TILE")
    c.setCharSpace(0)

    # Deep green surface example
    c.setFillColor(DEEP)
    c.roundRect(M + half + 20, yy - 160, half, 160, 10, fill=1, stroke=0)
    # cream tile inside it
    tx = M + half + 20 + half*0.25
    ty = yy - 145
    tw = half * 0.5
    th = 130
    c.setFillColor(CREAM)
    c.roundRect(tx, ty, tw, th, 8, fill=1, stroke=0)
    draw_pgp_logo_mock(c, tx, ty, tw, th, on_dark=False)
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(2)
    c.drawString(M + half + 32, yy - 154, "ON DEEP GREEN · CREAM TILE")
    c.setCharSpace(0)

    # Clear-space rule
    yy -= 200
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(3)
    c.drawString(M, yy, "CLEAR-SPACE & MINIMUM SIZE")
    c.setCharSpace(0)
    gold_rule(c, M, M + 28, yy - 8, w=1)

    yy -= 22
    rules = [
        ("Clear-space",
         "Leave at least the height of the pin icon as breathing room on every side."),
        ("Minimum digital size",
         "60 px tall (icon-only) · 100 px tall (full lockup). Anything smaller will lose the wordmark."),
        ("Minimum print size",
         "12 mm tall. Below that, use the icon-only mark."),
    ]
    for label, body in rules:
        c.setFont(SERIF_BOLD, 12)
        c.setFillColor(INK)
        c.drawString(M, yy, label)
        c.setFont(SANS, 9.5)
        c.setFillColor(INKM)
        wrap_text(c, body, M + 150, yy, PAGE_W - 2*M - 150, leading=12)
        yy -= 24

    c.showPage()

# ----------------------------------------------------------------------
# Page 8 · Logo don'ts
# ----------------------------------------------------------------------
def page_logo_donts(c):
    fill_page(c, CREAM)
    draw_header(c, "04 · Logo", 8)

    y = section_title(c, "04 · logo", "Don't.", PAGE_H - 130)

    intro = ("Five misuses we see most often. If a layout commits any of these, send it back.")
    c.setFont(SANS, 10)
    c.setFillColor(INKM)
    wrap_text(c, intro, M, y - 6, PAGE_W - 2*M, leading=13)

    yy = y - 40
    donts = [
        ("Don't add a typeset wordmark.",
         "The PNG already contains \"PRIME GOLDEN PROPERTIES.\" Setting it again in Playfair or Helvetica beside the lockup creates a double-brand."),
        ("Don't stretch or distort.",
         "Always scale uniformly. Lock the aspect ratio of 1080 × 1350. No squashing for headers."),
        ("Don't recolour.",
         "Never turn the logo all-white, all-black, or any single colour. The gold and green together are the brand. Pick a surface that contrasts properly instead."),
        ("Don't drop on busy photography.",
         "If the photo has any green or gold near the logo position, place the logo inside a cream tile first."),
        ("Don't rotate, skew, or add effects.",
         "No drop shadows on the icon itself (the cream tile carries the shadow). No outlines, glows, embosses, or strokes."),
    ]

    for i, (title, body) in enumerate(donts):
        # red X badge
        c.setFillColor(HexColor("#8B3A3A"))
        c.circle(M + 8, yy - 6, 7, fill=1, stroke=0)
        c.setFont(SANS_BOLD, 9)
        c.setFillColor(CREAM)
        c.drawCentredString(M + 8, yy - 9, "×")

        # title
        c.setFont(SERIF_BOLD, 13)
        c.setFillColor(INK)
        c.drawString(M + 26, yy, title)
        # body
        c.setFont(SANS, 9.5)
        c.setFillColor(INKM)
        next_y = wrap_text(c, body, M + 26, yy - 14, PAGE_W - 2*M - 26, leading=12)
        yy = next_y - 18

    c.showPage()

# ----------------------------------------------------------------------
# Page 9 · Voice & tone
# ----------------------------------------------------------------------
def page_voice(c):
    fill_page(c, CREAM)
    draw_header(c, "05 · Voice & Tone", 9)

    y = section_title(c, "05 · voice & tone",
                      "We sound like the family next door.", PAGE_H - 130)

    intro = ("Twelve years of Tamil real-estate buying isn't sold by slogans. "
             "It's sold by sentences that feel familiar.")
    c.setFont(SANS, 10)
    c.setFillColor(INKM)
    wrap_text(c, intro, M, y - 6, PAGE_W - 2*M, leading=13)

    # Five voice principles
    yy = y - 50
    principles = [
        ("Quietly confident.",
         "We don't shout. We don't use exclamation marks. We let the twelve years speak."),
        ("Long-form trust over hype.",
         "We explain DTCP. We list every cost. We say \"approximately\" when we don't know exactly."),
        ("Words we use.",
         "Plot. Family. Layout. Site visit. Patta. Documentation. Handover. Land."),
        ("Words we never use.",
         "Asset. Investment opportunity. Synergy. Game-changer. Limited-time-only. Don't miss."),
        ("Plain Tamil-English okay.",
         "\"Rs.4 L plots\" is fine. \"Rs.400,000 INR\" is not. Use lakhs and crores; this is India."),
    ]
    for i, (title, body) in enumerate(principles):
        c.setFont(SERIF, 22)
        c.setFillColor(GOLD)
        c.drawString(M, yy, f"0{i+1}")
        c.setFont(SERIF_BOLD, 13)
        c.setFillColor(INK)
        c.drawString(M + 32, yy, title)
        c.setFont(SANS, 9.5)
        c.setFillColor(INKM)
        wrap_text(c, body, M + 32, yy - 14, PAGE_W - 2*M - 32, leading=12)
        yy -= 38

    # Side-by-side write / don't-write
    yy -= 4
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(3)
    c.drawString(M, yy, "WRITE / DON'T WRITE")
    c.setCharSpace(0)
    gold_rule(c, M, M + 28, yy - 8, w=1)

    yy -= 26
    pairs = [
        ("Schedule a Site Visit",       "Book Now! / Click Here"),
        ("Three doors. One trusted partner.", "Your one-stop real estate solution"),
        ("Land that turns into legacy.", "Invest in your future today"),
        ("DTCP-approved · Rs.4 L onwards", "STARTING JUST Rs.4 LAKHS!!!"),
    ]
    col = (PAGE_W - 2*M) / 2
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(HexColor("#2E7D5B"))
    c.setCharSpace(2)
    c.drawString(M, yy, "✓  WE WRITE")
    c.setFillColor(HexColor("#8B3A3A"))
    c.drawString(M + col, yy, "×  WE DON'T")
    c.setCharSpace(0)
    gold_rule(c, M, PAGE_W - M, yy - 8, w=0.4)

    yy -= 22
    for good, bad in pairs:
        c.setFont(SERIF_IT, 12)
        c.setFillColor(INK)
        c.drawString(M, yy, good)
        c.setFont(SANS_OB, 11)
        c.setFillColor(INKF)
        c.drawString(M + col, yy, bad)
        yy -= 22

    c.showPage()

# ----------------------------------------------------------------------
# Page 10 · Photography principles
# ----------------------------------------------------------------------
def page_photography(c):
    fill_page(c, CREAM)
    draw_header(c, "06 · Photography", 10)

    y = section_title(c, "06 · photography",
                      "Rural Tamil Nadu, golden hour.", PAGE_H - 130)

    intro = ("Every image on the site should feel like it was shot the day before "
             "yesterday, with the light just right. We are not Pinterest USA. We "
             "are the road to Cheyyar at 5:42 pm.")
    c.setFont(SANS, 10)
    c.setFillColor(INKM)
    wrap_text(c, intro, M, y - 6, PAGE_W - 2*M, leading=13)

    yy = y - 40
    # The mood "tile grid" — drawn as colored rectangles representing photo zones
    tile_w = (PAGE_W - 2*M - 16) / 3
    tile_h = 95
    moods = [
        ("Red earth · palms", DEEP, GOLDS),
        ("Golden hour · long shadows", GOLD, DEEP),
        ("South Indian family", DEEP2, GOLDG),
        ("Tamil vernacular home", HexColor("#8B5A2B"), CREAM),
        ("Survey · key · patta", DEEP, GOLD),
        ("Eastern Ghats horizon", HexColor("#6B7F6E"), CREAM),
    ]
    for i, (label, bg, fg) in enumerate(moods):
        col_i = i % 3
        row_i = i // 3
        x = M + col_i * (tile_w + 8)
        ty = yy - tile_h - row_i * (tile_h + 8)
        c.setFillColor(bg)
        c.roundRect(x, ty, tile_w, tile_h, 8, fill=1, stroke=0)
        c.setFont(SERIF_BOLD, 11)
        c.setFillColor(fg)
        c.drawString(x + 12, ty + tile_h - 22, label)

    # principles list
    yy = yy - 2 * (tile_h + 8) - 28
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(3)
    c.drawString(M, yy, "WHAT THE PGP LOOK IS")
    c.setCharSpace(0)
    gold_rule(c, M, M + 28, yy - 8, w=1)

    yy -= 22
    principles = [
        "35mm photographic realism, full-frame DSLR feel. No HDR.",
        "Golden hour, soft warm sienna light, long shadows toward camera.",
        "Cinematic colour grade — warm midtones, lifted blacks, slight haze.",
        "South Indian families with faces partial, in profile, or out-of-frame.",
        "Red-earth ground, palms, tamarind trees, distant Eastern Ghats.",
        "Tamil vernacular architecture — terracotta tiles, lime-washed walls.",
        "Detail props: brass key, sale deed, patta, theodolite, red soil.",
    ]
    c.setFont(SANS, 10)
    c.setFillColor(INKM)
    for p in principles:
        c.setFillColor(GOLD)
        c.drawString(M, yy, "—")
        c.setFillColor(INKM)
        c.drawString(M + 14, yy, p)
        yy -= 14

    c.showPage()

# ----------------------------------------------------------------------
# Page 11 · Anti-patterns
# ----------------------------------------------------------------------
def page_antipatterns(c):
    fill_page(c, CREAM)
    draw_header(c, "06 · Photography · Don't", 11)

    y = section_title(c, "06 · photography don't",
                      "Reject on sight.", PAGE_H - 130)

    intro = ("These are the AI-generated and Western-stock tells. The moment you "
             "see one, the image fails the brand. No discussion.")
    c.setFont(SANS, 10)
    c.setFillColor(INKM)
    wrap_text(c, intro, M, y - 6, PAGE_W - 2*M, leading=13)

    yy = y - 40
    antis = [
        ("Garbled signage text",
         "Tiny illegible letters on signs, books, computer screens. AI giveaway #1. If any text in the frame is fake-looking, the whole image is unusable."),
        ("Smiling stock model",
         "Direct-to-camera grin, porcelain teeth, business attire, no context. Looks like a SaaS landing page. Our customers don't smile like that."),
        ("Western corporate lighting",
         "Flat key + softbox fill, no shadows, magazine perfection. Replace with golden-hour directional sun and a soft fill from the sky."),
        ("Glass & infinity pool",
         "Glass-clad high-rises, infinity pools, Singapore skylines. We sell village land. None of that exists in Cheyyar."),
        ("English suburban lawn",
         "Lush green Pinterest-USA grass, picket fences, two-car garage. Wrong climate, wrong palette, wrong country."),
        ("Hands-with-too-many-fingers",
         "Classic generative-AI failure. Hands holding keys / papers must look anatomically right. If a finger is bent backward, kill the image."),
        ("Watermarks, logos, captions inside the frame.",
         "No Shutterstock badge. No \"Stock.adobe\" tag. No caption box. Clean image only."),
    ]
    for title, body in antis:
        c.setFillColor(HexColor("#8B3A3A"))
        c.circle(M + 8, yy - 6, 7, fill=1, stroke=0)
        c.setFont(SANS_BOLD, 9)
        c.setFillColor(CREAM)
        c.drawCentredString(M + 8, yy - 9, "×")

        c.setFont(SERIF_BOLD, 12)
        c.setFillColor(INK)
        c.drawString(M + 26, yy, title)
        c.setFont(SANS, 9)
        c.setFillColor(INKM)
        ny = wrap_text(c, body, M + 26, yy - 12, PAGE_W - 2*M - 26, leading=11)
        yy = ny - 12

    c.showPage()

# ----------------------------------------------------------------------
# Page 12 · Application mocks (nav + hero)
# ----------------------------------------------------------------------
def page_applications_1(c):
    fill_page(c, CREAM)
    draw_header(c, "07 · Applications", 12)

    y = section_title(c, "07 · applications",
                      "Built in the system.", PAGE_H - 130)

    intro = ("How the palette, type, and logo translate into the actual product surfaces.")
    c.setFont(SANS, 10)
    c.setFillColor(INKM)
    wrap_text(c, intro, M, y - 6, PAGE_W - 2*M, leading=13)

    # Nav mockup
    yy = y - 50
    nav_h = 78
    c.setFillColor(CREAM)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.roundRect(M, yy - nav_h, PAGE_W - 2*M, nav_h, 0, fill=1, stroke=1)
    # left nav links
    c.setFont(SANS, 10)
    c.setFillColor(DEEP)
    for i, link in enumerate(["Plots", "Construction", "Resale"]):
        c.drawString(M + 14 + i*64, yy - nav_h/2 + 4, link)
    # centred logo mock
    draw_pgp_logo_mock(c, PAGE_W/2 - 38, yy - nav_h + 6, 76, nav_h - 12, on_dark=False)
    # right nav links
    c.setFont(SANS, 10)
    c.setFillColor(DEEP)
    for i, link in enumerate(["Locations", "About", "Contact"]):
        c.drawString(PAGE_W - M - 240 + i*64, yy - nav_h/2 + 4, link)
    # gold pill CTA
    cta_x = PAGE_W - M - 140
    cta_y = yy - nav_h/2 - 12
    c.setFillColor(GOLD)
    c.roundRect(cta_x, cta_y, 124, 28, 14, fill=1, stroke=0)
    c.setFont(SANS_BOLD, 10)
    c.setFillColor(DEEP)
    c.drawCentredString(cta_x + 62, cta_y + 10, "Schedule Site Visit")
    # label
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(2)
    c.drawString(M, yy + 6, "01 · NAV BAR · ON CREAM")
    c.setCharSpace(0)

    # Hero mockup
    yy -= (nav_h + 30)
    hero_h = 280
    c.setFillColor(DEEP)
    c.roundRect(M, yy - hero_h, PAGE_W - 2*M, hero_h, 16, fill=1, stroke=0)

    # gold corner glow
    c.setFillColor(Color(0.83, 0.63, 0.09, alpha=0.12))
    c.circle(PAGE_W - M - 30, yy - 30, 110, fill=1, stroke=0)

    # eyebrow chip
    chip_x = M + 24
    chip_y = yy - 36
    c.setFillColor(Color(0.83, 0.63, 0.09, alpha=0.10))
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.5)
    c.roundRect(chip_x, chip_y, 240, 22, 11, fill=1, stroke=1)
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(3)
    c.drawString(chip_x + 12, chip_y + 7, "EST. 2013 · 310+ FAMILIES · CHEYYAR")
    c.setCharSpace(0)

    # huge headline
    c.setFont(SERIF, 38)
    c.setFillColor(CREAM)
    c.drawString(M + 24, yy - 86, "Land that turns")
    c.drawString(M + 24, yy - 124, "into ")
    c.setFont(SERIF_IT, 38)
    c.setFillColor(GOLD)
    c.drawString(M + 24 + c.stringWidth("into ", SERIF, 38), yy - 124, "legacy.")

    # sub copy
    c.setFont(SANS, 10)
    c.setFillColor(Color(0.97, 0.96, 0.94, alpha=0.78))
    sub = ("DTCP-approved plots, turnkey construction at honest rates,")
    c.drawString(M + 24, yy - 150, sub)
    c.drawString(M + 24, yy - 164, "and trusted resale across Cheyyar Taluk.")

    # gold CTA
    cta2_x = M + 24
    cta2_y = yy - 200
    c.setFillColor(GOLD)
    c.roundRect(cta2_x, cta2_y, 168, 32, 16, fill=1, stroke=0)
    c.setFont(SANS_BOLD, 10)
    c.setFillColor(DEEP)
    c.drawCentredString(cta2_x + 84, cta2_y + 12, "Schedule a Site Visit")

    # secondary link
    c.setFont(SANS, 10)
    c.setFillColor(Color(0.97, 0.96, 0.94, alpha=0.85))
    c.drawString(cta2_x + 184, cta2_y + 12, "Or browse available plots →")

    # label
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(2)
    c.drawString(M, yy + 6, "02 · HERO · ON DEEP GREEN")
    c.setCharSpace(0)

    c.showPage()

# ----------------------------------------------------------------------
# Page 13 · Application mocks (card + footer)
# ----------------------------------------------------------------------
def page_applications_2(c):
    fill_page(c, CREAM)
    draw_header(c, "07 · Applications", 13)

    y = section_title(c, "07 · applications",
                      "Cards and footers.", PAGE_H - 130)

    # Project card mockup
    yy = y - 50
    card_w = (PAGE_W - 2*M - 20) / 2
    card_h = 280

    # card 1 — project
    c.setFillColor(CREAM)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.roundRect(M, yy - card_h, card_w, card_h, 18, fill=1, stroke=1)
    # image area (placeholder)
    img_h = 160
    c.setFillColor(HexColor("#8B5A2B"))
    c.roundRect(M, yy - img_h, card_w, img_h, 18, fill=1, stroke=0)
    # mask top of "image" so corners only top-rounded
    # status pill on image
    c.setFillColor(HexColor("#2E7D5B"))
    c.roundRect(M + 12, yy - 30, 88, 22, 11, fill=1, stroke=0)
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(CREAM)
    c.setCharSpace(2)
    c.drawString(M + 22, yy - 23, "AVAILABLE")
    c.setCharSpace(0)
    # price pill bottom-right of image
    c.setFillColor(DEEP)
    c.roundRect(M + card_w - 70, yy - img_h + 12, 56, 24, 6, fill=1, stroke=0)
    c.setFont(SANS_BOLD, 11)
    c.setFillColor(GOLD)
    c.drawCentredString(M + card_w - 42, yy - img_h + 19, "Rs.9 L")
    # location eyebrow
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(2.5)
    c.drawString(M + 16, yy - img_h - 22, "PAPANTHANGAL")
    c.setCharSpace(0)
    # title
    c.setFont(SERIF_BOLD, 16)
    c.setFillColor(INK)
    c.drawString(M + 16, yy - img_h - 44, "Sulaman Nagar")
    # body
    c.setFont(SANS, 9)
    c.setFillColor(INKM)
    c.drawString(M + 16, yy - img_h - 60, "Plot size: 1,200 sq ft")
    # tags
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(INKF)
    c.setCharSpace(2)
    c.drawString(M + 16, yy - img_h - 76, "DTCP APPROVED · READY TO CONSTRUCT")
    c.setCharSpace(0)
    # CTA pill
    cta_y = yy - card_h + 16
    c.setFillColor(GOLD)
    c.roundRect(M + 16, cta_y, card_w - 32, 28, 14, fill=1, stroke=0)
    c.setFont(SANS_BOLD, 9)
    c.setFillColor(DEEP)
    c.drawString(M + 30, cta_y + 10, "View project")
    c.drawRightString(M + card_w - 30, cta_y + 10, "→")

    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(2)
    c.drawString(M, yy + 6, "03 · PROJECT CARD")
    c.setCharSpace(0)

    # Pricing card (premium tier)
    x2 = M + card_w + 20
    c.setFillColor(DEEP)
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.6)
    c.roundRect(x2, yy - card_h, card_w, card_h, 18, fill=1, stroke=1)
    # most popular pill
    c.setFillColor(GOLD)
    c.roundRect(x2 + card_w - 110, yy - 30, 96, 22, 11, fill=1, stroke=0)
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(DEEP)
    c.setCharSpace(2)
    c.drawString(x2 + card_w - 96, yy - 23, "MOST POPULAR")
    c.setCharSpace(0)
    # tier eyebrow
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(3)
    c.drawString(x2 + 16, yy - 36, "PREMIUM")
    c.setCharSpace(0)
    # price
    c.setFont(SERIF_BOLD, 30)
    c.setFillColor(CREAM)
    c.drawString(x2 + 16, yy - 76, "Rs. 2,450")
    c.setFont(SANS, 10)
    c.setFillColor(Color(0.97, 0.96, 0.94, alpha=0.6))
    c.drawString(x2 + 140, yy - 70, "/ sq ft")
    # blurb
    c.setFont(SANS, 9)
    c.setFillColor(Color(0.97, 0.96, 0.94, alpha=0.78))
    c.drawString(x2 + 16, yy - 100, "Our most-asked tier. Strong finishes,")
    c.drawString(x2 + 16, yy - 113, "no compromise on essentials.")
    # divider
    c.setStrokeColor(Color(0.83, 0.63, 0.09, alpha=0.3))
    c.setLineWidth(0.5)
    c.line(x2 + 16, yy - 128, x2 + card_w - 16, yy - 128)
    # features
    feats = ["Vitrified flooring throughout", "Modular kitchen (basic)",
             "Premium fittings (Jaquar)", "5-year structural warranty"]
    c.setFont(SANS, 9)
    fy = yy - 144
    for f in feats:
        c.setFillColor(GOLD)
        c.drawString(x2 + 16, fy, "✓")
        c.setFillColor(Color(0.97, 0.96, 0.94, alpha=0.88))
        c.drawString(x2 + 30, fy, f)
        fy -= 16
    # CTA inside card
    cta_y = yy - card_h + 16
    c.setFillColor(GOLD)
    c.roundRect(x2 + 16, cta_y, card_w - 32, 30, 15, fill=1, stroke=0)
    c.setFont(SANS_BOLD, 9)
    c.setFillColor(DEEP)
    c.drawCentredString(x2 + card_w/2, cta_y + 11, "Request detailed quote →")

    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(2)
    c.drawString(x2, yy + 6, "04 · PRICING TIER (FEATURED)")
    c.setCharSpace(0)

    # Footer mockup
    yy -= card_h + 36
    foot_h = 130
    c.setFillColor(DEEP)
    c.roundRect(M, yy - foot_h, PAGE_W - 2*M, foot_h, 0, fill=1, stroke=0)

    # logo tile in footer
    tile_w = 70
    tile_h = 76
    c.setFillColor(CREAM)
    c.roundRect(M + 16, yy - 18 - tile_h, tile_w, tile_h, 10, fill=1, stroke=0)
    draw_pgp_logo_mock(c, M + 16, yy - 18 - tile_h, tile_w, tile_h, on_dark=False)

    # cols header
    cols = ["SERVICES", "LOCATIONS", "CONTACT"]
    col_xs = [M + 110, M + 220, M + 330]
    for cx, h in zip(col_xs, cols):
        c.setFont(SANS_BOLD, 8)
        c.setFillColor(GOLD)
        c.setCharSpace(2.5)
        c.drawString(cx, yy - 24, h)
        c.setCharSpace(0)
        c.setFont(SANS, 8.5)
        c.setFillColor(Color(0.97, 0.96, 0.94, alpha=0.6))
        if h == "SERVICES":
            for i, l in enumerate(["Plots", "Construction", "Resale"]):
                c.drawString(cx, yy - 40 - i*13, l)
        elif h == "LOCATIONS":
            for i, l in enumerate(["Papanthangal", "Perumpallam", "Cheyyar"]):
                c.drawString(cx, yy - 40 - i*13, l)
        else:
            for i, l in enumerate(["+91 98765 43210", "WhatsApp", "info@primegoldenproperties.in"]):
                c.drawString(cx, yy - 40 - i*13, l)

    # rera tiny strip
    c.setFont(SANS, 7)
    c.setFillColor(Color(0.97, 0.96, 0.94, alpha=0.35))
    c.drawString(M + 16, yy - foot_h + 12, "© 2026 Prime Golden Properties · RERA TN/01/Building/0123/2024")

    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(2)
    c.drawString(M, yy + 6, "05 · FOOTER")
    c.setCharSpace(0)

    c.showPage()

# ----------------------------------------------------------------------
# Page 14 · Guard-rails (closing)
# ----------------------------------------------------------------------
def page_guardrails(c):
    fill_page(c, DEEP)

    # corner glow
    c.setFillColor(Color(0.83, 0.63, 0.09, alpha=0.10))
    c.circle(60, PAGE_H - 60, 220, fill=1, stroke=0)
    c.setFillColor(Color(0.83, 0.63, 0.09, alpha=0.06))
    c.circle(PAGE_W - 80, 100, 220, fill=1, stroke=0)

    # header on dark
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(2.5)
    c.drawString(M, PAGE_H - M + 8, "PGP · BRAND GUIDELINES")
    c.setCharSpace(0)
    c.setFillColor(GOLDS)
    c.setFont(SANS, 8)
    c.drawRightString(PAGE_W - M, PAGE_H - M + 8, "08 · GUARD-RAILS")
    gold_rule(c, M, PAGE_W - M, PAGE_H - M + 2, w=0.5)

    # eyebrow
    c.setFont(SANS_BOLD, 8)
    c.setFillColor(GOLD)
    c.setCharSpace(3)
    c.drawString(M, PAGE_H - 130, "08 · GUARD-RAILS")
    c.setCharSpace(0)
    gold_rule(c, M, M + 28, PAGE_H - 138, w=1)

    # huge title
    c.setFont(SERIF, 36)
    c.setFillColor(CREAM)
    c.drawString(M, PAGE_H - 180, "When in doubt,")
    c.setFont(SERIF_IT, 36)
    c.setFillColor(GOLD)
    c.drawString(M, PAGE_H - 220, "ask six questions.")

    intro = ("Before any image, page, or piece of copy ships — anyone on the team can "
             "stop the launch by failing it through this six-question filter.")
    c.setFont(SANS, 10)
    c.setFillColor(Color(0.97, 0.96, 0.94, alpha=0.78))
    wrap_text(c, intro, M, PAGE_H - 250, PAGE_W - 2*M, leading=13)

    # six questions
    yy = PAGE_H - 300
    qs = [
        "Does it look like rural Tamil Nadu — not Pinterest USA?",
        "Are deep green and warm gold still the dominant duo?",
        "Is there any garbled text or AI watermark in the frame? (If yes, kill it.)",
        "Could a real PGP customer point at it and say \"yes, that's our area\"?",
        "Did we resist the urge to put a smiling business model in frame?",
        "Is the lighting golden hour or just-after-dawn — not midday flat?",
    ]
    for i, q in enumerate(qs):
        # gold check box
        c.setStrokeColor(GOLD)
        c.setLineWidth(0.8)
        c.roundRect(M, yy - 12, 14, 14, 2, fill=0, stroke=1)
        # question
        c.setFont(SERIF, 14)
        c.setFillColor(CREAM)
        ny = wrap_text(c, q, M + 24, yy, PAGE_W - 2*M - 24, leading=18)
        yy = ny - 8

    # closing line
    c.setFont(SERIF_IT, 13)
    c.setFillColor(GOLD)
    c.drawCentredString(PAGE_W / 2, M + 50, "Land that turns into legacy.")
    c.setFont(SANS, 7)
    c.setFillColor(GOLDS)
    c.setCharSpace(3)
    c.drawCentredString(PAGE_W / 2, M + 32, "PRIME GOLDEN PROPERTIES · 2026 EDITION")
    c.setCharSpace(0)

    c.showPage()

# ----------------------------------------------------------------------
# Build
# ----------------------------------------------------------------------
def build():
    c = canvas.Canvas(OUT, pagesize=A4)
    c.setTitle("Prime Golden Properties — Brand Guidelines (2026)")
    c.setAuthor("PGP Design")
    c.setSubject("Brand identity, voice, imagery, and application rules")
    c.setCreator("PGP Brand Studio")

    page_cover(c)
    page_contents(c)
    page_essence(c)
    page_colours(c)
    page_typography_1(c)
    page_typography_2(c)
    page_logo(c)
    page_logo_donts(c)
    page_voice(c)
    page_photography(c)
    page_antipatterns(c)
    page_applications_1(c)
    page_applications_2(c)
    page_guardrails(c)

    c.save()
    print(f"Saved: {OUT}")

if __name__ == "__main__":
    build()
