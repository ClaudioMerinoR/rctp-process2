# RCTP Process 2.0

A React single-page application simulating a **Third-Party Risk Management (TPRM)** compliance platform. Built as a high-fidelity prototype for creating, screening, and managing third-party records across entity, person, and unknown types.

**Live demo:** [https://claudiomerinor.github.io/rctp-process2/](https://claudiomerinor.github.io/rctp-process2/)

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server (http://localhost:5173)
npm run dev
```

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for build and deployment instructions.

---

## Documentation

| Document | Description |
|---|---|
| [docs/OVERVIEW.md](docs/OVERVIEW.md) | What the product is, what's built vs stubbed, key user flows |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Tech stack, file structure, routing, state, styling |
| [docs/PAGES.md](docs/PAGES.md) | Every route documented with features and component references |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Design tokens, typography, color palette, spacing |
| [docs/DATA_MODEL.md](docs/DATA_MODEL.md) | Profile data shape, entity types, how to add mock profiles |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Local setup, build process, GitHub Pages deployment |
| [docs/EXTENDING.md](docs/EXTENDING.md) | How to add pages, profiles, fields, and backend integration |
| [docs/FIGMA_SCREENS.md](docs/FIGMA_SCREENS.md) | Inventory of all screens and flows to import into Figma |

---

## Stack at a Glance

- **React 19** + **React Router 7** (HashRouter)
- **Framer Motion v12** (`motion/react`) for animations
- **CSS Modules** + CSS custom properties for styling
- **Vite 8** for build tooling
- **GitHub Pages** for hosting (`npm run deploy`)
- No global state, no backend, no tests — static prototype only
