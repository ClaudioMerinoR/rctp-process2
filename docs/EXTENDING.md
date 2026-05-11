# Extending the Codebase

---

## Add a New Page

1. **Create the component** in `src/pages/MyPage.jsx` (and `MyPage.module.css` if needed)
2. **Add the route** in `src/App.jsx`:
   ```jsx
   import MyPage from './pages/MyPage';
   // or lazy:
   const MyPage = lazy(() => import('./pages/MyPage'));

   // Inside <Routes>:
   <Route path="/my-page" element={<MyPage />} />
   ```
3. **Add a nav link** in `src/components/layout/MainNav.jsx` if the page should appear in the top navigation
4. Wrap the page content with `<PageLayout>` for the standard header/nav/footer shell:
   ```jsx
   import PageLayout from '../components/layout/PageLayout';

   export default function MyPage() {
     return (
       <PageLayout>
         {/* your content */}
       </PageLayout>
     );
   }
   ```

---

## Add a New Mock Profile

1. Create `src/data/profiles/profile-yourname.js` using the shape documented in [DATA_MODEL.md](DATA_MODEL.md)
   - Copy an existing profile as a starting point (e.g. `profile-lumon.js` for a clean entity)
   - Set `entityType` to `'entity'`, `'person'`, or `'unknown'`
   - Use the correct label naming convention for `overviewFields` and `additionalFields`
   - **Do not** add an `icon` field to `currentStatus` — it is derived from `STATUS_CONFIG` at render
   - `riskReport.accordionSections` must have exactly these IDs: `country`, `bribery`, `environmental`, `human-rights`, `general`, `screening`, `cyber`

2. Export it from `src/data/profiles/index.js`:
   ```js
   export { default as yourname } from './profile-yourname.js';
   export const profiles = { gazprom, piedpiper, ..., yourname };
   ```

3. Add a row to the `ROWS` array in `src/pages/ThirdParties.jsx`:
   ```js
   import { ..., yourname } from '../data/profiles';
   const ROWS = [
     ...,
     { profile: yourname, id: 'yourname' },
   ];
   ```

4. Visit `/#/profile/yourname` to verify it renders

---

## Add a Profile with an Interactive Flow

If the profile needs state that changes during the session (e.g. a risk mitigation → approval sequence):

1. Add the profile file with its initial state (the "before" state)
2. Add a patch function in `src/utils/initechFlow.js`:
   ```js
   let _yourFlow = false;

   export function setYourFlow(updates) {
     if ('flag' in updates) _yourFlow = updates.flag;
   }

   function _patchYourname(profile) {
     const steps = profile.sidebarSteps.map(s => {
       if (s.label === 'Approval') return { ...s, dot: _yourFlow ? 'green' : 'red' };
       return s;
     });
     return {
       ...profile,
       sidebarSteps: steps,
       currentStatus: { ...profile.currentStatus, label: _yourFlow ? 'Approved' : 'Pending Approval' },
     };
   }
   ```
3. Register it in `patchInitechProfile`:
   ```js
   if (profile.id === 'yourname') return _patchYourname(profile);
   ```
4. Call `setYourFlow({ flag: true })` from the appropriate profile sub-page when the action is taken

---

## Add or Modify Profile Fields

`overviewFields` and `additionalFields` are arrays of `{ label, value }` on each profile.

- `overviewFields` → shown in the Overview tab (4-column grid)
- `additionalFields` → shown in the Additional Details tab

Label naming must match the `INITIAL_*_OVERVIEW` / `INITIAL_*_ADDITIONAL` slot constants in `CompanyAdmin.jsx`. To add a new entity overview field:

1. Add the label to `INITIAL_ENTITY_OVERVIEW` in `CompanyAdmin.jsx`
2. Add the corresponding `{ label, value }` entry in the profile data files
3. Add the field to `ALL_FIELDS` in `CompanyAdmin.jsx` so it appears in the admin dropdown

---

## Add a New CompanyAdmin Field Option

The full list of configurable fields lives in `CompanyAdmin.jsx` as the `ALL_FIELDS` array (~300 entries). Each entry is:

```js
{ value: 'field-slug', label: 'Field Display Name' }
```

To add a new field:
1. Add an entry to `ALL_FIELDS`
2. Add it to the appropriate `INITIAL_*_OVERVIEW` or `INITIAL_*_ADDITIONAL` array if it should be a default slot
3. Update the corresponding profile data files to use the new label

---

## Add a New Table with Sort Icons

Follow the existing pattern — no extra class names needed:

**JSX:**
```jsx
<thead>
  <tr>
    <th>Column Name <span className="material-icons-outlined" style={{ fontSize: 12 }}>arrow_drop_down</span></th>
  </tr>
</thead>
```

**CSS Module:**
```css
.table thead th {
  position: relative;
  padding: 10px 28px 10px 12px; /* 28px right reserves space for the icon */
  /* ... other styles */
}
.table thead th span[class*="material-icons"] {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  line-height: 1;
}
```

---

## Add a New Tab Bar

All tab bars use the Framer Motion `layoutId` pattern — not `<button>` with `::after` CSS:

```jsx
import { motion } from 'motion/react';
import styles from './MyComponent.module.css';

const TABS = ['Tab One', 'Tab Two', 'Tab Three'];
const [activeTab, setActiveTab] = useState('Tab One');

<div className={styles.tabs}>
  {TABS.map(tab => (
    <div
      key={tab}
      className={`${styles.tab}${activeTab === tab ? ' ' + styles.tabActive : ''}`}
      style={{ position: 'relative' }}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
      {activeTab === tab && (
        <motion.div
          layoutId="my-component-tab-indicator"
          className={styles.tabIndicator}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
        />
      )}
    </div>
  ))}
</div>
```

```css
.tabs { display: flex; gap: 24px; border-bottom: 1px solid var(--neutral-50); }
.tab { font-size: 14px; font-weight: 500; text-transform: uppercase;
       letter-spacing: 0.1px; cursor: pointer; padding-bottom: 8px; }
.tabIndicator {
  position: absolute; bottom: -1px; left: 0; right: 0;
  height: 2px; background: var(--primary-600); border-radius: 1px;
}
```

Each `layoutId` string must be **globally unique** across the app.

---

## Add a Tooltip to a Status Badge

Add `tooltip` to the profile's `currentStatus`:
```js
currentStatus: { label: 'Approved*', tooltip: 'Your tooltip text here.' },
```

`ProfilePage.jsx` will automatically wrap the badge in `.badgeTipWrap` and render the tooltip. No JSX changes needed. To remove the tooltip when status changes (e.g. in an interactive flow):
```js
currentStatus: { ...profile.currentStatus, label: 'Approved', tooltip: undefined }
```

---

## Implement Real Backend Integration

The app is designed for easy backend connection. Data flows through one layer:

**Current (static):**
```
src/data/profiles/index.js → profiles object → components via useParams()
```

**With a real API:**

1. Replace the static import with a fetch call:
   ```js
   // ProfilePage.jsx
   const [profile, setProfile] = useState(null);
   useEffect(() => {
     fetch(`/api/profiles/${profileId}`)
       .then(r => r.json())
       .then(data => setProfile(patchInitechProfile(data)));
   }, [profileId]);
   ```

2. Recommended: add [React Query (`@tanstack/react-query`)](https://tanstack.com/query) or [SWR](https://swr.vercel.app/) for caching, loading states, and error handling

3. Update `AddThirdParty.jsx` submit handler (currently a timed simulation) to POST to your API

4. Update `ProfileEdit.jsx` save handler to PUT/PATCH to your API

**Key files to update:**
- `src/data/profiles/index.js` — remove static data
- `src/pages/ThirdParties.jsx` — fetch list from API
- `src/components/profile/ProfilePage.jsx` — fetch single profile
- `src/pages/AddThirdParty.jsx` — submit handler
- `src/components/profile/ProfileEdit.jsx` — save handler
- `src/components/profile/ProfileRiskReport.jsx` — amend handler
- `src/utils/initechFlow.js` — replace module-level state with server-side flow state

---

## Add Tests

The project currently has no tests. To add them:

1. Install Vitest + React Testing Library:
   ```bash
   npm install -D vitest @testing-library/react @testing-library/user-event jsdom
   ```

2. Add Vitest config to `vite.config.js`:
   ```js
   test: {
     environment: 'jsdom',
     globals: true,
     setupFiles: './src/test/setup.js',
   }
   ```

3. Add test script to `package.json`:
   ```json
   "test": "vitest"
   ```

4. Start with unit tests for pure utilities (`initechFlow.js`, `motion.js`) and data transformations, then add component tests for key interactions (type card selection, duplicate check flow, accordion expand/collapse, status badge tooltip visibility)

---

## Add TypeScript

The project is JavaScript-only. To migrate:

1. Rename files from `.jsx` → `.tsx` incrementally
2. Add `tsconfig.json` (use the Vite React-TS template as a reference)
3. Define interfaces for the profile data shape (see [DATA_MODEL.md](DATA_MODEL.md))
4. Update `vite.config.js` to use `@vitejs/plugin-react` (already handles TSX)
5. Add `typescript` and update eslint config

Start with `src/data/profiles/` — defining the `Profile` interface there will catch the most errors early. Key types to define: `SidebarStep`, `OverviewField`, `RiskCard`, `OpenTask`, `ScreeningRow`, `RiskReport`.
