Use `shared/design-system.schema.json` as the validation contract.

The inspected brand-board image is the visual source of truth. Any JSON or CSS token file must be derived from that viewed board unless the user explicitly provides another approved constraint.

When available, `shared/template-images/brand-kit-template-v1.png` may be used as a neutral edit-mode scaffold for board organization. It is not a visual direction by itself.

If the approved system uses custom, imported, hosted, or non-system fonts, create `.maquette/brand/fonts.css` as the shared font-loading asset. HTML artifacts should import it before `tokens.css`, component CSS, or page CSS.
