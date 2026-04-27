# Component Coverage Plan

Status: draft before any component close-up image or optional legacy CSS-contract poster is generated.

## Source Review

- User brief:
- Requested page or pages:
- Approved page concept, if concept-first:
- Page component extraction plan:
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

Define focused batches before image generation. The default component artifact in this experimental workflow is a focused 1:1 visual component close-up edited from the approved page concept, not a CSS text-on-image poster. Each batch should cover one major family by default, or at most two tightly related small families that are visually inseparable. Record intended component API targets so implementation remains reusable even though the image is visual.
In concept-first runs, derive these batches from `.maquette/pages/<page-name>/component-extraction-plan.md` and the approved concept regions rather than a generic component taxonomy. Use legacy CSS-contract posters only when the user explicitly asks for that route or when a documented fallback is required.

### Batch: `<batch-slug>`

- Purpose:
- Artifact type: 1:1 visual component close-up / deterministic crop / legacy CSS-contract poster if explicitly requested
- Why this close-up is needed before implementation:
- Reuse/extend/create decisions covered:
- Intended component API targets:
  - `.c-example`
- Visible anatomy, variants, states, slots, density, motion, responsive, and accessibility notes:
- Expected close-up path:
- Source concept path:
- Optional legacy poster path, only if explicitly requested:
- Required transcribed contract path, only if a legacy poster is used:
- Rendered component screenshot path, max 1024x1024:
- Visual match notes:
- Artifact status: planned / generated / rejected / split / implemented
- Rejection or split reason, if any:

## Later Page Updates

When a later page reveals missing coverage, update this plan before generating any new close-up or optional legacy poster.

- Date / page:
- Newly discovered need:
- Reuse/extend/create decision:
- Result:

## Readiness Checklist

- Existing components were checked before new close-ups were planned.
- Every new close-up has a focused family, intended API targets, source concept region, and a reason.
- No component image exists only because a new page is being built.
- Page-specific composites are separated from reusable component gaps.
- New reusable gaps have expected consumers and required states.
- Component close-ups remain focused, visually inspectable, faithful to the approved concept, and implementation-ready.
- Codex will inspect one close-up at a time, implement reusable HTML/CSS/JS, capture a rendered screenshot no larger than 1024x1024, compare, and fix before moving on.
- Legacy CSS-contract posters, when explicitly requested, remain separate focused text-on-image artifacts with strict selector allowlists.
