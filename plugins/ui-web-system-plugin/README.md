# UI Web System Plugin

A Codex plugin for **website-focused UI design workflows**.

This plugin is intentionally **image-guided**:
- `image_gen` is the creative design engine
- the coding model is the implementation and review engine
- screenshots of coded output are used for visual comparison and refinement

The workflow is therefore:
1. **Generate or edit a visual artifact first** with `image_gen`
2. **Convert that artifact into machine-readable design contracts** such as JSON and CSS tokens
3. **Implement reusable HTML/CSS/JS**
4. **Render and screenshot the implementation**
5. **Compare implementation against the approved visual artifact** and iterate

This plugin is split into three focused skills:
- `ui-brand-kit-web`
- `ui-components-web`
- `ui-pages-web`

## Core rule

If the `image_gen` tool is available in the environment, it is **not optional** for the normal happy-path workflow.

Each phase must use it as follows unless the user explicitly asks to skip image generation or the environment genuinely lacks the tool:
- brand-kit phase → create or edit a **brand board image**
- components phase → create or edit a **component sheet image** before or alongside implementation
- pages phase → create or edit a **page concept image** before implementation

## Output philosophy

The visual artifact is the creative source and approval artifact.
The structured JSON/CSS files are the machine-readable source of truth.
The coded gallery/page screenshots are the verification artifacts.

## Installation

Place the plugin under your Codex plugins directory and register it in your marketplace if required.
