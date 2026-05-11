# Pages & Routes

---

## `/` — Dashboard

**Component:** `src/pages/Dashboard.jsx`

The home page. Shows task and screening data across four tabs.

**Tabs:**
- **Actions** — task table with Due Now / Upcoming chip sub-filters; columns: Task Type, Task Name, Third Party Name, Task Status, Current Risk Level, Owner, Due Date / Date Created + Age
- **Screening & Monitoring** — screening results table with match counts, categories, and remediation status
- **Screening & Monitoring Tasks** — task table specific to S&M tasks
- **Enhanced Due Diligence Reports** — EDD reports table

All tab bars use the Framer Motion `layoutId` animated underline indicator pattern.

---

## `/third-parties` — Third Parties List

**Component:** `src/pages/ThirdParties.jsx`

Shows all third-party records in a table.

**Features:**
- Table with columns: Name, Owner Name, Business Unit, Tags, Approval Stage, Risk Level, Internal Ref, Current Status
- Tags rendered as individual chips (split on comma)
- Toolbar: quick search input, Standard View button, filter, bulk import, export, save, Add New
- Clicking a row name navigates to `/profile/:id`
- Pagination bar with page size selector and result count
- 10 mock records

**Notes:**
- Search input is decorative (no filtering logic)
- Table header sort icons: `arrow_drop_down` at 12px, right-aligned at 8px from border via `position: absolute`

---

## `/add-third-party` — Create Third Party Wizard

**Component:** `src/pages/AddThirdParty.jsx`

A multi-step wizard for creating a new third-party record. Sections appear sequentially as the user progresses.

### Step 1 — Type & Name
- Three type cards: **Entity / Organisation**, **Individual / Person**, **Unknown**
- Name text input (required); synced into `legalName` in all onboarding state objects
- Entity-only: Country / Territory select + DUNS Number input (pre-populate entity verification)
- Continue button triggers validation; errors highlight required fields

### Step 2 — Duplicate Check
- Shown after clicking Continue in Step 1
- Table of potential duplicate records
- User must confirm "no duplicate" to proceed
- Skipped for Unknown type

### Step 3 — Entity Verification *(Entity type only)*
- Auto-opens when Country or DUNS was filled; manually triggerable otherwise
- Simulates a Dun & Bradstreet look-up
- User selects entity from results; pre-fills country and ID fields in onboarding section
- Can override if no match found — shows warning in onboarding section

### Step 4 — Summary
- Owner, Business Unit, Process selector, Policy (auto-set from process), Tags, Active/Inactive toggle
- **PROCESS_POLICIES mapping:**
  ```
  Standard RCTP          → Default Standard KYBP Policy
  Enhanced Due Diligence → Enhanced KYBP Policy
  Basic Screening        → Minimal Screening Policy
  ```

### Step 5 — Onboarding Details
Different form fields per type:

| Field | Entity | Person | Unknown |
|---|---|---|---|
| Legal Name | ✅ | ✅ | ✅ |
| Industry Sector | ✅ | ✅ | ✅ |
| Country | Registered Country | Country of Residence | Country |
| Contact Email | ✅ | ✅ | ✅ |
| Legal Structure | ✅ | ✅ | ✅ |
| Commercial Significance | ✅ | ✅ | ✅ |
| Renewal Date | ✅ | ✅ | ✅ |
| Other Known Name | ✅ | ✅ | ✅ |
| Address | Registered Address | Business Address | Registered Address |
| ID Type / Value | Entity ID | Person ID | Unknown ID |
| Website | Entity Website | — | — |
| Company Number | ✅ | — | — |
| Year of Birth | — | ✅ | — |
| Gender | — | ✅ | — |
| Third Party Type | — | — | ✅ |

### Cancel & Creating states
- Cancel button shows a confirmation modal
- Submit triggers a simulated "Creating…" overlay with animated progress
- On completion, redirects to the new profile (currently Pied Piper as the post-create example)

---

## `/profile/:profileId` — Third Party Profile

**Component:** `src/components/profile/ProfilePage.jsx`

The main profile view. `profileId` must match a key in `src/data/profiles/index.js`.

### Top strip
- Profile name + verification badge
- **Current status badge** — colour-coded, clickable; opens Status Panel on click
  - Optional hover tooltip for profiles with `currentStatus.tooltip` set (Initech: "New red flag…"; Gringotts: "Risk Level increase…")
- **Risk level badge** — links to Risk Report; animated loading state
- Colour-coded gradient strip behind the header (red / amber / green by risk level)

### Left sidebar
- Process steps with coloured dot indicators (green / amber / red / grey / blocked)
- Partner badges: Xapiens (Integrity Check), D&B (UBO)
- Section links: Properties, Documents, Entity Verification, Audit

### Detail card — tabs
- **Overview:** 4-column grid of key fields following entity-type label convention
- **Additional Details:** additional fields grid
- **Connections:** Connected Third Parties + Suggested Connections tables; Look More panel; Connect button

### Risk Level Report section
- Row of risk cards (Country, Bribery & Corruption, Environmental, Human Rights, General, Screening & Monitoring, Cyber)
- Each card links to the corresponding accordion in `/risk-report`

### Open Tasks section
- Table: Task Type (with icon), Task Name, Task Status, Owner, Date Created, Age

### Screening & Monitoring Associations
- Screening results table with match result count squares and status label

### Status Panel (slide-in from right)
- Shown on status badge click
- Current status chip (read-only)
- Renewal date + Renewal button only for `Approved*` / `Approved! (Renewal Required)` statuses
- Decline button at the bottom

### Decline Panel (layered over Status Panel)
- Decline Reason textarea (required)
- Warning: "Once declined Third Party can't be reinstated."
- Support Documents file upload
- Save sets `currentStatus` to `Declined` and closes both panels

### Delete Modal
- Shown when `profile.deleteModal = true`
- "Delete a Third Party" confirmation with Cancel / Continue

### Notes Panel
- Right slide-in panel for viewing/adding notes

---

## `/profile/:profileId/documents` — Documents

**Component:** `src/components/profile/ProfileDocuments.jsx`

- Document list table: Name (with `arrow_drop_down` sort icon), Type, Size, Section, Date, Owner
- Drag-and-drop upload zone
- Pagination controls
- Reuses `Sidebar` component

---

## `/profile/:profileId/risk-report` — Risk Level Report

**Component:** `src/components/profile/ProfileRiskReport.jsx` (lazy)

### Breakdown tab (default)
- Header card: Current Status, Risk Level, Current Risk Score; Print and Amend buttons
- Accordion per risk category (Country, Bribery & Corruption, Environmental, Human Rights, General, Screening & Monitoring, Cyber)
- Screening Results table + Red Flags table

### Process Summary tab
- Table of process steps with status pills and completion metadata

### Amend Risk Level panel
- Slide-in from right; select new level, reason textarea, file upload
- Save triggers success banner

---

## `/profile/:profileId/edit` — Edit Profile

**Component:** `src/components/profile/ProfileEdit.jsx` (lazy)

Edit form: Legal Name, Third Party Owner, Business Unit, Tags, Process (→ auto-updates Policy), Renewal Date. Save / Cancel at top.

---

## `/profile/:profileId/risk-mitigation` — Risk Mitigation

**Component:** `src/components/profile/ProfileRiskMitigation.jsx`

Three risk sections: Open Risks, Mitigated Risks, Cancelled Risks. Each row shows ID, title, status, owner, date, and a context menu. Accordion expand/collapse per section.

---

## `/profile/:profileId/risk-assessment` — Risk Assessment

**Component:** `src/components/profile/ProfileRiskAssessment.jsx`

---

## `/profile/:profileId/due-diligence` — Due Diligence

**Component:** `src/components/profile/ProfileDueDiligence.jsx`

---

## `/profile/:profileId/integrity-check` — Integrity Check

**Component:** `src/components/profile/ProfileIntegrityCheck.jsx`

---

## `/profile/:profileId/enhanced-due-diligence` — Enhanced Due Diligence

**Component:** `src/components/profile/ProfileEnhancedDueDiligence.jsx`

---

## `/profile/:profileId/ubo` — UBO

**Component:** `src/components/profile/ProfileUBO.jsx`

---

## `/profile/:profileId/approval` — Approval

**Component:** `src/components/profile/ProfileApproval.jsx`

Approval record with start/completion/cancellation dates and renewal date.

---

## `/profile/:profileId/screening-monitoring` — Screening & Monitoring

**Component:** `src/components/profile/ProfileScreeningMonitoring.jsx`

Screening results table with Name, Type, Match Results, Assoc Status columns.

---

## `/profile/:profileId/properties` — Properties

**Component:** `src/components/profile/ProfileProperties.jsx`

Field table: Field Name, Value, Key Risk, Red Flag, Score, Property Tag, Risk Category. Each column header has a right-aligned `arrow_drop_down` sort icon.

---

## `/profile/:profileId/entity-verification` — Entity Verification

**Component:** `src/components/profile/ProfileEntityVerification.jsx`

---

## `/profile/:profileId/audit` — Audit

**Component:** `src/components/profile/ProfileAudit.jsx`

Audit log table: Date, Added By, Source, Summary.

---

## `/employees` — Employees

**Component:** `src/pages/Employees.jsx`

Employee list table with search, status badges, and Standard view toggle.

**Columns:** Name, Tags, Ref, Business Unit, Third Party Restricted, Active, Status

---

## `/risk-search` — Risk Search

**Component:** `src/pages/RiskSearch.jsx`

Entity/person risk search with type toggle, search input, country select, and results table.

---

## `/company-admin` — Company Admin

**Component:** `src/pages/CompanyAdmin.jsx` (lazy)

URL-driven nav (active panel derived from `pathname`, not `useState`). Three panels:

### Summary (`/company-admin/summary`)
Company name, address, telephone, website; view / edit modes.

### Third Party Details (`/company-admin/third-party-details`)
Field slot editor with three entity type tabs (Entity / Individual / Unknown), Overview section (12 slots) and Additional Details section (16 slots). Each slot is a searchable dropdown from `ALL_FIELDS` (~300 entries). Edit / Save / Cancel flow.

### Roles (`/company-admin/roles`)
Roles table with per-row ⋮ dropdown. "View/Edit Details" navigates to `/company-admin/roles/:index`.

---

## `/company-admin/roles/:roleIndex` — Role Details

**Component:** `src/pages/RoleDetails.jsx` (lazy)

- Header card: role name, description, business unit checkboxes; view / edit / cancel modes
- **Tab bar:** Framer Motion `layoutId="role-tab-indicator"` animated underline
- **Third parties tab:** two-level accordion (Standard RCTP group → sections). `null` perms = N/A cell. Edit mode: interactive checkboxes with column-header toggle-all
- **Other tabs:** flat Name / View / Export table

---

## `/settings` — Settings

**Component:** `src/pages/Settings.jsx`

Two-level nav:
- **Top tabs:** General / Process (Framer Motion animated underline)
- **Left sidebar:** active item highlighted with `--primary-500` background

### General tab panels
| Section | Status |
|---|---|
| Currency & Approval Groups | ✅ Built — currency select, language, 3 approval group dropdowns |
| Renewals | ✅ Built — toggle, reminder settings, version history table with edit link |
| All other items | 🚧 Layout stub |

### Process tab panels
| Section | Status |
|---|---|
| Stages | ✅ Built — table with Enabled/Low/Medium/High Risk/Renewal columns, expandable Due Diligence row, Approval Auto Start badge toggle |
| All other items | 🚧 Layout stub |

---

## `/settings/renewals/:version/edit` — Renewal Edit

**Component:** `src/pages/RenewalEdit.jsx`

Split-panel editor:
- **Left panel (Rules):** drag-to-reorder rows, Active/Inactive toggle per row
- **Right panel (Details):** dynamic columns with per-column context menus (add/delete/move)
- Draggable divider (50–80% split), column picker side panel
- `rows` is the single source of truth for both panels

---

## `/reports` — Reports

**Component:** `src/pages/Placeholder.jsx`

Stub page — "under construction" message.
