# Pages & Routes

---

## `/third-parties` — Third Parties List

**Component:** `src/pages/ThirdParties.jsx`

The landing page. Shows all third-party records in a table.

**Features:**
- Table with 8 columns: Name, Owner, Business Unit, Tags, Approval Stage, Risk Level, Internal Reference, Current Status
- Toolbar: quick search input, view toggle, filter button, bulk import, export, save
- Clicking a row name navigates to `/profile/:id`
- Pagination bar with page size selector and result count
- 4 mock records: Gazprom, Pied Piper Inc, Initech, Bruce Wayne Batman

**Notes:**
- Search input is decorative (no filtering logic)
- "Add New" button links to `/add-third-party`

---

## `/add-third-party` — Create Third Party Wizard

**Component:** `src/pages/AddThirdParty.jsx` (~1 343 lines)

A multi-step wizard for creating a new third-party record. Sections appear sequentially as the user progresses.

### Step 1 — Type & Name
- Three type cards: **Entity / Organisation**, **Individual / Person**, **Unknown**
- Name text input (required)
- Entity-only: Country / Territory select + DUNS Number input
- Continue button triggers validation; errors highlight required fields

### Step 2 — Duplicate Check
- Shown after clicking Continue in Step 1
- Displays a table of potential duplicate records
- User must confirm "no duplicate" to proceed
- Skipped for Unknown type
- Table columns: Name, Country, ID Type, ID Value, Owner, Status

### Step 3 — Entity Verification *(Entity type only)*
- Shown automatically if country or DUNS was entered, or manually triggered
- Simulates a Dun & Bradstreet look-up
- User selects the correct entity from results table
- Can override if no match found
- Pre-fills country and ID fields in the onboarding section

### Step 4 — Summary
- Owner (text input with approval group option)
- Business Unit dropdown
- Process selector: Standard RCTP / Enhanced Due Diligence / Basic Screening
- Policy: auto-populated from process selection (see `PROCESS_POLICIES` mapping below)
- Tags multi-select

**PROCESS_POLICIES mapping:**
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
| Expiry Date | ✅ | ✅ | ✅ |
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
- On completion, would redirect to the new profile (currently loops)

---

## `/profile/:profileId` — Third Party Profile

**Component:** `src/components/profile/ProfilePage.jsx` (~1 094 lines)

The main profile view. `profileId` must be one of: `gazprom`, `piedpiper`, `initech`, `brucewayne`.

### Top strip
- Profile name + verification badge
- Current status badge (e.g. "Pending Approval")
- Risk level badge (High / Medium / Low) — colour-coded strip

### Left sidebar
- **Process steps** — vertical list with coloured dot indicators:
  - 🔴 Red = action required / failed
  - 🟢 Green = complete
  - 🟡 Amber = in progress
  - ⚪ Grey = not started
  - Partner badges (Xapiens for Integrity Check, D&B for UBO)
- **Section links** — Properties, Documents, Entity Verification, Audit

### Detail card — tabs
- **Overview:** 4-column grid of key fields (label/value pairs). Labels follow entity-type naming convention (e.g. "Entity Third Party Legal Name" vs "Person Third Party Legal Name")
- **Additional Details:** Additional fields grid
- **Connections:** Connected Third Parties table + Suggested Connections table; "Look More" panel; connect button

### Risk Level Report section
- Row of risk cards (Country, Bribery & Corruption, Environmental, Human Rights, General, Screening & Monitoring, Cyber)
- Each card links to the corresponding accordion in `/risk-report`
- Card colours: green (low), amber (medium), red (high)

### Open Tasks section
- Table: Task Type, Task Name, Status, Owner, Date Created, Age
- Task type icon + text

### Screening & Monitoring Associations
- Screening results table with match result counts (coloured squares)
- Status label per row

### Side panels (overlays)
- **Notes panel** — right-side panel for adding/viewing notes
- **Connect panel** — search and link related third parties

### Profile variants by `profileId`
| Profile | Type | Risk | Special features |
|---|---|---|---|
| `gazprom` | Entity | High | Alert banners, delete modal, many open tasks |
| `piedpiper` | Entity | Low | Embedded mode, minimal tasks |
| `initech` | Entity | Medium | Alert banners, delete modal |
| `brucewayne` | Person | Low | Embedded mode, person field labels |

---

## `/profile/:profileId/documents` — Documents

**Component:** `src/components/profile/ProfileDocuments.jsx`

- Document list table: Name, Type, Size, Section, Date, Owner
- Drag-and-drop upload zone
- Pagination controls
- Reuses the `Sidebar` component from ProfilePage

---

## `/profile/:profileId/risk-report` — Risk Level Report

**Component:** `src/components/profile/ProfileRiskReport.jsx`

### Breakdown tab (default)
- Header card: Current Status, Risk Level, Current Risk Score; Print and Amend buttons
- Accordion per risk category (Country, Bribery & Corruption, Environmental, Human Rights, General, Screening & Monitoring, Cyber)
  - Each accordion shows: level badge, Category Risk Score, factor count
  - Expanded: table of risk factors with property / value / score columns
  - Empty: "No risks were found in this category"
- Screening Results table (association names, match counts, risk level)
- Red Flags table (title, status, category)

### Process Summary tab
- Table of process steps with status pills and completion metadata

### Amend Risk Level panel
- Shown when clicking "Amend" button
- Current level displayed; select new level (Low / Medium / High)
- Reason textarea + file upload
- Save triggers success banner

### URL hash navigation
- Linking to `/risk-report#country` scrolls to the Country accordion
- Profile risk cards use this pattern for deep linking

---

## `/profile/:profileId/edit` — Edit Profile

**Component:** `src/components/profile/ProfileEdit.jsx`

Edit form for key profile fields:
- Legal Name, Third Party Owner, Business Unit
- Tags (multi-select)
- Process selector → auto-updates Policy
- Expiry Date

Save / Cancel buttons at top; Cancel returns to profile.

---

## `/company-admin` — Company Admin

**Component:** `src/pages/CompanyAdmin.jsx`

Allows administrators to configure which fields appear in each slot of the profile Overview and Additional Details tabs.

### Layout
- Left sidebar nav: list of admin sections (currently "Third Party Details" is active)
- Right content card with header, tabs, and slot grids

### Detail type tabs
- **Entity / Organisation** — entity-specific field labels
- **Individual / Person** — person-specific field labels
- **Unknown** — unknown-type field labels

### Overview section
12 configurable slot positions matching the profile Overview tab. Each slot can be set to any field from the `ALL_FIELDS` list (~300 fields).

### Additional Details section
16 configurable slot positions for the Additional Details tab.

### Edit mode
Click **Edit** to enter edit mode; each slot becomes a searchable dropdown. Click **Save** to commit or **Cancel** to revert.

---

## Placeholder pages

The following routes render a "under construction" message:

| Route | Title |
|---|---|
| `/employees` | Employees |
| `/risk-search` | Risk Search |
| `/settings` | Settings |
| `/reports` | Reports |
