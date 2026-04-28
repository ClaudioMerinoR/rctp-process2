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

**Routing:** `HashRouter` (required for GitHub Pages). Base path is `/rctp-process2/` in production, `/` in dev — controlled by `vite.config.js`. Routes are defined in `src/App.jsx`; `CompanyAdmin`, `RoleDetails`, `ProfileDocuments`, `ProfileRiskReport`, and `ProfileEdit` are lazy-loaded.

Key routes:
- `/company-admin` → redirects to `/company-admin/summary`
- `/company-admin/summary` | `/company-admin/third-party-details` | `/company-admin/roles` → `<CompanyAdmin />` (active nav derived from pathname)
- `/company-admin/roles/:roleIndex` → `<RoleDetails />`
- `/settings` → redirects to `/settings/general/currency_approval_groups`
- `/settings/:tab/:section` → `<Settings />` (tab + section derived from URL params via `slugify`/`unslugify`)
- `/settings/renewals/:version/edit` → `<RenewalEdit />`

**State:** Local React state only (`useState`, `useEffect`, `useRef`). No Redux, Zustand, or context providers.

**Styling:** CSS Modules (`.module.css` per component). All design tokens (colors, typography, shadows) are CSS custom properties in `src/styles/globals.css`. Icons are Material Icons Outlined via Google Fonts.

**Animation:** `motion` library (v12, Framer Motion fork) — `motion.div` + `AnimatePresence`. Transition presets live in `src/utils/motion.js`. The `sectionDelayed` preset has a 50ms delay + 300ms duration (350ms total) — scroll-into-view calls after animated sections appear must use `setTimeout` ≥ 400ms to fire after the element has settled.

## Key Files

- `src/App.jsx` — all routes
- `src/pages/AddThirdParty.jsx` — multi-step TP creation wizard (most complex page); contains a local `ObSelect` combobox component at the bottom of the file
- `src/pages/AddThirdParty.module.css` — wizard styles
- `src/components/profile/ProfilePage.jsx` — full TP profile view with tabbed sections, side panels, inline editing; also used embedded inside AddThirdParty to show the newly created profile. Contains `STATUS_CONFIG` map, `StatusPanel` (current status + renewal date + Decline button), and `DeclinePanel` (decline reason textarea + file upload) as local functions at the bottom of the file.
- `src/components/profile/profile.module.css` — all profile styles (~1 800 lines)
- `src/pages/CompanyAdmin.jsx` — field configuration UI + Summary + Roles panels; defines canonical field label lists (`INITIAL_ENTITY_OVERVIEW`, `INITIAL_PERSON_OVERVIEW`, etc.) that ProfilePage reads to render field slots; exports `ROLES_DATA`
- `src/pages/RoleDetails.jsx` — View/Edit Company Role page; tab bar with animated indicator, Third parties accordion (grouped under Standard RCTP), per-section column sets, `null` perms for N/A cells, column-header toggle-all in edit mode
- `src/pages/Settings.jsx` — Settings page with General/Process top tabs (animated motion indicator) and left sidebar nav; General default-loads Currency & Approval Groups; Process sidebar has a process-picker select and default-loads Stages
- `src/pages/Settings.module.css` — Settings page styles; `adminNav`/`adminNavItem`/`adminNavItemActive` pattern is the canonical sidebar nav style — reused by CompanyAdmin
- `src/pages/RenewalEdit.jsx` — Renewal configuration editor; reached from the edit icon in Settings → Renewals. Contains: draggable left/right panel split (50–80%), dynamic columns with per-column context menus (add/delete/move), drag-to-reorder rows, column picker side panel, Active/Inactive toggle per row
- `src/components/ui/Checkbox.jsx` — shared Checkbox component; props: `checked`, `indeterminate`, `disabled`, `error`, `size` (`'default'`|`'small'`), `onChange`. All filled states use `border: 2px solid transparent` to match the empty state's 2px border and keep vertical alignment consistent.
- `src/data/profiles/` — static mock profile objects (`piedpiper`, `brucewayne`, `gazprom`, `initech`, `dundermifflin`, `lumon`, `waystar`); `index.js` exports all as named exports and as a `profiles` object keyed by id. To add a new profile: create the file, add to `index.js`, and add to the `ROWS` array in `ThirdParties.jsx`.
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
- `currentStatus: { label }` — **no `icon` field**; icon is derived at render time from `STATUS_CONFIG` in `ProfilePage.jsx`
- `sidebarSteps` — workflow progress dots shown in the left sidebar
- `sidebarSections` — extra sidebar nav links (Properties, Documents, etc.)
- `overviewFields` / `additionalFields` — arrays of `{ label, value }` rendered by ProfilePage
- `suggestedRows` — rows shown in the "Suggested Connections" risk table
- Feature flags: `embedded`, `deleteModal`, `alertBanners` — control which UI chrome is shown

**Current status values** (canonical — must match `STATUS_CONFIG` keys in `ProfilePage.jsx`):

| Label | Background | Text | Icon |
|---|---|---|---|
| `Pending Approval` | `--neutral-50` | `--text-normal` | `pending` |
| `Approved` | `--success-100` | `--success-900` | `check_circle` |
| `Not Approved` | `--alert-100` | `--alert-700` | `dangerous` |
| `Declined` | `--alert-100` | `--alert-700` | `feedback` |
| `Approved*` | `--warning-100` | `--warning-900` | `history_toggle_off` |
| `Approved! (Renewal Required)` | `--warning-100` | `--warning-900` | `history_toggle_off` |

The `Third Party Renewal Date` field is shown in the status panel only when the status is `Approved*` or `Approved! (Renewal Required)`.

## Field Label Convention

Labels in `overviewFields` / `additionalFields` are prefixed by entity type to match `CompanyAdmin.jsx` slot definitions:

- **Entity:** `Entity Third Party Legal Name`, `Entity Registered Country`, `Entity ID Type`, etc.
- **Person:** `Person Third Party Legal Name`, `Person Country of Residence`, `Person ID Type`, etc.
- **Unknown:** `Unknown Third Party Legal Name`, `Unknown Registered Country`, etc.
- **Shared (all types):** `Third Party Owner`, `Process Name`, `Business Unit`, `Screening & Monitoring Policy`, `Third Party Legal Structure`, `Commercial Significance of Product or Service`, `Third Party Renewal Date`, `Tags`, `Responsible Client Unit`, `Internal Reference or ID`, `All Relevant Client Units`, `Third Party Contact Email Address`

The canonical lists are the `INITIAL_*` constants in `CompanyAdmin.jsx`.

## CompanyAdmin Architecture

URL-driven nav — `activeNav` derived from `pathname`, not `useState`. `ROUTED_NAV` maps nav item names to paths. Panels rendered conditionally by `activeNav`:
- `Summary` → `<SummaryPanel />` — company name, address, telephone, website; view/edit modes
- `Third Party Details` → slot grid (entity/person/unknown tabs, overview + additional fields)
- `Roles` → `<RolesPanel />` — table with per-row ⋮ dropdown; "View/Edit Details" navigates to `/company-admin/roles/:index`

`ROLES_DATA` is exported from `CompanyAdmin.jsx` and imported by `RoleDetails.jsx`.

## RoleDetails Architecture

- Header card: view/edit title, Back/Edit or Cancel/Delete/Save and close/Save buttons, role name + description inputs, business unit checkboxes
- Tab bar: Framer Motion `layoutId="role-tab-indicator"` animated underline
- **Third parties tab**: two-level accordion — top-level group (Standard RCTP, darker header) starts open; children start closed. Sections have their own column set. `null` in `perms` arrays = N/A cell (renders `—`, always disabled). In edit mode: checkboxes become interactive, column headers show a toggle-all checkbox.
- **Process Section sub-accordion**: the Due Diligence row uses `subAccordion: true` + `subRows` instead of `perms`; rendered with a separate `openDueDiligence` state (defaults open). `buildPermState` flattens sub-rows via `flatMap` — the flat index must be tracked when rendering to map `tpPerms` correctly.
- **Other tabs**: flat table (Name, View, Export columns)
- Permission state: `tpPerms` (keyed by section title, flat array including sub-rows) for Third parties; `flatPerms` (keyed by tab name) for all others

## Settings & RenewalEdit Architecture

**Settings** (`/settings`) uses a two-level nav:
- **Top tabs** (General / Process) — `<div>` tabs with Framer Motion `layoutId="settings-top-tab-indicator"` animated underline; switching tabs resets the sidebar to that tab's first item
- **Left sidebar** (`adminNav` / `adminNavItem`) — active item gets `background: var(--primary-500)`. Same class names and sizes used in CompanyAdmin; keep them in sync.
- **Process tab sidebar** has a `<select>` process-picker at the top (Standard RCTP / Enhanced Due Diligence / Basic Screening) above the nav items.

**Settings content panels** (rendered conditionally by `activeNav`):
- `Currency & Approval Groups` → `<CurrencyApprovalGroupsPanel />` — currency select, language selector, 3 approval group dropdowns
- `Renewals` → existing toggle + reminder settings + version history table
- `Stages` → `<StagesPanel />` — table with Enabled/Low/Medium/High Risk/Renewal columns, expandable Due Diligence row, footer Approval Auto Start badge toggle

**RenewalEdit** (`/settings/renewals/:version/edit`) is a split-panel editor:
- `rows` is the single source of truth for both the Rules panel and the Details panel — reordering one side automatically reorders the other
- `cols` drives dynamic column rendering; each col has `{ id, label, condition }`
- Column picker side panel (slides in from right) is triggered by Add Column Left/Right menu items; `colPicker: { colId, side }` state controls which column and side to insert at
- The draggable divider uses `mousedown` → global `mousemove`/`mouseup` to update `leftPct` (clamped 50–80%)
- Row drag-to-reorder uses HTML5 `draggable` on the drag handle only; `dragRowIdx` / `dragOverIdx` state drives the drop target highlight

## Active/Inactive Toggle Pattern

The green/red sliding toggle is used in AddThirdParty (Summary section), Settings (Renewals toggle), and RenewalEdit (per-row Status). The CSS is copy-pasted into each module file — not a shared component. Classes: `.activeToggle`, `.activeToggleOff`, `.activeToggleTrack`, `.activeToggleThumb`.

## Tab Pattern (canonical)

All tab bars in the app use the same pattern — do not use `<button>` with `::after` CSS for the indicator:
- Tabs are `<div>` elements with `style={{ position: 'relative' }}`
- Active tab renders `<motion.div layoutId="<unique-id>" className={styles.tabIndicator} transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }} />`
- `.tabIndicator` CSS: `position: absolute; bottom: -1px; left: 0; right: 0; height: 2px; background: var(--primary-600); border-radius: 1px`
- Tab text: `font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1px`
- Tab container has `border-bottom: 1px solid var(--neutral-50)` and the indicator sits at `bottom: -1px` to overlap it

## Checkbox Component

`src/components/ui/Checkbox.jsx` — use this everywhere instead of `<input type="checkbox">`.

Key implementation detail: all filled box states (`.boxChecked`, `.boxDisabledChecked`, `.boxError`) use `border: 2px solid transparent` — same width as the empty border — so checked and unchecked boxes are identical total size and align vertically.

`null` as a `checked` value is not valid — use the `disabled` prop for non-interactive cells, and render `—` (dash) instead of a Checkbox for N/A cells.

## Status Panel & Decline Panel

Clicking the current status badge in the profile header opens `StatusPanel` (slides in from right):
- Shows the current status chip (read-only)
- Shows `Third Party Renewal Date` + Renewal button only when status is `Approved*` or `Approved! (Renewal Required)`
- Footer has a single "Decline" button which opens `DeclinePanel` on top (higher z-index, no additional overlay)

`DeclinePanel` contains:
- "DECLINE" chip (dimmed, read-only)
- **Decline Reason** textarea (required, `*`)
- Warning: "Once declined Third Party can't be reinstated."
- Support Documents section (Choose Files / Browse / Upload)
- Cancel / Save footer — Save disabled until reason is filled; on save sets `currentStatus` to `'Declined'` and closes both panels

Both panels use `motion.div` with `initial/animate/exit x: '100%'/'0'/'100%'` for the slide animation.

## Tags in ThirdParties Table

Tags are stored as comma-separated strings in profile `overviewFields` (e.g. `'Paper, Regional, Scranton'`). `ThirdParties.jsx` splits on `,`, trims, and renders each as a `<span className={styles.tag}>` inside a `.tagList` flex wrapper.

## CSS Patterns

- **Inset section dividers:** `1px solid var(--neutral-50)` with `margin: 0 16px`. In `profile.module.css` implemented as `::before` pseudo-elements on `.riskReport` and `.tableCard`.
- **Table borders:** `border: 1px solid var(--neutral-50)` on both `thead th` and `tbody td`.
- **Table stripes:** `tbody tr:nth-child(odd) { background: var(--primary-08) }`, `tr:nth-child(even) { background: var(--neutral-00) }`, `tr:hover { background: var(--primary-50) }`
- **Risk card hover:** CSS gradient darkening only — no `box-shadow` or `y` transform.
- **Sidebar nav (Settings / CompanyAdmin):** `width: 226px`, `font-size: 14px`, `color: var(--text-light)` for inactive items, `background: var(--primary-500); color: var(--neutral-00)` for active.
- **Card with top accent:** `border-top: 4px solid var(--primary-500); box-shadow: var(--shadow-card)` — used on all main content cards.
- **Global table leak fix:** `ThirdParties.module.css` has a bare `table { min-width: 900px }` that leaks to all tables. Override with `style={{ minWidth: 0 }}` on any `<table>` rendered inside a component that isn't ThirdParties.
