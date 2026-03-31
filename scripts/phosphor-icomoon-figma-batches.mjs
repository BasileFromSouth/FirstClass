#!/usr/bin/env node
/**
 * Reads IcoMoon selection.json (Phosphor font export) and writes JS for use_figma:
 * createNodeFromSvg + createComponentFromNode on the page whose name contains "Icons".
 *
 * Usage:
 *   node scripts/phosphor-icomoon-figma-batches.mjs <path/to/selection.json> [outDir]
 *
 * Apply each batch-NNN.js with use_figma (fileKey: 3asFmiQJbu3XBt9ubUcjiA for [DS] - Styles).
 */

import fs from "node:fs";
import path from "node:path";

const selectionPath = process.argv[2];
const outDir = process.argv[3] ?? path.join(process.cwd(), ".figma-phosphor-batches");

if (!selectionPath) {
  console.error("Usage: node phosphor-icomoon-figma-batches.mjs <selection.json> [outDir]");
  process.exit(1);
}

const raw = fs.readFileSync(selectionPath, "utf8");
const data = JSON.parse(raw);
const height = data.height ?? 1024;
const icons = data.icons ?? [];

function buildSvg(paths) {
  const inner = paths
    .map((d) => `<path d="${d.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}" fill="#000000"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${height} ${height}">${inner}</svg>`;
}

const items = icons.map((entry) => {
  const name = entry.properties?.name ?? entry.icon?.tags?.[0] ?? "icon";
  const svg = buildSvg(entry.icon.paths);
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

console.log("Total icons:", items.length, "batches:", batchIndex);
