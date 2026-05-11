# Deployment

## Prerequisites

- **Node.js** 18 or later
- **npm** 9 or later
- Git
- GitHub account with write access to `ClaudioMerinoR/rctp-process2`

---

## Local Setup

```bash
# Clone the repo
git clone https://github.com/ClaudioMerinoR/rctp-process2.git
cd rctp-process2

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173 (auto-increments if port is busy)
```

The dev server uses the base path `/` so all routes work without prefix.

---

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server with HMR at `localhost:5173` |
| `npm run build` | Production build → `dist/` (base path `/rctp-process2/`) |
| `npm run preview` | Serve the `dist/` build locally for testing |
| `npm run lint` | Run ESLint checks |
| `npm run deploy` | Build + publish to GitHub Pages |

---

## Deployment Targets

The project deploys to **two independent targets** — they coexist and don't interfere.

### GitHub Pages

**URL:** [https://claudiomerinor.github.io/rctp-process2/](https://claudiomerinor.github.io/rctp-process2/)
**Repo:** `ClaudioMerinoR/rctp-process2`

```bash
npm run deploy
# = vite build (base /rctp-process2/) + gh-pages -d dist
```

This builds the app with `base: '/rctp-process2/'` and pushes `dist/` to the `gh-pages` branch. GitHub Pages serves from that branch.

### Hatch (internal DJ service mesh)

**URL:** `https://rctp-process.hatch.internal.ai.dowjones.io`
**Auth:** none (publicly accessible, no login required)

```bash
# 1. Build with base /
npx vite build --base=/

# 2. Bundle dist/
tar czf /tmp/_hatch_deploy.tar.gz --exclude='./.git' --exclude='./.DS_Store' -C dist .

# 3. Upload via Hatch MCP tools:
#    authenticate → get_deploy_token → curl upload
```

> **Important:** the `vite.config.js` `base` setting must NOT be changed permanently — the `--base=/` flag overrides it at build time for Hatch only.

---

## Development Workflow

```bash
# 1. Make your changes
# 2. Test locally
npm run dev

# 3. (Optional) lint check
npm run lint

# 4. Commit and push to main
git add <files>
git commit -m "your message"
git push

# 5. Deploy to GitHub Pages
npm run deploy
```

Always commit and push to `main` **before** deploying, so the source code and the live site stay in sync.

---

## Production Build Details

```bash
npm run build
```

Outputs to `dist/`. The base path is set to `/rctp-process2/` in production (via `vite.config.js`):

```js
// vite.config.js
base: process.env.NODE_ENV === 'production' ? '/rctp-process2/' : '/'
```

This ensures all asset paths and the router base are correct on GitHub Pages.

---

## Why HashRouter?

GitHub Pages is a static file host — it can only serve `index.html` at the root. If a user navigates directly to `https://…/rctp-process2/#/profile/gazprom`, the `#` part is handled entirely client-side, so GitHub Pages never receives an unknown path. This is why `HashRouter` is used instead of `BrowserRouter`.

---

## Typical Deploy Time

~30 seconds (Vite build ~600ms + gh-pages push ~20s). GitHub Pages propagation can take 1–2 minutes after the push.
