#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);

function usage() {
  console.error([
    "Usage: node capture-browser.mjs <page.html or URL> <output.png> [options]",
    "",
    "Options:",
    "  --width <px>                 Viewport width, default 1024",
    "  --height <px>                Viewport height, default 1024",
    "  --mode <full-page|viewport|segments>",
    "                              Capture mode, default viewport",
    "  --segments <csv>            Segment names for segments mode, default top,middle,bottom",
    "  --json <path>                Write capture metadata JSON",
    "  --fallback-max-height <px>   Max clipped fallback height, default 16000",
    "  --max-dimension <px>         Refuse screenshots larger than this, default 1024",
    "  --allow-large                Allow screenshots larger than max dimension",
  ].join("\n"));
}

let targetArg;
let outputArg;
let width = 1024;
let height = 1024;
let mode = "viewport";
let jsonPath;
let fallbackMaxHeight = 16000;
let maxDimension = 1024;
let allowLarge = false;
let segments = ["top", "middle", "bottom"];

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg === "--help" || arg === "-h") {
    usage();
    process.exit(0);
  } else if (!targetArg && !arg.startsWith("--")) {
    targetArg = arg;
  } else if (!outputArg && !arg.startsWith("--")) {
    outputArg = arg;
  } else if (arg === "--width") {
    width = Number.parseInt(args[++index], 10);
  } else if (arg === "--height") {
    height = Number.parseInt(args[++index], 10);
  } else if (arg === "--mode") {
    mode = args[++index];
  } else if (arg === "--segments") {
    segments = args[++index]
      .split(",")
      .map((segment) => segment.trim())
      .filter(Boolean);
  } else if (arg === "--json") {
    jsonPath = args[++index];
  } else if (arg === "--fallback-max-height") {
    fallbackMaxHeight = Number.parseInt(args[++index], 10);
  } else if (arg === "--max-dimension") {
    maxDimension = Number.parseInt(args[++index], 10);
  } else if (arg === "--allow-large") {
    allowLarge = true;
  } else {
    console.error(`Unknown option: ${arg}`);
    usage();
    process.exit(1);
  }
}

if (!targetArg || !outputArg || !Number.isFinite(width) || !Number.isFinite(height) || !Number.isFinite(maxDimension) || !["full-page", "viewport", "segments"].includes(mode) || segments.length === 0) {
  usage();
  process.exit(1);
}

if (!allowLarge && (width > maxDimension || height > maxDimension)) {
  console.error(`Refusing to create a screenshot larger than ${maxDimension}x${maxDimension}. Use --mode segments with capped width/height, or pass --allow-large for non-Maquette debugging.`);
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
    console.error("Playwright is not installed. Run `npm i -D playwright` and `npx playwright install chromium`, or run a manual visual review.");
    process.exit(2);
  }
}

const targetUrl = /^https?:\/\//.test(targetArg)
  ? targetArg
  : pathToFileURL(path.resolve(targetArg)).href;

let browser;
const metadata = {
  target: targetArg,
  targetUrl,
  outputPath: outputArg,
  viewport: { width, height },
  requestedMode: mode,
  requestedSegments: mode === "segments" ? segments : undefined,
  maxDimension,
  allowLarge,
  captureMode: null,
  clippedFallback: false,
  segmentScreenshots: [],
  cleanup: "not-started",
  error: null,
};

function segmentOutputPath(outputPath, segmentName) {
  const parsed = path.parse(outputPath);
  const extension = parsed.ext || ".png";
  return path.join(parsed.dir, `${parsed.name}-${segmentName}${extension}`);
}

function segmentScrollY(segmentName, documentHeight, viewportHeight) {
  const maxY = Math.max(0, documentHeight - viewportHeight);
  if (segmentName === "top") return 0;
  if (segmentName === "middle" || segmentName === "mid") return Math.round(maxY / 2);
  if (segmentName === "bottom" || segmentName === "footer" || segmentName === "terminal") return maxY;
  const percentageMatch = segmentName.match(/^(\d{1,3})%$/);
  if (percentageMatch) {
    const percentage = Math.max(0, Math.min(100, Number.parseInt(percentageMatch[1], 10)));
    return Math.round(maxY * (percentage / 100));
  }
  return Math.round(maxY / 2);
}

try {
  browser = await chromium.launch({ headless: true });
  metadata.cleanup = "pending";
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(targetUrl, { waitUntil: "load", timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 2000 }).catch(() => {});
  fs.mkdirSync(path.dirname(outputArg), { recursive: true });

  if (mode === "viewport") {
    await page.screenshot({ path: outputArg, fullPage: false });
    metadata.captureMode = "viewport";
  } else if (mode === "segments") {
    const dimensions = await page.evaluate(() => ({
      width: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth, window.innerWidth),
      height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, window.innerHeight),
      viewportHeight: window.innerHeight,
    }));
    for (const segmentName of segments) {
      const screenshotPath = segmentOutputPath(outputArg, segmentName);
      const scrollY = segmentScrollY(segmentName, dimensions.height, height);
      await page.evaluate((targetY) => window.scrollTo(0, targetY), scrollY);
      await page.waitForTimeout(100);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      metadata.segmentScreenshots.push({
        name: segmentName,
        path: screenshotPath,
        scrollY,
        viewport: { width, height },
      });
    }
    metadata.captureMode = "segments";
    metadata.documentSize = dimensions;
  } else {
    try {
      const dimensions = await page.evaluate(() => ({
        width: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth, window.innerWidth),
        height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, window.innerHeight),
      }));
      metadata.documentSize = dimensions;
      if (!allowLarge && (dimensions.width > maxDimension || dimensions.height > maxDimension)) {
        throw new Error(`Full-page capture would be ${dimensions.width}x${dimensions.height}, exceeding the ${maxDimension}x${maxDimension} Maquette screenshot cap. Use --mode segments.`);
      }
      await page.screenshot({ path: outputArg, fullPage: true });
      metadata.captureMode = "full-page";
    } catch (error) {
      if (!allowLarge && String(error?.message || error).includes("Full-page capture would")) {
        metadata.captureMode = "rejected-oversize-full-page";
        throw error;
      }
      const dimensions = await page.evaluate(() => ({
        width: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth, window.innerWidth),
        height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, window.innerHeight),
      }));
      const clip = {
        x: 0,
        y: 0,
        width: Math.max(1, Math.min(dimensions.width, width, allowLarge ? Number.POSITIVE_INFINITY : maxDimension)),
        height: Math.max(1, Math.min(dimensions.height, fallbackMaxHeight, allowLarge ? Number.POSITIVE_INFINITY : maxDimension)),
      };
      await page.screenshot({ path: outputArg, clip });
      metadata.captureMode = "clipped-full-document-fallback";
      metadata.clippedFallback = true;
      metadata.fullPageError = String(error?.message || error);
      metadata.documentSize = dimensions;
      metadata.clip = clip;
    }
  }
} catch (error) {
  metadata.error = String(error?.message || error);
  throw error;
} finally {
  if (browser) {
    await browser.close();
    metadata.cleanup = "closed";
  }
  if (jsonPath) {
    fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
    fs.writeFileSync(jsonPath, `${JSON.stringify(metadata, null, 2)}\n`);
  }
}

if (metadata.captureMode === "segments") {
  console.log(`Captured ${metadata.segmentScreenshots.length} segments from ${targetArg}`);
} else {
  console.log(`Captured ${outputArg} (${metadata.captureMode})`);
}
if (metadata.clippedFallback) {
  console.log("Capture used clipped fallback; record this in review notes.");
}
