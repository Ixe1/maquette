Use `shared/component-coverage-plan.template.md` and `shared/component-catalog.schema.json` together with the approved design system.

Before any CSS-contract poster or optional visual component sheet, create or update `.maquette/components/component-coverage-plan.md`. Reuse existing components first, extend them when only a variant/state/slot/density/behavior is missing, and create new reusable component coverage only for true structural gaps.

The coded componentized reference should be reviewed as a faithful implementation of the generated focused CSS-contract poster by default, including component APIs, selector contracts, component families, variants, states, repeated-card anatomy, responsive navigation, newsletter modules, footer/social modules, reduced-motion behavior, accessibility, and performance-safe effects. Visual component sheets are optional fidelity supplements when CSS-contract posters need anatomy or polish clarification.

Prompt assets:

- `component-css-contract-prompt.md`: default CSS-contract poster prompt for focused component-family implementation.
- `component-sheet-prompt.md`: optional visual component sheet prompt for explicit requests or poster anatomy/fidelity clarification.
