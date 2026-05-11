# Architecture

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI framework | React | 19.2 |
| Routing | React Router DOM (HashRouter) | 7.13 |
| Animation | Framer Motion (`motion/react` fork) | 12.38 |
| Styling | CSS Modules + CSS custom properties | — |
| Build tool | Vite | 8.0 |
| Icons | Material Icons Outlined (Google Fonts) | — |
| Fonts | Roboto, Public Sans (Google Fonts) | — |
| Deployment | GitHub Pages via `gh-pages` | 6.3 |

---

## Source Tree

```
src/
├── App.jsx                        # Router + all route definitions
├── main.jsx                       # React entry point (createRoot)
│
├── pages/                         # Full-page route components
│   ├── Dashboard.jsx              # / (default)
│   ├── Dashboard.module.css
│   ├── ThirdParties.jsx           # /third-parties
│   ├── ThirdParties.module.css
│   ├── AddThirdParty.jsx          # /add-third-party (most complex page)
│   ├── AddThirdParty.module.css
│   ├── Employees.jsx              # /employees
│   ├── Employees.module.css
│   ├── RiskSearch.jsx             # /risk-search
│   ├── RiskSearch.module.css
│   ├── CompanyAdmin.jsx           # /company-admin (lazy); exports ROLES_DATA
│   ├── CompanyAdmin.module.css
│   ├── RoleDetails.jsx            # /company-admin/roles/:index (lazy)
│   ├── RoleDetails.module.css
│   ├── Settings.jsx               # /settings/:tab/:section
│   ├── Settings.module.css
│   ├── RenewalEdit.jsx            # /settings/renewals/:version/edit
│   ├── RenewalEdit.module.css
│   └── Placeholder.jsx            # stub for unbuilt routes (/reports)
│
├── components/
│   ├── layout/                    # Shared shell components
│   │   ├── PageLayout.jsx         # Header + MainNav + <main> + Footer wrapper
│   │   ├── Header.jsx             # Top bar (branding, icons)
│   │   ├── MainNav.jsx            # Horizontal nav links
│   │   ├── Breadcrumb.jsx         # Path trail
│   │   └── Footer.jsx
│   │
│   ├── profile/                   # Third-party profile views
│   │   ├── ProfilePage.jsx        # /profile/:id — main overview
│   │   ├── ProfilePageHeader.jsx  # Extracted top-strip header
│   │   ├── Sidebar.jsx            # Left sidebar (steps + section links)
│   │   ├── ProfileEdit.jsx        # /profile/:id/edit (lazy)
│   │   ├── ProfileDocuments.jsx   # /profile/:id/documents
│   │   ├── ProfileRiskReport.jsx  # /profile/:id/risk-report (lazy)
│   │   ├── ProfileRiskMitigation.jsx  # /profile/:id/risk-mitigation
│   │   ├── ProfileRiskAssessment.jsx  # /profile/:id/risk-assessment
│   │   ├── ProfileDueDiligence.jsx    # /profile/:id/due-diligence
│   │   ├── ProfileIntegrityCheck.jsx  # /profile/:id/integrity-check
│   │   ├── ProfileEnhancedDueDiligence.jsx  # /profile/:id/enhanced-due-diligence
│   │   ├── ProfileUBO.jsx         # /profile/:id/ubo
│   │   ├── ProfileApproval.jsx    # /profile/:id/approval
│   │   ├── ProfileScreeningMonitoring.jsx  # /profile/:id/screening-monitoring
│   │   ├── ProfileProperties.jsx  # /profile/:id/properties
│   │   ├── ProfileEntityVerification.jsx   # /profile/:id/entity-verification
│   │   ├── ProfileAudit.jsx       # /profile/:id/audit
│   │   ├── ProfilePlaceholder.jsx # Fallback for unbuilt sub-pages
│   │   ├── profileAssets.js       # TASK_ICONS map, PARTNER_ICONS, riskBadge helper
│   │   └── profile.module.css     # All shared profile styles (~1 900 lines)
│   │
│   └── ui/                        # Reusable UI primitives
│       ├── Button.jsx             # Variants: filled, outline, ghost; optional icon
│       ├── Button.module.css
│       ├── Checkbox.jsx           # checked / indeterminate / disabled / error; default + small sizes
│       ├── Flag.jsx               # Country flag emoji wrapper
│       ├── Badge.jsx              # Status/type badge
│       ├── RiskBadge.jsx          # High / Medium / Low risk badge
│       └── RiskBadge.module.css
│
├── data/
│   └── profiles/
│       ├── index.js               # Named + default exports of all 10 profiles
│       ├── profile-gazprom.js     # Entity, high risk, Pending Approval
│       ├── profile-piedpiper.js   # Entity, high risk, Pending Approval (embedded)
│       ├── profile-initech.js     # Entity, medium risk, Approved* (interactive flow)
│       ├── profile-dundermifflin.js  # Entity, medium risk, Approved! (Renewal Required)
│       ├── profile-gringotts.js   # Entity, medium risk, Approved! (Renewal Required)
│       ├── profile-ecomoda.js     # Entity, medium risk, Approved! (Renewal Required)
│       ├── profile-lumon.js       # Entity, low risk, Approved (interactive renewal)
│       ├── profile-lospollos.js   # Entity, high risk, Not Approved
│       ├── profile-waystar.js     # Entity, high risk, Not Approved
│       └── profile-brucewayne.js  # Person, low risk, Pending Approval (embedded)
│
├── styles/
│   └── globals.css                # Design tokens (CSS vars) + base reset
│
├── utils/
│   ├── motion.js                  # Framer Motion transition presets
│   └── initechFlow.js             # Interactive flow state for Initech, Dunder Mifflin, Lumon, Gringotts
│
└── assets/                        # Static images and icons
    ├── partner-icon-integrity.png
    ├── partner-icon-ubo.png
    ├── icon-*.svg                  # Task/status icons
    └── hero.png
```

---

## Routing

**Router type:** `HashRouter` — required so GitHub Pages can serve any "route" without a 404. All URLs use the `/#/path` format in production.

**Base path:** `/rctp-process2/` in production, `/` in development (set in `vite.config.js`).

**Route table:**

| Path | Component | Loading |
|---|---|---|
| `/` | `Dashboard` | Eager |
| `/third-parties` | `ThirdParties` | Eager |
| `/add-third-party` | `AddThirdParty` | Eager |
| `/profile/:profileId` | `ProfilePage` | Eager |
| `/profile/:profileId/documents` | `ProfileDocuments` | Eager |
| `/profile/:profileId/risk-report` | `ProfileRiskReport` | Lazy |
| `/profile/:profileId/edit` | `ProfileEdit` | Lazy |
| `/profile/:profileId/risk-mitigation` | `ProfileRiskMitigation` | Eager |
| `/profile/:profileId/risk-assessment` | `ProfileRiskAssessment` | Eager |
| `/profile/:profileId/due-diligence` | `ProfileDueDiligence` | Eager |
| `/profile/:profileId/integrity-check` | `ProfileIntegrityCheck` | Eager |
| `/profile/:profileId/enhanced-due-diligence` | `ProfileEnhancedDueDiligence` | Eager |
| `/profile/:profileId/ubo` | `ProfileUBO` | Eager |
| `/profile/:profileId/approval` | `ProfileApproval` | Eager |
| `/profile/:profileId/screening-monitoring` | `ProfileScreeningMonitoring` | Eager |
| `/profile/:profileId/properties` | `ProfileProperties` | Eager |
| `/profile/:profileId/entity-verification` | `ProfileEntityVerification` | Eager |
| `/profile/:profileId/audit` | `ProfileAudit` | Eager |
| `/company-admin` | → redirect to `/company-admin/summary` | — |
| `/company-admin/summary` | `CompanyAdmin` | Lazy |
| `/company-admin/third-party-details` | `CompanyAdmin` | Lazy |
| `/company-admin/roles` | `CompanyAdmin` | Lazy |
| `/company-admin/roles/:roleIndex` | `RoleDetails` | Lazy |
| `/employees` | `Employees` | Eager |
| `/risk-search` | `RiskSearch` | Eager |
| `/settings` | → redirect to `/settings/general/currency_approval_groups` | — |
| `/settings/:tab/:section` | `Settings` | Eager |
| `/settings/renewals/:version/edit` | `RenewalEdit` | Eager |
| `/reports` | `Placeholder` | Eager |

`profileId` must match one of the keys in `src/data/profiles/index.js`: `gazprom`, `piedpiper`, `initech`, `dundermifflin`, `gringotts`, `ecomoda`, `lumon`, `lospollos`, `waystar`, `brucewayne`.

---

## State Management

**No global store.** All state is local React state (`useState`, `useRef`, `useEffect`). No Redux, Zustand, or Context API.

Key state patterns:
- `AddThirdParty.jsx` — ~30 `useState` hooks covering form fields, wizard step visibility, modal state, and simulated loading
- `ProfilePage.jsx` — active tab, status/decline/renewal panel visibility, loading simulation, inline edit state, `currentStatus` mirrored into local state for interactive flows
- `ProfileRiskReport.jsx` — active tab (breakdown / process summary) and amend panel visibility
- `Dashboard.jsx` — active tab (`Actions` / `Screening & Monitoring` / `Screening & Monitoring Tasks` / `Enhanced Due Diligence Reports`), chip filter, search input
- `RenewalEdit.jsx` — `rows`, `cols`, `leftPct` (draggable divider), `dragRowIdx`, `dragOverIdx`, `colPicker` side panel state
- `RoleDetails.jsx` — `tpPerms` (keyed by section title), `flatPerms` (keyed by tab name), open accordion state, edit mode

**Interactive flows** (`src/utils/initechFlow.js`) — module-level mutable variables (`_riskMitigated`, `_approved`, etc.) are the closest thing to global state. `patchInitechProfile()` is called in both `ProfilePage.jsx` and `Sidebar.jsx` to apply the current flow state to a profile before rendering.

---

## Data

All data is **static JavaScript objects** in `src/data/profiles/`. No API calls, no database.

```js
// src/data/profiles/index.js
export { default as gazprom }       from './profile-gazprom.js';
export { default as piedpiper }     from './profile-piedpiper.js';
export { default as initech }       from './profile-initech.js';
export { default as dundermifflin } from './profile-dundermifflin.js';
export { default as gringotts }     from './profile-gringotts.js';
export { default as ecomoda }       from './profile-ecomoda.js';
export { default as lumon }         from './profile-lumon.js';
export { default as lospollos }     from './profile-lospollos.js';
export { default as waystar }       from './profile-waystar.js';
export { default as brucewayne }    from './profile-brucewayne.js';

export const profiles = {
  gazprom, piedpiper, initech, dundermifflin, gringotts,
  ecomoda, lumon, lospollos, waystar, brucewayne
};
```

Components load profiles by `profileId` URL param:
```js
const profile = patchInitechProfile(profiles[useParams().profileId]);
```

See [DATA_MODEL.md](DATA_MODEL.md) for the full profile object shape.

---

## Styling

**CSS Modules** — each component/page has a co-located `.module.css` file. Class names are locally scoped (no global leakage).

```jsx
import styles from './Component.module.css';
<div className={styles.myClass} />
```

**Design tokens** live in `src/styles/globals.css` as CSS custom properties on `:root`. All components reference tokens via `var(--token-name)`. See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

**Background colour:** `--neutral-25` = `#F4F4F4` — used for the page body, table headers, and sidebar backgrounds throughout the app.

**Icons:** Material Icons Outlined loaded from Google Fonts.
```jsx
<span className="material-icons-outlined">check_circle</span>
```

**Table header sort icons:** all `thead th` use `arrow_drop_down` at 12px, positioned `absolute; right: 8px` inside a `position: relative` `<th>`. The CSS selector `th span[class*="material-icons"]` targets them without extra class names.

---

## Animation

The `motion` package (Framer Motion v12 fork) is used throughout for:
- **Section entrance:** `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
- **Tab indicator:** `<motion.div layoutId="...">` animated underline — used in ProfilePage, Dashboard, Settings, RoleDetails
- **Accordion expand/collapse:** animated height
- **Side panel slide-in:** `x: '100%'` → `x: 0` right-to-left transforms (Status panel, Decline panel, Notes panel, Connect panel)

Reusable transition presets are defined in `src/utils/motion.js`:
```js
export const transition = {
  card:           { duration: 0.18, ease: [...] },
  section:        { duration: 0.3,  ease: [...] },
  sectionDelayed: { delay: 0.05, duration: 0.3, ... },  // 350ms total — scroll calls need ≥400ms delay
  accordionOpen:  { duration: 0.22, ... },
  accordionClose: { duration: 0.18, ... },
};
```
