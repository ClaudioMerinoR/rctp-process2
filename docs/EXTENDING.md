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
4. Wrap the page content with `<PageLayout>` to get the standard header/nav/footer shell:
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
   - Copy an existing profile as a starting point
   - Set `entityType` to `'entity'`, `'person'`, or `'unknown'`
   - Use the correct label naming convention for `overviewFields` and `additionalFields`
2. Export it from `src/data/profiles/index.js`:
   ```js
   export { default as yourname } from './profile-yourname.js';
   export const profiles = { gazprom, piedpiper, initech, brucewayne, yourname };
   ```
3. Add a row to the table in `src/pages/ThirdParties.jsx` — the rows are hardcoded in the JSX `<tbody>`
4. Visit `/profile/yourname` to verify

---

## Add or Modify Profile Fields

**Overview and Additional Details fields** are arrays of `{ label, value }` objects on each profile.

- `overviewFields` → shown in the Overview tab (4-column grid)
- `additionalFields` → shown in the Additional Details tab

Label naming must match the `INITIAL_*_OVERVIEW` / `INITIAL_*_ADDITIONAL` slot constants in `CompanyAdmin.jsx`. For example, to add a new entity overview field:

1. Add the label to `INITIAL_ENTITY_OVERVIEW` in `CompanyAdmin.jsx`
2. Add the corresponding `{ label, value }` entry in the profile data files
3. Add the field to `ALL_FIELDS` in `CompanyAdmin.jsx` so it appears in the admin dropdown

---

## Add a New CompanyAdmin Field Option

The full list of configurable fields lives in `CompanyAdmin.jsx` as the `ALL_FIELDS` array (~300 entries, near the top of the file). Each entry is:

```js
{ value: 'field-slug', label: 'Field Display Name' }
```

To add a new field:
1. Add an entry to `ALL_FIELDS`
2. Add it to the appropriate `INITIAL_*_OVERVIEW` or `INITIAL_*_ADDITIONAL` array if it should be a default slot
3. Update the corresponding profile data files to use the new label

---

## Implement Real Backend Integration

The app is designed for easy backend connection. Data flows through one layer:

**Current (static):**
```
src/data/profiles/index.js → profiles object → components via useParams()
```

**With a real API:**

1. Replace the static import with an API call using `useEffect` + `useState` (or a data-fetching library):
   ```js
   // ProfilePage.jsx
   const [profile, setProfile] = useState(null);
   useEffect(() => {
     fetch(`/api/profiles/${profileId}`)
       .then(r => r.json())
       .then(setProfile);
   }, [profileId]);
   ```

2. Recommended: add [React Query (`@tanstack/react-query`)](https://tanstack.com/query) or [SWR](https://swr.vercel.app/) for caching, loading states, and error handling

3. Update `AddThirdParty.jsx` submit handler (currently a timed simulation) to POST to your API

4. Update `ProfileEdit.jsx` save handler to PUT/PATCH to your API

**Key files to update for backend integration:**
- `src/data/profiles/index.js` — remove static data
- `src/pages/ThirdParties.jsx` — fetch list from API
- `src/components/profile/ProfilePage.jsx` — fetch single profile
- `src/pages/AddThirdParty.jsx` — submit handler
- `src/components/profile/ProfileEdit.jsx` — save handler
- `src/components/profile/ProfileRiskReport.jsx` — amend handler

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

4. Start with unit tests for pure utilities and data transformations, then add component tests for key interactions (type card selection, duplicate check flow, accordion expand/collapse)

---

## Add TypeScript

The project is JavaScript-only. To migrate:

1. Rename files from `.jsx` → `.tsx` incrementally
2. Add `tsconfig.json` (use the Vite React-TS template as a reference)
3. Define interfaces for the profile data shape (see [DATA_MODEL.md](DATA_MODEL.md) for the full shape)
4. Update `vite.config.js` to use `@vitejs/plugin-react` (already handles TSX)
5. Add `typescript` and update eslint config

Start with `src/data/profiles/` — defining the `Profile` interface there will catch the most errors early.
