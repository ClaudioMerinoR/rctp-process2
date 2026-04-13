# Data Model

All third-party data is static JavaScript objects in `src/data/profiles/`. There is no database or API.

---

## Profile Object Shape

```js
{
  // ── Identity ──────────────────────────────────────────
  id:           string,          // URL key: 'gazprom' | 'piedpiper' | 'initech' | 'brucewayne'
  name:         string,          // Full display name
  shortName:    string,          // Used in breadcrumbs and headings
  entityType:   'entity' | 'person' | 'unknown',
  verifiedText: string,          // e.g. 'Entity Verified' | 'Identity Verified'

  // ── Status ────────────────────────────────────────────
  currentStatus: {
    label: string,               // e.g. 'Pending Approval' | 'Active'
    icon:  string,               // Material Icons name, e.g. 'pending' | 'check_circle'
  },
  riskLevel: {
    label: 'Low' | 'Medium' | 'High',
    icon:  string,               // e.g. 'warning' | 'check_circle_outline'
    level: 'low' | 'medium' | 'high',
  },

  // ── Layout flags ──────────────────────────────────────
  embedded:     boolean,         // true = no delete modal or alert banners (simpler profile)
  deleteModal:  boolean,         // show delete confirmation button/modal
  alertBanners: boolean,         // show top alert strip

  // ── Sidebar ───────────────────────────────────────────
  sidebarSteps: [
    {
      label:   string,
      dot:     'grey' | 'green' | 'red' | 'amber',
      partner?: 'integrity' | 'ubo',  // shows partner badge
      tooltip?: string,               // tooltip text on partner badge
      newTag?:  boolean,              // shows "NEW" tag
    }
  ],
  sidebarSections: [
    {
      label:        string,
      isDocuments?: boolean,     // links to /documents route
      partner?:     string,
      tooltip?:     string,
    }
  ],

  // ── Tab fields ────────────────────────────────────────
  overviewFields: [              // Shown in Overview tab (4-column grid)
    {
      label: string,             // Must match CompanyAdmin slot label convention (see below)
      value: string,
      flag?:  string,            // Unicode flag emoji, e.g. '\u{1F1FA}\u{1F1F8}'
      link?:  boolean,           // Renders as <a> tag
      href?:  string,            // URL for link fields
    }
  ],
  additionalFields: [            // Shown in Additional Details tab
    {
      label: string,
      value: string,
      link?:  boolean,
      href?:  string,
    }
  ],

  // ── Risk cards ────────────────────────────────────────
  riskCards: [
    {
      title:  string,            // Category name, e.g. 'Country'
      level:  'low' | 'medium' | 'high',
      flags:  number,
      score:  number,
    }
  ],

  // ── Open tasks ────────────────────────────────────────
  openTasks: [
    {
      type:        string,
      icon:        string,       // Key into TASK_ICONS map in ProfilePage.jsx
      name:        string,
      status:      string,       // e.g. 'Open' | 'In Progress' | 'Not Started'
      owner:       string,
      dateCreated: string,       // Display string, e.g. '13 Nov 2025'
      age:         string,       // Display string, e.g. '37 Days'
    }
  ],

  // ── Screening ─────────────────────────────────────────
  screeningRows: [
    {
      name:         string,
      matches:      [{ bg, color, val }],   // coloured match count squares
      updated:      string,
      type:         string,
      statusDot:    string,      // CSS colour value
      statusLabel:  string,
      categories:   [{ label, bg, color }],
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
  suggestedHasConnType: boolean,

  // ── Documents ─────────────────────────────────────────
  documents: [
    { name, type, size, section, date, owner }
  ],

  // ── Risk report ───────────────────────────────────────
  riskReport: {
    currentScore: number,
    accordionSections: [
      {
        id:         string,      // e.g. 'country', 'bribery' — used for URL hash navigation
        label:      string,      // Display label
        level:      'low' | 'medium' | 'high',
        rows: [
          { property: string, value: string, score: number }
        ],
        totalScore: number,
      }
    ],
    matchResults: [{ count, bg, color, label }],     // For screening results table
    screeningResults: [{ name, type, level, redFlags }],
    redFlags: [{ title, isLink, status, cat }],
    processSummary: [{ step, isLink, status, by, date }],
  },
}
```

---

## Entity Type Differences

The `entityType` field drives label naming, field structure, and certain UI behaviour:

| Aspect | `entity` | `person` | `unknown` |
|---|---|---|---|
| Overview label prefix | `Entity …` | `Person …` | `Unknown …` |
| Name field | `Entity Third Party Legal Name` | `Person Third Party Legal Name` | `Unknown Third Party Legal Name` |
| Location field | `Entity Registered Country` | `Person Country of Residence` | `Unknown Registered Country` |
| Industry field | `Entity Industry Sector - onboarding` | `Person Industry Sector - onboarding` | `Unknown Industry Sector - onboarding` |
| Address field | `Entity Registered Address` | `Person Business Address` | `Unknown Registered Address` |
| ID fields | `Entity ID Type` / `Entity ID Value` | `Person ID Type` / `Person ID Value` | `Unknown ID Types` / `Unknown ID Value` |
| Year of Birth | — | `Person Year of Birth` (in additionalFields) | — |
| Gender | — | `Gender` (in additionalFields) | — |
| Company Number | `Entity Company Number` | — | — |
| Website | `Entity Website` | — | — |
| TP Type field | — | — | `Unknown Third Party Type` |
| Verification badge | `Entity Verified` | `Identity Verified` | — |

---

## Label Naming Convention

Field labels in `overviewFields` and `additionalFields` must match the slot labels defined in `CompanyAdmin.jsx` (`INITIAL_ENTITY_OVERVIEW`, `INITIAL_PERSON_OVERVIEW`, etc.). This ensures consistency between what the admin configures and what the profile displays.

Shared fields (same label across all types):
- `Third Party Owner`
- `Process Name`
- `Third Party Contact Email Address`
- `Business Unit`
- `Screening & Monitoring Policy`
- `Third Party Legal Structure`
- `Commercial Significance of Product or Service`
- `Third Party Expiry Date`
- `Tags`
- `Responsible Client Unit`
- `Internal Reference or ID`
- `All Relevant Client Units`

---

## Profiles Index

```js
// src/data/profiles/index.js
export { default as gazprom }    from './profile-gazprom.js';
export { default as piedpiper }  from './profile-piedpiper.js';
export { default as initech }    from './profile-initech.js';
export { default as brucewayne } from './profile-brucewayne.js';

export const profiles = { gazprom, piedpiper, initech, brucewayne };
```

The `profiles` object is keyed by `id` and used in all profile components:
```js
const profile = profiles[useParams().profileId];
```

---

## How to Add a Mock Profile

1. Create `src/data/profiles/profile-yourname.js` following the shape above
2. Add it to `src/data/profiles/index.js`:
   ```js
   export { default as yourname } from './profile-yourname.js';
   export const profiles = { gazprom, piedpiper, initech, brucewayne, yourname };
   ```
3. Add a row to the table in `src/pages/ThirdParties.jsx` (the table data is hardcoded in the JSX)
4. Navigate to `/profile/yourname` to verify it renders

**Tip:** Copy an existing profile file and edit values. The most common mistakes are mismatched field labels (check the CompanyAdmin naming convention above) and missing required fields (`riskReport.accordionSections` must have exactly these IDs: `country`, `bribery`, `environmental`, `human-rights`, `general`, `screening`, `cyber`).
