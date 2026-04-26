Edit the visible approved brand board into a focused visual website component-sheet image.

Use a 1:1 square composition for every component sheet. Exact generated pixel dimensions are not controllable; prioritize a clearly square board with no cropping, letterboxing, or extra content outside the board.

Generate only the current requested family from the component coverage plan. Do not include teaser panels for later sheet categories. In multi-sheet workflows, the implementation model will inspect, implement a componentized replica/reference, review, and document reusable components from this sheet before requesting the next focused sheet.

Preserve:
- approved palette
- typography personality
- spacing rhythm
- radius and shadow language
- interaction style

Show:
- the specific reusable family, extension, or visual supplement requested by the coverage plan
- possible focused examples when requested: actions, forms/filters, navigation, drawers/panels, data display, live states, cards/composites, feedback, overlays, newsletter, footer, and social modules
- component anatomy where useful
- variant examples and size examples where relevant
- visible states, density, spacing, radius, shadows, motion/effect moments, and polish that are clear enough to implement in HTML/CSS
- loading, skeleton, empty, error, offline, stale, disabled, selected/current, hover, focus-visible, active/pressed, success, permission/unavailable, drawer open/closed, and filter applied/cleared states when relevant
- reduced-motion expectations where motion is shown or implied
- separate asset requirements when component families need raster assets, such as product-card imagery, promo-card imagery, newsletter illustrations, app/device imagery, footer modules, background textures, or lifestyle/story imagery
- compact implementation notes only where they help implementation
- no logo

Adaptive sheet rules:
- do not create one exhaustive mega-sheet
- infer whether additional sheets are needed from the component coverage plan, product brief, and references, but keep this image focused on the current requested family
- every additional focused sheet must also use a 1:1 square composition
- if the product involves dense data, dashboards, server lists, tables, maps, calendars, editors, timelines, complex workflows, filter builders, or large reusable composites, create additional focused sheets for those families instead of crowding the current sheet
- if the product has global navigation, include a focused navigation family: desktop inline nav, compact/tablet nav, mobile menu toggle, expanded mobile menu or drawer, active link, focus-visible state, and icon rendering
- if the product has repeated product, pricing, service, offer, or promo cards, include a focused card family that shows shared media/header/body/footer/action slots, consistent badge or eyebrow placement, equal-height cards, flexible body layout, and bottom-pinned action rows
- if the product or page has footer social links, include recognizable social icon modules or specify the icon set strategy
- if the product needs product imagery, footer/app modules, promo cards, background textures, or lifestyle imagery, make those image asset needs identifiable for the later page asset manifest
- keep reusable primitives and larger product composites conceptually separate
- do not hardcode an exact number of components; each sheet must remain readable and useful at normal preview size

Quality requirements:
- component sheets define component styling; they should not contradict the approved brand board, and any unavoidable contradiction must be noted for `approved.md`
- component sheets are componentized reference targets, not mood references; the later coded reference should reproduce the visible component families, anatomy, variants, states, density, spacing, radius, shadows, and polish using reusable CSS/JS from the start
- foreground/background contrast must remain readable in active, selected, focus, disabled, inverse, and dark navigation states
- the later coded componentized reference and reusable component API must be able to match this sheet's sophistication; do not show component details, density, states, or composites that are too ambiguous to implement
- icon-only controls must have readable icon/background contrast in default, hover, active, selected, disabled, and inverse states
- variants of the same component should keep comparable anatomy and action placement unless an intentional exception is shown
- repeated card grids must show shared anatomy, aligned card heights, stable badge/eyebrow placement, and aligned action rows; quantity selectors, prices, and primary CTAs should align across cards even when title or description copy lengths vary
- wide data components such as tables, data grids, charts, timelines, calendars, code blocks, and comparison matrices should be shown in full-width rows rather than squeezed into narrow cards
- primary navigation must not rely on horizontal page scrolling as the default tablet/mobile behavior
- tablet/mobile navigation needs visible tap targets and a clear closed and expanded state
- table cells, badges, labels, icons, and buttons must remain readable without overlap
- reject the layout direction if labels are too small, unrelated families are crammed into tiny cells, components overlap, full tables or dashboards crowd out primitives, implementation notes dominate, or the image cannot guide implementation without heavy zooming

This component sheet is a creative design artifact that the later coded componentized reference should match while exposing reusable component APIs.
Do not create a new visual direction.
