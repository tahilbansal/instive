# Mockups Page — Design System Implementation

## Overview

The `/mockups` showcase page has been completely redesigned following the **Instive AI Design System** with support for both light and dark themes.

## Design System Integration

### Colors (CSS Variables)
- **Dark theme (default):**
  - `--bg-primary: #0E1A24` (Freight Slate)
  - `--bg-secondary: #16252F` (Raised Slate)
  - `--text-primary: #F5F2EA` (Warehouse Paper)
  - `--text-secondary: #D8D3C7` (Dim Paper)
  - `--signal: #FFB23E` (Hi-Vis Amber — THE accent)
  - `--cleared: #5BD6A6` (Status: good/cleared)
  - `--hold: #FF6B5E` (Status: exception)
  - `--muted: #8A9AA5` (Muted text)

- **Light theme:** Automatically inverted via `html.light` class

### Typography
- **Display/Headings:** Space Grotesk (700, -3% tracking) — engineered confidence
- **Mono/Data:** JetBrains Mono (codes, IDs, status, labels)
- **Body:** Inter (400/500, 16px, 1.6 line-height) — long-form reading

### Spacing & Radius
- **Base unit:** 8px (xs=4px, sm=8px, md=16px, lg=24px, xl=32px, 2xl=48px, 3xl=64px)
- **Border radius:** 4px (tight) — engineered, not soft
- **Card spacing:** 6 units (24px padding) + 5 units (20px gaps) for breathing room

## Key Improvements

### 1. **Less Congested**
- ✓ Larger padding in cards (24px vs previous 20px)
- ✓ Increased gap between cards (24px on desktop)
- ✓ Taller hero section with more vertical breathing room
- ✓ Better visual hierarchy with eyebrow + heading + subheading

### 2. **More Interactive**
- ✓ Smooth hover transitions (300ms duration)
- ✓ Cards lift on hover with border highlight
- ✓ Buttons with transform animations
- ✓ Search input focus state with signal amber border
- ✓ Tooltip-like pill badges with subtle animations

### 3. **Light + Dark Theme Support**
- ✓ Theme toggle button in sticky header
- ✓ Persists preference to localStorage
- ✓ Respects OS preference if no saved preference
- ✓ Smooth color transitions between themes (300ms)
- ✓ All components inherit theme via CSS variables

### 4. **Component Architecture**
```
components/
├── ThemeProvider.tsx       (initializes theme from localStorage)
├── ThemeToggle.tsx         (sun/moon icon button, controls theme)
├── MockupCard.tsx          (redesigned with accent bar + better spacing)
├── FilterBar.tsx           (category pills + search, better layout)
├── MockupGallery.tsx       (orchestrator, grid layout)
├── MockupModal.tsx         (iframe preview with design system styling)
└── SectionCTA.tsx          (bottom call-to-action)
```

## How Theme Switching Works

1. **Initial load:** `layout.tsx` injects script that checks localStorage + OS preference
2. **User clicks toggle:** `ThemeToggle.tsx` updates `document.documentElement.classList`
3. **CSS variables update:** HTML system detects `html.light` class, CSS `--*` variables auto-switch
4. **Persistence:** Theme preference saved to `localStorage.setItem('theme', ...)`
5. **Transitions:** All color changes animate smoothly via `transition: color 0.3s` in globals.css

## Voice & Tone

Following design system principles, all copy is:
- **Specific & metric-backed** (real numbers, real lanes, real SKUs)
- **Operator-focused** (not vendor jargon or hype)
- **Concrete & fast** (short, no breathless marketing)
- **Confident** about outcomes, honest about limits

Example: *"Catches a chargeable-weight overstatement on a LAX air export"* not *"Revolutionary invoice optimization solution"*

## File Changes

### New Files
- `components/ThemeProvider.tsx`
- `components/ThemeToggle.tsx`
- `DESIGN_NOTES.md` (this file)

### Redesigned Files
- `app/globals.css` — Full design system color palette + theme switching
- `app/layout.tsx` — ThemeProvider wrapper + theme script injection
- `tailwind.config.ts` — Design system colors + typography
- `app/mockups/page.tsx` — Complete redesign with better spacing + hero
- `components/MockupCard.tsx` — Accent bar, more breathing room, better hover
- `components/FilterBar.tsx` — Better layout, search focus state
- `components/MockupGallery.tsx` — Grid with more gaps
- `components/MockupModal.tsx` — Design system styling
- `components/SectionCTA.tsx` — Design system colors + animations

## Testing the Redesign

```bash
npm run dev
# Visit http://localhost:3000/mockups
# Toggle theme with sun/moon button in top-right
# Resize browser to test responsive layout
# Hover cards to see lift + border highlight
# Search and filter to test interactivity
```

## Deployment

No changes needed to `next.config.js` or Vercel settings. The dark theme is default; light theme is opt-in via localStorage. Both ship at build time (no runtime theme detection overhead).

## Future Enhancements (Optional)

- Add animated preview thumbnails (currently using "Live demo →" placeholder)
- Add "Compare mockups" side-by-side view
- Add mockup categorization by industry vertical
- Add "Request a demo" form modal alongside email CTA
