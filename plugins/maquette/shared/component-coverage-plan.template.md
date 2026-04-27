# Component Coverage Plan

Status: draft before any CSS-contract poster or optional visual component sheet is generated.

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

## Component Image Batches

Define focused batches before image generation. CSS-contract posters are the default component sheet images. Each batch should cover one major family by default, or at most two tightly related small families. Record intended component API targets and a strict selector allowlist so implementation remains reusable and the text-on-image poster stays readable. Use visual component sheets only as optional supplements when visual anatomy, density, spacing, hierarchy, or polish needs clarification.

### Batch: `<batch-slug>`

- Purpose:
- Artifact type: CSS-contract poster / optional visual component sheet / both
- Why this poster or optional visual sheet is needed before implementation:
- Reuse/extend/create decisions covered:
- Intended component API targets:
  - `.c-example`
- Selector allowlist for CSS-contract poster:
  - `.c-example`
- Variants, states, slots, density, motion, responsive, and accessibility notes:
- Expected poster path:
- Required transcribed contract path:
- Optional visual supplement path:
- Artifact status: planned / generated / rejected / split / implemented
- Rejection or split reason, if any:

## Later Page Updates

When a later page reveals missing coverage, update this plan before generating any new poster or optional visual sheet.

- Date / page:
- Newly discovered need:
- Reuse/extend/create decision:
- Result:

## Readiness Checklist

- Existing components were checked before new posters were planned.
- Every new poster has a focused family, intended API targets, selector allowlist, and a reason.
- No sheet or poster exists only because a new page is being built.
- Page-specific composites are separated from reusable component gaps.
- New reusable gaps have expected consumers and required states.
- CSS-contract posters remain readable, scoped, selector-limited, and implementation-ready.
- Optional visual component sheets remain focused, inspectable, and used only when they add clarity.
