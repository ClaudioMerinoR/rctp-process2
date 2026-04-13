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
| Fonts | Public Sans, Roboto (Google Fonts) | — |
| Deployment | GitHub Pages via `gh-pages` | 6.3 |

---

## Source Tree

```
src/
├── App.jsx                        # Router + all route definitions
├── main.jsx                       # React entry point (createRoot)
│
├── pages/                         # Full-page route components
│   ├── ThirdParties.jsx           # /third-parties
│   ├── ThirdParties.module.css
│   ├── AddThirdParty.jsx          # /add-third-party (1 343 lines — most complex)
│   ├── AddThirdParty.module.css
│   ├── CompanyAdmin.jsx           # /company-admin (lazy loaded)
│   ├── CompanyAdmin.module.css
│   └── Placeholder.jsx            # stub for unbuilt routes
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
│   │   ├── ProfilePage.jsx        # /profile/:id — main view (1 094 lines)
│   │   ├── ProfileDocuments.jsx   # /profile/:id/documents (lazy)
│   │   ├── ProfileRiskReport.jsx  # /profile/:id/risk-report (lazy)
│   │   ├── ProfileEdit.jsx        # /profile/:id/edit (lazy)
│   │   └── profile.module.css     # All profile page styles (~1 600 lines)
│   │
│   └── ui/                        # Reusable UI primitives
│       ├── Button.jsx             # Generic button with variants
│       ├── Button.module.css
│       ├── RiskBadge.jsx          # High / Medium / Low badge
│       └── RiskBadge.module.css
│
├── data/
│   └── profiles/
│       ├── index.js               # Named + default export of all profiles
│       ├── profile-gazprom.js     # Entity, high risk
│       ├── profile-piedpiper.js   # Entity, low risk
│       ├── profile-initech.js     # Entity, medium risk
│       └── profile-brucewayne.js  # Person, low risk
│
├── styles/
│   └── globals.css                # Design tokens (CSS vars) + base reset
│
├── utils/
│   └── motion.js                  # Framer Motion transition presets
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
| `/` | → redirect to `/third-parties` | — |
| `/third-parties` | `ThirdParties` | Eager |
| `/add-third-party` | `AddThirdParty` | Eager |
| `/profile/:profileId` | `ProfilePage` | Eager |
| `/profile/:profileId/documents` | `ProfileDocuments` | Lazy |
| `/profile/:profileId/risk-report` | `ProfileRiskReport` | Lazy |
| `/profile/:profileId/edit` | `ProfileEdit` | Lazy |
| `/company-admin` | `CompanyAdmin` | Lazy |
| `/employees` | `Placeholder` | Eager |
| `/risk-search` | `Placeholder` | Eager |
| `/settings` | `Placeholder` | Eager |
| `/reports` | `Placeholder` | Eager |

Lazy routes use `React.lazy()` + `<Suspense fallback={<Loading />}>` in `App.jsx`.

`profileId` must match one of the keys in `src/data/profiles/index.js`: `gazprom`, `piedpiper`, `initech`, `brucewayne`.

---

## State Management

**No global store.** All state is local React state (`useState`, `useRef`, `useEffect`). No Redux, Zustand, or Context API.

Key state patterns:
- `AddThirdParty.jsx` maintains ~30 `useState` hooks covering form fields, wizard step visibility, modal state, and simulated loading
- `ProfilePage.jsx` tracks active tab, side panel visibility, loading simulation, and inline edit state
- `ProfileRiskReport.jsx` tracks active tab (breakdown / process summary) and amend panel visibility

---

## Data

All data is **static JavaScript objects** in `src/data/profiles/`. No API calls, no database.

```js
// src/data/profiles/index.js
export { default as gazprom }     from './profile-gazprom.js';
export { default as piedpiper }   from './profile-piedpiper.js';
export { default as initech }     from './profile-initech.js';
export { default as brucewayne }  from './profile-brucewayne.js';

export const profiles = { gazprom, piedpiper, initech, brucewayne };
```

Components load profiles by `profileId` URL param:
```js
const { profileId } = useParams();
const profile = profiles[profileId];
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

**Icons:** Material Icons Outlined loaded from Google Fonts.
```jsx
<span className="material-icons-outlined">check_circle</span>
```

---

## Animation

The `motion` package (Framer Motion v12 fork) is used throughout for:
- **Section entrance:** `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
- **Tab transitions:** `AnimatePresence` + `mode="wait"` for cross-fade
- **Accordion expand/collapse:** animated `height: 0 → 'auto'`
- **Side panel slide-in:** right-to-left transforms

Reusable transition presets are defined in `src/utils/motion.js`:
```js
export const transition = {
  card: { duration: 0.18, ease: [...] },
  accordionOpen:  { duration: 0.22, ... },
  accordionClose: { duration: 0.18, ... },
  // ...
};
```
