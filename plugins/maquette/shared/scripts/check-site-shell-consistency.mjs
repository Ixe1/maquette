#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);

function usage() {
  console.error([
    "Usage: node check-site-shell-consistency.mjs <reference.html or URL> <candidate.html or URL> [options]",
    "",
    "Options:",
    "  --json <path>             Write JSON report",
    "  --screenshots-dir <path>  Capture region screenshots",
    "  --width <px>              Viewport width, default 1440",
    "  --height <px>             Viewport height, default 1400",
    "  --allow-drift             Exit zero even when shell drift is detected",
  ].join("\n"));
}

let referenceArg;
let candidateArg;
let jsonPath;
let screenshotsDir;
let width = 1440;
let height = 1400;
let allowDrift = false;

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg === "--help" || arg === "-h") {
    usage();
    process.exit(0);
  } else if (!referenceArg && !arg.startsWith("--")) {
    referenceArg = arg;
  } else if (!candidateArg && !arg.startsWith("--")) {
    candidateArg = arg;
  } else if (arg === "--json") {
    jsonPath = args[++index];
  } else if (arg === "--screenshots-dir") {
    screenshotsDir = args[++index];
  } else if (arg === "--width") {
    width = Number.parseInt(args[++index], 10);
  } else if (arg === "--height") {
    height = Number.parseInt(args[++index], 10);
  } else if (arg === "--allow-drift") {
    allowDrift = true;
  } else {
    console.error(`Unknown option: ${arg}`);
    usage();
    process.exit(1);
  }
}

if (!referenceArg || !candidateArg || !Number.isFinite(width) || !Number.isFinite(height)) {
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
    console.error("Playwright is not installed. Run `npm i -D playwright` and `npx playwright install chromium`, or run a manual shared-shell consistency review.");
    process.exit(2);
  }
}

const regionDefinitions = [
  {
    name: "header",
    requiredWhenReferenceExists: true,
    selectors: ["header", "[role='banner']", ".site-header", ".page-header", ".navbar"],
  },
  {
    name: "navigation",
    requiredWhenReferenceExists: true,
    selectors: ["header nav", "nav[aria-label]", "[role='navigation']", ".site-nav", ".primary-nav", ".main-nav", ".navbar nav"],
  },
  {
    name: "newsletter",
    requiredWhenReferenceExists: false,
    selectors: [
      "[data-shell-region='newsletter']",
      "[data-section='newsletter']",
      ".newsletter",
      ".newsletter-section",
      ".subscribe",
      ".signup",
      "section",
      "aside",
    ],
    textPattern: "(newsletter|subscribe|subscription|sign up|get updates|email)",
  },
  {
    name: "footer",
    requiredWhenReferenceExists: true,
    selectors: ["footer", "[role='contentinfo']", ".site-footer", ".page-footer"],
  },
  {
    name: "legal",
    requiredWhenReferenceExists: false,
    selectors: [".legal", ".footer-legal", ".copyright", "[data-shell-region='legal']", "footer small", "footer"],
    textPattern: "(copyright|privacy|terms|legal|all rights reserved|cookies)",
  },
];

function targetUrl(target) {
  return /^https?:\/\//.test(target) ? target : pathToFileURL(path.resolve(target)).href;
}

async function collectRegions(page) {
  return await page.evaluate((definitions) => {
    function normalizeText(value) {
      return (value || "").replace(/\s+/g, " ").trim();
    }

    function cssPath(element) {
      if (!element || element.nodeType !== Node.ELEMENT_NODE) return "";
      const parts = [];
      let current = element;
      while (current && current.nodeType === Node.ELEMENT_NODE && current !== document.documentElement) {
        let part = current.localName;
        if (current.id) {
          part += `#${CSS.escape(current.id)}`;
          parts.unshift(part);
          break;
        }
        const classNames = Array.from(current.classList || [])
          .filter((name) => name && !/^(active|current|selected|is-active|is-current|is-selected|open|is-open)$/.test(name))
          .slice(0, 3);
        if (classNames.length > 0) {
          part += `.${classNames.map((name) => CSS.escape(name)).join(".")}`;
        }
        const parent = current.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter((child) => child.localName === current.localName);
          if (siblings.length > 1) {
            part += `:nth-of-type(${siblings.indexOf(current) + 1})`;
          }
        }
        parts.unshift(part);
        current = current.parentElement;
      }
      return parts.join(" > ");
    }

    function isVisible(element) {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    }

    function stableClasses(element) {
      return Array.from(element.classList || [])
        .filter((name) => name && !/^(active|current|selected|is-active|is-current|is-selected|open|is-open)$/.test(name))
        .sort();
    }

    function elementSummary(element) {
      const descendants = Array.from(element.querySelectorAll("*"));
      const tagSequence = descendants.slice(0, 300).map((node) => node.localName);
      const classSequence = [element, ...descendants].slice(0, 300).map((node) => `${node.localName}.${stableClasses(node).join(".")}`);
      const linkLabels = Array.from(element.querySelectorAll("a[href]")).map((node) => normalizeText(node.innerText || node.getAttribute("aria-label")));
      const buttonLabels = Array.from(element.querySelectorAll("button, [role='button']")).map((node) => normalizeText(node.innerText || node.getAttribute("aria-label") || node.getAttribute("title")));
      const formControls = Array.from(element.querySelectorAll("input, select, textarea")).map((node) => [
        node.localName,
        node.getAttribute("type") || "",
        node.getAttribute("name") || "",
        node.getAttribute("placeholder") || "",
        node.getAttribute("aria-label") || "",
      ].join(":"));
      const rect = element.getBoundingClientRect();
      return {
        found: true,
        selector: cssPath(element),
        tagName: element.localName,
        id: element.id || "",
        classList: stableClasses(element),
        text: normalizeText(element.innerText).slice(0, 1000),
        tagSequence,
        classSequence,
        linkLabels,
        buttonLabels,
        formControls,
        descendantCount: descendants.length,
        bounds: {
          x: Number(rect.x.toFixed(2)),
          y: Number(rect.y.toFixed(2)),
          width: Number(rect.width.toFixed(2)),
          height: Number(rect.height.toFixed(2)),
        },
      };
    }

    function findRegion(definition) {
      const pattern = definition.textPattern ? new RegExp(definition.textPattern, "i") : null;
      for (const selector of definition.selectors) {
        const matches = Array.from(document.querySelectorAll(selector)).filter(isVisible);
        const chosen = pattern
          ? matches.find((element) => pattern.test(normalizeText(element.innerText)))
          : matches[0];
        if (chosen) {
          return elementSummary(chosen);
        }
      }
      return { found: false, selector: "", text: "", tagSequence: [], classSequence: [], linkLabels: [], buttonLabels: [], formControls: [] };
    }

    return Object.fromEntries(definitions.map((definition) => [definition.name, findRegion(definition)]));
  }, regionDefinitions);
}

function sameArray(left, right) {
  return JSON.stringify(left ?? []) === JSON.stringify(right ?? []);
}

function compareRegion(name, reference, candidate, definition) {
  const differences = [];
  if (!reference.found && !candidate.found) {
    return { name, pass: true, skipped: true, reason: "Region absent from both pages.", differences };
  }
  if (reference.found && !candidate.found) {
    differences.push("Candidate page is missing a shell region present on the reference page.");
  }
  if (!reference.found && candidate.found && definition.requiredWhenReferenceExists) {
    differences.push("Candidate page has a shell region that was not found on the reference page.");
  }
  if (reference.found && candidate.found) {
    if (reference.tagName !== candidate.tagName) differences.push("Root tag differs.");
    if (!sameArray(reference.tagSequence, candidate.tagSequence)) differences.push("DOM tag sequence differs.");
    if (!sameArray(reference.classSequence, candidate.classSequence)) differences.push("Stable class sequence differs.");
    if (!sameArray(reference.linkLabels, candidate.linkLabels)) differences.push("Link labels/order differ.");
    if (!sameArray(reference.buttonLabels, candidate.buttonLabels)) differences.push("Button labels/order differ.");
    if (!sameArray(reference.formControls, candidate.formControls)) differences.push("Form controls differ.");
  }
  return {
    name,
    pass: differences.length === 0,
    skipped: false,
    differences,
    reference: {
      selector: reference.selector,
      bounds: reference.bounds,
      linkLabels: reference.linkLabels,
      buttonLabels: reference.buttonLabels,
      formControls: reference.formControls,
    },
    candidate: {
      selector: candidate.selector,
      bounds: candidate.bounds,
      linkLabels: candidate.linkLabels,
      buttonLabels: candidate.buttonLabels,
      formControls: candidate.formControls,
    },
  };
}

async function captureRegion(page, region, outputPath) {
  if (!region?.found || !region.selector) return null;
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await page.locator(region.selector).first().screenshot({ path: outputPath });
  return outputPath;
}

let browser;
const output = {
  reference: referenceArg,
  candidate: candidateArg,
  viewport: { width, height },
  allowDrift,
  pass: false,
  regions: [],
  screenshots: [],
  cleanup: "not-started",
};

try {
  browser = await chromium.launch({ headless: true });
  output.cleanup = "pending";
  const referencePage = await browser.newPage({ viewport: { width, height } });
  const candidatePage = await browser.newPage({ viewport: { width, height } });
  await referencePage.goto(targetUrl(referenceArg), { waitUntil: "load", timeout: 30000 });
  await candidatePage.goto(targetUrl(candidateArg), { waitUntil: "load", timeout: 30000 });
  await Promise.all([
    referencePage.waitForLoadState("networkidle", { timeout: 2000 }).catch(() => {}),
    candidatePage.waitForLoadState("networkidle", { timeout: 2000 }).catch(() => {}),
  ]);

  const referenceRegions = await collectRegions(referencePage);
  const candidateRegions = await collectRegions(candidatePage);
  output.regions = regionDefinitions.map((definition) => compareRegion(
    definition.name,
    referenceRegions[definition.name],
    candidateRegions[definition.name],
    definition,
  ));
  output.pass = output.regions.every((region) => region.pass);

  if (screenshotsDir) {
    for (const definition of regionDefinitions) {
      const referencePath = path.join(screenshotsDir, `reference-${definition.name}-${width}.png`);
      const candidatePath = path.join(screenshotsDir, `candidate-${definition.name}-${width}.png`);
      const capturedReference = await captureRegion(referencePage, referenceRegions[definition.name], referencePath);
      const capturedCandidate = await captureRegion(candidatePage, candidateRegions[definition.name], candidatePath);
      if (capturedReference) output.screenshots.push(capturedReference);
      if (capturedCandidate) output.screenshots.push(capturedCandidate);
    }
  }
} catch (error) {
  output.error = String(error?.message || error);
  throw error;
} finally {
  if (browser) {
    await browser.close();
    output.cleanup = "closed";
  }
  if (jsonPath) {
    fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
    fs.writeFileSync(jsonPath, `${JSON.stringify(output, null, 2)}\n`);
  }
}

for (const region of output.regions) {
  console.log(`${region.pass ? "PASS" : "FAIL"} ${region.name}${region.skipped ? " (absent from both pages)" : ""}`);
  for (const difference of region.differences ?? []) {
    console.log(`  - ${difference}`);
  }
}

if (!output.pass && !allowDrift) {
  process.exit(1);
}

