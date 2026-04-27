Use `shared/page-blueprint.schema.json` together with the approved design system and component catalog.

Before page implementation, also create:

- `.maquette/pages/<page-name>/component-extraction-plan.md` from `shared/page-component-extraction-plan.template.md`
- `.maquette/pages/<page-name>/concept-region-inventory.md` from `shared/concept-region-inventory.template.md`
- `.maquette/pages/<page-name>/segments/<segment-name>-layout-contract.md` from `shared/page-segment-layout-contract.template.md`
- `.maquette/pages/<page-name>/page-layout-contract.md` from `shared/page-layout-contract.template.md`
- `.maquette/pages/<page-name>/experience-quality-contract.md` from `shared/page-experience-quality-contract.template.md`
- `.maquette/pages/<page-name>/asset-manifest.json` using `shared/page-asset-manifest.schema.json`

In concept-first discovery mode, create and approve separate top, middle, and bottom 16:9 desktop page concept segments before component expansion, then write the component extraction plan and use it to update `.maquette/components/component-coverage-plan.md`. Before requesting new component coverage for a page, reuse or extend existing component APIs first. The page concept segments are creative guidance, not final UX truth; segment layout, typography, text fit, generated visuals, motion/effects, interaction states, accessibility, performance, information architecture, brand craft, and mobile UX must be translated into contracts before code.
