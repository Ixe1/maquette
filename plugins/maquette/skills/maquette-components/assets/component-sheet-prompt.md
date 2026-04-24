Edit the visible approved brand board into a focused website component-sheet image.

Preserve:
- approved palette
- typography personality
- spacing rhythm
- radius and shadow language
- interaction style

Show:
- a focused core-primitives sheet first
- component anatomy where useful
- variant examples and size examples where relevant
- compact implementation notes only where they help implementation
- no logo

Adaptive sheet rules:
- do not create one exhaustive mega-sheet
- infer whether additional sheets are needed from the product brief and references
- if the product involves dense data, dashboards, server lists, tables, maps, calendars, editors, timelines, complex workflows, filter builders, or large reusable composites, create additional focused sheets for those families instead of crowding the core-primitives sheet
- keep reusable primitives and larger product composites conceptually separate
- do not hardcode an exact number of components; each sheet must remain readable and useful at normal preview size

Quality requirements:
- icon-only controls must have readable icon/background contrast in default, hover, active, selected, disabled, and inverse states
- variants of the same component should keep comparable anatomy and action placement unless an intentional exception is shown
- wide data components such as tables, data grids, charts, timelines, calendars, code blocks, and comparison matrices should be shown in full-width rows rather than squeezed into narrow cards
- table cells, badges, labels, icons, and buttons must remain readable without overlap
- reject the layout direction if labels are too small, unrelated families are crammed into tiny cells, components overlap, full tables or dashboards crowd out primitives, implementation notes dominate, or the image cannot guide implementation without heavy zooming

This component sheet is a creative design artifact that the later coded library should match.
Do not create a new visual direction.
