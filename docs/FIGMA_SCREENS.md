# Figma Screen Inventory

This document lists every screen, state, and overlay that should be captured as a Figma frame to serve as the source of truth for the UI.

**Live prototype:** [https://claudiomerinor.github.io/rctp-process2/](https://claudiomerinor.github.io/rctp-process2/)

Screens are grouped by flow. Use **Gazprom** as the primary reference for entity profiles (high-risk, most features visible). Use **Pied Piper** for low-risk and **Initech** for medium-risk variants. Use **Bruce Wayne** for the person type.

---

## Flow 1 — Third Parties List

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 1 | Third Parties — default | `/#/third-parties` | Table with 4 records, toolbar visible, pagination |
| 2 | Third Parties — search active | `/#/third-parties` with text in search | Search term in input field |

---

## Flow 2 — Create Third Party Wizard

| # | Screen | State | Notes |
|---|---|---|---|
| 3 | Step 1 — Type selection (empty) | No type selected | Three type cards at rest |
| 4 | Step 1 — Entity selected + name filled | Entity card active | Country + DUNS fields visible below name |
| 5 | Step 1 — Person selected | Person card active | Name-only input |
| 6 | Step 1 — Unknown selected | Unknown card active | |
| 8 | Step 2 — Duplicate check (results found) | Entity type, after Continue | Results table with mock records |
| 9 | Step 2 — No duplicates (empty state) | Person type | Empty state message |
| 10 | Step 3 — Entity verification | Entity type with country/DUNS | D&B results table, select row enabled |
| 11 | Step 3 — Row selected | One result row highlighted | "Use This Entity" button active |
| 12 | Step 4 — Summary section | All prior steps complete | Owner, Business Unit, Process, Policy, Tags fields | 
| 13 | Step 5 — Onboarding Details (Entity) | Entity type | Full entity field set |
| 14 | Step 5 — Onboarding Details (Person) | Person type | Person-specific fields (Year of Birth, Gender, etc.) |
| 15 | Step 5 — Onboarding Details (Unknown) | Unknown type | Unknown-specific fields (Third Party Type, etc.) |
| 16 | Creating overlay | After submit | Animated progress state (capture mid-animation) |
| 17 | Cancel confirmation modal | Cancel button clicked | "Are you sure?" modal over the form |

---

## Flow 3 — Third Party Profile

Use **Gazprom** (`/#/profile/gazprom`) as the primary reference unless noted.

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 18 | Profile — Overview tab (Entity, High risk) | `/#/profile/gazprom` | Red top strip, full overview fields, risk cards, tasks, screening |
| 19 | Profile — Overview tab (Entity, Low risk) | `/#/profile/piedpiper` | Green top strip, low-risk variant |
| 20 | Profile — Overview tab (Entity, Medium risk) | `/#/profile/initech` | Amber top strip, medium-risk variant |
| 21 | Profile — Overview tab (Person) | `/#/profile/brucewayne` | Person field labels, "Individual / Person" in legal structure |
| 22 | Profile — Additional Details tab | `/#/profile/gazprom` → Additional Details | Entity additional fields grid |
| 23 | Profile — Connections tab | `/#/profile/gazprom` → Connections | Connected TPs table + suggested connections |
| 24 | Profile — Alert banners visible | `/#/profile/gazprom` | Top alert strip shown (Gazprom/Initech only) |
| 25 | Profile — Notes side panel open | Notes button clicked | Right side panel overlay |
| 26 | Profile — Delete confirmation modal | Delete action triggered | Modal overlay (Gazprom/Initech only) |
| 27 | Profile — Loading/skeleton state | Simulate loading | Spinner in risk section (profileLoading = true state) |

---

## Flow 4 — Profile Documents

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 28 | Documents — list view | `/#/profile/gazprom/documents` | Document table, upload zone at bottom |
| 29 | Documents — drag-over state | File dragged over upload zone | Upload area highlighted/active state |

---

## Flow 5 — Risk Level Report

Use **Gazprom** for the high-risk variant and **Pied Piper** for the low-risk (empty) variant.

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 30 | Risk Report — Breakdown tab (High risk) | `/#/profile/gazprom/risk-report` | Red top strip, accordions expanded, scores visible, screening + red flags sections |
| 31 | Risk Report — Breakdown tab (Low risk) | `/#/profile/piedpiper/risk-report` | Green top strip, all categories show "No risks were found" |
| 32 | Risk Report — Accordion collapsed state | One or more accordions collapsed | Toggle accordion to show collapsed state |
| 33 | Risk Report — Process Summary tab | Click "Process Summary" tab | Table of process steps with status pills |
| 34 | Risk Report — Amend Risk Level panel | "Amend" button clicked | Amend form with level selector, reason textarea, file upload |
| 35 | Risk Report — Success banner | After saving amend | "Risk Level amended successfully" green banner |

---

## Flow 6 — Profile Edit

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 36 | Edit — default state | `/#/profile/gazprom/edit` | All fields populated, Save/Cancel buttons at top |

---

## Flow 7 — Company Admin

| # | Screen | URL / State | Notes |
|---|---|---|---|
| 37 | Company Admin — Entity tab, view mode | `/#/company-admin` (Entity tab) | Slot grids for Overview + Additional Details |
| 38 | Company Admin — Entity tab, edit mode | Edit button clicked | Slots become dropdowns |
| 39 | Company Admin — Individual/Person tab | Person tab selected | Person-prefixed field labels |
| 40 | Company Admin — Unknown tab | Unknown tab selected | Unknown-prefixed field labels |

---

## Shared Components & States

Capture these separately for the component library / design system documentation:

| # | Component | Notes |
|---|---|---|
| 41 | Header | Full-width top bar with Dow Jones branding, icons |
| 42 | Main navigation | Horizontal nav with 7 links, active state shown |
| 43 | Breadcrumb — 2 levels | e.g. Third Parties > Gazprom |
| 44 | Breadcrumb — 3 levels | e.g. Third Parties > Gazprom > Risk Level Report |
| 45 | Risk badge — High | Red badge with warning icon |
| 46 | Risk badge — Medium | Amber badge |
| 47 | Risk badge — Low | Green badge with check icon |
| 48 | Status pills — all variants | Completed, In Progress, Not Started, Not Required, Action Required, Mitigated, Open, Post Approval, Incomplete |
| 49 | Sidebar — all dot states | One step per colour: grey / green / red / amber; partner badge (D&B, Xapiens); NEW tag |
| 50 | Profile top strip — High risk | Red gradient strip |
| 51 | Profile top strip — Medium risk | Amber gradient strip |
| 52 | Profile top strip — Low risk | Green gradient strip |

---

## Capture Tips

- Use a **1440px viewport** — this is the primary breakpoint where the 4-column risk card grid shows correctly
- Capture at **1x** for Figma frames (not retina — keep pixel values matching CSS)
- For overlays (modals, side panels), capture with the **underlying page still visible** behind the overlay
- The "Creating" overlay (#16) is animated — pause at a mid-state or capture the text frame
- Sidebar steps: open Gazprom profile for red/amber/green/grey examples + partner badges
