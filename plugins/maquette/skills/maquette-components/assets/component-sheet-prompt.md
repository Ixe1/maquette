Edit the visible approved page concept, and the Maquette component close-up template when provided, into a focused 1:1 visual close-up of the requested website component or component family.

Use this as Maquette's default experimental component image prompt. The output is a visual close-up for Codex to inspect, implement as reusable HTML/CSS/JS, screenshot, compare, and refine. Do not render CSS text, selector lists, implementation notes, markdown, or code on the image unless the user explicitly requested the legacy CSS-contract poster workflow.

Use a 1:1 square composition. Exact generated pixel dimensions are not controllable; prioritize a clearly square image with the component large enough to inspect at normal preview size and no letterboxing, unrelated page context, or extra panels.

Source inputs:
- approved page concept image
- optional neutral Maquette component close-up template image, used only as a framing scaffold
- approved brand board and design-system tokens
- component extraction plan entry for the visible concept region
- component coverage plan decision for this close-up
- existing component catalog/API notes when this is a reuse or extension

Preserve from the approved concept:
- palette, typography personality, spacing rhythm, radius, borders, shadows, icons, and surface language
- visible component anatomy, slot structure, hierarchy, and density
- relevant states or variants that are visible or clearly implied by the concept
- page-specific context only when it is needed to understand the component's shape or edge behavior

If a neutral component close-up template is visible:
- use it only to organize the output into a readable close-up with room for variants, states, slots, mobile behavior, and motion cues when relevant
- fill or transform the scaffold from the approved concept region; do not preserve blank gray placeholders as finished UI
- do not let the scaffold force unrelated zones, generic SaaS styling, or extra variants the coverage plan did not request

Show only the requested focus:
- one component family by default, such as navigation, search/filter controls, a card family, a status row, table/data display, modal/drawer, footer module, or live-state pattern
- at most two tightly related small families when they are visually inseparable in the concept
- meaningful variants, slots, and states when they fit without crowding
- hover/focus/active/disabled, selected/current, loading/skeleton, empty/error/offline/stale, success, drawer open/closed, or filter applied/cleared states when relevant to that component
- motion/effect cues only when they serve a product purpose; keep them visually understandable without adding decorative loops
- required raster asset crops only when the component genuinely owns that media

Do not show:
- a broad component sheet with unrelated families
- a whole page mockup
- CSS text, selector allowlists, pseudo-code, implementation labels, or prose notes
- brand-board content, logo exploration, new marks, or a new visual direction
- generic AI decoration that was not grounded in the approved page concept

Quality requirements:
- the close-up must be faithful enough that the coded component can visually clone the approved concept
- the component must be large, centered or well framed, and inspectable without heavy zooming
- variants of the same component should keep comparable anatomy and action placement unless the concept clearly shows an intentional exception
- repeated cards must show stable media/header/body/footer/action anatomy, equal-height behavior, badge or eyebrow placement, and bottom-pinned action rows when relevant
- navigation close-ups must show desktop/tablet/mobile behavior only when requested by the extraction plan; otherwise focus on the current nav state being implemented
- data components should be shown with enough width to understand columns, status indicators, row density, and empty/loading/error/stale states
- foreground/background contrast must remain readable in active, selected, focus, disabled, inverse, and dark-surface states
- icon-only controls must have visible glyphs and enough contrast in every shown state
- table cells, badges, labels, icons, and buttons must not overlap or become unreadable

Reject and regenerate or split the close-up before implementation if:
- it contains multiple unrelated component families
- it is mostly a page screenshot rather than a component close-up
- it invents a different component style from the approved concept
- labels or visual details are too small to inspect at normal preview size
- decorative content obscures the component anatomy
- the component cannot be implemented without guessing its structure, slots, states, or density

This image is a visual implementation target, not final UX truth. Codex will translate it into accessible, performant, reusable HTML/CSS/JS, document any deviations, capture a rendered component screenshot no larger than 1254x1254, compare it against the close-up, and refine before moving to the next component.
