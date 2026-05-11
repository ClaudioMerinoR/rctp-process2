# Product Overview

## What is RCTP Process?

RCTP Process is a high-fidelity prototype of a **Third-Party Risk Management (TPRM)** compliance platform. It simulates the workflow a compliance team follows to onboard, screen, and monitor third-party relationships — vendors, contractors, individuals, and other external entities.

The platform is built for **Dow Jones RiskCenter** and demonstrates the end-to-end lifecycle of a third party:

```
Create Third Party → Duplicate Check → Entity Verification →
Risk Assessment → Due Diligence → Integrity Check → UBO →
Risk Mitigation → Approval → Screening & Monitoring → Ongoing Review / Renewal
```

---

## Who Uses It

| Role | How they use it |
|---|---|
| **Third Party Owner** | Creates and owns third-party records; monitors their status |
| **Compliance Team** | Reviews risk assessments, manages red flags, approves third parties |
| **Business Unit Manager** | Views third parties associated with their business unit |
| **System Administrator** | Configures field definitions and roles via Company Admin; manages process settings |

---

## Feature Inventory

| Feature | Status | Route |
|---|---|---|
| Dashboard — Actions tab (Due Now / Upcoming) | ✅ Built | `/` |
| Dashboard — Screening & Monitoring tab | ✅ Built | `/` |
| Dashboard — Screening & Monitoring Tasks tab | ✅ Built | `/` |
| Dashboard — Enhanced Due Diligence Reports tab | ✅ Built | `/` |
| Third parties list & table (10 profiles) | ✅ Built | `/third-parties` |
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
| Profile — Screening & Monitoring table | ✅ Built | `/profile/:id` |
| Profile — Notes side panel | ✅ Built | `/profile/:id` |
| Profile — Status badge with tooltip | ✅ Built | `/profile/:id` |
| Profile — Status panel (slide-in) | ✅ Built | `/profile/:id` |
| Profile — Decline panel | ✅ Built | `/profile/:id` |
| Profile — Renewal modal | ✅ Built | `/profile/:id` |
| Profile — Delete confirmation modal | ✅ Built | `/profile/:id` |
| Profile — Edit form | ✅ Built | `/profile/:id/edit` |
| Profile — Documents | ✅ Built | `/profile/:id/documents` |
| Profile — Risk Level Report (Breakdown) | ✅ Built | `/profile/:id/risk-report` |
| Profile — Risk Level Report (Process Summary) | ✅ Built | `/profile/:id/risk-report` |
| Profile — Risk Level Report (Amend panel) | ✅ Built | `/profile/:id/risk-report` |
| Profile — Risk Assessment | ✅ Built | `/profile/:id/risk-assessment` |
| Profile — Due Diligence | ✅ Built | `/profile/:id/due-diligence` |
| Profile — Integrity Check | ✅ Built | `/profile/:id/integrity-check` |
| Profile — Enhanced Due Diligence | ✅ Built | `/profile/:id/enhanced-due-diligence` |
| Profile — UBO | ✅ Built | `/profile/:id/ubo` |
| Profile — Risk Mitigation | ✅ Built | `/profile/:id/risk-mitigation` |
| Profile — Approval | ✅ Built | `/profile/:id/approval` |
| Profile — Screening & Monitoring | ✅ Built | `/profile/:id/screening-monitoring` |
| Profile — Properties | ✅ Built | `/profile/:id/properties` |
| Profile — Entity Verification | ✅ Built | `/profile/:id/entity-verification` |
| Profile — Audit | ✅ Built | `/profile/:id/audit` |
| Employees — list & table | ✅ Built | `/employees` |
| Risk Search — entity / person toggle | ✅ Built | `/risk-search` |
| Company Admin — Summary | ✅ Built | `/company-admin/summary` |
| Company Admin — Third Party Details (field slot editor) | ✅ Built | `/company-admin/third-party-details` |
| Company Admin — Roles list | ✅ Built | `/company-admin/roles` |
| Role Details — view & edit mode | ✅ Built | `/company-admin/roles/:index` |
| Settings — General (Currency & Approval Groups) | ✅ Built | `/settings/general/currency_approval_groups` |
| Settings — General (Renewals) | ✅ Built | `/settings/general/renewals` |
| Settings — Process (Stages) | ✅ Built | `/settings/process/stages` |
| Settings — other sidebar items | 🚧 Stub panels | `/settings/...` |
| Renewal Edit (split-panel editor) | ✅ Built | `/settings/renewals/:version/edit` |
| Reports | 🚧 Stub | `/reports` |
| Backend / real data persistence | ❌ Not built | — |
| Authentication / authorisation | ❌ Not built | — |
| Search & filtering (functional) | ❌ Not built | — |

---

## Mock Profiles

The prototype ships with **10 static profiles** covering all entity types, risk levels, and status combinations:

| Profile | Type | Status | Risk | Notable |
|---|---|---|---|---|
| Gazprom, PAO | Entity | Pending Approval | High | Primary reference profile; alert banners, delete modal |
| Pied Piper, Inc. | Entity | Pending Approval | High | Embedded in AddThirdParty post-create view |
| Los Pollos Hermanos LLC | Entity | Not Approved | High | Alert banners, delete modal |
| Waystar Royco, Inc. | Entity | Not Approved | High | Alert banners, delete modal |
| Initech Corporation | Entity | Approved* | Medium | Alert banners; status badge tooltip ("New red flag triggered on approved record. No risk level change"); interactive flow: risk mitigation → approval |
| Dunder Mifflin Paper Co. | Entity | Approved! (Renewal Required) | Medium | Delete modal; interactive renewal flow |
| Gringotts Wizarding Bank | Entity | Approved! (Renewal Required) | Medium | Status badge tooltip ("Risk Level increase on approved profile."); red/grey sidebar dots; owner: Claudio Merino |
| Ecomoda S.A. | Entity | Approved! (Renewal Required) | Medium | Delete modal; Colombia-based |
| Lumon Industries, Inc. | Entity | Approved | Low | Delete modal; interactive renewal flow |
| Bruce Wayne | Person | Pending Approval | Low | Person type; embedded in AddThirdParty |

---

## Key User Flows

### Flow 1 — Create a New Third Party
1. Navigate to **Third Parties** → click **Add New**
2. Select type: Entity / Person / Unknown
3. Enter name (+ country and DUNS for Entity)
4. Review duplicate check results and confirm
5. (Entity only) Select verified entity from D&B results
6. Set owner, business unit, process, policy, tags
7. Fill onboarding details (type-specific fields)
8. Submit — "Creating" overlay plays, then redirects to the new profile

### Flow 2 — Review a Third Party Profile
1. Click any row in the Third Parties table
2. Browse tabs: Overview → Additional Details → Connections
3. View Risk Level cards → click any card to open Risk Report
4. Review accordion breakdown by category
5. Optionally amend risk level via the Amend panel

### Flow 3 — Status Management
1. Click the current status badge in the profile header
2. Status panel slides in from the right showing current status
3. For Approved* / Approved! states, a Renewal button and renewal date are shown
4. Click **Decline** to open the Decline panel — fill reason, optionally attach documents, save
5. Status updates to **Declined**; tooltip is cleared

### Flow 4 — Interactive Profiles (Initech)
1. Open `/#/profile/initech` — status is **Approved***, tooltip explains the red flag
2. Navigate to Risk Mitigation and complete the mitigation step
3. Return to profile — Risk Mitigation dot turns green, Approval dot turns amber
4. Navigate to Approval and complete
5. Status changes to **Approved**, tooltip disappears, all sidebar dots turn green

### Flow 5 — Renewal Flow (Dunder Mifflin / Lumon)
1. Open profile — status is **Approved! (Renewal Required)**
2. Complete the renewal process
3. Status changes to **Approved**, renewal date advances by one year

### Flow 6 — Manage Field Definitions (Admin)
1. Navigate to **Company Admin → Third Party Details**
2. Select entity type tab: Entity / Individual / Unknown
3. Click **Edit** to rearrange slot assignments via dropdowns
4. Save changes — success banner confirms

### Flow 7 — Manage Roles (Admin)
1. Navigate to **Company Admin → Roles**
2. Click a role row to open Role Details
3. Review Third Parties accordion (permissions per section) and other tabs
4. Click **Edit** to modify permissions — column-header toggle-all available
5. Save or Cancel

---

## Design System Notes

- **Background colour:** `#F4F4F4` (CSS variable `--neutral-25`) — applied globally to body, table headers, and sidebar backgrounds
- **Table header sort icons:** `arrow_drop_down` at 12px, `position: absolute; right: 8px` within `position: relative` `<th>` — consistent across all tables site-wide
- **Status badge tooltips:** dark pill tooltip (`--text-normal` background) appears above the badge on hover; implemented via `.badgeTipWrap` / `.badgeTip` CSS classes in `profile.module.css`
- **Tab pattern:** all tab bars use Framer Motion `layoutId` animated underline indicator — no `::after` CSS pseudo-elements
- **Animations:** `motion` library (v12, Framer Motion fork); transition presets in `src/utils/motion.js`

---

## Known Limitations

- **All data is static** — no backend, no database, no persistence between sessions
- **No authentication** — anyone with the URL has full access
- **Form submissions are simulated** — the "Creating" overlay is a timed animation; no record is actually saved
- **Search and filters are decorative** — inputs render but do not filter data (except Dashboard chip filters)
- **Settings sidebar items** — only Currency & Approval Groups, Renewals (General) and Stages (Process) have built content panels; the rest are layout stubs
- **No tests** — the project has no test suite
