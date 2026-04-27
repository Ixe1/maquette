# Page Segment Layout Contract

Status: draft after segment concept approval and before coding that segment.

Create one contract per approved desktop concept segment, for example:

- `.maquette/pages/<page-name>/segments/top-layout-contract.md`
- `.maquette/pages/<page-name>/segments/middle-layout-contract.md`
- `.maquette/pages/<page-name>/segments/bottom-layout-contract.md`

## Segment Source

- Page:
- Segment: top / middle / bottom / named
- Approved concept image path:
- Approval status and notes:
- Concept ratio: 16:9
- Concept viewport size:
- Intended browser viewport for matching:
- Windows-like desktop widths to test:
- Existing-site mode:
- Site contract path:

## Section Bounds

Record every visible section in this segment.

| Section / region | Top Y | Bottom Y | Height | Left X | Right X | Width | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |

## Grid And Columns

- Page content max width:
- Outer margins:
- Column count:
- Column width estimate:
- Gutter estimate:
- Sidebar / rail widths:
- Card grid columns and gaps:
- Alignment rules:

## Typography Contract

Record visible text that must match the segment.

| Element | Font family / fallback | Size estimate | Line-height | Weight | Case | Expected lines | One-line required | Expected wrapping | Width constraint |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| H1 / heading |  |  |  |  |  |  | yes / no |  |  |
| Nav labels |  |  |  |  |  |  | yes / no |  |  |
| Button labels |  |  |  |  |  |  | yes / no |  |  |
| Chips / badges |  |  |  |  |  |  | yes / no |  |  |
| Search/input placeholder |  |  |  |  |  |  | yes / no |  |  |
| Card titles/body |  |  |  |  |  |  | yes / no |  |  |
| Table headers/cells |  |  |  |  |  |  | yes / no |  |  |
| Metric labels |  |  |  |  |  |  | yes / no |  |  |
| Footer links |  |  |  |  |  |  | yes / no |  |  |

## Text Fit And Overflow Rules

- Nav item fit:
- Button/chip one-line requirements:
- Search placeholder alignment:
- Card text wrapping:
- Table cell wrapping or truncation:
- Metric label wrapping:
- Footer link wrapping:
- Horizontal scrollbar allowed: no, unless explicitly justified here
- Clipping allowed: no, unless explicitly justified here
- Elements allowed to clip and why:
- Elements allowed to scroll internally and why:

Visible concept text must remain fully readable. Do not use `overflow: hidden`, clipping, or fixed heights to hide layout failures unless this contract explicitly names the clipped element and reason.

## Segment Assembly Rules

- How this segment connects to previous segment:
- How this segment connects to next segment:
- Repeated elements that must stay consistent across segments:
- Shared shell regions:
- Components consumed from catalog:
- Page-specific CSS boundary:

## QA Acceptance Criteria

- Segment screenshot captured at the concept ratio.
- Segment screenshot captured at common desktop widths, including Windows-like browser widths.
- Typography visually matches font family, weight, size, line-height, heading width, button label wrapping, nav label fit, and input placeholder alignment.
- Text-fit QA passed for nav, buttons, search placeholders, cards, chips, tables, metric labels, and footer links.
- No document-level horizontal scrollbar.
- No nav overlap.
- One-line labels remain one line where required by the concept.
- Custom fonts are loaded before tokens/component/page CSS when the brand system declares them.
- Segment is approved before the final page assembly pass.

