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
# → http://localhost:5173
```

The dev server uses the base path `/` so all routes work without prefix.

---

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server with HMR at `localhost:5173` |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the `dist/` build locally for testing |
| `npm run lint` | Run ESLint checks |
| `npm run deploy` | Build + publish to GitHub Pages |

---

## Development Workflow

```bash
# 1. Make your changes
# 2. Test locally
npm run dev

# 3. (Optional) lint check
npm run lint

# 4. Commit and push to main
git add .
git commit -m "your message"
git push

# 5. Deploy to GitHub Pages
npm run deploy
```

Always commit and push to `main` **before** deploying, so the source code and the live site stay in sync.

---

## Production Build

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

## GitHub Pages Deployment

```bash
npm run deploy
# = vite build && gh-pages -d dist
```

This builds the app and pushes the `dist/` folder to the `gh-pages` branch of the repo. GitHub Pages serves from that branch.

**Live URL:** [https://claudiomerinor.github.io/rctp-process2/](https://claudiomerinor.github.io/rctp-process2/)

**GitHub repo:** `ClaudioMerinoR/rctp-process2`

### Why HashRouter?

GitHub Pages is a static file host — it can only serve `index.html` at the root. If a user navigates directly to `https://…/rctp-process2/#/profile/gazprom`, the `#` part is handled entirely client-side, so GitHub Pages never receives an unknown path. This is why `HashRouter` is used instead of `BrowserRouter`.

---

## Typical deploy time

~30 seconds (Vite build ~400ms + gh-pages push ~20s). GitHub Pages propagation can take 1–2 minutes after the push.
