#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULT_WIDTHS = [390, 768, 1024, 1280, 1440];
const DEFAULT_HEIGHT = 1400;

const args = process.argv.slice(2);

function usage() {
  console.error([
    "Usage: node audit-responsive-layout.mjs <page.html or URL> [options]",
    "",
    "Options:",
    "  --json <path>             Write full JSON audit output",
    "  --screenshots-dir <path>  Capture full-page screenshots for each viewport",
    "  --widths <csv>            Viewport widths, default 390,768,1024,1280,1440",
    "  --height <px>             Viewport height, default 1400",
    "  --allow-document-overflow Do not exit nonzero for page-wide overflow",
  ].join("\n"));
}

let targetArg;
let jsonPath;
let screenshotsDir;
let widths = DEFAULT_WIDTHS;
let height = DEFAULT_HEIGHT;
let allowDocumentOverflow = false;

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg === "--help" || arg === "-h") {
    usage();
    process.exit(0);
  } else if (!targetArg && !arg.startsWith("--")) {
    targetArg = arg;
  } else if (arg === "--json") {
    jsonPath = args[++index];
  } else if (arg === "--screenshots-dir") {
    screenshotsDir = args[++index];
  } else if (arg === "--widths") {
    widths = args[++index].split(",").map((value) => Number.parseInt(value.trim(), 10)).filter(Number.isFinite);
  } else if (arg === "--height") {
    height = Number.parseInt(args[++index], 10);
  } else if (arg === "--allow-document-overflow") {
    allowDocumentOverflow = true;
  } else {
    console.error(`Unknown option: ${arg}`);
    usage();
    process.exit(1);
  }
}

if (!targetArg || widths.length === 0 || !Number.isFinite(height)) {
  usage();
  process.exit(1);
}

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch (error) {
  console.error("Playwright is not installed. Run `npm i -D playwright` and `npx playwright install chromium`, or run a manual responsive overflow audit.");
  process.exit(2);
}

const targetUrl = /^https?:\/\//.test(targetArg)
  ? targetArg
  : pathToFileURL(path.resolve(targetArg)).href;

function safeName(input) {
  return input.replace(/[^a-z0-9._-]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

let browser;
const startedAt = new Date().toISOString();
const results = [];

try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const width of widths) {
    await page.setViewportSize({ width, height });
    await page.goto(targetUrl, { waitUntil: "load", timeout: 30000 });
    await page.waitForLoadState("networkidle", { timeout: 2000 }).catch(() => {});

    const audit = await page.evaluate(() => {
      const wideSelector = [
        "table",
        '[role="grid"]',
        '[role="table"]',
        '[data-maquette-wide]',
        ".table",
        ".data-table",
        ".data-grid",
        ".grid-table",
        ".timeline",
        ".calendar",
        ".chart",
        ".map",
        ".editor",
        ".comparison-matrix",
        "pre",
        "code",
      ].join(",");

      function cssPath(element) {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
          return "";
        }

        const parts = [];
        let current = element;
        while (current && current.nodeType === Node.ELEMENT_NODE && current !== document.documentElement) {
          let part = current.localName;
          if (current.id) {
            part += `#${current.id}`;
            parts.unshift(part);
            break;
          }

          const classNames = Array.from(current.classList || []).slice(0, 3);
          if (classNames.length > 0) {
            part += `.${classNames.join(".")}`;
          }

          const parent = current.parentElement;
          if (parent) {
            const sameTagSiblings = Array.from(parent.children).filter((child) => child.localName === current.localName);
            if (sameTagSiblings.length > 1) {
              part += `:nth-of-type(${sameTagSiblings.indexOf(current) + 1})`;
            }
          }

          parts.unshift(part);
          current = current.parentElement;
        }

        return parts.join(" > ");
      }

      const viewportWidth = window.innerWidth;
      const allElements = Array.from(document.body.querySelectorAll("*"));
      const overflowOffenders = allElements
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const rightOverflow = Math.max(0, rect.right - viewportWidth);
          const leftOverflow = Math.max(0, -rect.left);
          const overflow = Math.max(rightOverflow, leftOverflow);
          return {
            selector: cssPath(element),
            tag: element.localName,
            className: typeof element.className === "string" ? element.className : "",
            left: Number(rect.left.toFixed(2)),
            right: Number(rect.right.toFixed(2)),
            width: Number(rect.width.toFixed(2)),
            overflow: Number(overflow.toFixed(2)),
          };
        })
        .filter((item) => item.overflow > 1 && item.width > 0)
        .sort((a, b) => b.overflow - a.overflow)
        .slice(0, 10);

      const wideComponents = Array.from(document.querySelectorAll(wideSelector))
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            selector: cssPath(element),
            tag: element.localName,
            clientWidth: element.clientWidth,
            scrollWidth: element.scrollWidth,
            rectWidth: Number(rect.width.toFixed(2)),
            hasInternalHorizontalScroll: element.scrollWidth > element.clientWidth + 1,
          };
        })
        .filter((item) => item.clientWidth > 0 || item.scrollWidth > 0);

      return {
        windowInnerWidth: viewportWidth,
        documentElementScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        documentOverflowPx: Math.max(
          document.documentElement.scrollWidth - viewportWidth,
          document.body.scrollWidth - viewportWidth,
          0,
        ),
        wideComponents,
        overflowOffenders,
      };
    });

    let screenshotPath = null;
    if (screenshotsDir) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
      screenshotPath = path.join(screenshotsDir, `responsive-${width}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
    }

    results.push({
      viewport: { width, height },
      screenshotPath,
      ...audit,
      passDocumentOverflow: audit.documentOverflowPx <= 1,
    });
  }
} finally {
  if (browser) {
    await browser.close();
  }
}

const output = {
  target: targetArg,
  targetUrl,
  startedAt,
  finishedAt: new Date().toISOString(),
  allowDocumentOverflow,
  results,
  pass: results.every((result) => result.passDocumentOverflow) || allowDocumentOverflow,
};

if (jsonPath) {
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.writeFileSync(jsonPath, `${JSON.stringify(output, null, 2)}\n`);
}

for (const result of results) {
  const wideScrollCount = result.wideComponents.filter((item) => item.hasInternalHorizontalScroll).length;
  const status = result.passDocumentOverflow ? "PASS" : "FAIL";
  console.log(`${status} ${result.windowInnerWidth}px: docEl=${result.documentElementScrollWidth}, body=${result.bodyScrollWidth}, overflow=${result.documentOverflowPx}px, wideScroll=${wideScrollCount}`);
  if (result.overflowOffenders.length > 0) {
    const top = result.overflowOffenders[0];
    console.log(`  top offender: ${top.selector || top.tag} (${top.overflow}px)`);
  }
  if (result.screenshotPath) {
    console.log(`  screenshot: ${result.screenshotPath}`);
  }
}

if (jsonPath) {
  console.log(`JSON: ${jsonPath}`);
}

if (!output.pass) {
  process.exit(1);
}
