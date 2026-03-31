#!/usr/bin/env node
/**
 * Reads Phosphor "SVGs Flat" .svg files from a folder (e.g. .../SVGs Flat/regular)
 * and writes JS snippets for use_figma (createNodeFromSvg + createComponentFromNode).
 *
 * Usage:
 *   node scripts/phosphor-svg-flat-figma-batches.mjs <path/to/svg-folder> [outDir]
 *
 * SVGs are normalized for Figma (currentColor → #000000). Names = filename without .svg.
 */

import fs from "node:fs";
import path from "node:path";

const svgDir = process.argv[2];
const outDir = process.argv[3] ?? path.join(process.cwd(), ".figma-phosphor-svg-flat-batches");
/** Prefix Figma component names (e.g. flat-regular/) to avoid clashes with other imports */
const NAME_PREFIX = process.env.PHOSPHOR_SVG_NAME_PREFIX ?? "flat-regular/";

if (!svgDir || !fs.existsSync(svgDir)) {
  console.error("Usage: node phosphor-svg-flat-figma-batches.mjs <folder-with-svg-files> [outDir]");
  process.exit(1);
}

function normalizeSvg(raw) {
  return raw
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/fill="currentColor"/g, 'fill="#000000"')
    .replace(/fill='currentColor'/g, 'fill="#000000"');
}

const files = fs
  .readdirSync(svgDir)
  .filter((f) => f.toLowerCase().endsWith(".svg"))
  .sort((a, b) => a.localeCompare(b, "en"));

const items = files.map((f) => {
  const base = path.basename(f, ".svg");
  const name = NAME_PREFIX ? `${NAME_PREFIX}${base}` : base;
  const svg = normalizeSvg(fs.readFileSync(path.join(svgDir, f), "utf8"));
  return { name, svg };
});

const MAX_BATCH = 45000;

const preamble = (startGridIndex) => `const page = figma.root.children.find(
  (p) => p.type === "PAGE" && /\\bIcons\\b/.test(p.name)
);
if (!page) {
  throw new Error("No page matching Icons: " + figma.root.children.map((p) => p.name).join(" | "));
}
await figma.setCurrentPageAsync(page);
const cell = 28;
const cols = 24;
const iconSize = 24;
let baseIdx = ${startGridIndex};
const BATCH = `;

const postamble = `;
const createdNodeIds = [];
const errors = [];
for (let k = 0; k < BATCH.length; k++) {
  const i = baseIdx + k;
  const { name, svg } = BATCH[k];
  try {
    const frame = figma.createNodeFromSvg(svg);
    frame.name = name;
    const row = Math.floor(i / cols);
    const col = i % cols;
    frame.x = col * cell;
    frame.y = row * cell;
    frame.resizeWithoutConstraints(iconSize, iconSize);
    page.appendChild(frame);
    const comp = figma.createComponentFromNode(frame);
    createdNodeIds.push(comp.id);
  } catch (e) {
    errors.push({ name, message: String(e && e.message ? e.message : e) });
  }
}
return { createdNodeIds, errors, count: createdNodeIds.length, batchSize: BATCH.length };
`;

fs.mkdirSync(outDir, { recursive: true });

let batch = [];
let batchIndex = 0;
let globalGridIndex = 0;

function flushBatch() {
  if (batch.length === 0) return;
  const json = JSON.stringify(batch);
  const code = preamble(globalGridIndex) + json + postamble;
  const file = path.join(outDir, `batch-${String(batchIndex).padStart(3, "0")}.js`);
  fs.writeFileSync(file, code, "utf8");
  console.log(file, "icons", batch.length, "chars", code.length);
  globalGridIndex += batch.length;
  batch = [];
  batchIndex++;
}

function projectedSize(nextItem) {
  const tryBatch = nextItem ? [...batch, nextItem] : batch;
  return preamble(globalGridIndex).length + JSON.stringify(tryBatch).length + postamble.length;
}

for (const item of items) {
  if (batch.length > 0 && projectedSize(item) > MAX_BATCH) flushBatch();
  batch.push(item);
}
flushBatch();

console.log("Total SVGs:", items.length, "batches:", batchIndex, "source:", svgDir);
