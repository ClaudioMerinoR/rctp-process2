# Figma Screen Inventory

This document lists every screen, state, and overlay that should be captured as a Figma frame to serve as the source of truth for the UI.

**Live prototype:** [https://claudiomerinor.github.io/rctp-process2/](https://claudiomerinor.github.io/rctp-process2/)

---

## Profile Reference Guide

| Profile | Entity Type | Status | Risk | Notable Features |
|---|---|---|---|---|
| Gazprom | Entity | Pending Approval | High | Alert banners, delete modal, full red strips |
| Pied Piper | Entity | Pending Approval | High | Embedded (used inside AddThirdParty) |
| Initech | Entity | Approved* | Medium | Alert banners, delete modal, Approved* tooltip ("New red flag…"), interactive flow (risk mitigation → approval) |
| Dunder Mifflin | Entity | Approved! (Renewal Required) | Medium | Delete modal, interactive renewal flow |
| Gringotts | Entity | Approved! (Renewal Required) | Medium | Status tooltip ("Risk Level increase…"), red/grey sidebar dots (renewal flow state), owner: Claudio Merino |
| Ecomoda | Entity | Approved! (Renewal Required) | Medium | Delete modal, Colombia-based |
| Lumon | Entity | Approved | Low | Delete modal, interactive renewal flow |
| Los Pollos Hermanos | Entity | Not Approved | High | Alert banners, delete modal |
| Waystar Royco | Entity | Not Approved | High | Alert banners, delete modal |
| Bruce Wayne | Person | Pending Approval | Low | Person type, embedded in AddThirdParty |

---

## Flow 1 — Dashboard

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 1 | Dashboard — Actions tab (Due Now) | `/#/` — Actions tab, Due Now chip | Default view; task table with due-date sorted column, overdue age badges |
| 2 | Dashboard — Actions tab (Upcoming) | Actions tab, Upcoming chip | Upcoming actions table |
| 3 | Dashboard — Screening & Monitoring tab | `/#/` — S&M tab | Screening table with match result chips |
| 4 | Dashboard — Screening & Monitoring Tasks tab | `/#/` — SMT tab | Task table for S&M tasks |
| 5 | Dashboard — Enhanced Due Diligence Reports tab | `/#/` — EDD tab | EDD reports table |

---

## Flow 2 — Third Parties List

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 6 | Third Parties — default | `/#/third-parties` | Table with 10 records, toolbar, pagination; tags rendered as chips |
| 7 | Third Parties — search active | `/#/third-parties` with text in search | Search term in input field, filtered results |

---

## Flow 3 — Create Third Party Wizard

| # | Screen | State | Notes |
|---|---|---|---|
| 8 | Step 1 — Type selection (empty) | No type selected | Three type cards at rest |
| 9 | Step 1 — Entity selected + name filled | Entity card active | Country + DUNS fields visible below name |
| 10 | Step 1 — Person selected | Person card active | Name-only input |
| 11 | Step 1 — Unknown selected | Unknown card active | |
| 12 | Step 2 — Duplicate check (results found) | Entity type, after Continue | Results table with mock records |
| 13 | Step 2 — No duplicates (empty state) | Person type | Empty state message |
| 14 | Step 3 — Entity verification | Entity type with country/DUNS | D&B results table, select row enabled |
| 15 | Step 3 — Row selected | One result row highlighted | "Use This Entity" button active |
| 16 | Step 4 — Summary section | All prior steps complete | Owner, Business Unit, Process, Policy, Tags fields |
| 17 | Step 5 — Onboarding Details (Entity) | Entity type | Full entity field set |
| 18 | Step 5 — Onboarding Details (Person) | Person type | Person-specific fields (Year of Birth, Gender, etc.) |
| 19 | Step 5 — Onboarding Details (Unknown) | Unknown type | Unknown-specific fields |
| 20 | Creating overlay | After submit | Animated progress state (capture mid-animation) |
| 21 | Cancel confirmation modal | Cancel button clicked | "Are you sure?" modal over the form |

---

## Flow 4 — Third Party Profile (Overview)

Use **Gazprom** as the primary reference unless noted.

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 22 | Profile — Overview (Entity, High risk) | `/#/profile/gazprom` | Red top strip, full overview fields, risk cards, tasks, screening |
| 23 | Profile — Overview (Entity, Medium risk — Approved*) | `/#/profile/initech` | Amber strip; Approved* status badge with tooltip on hover |
| 24 | Profile — Overview (Entity, Medium risk — Renewal) | `/#/profile/dundermifflin` | Amber strip; Approved! (Renewal Required) status |
| 25 | Profile — Overview (Entity, Medium risk — Gringotts) | `/#/profile/gringotts` | Amber strip; status tooltip ("Risk Level increase…"); red/grey sidebar dots; owner: Claudio Merino |
| 26 | Profile — Overview (Entity, Low risk) | `/#/profile/lumon` | Green strip, approved status |
| 27 | Profile — Overview (Person) | `/#/profile/brucewayne` | Person field labels, person type badge |
| 28 | Profile — Additional Details tab | `/#/profile/gazprom` → Additional Details | Entity additional fields grid |
| 29 | Profile — Connections tab | `/#/profile/gazprom` → Connections | Connected TPs table + suggested connections |
| 30 | Profile — Alert banners | `/#/profile/gazprom` | Top alert strip (Gazprom, Initech, Los Pollos, Waystar) |
| 31 | Profile — Delete modal | Delete action | "Delete a Third Party" confirmation modal (Gazprom, Initech, Ecomoda, Lumon, Los Pollos, Waystar) |
| 32 | Profile — Loading / skeleton state | profileLoading = true | Spinner in risk section, Unknown badge |

---

## Flow 5 — Status Badge & Panels

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 33 | Status badge tooltip — Approved* | `/#/profile/initech` — hover over status badge | Tooltip: "New red flag triggered on approved record. No risk level change" |
| 34 | Status badge tooltip — Gringotts | `/#/profile/gringotts` — hover over status badge | Tooltip: "Risk Level increase on approved profile." |
| 35 | Status panel open | Any profile — click status badge | Right side panel with current status chip, Decline button; renewal date + Renewal button shown for Approved* / Approved! states |
| 36 | Decline panel open | Status panel → Decline button | Decline panel layered on top; Decline Reason textarea, warning, Support Documents |
| 37 | Decline panel — Save enabled | Decline reason filled | Save button active |
| 38 | Profile status changed to Declined | After saving decline | Status badge updates to Declined; tooltip no longer shown |

---

## Flow 6 — Initech Interactive Flow

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 39 | Initech — initial state | `/#/profile/initech` | Approved*, medium risk, red flags alert banner, Approved* tooltip visible |
| 40 | Initech — post risk mitigation | Risk Mitigation step completed | Risk Mitigation dot turns green, Approval dot turns amber |
| 41 | Initech — post approval | Approval step completed | Status changes to Approved, tooltip hidden, all dots green |

---

## Flow 7 — Dunder Mifflin / Lumon Renewal Flow

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 42 | Renewal triggered | `/#/profile/dundermifflin` or `/#/profile/lumon` — initial state | Approved! (Renewal Required) status |
| 43 | Post-renewal approval | After renewal flow completes | Status → Approved, renewal date updated to next year |

---

## Flow 8 — Profile Sub-pages

Use **Gazprom** as the primary reference unless noted.

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 44 | Documents — list view | `/#/profile/gazprom/documents` | Document table; Name column has `arrow_drop_down` sort icon right-aligned |
| 45 | Documents — drag-over state | File dragged over upload zone | Upload area highlighted |
| 46 | Risk Report — Breakdown tab (High risk) | `/#/profile/gazprom/risk-report` | Red strip, accordions expanded, scores, screening + red flags |
| 47 | Risk Report — Breakdown tab (Low risk) | `/#/profile/lumon/risk-report` | Green strip, "No risks were found" empty states |
| 48 | Risk Report — Accordion collapsed | One or more accordions collapsed | Toggle to show collapsed state |
| 49 | Risk Report — Process Summary tab | Click "Process Summary" tab | Table of process steps with status pills |
| 50 | Risk Report — Amend Risk Level panel | "Amend" button clicked | Level selector, reason textarea, file upload |
| 51 | Risk Report — Success banner | After saving amend | Green banner confirmation |
| 52 | Profile Edit | `/#/profile/gazprom/edit` | All fields populated, Save/Cancel buttons |
| 53 | Risk Assessment | `/#/profile/gazprom/risk-assessment` | |
| 54 | Due Diligence | `/#/profile/gazprom/due-diligence` | |
| 55 | Integrity Check | `/#/profile/gazprom/integrity-check` | Xapiens partner badge in sidebar |
| 56 | Enhanced Due Diligence | `/#/profile/gazprom/enhanced-due-diligence` | |
| 57 | UBO | `/#/profile/gazprom/ubo` | D&B partner badge in sidebar |
| 58 | Risk Mitigation | `/#/profile/gazprom/risk-mitigation` | Open / mitigated / cancelled risks |
| 59 | Approval | `/#/profile/gazprom/approval` | |
| 60 | Screening & Monitoring | `/#/profile/gazprom/screening-monitoring` | |
| 61 | Properties | `/#/profile/gazprom/properties` | Field table with sort icons right-aligned |
| 62 | Entity Verification | `/#/profile/gazprom/entity-verification` | |
| 63 | Audit | `/#/profile/gazprom/audit` | |

---

## Flow 9 — Risk Search

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 64 | Risk Search — Entity mode | `/#/risk-search` — Entity toggle | Search input + country select; results table |
| 65 | Risk Search — Person mode | Person toggle active | Person-specific search fields |
| 66 | Risk Search — results | After search | Results table populated |

---

## Flow 10 — Employees

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 67 | Employees — default | `/#/employees` | Table with search, status badges; sort icons right-aligned at 8px from border |

---

## Flow 11 — Company Admin

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 68 | Company Admin — Summary | `/#/company-admin/summary` | Company name, address, view mode |
| 69 | Company Admin — Summary edit | Edit button | Fields become editable inputs |
| 70 | Company Admin — Third Party Details, Entity tab | `/#/company-admin/third-party-details` | Slot grids for Overview + Additional Details |
| 71 | Company Admin — Third Party Details, edit mode | Edit button | Slots become dropdowns |
| 72 | Company Admin — Individual/Person tab | Person tab | Person-prefixed field labels |
| 73 | Company Admin — Unknown tab | Unknown tab | Unknown-prefixed field labels |
| 74 | Company Admin — Roles list | `/#/company-admin/roles` | Roles table with ⋮ dropdown |
| 75 | Role Details — view mode | `/#/company-admin/roles/0` | Header card, tab bar, Third parties accordion |
| 76 | Role Details — edit mode | Edit button | Checkboxes interactive, column-header toggle-all |
| 77 | Role Details — Other tabs | Documents / Reports tab | Flat Name / View / Export table |

---

## Flow 12 — Settings

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 78 | Settings — Currency & Approval Groups | `/#/settings/general/currency_approval_groups` | Default General tab; currency select, language, approval group dropdowns |
| 79 | Settings — Renewals | `/#/settings/general/renewals` | Toggle, reminder settings, version history table |
| 80 | Settings — Stages | `/#/settings/process/stages` | Default Process tab; stages table with Enabled/Low/Medium/High/Renewal columns |
| 81 | Settings — other General items | Other sidebar items | Duplication, Risk Scoring Settings, Red Flags, Mitigation Measures, Approvals, Notifications, Lists, Private Lists, Screening & Monitoring |
| 82 | Settings — other Process items | Other sidebar items | Pre-Onboarding Entity Verification, Enhanced Due Diligence Reports, Integrity Check Report Review, Reminders |
| 83 | Renewal Edit | `/#/settings/renewals/47/edit` | Split-panel editor; draggable divider, column picker, drag-to-reorder rows |

---

## Shared Components & States

| # | Component | Notes |
|---|---|---|
| 84 | Header | Full-width top bar with Dow Jones branding, icons |
| 85 | Main navigation | Horizontal nav with all links, active state shown |
| 86 | Breadcrumb — 2 levels | e.g. Third Parties > Gazprom |
| 87 | Breadcrumb — 3 levels | e.g. Third Parties > Gazprom > Risk Level Report |
| 88 | Risk badge — High | Red badge with warning icon |
| 89 | Risk badge — Medium | Amber badge with error_outline icon |
| 90 | Risk badge — Low | Green badge with check icon |
| 91 | Status current badge — all variants | Pending Approval / Approved / Not Approved / Declined / Approved* / Approved! (Renewal Required) |
| 92 | Status badge tooltip | Hover over Initech or Gringotts status badge; dark tooltip above with caret |
| 93 | Status pills — all variants | Completed, In Progress, Not Started, Not Required, Action Required, Mitigated, Open, Post Approval, Incomplete |
| 94 | Table header sort icons | `arrow_drop_down` (12px), right-aligned at 8px from border via `position: absolute` — shown across all tables |
| 95 | Sidebar — all dot states | grey / green / red / amber; partner badge (D&B, Xapiens); NEW tag |
| 96 | Sidebar — Gringotts dot state | Red dots on 6 steps, grey on Integrity Check — reference for renewal-triggered reset |
| 97 | Profile top strip — High risk | Red gradient strip |
| 98 | Profile top strip — Medium risk | Amber gradient strip |
| 99 | Profile top strip — Low risk | Green gradient strip |
| 100 | Tags chip list | Comma-separated tags rendered as individual chips (Third Parties table) |
| 101 | Modal — Delete Third Party | "Delete a Third Party" confirmation with Cancel / Continue |
| 102 | Modal — Renewal | Renewal confirmation modal |
| 103 | Notes side panel | Right slide-in panel for profile notes |
| 104 | Active/Inactive toggle | Green/red sliding toggle (AddThirdParty, Settings Renewals, RenewalEdit per-row) |
| 105 | Checkbox — all states | Default / checked / indeterminate / disabled / error; default + small sizes |

---

## Capture Tips

- Use a **1440px viewport** — this is the primary breakpoint where the 4-column risk card grid shows correctly
- Capture at **1x** for Figma frames (not retina — keep pixel values matching CSS)
- Background color is `#F4F4F4` (`--neutral-25`) — verify Figma canvas matches
- For overlays (modals, side panels), capture with the **underlying page still visible** behind the overlay
- The "Creating" overlay (#20) is animated — pause at a mid-state or capture the text frame
- Sidebar dots: Gazprom = mixed red/grey/green; Gringotts = red/grey; Initech (post-flow) = all green
- Sort icons: all `thead th` use `arrow_drop_down` at 12px, absolutely positioned right at 8px from border
- Tooltip: hover Initech or Gringotts status badge to reveal — dark pill above the badge with caret arrow
