# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build → dist/
npm run deploy       # Build + publish to GitHub Pages (gh-pages -d dist)
npm run lint         # ESLint check
npm run preview      # Preview the production build locally
```

There are no tests in this project.

## Documentation

Full handoff docs live in `docs/`:
- `docs/OVERVIEW.md` — product purpose, feature inventory, user flows
- `docs/ARCHITECTURE.md` — tech stack, file structure, routing, state
- `docs/PAGES.md` — every route documented in detail
- `docs/DESIGN_SYSTEM.md` — design tokens, typography, colors
- `docs/DATA_MODEL.md` — profile object shape, entity types, label conventions
- `docs/DEPLOYMENT.md` — local setup, build, GitHub Pages
- `docs/EXTENDING.md` — how to add pages, profiles, fields, backend
- `docs/FIGMA_SCREENS.md` — screen inventory for Figma import

## Architecture

**What it is:** A React SPA for Third-Party Risk Management (RCTP). It simulates a compliance platform for creating, screening, and managing third-party records.

**Routing:** `HashRouter` (required for GitHub Pages). Base path is `/rctp-process2/` in production, `/` in dev — controlled by `vite.config.js`.

**State:** Local React state only (`useState`, `useEffect`, `useRef`). No Redux, Zustand, or context. All data is static — mock profiles live in `src/data/profiles/`.

**Styling:** CSS Modules (`.module.css` per component). Design tokens (colors, typography, shadows) are defined as CSS custom properties in `src/styles/globals.css`. Icons are Material Icons Outlined via Google Fonts.

**Animation:** `motion` library (v12, Framer Motion fork) — `motion.div` + `AnimatePresence` used throughout for section transitions.

## Key Files

- `src/App.jsx` — all routes defined here (lazy loads CompanyAdmin, ProfileDocuments, ProfileRiskReport, ProfileEdit)
- `src/pages/AddThirdParty.jsx` — the most complex page; multi-step third-party creation wizard with entity verification, duplicate check, summary, and onboarding detail sections. Contains a local `ObSelect` combobox component at the bottom of the file.
- `src/pages/AddThirdParty.module.css` — styles for the above
- `src/components/profile/ProfilePage.jsx` — the full third-party profile view with tabbed sections, side panels, and inline editing
- `src/components/profile/profile.module.css` — all profile-related styles (~1 600 lines)
- `src/data/profiles/` — static mock profile objects: `profile-gazprom.js` (entity, high risk), `profile-piedpiper.js` (entity, low risk), `profile-initech.js` (entity, medium risk), `profile-brucewayne.js` (person, low risk)
- `src/data/profiles/index.js` — exports all profiles as named exports + `profiles` object keyed by id
- `src/styles/globals.css` — all CSS variables (`--primary-500`, `--neutral-25`, `--text-light`, etc.)
- `src/utils/motion.js` — Framer Motion transition presets (`transition.card`, `transition.accordionOpen`, etc.)

## AddThirdParty Form Flow

The creation wizard has 5 sequential sections that appear after user actions:

1. **Section 1** — TP Type selector + Name input + (entity only) Country/Territory + DUNS Number
2. **Section 2** — Duplicate check results (hidden for Unknown type), shown after clicking Continue
3. **Section 3** — Entity verification via Dun & Bradstreet (entity type only); auto-opens if Country or DUNS was filled in section 1
4. **Section 4** — Summary (Owner, Business Unit, Tags, Process, S&M Policy)
5. **Section 5** — Onboarding Details (different fields for entity / person / unknown)

Key state relationships:
- `tpCountry` / `tpDuns` (section 1) → pre-filter entity verification + populate onboarding country/ID fields
- `process` selection → auto-sets `policy` to the first managed policy in `PROCESS_POLICIES`
- `tpName` → synced to `legalName` in all three onboarding state objects
- `entityVerified` flag → shows override warning in onboarding section

## PROCESS_POLICIES mapping

```js
'Standard RCTP'          → 'Default Standard KYBP Policy'
'Enhanced Due Diligence' → 'Enhanced KYBP Policy'
'Basic Screening'        → 'Minimal Screening Policy'
```

## Profile Field Label Convention

Field labels in `overviewFields` and `additionalFields` are prefixed by entity type to match `CompanyAdmin.jsx` slot definitions:

- **Entity:** `Entity Third Party Legal Name`, `Entity Registered Country`, `Entity ID Type`, `Entity Website`, etc.
- **Person:** `Person Third Party Legal Name`, `Person Country of Residence`, `Person ID Type`, `Person Year of Birth`, etc.
- **Unknown:** `Unknown Third Party Legal Name`, `Unknown Registered Country`, `Unknown ID Types`, etc.
- **Shared (all types):** `Third Party Owner`, `Process Name`, `Business Unit`, `Screening & Monitoring Policy`, `Third Party Legal Structure`, `Commercial Significance of Product or Service`, `Third Party Expiry Date`, `Tags`, `Responsible Client Unit`, `Internal Reference or ID`, `All Relevant Client Units`, `Third Party Contact Email Address`

The canonical lists are `INITIAL_ENTITY_OVERVIEW`, `INITIAL_PERSON_OVERVIEW`, `INITIAL_UNKNOWN_OVERVIEW`, `INITIAL_ENTITY_ADDITIONAL`, `INITIAL_PERSON_ADDITIONAL`, `INITIAL_UNKNOWN_ADDITIONAL` in `CompanyAdmin.jsx`.

## CSS Patterns

**Inset section dividers** (profile page, company admin, third parties): `1px solid var(--neutral-50)` with `margin: 0 16px`. In `profile.module.css` these are implemented as `::before` pseudo-elements on `.riskReport` and `.tableCard` rather than explicit DOM elements.

**Table borders:** All tables use `border: 1px solid var(--neutral-50)` on both `thead th` and `tbody td` for full cell borders.

**Risk card hover:** Cards use CSS gradient darkening on hover only — no `box-shadow` or `y` transform.

## Deployment

GitHub Pages repo: `ClaudioMerinoR/rctp-process2`. After any change, run `npm run deploy` to publish. Always commit and push to `main` first.
