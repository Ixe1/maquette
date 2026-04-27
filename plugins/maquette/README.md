![Maquette](./assets/logo.png)

# Maquette

Maquette is a Codex plugin by **Ixel** for image-guided website design-system workflows.

It is intentionally **image-guided**:
- `image_gen` is the creative design engine
- the coding model is the implementation and review engine
- screenshots of coded output are used for visual comparison and refinement

The default workflow is therefore:
1. **Generate or edit a visual artifact first** with `image_gen`
2. **Inspect the generated artifact** with `view_image`
3. **Convert that artifact into machine-readable design contracts** such as JSON and CSS tokens
4. **Build a componentized visual reference** for each component artifact using reusable HTML/CSS/JS from the start
5. **Document reusable APIs, slots, states, and usage examples** before moving to the next artifact
6. **Render and screenshot the implementation**
7. **Compare implementation against the approved visual artifact** and iterate

This experimental dev build uses a concept-first extraction workflow for broad page requests. After the brand kit, Maquette generates a tall portrait page concept for discovery and asks whether to use it. From the approved concept it writes `.maquette/pages/<page-name>/component-extraction-plan.md`, updates `.maquette/components/component-coverage-plan.md`, then creates only the reusable component coverage needed to clone that concept. Component coverage now defaults to focused 1:1 visual component close-ups edited from the approved concept. Codex inspects one close-up at a time, writes reusable HTML/CSS/JS, captures a rendered component screenshot no larger than 1024x1024, compares it to the close-up, fixes mismatches, and only then moves to the next component. Legacy CSS text-on-image posters are explicit-only experiments, not the default route.

When subagent tooling is available but the runtime requires explicit user authorization before spawning subagents, Maquette should ask once near the start of the run whether to use image-worker subagents. Lack of prior subagent authorization is a prompt condition, not a reason to skip image workers. If the user authorizes image workers, Maquette should run image creation and image editing in a dedicated image worker subagent. The worker generates or edits the image, locates the saved file on disk, copies or preserves it under the expected `.maquette/` path, and returns the exact source and project-local paths. The main workflow then inspects the returned image and continues with approval, contracts, coding, and QA. Maquette should use the main workflow for image generation only when the user declines image workers, subagent tooling is unavailable after the question, or the user explicitly requests an unattended/no-question run, and it should record that reason.

This plugin includes a root workflow skill plus three focused phase skills:
- `maquette`
- `maquette-brand-kit`
- `maquette-components`
- `maquette-pages`

## Quick start

Maquette helps Codex turn an approved visual direction into reusable website artifacts:
- brand kits with design-system JSON and CSS tokens
- component libraries with reusable HTML/CSS/JS and reference QA
- implemented pages with screenshot and responsive review notes

Install the marketplace, restart Codex, then invoke the full workflow with `@Maquette` or `$maquette`:

```sh
codex plugin marketplace add Ixe1/codex-plugins --ref master
```

```text
@Maquette Make a homepage for "Northstar Metrics", a lightweight analytics product. Include a metrics overview, recent activity, and a clear signup path.
```

Use `$maquette-brand-kit`, `$maquette-components`, or `$maquette-pages` when you want to run one phase at a time.

See [`CHANGELOG.md`](./CHANGELOG.md) for notable Maquette workflow, prompt, and release changes.

## Core rule

If the `image_gen` tool is available in the environment, it is **not optional** for the normal happy-path workflow.

Each phase must use it as follows unless the user explicitly asks to skip image generation or the environment genuinely lacks the tool:
- brand-kit phase -> create or edit a focused foundational 1:1 **brand board image** with no logo, wordmark, brand mark, large product-name treatment, or detailed component inventory; record explicit typography recommendations and fallback strategy
- page concept phase -> create or edit a tall portrait **page concept image** for discovery; use 1:1 images later for component/region extraction, not as the default full-page concept format
- components phase -> create `.maquette/pages/<page-name>/component-extraction-plan.md`, update a dynamic **component coverage plan**, then create one focused 1:1 **visual component close-up** at a time from the approved concept for missing reusable coverage justified by the coverage plan. Use CSS text-on-image posters only when explicitly requested as the legacy route.
- page implementation phase -> write a page layout contract, experience quality contract, and asset manifest before code implementation

After every generated or edited image, inspect the actual result with `view_image` before using it as the basis for tokens, component specs, page blueprints, or code. Do not continue from the prompt alone.
Brand-board and page-concept images are explicit user approval gates. After Maquette generates and inspects one, it should ask whether to use it or make a new one before deriving tokens, page blueprints, layout contracts, assets, or code. The approval buttons should not include a separate revise choice, though free-form revision notes may still be handled if the user provides them. Component close-ups and explicit legacy CSS-contract posters remain internal implementation artifacts unless the user explicitly asks to approve each one.
Maquette should only skip these questions when the user explicitly asks for an unattended run with wording such as "do not ask questions", "no pauses", or "skip approval questions". Requests for a "one pass", "full workflow", "final homepage", "fresh disposable test", or "Maquette test" are not unattended requests by themselves.
Generated boards and component close-ups should be inspectable at normal preview size. Maquette should regenerate, edit, crop, or split close-ups that are cluttered, unrelated to the concept region, logo-like, too page-wide, or hybrid enough that CSS text and visuals compete.
Sites with primary navigation should define responsive navigation before page implementation: desktop inline nav, tablet/mobile menu toggle, expanded panel or drawer, accessible states, and no document-level horizontal scrolling for nav.
Repeated card grids should define equal-height cards and bottom-pinned action rows before page implementation. Footer social links should use recognizable social icons, and page typography should follow the approved font strategy rather than crude defaults such as `Impact`.
Component implementation includes hard gates per artifact: first make the optional QA tooling decision, then write the coverage plan, create one focused 1:1 visual component close-up from the approved concept for a documented reusable gap, render an artifact-specific componentized replica/reference using reusable CSS/JS, screenshot-match it with evidence capped at 1024x1024, write batch artifacts, and only then move to the next artifact. Every close-up should usually cover one major component family, or at most two tightly related small families, and must remain inspectable at normal preview size.
Page implementation includes fidelity and UX gates: inventory visible concept regions, write a page layout contract for section compactness, image fit/crop behavior, terminal regions, and responsive structure, create an asset manifest for required raster assets, write an experience quality contract for generated visual fit, motion/effects, states, accessibility, performance, information architecture, brand craft, and mobile UX, then document section-by-section screenshot comparison notes before approval.

When Maquette detects an existing website or app shell, page work enters **existing-site integration mode**. Maquette should inspect the existing entrypoints and shared assets, create `.maquette/site/site-contract.md`, preserve the canonical header/nav, footer, newsletter or terminal bands, legal rows, shared CSS, shared JS, tokens, and global utilities, then limit new page CSS/JS to genuinely new page body content. Page concepts should preserve the existing shell and explore only the unique page content unless the user explicitly asks for a redesign.

## Output philosophy

The brand board is the 1:1 visual-system contract.
The component extraction plan is the page-specific bridge from an approved concept to reusable components.
The component coverage plan is the Codex-readable planning artifact for reuse, extension, true reusable gaps, page-specific composites, and focused component close-up batches.
The focused visual component close-up is the default 1:1 component artifact for anatomy, slots, variants, states, density, spacing, radius, shadows, motion/effect cues, responsive implications, and reusable patterns visible in the approved page concept.
Codex translates close-up imagery into accessible component APIs, selectors, states, slots, and tokenized HTML/CSS/JS. Legacy CSS-contract posters are available only when explicitly requested, and then the transcribed contract CSS is the implementation bridge from inspected image text to final tokenized component CSS.
The reusable component library is the CSS/JS/catalog API proven by that reference and consumed by pages.
The page experience quality contract is the UX implementation guardrail for generated visual fit, purposeful motion, reduced motion, state coverage, accessibility, performance, information architecture, brand craft, and mobile behavior.
The structured JSON/CSS files are the machine-readable source of truth.
The coded reference/page screenshots are the verification artifacts.
`image_gen` is creative inspiration, not final UX truth. Codex must translate generated imagery into accessible, performant, context-appropriate frontend implementation.
Token scripts are serializers, not design authorities: `tokens.css` should be exported from the inspected-board-derived `design-system.json`, not extracted from or overridden by a predetermined design file unless the user explicitly approves that file as a constraint.
All Maquette-owned project artifacts are isolated by the workflow under `.maquette/`, including generated images, HTML/CSS/JS, manifests, review notes, Playwright screenshots, and responsive audit output. Maquette should not create a root-level `index.html`; runtime app integration is a separate explicit task. When the user does ask to add a runtime page to an existing site, Maquette should preserve the existing shell and treat `.maquette/pages/<page>/` as the spec/review mirror.

## Example output

![Example Maquette snack cakes page output](./assets/example-board.png)

![Example Maquette page output](./assets/example-page.png)

## How to use

Maquette can be used as a one-shot workflow or as three manual passes.

### One-shot workflow

For a new project or broad page request, invoke Maquette directly:

```text
@Maquette Make a homepage for "Northstar Metrics", a lightweight analytics product. Include a metrics overview, recent activity, and a clear signup path.
```

If brand or component artifacts are missing, Maquette should create the brand kit, generate the page concept for discovery, extract concept-derived component coverage, then create the requested page implementation. Existing websites, screenshots, and code can inform the brand kit, but they do not replace the generated brand board, approved page concept, extraction plan, and component artifacts.

### 1. Create a brand kit

Start with `$maquette-brand-kit` and describe the company, product, audience, or aesthetic direction:

```text
$maquette-brand-kit Make a branding kit for a boutique accounting firm for creative studios.
```

This pass creates a foundational brand board first, then turns it into design-system files such as:

```text
brand/brief.md
brand/design-system.json
brand/tokens.css
brand/approved.md
```

Review the generated brand direction, then approve it or ask Maquette to make a new one.
Maquette should ask for approval immediately after viewing the generated board, before writing design-system JSON or CSS tokens.

### 2. Build the component library

After the brand kit is approved, use `$maquette-components`:

```text
$maquette-components Make a component library.
```

For a concept-first page run, Maquette first writes `.maquette/pages/<page-name>/component-extraction-plan.md` from the approved concept, then uses image edits on the concept to create focused 1:1 close-ups for components that need implementation or extension. The component pass then creates or updates `.maquette/components/component-coverage-plan.md`. The plan is dynamic per project: it records current required families, likely future reusable families to avoid overbuilding, existing coverage, extension-only needs, true reusable gaps, page-specific composites, focused close-up batches, intended component API targets, source concept regions, and rationale. It should not use a fixed universal component taxonomy.
After the plan identifies a needed reusable gap, Maquette creates a focused component close-up, builds and reviews a componentized visual reference with reusable classes, states, slots, and usage examples, screenshot-matches the rendered result against the close-up, writes batch artifacts, then repeats that loop only for additional focused artifacts the product actually needs. CSS-contract posters can be generated only when explicitly requested as the legacy experiment.
When a site has global navigation, the component pass should include responsive nav variants for desktop, tablet, and mobile.
Every default component close-up is 1:1. Maquette should not generate all component artifacts before implementation. Each multi-close-up batch should create concrete category-prefixed evidence directly under `.maquette/components/`, including `<batch-slug>.replica.html`, `css/<batch-slug>.components.css`, `js/<batch-slug>.components.js` when needed, `<batch-slug>.component-catalog.json`, `<batch-slug>.review.md`, and `contracts/<batch-slug>.contract.css` only when a legacy CSS-contract poster was explicitly used. The final `replica-gallery.html` is the componentized reference, linked to `css/components.css` and `js/components.js`; pages should use the cataloged component API rather than copying that reference layout.
Each batch must complete screenshot review or documented manual visual review against its source close-up before Maquette generates the next component artifact.
New pages consume the existing component catalog first. A new close-up is appropriate only when the coverage plan proves existing APIs cannot cleanly cover the need.

### 3. Create pages

Use `$maquette-pages` either to create the concept-first discovery artifact after the brand kit, or to implement a page after the component library exists:

```text
$maquette-pages Make a homepage for the accounting firm.
```

You can also give a more detailed page brief:

```text
$maquette-pages Make a homepage with a proof-led hero, services section, client logos, founder note, pricing preview, and consultation CTA.
```

In concept-first mode, this pass creates a tall portrait page concept, asks for approval, and writes the component extraction plan before component expansion. In implementation mode, it updates the component coverage plan for the page, writes a page layout contract for section density, media crops, terminal sections, and responsive behavior, writes an experience quality contract for generated visual fit, purposeful motion/effects, reduced-motion behavior, states, accessibility, performance, information architecture, brand craft, and mobile UX, implements the page with the approved brand and component references, captures segmented screenshots capped at 1024x1024 when possible, and records review notes.
Maquette should ask for approval immediately after viewing the page concept, before writing the blueprint, inventory, layout contract, experience quality contract, asset manifest, or page code.

Every generated raster or decorative image used by a page should be checked before implementation. The review should record purpose, consuming region, product-function fit, false-feature risk, distraction risk, whether CSS/SVG/code-native effects would be better, use/revise/replace/remove decision, and alt text or decorative-hidden handling. Motion is encouraged when it improves orientation, feedback, live states, loading, filtering, overlays, or subtle brand craft, but all non-essential motion needs reduced-motion support and performance-safe implementation.

If the repo already contains a website, Maquette should first select the closest reference page, usually `index.html` for static sites, then write `.maquette/site/site-contract.md`. New pages should reuse the existing site CSS/JS entrypoints and preserve the existing shell instead of creating page-local variants of shared header, newsletter, footer, button, reset, token, or navigation behavior.

## Invocation

You can invoke Maquette explicitly by naming the plugin or one of its bundled skills:

```text
@Maquette make a homepage for a new SaaS product.
$maquette-brand-kit create a brand kit for an AI note-taking app.
$maquette-components build the component library from the approved brand kit.
$maquette-pages make a pricing page.
```

Use `@Maquette` or `$maquette` when you want the full staged workflow. Use the individual phase skills when you intentionally want to work on only one phase.

## Optional QA tooling

Maquette can use project-local Node dependencies for automated screenshot capture, responsive overflow QA, existing-site shell consistency checks, component API smoke checks, page-consumption smoke checks, and JSON schema validation. These dependencies are **not** bundled with the plugin, and installing Maquette does not create `node_modules`.

If your project does not already have the optional QA dependencies installed, add them in the project where Maquette is generating UI files:

```sh
npm i -D playwright ajv ajv-formats
npx playwright install chromium
```

You can check whether the current project has the optional QA tooling available without installing anything:

```sh
node plugins/maquette/shared/scripts/ensure-qa-tooling.mjs --project . --check-browser --json .maquette/qa-tooling.json
```

During a Maquette run, Codex should check optional QA tooling before component close-ups, explicit legacy CSS-contract posters, or component code are generated. Partial availability still counts as missing QA tooling: if Playwright is available but `ajv-formats` is missing, browser QA can run but schema validation is blocked. If `ensure-qa-tooling.mjs` reports missing packages, blocked QA capabilities, or `installDecisionRequired: true`, Codex should ask before installing dependencies or skipping those automated checks, unless the user already declined for the run or installation is impossible. If the user agrees, Codex can run the project-local install commands and continue with automated QA. If the user declines, Maquette should continue with manual screenshot/schema review and record that automated QA tooling was unavailable.

Project-local installs are the recommended path. Global npm installs are not recommended because Node usually will not resolve global packages from plugin scripts unless the user also configures environment-specific module lookup such as `NODE_PATH`.

The bundled browser scripts load `playwright` from the current project when available and launch Chromium in headless mode. The JSON validation helper loads `ajv` and `ajv-formats` from the current project when available:

```sh
node plugins/maquette/shared/scripts/ensure-qa-tooling.mjs --project . --check-browser
node plugins/maquette/shared/scripts/capture-browser.mjs .maquette/components/replica-gallery.html .maquette/components/replica-gallery.png --width 1024 --height 1024 --json .maquette/components/reference-capture.json
node plugins/maquette/skills/maquette-components/scripts/capture-gallery.mjs .maquette/components/replica-gallery.html .maquette/components/replica-gallery.png --width 1024 --height 1024
node plugins/maquette/skills/maquette-pages/scripts/capture-page.mjs .maquette/pages/homepage/page.html .maquette/pages/homepage/screenshots/page-1024.png --mode segments --segments top,middle,bottom --width 1024 --height 1024 --json .maquette/pages/homepage/segment-capture-1024.json
node plugins/maquette/skills/maquette-pages/scripts/capture-page.mjs .maquette/pages/homepage/page.html .maquette/pages/homepage/screenshots/page-390.png --mode segments --segments top,middle,bottom --width 390 --height 844 --json .maquette/pages/homepage/segment-capture-390.json
node plugins/maquette/shared/scripts/validate-linked-assets.mjs .maquette/components/replica-gallery.html --json .maquette/components/linked-assets.json
node plugins/maquette/shared/scripts/audit-responsive-layout.mjs .maquette/pages/homepage/page.html --json .maquette/pages/homepage/responsive-audit.json --screenshots-dir .maquette/pages/homepage/screenshots
node plugins/maquette/shared/scripts/check-component-gallery.mjs .maquette/components/replica-gallery.html --json .maquette/components/component-reference-check.json
node plugins/maquette/shared/scripts/page-consumption-smoke.mjs --project . --json .maquette/components/page-consumption-smoke.json
node plugins/maquette/shared/scripts/validate-artifacts.mjs --project . --json .maquette/components/artifact-validation.json
```

Screenshot capture and responsive auditing should stay headless, and every browser instance opened for capture must be closed before the workflow finishes. The bundled scripts close Chromium in a `finally` block. Visual review screenshots should be no larger than 1024x1024. Page visual review should use segmented viewport screenshots, typically top, middle, and bottom/terminal for desktop and mobile, so detailed review happens at normal viewport scale without giant screenshots. Linked asset validation should pass for each batch replica and the final component reference before the next component artifact or page phase begins.

Responsive review should record measured overflow results at 390, 768, 1024, 1280, and 1440px when browser tooling is available. Page-wide horizontal overflow greater than 1px should be fixed unless an explicit exception is documented. Internal scrolling for genuine wide components should be reported separately from true document overflow.
For pages with navigation, tablet/mobile review should capture closed and open nav states, verify the menu toggle changes `aria-expanded`, and reject nav that clips, overflows, or requires document-level horizontal scrolling.
For pages with repeated cards, review should compare shared anatomy, badge placement, CTA, quantity, price, and action-row alignment across cards with varied copy lengths. For rich footers, review should verify footer structure rather than accepting generic columns. For pages with social links, review should verify recognizable social icons with accessible names. Mobile drawer review should verify opened drawers can scroll independently when needed. Typography review should record the chosen font family, fallback stack, and rationale.
Final page review should explicitly pass or fail component reuse before new component creation, component extraction plan completion when concept-first is used, component coverage plan completion, component close-up focus/fidelity and screenshot-match status for any new component work, legacy CSS-contract poster focus/readability/selector allowlist status only when explicitly used, generated visual fit, motion/effects appropriateness, reduced-motion behavior, interaction state coverage, accessibility baseline, performance risk/budget, content hierarchy, mobile usability, existing-site shell consistency when applicable, screenshot evidence capped at 1024x1024 or segmented, and context fit against the actual product. If actual performance measurement tooling is unavailable, Maquette should record a static risk review rather than claiming measured LCP, INP, or CLS.

If Playwright is not available, Maquette can still create the design contracts and code, but screenshot-based visual comparison becomes a manual review step. In that case the component catalog should use `review_mode: "manual"`, record `blocked_screenshot_reason`, and put HTML or other non-screenshot evidence in `gallery_review_artifact_paths` rather than pretending those files are screenshots.

If `ajv` or `ajv-formats` is not available, Maquette can still continue only after the install decision has been made. Schema validation should then be recorded as unavailable or performed manually rather than reported as passed. When available, the bundled artifact validator also checks that component-catalog paths such as approval notes, references, transcribed contracts, batch reviews, screenshots, and catalog snapshots actually exist.

Generated project-local scripts are fallback-only. Prefer the bundled Maquette helpers for capture, responsive audits, contrast/API smoke checks, JSON validation, and page-consumption smoke checks; if a generated fallback script is necessary, document it in `approved.md` or `review.md` with the reason.

Disposable Maquette smoke runs used while developing this plugin should live under `.maquette-test/`. The repository ignores that directory so generated screenshots, local `node_modules`, and temporary validation artifacts are not committed.

## Installation

### Add the Ixel marketplace

For active development, add the Ixel marketplace from the `dev` branch:

```sh
codex plugin marketplace add Ixe1/codex-plugins --ref dev
```

If the Ixel marketplace is already configured, refresh it instead:

```sh
codex plugin marketplace upgrade ixel
```

For released versions, use the default branch:

```sh
codex plugin marketplace add Ixe1/codex-plugins --ref master
```

Then restart Codex, open the plugin directory, select the Ixel marketplace, and install Maquette.

In Codex CLI, open the plugin directory with:

```text
/plugins
```

If you want a sparse checkout for the marketplace source, include both the marketplace metadata and plugin folder:

```sh
codex plugin marketplace add Ixe1/codex-plugins --ref dev --sparse .agents/plugins --sparse plugins/maquette
```

### Manual local install

For local testing, copy or clone this plugin so the plugin root is available at:

```text
~/.codex/plugins/maquette
```

On Windows, that is typically:

```text
%USERPROFILE%\.codex\plugins\maquette
```

The plugin root is the directory that contains `.codex-plugin/plugin.json`, `skills/`, and `shared/`.

Then add a personal marketplace at `~/.agents/plugins/marketplace.json`:

```json
{
  "name": "ixel",
  "interface": {
    "displayName": "Ixel"
  },
  "plugins": [
    {
      "name": "maquette",
      "source": {
        "source": "local",
        "path": "./.codex/plugins/maquette"
      },
      "policy": {
        "installation": "AVAILABLE",
        "authentication": "ON_INSTALL"
      },
      "category": "Design"
    }
  ]
}
```

Restart Codex, open the plugin directory, select the Ixel marketplace, and install Maquette.

After installation, start a new thread and invoke the full workflow with `@Maquette` or `$maquette`. Use `$maquette-brand-kit`, `$maquette-components`, or `$maquette-pages` when you intentionally want a single phase.
