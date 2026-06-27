# Instive AI — Design System (v1.0)

Brand: Instive AI — agency wiring autonomous agents into supply chain, procurement, logistics, and warehousing.
Theme: "freight at night" — industrial, engineered, operator-grade. Not soft, not hype-y.

## Color tokens
| Name | Hex | Usage |
|---|---|---|
| Freight Slate | #0E1A24 | Primary ground / dark background |
| Raised Slate | #16252F | Cards, elevated panels |
| Edge Slate | #1F313C | Dividers, borders, inset edges |
| Warehouse Paper | #F5F2EA | Primary text on dark, or light background |
| Dim Paper | #D8D3C7 | Secondary / muted text |
| Hi-Vis Amber | #FFB23E | THE accent — CTAs, glyph, signal. Use sparingly. |
| Deep Amber | #E8941A | Amber on light bg, hover state, ".ai" suffix on paper |
| Cleared Green | #5BD6A6 | Status: good / in-motion / done |
| Hold Red | #FF6B5E | Status: exception / error / hold |
| Muted Steel | #8A9AA5 | Captions, mono labels, metadata |

Borders/lines: `rgba(245,242,234,.14)` (default), `rgba(245,242,234,.28)` (strong).
Selection highlight: amber bg, ink text.

## Typography
- **Display** (hero headlines): Space Grotesk, weight 700, -3% letter-spacing, clamp(40–84px), line-height ~0.98.
- **Heading** (section titles): Space Grotesk, weight 600, -2% letter-spacing, 24–38px.
- **Body** (paragraphs): Inter, weight 400/500, 16px, line-height 1.6, color = Dim Paper on dark bg.
- **Mono/Data** (codes, IDs, statuses): JetBrains Mono, weight 400/500, +2% letter-spacing, 15px, often colored Cleared Green.

Fonts loaded via Google Fonts: Space Grotesk (400/500/600/700), JetBrains Mono (400/500/700), Inter (400/500/600).

## Logo & mark
- Glyph: a "routing node" — square waypoint with a forward path cut through it (zig-zag line with two endpoint dots). Reads as both "i" and a lane junction.
- SVG path: `M6 22 L14 10 L18 16 L26 6` (stroke), with 3px-radius filled circles at (6,22) and (26,6). Stroke color = Freight Slate (#0E1A24) when glyph background is amber.
- Glyph container: amber (#FFB23E) background, rounded corners (~9px radius for 48px size, 13px for 64px size).
- Wordmark: "Instive" + ".ai" suffix, where ".ai" is always amber (Hi-Vis on dark, Deep Amber on paper), lowercase.
- Rules:
  - Clear space = height of glyph on all sides.
  - Min size: 24px (glyph alone) / 90px (full lockup).
  - Amber glyph only appears on slate or paper backgrounds — never recolor the path or stretch the mark.

## Components / UI patterns
- **Buttons**: `btn-primary` = amber bg, ink text, hover → paper bg + lift -2px. `btn-ghost` = transparent, paper text, strong-line border, hover → amber border/text. Font: Space Grotesk 600, 15px, 4px radius, 12px/22px padding.
- **Status pills**: pill-shaped (100px radius), mono font, uppercase, small dot indicator.
  - Cleared: green bg tint (12% opacity) + green text/dot.
  - In transit: amber bg tint + amber text/dot.
  - On hold: red bg tint + red text/dot.
- **Tracking card**: bordered card, top row shows mono code (amber) + status pill, body shows bold title + muted subtext.
- **Input field**: dark bg, strong-line border, 4px radius, amber border on focus. Label is uppercase mono, 11px, muted color, above the field.

## Layout / spacing system
- Base unit: 8px grid.
- Scale: space-1=8px, space-2=16px, space-3=24px, space-4=32px, space-5=48px, space-6=64px, space-7=96px.
- Border radius: tight, 4px everywhere (logistics is engineered, not soft).
- Max content width: 1120px.
- Background motif: faint grid lines (64px squares on page, 40px on social posts), radial mask fading at edges.

## Social media templates (1:1 square)
1. **Stat drop**: amber background, freight grid overlay (dark lines at 8% opacity), mono uppercase tag top, huge display-font stat number (clamp 48–76px), supporting description below, mono footer.
2. **Insight quote**: slate background, grid overlay, mono "Field note" tag, bold display headline as the quote, small logo + brand mono footer.

## Voice & tone
**Sound like:**
- "Quote it before they ask twice."
- Specific numbers, real lanes, real SKUs.
- Plain verbs: route, price, track, clear.
- Confident about outcomes, honest about limits.
- Short — operators are busy.

**Never sound like:**
- "Revolutionary AI-powered synergy"
- Vague "solutions" with no number
- Hype, exclamation stacks, jargon soup
- Overpromising autonomy that can't be shipped
- Long paragraphs nobody reads

## Misc
- One accent rule: amber is the only signal color — spend it sparingly, everything else is slate/paper/muted.
- Status vocabulary is the core UI metaphor: cleared / in-transit / hold, mirrored from real logistics tracking.
