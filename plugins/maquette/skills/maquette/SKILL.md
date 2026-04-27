---
name: maquette
description: Orchestrate Maquette's full staged website workflow for broad plugin-level requests, bootstrapping any missing brand kit, component library, and page artifacts in order.
---

You are responsible for the **full Maquette workflow**.

Use this skill when the user invokes Maquette generally, especially with a broad request such as creating a website, landing page, homepage, page concept, or UI from a brief or existing site.

## Core rule

Do not skip phases.

All Maquette-owned outputs must live under `.maquette/` in the current project. Do not create or overwrite a root-level `index.html` as part of the Maquette workflow. When the user explicitly asks Maquette to add or integrate a runtime page into an existing site, create or update only the requested runtime page path, preserve the existing shell, and keep `.maquette/pages/<page-name>/` as the specification and review mirror.

For broad page or site requests, run the workflow in this order:

1. Brand kit
2. Component library
3. Page or screen

Only proceed to a later phase after the required artifacts for earlier phases exist.

The component-library phase uses focused 1:1 CSS text-on-image component sheets by default. Before generating any CSS-contract poster or optional visual component sheet, create or update `.maquette/components/component-coverage-plan.md` from a project-specific coverage review. Preserve explicit user requests for visual component sheets when the user asks for them or when the component skill documents that a visual anatomy/fidelity supplement is needed. Each accepted CSS-contract poster must be transcribed into a reviewable contract CSS bridge file before implementation CSS is written.

Component coverage is dynamic per project. Do not create a new component sheet or poster just because a new page is being built. New pages should consume the existing component catalog first, extend an existing component when the need is only a variant, state, slot, density, or behavior, and generate new focused CSS-contract poster coverage only for true reusable gaps documented in the coverage plan.

Before component or page implementation, the optional QA tooling decision must be explicit when any planned automated QA path is blocked. Partial availability is not enough: if Playwright is available but `ajv` or `ajv-formats` is missing, ask for an install decision before replacing schema validation with manual JSON checks, unless the user already declined installation for the current run or installation is impossible.

When subagent tooling is available, follow `shared/image-gen-workflow.md` to resolve the image-worker decision before the first Maquette `image_gen` create or edit call. If the user has not already explicitly authorized subagents and has not explicitly declined or requested unattended/no-question mode, ask once whether to use Maquette image-worker subagents. Do not treat "not explicitly authorized" as permission to skip image workers. If authorized, run Maquette image creation and image editing in a dedicated image worker subagent, then have the main workflow inspect the returned project-local image path. This applies to brand boards, CSS-contract posters, visual component sheets, page concepts, and generated page raster assets. Continue in the main workflow only when image workers are explicitly declined, unavailable after the required question, or explicitly bypassed by unattended/no-question language, and record the reason.

Brand boards and page concepts are user approval gates. After the main workflow inspects the generated image, ask whether to use it or make a new one before deriving downstream artifacts. Do not include a separate revise choice in the approval buttons. Do not treat one-shot provisional runs as implicit approval unless the user explicitly requested an unattended run.

Unattended mode requires explicit user language such as `unattended`, `do not ask questions`, `no pauses`, `skip approval questions`, or `make all decisions yourself`. Do not infer unattended mode from `one pass`, `full workflow`, `final homepage`, `fresh disposable test`, `run a Maquette test`, or similar phrasing.

## Existing Site Integration Mode

Before page concept or page implementation work, check whether the repository already contains a website or app shell. Look for entrypoints and shared layers such as `index.html`, `*.html` pages, `css/`, `styles/`, `js/`, `scripts/`, `assets/`, `src/app`, `src/pages`, `src/routes`, `pages`, `app`, `public`, framework config files, and package scripts that serve a site.

If existing website files are present, switch page work into existing-site integration mode:

- inspect the closest existing reference page, usually `index.html` for static sites
- inspect the shared shell: header/nav, logo or brand treatment, newsletter or terminal bands, footer/legal rows, global CSS, token/custom-property layers, shared JS, and reusable components
- create or update `.maquette/site/site-contract.md` from `shared/site-contract.template.md` before page concept generation or implementation
- treat header/nav, footer, newsletter or terminal sections, legal rows, global utilities, tokens, shared component styling, and shared JS behavior as locked unless the user explicitly asks to redesign them
- preserve the reference page shell exactly or document a concrete waiver in the site contract before implementation
- do not duplicate global shell CSS/JS into page-local Maquette CSS/JS; page-specific CSS/JS should cover only genuinely new page body content and interactions
- for new runtime pages, reuse the existing CSS and JS entrypoints; Maquette mirror pages under `.maquette/pages/<page-name>/` may reference those real site assets but must not become an independent second implementation of the shell

If multiple existing pages disagree about the shared shell, infer the dominant shell and document ambiguity in `.maquette/site/site-contract.md` before proceeding. If no existing website/app shell is detected, continue with normal greenfield Maquette behavior.

## Phase gates

Before creating a page concept or page implementation, verify that these brand artifacts exist:

- `.maquette/brand/brief.md`
- `.maquette/brand/design-system.json`
- `.maquette/brand/tokens.css`
- `.maquette/brand/approved.md`
- a generated and inspected brand board image such as `.maquette/brand/brand-board-vN.png`

If any are missing, run the brand-kit phase first using `maquette-brand-kit`.

Before creating a page concept or page implementation, verify that these component artifacts exist:

- `.maquette/components/component-coverage-plan.md`
- `.maquette/components/component-catalog.json`
- `.maquette/components/sheet-inventory.md`
- `.maquette/components/sheet-implementation-log.md` when multiple sheets were needed
- `.maquette/components/css/components.css`
- `.maquette/components/js/components.js`
- `.maquette/components/replica-gallery.html`
- `.maquette/components/approved.md`
- one or more generated and inspected CSS-contract component sheet artifacts, such as `.maquette/components/component-sheet-*-css-contract-vN.png`, plus optional visual supplement sheets when used
- `.maquette/components/contracts/<batch-slug>.contract.css` for each CSS-contract poster batch

If any are missing, run the component-library phase next using `maquette-components`.
If the component catalog does not mark the reusable component library as ready for pages, run `maquette-components` again before the page phase. The page phase should consume reusable components and cataloged APIs, not copy a componentized reference layout.
If the requested page needs dense data patterns, dashboards, tables, maps, calendars, editors, timelines, complex workflows, filter builders, or reusable composites, first update `.maquette/components/component-coverage-plan.md` by inspecting the component catalog, contracts, component CSS/JS, and replica/gallery examples. Reuse or extend existing components when they cover the need. Run `maquette-components` again only when the updated plan identifies a true reusable coverage gap and explains why a new focused CSS-contract poster is needed. Multi-artifact component work should proceed sequentially: generate one focused 1:1 CSS-contract poster by default, or one focused 1:1 visual component sheet only when explicitly requested or documented as a needed supplement, build and review its componentized replica/reference, document reusable component APIs, then move to the next artifact.
If a multi-artifact component catalog records `assets.sheet_implementation_batches`, verify each batch has concrete artifact paths for its transcribed contract, batch replica/reference, batch component CSS/JS, catalog snapshot, screenshot/manual review evidence, and review before proceeding to the page phase. Retrospective batch logs without concrete batch artifacts are not enough.
If the requested page has a header or primary navigation, verify responsive navigation component coverage before running the page phase: desktop inline nav, tablet/mobile collapsed state, menu toggle, expanded panel or drawer, active/focus states, and icon rendering.
If the requested page has product, pricing, service, offer, or promo card grids, verify repeated-card component coverage before running the page phase: shared media/header/body/footer/action anatomy, stable badge or eyebrow placement, equal-height cards, flex or grid card bodies, and bottom-pinned CTA, quantity, price, or action rows.
If the requested page has a rich footer, footer social links, app/download modules, legal/locale rows, or device imagery, verify footer/social module coverage before running the page phase: recognizable social icons, accessible names, link column anatomy, app/device module coverage, bottom strip coverage, and no unrelated generic icon substitutions.
Verify that the page phase will create a concept-region inventory, page layout contract, experience quality contract, and asset manifest before coding. This applies even when the page has few raster assets, because the layout contract is the guardrail for section compactness, terminal-region fidelity, and media fit/crop behavior, while the experience quality contract is the guardrail for generated visual fit, motion/effects, states, accessibility, performance, information clarity, brand craft, and mobile UX.
If existing-site integration mode is active, verify that `.maquette/site/site-contract.md` exists before page concept generation or implementation, and that the page phase will record the selected reference page plus shell-preservation rules in the page blueprint and review.

Only after both gates pass should you run the page phase using `maquette-pages`.

## Existing Website References

An existing website, screenshot, or codebase may inform the brand kit and component library, but it is not a replacement for them. For page implementation inside an existing website, the inspected site shell recorded in `.maquette/site/site-contract.md` is canonical for shared regions and CSS/JS ownership.

Use existing website references to extract:

- product context
- content priorities
- audience expectations
- useful interaction patterns
- visual cues worth preserving

Do not treat copied CSS values, notes, or screenshots as the final design system. First convert the reference into a generated brand board, inspect it with `view_image`, then derive the design-system JSON and CSS tokens from that inspected artifact.

## One-shot requests

If the user asks for a page and the project has no Maquette artifacts yet, complete a full pass in sequence, pausing at the image-worker authorization question and required image approval gates unless the user explicitly asked for an unattended run:

1. Create the brand kit.
2. Create the component library.
3. Create the requested page.

Mark the outputs as proposed or provisional only for phases that do not require an image approval gate, or when the user explicitly requested an unattended run.
Infer focused extra component/composite coverage when the page brief needs it, but document reuse, extension, new reusable gaps, page-specific composites, intended API targets, required selector allowlists, and the reason for each new poster or optional visual sheet in `.maquette/components/component-coverage-plan.md` before image generation. The user should not have to ask for fewer components, split sheets, reuse checks, or wide-data coverage.
Infer responsive navigation coverage for page/site requests with global navigation; the user should not have to ask for mobile nav or overflow checks.
Infer repeated-card and footer/social coverage for commerce, product-grid, pricing, service-list, newsletter, app/download, and footer-heavy pages; the user should not have to ask for card anatomy, action alignment, footer fidelity, or recognizable social icons.
Infer page asset-manifest needs for pages with logos supplied by the user, hero images, product images, promo imagery, lifestyle/story imagery, footer/app/device images, background textures, or requested imagegen assets.
Infer page layout-contract needs for section compactness, terminal regions, image fit/crop behavior, footer structure, and responsive stacking; the user should not have to ask for bottom-of-page fidelity checks.
Infer page experience-quality-contract needs for generated visual fit, purposeful motion/effects, reduced-motion handling, interaction states, accessibility, performance budgets, scan-first information architecture, brand craft, and mobile usability; the user should not have to ask for modern frontend UX QA.

Do not ask the user to manually rerun separate commands unless you are blocked.

## Final review expectations

Page reviews must explicitly pass or fail component reuse before new component creation, component coverage plan completion, CSS-contract poster focus/readability/selector allowlist status for any new component work, optional visual component sheet focus/inspectability when used, generated visual fit, motion/effects appropriateness, reduced-motion behavior, interaction state coverage, accessibility baseline, performance risk/budget, content hierarchy, mobile usability, existing-site shell consistency when applicable, and context fit against the actual product. If a category fails, fix it before approval or document the concrete blocker and follow-up in the relevant `.maquette/pages/<page-name>/review.md`.

## Image workflow

Follow `shared/image-gen-workflow.md` for every generated artifact.

After each `image_gen` create or edit step, inspect the generated image with `view_image` before using it as the source for later artifacts.
