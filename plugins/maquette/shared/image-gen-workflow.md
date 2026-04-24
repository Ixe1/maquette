# Image-gen-first workflow

This plugin is designed around a strict separation of roles:

- `image_gen` = creative visual designer
- coding model = specification writer, implementer, reviewer, and refiner

## Mandatory default behavior

When `image_gen` is available, each phase must use it:

1. Brand kit
   - generate or edit a focused brand board
2. Components
   - generate or edit a focused core component sheet, plus additional focused sheets when the product needs them
3. Pages
   - generate or edit a page concept

Only after the visual artifact exists should the workflow proceed to code implementation.

## Mandatory image inspection

After every `image_gen` create or edit step:
- inspect the generated image with `view_image` before treating it as the design source
- do not derive tokens, component specifications, page blueprints, or implementation details from the prompt alone
- if the generated file cannot be inspected, state that limitation and treat the image as unverified
- when revising a prior artifact, inspect both the prior reference and the new generated result when possible

After inspection, continue the same turn unless the user explicitly asked for image-only output. Briefly identify the generated artifact, provide its saved path or asset reference when available, assess whether it matches the request, and continue to the next requested workflow step.

## Inspectability gates

Generated boards and sheets are approval artifacts only when they are readable at normal preview size.

- Brand boards must focus on visual-system fundamentals, not exhaustive component inventories.
- Brand boards must not contain logo-like marks, brand-name mastheads, large product-name treatments, monograms, seals, badges, app icons, emblems, or trademark-like elements.
- Component sheets must be split into focused sheets when a single sheet would become cluttered or uninspectable.
- Reject, regenerate, edit, or split an artifact before using it if labels are too small, unrelated families are crammed together, elements overlap, implementation notes dominate, or the image cannot guide implementation without heavy zooming.

## Transparent image requests

Most Maquette artifacts are opaque boards, sheets, and page concepts. If a task explicitly requests a transparent PNG output, verify that the saved PNG has a real alpha channel before treating it as complete. If the image has a rendered checkerboard or solid background instead of true transparency, leave the original untouched, create a repaired transparent derivative, and verify the repaired PNG before reporting success.

## Editing visible images

When revising a previously generated or local image:
- make the image visible in the conversation first, typically via `view_image`
- ask `image_gen` to edit the visible image
- preserve approved style unless the user requested change
