---
name: maquette
description: Orchestrate Maquette's full staged website workflow for broad plugin-level requests, bootstrapping any missing brand kit, component library, and page artifacts in order.
---

You are responsible for the **full Maquette workflow**.

Use this skill when the user invokes Maquette generally, especially with a broad request such as creating a website, landing page, homepage, page concept, or UI from a brief or existing site.

## Core rule

Do not skip phases.

For broad page or site requests, run the workflow in this order:

1. Brand kit
2. Component library
3. Page or screen

Only proceed to a later phase after the required artifacts for earlier phases exist.

## Phase gates

Before creating a page concept or page implementation, verify that these brand artifacts exist:

- `ui/brand/brief.md`
- `ui/brand/design-system.json`
- `ui/brand/tokens.css`
- `ui/brand/approved.md`
- a generated and inspected brand board image such as `ui/brand/brand-board-vN.png`

If any are missing, run the brand-kit phase first using `maquette-brand-kit`.

Before creating a page concept or page implementation, verify that these component artifacts exist:

- `ui/components/component-catalog.json`
- `ui/components/components.css`
- `ui/components/components.js`
- `ui/components/gallery.html`
- `ui/components/approved.md`
- one or more generated and inspected component sheet images such as `ui/components/component-sheet-vN.png`

If any are missing, run the component-library phase next using `maquette-components`.
If the requested page needs dense data patterns, dashboards, tables, maps, calendars, editors, timelines, complex workflows, filter builders, or reusable composites that are not covered by the existing component references, run `maquette-components` again to create focused missing coverage before running the page phase.

Only after both gates pass should you run the page phase using `maquette-pages`.

## Existing website references

An existing website, screenshot, or codebase may inform the brand kit and component library, but it is not a replacement for them.

Use existing website references to extract:

- product context
- content priorities
- audience expectations
- useful interaction patterns
- visual cues worth preserving

Do not treat copied CSS values, notes, or screenshots as the final design system. First convert the reference into a generated brand board, inspect it with `view_image`, then derive the design-system JSON and CSS tokens from that inspected artifact.

## One-shot requests

If the user asks for a page and the project has no Maquette artifacts yet, complete a provisional full pass in sequence:

1. Create the brand kit.
2. Create the component library.
3. Create the requested page.

Mark the outputs as proposed or provisional when the user has not explicitly approved the intermediate phases.
Infer focused extra component/composite sheets when the page brief needs them; the user should not have to ask for fewer components, split sheets, or wide-data coverage.

Do not ask the user to manually rerun separate commands unless you are blocked.

## Image workflow

Follow `shared/image-gen-workflow.md` for every generated artifact.

After each `image_gen` create or edit step, inspect the generated image with `view_image` before using it as the source for later artifacts.
