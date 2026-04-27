#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);

function usage() {
  console.error([
    "Usage: node check-text-fit.mjs <page.html or URL> [options]",
    "",
    "Options:",
    "  --json <path>             Write JSON output",
    "  --width <px>              Viewport width, default 1365",
    "  --height <px>             Viewport height, default 768",
    "  --allow-failures          Report failures without nonzero exit",
    "  --allow-clipping-selector <selector>",
    "                            Selector whose overflow clipping is contract-approved",
  ].join("\n"));
}

let targetArg;
let jsonPath;
let width = 1365;
let height = 768;
let allowFailures = false;
const allowClippingSelectors = [];

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg === "--help" || arg === "-h") {
    usage();
    process.exit(0);
  } else if (!targetArg && !arg.startsWith("--")) {
    targetArg = arg;
  } else if (arg === "--json") {
    jsonPath = args[++index];
  } else if (arg === "--width") {
    width = Number.parseInt(args[++index], 10);
  } else if (arg === "--height") {
    height = Number.parseInt(args[++index], 10);
  } else if (arg === "--allow-failures") {
    allowFailures = true;
  } else if (arg === "--allow-clipping-selector") {
    allowClippingSelectors.push(args[++index]);
  } else {
    console.error(`Unknown option: ${arg}`);
    usage();
    process.exit(1);
  }
}

if (!targetArg || !Number.isFinite(width) || !Number.isFinite(height)) {
  usage();
  process.exit(1);
}

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch (error) {
  try {
    const requireFromProject = createRequire(path.join(process.cwd(), "package.json"));
    ({ chromium } = requireFromProject("playwright"));
  } catch (fallbackError) {
    console.error("Playwright is not installed. Run `npm i -D playwright` and `npx playwright install chromium`, or run a manual text-fit review.");
    process.exit(2);
  }
}

const targetUrl = /^https?:\/\//.test(targetArg)
  ? targetArg
  : pathToFileURL(path.resolve(targetArg)).href;

const browser = await chromium.launch({ headless: true });
let output;
try {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(targetUrl, { waitUntil: "load", timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 2000 }).catch(() => {});

  output = await page.evaluate((allowedSelectors) => {
    const groups = [
      { name: "nav", selector: "nav a, header a, [data-maquette-text-fit='nav']" },
      { name: "buttons", selector: "button, .button, .btn, [role='button'], a[class*='button'], a[class*='btn'], [data-maquette-text-fit='button']" },
      { name: "search-placeholders", selector: "input[placeholder], textarea[placeholder], [data-maquette-text-fit='placeholder']" },
      { name: "cards", selector: ".card, [class*='card'], [data-maquette-text-fit='card']" },
      { name: "chips", selector: ".chip, .badge, [class*='chip'], [class*='badge'], [data-maquette-text-fit='chip']" },
      { name: "tables", selector: "table th, table td, [role='cell'], [role='columnheader'], [data-maquette-text-fit='table']" },
      { name: "metrics", selector: ".metric, [class*='metric'], [data-maquette-text-fit='metric']" },
      { name: "footer-links", selector: "footer a, [data-maquette-text-fit='footer-link']" },
    ];

    function cssPath(element) {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const parts = [];
      let current = element;
      while (current && current.nodeType === Node.ELEMENT_NODE && parts.length < 5) {
        let part = current.tagName.toLowerCase();
        if (current.classList.length > 0) {
          part += `.${Array.from(current.classList).slice(0, 2).map((name) => CSS.escape(name)).join(".")}`;
        }
        parts.unshift(part);
        current = current.parentElement;
      }
      return parts.join(" > ");
    }

    function visibleText(element) {
      if (element.matches("input, textarea")) return element.getAttribute("placeholder") || element.value || "";
      return (element.innerText || element.textContent || "").replace(/\s+/g, " ").trim();
    }

    function lineCount(element) {
      if (element.matches("input, textarea")) return 1;
      const text = visibleText(element);
      if (!text) return 0;
      const range = document.createRange();
      range.selectNodeContents(element);
      const rects = Array.from(range.getClientRects()).filter((rect) => rect.width > 1 && rect.height > 1);
      range.detach();
      if (rects.length === 0) return 0;
      const tops = [];
      for (const rect of rects) {
        if (!tops.some((top) => Math.abs(top - rect.top) < 2)) tops.push(rect.top);
      }
      return tops.length;
    }

    function isVisible(element) {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    }

    function isClippingAllowed(element) {
      return allowedSelectors.some((selector) => {
        try {
          return element.matches(selector) || Boolean(element.closest(selector));
        } catch {
          return false;
        }
      });
    }

    const groupResults = [];
    const failures = [];

    for (const group of groups) {
      const elements = Array.from(document.querySelectorAll(group.selector)).filter(isVisible);
      const items = elements.map((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const text = visibleText(element);
        const lines = lineCount(element);
        const wraps = lines > 1;
        const overflowsX = element.scrollWidth > element.clientWidth + 1;
        const overflowsY = element.scrollHeight > element.clientHeight + 1;
        const clips = (style.overflow === "hidden" || style.overflowX === "hidden" || style.overflowY === "hidden")
          && (overflowsX || overflowsY)
          && !isClippingAllowed(element);
        const shouldStayOneLine = element.matches("nav a, header a, button, .button, .btn, [role='button'], a[class*='button'], a[class*='btn'], .chip, .badge, [class*='chip'], [class*='badge'], footer a");
        const fails = Boolean(text) && ((shouldStayOneLine && wraps) || overflowsX || clips);
        const item = {
          selector: cssPath(element),
          text,
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          textTransform: style.textTransform,
          width: Number(rect.width.toFixed(2)),
          height: Number(rect.height.toFixed(2)),
          lines,
          wraps,
          overflowsX,
          overflowsY,
          overflow: style.overflow,
          overflowX: style.overflowX,
          overflowY: style.overflowY,
          fails,
        };
        if (fails) failures.push({ group: group.name, ...item });
        return item;
      });
      groupResults.push({ name: group.name, selector: group.selector, count: items.length, failures: items.filter((item) => item.fails).length, items });
    }

    const declaredFontFamilies = Array.from(document.styleSheets).flatMap((sheet) => {
      try {
        return Array.from(sheet.cssRules || []);
      } catch {
        return [];
      }
    }).filter((rule) => rule.type === CSSRule.FONT_FACE_RULE)
      .map((rule) => rule.style.getPropertyValue("font-family").replace(/^['"]|['"]$/g, "").trim())
      .filter(Boolean);

    const fontChecks = declaredFontFamilies.map((family) => ({
      family,
      loaded: document.fonts ? document.fonts.check(`16px "${family}"`) : null,
    }));
    for (const font of fontChecks) {
      if (font.loaded === false) failures.push({ group: "fonts", selector: "@font-face", text: font.family, fails: true, reason: "declared font is not loaded" });
    }

    const documentOverflowPx = Math.max(
      document.documentElement.scrollWidth,
      document.body.scrollWidth,
    ) - window.innerWidth;
    if (documentOverflowPx > 1) {
      failures.push({ group: "document", selector: "html/body", text: "", fails: true, reason: "document-level horizontal overflow", documentOverflowPx });
    }

    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      documentOverflowPx,
      fontChecks,
      groups: groupResults,
      failures,
      status: failures.length === 0 ? "pass" : "fail",
    };
  }, allowClippingSelectors);
} finally {
  await browser.close();
}

if (jsonPath) {
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.writeFileSync(jsonPath, `${JSON.stringify(output, null, 2)}\n`);
}

console.log(`${output.status.toUpperCase()} text-fit: ${output.failures.length} failure(s), viewport ${output.viewport.width}x${output.viewport.height}`);
for (const failure of output.failures.slice(0, 12)) {
  console.log(`  ${failure.group}: ${failure.selector}${failure.text ? ` "${failure.text}"` : ""}${failure.reason ? ` (${failure.reason})` : ""}`);
}

if (output.failures.length > 0 && !allowFailures) {
  process.exit(1);
}

