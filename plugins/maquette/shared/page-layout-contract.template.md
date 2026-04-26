# Page Layout Contract

Status: draft before implementation.

## Source References

- Page concept:
- Brand board:
- Component catalog:
- Component contract or sheet references:
- Site contract, when existing-site mode is active:
- Existing reference page, when applicable:

## Global Layout

- Page max width:
- Section width behavior:
- Inline margin rhythm:
- Vertical rhythm:
- Desktop breakpoint notes:
- Tablet breakpoint notes:
- Mobile breakpoint notes:

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

## Deviations Accepted Before Coding

- Deviation:
- Reason:
- Follow-up:

## Review Checklist

- Top, middle, and bottom page regions have explicit layout contracts.
- The bottom third of the page has been compared against the concept, not just the hero.
- Repeated cards have shared anatomy and aligned action rows.
- Rich footer details are either implemented or explicitly recorded as intentional deviations.
- Existing-site shell regions are either preserved from the site contract or covered by documented waivers.
- Section density and compactness match the concept closely enough for the page type.
