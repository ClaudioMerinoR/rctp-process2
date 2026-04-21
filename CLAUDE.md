# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:5173, auto-increments if busy)
npm run build        # Production build → dist/
npm run deploy       # Build + publish to GitHub Pages (gh-pages -d dist)
npm run lint         # ESLint check
npm run preview      # Preview the production build locally
```

No tests exist in this project.

After any change: commit and push to the current branch first. Run `npm run deploy` only when deploying to GitHub Pages (builds from whatever is checked out). GitHub Pages repo: `ClaudioMerinoR/rctp-process2`.

## Architecture

**What it is:** A React SPA prototyping a Third-Party Risk Management (RCTP) compliance platform. All data is static mock data — no backend, no API calls.

**Routing:** `HashRouter` (required for GitHub Pages). Base path is `/rctp-process2/` in production, `/` in dev — controlled by `vite.config.js`. Routes are defined in `src/App.jsx`; `CompanyAdmin`, `ProfileDocuments`, `ProfileRiskReport`, and `ProfileEdit` are lazy-loaded.

**State:** Local React state only (`useState`, `useEffect`, `useRef`). No Redux, Zustand, or context providers.

**Styling:** CSS Modules (`.module.css` per component). All design tokens (colors, typography, shadows) are CSS custom properties in `src/styles/globals.css`. Icons are Material Icons Outlined via Google Fonts.

**Animation:** `motion` library (v12, Framer Motion fork) — `motion.div` + `AnimatePresence`. Transition presets live in `src/utils/motion.js`. The `sectionDelayed` preset has a 50ms delay + 300ms duration (350ms total) — scroll-into-view calls after animated sections appear must use `setTimeout` ≥ 400ms to fire after the element has settled.

## Key Files

- `src/App.jsx` — all routes
- `src/pages/AddThirdParty.jsx` — multi-step TP creation wizard (most complex page); contains a local `ObSelect` combobox component at the bottom of the file
- `src/pages/AddThirdParty.module.css` — wizard styles
- `src/components/profile/ProfilePage.jsx` — full TP profile view with tabbed sections, side panels, inline editing; also used embedded inside AddThirdParty to show the newly created profile
- `src/components/profile/profile.module.css` — all profile styles (~1 600 lines)
- `src/pages/CompanyAdmin.jsx` — field configuration UI; defines canonical field label lists (`INITIAL_ENTITY_OVERVIEW`, `INITIAL_PERSON_OVERVIEW`, etc.) that ProfilePage reads to render field slots
- `src/pages/Settings.jsx` — Settings page with General/Process top tabs and left sidebar nav; currently shows the Renewals section (version history table, Enabled/Disabled toggle)
- `src/pages/Settings.module.css` — Settings page styles; `adminNav`/`adminNavItem`/`adminNavItemActive` pattern is the canonical sidebar nav style — reused by CompanyAdmin
- `src/pages/RenewalEdit.jsx` — Renewal configuration editor; reached from the edit icon in Settings → Renewals. Contains: draggable left/right panel split (50–80%), dynamic columns with per-column context menus (add/delete/move), drag-to-reorder rows, column picker side panel, Active/Inactive toggle per row
- `src/data/profiles/` — static mock profile objects; `index.js` exports all profiles as named exports and as a `profiles` object keyed by id
- `src/styles/globals.css` — all CSS variables
- `src/utils/motion.js` — Framer Motion transition presets

## AddThirdParty Flow

Five sequential sections revealed by user actions:

1. **TP Type + Name** (+ Country/DUNS for entity)
2. **Duplicate Check Results** — shown after Continue; skipped for Unknown type
3. **Entity Verification** — entity type only; auto-opens when Country or DUNS was filled in section 1
4. **Summary** — Owner, Business Unit, Tags, Process, S&M Policy
5. **Onboarding Details** — different fields per type (entity / person / unknown)

Key state relationships:
- `tpCountry` / `tpDuns` → pre-populate entity verification filter + onboarding country/ID fields
- `process` selection → auto-sets `policy` to the first managed policy in `PROCESS_POLICIES`
- `tpName` → synced into `legalName` in all three onboarding state objects (`ob`, `obPerson`, `obUnknown`)
- `entityVerified` flag → shows override warning in onboarding section

Scroll behaviour: each section reveal scrolls to that section using `ref.scrollIntoView`. Duplicate Check uses 50ms delay (no animation delay); Entity Verification uses 400ms delay (matches `sectionDelayed` animation duration).

`PROCESS_POLICIES` mapping:
```
'Standard RCTP'          → 'Default Standard KYBP Policy'
'Enhanced Due Diligence' → 'Enhanced KYBP Policy'
'Basic Screening'        → 'Minimal Screening Policy'
```

## Profile Data Shape

Each profile in `src/data/profiles/` exports an object with:
- `id`, `name`, `shortName`, `entityType` (`'entity'` | `'person'`)
- `riskLevel: { label, icon, level }` — level drives CSS class on the top strip
- `currentStatus: { label, icon }`
- `sidebarSteps` — workflow progress dots shown in the left sidebar
- `sidebarSections` — extra sidebar nav links (Properties, Documents, etc.)
- `overviewFields` / `additionalFields` — arrays of `{ label, value }` rendered by ProfilePage
- `suggestedRows` — rows shown in the "Suggested Connections" risk table
- Feature flags: `embedded`, `deleteModal`, `alertBanners` — control which UI chrome is shown

## Field Label Convention

Labels in `overviewFields` / `additionalFields` are prefixed by entity type to match `CompanyAdmin.jsx` slot definitions:

- **Entity:** `Entity Third Party Legal Name`, `Entity Registered Country`, `Entity ID Type`, etc.
- **Person:** `Person Third Party Legal Name`, `Person Country of Residence`, `Person ID Type`, etc.
- **Unknown:** `Unknown Third Party Legal Name`, `Unknown Registered Country`, etc.
- **Shared (all types):** `Third Party Owner`, `Process Name`, `Business Unit`, `Screening & Monitoring Policy`, `Third Party Legal Structure`, `Commercial Significance of Product or Service`, `Third Party Expiry Date`, `Tags`, `Responsible Client Unit`, `Internal Reference or ID`, `All Relevant Client Units`, `Third Party Contact Email Address`

The canonical lists are the `INITIAL_*` constants in `CompanyAdmin.jsx`.

## Settings & RenewalEdit Architecture

**Settings** (`/settings`) uses a two-level nav:
- **Top tabs** (General / Process) — `role="tablist"` tabs with primary-blue underline indicator; switching tabs resets the sidebar to that tab's first item
- **Left sidebar** (`adminNav` / `adminNavItem`) — active item gets `background: var(--primary-500)`. Same class names and sizes used in CompanyAdmin; keep them in sync.

**RenewalEdit** (`/settings/renewals/:version/edit`) is a split-panel editor:
- `rows` is the single source of truth for both the Rules panel and the Details panel — reordering one side automatically reorders the other
- `cols` drives dynamic column rendering; each col has `{ id, label, condition }`
- Column picker side panel (slides in from right) is triggered by Add Column Left/Right menu items; `colPicker: { colId, side }` state controls which column and side to insert at
- The draggable divider uses `mousedown` → global `mousemove`/`mouseup` to update `leftPct` (clamped 50–80%)
- Row drag-to-reorder uses HTML5 `draggable` on the drag handle only; `dragRowIdx` / `dragOverIdx` state drives the drop target highlight

## Active/Inactive Toggle Pattern

The green/red sliding toggle is used in AddThirdParty (Summary section), Settings (Renewals toggle), and RenewalEdit (per-row Status). The CSS is copy-pasted into each module file — not a shared component. Classes: `.activeToggle`, `.activeToggleOff`, `.activeToggleTrack`, `.activeToggleThumb`.

## CSS Patterns

- **Inset section dividers:** `1px solid var(--neutral-50)` with `margin: 0 16px`. In `profile.module.css` implemented as `::before` pseudo-elements on `.riskReport` and `.tableCard`.
- **Table borders:** `border: 1px solid var(--neutral-50)` on both `thead th` and `tbody td`.
- **Risk card hover:** CSS gradient darkening only — no `box-shadow` or `y` transform.
- **Sidebar nav (Settings / CompanyAdmin):** `width: 226px`, `font-size: 14px`, `color: var(--text-light)` for inactive items, `background: var(--primary-500); color: var(--neutral-00)` for active.
