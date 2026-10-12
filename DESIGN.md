---
name: Rowly DB website
description: A ruled technical sheet for a desktop SQL client; Swiss technical-publication grid in the app's own teal.
colors:
  primary-dark: "#0B2D33"
  deep-teal: "#12424A"
  turquoise: "#0E9594"
  turquoise-text: "#0B7C7B"
  turquoise-on-field: "#0A6E6D"
  mint: "#49C5B6"
  mint-hover: "#6ED3C6"
  blue-gray-text: "#4E636A"
  light-gray: "#D9E5E7"
  control-rule: "#B7C9CD"
  off-white: "#F5FAFA"
  sheet: "#FFFFFF"
  cover-field: "#E6F0F1"
  code-surface: "#EEF4F5"
  selection: "#C4E7E3"
  op-delete: "#C23B45"
  op-update: "#0B7C7B"
  op-insert: "#1A7A50"
  dark-paper: "#0B1A1D"
  dark-sheet: "#11242A"
  dark-field: "#102328"
  dark-code: "#081416"
  dark-ink: "#E8EFF0"
  dark-muted: "#95A8AD"
  dark-field-muted: "#A9C0C5"
  dark-on-action: "#082126"
  dark-selection: "#1E4A4D"
  dark-identity: "#2E9690"
  dark-op-delete: "#F28B82"
  dark-op-insert: "#5CCB8A"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.4rem, 4.9vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.55
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geist Mono, ui-monospace, 'SF Mono', 'Cascadia Mono', Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: "0.04em"
rounded:
  sm: "4px"
  md: "6px"
  tab: "8px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 3vw, 32px)"
  row: "clamp(48px, 5.5vw, 76px)"
  column-gap: "32px"
  stack: "28px"
  topbar: "56px"
components:
  button-primary:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.off-white}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.deep-teal}"
  button-primary-dark:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.dark-on-action}"
  button-primary-dark-hover:
    backgroundColor: "{colors.mint-hover}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.md}"
    padding: "0 22px"
    height: "48px"
  topbar-download:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.off-white}"
    padding: "0 18px"
    height: "56px"
  figure-shot:
    backgroundColor: "{colors.sheet}"
    rounded: "{rounded.md}"
  panel-grid:
    backgroundColor: "{colors.sheet}"
    rounded: "{rounded.md}"
  code-block:
    backgroundColor: "{colors.code-surface}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
  kbd:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.sm}"
  area-tab:
    textColor: "{colors.blue-gray-text}"
    rounded: "{rounded.tab}"
    padding: "10px 16px"
  pm-tab:
    textColor: "{colors.blue-gray-text}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  cover-field:
    backgroundColor: "{colors.cover-field}"
    textColor: "{colors.primary-dark}"
---

# Design System: Rowly DB website

## Overview

**Creative North Star: "The Ruled Technical Sheet"**

The site reads as a page of a technical publication: off-white paper, 1px hairline rules, twelve columns, spec strips, tables and figure captions. Sections are rows of the grid separated by rules, not floating cards. It refuses the SaaS template of a centered hero over a row of equal cards. Proof is the real app: every capture is a genuine screenshot, shown in light and dark.

The palette and lighting come from the app itself (the Rowly teal, its 6px radius, its semantic INSERT / UPDATE / DELETE colors, its identity glow). The site feels like the product's documentation page, calm, exact and verifiable, which matches an audience that judges trust by what can be checked. Depth is mostly hairline seams; shadows are soft and layered and sit only under real figures and panels.

The memorable moment is the theme toggle: every real screenshot swaps in place with zero layout shift.

**Key Characteristics:**
- Hairline rules (1px) are the structure; the 12-column grid is drawn on the cover only.
- Geist for text, Geist Mono for data and small utility labels.
- One teal family; red only where the product means destruction (DELETE, the error note).
- A tinted cover field holds the headline; the real app capture overlaps from the field onto the paper.
- Identity glow is the app's own lighting, used sparingly.
- Light and dark are equal citizens; without JavaScript the system theme rules, with it the toggle sets `data-theme`.

## Colors

A teal-ink palette on cool off-white paper, mirrored in a graphite-teal dark theme with mint as the accent. Names follow the brand palette roles; text roles were darkened where the brand value failed contrast.

### Primary
- **Primary Dark** (#0B2D33): ink. Body text, headings, the primary button background in light theme.
- **Deep Teal** (#12424A): hover state of the primary button.
- **Turquoise** (#0E9594): focus ring, current-page underline, graphic marks, and the base of the identity glow. Never used for text: 3.47:1 on paper is non-text only.
- **Turquoise Text** (#0B7C7B): links, small tags and icons in light theme on paper and sheet. Also the UPDATE semantic.
- **Turquoise on Field** (#0A6E6D): links inside the cover field and page bands (5.22:1 on the field).
- **Mint** (#49C5B6): in dark theme the accent, links, focus ring and primary button background. Hover #6ED3C6.

### Neutral
- **Off White** (#F5FAFA): light paper; text on dark buttons.
- **Sheet** (#FFFFFF): figures, tables, platform and step panels, kbd keys.
- **Cover Field** (#E6F0F1): the tinted field of the cover and community page bands (off white tinted with light gray).
- **Light Gray** (#D9E5E7): hairline rules in light theme.
- **Control Rule** (#B7C9CD): outline of controls (line buttons, tabs, kbd), from the app's control border.
- **Blue-Gray Text** (#4E636A): secondary text, the brand blue-gray (#6B7E86) darkened to pass AA.
- **Code Surface** (#EEF4F5): code blocks, the app's light surface.
- **Dark Paper** (#0B1A1D): dark theme page, the brand dark accent (#082126) pushed toward the app's graphite.
- **Dark Sheet** (#11242A), **Dark Field** (#102328), **Dark Code** (#081416): dark theme panels, cover field, code.
- **Dark Ink** (#E8EFF0) and **Dark Muted** (#95A8AD): dark theme text; **Dark Field Muted** (#A9C0C5) on the dark cover field. Dark rules are light gray at 9% (rgba(217,229,231,0.09)), control rules at 20%.
- **Dark On Action** (#082126): text on the mint button.
- Selection: #C4E7E3 light, #1E4A4D dark.

### Semantic (from the app)
- **DELETE** #C23B45 (dark #F28B82), **UPDATE** #0B7C7B (dark #49C5B6), **INSERT** #1A7A50 (dark #5CCB8A). Used on the operation legend and the error note icon only.

### Measured contrast (WCAG ratios, computed from the built values)
Light: ink on paper 13.87; blue-gray text on paper 6.01, on sheet 6.33, on cover field 5.46; turquoise text on paper 4.77, on sheet 5.02; turquoise on field 5.22; off white on primary dark 13.87; DELETE 4.98 and INSERT 5.06 on paper.
Dark: dark ink on paper 15.29; dark muted on paper 7.19, on sheet 6.48, on field 6.56; mint on paper 8.43; field text 15.42, field muted 8.53; dark on-action on mint 7.92; DELETE 7.45, INSERT 8.79.

### Named Rules
**The Teal-Only Rule.** One hue family carries the system. Red appears only where the product means destruction (DELETE, errors); no other accent hue is introduced.

**The Text-Role Rule.** Turquoise #0E9594 is a graphic color. Text and links use the darkened roles (#0B7C7B, #0A6E6D on the field, mint in dark). A value is recorded for text only if its measured ratio passes AA.

**The Tinted-Ground Rule.** The cover field is the only tinted ground; every other surface is paper or white sheet. Do not add further tinted bands.

## Typography

**Text Font:** Geist (variable 400-700, latin subset, self-hosted; fallback ui-sans-serif, system-ui)
**Mono Font:** Geist Mono (variable 100-900, self-hosted; fallback ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas)

**Character:** Geist for text; Geist Mono for data, shortcuts, code and small utility labels (footer column heads, breadcrumbs, the 'Your system' tag, the language switch). Tight negative tracking on large headings gives the publication feel; body stays quiet at regular weight with the `ss01` stylistic set on.

### Hierarchy
- **Display** (600, clamp(2.4rem, 4.9vw, 4.25rem), 0.98, -0.04em): the cover headline only. Community page titles use the same character at clamp(2.4rem, 5vw, 4rem), compact pages at clamp(2rem, 4vw, 3rem), the 404 at clamp(2rem, 4.5vw, 3.5rem).
- **Headline** (600, clamp(1.75rem, 3vw, 2.5rem), 1.08, -0.03em): section titles (h2).
- **Title** (600, 1.0625rem, -0.01em): h3, figure and channel titles; platform names at 1.25rem; area titles clamp(1.25rem, 2.2vw, 1.625rem) at -0.02em.
- **Body** (400, 1rem, 1.55): running text. Secondary copy 0.9375rem; cover sentence 1.0625rem at 34ch; section intro capped at 40ch; FAQ answers at 70ch. Captions 0.8125rem.
- **Label** (Geist Mono 500, 0.75rem, 0.04em, uppercase): spec strip terms, table heads, "Your system" tag (0.6875rem), footer column heads. The language switch and theme toggle are mono at 0.8125rem; breadcrumbs mono 0.8125rem not uppercase; kbd and code at 0.875em / 0.8em.

### Named Rules
**The Mono-Is-Data Rule.** Mono is for things the reader could type or verify: versions, shortcuts, commands, file names, and small utility labels in chrome. It is not used for section headings, and no label sits above a heading as a decoration.

**The Tabular Rule.** Tables carry `font-variant-numeric: tabular-nums`.

## Layout

A 12-column sheet inside a 1240px wrapper with a fluid gutter (clamp(16px, 3vw, 32px)) and 32px column gap. Sections are rows: padding is `--row` (clamp(48px, 5.5vw, 76px)) on top and bottom, 1px rule above, and the sheet has left and right hairlines. A standard section puts a sticky head (top 88px, columns 1-4) beside a body (columns 5-12); the lead review section is wide, the head spanning the row (title over 6 columns, text over 6) and the body full width so captures stay legible.

The cover draws the 12 column hairlines. Headline lines and the cover paragraph sit on field-colored backgrounds so the grid never runs through text. The headline spans seven columns, the sentence, primary Download and Source sit in columns 8-12. Below, a four-cell spec strip, then the real capture with negative bottom margin so it overlaps from the field onto the paper.

Multi-column blocks (3-step flow, platforms, channels) are single bordered panels divided by hairlines, never separate cards. Tables and spec lists use rules between rows, with a vertical rule between two-column halves.

Responsive: at 1080px the cover and section heads stack to full width and the sticky head turns static; at 860px every grid becomes one column, the drawn cover grid is removed, the nav collapses into a menu panel (theme and language inside it), and panel dividers turn horizontal; at 560px the topbar Download keeps only its icon, the spec strip and tables reflow to blocks, community area tabs become a 2x2 grid and sheet side rules disappear. Sticky topbar is 56px high.

Motion: parallax exists only in the cover (text lags up to 40px, screenshot leads up to 30px, transform only, off for reduced motion, half strength under 600px). Everything else is 150ms ease color/border/transform transitions, 240ms for the glow fade. Reduced motion zeroes transitions and smooth scrolling.

### Named Rules
**The Row Rule.** A new section is a row of the grid with a hairline above it. Do not float cards on the paper or nest panels inside panels.

**The Grid-Behind-Nothing Rule.** The drawn grid is a cover device. Wherever it passes behind letters, those letters get a field-colored ground.

## Elevation & Depth

Hybrid, leaning flat: structure comes from hairline seams and from white sheets on off-white paper in light theme (and a lighter graphite sheet on dark paper). Shadows are soft, layered and offset (contact, near, ambient); never hard or crisp.

### Shadow Vocabulary
- **Panel** (`box-shadow: 0 1px 2px rgba(11,45,51,0.05)`): bordered panels, tables, step and platform groups; dark: `0 1px 2px rgba(0,0,0,0.3)` plus a 1px inner top highlight (`inset 0 1px 0 rgba(245,250,250,0.05)`).
- **Figure** (`0 1px 2px rgba(11,45,51,0.05), 0 4px 10px -2px rgba(11,45,51,0.06), 0 18px 36px -14px rgba(11,45,51,0.14)`): screenshots.
- **Cover figure** (`0 2px 4px rgba(11,45,51,0.04), 0 14px 28px -10px rgba(11,45,51,0.12), 0 44px 88px -36px rgba(11,45,51,0.32)`): the overlapping hero capture.
- **Identity glow**: the app's own lighting (teal #0E9594 at 60% in light, #2E9690 at full strength in dark). A logo-anchored radial in the topbar (640px wide, fades out by 85%); a left-edge wash plus a faint top wash on hover and focus of cards (`.lit`), fixed on the suggested download card. Used sparingly.
- The topbar is translucent (paper at 88%) with a 10px blur and saturation boost, in light and in dark.

### Named Rules
**The Hairline-First Rule.** Separate with a 1px rule before reaching for a shadow. Shadows are reserved for real figures and bordered panels.

**The Own-Lighting Rule.** The glow is the app's identity color at the app's intensity, anchored at the logo or the left edge of a card. It is never a decorative gradient on text, buttons or backgrounds.

## Shapes

Small, exact corners: 6px radius (from the app) on buttons, figures, panels and tables; 4px on code blocks, kbd and the copy button; 8px top corners on folder-style area tabs (the selected tab takes the content color and covers the baseline); full pill on the install-manager tabs; 50% on step numerals and legend dots. The rest is straight lines: rules, underlines and inset 2px accent bars mark the current page.

Screenshots: each exists as a light/dark pair (and EN/ES), stacked in one grid cell and swapped by visibility (not display) to avoid layout shift; produced by `tools/site-shots/shots.sh`. Glyphs are inline SVG line icons at 14-20px.

## Components

### Buttons
- **Shape:** 6px radius, 48px minimum height, 0 22px padding, Geist 600 at 0.9375rem, 150ms color transition.
- **Primary:** Primary Dark with off-white text in light; mint with #082126 text in dark. Hover goes to Deep Teal, or Mint Hover in dark.
- **Line (secondary):** transparent with a Control Rule outline; hover turns the outline to ink. On the cover it takes the field color as ground.
- **Focus:** 2px turquoise (mint in dark) outline, 2px offset, for every focusable element.

### Navigation
Hairline topbar row: logo, links (0.875rem, muted, current page marked by an inset 2px turquoise underline), then language switch and theme toggle in mono. No vertical dividers between cells. The solid Download button appears only after the cover button leaves the view (fades in over 150ms); in dark the bar stays translucent. On narrow screens a menu button opens a full-width panel with 14px-padded rows.

### Cards / Containers (bordered panels)
Steps, platforms, channels, tables and the CLI disclosure are single bordered panels on the sheet color with 6px corners, internal 18-22px padding, and 1px dividers. Hover and focus-within wash the left edge in the identity glow; the platform detected for the visitor ("Your system" tag, mono) carries the wash permanently.

### Spec strip and specs list
Four cells divided by hairlines, term in mono uppercase label style over a 0.9375rem value. The specs list is a two-column rule table with semibold terms.

### Figures
Real screenshots in a 6px bordered sheet with the Figure shadow; captions 0.8125rem blue-gray below.

### Tabs and chips
Community area tabs are folder tabs; install-manager tabs are mono pills (selected = ink fill, paper text). Copy button: 4px, sheet fill, control outline.

### Giscus
Giscus themes are the site's own light.css/dark.css (site/assets/giscus), applied through data-theme-light/dark and setConfig on theme change; the iframe's color-scheme is left to Giscus (light dark). One conversation per area and language, in an 820px column, with a bordered fallback panel.

## Do's and Don'ts

### Do:
- **Do** build new sections as grid rows separated by 1px rules in `--rule`.
- **Do** use Blue-Gray Text #4E636A (6.01:1) for secondary text and #0B7C7B for light-theme links.
- **Do** show real screenshots in light/dark pairs in one grid cell, swapped by visibility.
- **Do** keep the glow to the logo-anchored topbar radial and the left-edge card wash.
- **Do** respect reduced motion: transitions zeroed, parallax off.
- **Do** keep EN/ES parity for every added string and capture.

### Don't:
- **Don't** use turquoise #0E9594 (3.47:1) for text.
- **Don't** add vertical dividers between topbar cells.
- **Don't** draw the column grid behind text, or extend it beyond the cover.
- **Don't** apply parallax outside the cover.
- **Don't** use red outside DELETE and error meaning, or add a second accent hue.
- **Don't** use hard or offset-only shadows; shadows stay layered and soft.
- **Don't** set Geist Mono on headings or use it to label a section above its heading.
- **Don't** center a hero over a row of equal cards.
