# Data Model

All third-party data is static JavaScript objects in `src/data/profiles/`. There is no database or API.

---

## Profile Object Shape

```js
{
  // ── Identity ──────────────────────────────────────────
  id:           string,          // URL key e.g. 'gazprom' | 'initech' | 'brucewayne'
  name:         string,          // Full display name (all caps)
  shortName:    string,          // Used in breadcrumbs and headings
  entityType:   'entity' | 'person' | 'unknown',
  verifiedText: string,          // e.g. 'Entity Verified' | 'Identity Verified'

  // ── Status ────────────────────────────────────────────
  currentStatus: {
    label:    string,            // Must match a STATUS_CONFIG key in ProfilePage.jsx
                                 // e.g. 'Pending Approval' | 'Approved' | 'Approved*'
                                 //      'Not Approved' | 'Declined'
                                 //      'Approved! (Renewal Required)'
    tooltip?: string,            // Optional — shown as hover tooltip on the status badge
                                 // (no `icon` field — icon is derived at render from STATUS_CONFIG)
  },
  riskLevel: {
    label: 'Low' | 'Medium' | 'High',
    icon:  string,               // Material Icons name e.g. 'warning' | 'check_circle_outline' | 'error_outline'
    level: 'low' | 'medium' | 'high',
  },

  // ── Layout flags ──────────────────────────────────────
  embedded:     boolean,         // true = no back button or alert banners (used in AddThirdParty post-create view)
  deleteModal:  boolean,         // show delete confirmation button/modal
  alertBanners: boolean,         // show top alert strip

  // ── Sidebar ───────────────────────────────────────────
  sidebarSteps: [
    {
      label:    string,
      dot:      'grey' | 'green' | 'red' | 'amber' | 'blocked',
      path:     string,          // sub-route e.g. 'risk-assessment' — appended to /profile/:id/
      partner?: 'integrity' | 'ubo',  // shows partner logo badge
      tooltip?: string,               // tooltip text on the partner badge
      newTag?:  boolean,              // shows "NEW" tag next to the label
    }
  ],
  sidebarSections: [
    {
      label:    string,
      path?:    string,          // sub-route e.g. 'documents' | 'audit'
      partner?: 'integrity' | 'ubo',
      tooltip?: string,
    }
  ],

  // ── Tab fields ────────────────────────────────────────
  overviewFields: [              // Shown in Overview tab (4-column grid)
    {
      label:   string,           // Must match CompanyAdmin slot label convention (see below)
      value:   string,
      flag?:   string,           // Unicode flag emoji e.g. '🇬🇧'
      link?:   boolean,          // Renders as <a> tag
      href?:   string,           // URL for link fields
      overdue?: boolean,         // Renders renewal date in red when true
    }
  ],
  additionalFields: [            // Shown in Additional Details tab
    {
      label:  string,
      value:  string,
      link?:  boolean,
      href?:  string,
    }
  ],

  // ── Risk cards ────────────────────────────────────────
  riskCards: [
    {
      title:  string,            // Category name e.g. 'Country' | 'Bribery & Corruption'
      level:  'low' | 'medium' | 'high',
      flags:  number,
      score:  number,
    }
  ],

  // ── Open tasks ────────────────────────────────────────
  openTasks: [
    {
      type:        string,       // e.g. 'Renewal' | 'Approval Task' | 'Red Flag'
      icon:        string,       // Key into TASK_ICONS map in profileAssets.js
      name:        string,
      status:      string,       // e.g. 'Open' | 'In Progress' | 'Not Started' | 'Pending'
      owner:       string,
      dateCreated: string,       // Display string e.g. '13 Nov 2025'
      age:         string,       // Display string e.g. '37 Days'
    }
  ],

  // ── Screening ─────────────────────────────────────────
  screeningRows: [
    {
      name:         string,
      matches:      [{ bg: string, color: string, val: string }],  // coloured match count squares
      updated:      string,
      type:         string,
      statusDot:    string,      // CSS colour value e.g. 'var(--success-500)'
      statusLabel:  string,
      categories:   [{ type: string, icon: string }],
      categoryIcon: string,
      entityType:   string,
    }
  ],

  // ── Connections ───────────────────────────────────────
  connectedRows: [
    { name, connType, idType, idValue, intRef, country }
  ],
  suggestedRows: [
    { name, connType?, idType, idValue, intRef, country }
  ],
  suggestedHasConnType: boolean,  // whether connType column is shown in suggestedRows

  // ── Documents ─────────────────────────────────────────
  documents: [
    { name, type, size, section, date, owner }
  ],

  // ── Risk report ───────────────────────────────────────
  riskReport: {
    currentScore: number,
    accordionSections: [
      {
        id:         string,      // Must be one of: 'country' | 'bribery' | 'environmental'
                                 //   'human-rights' | 'general' | 'screening' | 'cyber'
        label:      string,
        level:      'low' | 'medium' | 'high',
        rows: [
          { property: string, value: string, score: number }
        ],
        totalScore: number,
      }
    ],
    matchResults:     [{ count, bg, color, label }],
    screeningResults: [{ name, type, level, redFlags, categories }],
    redFlags:         [{ title, isLink, status, cat }],
    processSummary: [
      {
        step:       string,
        isLink:     boolean,
        status:     string,      // e.g. 'Completed' | 'Not Required' | 'In Progress'
        startDate:  string,      // Display string or ''
        by:         string,      // Owner name or ''
        date:       string,      // Completion date or ''
      }
    ],
  },

  // ── Risk Mitigation ───────────────────────────────────
  riskMitigation: {
    openRisks:       [{ id, title, status, owner, date }],
    mitigatedRisks:  [{ id, title, status, owner, date }],
    cancelledRisks:  [{ id, title, status, owner, date }],
  },

  // ── Approval ──────────────────────────────────────────
  approval: {
    startDate:      string,
    completedDate:  string,
    cancelledDate:  string,
    renewalDate:    string,
  },
}
```

---

## Current Status Values

The `currentStatus.label` must exactly match one of these keys defined in `STATUS_CONFIG` in `ProfilePage.jsx`. The icon and background colour are derived at render — **do not add an `icon` field** to `currentStatus` in profile data.

| Label | Background | Text colour | Icon |
|---|---|---|---|
| `Pending Approval` | `--neutral-50` | `--text-normal` | `pending` |
| `Approved` | `--success-100` | `--success-900` | `check_circle` |
| `Not Approved` | `--alert-100` | `--alert-700` | `dangerous` |
| `Declined` | `--alert-100` | `--alert-700` | `feedback` |
| `Approved*` | `--warning-100` | `--warning-900` | `history_toggle_off` |
| `Approved! (Renewal Required)` | `--warning-100` | `--warning-900` | `history_toggle_off` |

The optional `tooltip` field on `currentStatus` renders as a hover tooltip above the badge. It is cleared (set to `undefined`) by `initechFlow.js` when the flow transitions to `Approved`.

---

## Entity Type Differences

The `entityType` field drives label naming, field structure, and certain UI behaviour:

| Aspect | `entity` | `person` | `unknown` |
|---|---|---|---|
| Overview label prefix | `Entity …` | `Person …` | `Unknown …` |
| Name field | `Entity Third Party Legal Name` | `Person Third Party Legal Name` | `Unknown Third Party Legal Name` |
| Location field | `Entity Registered Country` | `Person Country of Residence` | `Unknown Registered Country` |
| Address field | `Entity Registered Address` | `Person Business Address` | `Unknown Registered Address` |
| ID fields | `Entity ID Type` / `Entity ID Value` | `Person ID Type` / `Person ID Value` | `Unknown ID Types` / `Unknown ID Value` |
| Year of Birth | — | `Person Year of Birth` | — |
| Gender | — | `Gender` | — |
| Company Number | `Entity Company Number` | — | — |
| Website | `Entity Website` | — | — |
| TP Type field | — | — | `Unknown Third Party Type` |
| Verification badge | `Entity Verified` | `Identity Verified` | — |

---

## Label Naming Convention

Field labels in `overviewFields` and `additionalFields` must match the slot labels defined in `CompanyAdmin.jsx` (`INITIAL_ENTITY_OVERVIEW`, `INITIAL_PERSON_OVERVIEW`, etc.).

Shared fields (same label across all entity types):
- `Third Party Owner`
- `Process Name`
- `Third Party Contact Email Address`
- `Business Unit`
- `Screening & Monitoring Policy`
- `Third Party Legal Structure`
- `Commercial Significance of Product or Service`
- `Third Party Renewal Date`
- `Tags`
- `Responsible Client Unit`
- `Internal Reference or ID`
- `All Relevant Client Units`

---

## Interactive Flow Patching

`src/utils/initechFlow.js` holds module-level mutable state for profiles with interactive flows. `patchInitechProfile(profile)` is called in both `ProfilePage.jsx` and `Sidebar.jsx` before rendering, and modifies the profile object to reflect the current flow state.

Patched profiles:
- **Initech** — `_riskMitigated` / `_approved` flags drive sidebar dot colours and `currentStatus.label`; tooltip is cleared when `approved = true`
- **Dunder Mifflin** — `_dmRenewed` / `_dmApproved` flags drive sidebar dots, renewal date, and `currentStatus.label`
- **Lumon** — `_lumonRenewed` / `_lumonApproved` flags, same pattern as Dunder Mifflin
- **Gringotts** — passes through unchanged (flow state is baked into profile data directly)

---

## Profiles Index

```js
// src/data/profiles/index.js
export { default as gazprom }       from './profile-gazprom.js';
export { default as piedpiper }     from './profile-piedpiper.js';
export { default as initech }       from './profile-initech.js';
export { default as dundermifflin } from './profile-dundermifflin.js';
export { default as gringotts }     from './profile-gringotts.js';
export { default as ecomoda }       from './profile-ecomoda.js';
export { default as lumon }         from './profile-lumon.js';
export { default as lospollos }     from './profile-lospollos.js';
export { default as waystar }       from './profile-waystar.js';
export { default as brucewayne }    from './profile-brucewayne.js';

export const profiles = {
  gazprom, piedpiper, initech, dundermifflin, gringotts,
  ecomoda, lumon, lospollos, waystar, brucewayne
};
```

The `profiles` object is keyed by `id` and used in all profile components:
```js
const profile = patchInitechProfile(profiles[useParams().profileId]);
```

---

## How to Add a Mock Profile

1. Create `src/data/profiles/profile-yourname.js` following the shape above
2. Add it to `src/data/profiles/index.js`:
   ```js
   export { default as yourname } from './profile-yourname.js';
   export const profiles = { gazprom, piedpiper, ..., yourname };
   ```
3. Add a row to the `ROWS` array in `src/pages/ThirdParties.jsx`
4. Navigate to `/profile/yourname` to verify it renders

**Tips:**
- Copy an existing profile file and edit values. The most common mistakes are mismatched field labels (check the CompanyAdmin naming convention) and missing `riskReport.accordionSections` IDs — they must be exactly: `country`, `bribery`, `environmental`, `human-rights`, `general`, `screening`, `cyber`
- Do **not** add an `icon` field to `currentStatus` — it is derived from `STATUS_CONFIG` at render time
- If the profile needs an interactive flow, add a `_patchYourname` function to `initechFlow.js` and register it in `patchInitechProfile`
