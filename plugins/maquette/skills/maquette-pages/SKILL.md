---
name: maquette-pages
description: Create website page concepts from approved brand and component references using image_gen first, then implement them with existing reusable components before adding any new composites.
---

You are responsible for the **website page and screen phase**.

Write all Maquette-owned page artifacts under `.maquette/pages/<page-name>/` in the current project, including generated assets, review notes, Playwright screenshots, and responsive audit JSON. Do not create or overwrite root-level website files such as `index.html`. When the user explicitly asks to add or integrate a runtime page into an existing site, create or update only the requested runtime page path, reuse the existing shell and shared assets, and keep the `.maquette/pages/<page-name>/` files as the specification/review mirror rather than the canonical source for shared CSS/JS.

## Preconditions

Use this skill after the component library exists.

Preferred inputs:
- `.maquette/brand/design-system.json`
- `.maquette/components/component-catalog.json`
- approved brand-board image
- approved CSS-contract poster image or images, or approved visual component-sheet images when that fallback path was used

Hard gate:
- If `.maquette/brand/design-system.json`, `.maquette/brand/tokens.css`, or a generated and inspected brand board image is missing, do not create a page concept. Run the brand-kit phase first using `maquette-brand-kit`.
- If `.maquette/components/component-catalog.json`, `.maquette/components/css/components.css`, `.maquette/components/replica-gallery.html`, or a generated and inspected component sheet/CSS-contract poster image is missing, do not create a page concept. Run the component-library phase first using `maquette-components`.
- If the component catalog lacks reusable component API coverage or marks `assets.reusable_component_review.ready_for_pages` as false, do not copy the componentized reference layout into the page. Run or request `maquette-components` to complete reusable component coverage first.
- If the component catalog records multiple `assets.sheet_implementation_batches`, each implemented batch should have concrete batch artifact paths for the batch replica/reference, component CSS/JS, catalog snapshot, screenshot/manual review evidence, and review. If these are missing, run or request `maquette-components` to complete the component phase before page work.
- If the requested page needs components, dense data patterns, or reusable composites that are not covered by the existing component catalog or inspected component references, run or request the component-library phase first to create the missing focused sheet or CSS-contract poster. Do not silently invent significant new component language inside the page phase.
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
The page concept image is the creative design artifact for the page and should guide layout, hierarchy, density, and style.

Use image generation to:
- create a new page concept from the approved brand board and component sheet, sheets, or CSS-contract-backed component references, or
- edit an existing concept image to refine the page while preserving the approved visual language

If editing a local reference image, first make it visible in the conversation with `view_image`, then ask `image_gen` to edit the visible image.

After every `image_gen` create or edit step, inspect the generated image with `view_image` before treating it as the design source. Do not derive page blueprints, layout decisions, or implementation details from the prompt alone. If the generated file cannot be inspected, state that limitation and treat the image as unverified.

When image-worker subagents are explicitly authorized for the current run, run page-concept image generation or editing in a dedicated image worker subagent. If the image-worker decision is unresolved, follow the preflight authorization question in `shared/image-gen-workflow.md`; do not silently skip the image-worker path. The worker should return the exact saved image path and the project-local `.maquette/pages/<page-name>/concept.png` path. The main workflow must then inspect the returned image with `view_image`, ask the approval question, and only then derive page artifacts or code.

After inspecting a generated or edited page concept that passes rejection checks, ask the user whether to use it before writing the page blueprint, concept-region inventory, page layout contract, asset manifest, or page code. Use the Codex user-input/question tool when available with choices equivalent to:
- `Yes, use this` as the recommended choice
- `No, make a new one`

If the user approves, continue. If the user asks for a new one, regenerate before deriving page artifacts. If the user gives free-form revision notes, edit the concept using those notes, inspect the revision, and ask again with the same two approval choices. Do not treat a page concept as approved merely because the run is one-shot or provisional unless the user explicitly requested an unattended run. `One pass`, `full workflow`, `final homepage`, `fresh disposable test`, and similar phrasing are not unattended requests by themselves.

Only skip image generation if:
- the user explicitly tells you not to use it, or
- the environment genuinely does not provide the tool

## Required outputs

For each page, create or update a folder like:

- `.maquette/pages/<page-name>/page-blueprint.json`
- `.maquette/pages/<page-name>/concept-region-inventory.md`
- `.maquette/pages/<page-name>/page-layout-contract.md`
- `.maquette/pages/<page-name>/asset-manifest.json`
- `.maquette/pages/<page-name>/page.html`
- `.maquette/pages/<page-name>/page.css`
- `.maquette/pages/<page-name>/page.js`
- `.maquette/pages/<page-name>/review.md`

When applicable, also create:

- `.maquette/pages/<page-name>/concept.png`
- `.maquette/pages/<page-name>/page.png`
- `.maquette/site/site-contract.md` when existing-site integration mode is active
- `.maquette/pages/<page-name>/site-shell-consistency.json` when existing-site integration QA runs

The blueprint JSON must validate against `shared/page-blueprint.schema.json`.
The asset manifest JSON must validate against `shared/page-asset-manifest.schema.json` when that schema is present.

## Workflow

1. Read the approved design system and component catalog.
2. Run the existing-site preflight before page concept work.
   - Detect existing website/app entrypoints and shared assets such as `index.html`, other HTML pages, `css/`, `styles/`, `js/`, `scripts/`, `assets/`, `public/`, `src/app`, `src/pages`, `pages`, and `app`.
   - If existing-site mode is active, choose the closest existing reference page, usually `index.html` for static sites.
   - Inspect the reference page shell and shared files: header/nav, footer, newsletter/terminal bands, legal rows, shared CSS, shared JS, tokens/custom properties, utilities, reusable components, and global interactions.
   - Create or update `.maquette/site/site-contract.md` from `shared/site-contract.template.md` before generating the page concept or writing implementation code.
   - Document shell locks, CSS/JS ownership, the page-specific CSS/JS boundary, and any ambiguity or waiver.
3. Check component coverage before page concept work.
   - Reuse existing components first.
   - Use component catalog APIs, slots, variants, states, and usage examples from the componentized reference. Do not copy the `replica-gallery.html` page layout into the page.
   - Identify any missing primitives, dense data patterns, or larger reusable composites needed by the page.
   - If the page has a header or primary navigation, verify that the component catalog covers responsive navigation variants before concept or implementation work.
   - If missing coverage is significant, run or request `maquette-components` to create the focused component/composite sheet before continuing.
4. If `image_gen` is available, create or edit a page concept using the approved references and `assets/page-concept-prompt.md`.
   - Inspect the generated page concept with `view_image` before writing the page blueprint or implementation.
   - A concept with header or primary navigation is incomplete if it only shows desktop navigation. It must define desktop, tablet, and mobile nav behavior, including the collapsed and expanded tablet/mobile state.
   - In existing-site mode, include `.maquette/site/site-contract.md` and the selected reference page as hard constraints. The concept must preserve the existing shell and explore only unique page body/content unless the user requested a redesign.
   - Reject or regenerate concepts that introduce a new brand name, new logo, new nav model, unrelated footer, inconsistent newsletter/subscription pattern, or shell styling that conflicts with the site contract.
5. Ask the user whether to use the inspected page concept.
   - Use the approval choices from the non-negotiable image policy.
   - Record the user's decision in `review.md` once the review file exists.
   - Do not create the page blueprint, concept-region inventory, page layout contract, asset manifest, or page code until the user approves the concept, unless the user explicitly requested an unattended run.
6. Before coding, create `.maquette/pages/<page-name>/concept-region-inventory.md`.
   - Use `shared/concept-region-inventory.template.md` if present.
   - Inventory every visible concept region, including header, nav, hero, sidebars, annotations, product grids, promo cards, newsletter, footer, bottom bars, mobile/tablet callouts, app/device modules, social links, and imagery.
   - For each visible region, record one status: `implemented`, `implemented differently with reason`, `intentionally omitted with reason`, `requires more assets`, or `requires component expansion`.
   - Visible concept regions default to implementation. Missing, simplified, or merged regions must have a concrete reason before coding proceeds.
   - If any visible region requires component expansion, run or request `maquette-components` before implementing that region.
   - In existing-site mode, mark locked shell regions as `preserved from site contract` or document a waiver before implementation.
7. Before coding, create `.maquette/pages/<page-name>/page-layout-contract.md`.
   - Use `shared/page-layout-contract.template.md` if present.
   - Translate the inspected page concept into implementable layout rules for each major region: section order, relative section heights, section density/compactness, background bands, grid behavior, image container aspect ratios, image crop behavior, footer structure, legal/bottom row structure, and mobile stacking.
   - Record top, middle, and terminal-region expectations. Terminal regions include final CTA/impact strips, newsletter blocks, footers, legal rows, bottom bars, app/download modules, and social areas.
   - For every major raster media region, record whether the image must fill its container, which `object-fit` behavior is expected, and whether blank bands or letterboxing are acceptable. Blank parent backgrounds around fitted media are deviations unless the contract explicitly accepts them.
   - Record which component catalog APIs are expected in each region and where page-specific layout CSS is allowed.
   - Any visible concept region that will be taller, looser, more compact, cropped differently, or structurally simplified must be recorded here before implementation with a concrete reason.
   - In existing-site mode, reference `.maquette/site/site-contract.md`, record the canonical shell owner for header/nav, newsletter/terminal regions, footer/legal rows, and define the page-body-only implementation boundary.
8. Create `.maquette/pages/<page-name>/asset-manifest.json` before coding.
   - Use `shared/page-asset-manifest.example.json` and `shared/page-asset-manifest.schema.json` if present.
   - List every required raster image: logo if supplied or explicitly requested, hero images, product-card images, promo images, lifestyle/story images, footer/app/device images, background textures, decorative rasters, and generated concept/page screenshots.
   - If the user asked for generated image assets, generate all required project-local assets or document why each missing asset was not generated.
   - When image-worker subagents are explicitly authorized for the current run, generate or edit required raster assets through the dedicated image worker handoff from `shared/image-gen-workflow.md`, then inspect or verify each returned project-local path before using it in HTML, CSS, JS, or review notes. Generate these assets in the main workflow only when image workers are explicitly declined, unavailable after asking, or explicitly bypassed by unattended/no-question language; record the exact reason.
   - If Maquette policy forbids an asset, such as generating a new logo during the brand-kit phase, record the reason and use a permissible fallback only when it still matches the concept.
   - Every asset referenced by HTML, CSS, JS, or review notes must exist locally before final review.
9. Reuse existing components first.
10. Translate the page concept and page layout contract into code using the component library before adding any new composite patterns.
   - Use the font families, weights, widths, sizes, and line-heights recorded in the design system and component catalog. If the concept implies condensed or editorial display type, choose a closer available CSS stack or project-approved open-source import instead of defaulting to crude substitutes such as `Impact`.
   - Do not silently simplify visible concept regions, generated component details, or requested image assets. Any simplification must be documented with a concrete reason and recommended follow-up when appropriate.
   - Preserve section density from the layout contract. Do not let terminal sections such as impact strips, newsletter areas, or footers become materially taller, looser, or more generic than the concept unless the contract records why.
   - Implement major media containers so their images fill or crop according to the layout contract. Fix visible blank bands, unintended letterboxing, or exposed parent backgrounds before accepting screenshots.
   - In existing-site mode, new root/framework runtime pages must reuse existing CSS/JS entrypoints. Do not copy global reset, token, button, nav, newsletter, footer, or shared utility CSS into page-local files.
   - In existing-site mode, page-local CSS and JS must be limited to genuinely new page body sections and interactions. Shared navigation/newsletter/header/footer behavior must be reused from the existing site files.
   - In existing-site mode, Maquette mirror files under `.maquette/pages/<page-name>/` may import/reference the real site CSS/JS for review and specification, but they must not become the canonical runtime source for global shell code.
11. Only create a new composite when the page clearly needs a pattern that the library does not already cover and the visual/reference component coverage exists.
   - When a page has primary navigation, implement accessible responsive navigation: desktop inline nav, tablet/mobile menu toggle, stacked panel or drawer, and no document-level horizontal scrolling.
   - The menu toggle must have `aria-controls`, `aria-expanded`, and an accessible label.
   - The collapsed menu must be keyboard reachable when opened, and hidden menu content must not trap or block focus when closed.
   - Nav links and menu controls need visible tap targets on tablet and mobile.
   - Primary mobile navigation must not require horizontal page scrolling. Horizontal scrolling may only be accepted for explicit dense data components, not primary nav.
   - Opened mobile/tablet drawers must remain scrollable when content exceeds viewport height; prefer `overflow-y: auto` and `overscroll-behavior: contain` on the drawer or drawer body while any body scroll lock is active.
   - Close controls and links must remain reachable in the opened drawer at mobile and tablet heights.
12. Update the page blueprint to document composition, concept-region inventory path, page layout contract path, asset manifest path, and any new composites.
   - In existing-site mode, include `existing_site_mode: true`, the selected reference page, `site_contract_path`, and shell consistency report paths.
13. Capture screenshots when possible and compare them to the concept and approved references.
   - Use Maquette's bundled scripts where possible, especially `shared/scripts/ensure-qa-tooling.mjs`, `shared/scripts/capture-browser.mjs`, or `skills/maquette-pages/scripts/capture-page.mjs`.
   - Check optional project-local QA dependencies before reporting automated screenshot QA as unavailable. Do not assume global npm installs are available.
   - Treat partial QA availability as missing QA tooling. For example, if browser QA can run but `ajv-formats` is missing, schema validation for page blueprints or asset manifests is still blocked.
   - If optional QA dependencies are missing and automated screenshot, responsive, or schema QA would materially improve confidence, ask the user through the Codex user-input/question tool whether to install `playwright`, `ajv`, and `ajv-formats` in the current project. Use explicit yes/no choices. If the user agrees, run `npm i -D playwright ajv ajv-formats` and `npx playwright install chromium`, then continue automated QA. If the user declines, continue with manual review and record the missing tooling.
   - Do not silently replace schema validation with JSON syntax validation when only `ajv` or `ajv-formats` is missing. Ask first, unless the user already declined installation for this run or the environment cannot install packages.
   - Keep Playwright/Chromium screenshot capture headless.
   - Ensure every browser/session opened for screenshot capture is closed before finishing.
   - If cleanup fails, record the failed cleanup command or operation in the final response.
   - Capture desktop, tablet, and mobile page screenshots when possible; at minimum use representative widths 390, 768, and 1440 when browser tooling is available.
   - If screenshot capture falls back to a clipped full-document image, record the capture metadata and clipped fallback status in `review.md`.
14. Run the required page QA pass:
   - Verify the page concept region inventory against the rendered page. Missing concept regions fail QA unless the inventory records an intentional omission with a concrete reason.
   - Verify the page layout contract against the rendered page. Fail and fix when the implementation violates recorded section order, section density, image crop behavior, footer structure, or terminal-section compactness without a documented reason.
   - In existing-site mode, verify `.maquette/site/site-contract.md` against the rendered page and selected reference page before accepting the implementation.
   - In existing-site mode, run `shared/scripts/check-site-shell-consistency.mjs <reference-page> <new-page> --json .maquette/pages/<page-name>/site-shell-consistency.json --screenshots-dir .maquette/pages/<page-name>/screenshots/site-shell` when browser tooling is available.
   - In existing-site mode, compare the new page header/nav, footer, newsletter or terminal band, legal row, shared link labels, shared form controls, and stable shell DOM structure against the reference page.
   - In existing-site mode, capture or inspect terminal/footer screenshots for both the reference page and new page. Record screenshot paths in `review.md`.
   - In existing-site mode, fail QA if shared shell regions drift without an explicit waiver in `.maquette/site/site-contract.md`.
   - In existing-site mode, run responsive overflow/nav audits on both the reference page and the new page, and document any drift caused by the new page.
   - Verify the generated asset manifest. Every referenced local raster asset must exist, every generated asset requested by the user must be present or explicitly documented as not generated, and unused generated assets should be noted.
   - Compare the top and bottom of the coded page against the concept, especially headers, navigation, newsletter bands, footers, bottom ribbons, and final calls to action.
   - Compare first, middle, and last full-page screenshot regions against the concept and layout contract. Do not accept a page because the hero matches if the bottom third drifts in spacing, footer anatomy, or media treatment.
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
   - Compare coded typography weight, width, scale, and line-height against the concept, brand board, and component references. Avoid `Impact` as the fallback for condensed headings unless the board explicitly approves it.
   - Record the chosen font family, fallback stack, and rationale in the design system or `review.md`, especially when importing or substituting an open-source font.
   - Capture and inspect navigation at desktop, tablet, and mobile widths. For tablet and mobile, inspect both closed and open menu states.
   - If browser tooling is available, click the menu toggle and verify `aria-expanded` changes.
   - For opened mobile/tablet drawers, verify drawer content can scroll independently when taller than the viewport, body scroll lock does not block drawer scrolling, close controls remain reachable, and links can be reached by pointer and keyboard.
   - Record screenshot paths for open mobile or tablet nav states in `review.md`.
   - Fail and fix QA if nav links overflow, are clipped, require document-level horizontal scrolling, or are unreachable by keyboard or pointer.
   - Check whole-page screenshots, not only above-the-fold. Inspect top, middle or data-heavy sections, and footer or terminal sections.
   - Check first, middle, and last viewport screenshots; do not only review the hero or above-the-fold content.
   - Run measurable responsive overflow QA when browser tooling is available. Prefer `shared/scripts/audit-responsive-layout.mjs` if present.
   - Test at least viewport widths 390, 768, 1024, 1280, and 1440.
   - Prefer capturing full-page screenshots for all audited widths when practical.
   - For each tested viewport, record `window.innerWidth`, `document.documentElement.scrollWidth`, `document.body.scrollWidth`, and clientWidth/scrollWidth for wide components such as tables, grids, timelines, charts, calendars, code blocks, and comparison matrices.
   - Record top overflow offenders when any are present.
   - Fail and fix the page if document scroll width exceeds viewport width by more than 1px, unless there is an explicit documented exception.
   - Internal horizontal scrolling for wide components is allowed only when intentional and documented. It should generally not appear on normal desktop or tablet layouts unless the component is truly a data grid that requires it.
   - Horizontal scrolling is never an accepted exception for primary navigation.
   - Prefer bundled Maquette scripts over generated run-local `.mjs` scripts for capture and responsive auditing. If a fallback script is generated, list it in `review.md` with the reason.
   - For each major section, write concept-to-code comparison notes in `review.md`: `matches`, `deviates`, `missing`, `simplified`, or `fixed`.
   - If a footer, header, terminal section, image asset, or any other visible concept region is simplified from the concept, either fix it or record the intentional reason and recommended follow-up in `review.md`.
15. Record generated asset manifest status and missing assets, page concept approval decision, page concept region inventory, page layout contract status, site contract status when existing-site mode is active, component sheet/CSS-contract poster vs replica fidelity notes, reusable component usage notes, card anatomy alignment, footer fidelity, terminal-section compactness, media container fit/crop results, mobile drawer scrollability, shared-shell consistency status, measured responsive overflow results, screenshot paths, open nav screenshot paths, visual deviations and fixes, accepted scroll exceptions, navigation accessibility notes, icon-rendering notes, and chosen font family/fallback rationale in `review.md`.

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
- In existing-site mode, preserve the canonical site shell from `.maquette/site/site-contract.md`; do not redesign or vary header/nav, newsletter/terminal regions, footer/legal rows, global CSS, shared JS, tokens, utilities, or shared component styling without an explicit user request and documented waiver.
- In existing-site mode, page-specific CSS/JS must not duplicate global shell implementation. Reuse the existing site CSS/JS entrypoints and keep new page files scoped to page body content.
- Headers and primary navigation must be responsive by design. Do not ship desktop-only inline nav that breaks on tablet or mobile.
- The concept image should drive the creative direction; the code should faithfully implement that direction using approved components first.
- Page implementation fidelity applies to the whole page, including terminal sections such as newsletter and footer areas. Do not let the footer degrade into a generic link list when the concept shows a branded footer composition.
- Page layout fidelity includes section compactness and vertical rhythm. Do not let coded sections become materially taller or looser than the concept by default, especially in the bottom third of the page.
- Major image containers must have explicit fit and crop behavior. Unintended blank media bands, letterboxing, or exposed parent backgrounds are implementation defects unless documented in the layout contract.
- No silent simplification: visible concept regions, generated component details, and requested image assets must be implemented by default. Any simplification must be documented with a concrete reason and follow-up recommendation.
- Icon-like controls in the concept must stay icon-like in code. Social actions, utility actions, and circular/footer controls need visible recognizable icon glyphs plus accessible labels, not short visible text placeholders or unrelated generic icons.
- Page typography must implement the approved font personality. Condensed bold headings should use a close available font strategy, not an unrelated heavy default such as `Impact` unless explicitly approved.
- Product-card, pricing-card, and other repeated-card sections must keep action rows aligned across cards with varied copy length.
