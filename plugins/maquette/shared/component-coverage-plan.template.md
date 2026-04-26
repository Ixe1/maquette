# Component Coverage Plan

Status: draft before any component CSS-contract poster is generated.

## Source Review

- User brief:
- Requested page or pages:
- Existing website/app shell inspected:
- Existing component catalog:
- Existing contract CSS files:
- Existing component CSS/JS:
- Existing replica/gallery files:
- Existing-site integration notes:

## Required Families For Current Request

List only the reusable component families needed for the current request.

| Need | Page/region | Existing coverage | Decision | Reason |
| --- | --- | --- | --- | --- |
|  |  |  | reuse / extend / create / page-specific |  |

## Likely Future Reusable Families

List candidates worth considering later. Do not build these unless the current request needs reusable coverage.

- Candidate:
- Why it may be useful later:
- Why it is not built now:

## Existing Coverage Map

Record where existing components already cover the need.

- Component:
- API / variants / slots / states used:
- Evidence path:
- Notes:

## Extension Decisions

Use this section when an existing component only needs a variant, state, slot, density, or behavior extension.

- Existing component:
- Missing extension:
- Selector or API boundary:
- Why extension is cleaner than a new component:

## Reusable Component Gaps

Use this section only for structurally new reusable needs that cannot be represented cleanly by existing APIs.

- Gap:
- Why existing components are insufficient:
- Expected consumers:
- Required states and responsive behavior:

## Page-Specific Composites

List page-only arrangements that should not become global components unless later reuse proves the need.

- Composite:
- Page/region:
- Components composed:
- Why this stays page-specific:

## CSS-Contract Poster Batches

Define focused batches before image generation. Each batch should cover one major family by default, or at most two tightly related small families. Prefer roughly 8 to 16 meaningful selectors per poster.

### Batch: `<batch-slug>`

- Purpose:
- Why this poster is needed before implementation:
- Reuse/extend/create decisions covered:
- Selector allowlist:
  - `.c-example`
- Variants, states, slots, density, motion, responsive, and accessibility notes:
- Expected contract path:
- Poster status: planned / generated / rejected / split / implemented
- Rejection or split reason, if any:

## Later Page Updates

When a later page reveals missing coverage, update this plan before generating any new component poster.

- Date / page:
- Newly discovered need:
- Reuse/extend/create decision:
- Result:

## Readiness Checklist

- Existing components were checked before new posters were planned.
- Every new poster has a focused selector allowlist and a reason.
- No poster exists only because a new page is being built.
- Page-specific composites are separated from reusable component gaps.
- New reusable gaps have expected consumers and required states.
- CSS-contract posters remain readable, scoped, and implementation-ready.
