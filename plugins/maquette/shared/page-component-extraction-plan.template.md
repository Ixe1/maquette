# Page Component Extraction Plan

Status: draft after page concept segment approval and before component close-up extraction or implementation.

Use this plan in experimental concept-first runs. The approved page concept is the visual source for component discovery. Extract only what the page actually needs, then update `.maquette/components/component-coverage-plan.md` before creating or extending reusable component artifacts.

## Source Concept

- Page:
- Approved concept segment paths:
  - Top:
  - Middle:
  - Bottom:
- Concept aspect / framing: 16:9 desktop segments
- Existing-site mode:
- Reference page or site contract:
- Notes:

## Extraction Strategy

- Use `image_gen` edit mode on the approved concept segments by default to create clean 1:1 close-up images for the components that need implementation or extension.
- When `shared/template-images/component-closeup-template-v1.png` is available, use it as a neutral framing scaffold for close-up edits unless it makes the output generic, crowded, or less faithful to the approved concept.
- Use deterministic crops only when they already provide a clean 1:1 close-up or when image editing is unavailable; document the reason.
- Keep extracted component visuals faithful to the approved page concept segments. Do not invent a new component direction.
- Prefer one component family per 1:1 close-up. Combine only tightly related small pieces that are visually inseparable in the concept.
- Do not ask `image_gen` to render CSS text on component images in this experimental workflow unless the user explicitly requests the legacy CSS-contract poster route.
- Do not create a global component for one-off page composition unless likely reuse is documented.
- Implement and visually review one close-up at a time before moving to the next component close-up.
- Component and page screenshots used for visual review must be no larger than 1254x1254. Long pages or tall component references should be reviewed as scrolled segments.

## Candidate Components From Concept

| Concept region | Candidate component/family | Reuse / extend / create / page-specific | Existing API or gap | Extraction artifact needed | Reason |
| --- | --- | --- | --- | --- | --- |
|  |  | reuse / extend / create / page-specific |  | none / 1:1 close-up edit / deterministic crop / legacy CSS-contract poster if explicitly requested |  |

## Extraction Artifacts

### Artifact: `<page-slug>-<component-slug>`

- Source concept region:
- Purpose:
- Artifact type: 1:1 component close-up edit / deterministic crop / legacy CSS-contract poster if explicitly requested
- Expected close-up path:
- Source concept segment path:
- Template image path, if used:
- Optional legacy CSS-contract poster path, only if explicitly requested:
- Required transcribed contract path, only if a legacy poster is used:
- Intended component API targets:
  - `.c-example`
- Visible anatomy, variants, states, slots, density, motion, responsive, and accessibility notes:
- Reuse/extend/create decision:
- Component coverage plan update:
- Rendered component screenshot path, max 1254x1254:
- Visual match status:
- Status: planned / close-up-created / rejected / implemented / screenshot-matched
- Rejection reason, if any:

## Component Coverage Handoff

- `.maquette/components/component-coverage-plan.md` updated:
- Existing components reused:
- Existing components extended:
- New reusable gaps:
- Page-specific composites kept out of global catalog:
- New component close-ups requested:

## Fidelity Notes

- Regions that must visually clone the concept:
- Acceptable deviations:
- Details that require close-up component screenshot review:
- Details that require segmented page screenshot review:
- Mobile/tablet implications visible or inferred:

## Readiness Checklist

- Approved page concept exists before extraction starts.
- Each extracted component maps to a visible concept region.
- Existing component APIs were checked before new components were requested.
- Every new component artifact has a reuse/extend/create reason.
- 1:1 component close-ups are focused, faithful to the concept, and readable at normal preview size.
- No component close-up asks `image_gen` to render CSS text unless the user explicitly requested the legacy CSS-contract poster route.
- Each close-up will be implemented and screenshot-matched before the next close-up is treated as done.
- All component and page screenshots used for visual comparison are capped at 1254x1254 or split into segments.
- Page implementation will wait for reusable component API readiness.
