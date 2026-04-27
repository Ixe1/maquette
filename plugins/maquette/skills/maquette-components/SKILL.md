---
name: maquette-components
description: "Build a reusable website component library from an approved brand token set. This skill is image_gen-guided: create focused CSS-contract component sheet images by default, with visual sheets available as optional fidelity supplements, then implement componentized replicas that are reusable HTML/CSS/JS from the start."
---

You are responsible for the **website component-library phase**.

Write all Maquette-owned component artifacts under `.maquette/components/` in the current project. Do not create or overwrite root-level website files such as `index.html`.

## Preconditions

Do not start this phase until a brand system exists at:

- `.maquette/brand/design-system.json`
- `.maquette/brand/tokens.css`

Also require a generated and inspected brand board image, such as `.maquette/brand/brand-board-vN.png`, unless the user explicitly asks to skip image generation or the environment does not provide `image_gen`.

If these artifacts are missing, do not invent a component library from raw notes, copied CSS, screenshots, or an existing website alone. Run the brand-kit phase first using `maquette-brand-kit`.

Require user approval of the generated and inspected brand board before expanding the library. In a one-shot unattended `maquette` workflow where the user explicitly asked not to pause, proceed with the brand kit as provisional and record that status.

## Non-negotiable image_gen policy

If the `image_gen` tool is available, you **must use it** in this phase.
Follow `shared/image-gen-workflow.md` for required visual inspection, same-turn continuation, and conditional transparent PNG verification.
Do not go straight from tokens to coded components with no image pass.
Focused CSS text-on-image component sheets are the default design and implementation artifacts. Visual component sheets remain available when the user explicitly asks for visual sheets, when the CSS-contract poster is too abstract to convey anatomy or visual polish, or when a focused visual supplement would materially improve fidelity.

Before any CSS-contract poster or optional visual component sheet is generated, create or update `.maquette/components/component-coverage-plan.md`, using `shared/component-coverage-plan.template.md` when present. The plan must inspect the user brief, requested pages, existing website/app shell when present, existing `.maquette/components/component-catalog.json`, existing `.maquette/components/contracts/*.contract.css`, existing component CSS/JS, and replica/gallery examples. Document every reuse, extension, new component, and page-specific composite decision there before image generation.

Do not create new component sheets just because a new page is being built. New pages should consume the existing component catalog first. Extend an existing component only when the missing need is a variant, state, slot, density, or behavior of that component. Create a new reusable component only when the need is structurally different and cannot be represented cleanly by existing APIs. Page-specific composites should stay page-specific unless likely reuse is documented.

Use image generation to:
- create a focused 1:1 CSS-contract component sheet poster for the current component family from the approved brand board, design-system tokens, product brief, and coverage-plan decision
- create additional focused 1:1 CSS-contract posters one at a time only when the coverage plan identifies missing reusable component, data-pattern, or composite coverage
- create or edit a focused 1:1 visual component sheet only when the user explicitly asks for one, the CSS-contract poster is too abstract to guide visual anatomy, or a visual supplement is needed for fidelity

Default CSS-contract component-sheet workflow:
- generate one focused 1:1 CSS-contract poster from the approved brand board, design-system tokens, product brief, coverage-plan rationale, and strict selector allowlist
- use `assets/component-css-contract-prompt.md` by default
- do not render a visual component sheet for that batch unless the user asks for one or the CSS-contract poster is too abstract to guide anatomy and visual polish accurately
- inspect the generated sheet with `view_image` before writing code
- transcribe the inspected poster into `.maquette/components/contracts/<batch-slug>.contract.css` before writing implementation CSS
- translate any raw colors, sizes, or font stacks back to approved token variables before writing final CSS
- record in the batch review that the source artifact is a CSS-contract component sheet
- treat the coded browser screenshot as the validation artifact for visual fidelity, reusable API quality, states, accessibility, and responsive behavior

When a page or site has global navigation, responsive navigation primitives are required component coverage, not a page-only afterthought.

The focused CSS-contract poster is the default source of truth for component APIs, selectors, anatomy, variants, state styling, density, spacing, radius, shadows, motion/effect moments, accessibility hooks, responsive notes, and performance-safe implementation guidance. If it conflicts with the brand board, preserve the brand foundation where possible, but the current component artifact wins for component anatomy, variants, state styling, density, spacing, radius, shadows, and polish; record the inconsistency and resolution in `.maquette/components/approved.md`.

The CSS-contract component sheet is a readable text-on-image contract, but not a license to build a page stylesheet or overstuff a single image. Keep each poster focused enough that GPT-5.5/Codex can inspect the selectors, states, slots, motion notes, and responsive implications without guessing. If the poster is unreadable, generic, crowded, or tries to show too many unrelated families, regenerate with fewer selectors or split the family before implementation. Generate a visual component sheet only when the user explicitly asks for it or when the CSS-contract route needs a visual anatomy supplement.

The component-library phase has one implementation target:
- **Componentized replica/reference**: `.maquette/components/replica-gallery.html`, `.maquette/components/css/components.css`, `.maquette/components/js/components.js`, and `.maquette/components/component-catalog.json` match the approved CSS-contract posters and any optional visual supplements while exposing reusable components, variants, states, slots, and usage examples for the pages phase.

Do not build a throwaway visual replica and then a separate simplified gallery. The coded replica/reference must use reusable classes, tokens, component slots, state hooks, and JS behaviors from the start so pages can consume the component API without copying the sheet layout.

If a local board or sheet image must be edited, first make it visible in the conversation with `view_image`, then ask `image_gen` to edit the visible image.

After every `image_gen` create or edit step, inspect the generated image with `view_image` before treating it as the design source. Do not derive component specifications or implementation details from the prompt alone. If the generated file cannot be inspected, state that limitation and treat the image as unverified.
Reject, regenerate, or split a sheet before implementation if it is not readable and useful at normal preview size.

When image-worker subagents are explicitly authorized for the current run, run CSS-contract poster generation, optional visual component-sheet generation, and image editing in a dedicated image worker subagent. If the image-worker decision is unresolved, follow the preflight authorization question in `shared/image-gen-workflow.md`; do not silently skip the image-worker path. The worker should return the exact saved image path and the project-local `.maquette/components/component-sheet-*-vN.png` path. The main workflow must inspect the returned image with `view_image`, inventory it, transcribe CSS-contract posters, and perform implementation and QA. Generate in the main workflow only when image workers are explicitly declined, unavailable after asking, or explicitly bypassed by unattended/no-question language; record the exact reason.

Only skip image generation if:
- the user explicitly tells you not to use it, or
- the environment genuinely does not provide the tool

## Required outputs

Always create or update:

- `.maquette/components/component-coverage-plan.md`
- `.maquette/components/component-catalog.json`
- `.maquette/components/sheet-inventory.md`
- `.maquette/components/sheet-implementation-log.md` when more than one sheet is needed
- `.maquette/components/css/components.css`
- `.maquette/components/js/components.js`
- `.maquette/components/replica-gallery.html`
- `.maquette/components/approved.md`

For each poster or optional visual-sheet batch in a multi-artifact run, also create immutable category-prefixed batch evidence directly under `.maquette/components/` before generating the next artifact:

- `contracts/<batch-slug>.contract.css` for each default CSS-contract poster batch
- `<batch-slug>.replica.html`
- `css/<batch-slug>.components.css`
- `js/<batch-slug>.components.js` when the batch needs behavior
- `<batch-slug>.component-catalog.json`
- `<batch-slug>.review.md`

Keep transcribed poster contracts under `.maquette/components/contracts/`, implementation CSS under `.maquette/components/css/`, and JS under `.maquette/components/js/`. Do not put batch artifacts in nested per-batch folders by default; nested folders are legacy-compatible only.

When possible, also create:

- `.maquette/components/replica-gallery.png`
- default CSS-contract poster images such as `.maquette/components/component-sheet-forms-css-contract-vN.png`, `.maquette/components/component-sheet-data-css-contract-vN.png`, or `.maquette/components/component-sheet-composites-css-contract-vN.png` when needed
- optional focused visual supplement images such as `.maquette/components/component-sheet-forms-visual-vN.png` when a visual anatomy supplement is needed

The catalog JSON must validate against `shared/component-catalog.schema.json`.

## Workflow

1. Read `.maquette/brand/design-system.json` and `.maquette/brand/tokens.css`.
2. Run the optional QA tooling check before generating component sheets, CSS-contract posters, or component code.
   - Use `shared/scripts/ensure-qa-tooling.mjs --project . --check-browser` when the script is available.
   - Treat partial QA availability as missing QA tooling. For example, if `playwright` and `ajv` are available but `ajv-formats` is missing, browser QA can run but schema validation is still blocked.
   - If `ensure-qa-tooling.mjs` reports any missing packages, blocked QA capabilities, or `installDecisionRequired: true`, ask the user through the Codex user-input/question tool whether to install `playwright`, `ajv`, and `ajv-formats` in the current project before generating component sheets or CSS-contract posters. Use explicit yes/no choices.
   - Do not silently continue with manual JSON syntax validation in place of schema validation when only `ajv-formats` or `ajv` is missing. Ask first, unless the user already declined installation for this run or the environment cannot install packages.
   - If the user agrees, run `npm i -D playwright ajv ajv-formats` and `npx playwright install chromium`, then continue with automated QA.
   - If the user declines or the install is not possible, continue with manual review and record the missing tooling in `.maquette/components/approved.md`.
   - Do not postpone this decision until after component implementation.
3. Create or update `.maquette/components/component-coverage-plan.md` before generating images.
   - Use `shared/component-coverage-plan.template.md` when present.
   - Inspect the user brief, requested pages, existing website/app shell when present, existing `.maquette/components/component-catalog.json`, existing `.maquette/components/contracts/*.contract.css`, existing component CSS/JS, and replica/gallery files.
   - Infer required component families for this project instead of using a fixed universal sheet list.
   - List required component families for the current request and likely future/reusable families that should be considered but not overbuilt.
   - Map current needs to existing component APIs, variants, slots, states, density, and behavior.
   - Document which needs are covered by existing components, which need only an extension, which are true reusable component gaps, and which are page-specific composites that should not become global components yet.
   - Examples: a server card should use existing `c-card` anatomy with a `c-card--server` variant or page composition when possible; an advanced filter drawer should extend drawer/dialog primitives; a status pill should extend badge unless semantics and states justify a separate component; a pricing card should become a focused composite only when the base card cannot cleanly express price/action anatomy.
   - Define focused CSS-contract poster batches from those decisions. Each batch must explain why the poster is needed before image generation.
   - For every poster, define the intended component API and strict selector allowlist before image generation so implementation remains reusable. Keep one major component family per poster by default. Combine at most two tightly related small families only when the poster will remain readable and inspectable.
   - Do not generate a new component artifact when the plan says reuse or page-specific composition is enough.
   - If a later page reveals missing reusable coverage, update the plan first, then generate only the newly justified focused poster.
   - Use a visual component sheet only as an optional supplement when the user requests it or the focused CSS-contract poster does not provide enough visual anatomy clarity.
4. Process each sheet or poster batch sequentially. Do not generate all planned component artifacts before implementation.
   - Generate or revise exactly one focused artifact for the current coverage-plan batch using the approved brand board.
   - Default workflow: generate a focused 1:1 CSS-contract poster using `assets/component-css-contract-prompt.md`, the coverage-plan rationale, the current component family, and the strict selector allowlist.
   - Optional visual supplement workflow: generate a focused 1:1 visual component sheet using `assets/component-sheet-prompt.md` only when the user explicitly requests it, the CSS-contract poster is too abstract to guide visual anatomy, or a visual supplement is needed to clarify density, spacing, hierarchy, or polish.
   - It is a workflow violation to generate any later planned artifact before the current sheet or poster has completed batch evidence.
   - Inspect the generated sheet or poster with `view_image` before implementing any code from it.
   - Update `.maquette/components/sheet-inventory.md` for that artifact with contracted or visible component families, variants, states, larger patterns, unreadable/unclear/cramped areas, missing coverage, required raster asset types, and the decision to implement, regenerate, split, or create another focused artifact.
   - Transcribe every inspected CSS-contract poster into `.maquette/components/contracts/<batch-slug>.contract.css` before writing implementation CSS. This file is the human-readable bridge from image text to code: preserve selector intent, states, slots, and sizing guidance, remove OCR mistakes, omit any rejected non-component selectors, and annotate any unreadable or intentionally normalized rule.
   - Reject, regenerate, or split a visual sheet if it contains too many components, labels are too small, unrelated families are crammed into tiny cells, components overlap, full tables or dashboards crowd out the focused family, implementation notes dominate, decorative details obscure component anatomy, or the image cannot guide implementation without heavy zooming.
   - Reject, regenerate, or split a CSS-contract poster if text is too small, low contrast, crowded, non-component selectors appear, `body`/`html`/gallery/panel/reset/page-layout rules dominate, selectors outside the allowlist appear, more than the planned focused families appear, unrelated families are crowded together, or the poster is too generic to guide implementation beyond common defaults.
   - If the current artifact passes inspection, build that batch's artifacts and complete screenshot/manual review before generating the next component artifact.
5. Build the coded componentized replica/reference as a batch-by-batch fidelity target.
   - Maintain `.maquette/components/replica-gallery.html` as the combined component reference.
   - For multi-artifact runs, first create `.maquette/components/<batch-slug>.replica.html` for the current sheet or poster, with CSS in `.maquette/components/css/<batch-slug>.components.css` and JS in `.maquette/components/js/<batch-slug>.components.js` when behavior is needed. The combined `replica-gallery.html` can be assembled or updated after the batch replica exists.
   - In the default workflow, the replica should make the CSS-contract poster reviewable in the browser while using reusable component classes, slots, state attributes, and minimal JS hooks from the start.
   - The replica should implement the transcribed poster contract's selector contract, states, slots, dimensions, token intent, visual cues, motion/effect guidance, and polish, then use the rendered browser screenshot as the visual correction target. Do not copy raw sheet hex values or font stacks when matching approved tokens exist.
   - If the batch uses an optional visual component sheet, the replica should also match the visual sheet's anatomy, variants, states, density, spacing, radius, shadows, and polish.
   - Page implementations should consume the component catalog, CSS, JS, and usage examples extracted from this componentized reference. They should not copy the reference page layout.
   - Batch replica HTML should link brand tokens directly from `../brand/tokens.css`, batch CSS from `css/<batch-slug>.components.css`, and batch JS from `js/<batch-slug>.components.js`. Prefer HTML stylesheet links over CSS `@import` so local file paths stay shallow and inspectable.
6. If screenshot tooling is available, capture the current componentized replica/reference evidence. Use Maquette's bundled scripts when possible, especially `shared/scripts/ensure-qa-tooling.mjs`, `shared/scripts/capture-browser.mjs`, `skills/maquette-components/scripts/capture-gallery.mjs`, and `shared/scripts/audit-responsive-layout.mjs`; document manual review mode when unavailable.
   - Keep Playwright/Chromium screenshot capture headless.
   - Ensure every browser/session opened for screenshot capture is closed before finishing.
   - If cleanup fails, record the failed cleanup command or operation in the final response.
   - Capture desktop, tablet, and mobile reference screenshots when possible; at minimum use representative widths 390, 768, and 1440 when browser tooling is available.
   - For every poster or optional visual-sheet batch, capture or manually review the batch replica before generating the next component artifact. Record the screenshot paths, manual artifacts, or blocked screenshot reason in `<batch-slug>.review.md`.
   - Do not mark `completed_before_next_sheet: true` unless the batch HTML, CSS, JS, catalog snapshot, review file, and screenshot/manual review evidence exist before the next component artifact is generated.
7. Compare the current coded replica against the current approved CSS-contract poster and any optional visual sheet, then make focused corrections.
   - Use the component fidelity rubric: coverage, visual match, anatomy match, responsive match, and implementation quality.
   - Coverage means every contracted or visible component family, important variant, and major state from the artifact is implemented or explicitly deferred.
   - Visual match means the rendered browser result follows the focused CSS-contract poster and the approved brand closely enough after screenshot review. If the batch uses an optional visual sheet, also verify the rendered result follows that sheet's visible anatomy and polish.
   - Anatomy match means cards, navigation, forms, tables, and composites preserve the visible structure and slot placement.
   - Responsive match means mobile, tablet, and navigation behavior documented or shown by the artifacts is represented in the componentized reference.
   - Implementation quality means semantic HTML, token usage, working icons, readable active/selected/inverse states, no unintended overflow, and no unreadable or overlapping text.
   - A score of 5 is a strong match, 4 is acceptable, 3 requires a fix or explicit documented block, and below 3 requires regeneration or rework before approval.
   - Make at least one focused correction pass when any rubric category fails before recording final status.
   - Do not generate the next component artifact until this review is complete and the current replica visibly matches the current artifact well enough to pass the rubric or has documented, intentional simplifications.
8. Merge the approved current-batch componentized replica/reference into reusable website primitives and patterns before moving to the next component artifact. Build only the families justified by the coverage plan; the following are common examples, not a universal checklist:
   - buttons
   - links
   - icon buttons
   - text inputs
   - textarea
   - select
   - checkbox
   - radio
   - switch
   - slider
   - tabs
   - responsive navigation primitives when the site has global navigation
   - badges
   - alerts
   - cards
   - product cards when the product has merchandise, pricing tiles, service cards with purchase actions, or other repeated sellable items
   - newsletter modules when the page needs newsletter capture
   - footer and social modules when the page or concept includes social links
   - tables
   - modals/tooltips if required by the design system
   - Write the current batch's component proof files under `.maquette/components/`: `contracts/<batch-slug>.contract.css` for the CSS-contract batch, `<batch-slug>.replica.html`, `css/<batch-slug>.components.css`, `js/<batch-slug>.components.js` when needed, `<batch-slug>.component-catalog.json`, and `<batch-slug>.review.md`.
   - The batch `<batch-slug>.replica.html` should be both the visual/contract fidelity proof and the reusable API proof for the current sheet or poster. The batch `<batch-slug>.component-catalog.json` should snapshot only the components covered so far or clearly mark the current batch slice.
   - Update `.maquette/components/sheet-implementation-log.md` after each batch with the sheet or poster path, transcribed contract path when present, replica artifact paths, component artifact paths, catalog snapshot path, screenshot/manual review artifacts, rubric scores, corrections made, simplifications, deferred items, and status.
   - Mark the batch as `completed_before_next_sheet: true` in the final catalog only if these batch artifacts and screenshot/manual review evidence existed before the next component sheet or poster was generated.
   - Only then continue to the next planned sheet or poster batch.
9. Keep component primitives and larger patterns conceptually separate:
   - component artifacts: reusable families, variants, states, slots, and behavior justified by the coverage plan
   - additional focused artifacts: dense data patterns and reusable larger composites only when the coverage plan identifies a real gap
   - page concept: page-level composition
10. Use semantic HTML and CSS custom properties.
11. Keep JS minimal and only add it where interactivity requires it.
12. Build the final merged componentized reference page at `.maquette/components/replica-gallery.html` after all required sheet or poster batches are complete.
   - The reference should demonstrate component APIs, slots, states, and realistic usage while preserving enough source-artifact grouping to compare sheet/poster batch by batch.
   - Include the same component families, variants, states, card anatomy, responsive navigation examples, product cards, newsletter modules, footer/social modules, density, spacing, and polish proven in the batch replicas.
   - For repeated cards, use shared media/header/body/footer/action slots, consistent badge or eyebrow placement, equal heights, and bottom-pinned action rows.
   - Link final CSS as `css/components.css` and final JS as `js/components.js`; keep the brand token stylesheet link as `../brand/tokens.css`.
13. If screenshot tooling is available, capture the final componentized reference. Use Maquette's bundled capture scripts instead of generating run-local capture code.
   - Keep Playwright/Chromium screenshot capture headless.
   - Ensure every browser/session opened for screenshot capture is closed before finishing.
   - If cleanup fails, record the failed cleanup command or operation in the final response.
   - Capture desktop, tablet, and mobile reference screenshots when possible; at minimum use representative widths 390, 768, and 1440 when browser tooling is available.
14. Run the required component QA pass:
   - Verify `.maquette/components/component-coverage-plan.md` exists and records reuse/extend/create/page-specific decisions for the current request before any new poster or optional visual sheet was generated.
   - Fail and fix if a new component was created where existing component APIs, variants, slots, states, density, or behavior could have covered the need cleanly.
   - Fail and fix if a poster was generated without a focused family, a stated need in the coverage plan, a strict selector allowlist, or readable/inspectable text at normal preview size.
   - Fail and fix if the implementation omits poster selectors, states, slots, dimensions, token intent, motion notes, responsive notes, accessibility hooks, or visual guidance. If the batch uses an optional visual sheet, also fail and fix if the reference is significantly simpler, sparser, less polished, less creative, or less sophisticated than that visual sheet.
   - Fail and fix the componentized reference if it lacks reusable component APIs, slots, states, accessibility hooks, or realistic usage examples.
   - Check CSS-contract poster and optional visual sheet coverage: every intended component API target, selector, visible component family, important variant, major state, slot, density rule, motion note, reduced-motion expectation, repeated-card anatomy pattern, responsive navigation state, product-card pattern, newsletter module, and footer/social module shown in the artifact should appear in the componentized reference or be documented as intentionally deferred with a reason.
   - Check interaction states where relevant: loading, skeleton, empty, error, offline, stale, disabled, selected/current, hover, focus-visible, active/pressed, success, permission/unavailable, mobile drawer open/closed, and filter applied/cleared.
   - Check component accessibility baseline: semantic HTML, form labels, helper/error text, table semantics for tabular data, visible focus, tap target size, contrast, non-color-only status indicators, `aria-expanded`/`aria-controls` for drawers/nav, and no hidden focus traps.
   - Check performance-safe motion: non-essential animation has `prefers-reduced-motion`, ambient loops are disabled or simplified under reduced motion, JS animation is minimal, and animations prefer `transform` and `opacity` without causing overflow or interaction delay.
   - Check icon and icon-button contrast in every visible state, especially active, selected, disabled, inverse, and dark-background states.
   - Check that icon-only buttons and compact controls visibly render supported icons and are not blank.
   - Check responsive navigation primitives when present: desktop inline nav, tablet/mobile collapsed nav, menu toggle icon, expanded menu or drawer, active link, focus state, and tap-target sizing.
   - Check variant anatomy parity: variants of the same component should preserve shared media/header/body/footer/action structure unless the difference is intentional and documented.
   - Check repeated card anatomy and alignment: product-card and comparable repeated-card grids must use shared media/header/body/footer/action slots, consistent badge or eyebrow placement, equal-height cards, flex or grid body layout, and bottom-pinned action rows so CTA, quantity, price, and action controls align across cards even when copy length varies.
   - Compare screenshots of repeated-card examples and fail QA if one card's heading, badge, label, content, or action row shifts inconsistently relative to siblings due to optional badges, labels, or differing copy length.
   - Check reference layout fit: wide components such as tables, data grids, charts, timelines, calendars, code blocks, and comparison matrices should default to full-width reference rows; horizontal scrolling should only be expected at genuinely narrow viewports.
   - Check that text, badges, icons, buttons, and table cells do not overlap or become unreadable in the captured screenshot.
   - Run measurable responsive overflow QA when browser tooling is available. Prefer `shared/scripts/audit-responsive-layout.mjs` if present.
   - Run `shared/scripts/validate-linked-assets.mjs` against each batch replica and the final `replica-gallery.html` to verify local stylesheet, script, CSS import, and asset references resolve before moving on.
   - Test at least viewport widths 390, 768, 1024, 1280, and 1440.
   - Prefer capturing full-page reference screenshots for all audited widths when practical.
   - If screenshot capture falls back to a clipped full-document image, record the capture metadata and clipped fallback status in `.maquette/components/approved.md`.
   - For each tested viewport, record `window.innerWidth`, `document.documentElement.scrollWidth`, `document.body.scrollWidth`, and clientWidth/scrollWidth for wide components such as tables, grids, timelines, charts, calendars, code blocks, and comparison matrices.
   - Record top overflow offenders when any are present.
   - Fail and fix the componentized reference if document scroll width exceeds viewport width by more than 1px, unless there is an explicit documented exception.
   - Internal horizontal scrolling for wide components is allowed only when intentional and documented. It should generally not appear on normal desktop or tablet layouts unless the component is truly a data grid that requires it.
   - Horizontal scrolling is not an acceptable default solution for primary navigation on tablet or mobile.
   - Run `shared/scripts/check-component-gallery.mjs` against `.maquette/components/replica-gallery.html` when browser tooling is available to verify active/selected/inverse contrast, required selectors, CSS/JS linkage, nav ARIA hooks, and reusable API readiness.
   - Run `shared/scripts/page-consumption-smoke.mjs` when browser tooling is available to verify a tiny page can consume `css/components.css`, `js/components.js`, and catalog usage examples without copying the replica layout.
   - Run `shared/scripts/validate-artifacts.mjs` when `ajv` and `ajv-formats` are available to validate design-system and component-catalog JSON against Maquette schemas.
   - Use `shared/scripts/ensure-qa-tooling.mjs --project .` to check optional project-local QA dependencies before reporting automated QA as unavailable. Do not assume global npm installs are available.
   - If any optional QA dependency is missing and browser/schema QA would materially improve confidence, ask the user through the Codex user-input/question tool whether to install `playwright`, `ajv`, and `ajv-formats` in the current project. This includes partial installs where only `ajv-formats` or `ajv` is missing. Use explicit yes/no choices. If the user agrees, run `npm i -D playwright ajv ajv-formats` and `npx playwright install chromium`, then continue automated QA. If the user declines, continue with manual review and record the missing tooling.
   - Do not generate project-local `.mjs` scripts for capture, responsive audit, contrast/API checks, JSON validation, or page-consumption smoke unless the bundled helper cannot cover the scenario. If a fallback script is generated, list it in `.maquette/components/approved.md` with the reason.
15. Update `.maquette/components/component-catalog.json` with implemented coverage.
   - Record `.maquette/components/component-coverage-plan.md` in `assets.coverage_plan_path`.
   - Record all generated CSS-contract poster and optional visual component sheet paths in a stable place, using `assets.component_sheet_paths` when multiple artifacts exist while preserving `assets.component_sheet_path` for compatibility.
   - Record `.maquette/components/replica-gallery.html` in `assets.replica_gallery_html_path` and `assets.component_reference_html_path`.
   - Record the implementation log with `assets.sheet_implementation_log_path`.
   - Record each sheet or poster batch in `assets.sheet_implementation_batches`, including category, poster path in the schema's `sheet_path` field, transcribed contract path, optional visual supplement path when present, replica artifact paths, component artifact paths, catalog snapshot path, review path, review artifact paths, screenshot paths when available, reusable components added, rubric scores, corrections made, simplifications, deferred items, `completed_before_next_sheet`, and status.
   - Record CSS-contract poster and optional visual sheet vs replica fidelity in `assets.replica_fidelity_review`, including reference artifact paths, review mode, screenshots or manual artifacts, rubric scores, failed categories, corrections made, coverage summary, simplifications, and status.
   - Record reusable component readiness in `assets.reusable_component_review`, including whether component APIs, slots, states, JS behavior, accessibility hooks, and usage examples are ready for page implementation.
   - Each component's `visual_review.reference_image_paths` should include the CSS-contract poster and any optional visual sheet that guided that component.
   - Each component should record reusable API details such as slots, required attributes, JS behavior, and usage examples when relevant.
   - Component entries should align with the coverage plan decision: reused components should document the API consumed, extended components should document the added variant/state/slot/density/behavior, and newly created components should document why the existing API could not cover the need.
   - Responsive navigation components should record variants such as `desktop-inline`, `tablet-collapsed`, `mobile-collapsed`, `mobile-expanded`, `active`, and `focus-visible` in `implemented_variants` or `implemented_states`.
   - Product-card or repeated-card components should record equal-height behavior, body layout strategy, bottom-pinned action rows, and screenshot evidence for action-row alignment.
16. Summarize gaps, mismatches, approval status, component coverage plan status, reuse/extend/create/page-specific decisions, CSS-contract poster focus/readability/selector allowlist status, optional visual component sheet focus/inspectability when used, component artifact vs replica fidelity using the rubric, per-batch artifact status, reusable component readiness, brand-board/component-artifact inconsistencies and which artifact won, measured responsive overflow results, screenshot paths or manual review artifacts, interaction state coverage, reduced-motion behavior, repeated-card anatomy and action-row alignment results, open nav screenshot paths when present, accepted scroll exceptions, responsive navigation notes, accessibility notes, performance risks, and icon-rendering notes in `.maquette/components/approved.md`.

## Visual consistency rules

- Follow the approved brand system exactly.
- Do not invent a new visual language.
- Treat focused 1:1 CSS-contract posters as the default component design and implementation targets, not loose inspiration.
- Treat visual component sheets as optional fidelity aids, not the default component route.
- Keep the reference page layout and reusable component API conceptually separate; page implementations should consume the catalog, CSS, JS, and usage examples, not copy the reference layout.
- Reuse existing components before extending them, and extend existing components before creating structurally new reusable components.
- Keep the component coverage plan as the source of truth for poster scope, intended component API targets, required selector allowlists, optional visual supplements, and reuse/extend/create decisions.
- Reuse shared tokens everywhere instead of hard-coded one-off values.
- Focus treatments and disabled states must remain consistent across controls.
- The coded componentized reference should be pulled toward the approved focused CSS-contract poster plus the approved brand. If an optional visual component sheet is used, it should clarify anatomy and polish without overriding the poster's reusable selector and state contract.
- The componentized reference must not silently simplify generated component details. Any missing family, variant, state, density detail, selector, slot, or composite shown in the CSS-contract poster or optional visual sheet must be implemented or explicitly documented with a concrete reason and follow-up.
- Every icon-only control must have sufficient foreground/background contrast in default, hover, active, selected, disabled, and inverse states.
- Active, selected, and current navigation links must remain readable against their active background, especially on dark or inverse navigation surfaces.
- Component variants should share the same anatomy, spacing rhythm, and action placement unless the catalog explicitly records why a variant differs.
- Repeated cards must share media/header/body/footer/action anatomy, badge and eyebrow placement, and equal-height grid behavior. Card bodies should use flex or grid layout, and primary action rows must be pinned to the bottom so product CTAs, quantity selectors, and comparable actions align across cards with different copy lengths.
- Wide data-dense components should not be squeezed into narrow reference cards on desktop.
- A single mega-poster is not a goal. Split component guidance into focused CSS-contract posters whenever the poster would become cluttered or uninspectable.
- A single mega-sheet is not a goal. Use visual component sheets only as focused fidelity supplements when a CSS-contract poster needs visual clarification.
- CSS-contract posters should usually cover one major component family, or at most two tightly related small families, with roughly 8 to 16 meaningful selectors and no broad page/reset/gallery selectors.
- Primary navigation must have a responsive component pattern. Prefer desktop inline nav plus tablet/mobile menu toggle with a stacked panel or drawer. Do not rely on document-level horizontal scrolling for primary nav.
- In multi-sheet or multi-poster runs, finish the current sheet/poster's componentized batch replica, transcribed contract when applicable, batch CSS/JS, batch catalog snapshot, batch screenshot/manual review, fidelity review, reusable API documentation, and implementation log entry before generating the next component sheet or poster. Retrospective log entries after all artifacts are generated do not satisfy this requirement.
- Prefer Maquette's bundled shared scripts over generated run-local `.mjs` scripts for screenshots, responsive layout auditing, contrast/API smoke checks, page-consumption smoke checks, and JSON validation.

## Review rules

If a reference board, component sheet, or CSS-contract poster exists:
- compare the coded componentized reference against it
- inspect the rendered screenshot directly
- make one focused correction at a time
- prefer small targeted fixes over wide stylistic rewrites

Before finishing:
- Verify `.maquette/components/component-coverage-plan.md` documents the current request, existing coverage review, reuse/extend/create/page-specific decisions, and each CSS-contract poster's family scope, selector allowlist, intended API targets, and rationale.
- Verify that the componentized reference matches the transcribed poster contract's selector contract, states, slots, token intent, density, anatomy, and polish, then use screenshots to correct visual quality. If an optional visual component sheet is used, also verify the implementation matches that sheet's component families, variants, states, density, anatomy, and polish. A basic selector page is not sufficient.
- Verify the same componentized reference exposes reusable component APIs, slots, states, JS behavior, accessibility hooks, and usage examples for page implementation.
- Record the component fidelity rubric result for coverage, visual match, anatomy match, responsive match, and implementation quality.
- Verify no icon disappears into its background.
- Verify active, selected, current, and inverse navigation text stays readable against its background.
- Verify same-component variants keep comparable text hierarchy, media/header/body/action placement, and button sizing.
- Verify product-card and repeated-card screenshot examples have shared anatomy, consistent badge/eyebrow placement, and aligned action rows across at least three cards with varied copy length.
- Verify tables and other wide components receive enough horizontal space in the reference.
- If a screenshot shows horizontal scrolling, explain whether it is expected for the viewport or fix the reference layout.
- Verify responsive navigation examples at desktop, tablet, and mobile widths when navigation exists, including closed and open tablet/mobile menu states.
- Verify whole-reference screenshots at mobile, tablet, and desktop widths when browser tooling is available.
- Verify the reusable component API through a page-consumption smoke check when browser tooling is available.
- Verify each multi-poster or optional visual-sheet batch has concrete category-prefixed files under `.maquette/components/`, with CSS-contract transcriptions under `.maquette/components/contracts/`, CSS under `.maquette/components/css/`, and JS under `.maquette/components/js/`, before accepting the final merged library.
- `.maquette/components/approved.md` must summarize component coverage plan status, reuse/extend/create/page-specific decisions, CSS-contract poster focus/readability/selector allowlist status, optional visual component sheet focus/inspectability when used, component artifact vs replica fidelity, per-artifact implementation log status, per-batch artifact paths, reusable component readiness, measured responsive overflow results, screenshot paths or manual review artifacts, clipped screenshot fallbacks, generated fallback scripts and reasons when any exist, interaction state coverage, reduced-motion behavior, repeated-card anatomy and action-row alignment results, open nav screenshot paths when present, accepted scroll exceptions, responsive navigation notes, accessibility notes, performance risks, brand/component inconsistency notes, and icon-rendering notes. "Screenshots captured" alone is not a sufficient review.
