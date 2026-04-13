# Product Overview

## What is RCTP Process?

RCTP Process is a high-fidelity prototype of a **Third-Party Risk Management (TPRM)** compliance platform. It simulates the workflow a compliance team follows to onboard, screen, and monitor third-party relationships — vendors, contractors, individuals, and other external entities.

The platform is built for **Dow Jones RiskCenter** and demonstrates the end-to-end lifecycle of a third party:

```
Create Third Party → Duplicate Check → Entity Verification →
Risk Assessment → Due Diligence → Screening & Monitoring →
Approval → Ongoing Review
```

---

## Who Uses It

| Role | How they use it |
|---|---|
| **Third Party Owner** | Creates and owns third-party records; monitors their status |
| **Compliance Team** | Reviews risk assessments, manages red flags, approves third parties |
| **Business Unit Manager** | Views third parties associated with their business unit |
| **System Administrator** | Configures field definitions via Company Admin |

---

## Feature Inventory

| Feature | Status | Route |
|---|---|---|
| Third parties list & table | ✅ Built | `/third-parties` |
| Create third party wizard (Entity) | ✅ Built | `/add-third-party` |
| Create third party wizard (Person) | ✅ Built | `/add-third-party` |
| Create third party wizard (Unknown) | ✅ Built | `/add-third-party` |
| Duplicate check | ✅ Built | `/add-third-party` (step 2) |
| Entity verification (D&B) | ✅ Built | `/add-third-party` (step 3) |
| Profile — Overview tab | ✅ Built | `/profile/:id` |
| Profile — Additional Details tab | ✅ Built | `/profile/:id` |
| Profile — Connections tab | ✅ Built | `/profile/:id` |
| Profile — Risk Level cards | ✅ Built | `/profile/:id` |
| Profile — Open Tasks table | ✅ Built | `/profile/:id` |
| Profile — Screening & Monitoring | ✅ Built | `/profile/:id` |
| Profile — Notes side panel | ✅ Built | `/profile/:id` |
| Profile — Edit form | ✅ Built | `/profile/:id/edit` |
| Profile — Documents | ✅ Built | `/profile/:id/documents` |
| Risk Level Report — Breakdown | ✅ Built | `/profile/:id/risk-report` |
| Risk Level Report — Process Summary | ✅ Built | `/profile/:id/risk-report` |
| Risk Level Report — Amend panel | ✅ Built | `/profile/:id/risk-report` |
| Company Admin — field slot editor | ✅ Built | `/company-admin` |
| Employees | 🚧 Stub | `/employees` |
| Risk Search | 🚧 Stub | `/risk-search` |
| Settings | 🚧 Stub | `/settings` |
| Reports | 🚧 Stub | `/reports` |
| Backend / real data persistence | ❌ Not built | — |
| Authentication / authorisation | ❌ Not built | — |
| Search & filtering (functional) | ❌ Not built | — |

---

## Key User Flows

### Flow 1 — Create a new Third Party
1. Navigate to **Third Parties** → click **Add New**
2. Select type: Entity / Person / Unknown
3. Enter name (+ country and DUNS for Entity)
4. Review duplicate check results and confirm
5. (Entity only) Select verified entity from D&B results
6. Set owner, business unit, process, policy, tags
7. Fill onboarding details (type-specific fields)
8. Submit — "Creating" overlay plays, then redirects

### Flow 2 — Review a Third Party Profile
1. Click any row in the Third Parties table
2. Browse tabs: Overview → Additional Details → Connections
3. View Risk Level cards → click any card to open Risk Report
4. Review accordion breakdown by category
5. Optionally amend risk level

### Flow 3 — Manage Field Definitions (Admin)
1. Navigate to **Company Admin**
2. Select entity type tab: Entity / Individual / Unknown
3. Click **Edit** to rearrange slot assignments
4. Save changes

---

## Known Limitations

- **All data is static** — no backend, no database, no persistence between sessions
- **4 mock profiles only** — Gazprom (entity, high risk), Pied Piper (entity, low risk), Initech (entity, medium risk), Bruce Wayne (person, low risk)
- **No authentication** — anyone with the URL has full access
- **Form submissions are simulated** — the "Creating" overlay is a timed animation; no record is actually saved
- **Search and filters are decorative** — inputs render but do not filter data
- **No tests** — the project has no test suite
