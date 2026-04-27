Use `shared/component-coverage-plan.template.md` and `shared/component-catalog.schema.json` together with the approved design system and approved page concept.

Before any component close-up image or legacy CSS-contract poster, create or update `.maquette/components/component-coverage-plan.md`. Reuse existing components first, extend them when only a variant/state/slot/density/behavior is missing, and create new reusable component coverage only for true structural gaps.

The coded componentized reference should be reviewed as a faithful implementation of the generated focused 1:1 visual component close-up by default, including component APIs, component families, variants, states, repeated-card anatomy, responsive navigation, newsletter modules, footer/social modules, reduced-motion behavior, accessibility, and performance-safe effects. Codex writes implementation contracts and reusable APIs after inspecting the close-up; `image_gen` should not render CSS text on component images in the default experiment.

Prompt assets:

- `component-sheet-prompt.md`: default visual component close-up prompt for concept-derived component implementation.
- `component-css-contract-prompt.md`: legacy explicit-only CSS-contract poster prompt.
