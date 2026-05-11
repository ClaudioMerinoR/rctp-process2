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
| `--primary-600` | `#0289B3` | Hover on primary elements; active sort icon colour |
| `--primary-700` | `#016F91` | |
| `--primary-800` | `#01556F` | |
| `--primary-900` | `#013B4D` | |

### Neutral (Grey)

| Token | Hex | Usage |
|---|---|---|
| `--neutral-00` | `#FFFFFF` | Card backgrounds, inputs |
| `--neutral-25` | `#F4F4F4` | **Page background, table headers, sidebar backgrounds** |
| `--neutral-50` | `#DFE3E7` | Dividers, borders |
| `--neutral-100` | `#D6DBE0` | Secondary borders, stronger dividers |
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
| `--text-normal` | `#0C2A31` | Primary body text; tooltip background |
| `--text-light` | `#516267` | Secondary / muted text |
| `--text-light-alt` | `#5A6E73` | Alternative muted text (e.g. badge group labels) |
| `--text-dark` | `#061619` | High emphasis |

### Semantic

| Token | Hex | Usage |
|---|---|---|
| `--alert-50` | — | High risk badge background (light) |
| `--alert-100` | — | Not Approved / Declined status background |
| `--alert-500` | `#E34C53` | High risk, errors, red flags |
| `--alert-700` | `#9A3438` | Not Approved / Declined status text |
| `--success-50` | — | Low risk badge background (light) |
| `--success-100` | — | Approved status background |
| `--success-500` | `#13DF81` | Low risk, completed, clear |
| `--success-700` | `#0D9858` | Dark success; verified badge icon |
| `--success-900` | — | Approved status text |
| `--warning-50` | — | Medium risk badge background (light) |
| `--warning-100` | — | Approved* / Approved! (Renewal Required) status background |
| `--warning-500` | `#F0C043` | Medium risk, pending |
| `--warning-700` | `#A3832E` | Dark warning |
| `--warning-900` | — | Approved* / Approved! status text |

---

## Typography

### Font Families

| Token | Value | Usage |
|---|---|---|
| `--font-heading` | `'Public Sans', 'Roboto', sans-serif` | H1–H6 |
| `--font-body` | `'Roboto', 'Inter', sans-serif` | Body text, UI elements |
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

---

## Z-Index Scale

| Token | Value | Usage |
|---|---|---|
| `--z-tooltip` | 10 | Tooltips (dot tooltips, badge tooltips, nav tooltips) |
| `--z-dropdown` | 200 | Dropdown menus, comboboxes |
| `--z-alert` | 500 | Alert banners, row menu dropdowns |
| `--z-modal` | 1000 | Modals (delete confirm, renewal modal) |
| `--z-overlay` | 1100 | Full-screen overlays |
| `--z-panel` | 1101 | Side panels (Status, Decline, Notes, Connect, column picker) |
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

Most elements use smaller values (2px, 4px, 8px) written directly in CSS.

---

## Icons

**Material Icons Outlined** loaded via Google Fonts:
```html
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');
```

Usage in JSX:
```jsx
<span className="material-icons-outlined">check_circle</span>
<span className="material-icons-outlined" style={{ fontSize: 16 }}>info</span>
```

Common icons used:
- `check_circle`, `check_circle_outline` — success / verified
- `warning`, `error_outline` — risk levels (High, Medium)
- `pending` — Pending Approval status
- `history_toggle_off` — Approved* / Approved! (Renewal Required) status
- `dangerous` — Not Approved status
- `feedback` — Declined status
- `arrow_drop_down` — table header sort icon (12px, right-aligned)
- `expand_less`, `expand_more` — accordion toggles
- `chevron_left` — back navigation
- `verified` — entity verification badge
- `print`, `edit`, `delete` — action buttons

---

## CSS Patterns

### Table Headers
All `thead th` elements use:
```css
position: relative;
padding: 10px 28px 10px 12px; /* right padding reserves space for the icon */
```
The sort icon span inside the `th`:
```css
/* via CSS Modules selector: .table thead th span[class*="material-icons"] */
position: absolute;
right: 8px;
top: 50%;
transform: translateY(-50%);
line-height: 1;
```
Icon in JSX: `<span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span>` — no `verticalAlign` or extra class needed.

### Tab Bar (canonical pattern)
All tab bars use `<div>` elements — not `<button>` with `::after` CSS:
```jsx
<div style={{ position: 'relative' }} onClick={() => setTab(t)}>
  {label}
  {activeTab === t && (
    <motion.div layoutId="unique-id" className={styles.tabIndicator}
      transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }} />
  )}
</div>
```
```css
.tabIndicator {
  position: absolute; bottom: -1px; left: 0; right: 0;
  height: 2px; background: var(--primary-600); border-radius: 1px;
}
```
Tab container has `border-bottom: 1px solid var(--neutral-50)` and indicator sits at `bottom: -1px` to overlap it.

### Status Badge Tooltip
Profiles with `currentStatus.tooltip` set render a hover tooltip above the badge:
```jsx
<div className={styles.badgeTipWrap}>
  {badge}
  <span className={styles.badgeTip}>{tip}</span>
</div>
```
```css
.badgeTipWrap { position: relative; display: inline-flex; }
.badgeTip {
  display: none; position: absolute;
  bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
  background: var(--text-normal); color: var(--neutral-00);
  font-size: 11px; padding: 5px 10px; border-radius: 4px;
  white-space: nowrap; pointer-events: none; z-index: var(--z-tooltip);
}
.badgeTipWrap:hover .badgeTip { display: block; }
```

### Sidebar Nav (Settings / CompanyAdmin)
`width: 226px`, `font-size: 14px`, `color: var(--text-light)` for inactive items.
Active item: `background: var(--primary-500); color: var(--neutral-00)`.
Class names `adminNav` / `adminNavItem` / `adminNavItemActive` — kept in sync between `Settings.module.css` and `CompanyAdmin.module.css`.

### Active/Inactive Toggle
Green/red sliding toggle used in AddThirdParty (Summary section), Settings (Renewals), and RenewalEdit (per-row Status). CSS is copy-pasted into each module file — not a shared component. Classes: `.activeToggle`, `.activeToggleOff`, `.activeToggleTrack`, `.activeToggleThumb`.

### Card with Top Accent
```css
border-top: 4px solid var(--primary-500);
box-shadow: var(--shadow-card);
```
Used on all main content cards.

### Inset Section Dividers
```css
/* 1px solid var(--neutral-50) with margin: 0 16px */
/* In profile.module.css: implemented as ::before pseudo-elements */
```

### Table Stripes
```css
tbody tr:nth-child(odd)  { background: var(--primary-08); }
tbody tr:nth-child(even) { background: var(--neutral-00); }
tbody tr:hover           { background: var(--primary-50); }
```

### Global Table Min-Width Leak Fix
`ThirdParties.module.css` contains a bare `table { min-width: 900px }` that leaks to all tables in the page. Override with `style={{ minWidth: 0 }}` on any `<table>` rendered inside a component that isn't ThirdParties.

---

## Risk Level Colour Coding

Risk levels drive card colours, badge backgrounds, accordion headers, and the page top strip gradient:

| Level | Colour | Token |
|---|---|---|
| Low | Green | `--success-500` (`#13DF81`) |
| Medium | Amber | `--warning-500` (`#F0C043`) |
| High | Red | `--alert-500` (`#E34C53`) |

---

## Current Status Colour Coding

| Status | Background | Text |
|---|---|---|
| Pending Approval | `--neutral-50` | `--text-normal` |
| Approved | `--success-100` | `--success-900` |
| Not Approved | `--alert-100` | `--alert-700` |
| Declined | `--alert-100` | `--alert-700` |
| Approved* | `--warning-100` | `--warning-900` |
| Approved! (Renewal Required) | `--warning-100` | `--warning-900` |
