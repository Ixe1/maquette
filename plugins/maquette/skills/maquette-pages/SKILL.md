---
name: maquette-pages
description: Create website page concepts from approved brand and component references using image_gen first, then implement them with existing reusable components before adding any new composites.
---

You are responsible for the **website page and screen phase**.

## Preconditions

Use this skill after the component library exists.

Preferred inputs:
- `ui/brand/design-system.json`
- `ui/components/component-catalog.json`
- approved brand-board image
- approved component-sheet image or images

Hard gate:
- If `ui/brand/design-system.json`, `ui/brand/tokens.css`, or a generated and inspected brand board image is missing, do not create a page concept. Run the brand-kit phase first using `maquette-brand-kit`.
- If `ui/components/component-catalog.json`, `ui/components/components.css`, `ui/components/gallery.html`, or a generated and inspected component sheet image is missing, do not create a page concept. Run the component-library phase first using `maquette-components`.
- If the requested page needs components, dense data patterns, or reusable composites that are not covered by the existing component catalog or inspected component-sheet references, run or request the component-library phase first to create the missing focused sheet or sheets. Do not silently invent significant new component language inside the page phase.
- Do not treat an existing website, screenshot, copied CSS, or style notes as a substitute for the brand kit and component library.
- In a one-shot `maquette` workflow, earlier phases may be marked provisional, but they still must exist before this phase starts.

## Non-negotiable image_gen policy

If the `image_gen` tool is available, you **must use it** before implementation.
Follow `shared/image-gen-workflow.md` for required visual inspection, same-turn continuation, and conditional transparent PNG verification.
Do not skip directly to code-only page design unless the user explicitly asks you to.
The page concept image is the creative design artifact for the page and should guide layout, hierarchy, density, and style.

Use image generation to:
- create a new page concept from the approved brand board and component sheet or sheets, or
- edit an existing concept image to refine the page while preserving the approved visual language

If editing a local reference image, first make it visible in the conversation with `view_image`, then ask `image_gen` to edit the visible image.

After every `image_gen` create or edit step, inspect the generated image with `view_image` before treating it as the design source. Do not derive page blueprints, layout decisions, or implementation details from the prompt alone. If the generated file cannot be inspected, state that limitation and treat the image as unverified.

Only skip image generation if:
- the user explicitly tells you not to use it, or
- the environment genuinely does not provide the tool

## Required outputs

For each page, create or update a folder like:

- `ui/pages/<page-name>/page-blueprint.json`
- `ui/pages/<page-name>/page.html`
- `ui/pages/<page-name>/page.css`
- `ui/pages/<page-name>/page.js`
- `ui/pages/<page-name>/review.md`

When applicable, also create:

- `ui/pages/<page-name>/concept.png`
- `ui/pages/<page-name>/page.png`

The blueprint JSON must validate against `shared/page-blueprint.schema.json`.

## Workflow

1. Read the approved design system and component catalog.
2. Check component coverage before page concept work.
   - Reuse existing components first.
   - Identify any missing primitives, dense data patterns, or larger reusable composites needed by the page.
   - If missing coverage is significant, run or request `maquette-components` to create the focused component/composite sheet before continuing.
3. If `image_gen` is available, create or edit a page concept using the approved references and `assets/page-concept-prompt.md`.
   - Inspect the generated page concept with `view_image` before writing the page blueprint or implementation.
4. Reuse existing components first.
5. Translate the page concept into code using the component library before adding any new composite patterns.
6. Only create a new composite when the page clearly needs a pattern that the library does not already cover and the visual/reference component coverage exists.
7. Update the page blueprint to document composition and any new composites.
8. Capture screenshots when possible and compare them to the concept and approved references.
   - Keep Playwright/Chromium screenshot capture headless.
   - Ensure every browser/session opened for screenshot capture is closed before finishing.
   - If cleanup fails, record the failed cleanup command or operation in the final response.
   - Capture desktop, tablet, and mobile page screenshots when possible; at minimum use representative widths 390, 768, and 1440 when browser tooling is available.
9. Run the required page QA pass:
   - Compare the top and bottom of the coded page against the concept, especially headers, navigation, newsletter bands, footers, bottom ribbons, and final calls to action.
   - Check that repeated/global regions preserve the concept's structure, not just its colors: logo placement, link-column count, approved secondary marks/seals, social links, legal links, and bottom strips should be implemented when shown in the concept.
   - Check that social links and compact action controls render as recognizable icons with accessible names. Do not substitute visible text abbreviations such as `YT`, `IG`, or `FB` unless the concept explicitly uses text badges.
   - Check that icon-only buttons and compact controls visibly render supported icons and are not blank.
   - Check whole-page screenshots, not only above-the-fold. Inspect top, middle or data-heavy sections, and footer or terminal sections.
   - Check first, middle, and last viewport screenshots; do not only review the hero or above-the-fold content.
   - Run measurable responsive overflow QA when browser tooling is available. Prefer `shared/scripts/audit-responsive-layout.mjs` if present.
   - Test at least viewport widths 390, 768, 1024, 1280, and 1440.
   - Prefer capturing full-page screenshots for all audited widths when practical.
   - For each tested viewport, record `window.innerWidth`, `document.documentElement.scrollWidth`, `document.body.scrollWidth`, and clientWidth/scrollWidth for wide components such as tables, grids, timelines, charts, calendars, code blocks, and comparison matrices.
   - Record top overflow offenders when any are present.
   - Fail and fix the page if document scroll width exceeds viewport width by more than 1px, unless there is an explicit documented exception.
   - Internal horizontal scrolling for wide components is allowed only when intentional and documented. It should generally not appear on normal desktop or tablet layouts unless the component is truly a data grid that requires it.
   - If a footer, header, or terminal section is simplified from the concept, either fix it or record the intentional reason in `review.md`.
10. Record mismatches, follow-up edits, measured responsive overflow results, screenshot paths, accepted scroll exceptions, and icon-rendering notes in `review.md`.

## Low-resolution reference rule

Concept images are **composition and hierarchy guides**, not pixel rulers.
When the concept image is small or compressed:
- infer spacing from the approved token rhythm
- infer typography from the approved type scale
- infer responsive behavior from the existing layout system
- avoid measuring every visible pixel

## Consistency rules

- Do not silently introduce a new brand direction.
- Prefer already-approved primitives and states.
- Do not silently introduce significant new component language that is absent from the approved or provisional component references.
- Keep page code composable so later pages can reuse sections and composites.
- The concept image should drive the creative direction; the code should faithfully implement that direction using approved components first.
- Page implementation fidelity applies to the whole page, including terminal sections such as newsletter and footer areas. Do not let the footer degrade into a generic link list when the concept shows a branded footer composition.
- Icon-like controls in the concept must stay icon-like in code. Social actions, utility actions, and circular/footer controls need visible icon glyphs plus accessible labels, not short visible text placeholders.
