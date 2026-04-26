# Image-gen-first workflow

This plugin is designed around a strict separation of roles:

- `image_gen` = creative visual designer
- coding model = specification writer, implementer, reviewer, and refiner

## Mandatory default behavior

When `image_gen` is available, each phase must use it:

1. Brand kit
   - generate or edit a focused 1:1 brand board
2. Components
   - create or update `.maquette/components/component-coverage-plan.md`, then generate one focused 1:1 visual component sheet at a time by default for reusable gaps justified by that plan
   - generate a focused 1:1 CSS-contract poster only when the user explicitly asks for one or when the component skill documents that a text contract supplement is needed
3. Pages
   - generate or edit a page concept, then translate it into layout, experience-quality, asset, and review contracts before implementation

Only after the visual artifact, and any optional CSS-contract supplement when needed, exists should the workflow proceed to code implementation.

For brand kits, token creation is not script-led extraction. The inspected brand-board image is the visual authority; `design-system.json` and `tokens.css` are machine-readable artifacts derived from that viewed image. Helper scripts may serialize approved JSON into CSS, but they must not infer, normalize, or override palette, typography, spacing, radius, surface, shadow, or state decisions from a predetermined design file unless the user explicitly provides that file as an approved constraint.

## Project output isolation

Maquette-owned artifacts must be written under `.maquette/` in the current project. This includes brand boards, design-system JSON, CSS tokens, component sheets, CSS-contract posters, sheet inventories, componentized references, component CSS/JS, component catalogs, page concepts, page HTML/CSS/JS, generated raster assets, manifests, review notes, Playwright screenshots, and responsive audit JSON.

Do not create, overwrite, or rely on `index.html` in the project root for Maquette output. If the user later wants to integrate a Maquette page into the real app or root site entrypoint, treat that as a separate explicit integration task.

## Mandatory image inspection

After every `image_gen` create or edit step:
- inspect the generated image with `view_image` before treating it as the design source
- do not derive tokens, component specifications, page blueprints, or implementation details from the prompt alone
- if the generated file cannot be inspected, state that limitation and treat the image as unverified
- when revising a prior artifact, inspect both the prior reference and the new generated result when possible

After inspection, continue the same turn unless the user explicitly asked for image-only output. Briefly identify the generated artifact, provide its saved path or asset reference when available, assess whether it matches the request, and continue to the next requested workflow step.

## Image Generation Delegation

Subagent delegation must follow the current Codex runtime policy. If that policy requires explicit user authorization before spawning subagents, Maquette must not silently skip the image-worker path. Absence of prior subagent authorization is a reason to ask the user, not a reason to generate images in the main workflow.

Before the first Maquette `image_gen` create or edit call in a run, resolve the image-worker decision:

- If the user already explicitly asked for subagents or image-worker subagents in the current Maquette request, treat that as authorization for this run and do not ask again.
- If the user explicitly declined subagents/image workers, explicitly asked to avoid questions, or explicitly requested an unattended/no-pauses/skip-approval run, do not ask the image-worker question; use the main workflow and record the reason.
- Otherwise, ask once near the start of the run whether to use dedicated image-worker subagents for Maquette image generation and editing.

Workflow violation: do not make or edit any Maquette image in the main workflow merely because subagents were not previously authorized. The decision must be authorized, declined, explicitly bypassed by unattended language, or blocked by unavailable tooling before the first image generation/editing step starts. A request to use `Image Gen` or to generate image assets is not, by itself, image-worker authorization; ask the preflight question unless the request also authorizes subagents.

Use the Codex user-input/question tool when available. Provide choices equivalent to:
- `Use image workers` as the recommended choice
- `Use main workflow`

If the user chooses image workers, that is explicit authorization for Maquette image-generation and image-edit subtasks in the current run. If the user chooses the main workflow, or if subagents are unavailable after authorization, generate and edit images in the main workflow and record that image-worker handoff was not used.

When authorized and available, Maquette image creation and image editing should run inside a dedicated image worker subagent rather than the main workflow agent.

Use this handoff pattern:
- start a bounded image worker with the specific Maquette artifact type, product brief, approved references, prompt asset, output naming convention, and target project path
- instruct the worker to run `image_gen`, locate the saved image on disk, copy or preserve it under the expected `.maquette/` artifact path, and return the exact source path and project-local path
- capture the worker start time and worker/subagent id when available; if the worker cannot directly report a saved path, use those details to locate the matching file in the Codex generated-images directory by timestamp and filename metadata
- after the worker returns, the main workflow agent must display or inspect the returned project-local image with `view_image`
- the main workflow agent, not the worker, performs approval gating, token/spec extraction, coding, and QA
- if the worker cannot locate a saved file path, the main workflow agent may locate the latest generated image from the Codex generated-images directory and copy it into the expected `.maquette/` path, but must record that path recovery was manual
- if subagents are unavailable after asking, explicitly declined, or explicitly bypassed by unattended/no-question language, perform image generation in the main workflow and record the exact reason the image-worker path was not used

Do not delegate approval decisions to the image worker. The worker creates or edits the visual artifact and reports paths; the main workflow inspects, asks any required approval question, and decides the next phase.

## User Approval Gates

Brand boards and page concepts require explicit user approval after generation and inspection.

After a generated or edited brand-board image passes internal rejection checks and has been inspected with `view_image`, ask the user whether to use it before writing `design-system.json` or `tokens.css`.

After a generated or edited page-concept image passes internal rejection checks and has been inspected with `view_image`, ask the user whether to use it before writing `page-blueprint.json`, `concept-region-inventory.md`, `page-layout-contract.md`, `experience-quality-contract.md`, `asset-manifest.json`, or page code.

Use the Codex user-input/question tool when available. Provide choices equivalent to:
- `Yes, use this` as the recommended choice
- `No, make a new one`

If the user approves, continue the workflow from the inspected image. If the user asks for a new image, regenerate before deriving downstream artifacts. If the user gives free-form revision notes, use those notes as the edit brief, inspect the revised image, and ask again with the same two approval choices. In a one-shot Maquette workflow, do not treat brand boards or page concepts as approved merely because the run is provisional; the approval question is still required unless the user explicitly asked for an unattended run.

An unattended run requires explicit language such as `unattended`, `do not ask questions`, `no pauses`, `skip approval questions`, or `make all decisions yourself`. Do not infer unattended mode from phrases such as `one pass`, `full workflow`, `final homepage`, `fresh disposable test`, `run a Maquette test`, or `complete it end to end`; those still require the image-worker authorization question and the brand-board/page-concept approval gates.

## Inspectability gates

Generated boards, sheets, and CSS-contract posters are approval artifacts only when they are readable at normal preview size.

- Brand boards are the visual-system contract. They must use a 1:1 square composition by default and focus on visual-system fundamentals, not exhaustive component inventories.
- Brand boards must specify font direction and fallback strategy, but must not show detailed component inventories or button/input/card variant specs.
- Brand boards must not contain logo-like marks, brand-name mastheads, large product-name treatments, monograms, seals, badges, app icons, emblems, or trademark-like elements.
- Before any visual component sheet or CSS-contract poster is generated, `.maquette/components/component-coverage-plan.md` must document the project-specific need, existing component reuse check, extension decisions, reusable gaps, page-specific composites, intended API/selector targets, and why each new sheet or optional poster is needed.
- Visual component sheets are the default component design artifacts. They must use 1:1 square composition and be split into focused 1:1 sheets when a single sheet would become cluttered or uninspectable. They should usually cover one major component family, or at most two tightly related small families, so GPT-5.5/Codex can inspect actual visual appearance, anatomy, variants, states, density, spacing, polish, and responsive implications without guessing.
- CSS-contract posters are optional implementation supplements for selectors, states, slots, dimensions, token intent, motion notes, responsive notes, accessibility notes, and performance-safe property guidance. Use them when the user asks for one or when a visual sheet is too ambiguous for reliable implementation. They must use 1:1 square composition, black or near-black background, readable white monospace CSS-like text, and a strict selector allowlist from the coverage plan. They should usually cover one major component family, or at most two tightly related small families, with roughly 8 to 16 meaningful selectors. They must not include `body`, `html`, reset, page layout, gallery, panel, note, or documentation CSS.
- Component sheet batches should be inferred from the current project coverage plan, not a fixed universal taxonomy. Common examples include brand/shell, core actions, forms/filters, data display, cards/composites, feedback/overlays, or motion/live states, but only generate the batches this project actually needs.
- Multi-sheet or multi-poster component work must be sequential: inspect, inventory, build a componentized reference, review, and document reusable component APIs from the current artifact before generating the next artifact. The current artifact must produce concrete category-prefixed batch artifacts under `.maquette/components/` before the next artifact is generated, with transcribed contracts under `.maquette/components/contracts/`, CSS under `.maquette/components/css/`, and JS under `.maquette/components/js/`; retrospective logs after all artifacts are generated are not sufficient.
- Each component sheet or optional CSS-contract poster batch must complete screenshot review or documented manual visual review against the generated artifact before the next artifact is generated.
- Visual component sheets are the default source of truth for component families, variants, states, anatomy, density, spacing, radius, shadows, polish, and composites while using reusable CSS/JS and cataloged APIs from the start. If an optional CSS-contract poster is used, coded componentized references must also honor its selector, state, slot, dimension, and token intent.
- Every inspected CSS-contract poster must be transcribed into `.maquette/components/contracts/<batch-slug>.contract.css` before implementation CSS is written. The transcription is the reviewable bridge from image text to code: preserve selector intent, normalize OCR mistakes, remove rejected non-component selectors, and note any unreadable rules.
- Repeated-card sheets must show shared media/header/body/footer/action anatomy, consistent badge or eyebrow placement, equal-height cards, and bottom-pinned action rows when card grids are relevant.
- Sites or pages with global navigation need inspectable responsive navigation coverage before implementation: desktop inline nav, tablet/mobile collapsed state, menu toggle, expanded panel or drawer, active/focus states, and visible icons.
- Page concepts with headers or primary navigation must define desktop, tablet, and mobile behavior. A desktop-only navigation concept is incomplete.
- In existing-site integration mode, page concepts must preserve the site contract and selected reference page shell: brand name, logo or wordmark treatment, navigation labels/model, footer model, newsletter or terminal pattern, typography, spacing, and shared shell density. Reject, regenerate, or edit concepts that introduce a new brand, new logo, unrelated navigation, inconsistent footer/newsletter, or a redesigned shared shell unless the user explicitly asked for that redesign.
- Page concepts must make visible regions identifiable for pre-code inventory: header, nav, hero, sidebars, annotations, product grids, promo cards, newsletter, footer, bottom bars, mobile/tablet callouts, app/device modules, social links, and imagery.
- Page concepts should imply appropriate motion/effects moments, interaction states, context-fit visual assets, mobile/tablet behavior, and empty/loading/error/offline states when relevant. Implementation must not infer exact motion solely from the image; exact motion/effect rules belong in `.maquette/pages/<page-name>/experience-quality-contract.md`.
- Page concepts should use generated visuals that support the real product function and hierarchy. Reject, regenerate, or edit concepts whose visuals imply the wrong feature, look like generic AI decoration, push core tasks too far down, reduce trust, conflict with the product category, or would be better as CSS/SVG/code-native effects.
- Page concepts with product, pricing, service, offer, or promo cards must make repeated-card anatomy and action-row alignment clear enough to implement.
- Page and component concepts that need raster images must make required asset types identifiable, such as hero images, product-card images, promo images, lifestyle/story images, footer/app/device images, and background textures.
- Reject, regenerate, edit, or split an artifact before using it if labels are too small, unrelated families are crammed together, elements overlap, implementation notes dominate, or the image cannot guide implementation without heavy zooming.

## Fidelity gates

Before page implementation, create a concept-region inventory, page layout contract, experience quality contract, and generated asset manifest. In existing-site integration mode, also create or update `.maquette/site/site-contract.md` before page concept generation or implementation. Visible concept regions default to implementation, not omission. Any region or asset that is simplified, omitted, implemented differently, blocked on assets, or blocked on component coverage must be documented with a concrete reason before coding proceeds.

For existing websites, the site contract is the canonical shared-shell contract. Header/nav, footer, newsletter or terminal bands, legal rows, global utilities, tokens, shared component styling, and shared JS behavior are locked unless the user explicitly asks to redesign them. Page-local Maquette CSS/JS must not duplicate global shell implementation; it should cover only genuinely new page body content and interactions. Maquette mirror pages may reference the real site CSS/JS for review, but they must not become a second independent implementation source for shared regions.

The page layout contract should translate the inspected page concept into implementable layout rules before code is written: section order, relative section heights, density/compactness, background bands, grid behavior, image aspect ratios, image crop and fit behavior, footer structure, legal/bottom rows, and mobile stacking. Terminal sections such as impact strips, newsletter blocks, rich footers, app/download areas, social areas, and legal rows must be included. Blank image-container bands or letterboxing are deviations unless the contract explicitly accepts them.

The page experience quality contract should translate the inspected page concept into implementable UX quality rules before code is written: generated visual fit, motion/effects, interaction states, accessibility, performance, content and information architecture, brand craft, mobile/responsive UX, and QA acceptance criteria. Every generated raster/decorative image used by the page must be reviewed for purpose, region, product-function fit, false-feature risk, distraction risk, CSS/SVG/code-native alternative, use/revise/replace/remove decision, and alt/decorative-hidden handling before implementation.

Motion/effects must be purposeful and product-appropriate. For every page, list each motion/effect with name, purpose, trigger, affected element, duration, easing, CSS properties, JS requirement, reduced-motion fallback, accessibility risk, performance risk, and QA status. All non-essential motion must support `prefers-reduced-motion`; ambient loops should be disabled or simplified under reduced motion. Auto-moving, blinking, scrolling, or updating decorative content lasting more than 5 seconds must have pause/stop/hide controls unless essential. Prefer `transform` and `opacity`, keep JS animation minimal, avoid layout-heavy animations unless justified, and never allow animation to cause overflow or delay interaction response.

Before component coding, write a component coverage plan and sheet inventory. The coverage plan documents reuse/extend/create/page-specific decisions, intended API targets, and optional selector allowlists before image generation. The sheet inventory lists visible component families, variants, states, larger patterns, unclear or cramped areas, missing coverage, and the decision to implement, regenerate, split, or create another focused sheet or optional poster.

Before accepting component implementation, compare the coded componentized reference screenshots against the approved focused visual component sheets, and optional CSS-contract posters when used, with the component fidelity rubric:
- coverage: visible component families, variants, and states are implemented
- visual match: match the focused visual sheet and approved brand closely enough after screenshot review; also match the optional poster contract when one was used
- anatomy match: cards, navigation, forms, tables, and composites preserve visible structure
- responsive match: mobile, tablet, and navigation behavior shown or implied by the sheet is represented
- implementation quality: semantic HTML, token usage, working icons, readable active/selected/inverse states, no unintended overflow, and no unreadable or overlapping text

After the componentized reference passes review, ensure the component CSS/JS and component catalog expose the reusable APIs, slots, states, JS behavior, and usage examples proven by that reference. Page implementations should consume the reusable catalog, CSS, and JS, not copy the reference page layout.

Use Maquette's bundled scripts for optional QA tooling checks, screenshot capture, linked asset validation, responsive audits, contrast/API checks, JSON validation, and page-consumption smoke checks when available. Optional Node dependencies should be resolved from the current project; do not rely on global npm installs. For component workflows, check optional QA tooling immediately after the brand kit exists and before component sheets, CSS-contract posters, or component code are generated. Treat partial QA availability as missing QA tooling: if browser QA can run but `ajv` or `ajv-formats` is missing, schema validation is still blocked and requires an install decision. If `ensure-qa-tooling.mjs` reports missing packages, blocked QA capabilities, or `installDecisionRequired: true`, ask the user through the Codex user-input/question tool before installing project-local dependencies or skipping those checks, unless the user already declined for this run or installation is impossible. If the user agrees, install `playwright`, `ajv`, and `ajv-formats` in the current project and continue automated QA; if the user declines, continue with manual review and record the missing tooling. Generated run-local scripts are fallback-only and must be documented in the relevant approval notes with the reason the bundled helper did not cover the scenario.

No silent simplification is allowed across brand, component, or page phases. If implementation cannot match a generated artifact, record the deviation, reason, and recommended follow-up in the relevant `approved.md` or `review.md`.

## Responsive QA

When browser tooling is available, page and component QA must include responsive navigation and overflow checks at 390, 768, 1024, 1280, and 1440px.

- Primary navigation must not create document-level horizontal overflow.
- Tablet/mobile primary navigation should use an accessible menu toggle plus stacked panel or drawer, not horizontal-scrolling nav as the default.
- For tablet/mobile, inspect closed and open navigation states and record open-state screenshot paths.
- If a menu toggle exists, click it and verify `aria-expanded` changes.
- Opened mobile/tablet drawers must remain scrollable when content exceeds viewport height, even when body scroll lock is active. Prefer `overflow-y: auto` and `overscroll-behavior: contain`; close controls and links must remain reachable.
- Repeated product-card and comparable card grids must be checked for shared anatomy, equal-height cards, stable badge/eyebrow placement, and aligned CTA, quantity, price, or action rows across varied copy lengths.
- Rich footers must be compared against the concept for logo placement, link columns, social icons, app/download modules, device imagery, legal links, locale/shipping rows, cookie/bottom strips, and brand blurbs. Generic footer simplification fails unless documented.
- Page compactness and vertical rhythm must be compared against the concept for the top, middle, and bottom of the page. A matching hero does not compensate for terminal sections that become materially taller, looser, or more generic than the concept.
- Page visual review should use both full-page overview screenshots and segmented viewport screenshots. Full-page screenshots show whole-page composition; segmented screenshots preserve normal viewport scale for detailed review. At minimum, capture top, middle, and bottom/terminal segments for desktop and mobile when browser tooling is available. Add named segments for data-heavy regions, filters, important interaction states, and terminal/footer areas when relevant.
- Major media containers must be checked for intended image fit and crop behavior. Unintended blank bands, letterboxing, or exposed parent backgrounds around fitted images should be fixed before page approval.
- Footer social links shown as icons in the concept must render as recognizable social icons with accessible names, not unrelated generic icons or text abbreviations unless the concept explicitly uses text badges.
- Typography QA must compare coded font family, weight, width, scale, and line-height against the approved visual references. Record font fallback rationale, and avoid `Impact` unless explicitly approved by the brand system.
- Navigation and state contrast QA must check active, selected, current, focus, disabled, inverse, and dark-surface states so text and icons never disappear into their background.

## Final review requirements

Final component and page review files must summarize component reuse before new component creation, component coverage plan status, visual component sheet focus/readability/inspectability, optional CSS-contract poster focus/readability when used, generated asset manifest and missing assets, generated visual fit, concept-region inventory, page layout contract status, experience quality contract status, motion/effects appropriateness, reduced-motion behavior, interaction state coverage, accessibility baseline, performance risk/budget, content hierarchy, brand craft, mobile usability, context fit against the actual product, site contract status and shell consistency results when existing-site mode is active, component sheet or optional CSS-contract poster vs replica fidelity, reusable component readiness, card anatomy alignment, terminal-section compactness, media-container fit/crop results, footer fidelity, mobile drawer scrollability, responsive overflow measurements, full-page overview screenshots, segmented viewport screenshots, open nav screenshots, visual deviations, and fixes. If a category fails, fix it or document a concrete blocker. "Screenshots captured" alone is not a sufficient review.

## Transparent image requests

Most Maquette artifacts are opaque boards, sheets, and page concepts. If a task explicitly requests a transparent PNG output, verify that the saved PNG has a real alpha channel before treating it as complete. If the image has a rendered checkerboard or solid background instead of true transparency, leave the original untouched, create a repaired transparent derivative, and verify the repaired PNG before reporting success.

## Editing visible images

When revising a previously generated or local image:
- make the image visible in the conversation first, typically via `view_image`
- ask `image_gen` to edit the visible image
- preserve approved style unless the user requested change
