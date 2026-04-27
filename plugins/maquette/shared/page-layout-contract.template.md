# Page Layout Contract

Status: draft before implementation.

## Source References

- Page concept:
- Page concept segments:
  - Top:
  - Middle:
  - Bottom:
- Brand board:
- Component catalog:
- Component contract or sheet references:
- Site contract, when existing-site mode is active:
- Existing reference page, when applicable:
- Segment layout contracts:

## Global Layout

- Page max width:
- Section width behavior:
- Inline margin rhythm:
- Vertical rhythm:
- Desktop breakpoint notes:
- Desktop concept ratio:
- Desktop concept viewport sizes:
- Windows-like desktop widths to test:
- Tablet breakpoint notes:
- Mobile breakpoint notes:

## Segment Contracts

Each approved desktop concept segment must have a separate segment layout contract before coding.

| Segment | Concept path | Layout contract path | Viewport | Sections covered | QA status |
| --- | --- | --- | --- | --- | --- |
| top |  |  | 16:9 desktop |  | planned / pass / fail |
| middle |  |  | 16:9 desktop |  | planned / pass / fail |
| bottom |  |  | 16:9 desktop |  | planned / pass / fail |

## Section Contracts

For each visible concept region, record compact implementation guidance before writing code.

### Header / Navigation

- Existing-site mode source / lock:
- Desktop:
- Tablet:
- Mobile closed:
- Mobile open:
- Height / density:
- Sticky or static behavior:

### Hero

- Target height / min-height:
- Media aspect and crop:
- Text block width:
- CTA row behavior:
- Mobile stacking:

### Main Content Sections

- Region:
- Target height / compactness:
- Grid or stack:
- Media aspect and crop:
- Component APIs used:
- Mobile behavior:

### Terminal Sections

- Impact / CTA strip:
- Newsletter:
- Footer:
- Legal / bottom row:
- Existing-site mode source / lock:
- Target compactness:
- Mobile behavior:

## Existing Site Integration

- Existing-site mode: yes / no
- Site contract path:
- Reference page path:
- Shared CSS entrypoints reused:
- Shared JS entrypoints reused:
- Page-specific CSS boundary:
- Page-specific JS boundary:
- Locked shell regions preserved:
- Documented shell deviations / waivers:

## Image Container Rules

- Every major media region must state its intended aspect ratio or min-height.
- Images intended to fill a media container must use explicit sizing and `object-fit`.
- Blank bands, letterboxing, or visible parent backgrounds around fitted media are deviations unless documented as intentional.

## Typography And Text Fit Rules

- Shared font-loading asset required:
- `.maquette/brand/fonts.css` path:
- Font CSS imported before tokens/component/page CSS:
- Heading width and line count:
- Nav label fit:
- Button and chip one-line requirements:
- Search/input placeholder alignment:
- Card text wrapping:
- Table text wrapping:
- Metric label wrapping:
- Footer link wrapping:
- Horizontal scrollbar allowed:
- Clipping allowed:
- Contract-approved clipped elements:

Visible concept text must remain fully readable. Do not use clipping or `overflow: hidden` to hide layout failures unless a segment contract explicitly allows clipped content for the named element.

## Deviations Accepted Before Coding

- Deviation:
- Reason:
- Follow-up:

## Review Checklist

- Top, middle, and bottom page regions have explicit layout contracts.
- Top, middle, and bottom desktop concept segments each have segment layout contracts.
- Segment screenshots match the approved 16:9 browser screenshot concepts before final page assembly.
- Typography QA compares font family, weight, size, line-height, heading width, button label wrapping, nav label fit, and input placeholder alignment.
- Text-fit QA covers nav, buttons, search placeholders, cards, chips, tables, metric labels, and footer links.
- Custom fonts declared by the brand system are loaded through `.maquette/brand/fonts.css` before dependent CSS.
- No layout failure is hidden with clipping or `overflow: hidden` unless explicitly allowed by a segment contract.
- The bottom third of the page has been compared against the concept, not just the hero.
- Repeated cards have shared anatomy and aligned action rows.
- Rich footer details are either implemented or explicitly recorded as intentional deviations.
- Existing-site shell regions are either preserved from the site contract or covered by documented waivers.
- Section density and compactness match the concept closely enough for the page type.
