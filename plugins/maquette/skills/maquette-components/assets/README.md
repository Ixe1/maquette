Use `shared/component-coverage-plan.template.md` and `shared/component-catalog.schema.json` together with the approved design system.

Before any visual component sheet or optional CSS-contract poster, create or update `.maquette/components/component-coverage-plan.md`. Reuse existing components first, extend them when only a variant/state/slot/density/behavior is missing, and create new reusable component coverage only for true structural gaps.

The coded componentized reference should be reviewed as a faithful implementation of the generated focused visual component sheet by default, including component families, variants, states, repeated-card anatomy, responsive navigation, newsletter modules, footer/social modules, reduced-motion behavior, accessibility, and performance-safe effects. CSS-contract posters are optional implementation supplements when visual sheets need text clarification.

Prompt assets:

- `component-sheet-prompt.md`: default visual component sheet prompt for focused component-family implementation.
- `component-css-contract-prompt.md`: optional CSS-contract poster prompt for explicit requests or visual-sheet clarification.
