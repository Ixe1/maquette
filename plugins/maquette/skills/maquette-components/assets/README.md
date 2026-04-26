Use `shared/component-coverage-plan.template.md` and `shared/component-catalog.schema.json` together with the approved design system.

Before any component poster or visual component sheet, create or update `.maquette/components/component-coverage-plan.md`. Reuse existing components first, extend them when only a variant/state/slot/density/behavior is missing, and create new reusable component coverage only for true structural gaps.

The coded componentized reference should be reviewed as a faithful implementation of the generated CSS-contract poster by default, or the generated visual component sheet when the fallback path is explicitly used, including component families, variants, states, repeated-card anatomy, responsive navigation, newsletter modules, footer/social modules, reduced-motion behavior, accessibility, and performance-safe effects.

Prompt assets:

- `component-css-contract-prompt.md`: default direct CSS-contract poster prompt for component-family implementation.
- `component-sheet-prompt.md`: visual component sheet fallback prompt for explicit visual-sheet requests or blocked CSS-contract runs.
