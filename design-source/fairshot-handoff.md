# Fairshot — Design Handoff Document

> **Design system:** Soft Tooling shared palette  
> **Direction:** Warm editorial — Monocle-meets-wellness  
> **Files:** `fairshot.html` (marketing) · `fairshot-app.html` (prototype)

---

## 1. Design Tokens

### Color Palette

| Token | Hex | OKLch | Usage |
|-------|-----|-------|-------|
| `--bg` | `#f5f4f2` | `oklch(97% 0.012 80)` | Page background |
| `--surface` | `#ffffff` | `oklch(99% 0.005 80)` | Cards, elevated surfaces |
| `--fg` | `#3f3a33` | `oklch(20% 0.02 60)` | Primary text |
| `--muted` | `#8a8277` | `oklch(48% 0.015 60)` | Secondary text, captions |
| `--border` | `rgba(63,58,51,0.08)` | `oklch(89% 0.012 80)` | Dividers, card borders |
| `--accent` | `#0f8a7d` | `oklch(58% 0.16 145)` | Primary CTA, links, active states |
| `--accent-light` | `rgba(15,138,125,0.08)` | — | Hover backgrounds, subtle highlights |
| `--good` | `#0f8a7d` | — | Success / high score |
| `--warning` | `#d4a843` | — | Warning / medium score |

**Derived tokens (Soft Tooling parent brand):**
- `--lime`: `#a0c040` — Momentum product accent
- `--gold`: `#d4a843` — Celebration, streaks
- `--salmon`: `#d47b6a` — Fairshot accent alternative (used in product cards on parent site)

### Typography

| Role | Stack | Size | Weight | Notes |
|------|-------|------|--------|-------|
| Display | `'Newsreader', 'Iowan Old Style', Georgia, serif` | `clamp(40px, 5.5vw, 68px)` | 400 | Hero headlines, italic for emphasis |
| Section title | Same display stack | `clamp(30px, 4vw, 44px)` | 400 | Section H2s |
| Body | `'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif` | 17px | 400 | Line-height 1.6–1.75 |
| Mono / Meta | `'SF Mono', ui-monospace, Menlo, monospace` | 10–12px | 500 | Eyebrows, labels, pricing meta |

**Type rules:**
- Display uses `letter-spacing: -0.02em`
- Mono uses `text-transform: uppercase; letter-spacing: 0.12–0.14em`
- Body paragraphs: `max-width: 560px` for readability

### Spacing

| Context | Value |
|---------|-------|
| Section padding | 100px vertical, 48px horizontal |
| Section max-width (narrow) | 720px |
| Section max-width (wide) | 1040px |
| Card gap | 16–20px |
| Card padding | 32–36px |
| Card border-radius | 14–16px |
| Button border-radius | 10px |
| Input border-radius | 10px |

### Shadows & Effects

- **Card hover:** `0 12px 40px rgba(63,58,51,0.06)` (subtle, warm-tinted)
- **Nav scroll:** `backdrop-filter: blur(16px)` + `rgba(245,244,242,0.9)` background
- **No heavy drop shadows by default.** Whitespace and borders do the work.

---

## 2. Layout Patterns

### Marketing Page (`fairshot.html`)

**Structure:**
1. Fixed nav (logo left, links right, CTA)
2. Hero (centered, max-width 800px)
3. Problem section (text + 3 cards)
4. How It Works (4 steps with connector line)
5. Pricing (3 cards, middle featured)
6. Philosophy / Stance (2-col grid, contrast pairs)
7. CTA section (email form)
8. Footer

**Responsive breakpoints:**
- `< 900px`: Grids collapse to single column
- `< 700px`: Nav links hidden, padding reduced, CTAs stack

**Animation:**
- `.reveal` class: `opacity 0 → 1`, `translateY(24px) → 0`, triggered at intersection threshold 0.12
- Nav background transition on scroll (> 40px)

### App Prototype (`fairshot-app.html`)

**Structure:**
- Sidebar (240px): logo, sub-label, nav items with icons
- Main area: milestone bar + screen content
- Screens: Resume | Discover | Tracker

**Milestone bar:**
- 3 steps: Build → Apply → Interview
- Badges: done (teal check) / current (teal with ring) / locked (grey)
- Divider lines between steps

**Discover grid:**
- 2-column on desktop, 1-column on mobile (< 1000px)
- Cards: header, meta tags, 3 scores, action buttons

**Tracker board:**
- 4-column Kanban on desktop, 2-column tablet, 1-column mobile
- Cards draggable with Back/Next controls

---

## 3. Component Specs

### Primary CTA Button
```css
padding: 16px 32px;
border-radius: 10px;
border: none;
background: var(--accent);
color: white;
font-size: 15px;
font-weight: 600;
transition: filter 0.2s, transform 0.2s;
:hover { filter: brightness(1.08); transform: translateY(-1px); }
```

### Secondary Button
```css
padding: 11px 22px;
border-radius: 10px;
border: 1px solid var(--border);
background: transparent;
color: var(--muted);
font-size: 14px;
font-weight: 500;
:hover { border-color: var(--muted); color: var(--fg); }
```

### Card
```css
background: var(--surface);
border: 1px solid var(--border);
border-radius: 16px;
padding: 32px;
transition: all 0.3s ease;
:hover { border-color: rgba(63,58,51,0.15); }
```

### Featured Card (pricing middle)
```css
border-color: var(--accent);
box-shadow: 0 0 0 1px var(--accent);
::before { height: 3px; background: var(--accent); } /* top accent bar */
```

### Input
```css
padding: 14px 18px;
border-radius: 10px;
border: 1px solid var(--border);
background: var(--bg);
color: var(--fg);
font-size: 15px;
:focus { border-color: var(--accent); }
```

### Score Badge
```css
font-family: var(--font-mono);
font-size: 18px;
font-weight: 600;
font-variant-numeric: tabular-nums;
.good { color: var(--good); }
.warning { color: var(--warning); }
```

---

## 4. Parent Brand Context (Soft Tooling)

Fairshot is one of three products under the **Soft Tooling** umbrella:

| Product | Surface | Accent | Status |
|---------|---------|--------|--------|
| Tidy | Mobile app | Teal `#0f8a7d` | In development |
| Momentum | Web dashboard | Lime `#a0c040` | Prototype |
| Fairshot | Web tool | Teal `#0f8a7d` | Waitlist |

### Shared philosophy (applies to all Soft Tooling products):
1. **No shame mechanics** — no streak punishment, no overdue badges, no guilt
2. **Energy-aware, not time-aware** — adapt to capacity, not clock
3. **Show what you did, not what you didn't** — wins first, lapses hidden
4. **One thing at a time** — no infinite scroll, no 47 notifications
5. **Quiet by default** — no badges, no dings, no red dots

### Shared design language:
- Warm cream backgrounds (not sterile white)
- Serif display + sans body (editorial, not SaaS)
- Mono for metadata and labels
- Restrained accent usage — one color per product
- Gentle radius (10–16px), no sharp 0px corners on content

---

## 5. Asset Map

```
project/
├── fairshot.html              ← Marketing landing page (standalone)
├── fairshot-app.html          ← React app prototype (standalone)
├── fairshot-concept.md        ← Product vision, features, user journeys
├── fairshot-marketing.md      ← Brand voice, messaging, copy bank
├── fairshot-handoff.md        ← This file — tokens, layout, components
├── index.html                 ← Project hub / entry point
├── fairshot.html.artifact.json
└── fairshot-app.html.artifact.json
```

All HTML files are **standalone** — CSS is inline, no external dependencies except Google Fonts and (for the app) React CDN.

---

## 6. Open Design Questions

- [ ] Dark mode variant? (Momentum has one — should Fairshot?)
- [ ] Mobile app version? (Currently web-only)
- [ ] Should the app use the same teal accent or shift to salmon `#d47b6a` for brand differentiation?
- [ ] Browser extension mockup for one-click apply?
- [ ] Email template designs for milestone completions?
