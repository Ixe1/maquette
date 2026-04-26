# Changelog

All notable changes to the Maquette plugin should be documented here.

This file tracks user-visible plugin behavior, workflow rules, prompts, skills, schemas, bundled scripts, and documentation that affects how Maquette runs or what it generates.

Entries before this changelog was introduced were backfilled from git history and may summarize groups of related commits rather than every small maintenance change.

## Unreleased

### Added

- Added existing-site integration mode with a site contract template, shared-shell preservation rules, and a shell consistency QA helper.
- Added component coverage planning with `.maquette/components/component-coverage-plan.md` before component poster generation.
- Added page experience quality contracts with `.maquette/pages/<page-name>/experience-quality-contract.md` for generated visual fit, motion/effects, states, accessibility, performance, information architecture, brand craft, mobile UX, and QA acceptance.
- Added generated visual fit metadata support to page asset manifests and optional artifact references for coverage plans and experience contracts in schemas.

### Changed

- Updated page concept and implementation guidance to preserve existing website shells, reuse shared CSS/JS entrypoints, and keep page-specific CSS/JS scoped to new page body content when an existing site is detected.
- Updated component workflow guidance so existing components are reused or extended before new reusable components are created, and CSS-contract posters stay focused, readable, selector-limited, and justified by the coverage plan.
- Updated page concept, implementation, and final review guidance to treat image generation as creative inspiration that must be translated into purposeful motion, reduced-motion support, interaction states, accessibility, performance-aware UX, content hierarchy, brand craft, and context-fit page decisions.

## 0.3.5 - 2026-04-26

### Added

- Added this changelog, a README pointer, and repository maintenance guidance so future Maquette changes are recorded alongside the code or documentation edits that introduce them.

### Changed

- Simplified plugin example prompts so they read like normal user requests instead of restating internal Maquette workflow mechanics.
- Changed brand-board and page-concept approval questions to offer only `Yes, use this` and `No, make a new one`; free-form revision notes can still be handled when provided.
- Tightened image-worker subagent guidance so missing prior authorization triggers a preflight question instead of silently falling back to main-thread image generation.
- Clarified unattended-run handling so one-pass, full-workflow, final-homepage, fresh-test, and similar requests still use image-worker and image-approval questions unless the user explicitly asks for no questions or no pauses.

### Fixed

- Fixed Maquette guidance that could let agents skip image-worker subagents because subagent use had not already been explicitly authorized.
- Fixed QA dependency guidance so partial installs, such as missing `ajv-formats`, require an install-or-skip decision before replacing schema validation with manual checks.

## 0.3.4 - 2026-04-25

### Added

- Added the current CSS-contract component workflow, where focused generated text posters can drive component implementation before browser screenshot review.

### Changed

- Refined component sheet guidance around 1:1 square artifacts, focused component families, and splitting crowded sheets instead of generating broad mega-sheets.

## 0.3.3 - 2026-04-24

### Added

- Added focused brand-board, component, and page workflow refinements for the staged Maquette process.
- Added schema and workflow documentation improvements for generated artifacts.

### Changed

- Refined Maquette prompts and plugin metadata.
- Tightened workflow docs around generated image inspection, component coverage, and QA expectations.

## 0.3.0 - 2026-04-24

### Added

- Released Maquette as an image-guided Codex plugin for brand kits, component libraries, and implemented pages.
- Added generated example screenshots and plugin logo assets.
- Added workflow documentation for invoking Maquette and its staged design-system process.

### Changed

- Renamed the plugin to Maquette.
- Added Playwright-oriented screenshot and cleanup guidance for browser QA.

## 0.2.0 - 2026-04-24

### Added

- Added early marketplace branding and repository documentation around the Maquette plugin.
