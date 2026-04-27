---
name: maquette-pages
description: Create website page concepts from approved brand and component references using image_gen first, then implement them with existing reusable components before adding any new composites.
---

You are responsible for the **website page and screen phase**.

Write all Maquette-owned page artifacts under `.maquette/pages/<page-name>/` in the current project, including generated assets, review notes, Playwright screenshots, and responsive audit JSON. Do not create or overwrite root-level website files such as `index.html`. When the user explicitly asks to add or integrate a runtime page into an existing site, create or update only the requested runtime page path, reuse the existing shell and shared assets, and keep the `.maquette/pages/<page-name>/` files as the specification/review mirror rather than the canonical source for shared CSS/JS.

## Preconditions

Use this skill in two modes:

- **Concept-first discovery mode**: after the brand kit exists, create and approve desktop page concept segments, then write `.maquette/pages/<page-name>/component-extraction-plan.md` so Maquette can derive the component library from the approved segment concepts before implementation.
- **Implementation mode**: after the reusable component library exists, create the page contracts and code from the approved concept and cataloged components.

Preferred inputs:
- `.maquette/brand/design-system.json`
- `.maquette/components/component-coverage-plan.md`
- `.maquette/components/component-catalog.json`
- approved brand-board image
- approved visual component close-up image or images, plus explicit legacy CSS-contract poster images when that route was used

Hard gate:
- If `.maquette/brand/design-system.json`, `.maquette/brand/tokens.css`, or a generated and inspected brand board image is missing, do not create a page concept. Run the brand-kit phase first using `maquette-brand-kit`.
- In concept-first discovery mode, component-library artifacts may be missing. Create only the page concept segment approval artifacts and `.maquette/pages/<page-name>/component-extraction-plan.md`, then run or request `maquette-components` before page blueprint/code.
- In implementation mode, if `.maquette/components/component-coverage-plan.md`, `.maquette/components/component-catalog.json`, `.maquette/components/css/components.css`, `.maquette/components/replica-gallery.html`, or a generated and inspected component close-up image is missing, do not write the page blueprint or code. Run the component-library phase first using `maquette-components`.
- If the component catalog lacks reusable component API coverage or marks `assets.reusable_component_review.ready_for_pages` as false, do not copy the componentized reference layout into the page. Run or request `maquette-components` to complete reusable component coverage first.
- If the component catalog records multiple `assets.sheet_implementation_batches`, each implemented batch should have concrete batch artifact paths for the batch replica/reference, component CSS/JS, catalog snapshot, screenshot/manual review evidence, and review. If these are missing, run or request `maquette-components` to complete the component phase before page work.
- If the requested page needs components, dense data patterns, or reusable composites, update `.maquette/components/component-coverage-plan.md` first by mapping page needs to existing component APIs, variants, slots, states, CSS/JS, and gallery examples. Reuse or extend existing components when possible. Run or request the component-library phase only when the plan identifies a true reusable gap and explains why a new focused visual component close-up is needed. Do not silently invent significant new component language inside the page phase.
- Before page concept or page implementation work, check for existing website/app entrypoints and shared shell assets. If found, create or update `.maquette/site/site-contract.md` before generating the page concept or writing code.
- Do not treat an existing website, screenshot, copied CSS, or style notes as a substitute for the brand kit and component library.
- In a one-shot unattended `maquette` workflow where the user explicitly asked not to pause, earlier phases may be marked provisional, but they still must exist before this phase starts. Otherwise, generated brand-board and page-concept approval gates still require explicit user decisions.

## Existing Site Integration Mode

Activate existing-site integration mode when the repository already contains website or app files, such as `index.html`, additional root HTML pages, `css/`, `styles/`, `js/`, `scripts/`, `assets/`, `public/`, `src/app`, `src/pages`, `src/routes`, `pages`, `app`, or framework route files.

Before page concept generation:

- inspect the closest existing reference page, usually `index.html` for static sites
- inspect shared CSS/JS entrypoints, tokens, utilities, reusable components, header/nav, footer, newsletter or terminal bands, legal rows, and global interactions
- create or update `.maquette/site/site-contract.md` using `shared/site-contract.template.md`
- record the reference page, canonical shared regions, locked regions, CSS/JS ownership, allowed page-specific boundaries, and any ambiguity or waiver

In existing-site mode, the site shell is canonical:

- preserve the existing brand name, logo or wordmark treatment, nav labels, header/nav structure, footer model, newsletter/subscription pattern, terminal sections, typography, spacing, global tokens, shared component styling, and shared JS behavior
- explore only the new page body/content unless the user explicitly requests a broader redesign
- reject or regenerate page concepts that introduce a new brand, new logo, unrelated nav model, inconsistent footer/newsletter pattern, or shell styling that conflicts with the reference page
- do not fork, duplicate, or reimplement global nav/footer/newsletter/button/reset/token CSS into page-specific Maquette output
- page-specific CSS may style only new page body/content and local layout that is not already owned by the shared site layer
- page-specific JS may cover only new page interactions; reuse existing navigation, newsletter, and global behavior scripts
- Maquette mirror pages may import the real site CSS/JS for review, but must not become a second independent source of shared shell implementation
- if a shared component is missing and truly required, propose adding it to the existing shared CSS/JS layer rather than creating an isolated page-only variant

Greenfield behavior remains unchanged when no existing website/app shell is detected.

## Non-negotiable image_gen policy

If the `image_gen` tool is available, you **must use it** before implementation.
Follow `shared/image-gen-workflow.md` for required visual inspection, same-turn continuation, and conditional transparent PNG verification.
Do not skip directly to code-only page design unless the user explicitly asks you to.
The page concept images are the creative design artifacts for the page and should guide layout, hierarchy, density, typography, text fit, and style.
For implementation fidelity, use separate 16:9 desktop viewport concepts for the top, middle, and bottom page segments by default. Do not generate one compressed full-page concept for implementation. Each segment concept must look like a real browser screenshot at realistic desktop UI scale, with no mobile previews, annotations, poster labels, zoomed-out page view, or extra inset frames. Use 1:1 images only for focused component or region extraction, not for whole-page concepts by default.

Use image generation to:
- create top, middle, and bottom 16:9 desktop page concept segments from the approved brand board, plus component references when they already exist, or
- edit an existing segment concept image to refine that segment while preserving the approved visual language

If editing a local reference image, first make it visible in the conversation with `view_image`, then ask `image_gen` to edit the visible image.

After every `image_gen` create or edit step, inspect the generated image with `view_image` before treating it as the design source. Do not derive page blueprints, layout decisions, or implementation details from the prompt alone. If the generated file cannot be inspected, state that limitation and treat the image as unverified.

When image-worker subagents are explicitly authorized for the current run, run page-concept image generation or editing in a dedicated image worker subagent. If the image-worker decision is unresolved, follow the preflight authorization question in `shared/image-gen-workflow.md`; do not silently skip the image-worker path. The worker should return the exact saved image path and the project-local segment path such as `.maquette/pages/<page-name>/concept-top.png`, `.maquette/pages/<page-name>/concept-middle.png`, or `.maquette/pages/<page-name>/concept-bottom.png`. The main workflow must then inspect the returned image with `view_image`, ask the approval question for that segment, and only then derive segment contracts or code.

After inspecting each generated or edited page segment concept that passes rejection checks, ask the user whether to use it before writing the page blueprint, concept-region inventory, segment layout contract, page layout contract, experience quality contract, asset manifest, or page code. Use the Codex user-input/question tool when available with choices equivalent to:
- `Yes, use this` as the recommended choice
- `No, make a new one`

If the user approves, continue to the next segment or contract step. If the user asks for a new one, regenerate that segment before deriving page artifacts from it. If the user gives free-form revision notes, edit the segment using those notes, inspect the revision, and ask again with the same two approval choices. Do not treat a page concept segment as approved merely because the run is one-shot or provisional unless the user explicitly requested an unattended run. `One pass`, `full workflow`, `final homepage`, `fresh disposable test`, and similar phrasing are not unattended requests by themselves.

Only skip image generation if:
- the user explicitly tells you not to use it, or
- the environment genuinely does not provide the tool

## Required outputs

For each page, create or update a folder like:

- `.maquette/pages/<page-name>/page-blueprint.json`
- `.maquette/pages/<page-name>/segments/<segment-name>-layout-contract.md`
- `.maquette/pages/<page-name>/component-extraction-plan.md`
- `.maquette/pages/<page-name>/concept-region-inventory.md`
- `.maquette/pages/<page-name>/page-layout-contract.md`
- `.maquette/pages/<page-name>/experience-quality-contract.md`
- `.maquette/pages/<page-name>/asset-manifest.json`
- `.maquette/pages/<page-name>/page.html`
- `.maquette/pages/<page-name>/page.css`
- `.maquette/pages/<page-name>/page.js`
- `.maquette/pages/<page-name>/review.md`

When applicable, also create:

- `.maquette/pages/<page-name>/concept.png`
- `.maquette/pages/<page-name>/concept-top.png`
- `.maquette/pages/<page-name>/concept-middle.png`
- `.maquette/pages/<page-name>/concept-bottom.png`
- `.maquette/pages/<page-name>/page.png`
- `.maquette/site/site-contract.md` when existing-site integration mode is active
- `.maquette/pages/<page-name>/site-shell-consistency.json` when existing-site integration QA runs

The blueprint JSON must validate against `shared/page-blueprint.schema.json`.
The asset manifest JSON must validate against `shared/page-asset-manifest.schema.json` when that schema is present.

## Workflow

1. Read the approved design system, brand board, and component catalog when it exists.
2. Run the existing-site preflight before page concept work.
   - Detect existing website/app entrypoints and shared assets such as `index.html`, other HTML pages, `css/`, `styles/`, `js/`, `scripts/`, `assets/`, `public/`, `src/app`, `src/pages`, `pages`, and `app`.
   - If existing-site mode is active, choose the closest existing reference page, usually `index.html` for static sites.
   - Inspect the reference page shell and shared files: header/nav, footer, newsletter/terminal bands, legal rows, shared CSS, shared JS, tokens/custom properties, utilities, reusable components, and global interactions.
   - Create or update `.maquette/site/site-contract.md` from `shared/site-contract.template.md` before generating the page concept or writing implementation code.
   - Document shell locks, CSS/JS ownership, the page-specific CSS/JS boundary, and any ambiguity or waiver.
3. Check component coverage before page concept work when a component catalog already exists. In concept-first discovery mode, defer the final coverage decision until after the concept is approved and the extraction plan is written.
   - Update `.maquette/components/component-coverage-plan.md` for this page before requesting any new component close-up or explicit legacy CSS-contract poster when existing component artifacts are present.
   - Reuse existing components first.
   - Inspect `.maquette/components/component-catalog.json`, `.maquette/components/contracts/*.contract.css` when present, existing component CSS/JS, and replica/gallery examples when they exist.
   - Use component catalog APIs, slots, variants, states, and usage examples from the componentized reference when available. Do not copy the `replica-gallery.html` page layout into the page.
   - Identify which page needs are covered by existing components, which need a variant/state/slot/density/behavior extension, which are true reusable component gaps, and which are page-specific composites.
   - If the page has a header or primary navigation, verify that the component catalog covers responsive navigation variants before concept or implementation work.
   - If missing coverage is significant in implementation mode, run or request `maquette-components` to create only the focused visual component close-up justified by the coverage plan before continuing. Use a legacy CSS-contract poster only when explicitly requested.
   - Do not create a new component close-up or poster merely because this is a new page.
4. If `image_gen` is available, create or edit the top, middle, and bottom desktop page concept segments using the approved references and `assets/page-concept-prompt.md`.
   - Generate each segment as a separate 16:9 desktop browser viewport screenshot concept, usually named `.maquette/pages/<page-name>/concept-top.png`, `.maquette/pages/<page-name>/concept-middle.png`, and `.maquette/pages/<page-name>/concept-bottom.png`.
   - Inspect each generated page segment concept with `view_image` before writing the page blueprint or implementation.
   - Reject or regenerate any segment that looks like a poster, annotated board, mobile/tablet preview sheet, zoomed-out full page, compressed full-page concept, or unrealistic browser scale.
   - Reject or regenerate any segment whose text is too small to read, whose nav/button/chip labels wrap unintentionally, or whose layout implies text clipping to make content fit.
   - A concept with header or primary navigation is incomplete if it does not define responsive behavior somewhere in the approved concept set or component coverage. Desktop segment concepts may focus on desktop visual fidelity, but responsive nav behavior must still be covered before implementation.
   - In existing-site mode, include `.maquette/site/site-contract.md` and the selected reference page as hard constraints. The concept must preserve the existing shell and explore only unique page body/content unless the user requested a redesign.
   - Reject or regenerate concepts that introduce a new brand name, new logo, new nav model, unrelated footer, inconsistent newsletter/subscription pattern, or shell styling that conflicts with the site contract.
5. Ask the user whether to use each inspected page segment concept.
   - Use the approval choices from the non-negotiable image policy.
   - Record the user's decision in `review.md` once the review file exists.
   - Do not create the page blueprint, concept-region inventory, segment layout contracts, page layout contract, experience quality contract, asset manifest, or page code until the user approves the required top, middle, and bottom concept segments, unless the user explicitly requested an unattended run.
6. After segment concept approval and before component expansion, create `.maquette/pages/<page-name>/component-extraction-plan.md`.
   - Use `shared/page-component-extraction-plan.template.md` if present.
   - Inventory visible component families and page-specific composites from all approved segment concepts.
   - Use `image_gen` edit mode on the approved segment concepts by default to create focused 1:1 close-ups of components that need implementation or extension.
   - Use deterministic 1:1 crops only when the crop already provides a clean close-up or image editing is unavailable. Document the reason. The edit or crop must preserve the approved concept's visual direction and must not invent a new component style.
   - Map each concept-derived need to reuse, extend, create, or page-specific. Existing component APIs still win when they cover the need.
   - Update `.maquette/components/component-coverage-plan.md` from this extraction plan before requesting any new component close-up or explicit legacy CSS-contract poster.
   - If required reusable component coverage is missing, run or request `maquette-components` before writing the page blueprint, layout contract, asset manifest, page code, or final review.
7. Before coding, create `.maquette/pages/<page-name>/concept-region-inventory.md`.
   - Use `shared/concept-region-inventory.template.md` if present.
   - Inventory every visible concept region, including header, nav, hero, sidebars, annotations, product grids, promo cards, newsletter, footer, bottom bars, mobile/tablet callouts, app/device modules, social links, and imagery.
   - For each visible region, record one status: `implemented`, `implemented differently with reason`, `intentionally omitted with reason`, `requires more assets`, or `requires component expansion`.
   - Visible concept regions default to implementation. Missing, simplified, or merged regions must have a concrete reason before coding proceeds.
   - If any visible region requires component expansion, run or request `maquette-components` before implementing that region.
   - In existing-site mode, mark locked shell regions as `preserved from site contract` or document a waiver before implementation.
8. Before coding, create a segment layout contract for each approved desktop concept segment.
   - Use `shared/page-segment-layout-contract.template.md` if present.
   - Store segment contracts under `.maquette/pages/<page-name>/segments/`, such as `top-layout-contract.md`, `middle-layout-contract.md`, and `bottom-layout-contract.md`.
   - For each segment, record viewport size, section bounds, column widths, font-size estimates, line-height, font weight, text casing, one-line text requirements, expected wrapping, and overflow constraints.
   - Record text-fit rules for nav, buttons, search placeholders, cards, chips, tables, metric labels, and footer links.
   - Record whether clipping or `overflow: hidden` is allowed for any element. It is disallowed by default; visible concept text must remain fully readable.
9. Before coding, create `.maquette/pages/<page-name>/page-layout-contract.md`.
   - Use `shared/page-layout-contract.template.md` if present.
   - Translate the inspected segment concepts and segment layout contracts into implementable layout rules for each major region: section order, relative section heights, section density/compactness, background bands, grid behavior, image container aspect ratios, image crop behavior, footer structure, legal/bottom row structure, and mobile stacking.
   - Record top, middle, and terminal-region expectations. Terminal regions include final CTA/impact strips, newsletter blocks, footers, legal rows, bottom bars, app/download modules, and social areas.
   - For every major raster media region, record whether the image must fill its container, which `object-fit` behavior is expected, and whether blank bands or letterboxing are acceptable. Blank parent backgrounds around fitted media are deviations unless the contract explicitly accepts them.
   - Record which component catalog APIs are expected in each region and where page-specific layout CSS is allowed.
   - Any visible concept region that will be taller, looser, more compact, cropped differently, or structurally simplified must be recorded here before implementation with a concrete reason.
   - In existing-site mode, reference `.maquette/site/site-contract.md`, record the canonical shell owner for header/nav, newsletter/terminal regions, footer/legal rows, and define the page-body-only implementation boundary.
10. Create `.maquette/pages/<page-name>/asset-manifest.json` before coding.
   - Use `shared/page-asset-manifest.example.json` and `shared/page-asset-manifest.schema.json` if present.
   - List every required raster image: logo if supplied or explicitly requested, hero images, product-card images, promo images, lifestyle/story images, footer/app/device images, background textures, decorative rasters, and generated concept/page screenshots.
   - If the user asked for generated image assets, generate all required project-local assets or document why each missing asset was not generated.
   - When image-worker subagents are explicitly authorized for the current run, generate or edit required raster assets through the dedicated image worker handoff from `shared/image-gen-workflow.md`, then inspect or verify each returned project-local path before using it in HTML, CSS, JS, or review notes. Generate these assets in the main workflow only when image workers are explicitly declined, unavailable after asking, or explicitly bypassed by unattended/no-question language; record the exact reason.
   - If Maquette policy forbids an asset, such as generating a new logo during the brand-kit phase, record the reason and use a permissible fallback only when it still matches the concept.
   - Every asset referenced by HTML, CSS, JS, or review notes must exist locally before final review.
10. Before coding, create `.maquette/pages/<page-name>/experience-quality-contract.md`.
   - Use `shared/page-experience-quality-contract.template.md` if present.
   - Keep this separate from `page-layout-contract.md`. The layout contract covers structure, density, media crop, and section behavior. The experience quality contract covers generated visual fit, motion/effects, interaction states, accessibility, performance, information clarity, brand craft, and mobile UX.
   - Include the required sections: Generated Visual Fit, Motion and Effects, Interaction States, Accessibility, Performance, Content and Information Architecture, Brand Craft, Mobile and Responsive UX, and QA Acceptance Criteria.
   - For every generated raster or decorative image used by the page, record the file path, intended purpose, consuming page region, whether it supports the actual product function, whether users could mistake it for a real product feature, whether it distracts from the primary task, whether a CSS/SVG/code-native effect would be more appropriate, whether it should be used/revised/replaced/removed, and the alt text or decorative-hidden decision.
   - Reject or revise generated visuals that imply the wrong feature, look like generic AI decoration, push core content too far down, make the site feel less trustworthy, conflict with the actual product/category, or are heavy raster assets where CSS/SVG/code-native effects would work better.
   - List every planned motion/effect with name, purpose, trigger, affected element, duration, easing, CSS properties used, whether JS is required, reduced-motion fallback, accessibility risk, performance risk, and QA status. Do not infer exact motion solely from the concept image.
   - Require `prefers-reduced-motion` for every non-essential animation. Disable or simplify ambient loops when reduced motion is requested. Auto-moving, blinking, scrolling, or updating decorative content lasting more than 5 seconds must have pause/stop/hide controls unless essential.
   - Prefer `transform` and `opacity`; avoid animating layout-heavy properties, expensive shadows, or heavy filters unless justified. Keep JS animation minimal, avoid animation-caused overflow, and do not let animation delay interaction response.
   - Plan interaction states where relevant: loading, skeleton, empty, error, offline, stale data, disabled, selected/current, hover, focus-visible, active/pressed, success, permission/unavailable, mobile drawer open/closed, and filter applied/cleared. Data-heavy pages must cover these states explicitly.
   - Record accessibility baseline checks: semantic heading order, landmarks, keyboard navigation, visible focus, tap targets, contrast, non-color-only status indicators, alt/decorative image decisions, drawer/nav ARIA, reduced motion, form labels/help/error text, table semantics, no unreachable drawer/menu content, and no hidden focus traps.
   - Record performance budgets or static risk checks for heavy decorative images, LCP/hero impact, CSS/JS weight, animation cost, layout shift, interaction delay, font loading, and mobile rendering. Baseline targets are LCP 2.5s or better, INP 200ms or better, and CLS 0.1 or better. If tooling is unavailable, document that this is a static risk review and do not claim measured performance.
   - Verify scan-first information architecture: clear H1, concise intro, obvious primary action, useful summaries before detail, clear filter/search/sort behavior for data-heavy pages, no ornamental sections pushing core tasks down without benefit, visuals support hierarchy, and footer/terminal regions fit the site and concept.
   - Verify brand craft: recognizable brand language, product-specific typography/spacing/icons/surfaces/interactions, no generic SaaS/card-dashboard sameness, and visual richness from purposeful system details rather than random generated decoration.
11. Ensure font loading is explicit before coding.
   - If the approved brand system declares custom, imported, hosted, or non-system fonts, create `.maquette/brand/fonts.css`.
   - Put `@font-face` rules or approved font imports in `fonts.css`, and record licensing/source/fallback notes in the design system or review.
   - Every Maquette HTML artifact must import `.maquette/brand/fonts.css` before brand tokens, component CSS, or page CSS when custom fonts are declared. If no custom fonts are used, record that `fonts.css` was not required.
   - Fail QA if custom fonts are declared in the brand system, tokens, components, or page CSS but no shared font-loading asset is imported before dependent CSS.
12. Reuse existing components first.
13. Translate the approved page concept segments, segment layout contracts, page layout contract, and experience quality contract into code using the component library before adding any new composite patterns.
   - Use the font families, weights, widths, sizes, and line-heights recorded in the design system and component catalog. If the concept implies condensed or editorial display type, choose a closer available CSS stack or project-approved open-source import instead of defaulting to crude substitutes such as `Impact`.
   - Do not silently simplify visible concept regions, generated component details, or requested image assets. Any simplification must be documented with a concrete reason and recommended follow-up when appropriate.
   - Preserve section density from the layout contract. Do not let terminal sections such as impact strips, newsletter areas, or footers become materially taller, looser, or more generic than the concept unless the contract records why.
   - Preserve segment typography and text fit from the segment layout contracts. Do not allow nav labels, button labels, chips, table labels, metric labels, search placeholders, or footer links to wrap differently from the concept without a documented reason.
   - Do not use clipping, fixed heights, `overflow: hidden`, or off-canvas positioning to hide layout failures unless the relevant segment layout contract explicitly allows clipped content for that element. Visible concept text must remain fully readable.
   - Implement major media containers so their images fill or crop according to the layout contract. Fix visible blank bands, unintended letterboxing, or exposed parent backgrounds before accepting screenshots.
   - In existing-site mode, new root/framework runtime pages must reuse existing CSS/JS entrypoints. Do not copy global reset, token, button, nav, newsletter, footer, or shared utility CSS into page-local files.
   - In existing-site mode, page-local CSS and JS must be limited to genuinely new page body sections and interactions. Shared navigation/newsletter/header/footer behavior must be reused from the existing site files.
   - In existing-site mode, Maquette mirror files under `.maquette/pages/<page-name>/` may import/reference the real site CSS/JS for review and specification, but they must not become the canonical runtime source for global shell code.
14. Only create a new composite when the page clearly needs a pattern that the library does not already cover and the concept-derived component coverage exists.
   - When a page has primary navigation, implement accessible responsive navigation: desktop inline nav, tablet/mobile menu toggle, stacked panel or drawer, and no document-level horizontal scrolling.
   - The menu toggle must have `aria-controls`, `aria-expanded`, and an accessible label.
   - The collapsed menu must be keyboard reachable when opened, and hidden menu content must not trap or block focus when closed.
   - Nav links and menu controls need visible tap targets on tablet and mobile.
   - Primary mobile navigation must not require horizontal page scrolling. Horizontal scrolling may only be accepted for explicit dense data components, not primary nav.
   - Opened mobile/tablet drawers must remain scrollable when content exceeds viewport height; prefer `overflow-y: auto` and `overscroll-behavior: contain` on the drawer or drawer body while any body scroll lock is active.
   - Close controls and links must remain reachable in the opened drawer at mobile and tablet heights.
15. Update the page blueprint to document composition, segment concept paths, segment layout contract paths, component extraction plan path, concept-region inventory path, page layout contract path, experience quality contract path, asset manifest path, and any new composites.
   - In existing-site mode, include `existing_site_mode: true`, the selected reference page, `site_contract_path`, and shell consistency report paths.
16. Capture screenshots when possible and compare them to the approved segment concepts and approved references.
   - Use Maquette's bundled scripts where possible, especially `shared/scripts/ensure-qa-tooling.mjs`, `shared/scripts/capture-browser.mjs`, or `skills/maquette-pages/scripts/capture-page.mjs`.
   - Check optional project-local QA dependencies before reporting automated screenshot QA as unavailable. Do not assume global npm installs are available.
   - Treat partial QA availability as missing QA tooling. For example, if browser QA can run but `ajv-formats` is missing, schema validation for page blueprints or asset manifests is still blocked.
   - If optional QA dependencies are missing and automated screenshot, responsive, or schema QA would materially improve confidence, ask the user through the Codex user-input/question tool whether to install `playwright`, `ajv`, and `ajv-formats` in the current project. Use explicit yes/no choices. If the user agrees, run `npm i -D playwright ajv ajv-formats` and `npx playwright install chromium`, then continue automated QA. If the user declines, continue with manual review and record the missing tooling.
   - Do not silently replace schema validation with JSON syntax validation when only `ajv` or `ajv-formats` is missing. Ask first, unless the user already declined installation for this run or the environment cannot install packages.
   - Keep Playwright/Chromium screenshot capture headless.
   - Ensure every browser/session opened for screenshot capture is closed before finishing.
   - If cleanup fails, record the failed cleanup command or operation in the final response.
   - Capture screenshots at the approved concept image ratio for desktop segment comparison. For 16:9 concepts, use browser viewport sizes such as 1365x768, 1440x810, 1536x864, 1600x900, and 1920x1080 when the screenshot cap or tooling allows; otherwise capture capped 16:9 segments and record the constraint.
   - Include common desktop widths, including Windows-like browser widths such as 1365, 1366, 1440, 1536, and 1600px, in addition to the existing responsive audit widths.
   - Capture visual review screenshots no larger than 1254x1254 unless the run explicitly allows larger concept-ratio screenshots for desktop fidelity evidence. Use wider browser widths for responsive metrics rather than oversized screenshots when the cap applies.
   - Capture segmented viewport screenshots for visual review. At minimum capture top, middle, and bottom/terminal desktop segments corresponding to the approved concept segments, plus mobile/tablet responsive evidence when browser tooling is available. For long, data-heavy, or stateful pages, add named segments for the data-heavy region, filter/search region, important interactive state, and footer/terminal region.
   - Prefer `shared/scripts/capture-browser.mjs <page> <output.png> --mode segments --segments top,middle,bottom` for segmented captures. The helper writes files such as `<output>-top.png`, `<output>-middle.png`, and `<output>-bottom.png`.
   - Segmented viewport screenshots are the primary evidence for detailed visual review because they preserve normal viewport scale and keep each screenshot within the 1254x1254 cap.
   - If screenshot capture falls back to a clipped full-document image, record the capture metadata and clipped fallback status in `review.md`.
17. Run the required page QA pass:
   - Explicitly pass or fail component reuse before new component creation, component extraction plan completion when concept-first is used, component coverage plan completion, component close-up focus/fidelity and screenshot-match status for any new component work, legacy CSS-contract poster focus/readability/selector allowlist status only when explicitly used, generated visual fit, motion/effects appropriateness, reduced-motion behavior, interaction state coverage, accessibility baseline, performance risk/budget, content hierarchy, mobile usability, existing-site shell consistency when applicable, context fit against the actual product, and screenshot evidence capped at 1254x1254 or segmented.
   - Fix any failed category before approval or document a concrete blocker and follow-up in `review.md`.
   - Verify the page concept region inventory against the rendered page. Missing concept regions fail QA unless the inventory records an intentional omission with a concrete reason.
   - Verify the page layout contract against the rendered page. Fail and fix when the implementation violates recorded section order, section density, image crop behavior, footer structure, or terminal-section compactness without a documented reason.
   - Verify each segment layout contract against the matching rendered screenshot. Fail and fix when viewport size, section bounds, column widths, font-size estimates, line-height, font weight, text casing, one-line requirements, expected wrapping, or overflow constraints drift without a documented reason.
   - Verify the experience quality contract against the rendered page. Fail and fix when generated visual assets, motion/effects, reduced-motion behavior, state coverage, accessibility, performance risk, information architecture, brand craft, or mobile UX drift from the contract without a documented reason.
   - In existing-site mode, verify `.maquette/site/site-contract.md` against the rendered page and selected reference page before accepting the implementation.
   - In existing-site mode, run `shared/scripts/check-site-shell-consistency.mjs <reference-page> <new-page> --json .maquette/pages/<page-name>/site-shell-consistency.json --screenshots-dir .maquette/pages/<page-name>/screenshots/site-shell` when browser tooling is available.
   - In existing-site mode, compare the new page header/nav, footer, newsletter or terminal band, legal row, shared link labels, shared form controls, and stable shell DOM structure against the reference page.
   - In existing-site mode, capture or inspect terminal/footer screenshots for both the reference page and new page. Record screenshot paths in `review.md`.
   - In existing-site mode, fail QA if shared shell regions drift without an explicit waiver in `.maquette/site/site-contract.md`.
   - In existing-site mode, run responsive overflow/nav audits on both the reference page and the new page, and document any drift caused by the new page.
   - Verify the generated asset manifest. Every referenced local raster asset must exist, every generated asset requested by the user must be present or explicitly documented as not generated, and unused generated assets should be noted.
   - Verify generated visual fit for every generated raster/decorative image: purpose, region, product-function support, false-feature risk, distraction risk, CSS/SVG/code-native alternative, use/revise/replace/remove decision, and alt/decorative-hidden decision.
   - Reject generic AI decoration, wrong-feature imagery, trust-reducing imagery, visuals that push the core task too far down, and heavy raster effects that should be code-native.
   - Verify all non-essential motion has `prefers-reduced-motion`; ambient loops are disabled or simplified under reduced motion; long-running decorative motion has pause/stop/hide controls when required; animation uses performance-safe properties; and no animation causes document overflow or interaction delay.
   - Verify planned interaction states where relevant: loading, skeleton, empty, error, offline, stale data, disabled, selected/current, hover, focus-visible, active/pressed, success, permission/unavailable, mobile drawer open/closed, and filter applied/cleared. Data-heavy pages fail QA if these states are not planned and represented or explicitly deferred with a reason.
   - Verify accessibility baseline: semantic heading order, landmark structure, keyboard navigation, visible focus, tap target size, contrast, non-color-only status indicators, alt/decorative image handling, `aria-expanded`/`aria-controls` for drawers/nav, reduced-motion support, form labels/helper/error text, table semantics for tabular data, no unreachable drawer/menu content, and no hidden focus traps.
   - Verify performance as design quality: decorative image weight, LCP/hero impact, CSS/JS weight risk, animation cost, layout shift risk, interaction delay risk, font loading risk, and mobile rendering risk. Use baseline targets of LCP 2.5s or better, INP 200ms or better, and CLS 0.1 or better. If tooling is unavailable, record static risk review instead of claiming measurement.
   - Verify scan-first information architecture: clear H1, concise intro, obvious primary action, useful summaries before detail, clear filter/search/sort behavior for data-heavy pages, no ornamental sections pushing core tasks down without benefit, visuals support hierarchy, and footer/terminal regions stay appropriate.
   - Verify brand craft: recognizable brand language, product-specific typography/spacing/icons/surfaces/interactions, avoidance of generic SaaS/card-dashboard sameness, and visual richness from purposeful system details instead of random generated decoration.
   - Compare the top and bottom of the coded page against the concept, especially headers, navigation, newsletter bands, footers, bottom ribbons, and final calls to action.
   - Compare first, middle, and last screenshot segments against the concept and layout contract. Do not accept a page because the hero matches if the bottom third drifts in spacing, footer anatomy, or media treatment.
   - Compare segmented viewport screenshots against the concept and contracts at normal visual scale: top/hero, middle or data-heavy region, bottom/footer or terminal region, and any named interactive state segments. Do not rely only on a tall full-page screenshot for detailed visual approval.
   - Score page compactness and vertical rhythm in `review.md`: `matches`, `slightly looser`, `too loose`, `too compact`, or `intentionally different`. A `too loose` or `too compact` result requires a fix or a documented block.
   - Check major image containers for unintended blank bands, letterboxing, exposed parent backgrounds, or mismatched crop behavior. Fix these unless the layout contract explicitly accepts them.
   - Check that repeated/global regions preserve the concept's structure, not just its colors: logo placement, link-column count, approved secondary marks/seals, social links, legal links, and bottom strips should be implemented when shown in the concept.
   - If the concept shows a rich footer, compare and implement logo placement, link columns, social icons, app/download module, device or phone image, legal links, locale or shipping row, cookie or bottom strips, and brand blurb when shown. Simplifying a rich footer into generic columns fails QA unless explicitly documented.
   - In product grids and comparable repeated-card sections, compare the vertical position of repeated card action rows. Fail and fix QA if one card's CTA, quantity selector, price row, or primary action row floats higher than its siblings due to differing text length.
   - Repeated card grids must use shared media/header/body/footer/action slots, consistent badge or eyebrow placement, equal-height cards, flex or grid card bodies, and bottom-pinned action rows whenever cards share a row.
   - Check that headings, badges, labels, and content do not shift inconsistently across cards due to optional badges or labels.
   - Check that social links and compact action controls render as recognizable icons with accessible names. Do not substitute visible text abbreviations such as `YT`, `IG`, or `FB` unless the concept explicitly uses text badges.
   - If the concept shows social links, use recognizable social icons rather than arbitrary generic icons. Do not substitute unrelated icons such as location, camera, music, or generic circles unless the concept explicitly asks for those symbols.
   - Prefer an existing icon library when available. If no brand-icon library is available, use simple inline SVGs or a locally defined icon set with accessible names.
   - Check that icon-only buttons and compact controls visibly render supported icons and are not blank.
   - Compare coded typography weight, width, scale, line-height, heading width, button label wrapping, nav label fit, and input placeholder alignment against the approved segment concepts, brand board, and component references. Avoid `Impact` as the fallback for condensed headings unless the board explicitly approves it.
   - Record the chosen font family, fallback stack, and rationale in the design system or `review.md`, especially when importing or substituting an open-source font.
   - Run `shared/scripts/check-text-fit.mjs` when browser tooling is available. Fail and fix text-fit issues for nav, buttons, search placeholders, cards, chips, tables, metric labels, and footer links.
   - Fail and fix QA if nav items overlap, text wraps differently from the segment concept without a documented reason, a horizontal scrollbar appears, one-line labels such as buttons or chips wrap, input placeholders are misaligned, or custom fonts are declared but not loaded.
   - Capture and inspect navigation at desktop, tablet, and mobile widths. For tablet and mobile, inspect both closed and open menu states.
   - If browser tooling is available, click the menu toggle and verify `aria-expanded` changes.
   - For opened mobile/tablet drawers, verify drawer content can scroll independently when taller than the viewport, body scroll lock does not block drawer scrolling, close controls remain reachable, and links can be reached by pointer and keyboard.
   - Record screenshot paths for open mobile or tablet nav states in `review.md`.
   - Fail and fix QA if nav links overflow, are clipped, require document-level horizontal scrolling, or are unreachable by keyboard or pointer.
   - Check segmented screenshots across the whole page, not only above-the-fold. Inspect top, middle or data-heavy sections, and footer or terminal sections.
   - Check first, middle, and last viewport screenshots; do not only review the hero or above-the-fold content.
   - Run measurable responsive overflow QA when browser tooling is available. Prefer `shared/scripts/audit-responsive-layout.mjs` if present.
   - Test at least viewport widths 390, 768, 1024, 1280, and 1440.
   - Keep visual screenshots no larger than 1254x1254. Capture segmented viewport screenshots for at least the primary desktop/tablet/mobile visual widths, and use wider audited widths for metrics unless capped segments are specifically needed.
   - For each tested viewport, record `window.innerWidth`, `document.documentElement.scrollWidth`, `document.body.scrollWidth`, and clientWidth/scrollWidth for wide components such as tables, grids, timelines, charts, calendars, code blocks, and comparison matrices.
   - Record top overflow offenders when any are present.
   - Fail and fix the page if document scroll width exceeds viewport width by more than 1px, unless there is an explicit documented exception.
   - Internal horizontal scrolling for wide components is allowed only when intentional and documented. It should generally not appear on normal desktop or tablet layouts unless the component is truly a data grid that requires it.
   - Horizontal scrolling is never an accepted exception for primary navigation.
   - Clipping and `overflow: hidden` are never accepted as a fix for layout failure unless the relevant segment layout contract explicitly calls for clipped content on that element.
   - Prefer bundled Maquette scripts over generated run-local `.mjs` scripts for capture and responsive auditing. If a fallback script is generated, list it in `review.md` with the reason.
   - For each major section, write concept-to-code comparison notes in `review.md`: `matches`, `deviates`, `missing`, `simplified`, or `fixed`.
   - If a footer, header, terminal section, image asset, or any other visible concept region is simplified from the concept, either fix it or record the intentional reason and recommended follow-up in `review.md`.
18. Only after top, middle, and bottom segments pass visual QA should Maquette assemble or approve the final page as a whole.
   - If a segment fails visual, text-fit, typography, overflow, font-loading, or layout-contract QA, fix that segment before final page assembly.
   - The final assembly pass should verify continuity between approved segments but must not loosen or override segment contracts without a recorded reason.
19. Record generated asset manifest status and missing assets, page concept segment approval decisions, segment layout contract status, component extraction plan status, page concept region inventory, page layout contract status, experience quality contract status, generated visual fit decisions, motion/effects QA, reduced-motion behavior, interaction state coverage, accessibility baseline, performance risk/budget review, content hierarchy, brand craft, mobile usability, site contract status when existing-site mode is active, component coverage plan status, component reuse before new component creation, component close-up focus/fidelity and screenshot-match status for any new component work, legacy CSS-contract poster focus/readability/selector allowlist status only when explicitly used, component artifact vs replica fidelity notes, reusable component usage notes, card anatomy alignment, footer fidelity, terminal-section compactness, media container fit/crop results, mobile drawer scrollability, shared-shell consistency status, text-fit QA status, measured responsive overflow results, screenshot 1254x1254 cap status, segmented viewport screenshot paths, desktop concept-ratio screenshot paths, open nav screenshot paths, visual deviations and fixes, accepted scroll exceptions, navigation accessibility notes, icon-rendering notes, context fit against the actual product, font-loading asset status, and chosen font family/fallback rationale in `review.md`.

## Low-resolution reference rule

Concept images are **composition and hierarchy guides**, not pixel rulers.
When a concept segment image is small or compressed:
- infer spacing from the approved token rhythm
- infer typography from the approved type scale
- infer responsive behavior from the existing layout system
- avoid measuring every visible pixel

## Consistency rules

- Do not silently introduce a new brand direction.
- Prefer already-approved primitives and states.
- Do not silently introduce significant new component language that is absent from the approved or provisional component references.
- Keep page code composable so later pages can reuse sections and composites.
- In existing-site mode, preserve the canonical site shell from `.maquette/site/site-contract.md`; do not redesign or vary header/nav, newsletter/terminal regions, footer/legal rows, global CSS, shared JS, tokens, utilities, or shared component styling without an explicit user request and documented waiver.
- In existing-site mode, page-specific CSS/JS must not duplicate global shell implementation. Reuse the existing site CSS/JS entrypoints and keep new page files scoped to page body content.
- Headers and primary navigation must be responsive by design. Do not ship desktop-only inline nav that breaks on tablet or mobile.
- The concept image should drive the creative direction; the code should faithfully implement that direction using approved components first.
- Image-generated concepts are creative inspiration, not final UX truth. Translate them into accessible, performant, context-appropriate implementation decisions through the layout contract, experience quality contract, asset manifest, and review.
- Generated raster/decorative assets must support the actual product function and page hierarchy. Prefer CSS/SVG/code-native effects over heavy raster decoration when they can express the idea more appropriately.
- Motion is encouraged only when it has a clear product, orientation, feedback, state, or brand purpose. Do not add animation for its own sake, and do not infer exact animation behavior solely from the concept image.
- Page implementation fidelity applies to the whole page, including terminal sections such as newsletter and footer areas. Do not let the footer degrade into a generic link list when the concept shows a branded footer composition.
- Page layout fidelity includes section compactness and vertical rhythm. Do not let coded sections become materially taller or looser than the concept by default, especially in the bottom third of the page.
- Major image containers must have explicit fit and crop behavior. Unintended blank media bands, letterboxing, or exposed parent backgrounds are implementation defects unless documented in the layout contract.
- No silent simplification: visible concept regions, generated component details, and requested image assets must be implemented by default. Any simplification must be documented with a concrete reason and follow-up recommendation.
- Icon-like controls in the concept must stay icon-like in code. Social actions, utility actions, and circular/footer controls need visible recognizable icon glyphs plus accessible labels, not short visible text placeholders or unrelated generic icons.
- Page typography must implement the approved font personality. Condensed bold headings should use a close available font strategy, not an unrelated heavy default such as `Impact` unless explicitly approved.
- Product-card, pricing-card, and other repeated-card sections must keep action rows aligned across cards with varied copy length.
