# Design System

All design tokens are CSS custom properties defined in `src/styles/globals.css` and used throughout the app via `var(--token-name)`.

---

## Color Palette

### Primary (Cyan/Blue)

| Token | Hex | Usage |
|---|---|---|
| `--primary-08` | `#E8F9FE` | Subtle backgrounds, table row tint |
| `--primary-50` | `#B8E5F3` | Hover backgrounds |
| `--primary-100` | `#A4DEF0` | |
| `--primary-200` | `#7BCFE9` | Borders, focus rings |
| `--primary-300` | `#53C0E2` | |
| `--primary-400` | `#2AB2DC` | |
| `--primary-500` | `#02A3D5` | **Brand colour** — buttons, links, active states, badges |
| `--primary-600` | `#0289B3` | Hover on primary elements |
| `--primary-700` | `#016F91` | |
| `--primary-800` | `#01556F` | |
| `--primary-900` | `#013B4D` | |

### Neutral (Grey)

| Token | Hex | Usage |
|---|---|---|
| `--neutral-00` | `#FFFFFF` | Card backgrounds, inputs |
| `--neutral-25` | `#EFEFEF` | Page background, table header |
| `--neutral-50` | `#DFE3E7` | Dividers, borders |
| `--neutral-100` | `#D6DBE0` | Secondary borders |
| `--neutral-200` | `#C4CCD2` | Input borders |
| `--neutral-300` | `#B1BCC5` | Placeholder icons |
| `--neutral-400` | `#9FACB7` | |
| `--neutral-500` | `#8D9CA9` | Secondary text, inactive nav |
| `--neutral-600` | `#76838E` | |
| `--neutral-700` | `#606A73` | |
| `--neutral-800` | `#495158` | |
| `--neutral-900` | `#33383D` | |

### Text

| Token | Hex | Usage |
|---|---|---|
| `--text-normal` | `#0C2A31` | Primary body text |
| `--text-light` | `#516267` | Secondary / muted text |
| `--text-light-alt` | `#5A6E73` | Alternative muted text |
| `--text-dark` | `#061619` | High emphasis |

### Semantic

| Token | Hex | Usage |
|---|---|---|
| `--alert-500` | `#E34C53` | High risk, errors, red flags |
| `--alert-700` | `#9A3438` | Dark alert |
| `--success-500` | `#13DF81` | Low risk, completed, clear |
| `--success-700` | `#0D9858` | Dark success |
| `--warning-500` | `#F0C043` | Medium risk, pending, in progress |
| `--warning-700` | `#A3832E` | Dark warning |

---

## Typography

### Font Families

| Token | Value | Usage |
|---|---|---|
| `--font-heading` | `'Public Sans', 'Roboto', sans-serif` | H1–H6 |
| `--font-body` | `'Roboto', sans-serif` | Body text, UI elements |
| `--font-label` | `'Public Sans', 'Roboto', sans-serif` | Labels, badges |

Both fonts are loaded from Google Fonts in `globals.css`.

### Heading Scale

| Level | Size | Line Height | Weight |
|---|---|---|---|
| H1 | 32px | 40px | 300 |
| H2 | 28px | 36px | 500 |
| H3 | 24px | 32px | 500 |
| H4 | 22px | 32px | 500 |
| H5 | 20px | 32px | 500 |
| H6 | 18px | 32px | 500 |

### Body Scale

| Name | Token prefix | Size | Line Height |
|---|---|---|---|
| Large | `--body-large-*` | 16px | 24px |
| Medium | `--body-medium-*` | 14px | 20px |
| Small | `--body-small-*` | 13px | 16px |
| Caption | `--body-caption-*` | 12px | 16px |

### Label Scale

| Name | Token prefix | Size | Line Height |
|---|---|---|---|
| Large | `--label-large-*` | 14px | 20px |
| Medium | `--label-medium-*` | 12px | 16px |
| Small | `--label-small-*` | 11px | 16px |

---

## Shadows & Elevation

| Token | Value | Usage |
|---|---|---|
| `--shadow-100` | `0 1px 3px 1px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.30)` | Low elevation |
| `--shadow-300` | `0 2px 6px 2px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.30)` | |
| `--shadow-500` | `0 1px 3px rgba(0,0,0,.30), 0 4px 8px 3px rgba(0,0,0,.15)` | |
| `--shadow-700` | `0 2px 3px rgba(0,0,0,.30), 0 6px 10px 4px rgba(0,0,0,.15)` | |
| `--shadow-900` | `0 4px 4px rgba(0,0,0,.30), 0 8px 12px 6px rgba(0,0,0,.15)` | High elevation (modals) |
| `--shadow-card` | `0 2px 4px rgba(0,0,0,.08)` | Card resting state |
| `--shadow-card-hover` | `0 2px 8px rgba(0,0,0,.08)` | Card hover (not used after refactor) |

---

## Z-Index Scale

| Token | Value | Usage |
|---|---|---|
| `--z-tooltip` | 10 | Tooltips |
| `--z-dropdown` | 200 | Dropdown menus, comboboxes |
| `--z-alert` | 500 | Alert banners, row menu dropdowns |
| `--z-modal` | 1000 | Modals (delete confirm) |
| `--z-overlay` | 1100 | Full-screen overlays |
| `--z-panel` | 1101 | Side panels (notes, connect) |
| `--z-cancel` | 2000 | Cancel confirmation modal |
| `--z-creating` | 3000 | "Creating…" overlay (top of stack) |

---

## Spacing

The app uses a **16px base unit** for most spacing:
- Card padding: `16px`
- Page body padding: `0 16px 16px`
- Section dividers inset: `margin: 0 16px`
- Grid gap: `16px` (field grids), `24px` (layout gaps)

No spacing scale tokens are defined — spacing values are written directly in CSS.

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--corner-extra-large` | `28px` | Large pills / buttons |

Most elements use smaller values (2px, 4px, 8px) written directly.

---

## Icons

**Material Icons Outlined** loaded via Google Fonts:
```html
<!-- in globals.css -->
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');
```

Usage in JSX:
```jsx
<span className="material-icons-outlined">check_circle</span>
<span className="material-icons-outlined" style={{ fontSize: 18 }}>info</span>
```

Common icons used:
- `check_circle`, `check_circle_outline` — success / verified
- `warning`, `error_outline` — risk levels
- `pending` — pending status
- `expand_less`, `expand_more` — accordion toggles
- `chevron_left` — back navigation
- `verified` — entity verification
- `print`, `edit`, `delete` — actions
- `info` — info tooltip triggers

---

## CSS Modules Pattern

Each component has a co-located `.module.css`:

```jsx
// Component.jsx
import styles from './Component.module.css';

export default function Component() {
  return <div className={styles.container}>...</div>;
}
```

```css
/* Component.module.css */
.container {
  background: var(--neutral-00);
  padding: 16px;
  box-shadow: var(--shadow-card);
}
```

Class names are locally scoped — no risk of collision across files.

---

## Risk Level Colour Coding

Risk levels are used throughout cards, badges, accordion headers, and the page top strip:

| Level | Primary colour | Token |
|---|---|---|
| Low | Green | `--success-500` (#13DF81) |
| Medium | Amber | `--warning-500` (#F0C043) |
| High | Red | `--alert-500` (#E34C53) |

Gradient backgrounds on risk cards use these colours at low opacity (0.10–0.20) for a subtle tint effect.
