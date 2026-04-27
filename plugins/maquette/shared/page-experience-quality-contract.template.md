# Page Experience Quality Contract

Status: draft before implementation.

Use this contract alongside `page-layout-contract.md`. The layout contract covers structure, density, media crop, and section behavior. This contract covers UX quality, motion/effects, generated visual fit, states, accessibility, performance, information clarity, brand craft, and QA acceptance.

## Generated Visual Fit

For every generated raster or decorative image used by the page, record the fit decision before implementation.

| File path | Purpose | Page region | Supports product function | Could be mistaken for a real feature | Distracts from primary task | CSS/SVG/code-native better | Decision | Alt text or decorative-hidden |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  | yes / no | yes / no | yes / no | yes / no | use / revise / replace / remove |  |

Reject or revise generated visuals that imply the wrong feature, look generic, push core content too far down, reduce trust, conflict with the product category, or use heavy raster imagery where CSS/SVG/code-native effects would work better.

## Motion and Effects

Every motion/effect needs a UX purpose. Do not infer exact motion solely from the page concept image.

| Name | Purpose | Trigger | Affected element | Duration | Easing | CSS properties | JS required | Reduced-motion fallback | Accessibility risk | Performance risk | QA status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  | yes / no |  |  |  | planned / passed / failed |

Rules:
- Provide `prefers-reduced-motion` CSS for every non-essential animation.
- Disable or simplify ambient loops when reduced motion is requested.
- Auto-moving, blinking, scrolling, or updating decorative content lasting more than 5 seconds must have pause/stop/hide controls unless essential.
- Prefer `transform` and `opacity`.
- Avoid animating `top`, `left`, `width`, `height`, layout, expensive shadows, or heavy filters unless justified.
- Keep JS animation minimal.
- Animation must not cause document overflow or delay interaction response.

## Interaction States

Record relevant states for the page. Data-heavy pages must cover loading, skeleton, empty, error, offline, stale data, selected/current, hover, focus-visible, active/pressed, disabled, success, permission/unavailable, mobile drawer open/closed, and filter applied/cleared states where applicable.

- Loading:
- Skeleton:
- Empty:
- Error:
- Offline:
- Stale data:
- Disabled:
- Selected/current:
- Hover:
- Focus-visible:
- Active/pressed:
- Success:
- Permission/unavailable:
- Mobile drawer open/closed:
- Filter applied/cleared:

## Accessibility

- Semantic heading order:
- Landmark structure:
- Keyboard navigation:
- Visible focus:
- Tap target size:
- Contrast:
- Non-color-only status indicators:
- Image alt text or decorative hiding:
- `aria-expanded` / `aria-controls` for drawers/nav:
- Reduced-motion support:
- Form labels and helper/error text:
- Table semantics for tabular data:
- No unreachable drawer/menu content:
- No hidden focus traps:

## Performance

Baseline targets unless the project defines stricter ones:
- LCP target: 2.5s or better.
- INP target: 200ms or better.
- CLS target: 0.1 or better.

Checks:
- Heavy decorative image usage:
- LCP image/hero impact:
- CSS/JS weight risk:
- Animation cost:
- Layout shift risk:
- Interaction delay risk:
- Font loading risk:
- Mobile rendering risk:
- Measurement status: measured / static risk review only
- Tooling limitation, if actual measurement is unavailable:

## Content and Information Architecture

- Clear H1:
- Concise intro:
- Obvious primary action:
- Useful summaries before detail:
- Filter/search/sort behavior for data-heavy pages:
- No ornamental sections that push core tasks down without benefit:
- Page-specific visuals support hierarchy:
- Footer/terminal regions fit the site and concept:

## Brand Craft

- Recognizable brand language:
- Typography, spacing, icons, surfaces, and interactions fit the product:
- Avoids generic SaaS/card-dashboard sameness:
- Visual richness comes from purposeful system details:
- Design fits the audience and product category:

## Mobile and Responsive UX

- Mobile content order:
- Mobile navigation closed state:
- Mobile navigation open state:
- Drawer/menu scrollability:
- Tap targets:
- Text fit:
- Data/table behavior:
- Image crop/fit:
- No document-level overflow:

## QA Acceptance Criteria

Record pass/fail and the evidence or blocker for each item.

| Category | Status | Evidence / blocker |
| --- | --- | --- |
| Component reuse before new component creation | pass / fail |  |
| Component coverage plan completed | pass / fail |  |
| Component extraction plan completed, when concept-first | pass / fail / n/a |  |
| Component close-up focus/fidelity and source-region fit | pass / fail |  |
| Component close-up screenshot match, max 1254x1254 | pass / fail |  |
| Desktop segment concepts approved | pass / fail |  |
| Segment layout contracts completed | pass / fail |  |
| Legacy CSS-contract poster focus/readability/selector allowlist, only when explicitly used | pass / fail / n/a |  |
| Generated visual fit | pass / fail |  |
| Motion/effects appropriateness | pass / fail |  |
| Reduced-motion behavior | pass / fail |  |
| Interaction state coverage | pass / fail |  |
| Accessibility baseline | pass / fail |  |
| Performance risk/budget | pass / fail |  |
| Content hierarchy | pass / fail |  |
| Typography and text-fit QA | pass / fail |  |
| Mobile usability | pass / fail |  |
| Custom font loading via brand/fonts.css | pass / fail / n/a |  |
| Screenshot evidence capped at 1254x1254 | pass / fail |  |
| Concept-ratio desktop screenshots captured | pass / fail |  |
| Segmented viewport screenshots captured for long pages | pass / fail |  |
| No unapproved clipping / overflow hidden | pass / fail |  |
| Existing-site shell consistency, when applicable | pass / fail / n/a |  |
| Context fit against actual product | pass / fail |  |
