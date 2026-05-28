---
name: RCTP Process
description: Third-Party Risk Management compliance platform for onboarding, vetting, and monitoring vendors.
colors:
  riskcenter-teal: "#028FBB"
  riskcenter-teal-dark: "#017295"
  riskcenter-teal-light: "#02A3D5"
  riskcenter-teal-ghost: "#E8F9FE"
  ink-deep: "#0C2A31"
  ink-secondary: "#516267"
  ink-tertiary: "#5A6E73"
  paper-gray: "#F4F4F4"
  surface-white: "#FFFFFF"
  border-subtle: "#DFE3E7"
  border-field: "#C4CCD2"
  alert-surface: "#F5BFC1"
  alert-text: "#9A3438"
  success-surface: "#AAF3D2"
  success-text: "#07502E"
  warning-surface: "#FAE8BB"
  warning-text: "#564518"
typography:
  display:
    fontFamily: "'Simplon Norm', 'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 300
    lineHeight: 1.25
    letterSpacing: "normal"
  headline:
    fontFamily: "'Simplon Norm', 'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.33
    letterSpacing: "normal"
  title:
    fontFamily: "'Simplon Norm', 'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "normal"
  body:
    fontFamily: "'Roboto', 'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: "normal"
  label:
    fontFamily: "'Simplon Norm', 'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.33
    letterSpacing: "0.5px"
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
  pill: "1000px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
components:
  button-primary:
    backgroundColor: "{colors.riskcenter-teal}"
    textColor: "{colors.paper-gray}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "32px"
  button-primary-hover:
    backgroundColor: "{colors.riskcenter-teal-dark}"
    textColor: "{colors.paper-gray}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "32px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.riskcenter-teal}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "32px"
  input-default:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink-deep}"
    rounded: "{rounded.xs}"
    padding: "0 10px"
    height: "32px"
  input-focus:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink-deep}"
    rounded: "{rounded.xs}"
    padding: "0 10px"
    height: "32px"
  chip-status-approved:
    backgroundColor: "{colors.success-surface}"
    textColor: "{colors.success-text}"
    rounded: "{rounded.xs}"
    padding: "3px 8px"
  chip-status-alert:
    backgroundColor: "{colors.alert-surface}"
    textColor: "{colors.alert-text}"
    rounded: "{rounded.xs}"
    padding: "3px 8px"
  chip-tag:
    backgroundColor: "{colors.border-subtle}"
    textColor: "{colors.ink-deep}"
    rounded: "{rounded.xs}"
    padding: "2px 8px"
  card:
    backgroundColor: "{colors.surface-white}"
    rounded: "{rounded.sm}"
    padding: "16px"
---

# Design System: RCTP Process

## 1. Overview

**Creative North Star: "The Calm Casebook"**

This design system is a professional's tool, built for people who spend long sessions making consequential decisions. The aesthetic draws from the mental model of a well-kept case file: everything is findable, nothing is decorative, and the system earns trust through its consistency. A compliance officer opening a third-party profile should feel a quiet sense of order, not the manufactured urgency that plagues financial dashboards or the visual chaos of legacy GRC tools.

The palette is anchored by Riskcenter Teal, a considered blue-green that conveys both institutional reliability and calm focus without sliding into the navy-and-gray gravity well of enterprise software. Surfaces are a warm Paper Gray, not a harsh white. Text is a deep teal-tinted ink that ties every element back to the brand hue without announcing itself. The overall effect: a room that was arranged for you before you arrived.

Information density is treated with respect. Long sessions mean complex screens. The system allows tables with many columns, forms with many fields, and panels with layered information. Density is achieved through precise spacing and tight components, not compression. The difference between a cramped screen and a dense one is rhythm, and rhythm comes from varied spacing that the eye can parse without effort.

**Key Characteristics:**
- Teal-anchored ink and accent system; the brand color appears in structural roles (nav, buttons, links) and nowhere else
- Two-typeface hierarchy: Simplon Norm for UI chrome and headings, Roboto for data-heavy body text
- 32px component baseline: buttons, inputs, select controls all share the same height and slot seamlessly into tables and toolbars
- Flat-by-default elevation; card borders and `shadow-xs` separate surfaces without drama
- Status communicated through tinted surface + high-contrast text pairs; color is never the only carrier of meaning

## 2. Colors: The Riskcenter Palette

A restrained palette built on a single teal accent and warm-neutral surfaces. The system uses three foreground values and two background values for most surfaces; status colors (alert, success, warning) appear only in semantic contexts.

### Primary
- **Riskcenter Teal** (`#028FBB`): The brand's structural anchor. Used on the nav background, primary buttons, active tab indicators, link text, focus rings, and checkbox fill. Never used as a background behind text on cards.
- **Riskcenter Teal Dark** (`#017295`): Hover state for the nav and primary buttons. Darker by one step; the shift is immediate and predictable.
- **Riskcenter Teal Light** (`#02A3D5`): Accent foreground for link text and icon highlights. Slightly more saturated than the base for legibility on white surfaces.
- **Riskcenter Teal Ghost** (`#E8F9FE`): The near-invisible tint used for alternating table row stripes. So desaturated it reads as white until you look for it.

### Neutral
- **Ink Deep** (`#0C2A31`): Primary text. A dark teal-ink that never reads as pure black but carries full authority. Used for headings, body text, and high-contrast labels.
- **Ink Secondary** (`#516267`): Secondary text, field labels, table cell content. Legible but clearly subordinate.
- **Ink Tertiary** (`#5A6E73`): Placeholder text, disabled states, and inactive nav items. Reads as muted without being unreadable.
- **Paper Gray** (`#F4F4F4`): The application canvas. Not white; slightly warm and gray. Provides enough contrast to lift white surface cards without adding visual weight.
- **Surface White** (`#FFFFFF`): Card and panel surfaces. Always the foreground layer relative to Paper Gray.
- **Border Subtle** (`#DFE3E7`): Dividers, table borders, card borders. Low contrast against white; structural without calling attention.
- **Border Field** (`#C4CCD2`): Form field borders at rest. One step stronger than Border Subtle; confirms affordance without demanding attention.

### Tertiary (Status System)
- **Alert Surface / Alert Text** (`#F5BFC1` / `#9A3438`): Declined, Not Approved, danger states.
- **Success Surface / Success Text** (`#AAF3D2` / `#07502E`): Approved status. The green is vivid but its surface pair is deliberately soft.
- **Warning Surface / Warning Text** (`#FAE8BB` / `#564518`): Approved with caveats, renewal required. Warm amber without being alarmist.

### Named Rules
**The Structural Only Rule.** Riskcenter Teal appears exclusively in structural roles: navigation, primary actions, links, focus indicators, and active states. It is never used as a decorative splash or gradient. Its rarity ensures it always carries meaning.

**The Paired Status Rule.** Every status color is paired: a desaturated surface tint plus a high-contrast text color. The surface alone communicates nothing; the pair communicates everything. Never use the surface tint as the only status indicator.

## 3. Typography

**UI / Heading Font:** Simplon Norm (with Inter, ui-sans-serif as fallback)
**Body / Data Font:** Roboto (with Inter, ui-sans-serif as fallback)
**Mono Font:** Source Code Pro (with ui-monospace, Menlo, Consolas as fallback)

**Character:** A deliberate split between the humanist geometry of Simplon Norm and the data-legibility of Roboto. Simplon Norm handles all UI chrome, headings, navigation, labels, and buttons; it brings a quiet authority and modernity that distances the platform from legacy enterprise sans-serif. Roboto carries the dense body text in tables, descriptions, and form fields where at-a-glance legibility over long sessions matters more than personality.

### Hierarchy
- **Display** (Simplon Norm, 300 weight, 32px / 40px): Page-level titles only. The light weight (300) keeps large headings elegant without competing with the content below.
- **Headline** (Simplon Norm, 500 weight, 24px / 32px): Section headings, dialog titles. Medium weight; enough authority to structure a page without being loud.
- **Title** (Simplon Norm, 500 weight, 20px / 32px): Card titles, panel headings, tab labels at the section level.
- **Body** (Roboto, 400 weight, 14px / 20px): All body copy, table cells, form field values. Default app text size. Keep text containers below 65–75ch.
- **Label** (Simplon Norm, 500 weight, 12px / 16px, +0.5px tracking): Buttons, form labels, column headers, navigation items, status chips. Uppercase only for action buttons; sentence case for field labels and nav.

### Named Rules
**The Two-Font Rule.** Simplon Norm is for the interface; Roboto is for the data. Do not use Simplon Norm for body text in tables or Roboto for button labels. The split is not arbitrary; each font was chosen for its register.

**The Light Display Rule.** 32px headings use weight 300. The lightness is intentional at large sizes. Do not bump the weight to 500 "for impact"; that impact comes at the cost of the system's calm.

## 4. Elevation

This is a flat-by-default system. Surfaces are separated from the canvas through background color contrast, not shadows. Cards sit on Paper Gray with Surface White backgrounds; the contrast is enough. Shadows appear only in functional roles: to indicate a floating surface (dropdown, tooltip, modal overlay) or to mark interactive hover state on cards that contain embedded risk signals.

The shadow scale is deliberately shallow at the low end. `shadow-xs` (1px y-offset, 7% opacity) is the most common value and is nearly invisible; it confirms surface separation without adding weight. Deeper shadows (`shadow-lg`, `shadow-xl`) are reserved for panels that slide over content.

### Shadow Vocabulary
- **shadow-xs** (`0 1px 2px rgba(0,0,0,0.07)`): Card default and rest state for floating chrome. The system's most used shadow; barely visible.
- **shadow-sm** (`0 1px 2px rgba(0,0,0,0.15)`): Slight raise; used on interactive cards on hover.
- **shadow-md** (`0 2px 6px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.07)`): Dropdowns, combobox overlays, popovers.
- **shadow-lg** (`0 6px 14px rgba(0,0,0,0.25)`): Slide-in panels (StatusPanel, DeclinePanel, column picker).
- **shadow-xl** (`0 12px 24px rgba(0,0,0,0.30)`): Full-screen modals and overlays.

### Named Rules
**The Flat-By-Default Rule.** Cards are flat at rest. A card gains a shadow only when it moves (hover, drag) or floats above other content (dropdown, panel). Static card grids with identical elevation on every tile are prohibited.

## 5. Components

The system's components are compact and credible. Dense but never cramped. Form chrome that earns trust through consistency, not through visual richness.

### Buttons
- **Shape:** Slightly rounded (4px radius, `--rctp-radius-sm`). Not pill-shaped; not square.
- **Primary:** Riskcenter Teal (`#028FBB`) background, Paper Gray (`#F4F4F4`) text. Height 32px, padding `0 12px`. Font: Simplon Norm, 500 weight, 12px, uppercase, +0.5px tracking. Transition: `background 0.2s ease`.
- **Hover:** Riskcenter Teal Dark (`#017295`). No scale, no shadow. Color shift only.
- **Ghost / Outline:** 1px border in current accent, transparent background, teal text. Same height and padding as primary.
- **Disabled:** Opacity 0.4. Cursor `not-allowed`. Structure preserved; only presence is removed.

### Status Chips
- **Shape:** 2px radius (`--rctp-radius-xs`). Smaller radius than buttons; chips read as labels, not actions.
- **Construction:** Paired surface + text color. Never border-only; never icon-only. The color pair is the signal.
- **Size:** 11px / 600 weight; 3px 8px padding. Fits inside a 32px table row without competing with row content.
- **Approved** (Success Surface `#AAF3D2` + Success Text `#07502E`), **Declined / Not Approved** (Alert Surface `#F5BFC1` + Alert Text `#9A3438`), **Pending** (Border Subtle `#DFE3E7` + Ink Deep `#0C2A31`), **Expired / Renewal Required** (Warning Surface `#FAE8BB` + Warning Text `#564518`).

### Cards / Containers
- **Corner style:** Gently rounded (4px, `--rctp-radius-sm`).
- **Background:** Surface White (`#FFFFFF`) on Paper Gray canvas.
- **Shadow:** shadow-xs at rest; shadow-sm on hover for interactive cards.
- **Border:** None by default. Dividers inside cards use a 1px `border-subtle` line with `margin: 0 16px` (inset, not full-bleed).
- **Accent bar:** Cards that anchor page sections use `border-top: 4px solid var(--primary-500)`. This is a structural pattern, not a decorative stripe: it indicates primary content hierarchy, not secondary callouts.
- **Internal padding:** 16px standard.

### Inputs / Fields
- **Style:** 1px border in Border Field (`#C4CCD2`), Surface White background, 2px radius (`--rctp-radius-xs`). Height 32px to match buttons; this alignment is structural, not coincidental.
- **Focus:** Border shifts to Riskcenter Teal (`#028FBB`) + `box-shadow: 0 0 0 3px rgba(2, 163, 213, 0.12)`. The ring is a soft glow, not a hard stroke.
- **Placeholder:** Ink Tertiary (`#5A6E73`). Readable but clearly not content.
- **Disabled:** Border Field border, Paper Gray background, Ink Tertiary text, cursor `not-allowed`.

### Navigation
- **Top header bar:** Ink Deep (`#0C2A31`) background, 44px height. Product name in Simplon Norm 700. Right side: context links and icon actions in `rgba(255,255,255,0.72)`, brightening to white on hover.
- **Secondary nav bar:** Riskcenter Teal (`#028FBB`) background, 36px height. Navigation links in Simplon Norm 500, 12px, uppercase. Active link: Riskcenter Teal Dark (`#017295`) background, white text. Hover: same Riskcenter Teal Dark background.
- **Left sidebar nav (Settings / CompanyAdmin):** 226px wide, Paper Gray background. Inactive items: Ink Secondary text, 14px, no background. Active item: Riskcenter Teal (`#028FBB`) background, Surface White text.

### Tables
- **Header row:** Paper Gray background, Ink Secondary text, 11px / 600 weight. `border: 1px solid Border Subtle` on each `th`.
- **Odd rows:** Riskcenter Teal Ghost (`#E8F9FE`) stripe. Even rows: Surface White. Hover: `#F0F7FA` (a slightly more visible desaturated teal).
- **Cell borders:** `1px solid Border Subtle` on all four sides. The border system is consistent and never omitted.
- **Transition:** `background 100ms ease` on row hover. Fast and direct.

### Signature Component: Tab Indicator
Animated tab underlines use a `<motion.div>` with `layoutId` for the animated indicator (2px height, Riskcenter Teal, `border-radius: 1px`, `bottom: -1px` to overlap the container's bottom border). Tab text is 14px / 500 weight / uppercase / +0.1px tracking. This pattern is used in RoleDetails, Settings, and AddThirdParty; do not substitute CSS `::after` pseudo-elements.

## 6. Do's and Don'ts

### Do:
- **Do** use Riskcenter Teal exclusively for structural roles: nav, primary buttons, links, focus rings, active indicators, checkbox fill. Rarity is the point.
- **Do** pair every status color: surface tint + high-contrast text. Both elements must be present. Never use a tinted background without the matching text color applied to its content.
- **Do** match button, input, and select heights to 32px. This alignment is load-bearing for toolbar and table-inline layouts.
- **Do** use `border-top: 4px solid var(--primary-500)` on cards that anchor primary page sections. This is a structural signal, not a decorative stripe.
- **Do** animate tab indicators with Framer Motion `layoutId`, not CSS `::after` pseudo-elements.
- **Do** keep body text containers below 65–75ch. Compliance officers read long content; line length matters.
- **Do** make color + icon + text carry every status together. Color alone fails WCAG AA.
- **Do** use Simplon Norm for UI chrome (headings, buttons, labels, nav) and Roboto for data (table cells, body copy, field values).

### Don't:
- **Don't** make this look like ServiceNow or legacy GRC tools: no heavy gray grids, no overwhelming chrome, no dated form UI, no visual hierarchy where everything shouts equally.
- **Don't** use dark mode with neon or high-chroma accents. Compliance is not a trading terminal. The interface should feel calm and focused.
- **Don't** use `border-left` greater than 1px as a colored stripe accent on cards, callouts, or list items. This is prohibited. Rewrite as a full border, tinted background, or leading icon.
- **Don't** use gradient text (`background-clip: text` with a gradient background). Single solid color only.
- **Don't** build identical card grids: same-sized cards, same icon + heading + text structure repeated. Vary the affordance when content varies.
- **Don't** use a modal as the first solution for progressive disclosure. Exhaust inline and slide-in panel alternatives first.
- **Don't** use Riskcenter Teal decoratively: as a colored section background, a gradient component, or an accent splash that has no functional meaning.
- **Don't** render a status chip with only a background tint and no accompanying text color from the paired set.
- **Don't** use weight 500 on 32px display headings. Light weight (300) at large sizes is the system's personality; heavier display text reads as a different product.
