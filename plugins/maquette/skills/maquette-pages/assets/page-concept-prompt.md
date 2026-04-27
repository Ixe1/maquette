Edit the visible approved brand board, and any existing component references when provided, into a website page concept.

Default framing:
- for a full webpage, use a tall portrait scroll composition that shows the top, middle, and terminal/bottom regions
- do not use a 16:9 widescreen composition for a full webpage unless the request is explicitly for one viewport or hero screen
- do not use 1:1 for the whole page by default; reserve 1:1 for later focused component close-up extraction
- make component boundaries visible enough that the implementation model can use image_gen edit mode after approval to produce faithful 1:1 close-ups of page-derived components

Requirements:
- use only components and styling consistent with the approved system
- treat existing components as the first source of truth
- in concept-first discovery mode, the concept may reveal new page-specific component needs, but they must be clear enough to extract into reusable components before implementation
- when component references already exist, do not silently invent significant new component language absent from those approved or provisional references
- only introduce a new composite if it is truly necessary for the page goal and can later be extracted, contracted, and reviewed before page code
- prioritize hierarchy, layout, density, and state clarity
- imply appropriate motion/effects moments only when they support orientation, feedback, live status, loading, filtering, drawer/modal behavior, or subtle brand craft
- show or annotate interaction states when relevant, including loading, skeleton, empty, error, offline, stale data, disabled, selected/current, success, permission/unavailable, mobile drawer open/closed, and filter applied/cleared
- make section compactness and vertical rhythm clear from top to bottom, including terminal regions rather than only the hero
- include enough detail for headers, navigation, newsletter bands, footers, bottom ribbons, social links, legal links, and already-approved secondary brand details when those regions are part of the page
- make every visible page region identifiable for later implementation inventory: header, nav, hero, sidebars, annotations, product grids, promo cards, newsletter, footer, bottom bars, mobile/tablet callouts, app/device modules, social links, and imagery
- make required raster image assets identifiable, including logo only if supplied or explicitly requested, hero images, product-card images, promo images, lifestyle/story images, app/device images, footer images, background textures, and decorative rasters
- generated visuals must support the real product function and page hierarchy; avoid generic AI decoration, wrong-feature imagery, trust-reducing decoration, or heavy raster effects that would be better as CSS/SVG/code-native visuals
- if a visual could be mistaken for a real product feature, make that risk clear enough for the implementation model to reject, revise, replace, or hide it before coding
- make major media crop intent identifiable; image regions that should fill their containers should not visually imply blank letterbox bands unless that is intentional
- use typography consistent with the approved font personality, weight, width, scale, and line-height; if the concept needs condensed editorial headings, make the font direction clear enough for implementation to choose a close CSS stack or open-source substitute
- if the page has header or primary navigation, define desktop, tablet, and mobile navigation behavior; a desktop-only nav concept is incomplete
- show or specify desktop inline nav plus tablet/mobile collapsed nav with menu toggle and expanded stacked panel or drawer
- show or specify mobile/tablet behavior for important content, filters, dense data, cards, drawers, overlays, empty/loading/error/offline states, and terminal sections when relevant
- do not use horizontal-scrolling primary nav as the default tablet/mobile solution
- render social links and compact action controls as recognizable icon controls when the concept calls for icons, not visible text abbreviations or unrelated generic symbols
- if the page includes product, pricing, service, offer, or promo card grids, show shared media/header/body/footer/action slots, consistent badge or eyebrow placement, equal-height cards, and bottom-aligned CTA, quantity, price, or action rows across varied copy lengths
- if the page includes a rich footer, make logo placement, link columns, social icons, app/download module, device/phone imagery, legal links, locale/shipping row, cookie/bottom strip, and brand blurb clear enough to implement
- make terminal page sections visually specific enough that the coded page cannot reasonably collapse them into generic link lists
- keep terminal page sections proportional to the rest of the concept so the implementation can preserve their intended compactness
- do not invite silent simplification; visible regions and generated asset needs should be clear enough to inventory before coding
- if the page requires dense data tables, dashboards, server lists, maps, calendars, editors, timelines, filter builders, or other large reusable patterns not present in existing component references, make the pattern clear enough for concept-first extraction rather than hiding it in tiny decorative detail
- no logo generation and no new brand marks, seals, badges, app icons, or emblems

Existing-site integration mode:
- if a site contract or existing reference page is provided, treat it as canonical for the shared shell
- preserve the existing brand name, logo or wordmark treatment, nav labels, header/nav structure, footer model, newsletter/subscription pattern, terminal sections, legal rows, typography, spacing, and shared shell density
- explore only the unique page body/content unless the user explicitly requests a broader redesign
- do not introduce a new brand name, new logo, new nav model, unrelated footer, inconsistent subscription pattern, or shell styling that conflicts with the reference page
- keep header/nav, newsletter/terminal bands, footer/legal rows, and global shell elements visually consistent with the existing website
- make any proposed new page body sections fit the existing shell rather than changing the shell to fit the new page

This page concept is the creative design artifact for the page.
The later coded page should match its overall hierarchy, composition, and styling while reusing approved components first. In concept-first mode, derive `.maquette/pages/<page-name>/component-extraction-plan.md` from the approved concept, then create focused 1:1 visual component close-ups from the concept before building missing reusable components. Component close-ups should be visual images, not CSS text-on-image posters, unless the user explicitly requests the legacy CSS-contract route. The page must document exact motion/effects, generated visual fit, accessibility, performance, states, and mobile UX in `.maquette/pages/<page-name>/experience-quality-contract.md`; do not rely on the image alone as final UX truth.
