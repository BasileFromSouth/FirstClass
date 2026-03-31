const DISPLAY_COLL_ID = "VariableCollectionId:61:2";
const LIGHT_MODE_ID = "61:0";
const VAR = {
  bgLow: "Backgrounds/Defaults/background-low",
  surfaceHigh: "Surfaces/Defaults/surface-high",
  surfaceLow: "Surfaces/Defaults/surface-low",
  textHigh: "Texts/Defaults/text-high",
  textMiddle: "Texts/Defaults/text-middle",
  textPrimary: "Texts/Semantics/text-primary",
  borderLow: "Borders/Defaults/border-low",
  surfacePrimary: "Surfaces/Semantics/surface-primary",
};
function bindColor(variable) {
  return figma.variables.setBoundVariableForPaint(
    { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
    "color",
    variable
  );
}
const page = figma.root.children.find((p) => p.id === "1:5");
if (!page) throw new Error("Typography page 1:5 not found");
await figma.setCurrentPageAsync(page);
const allColor = await figma.variables.getLocalVariablesAsync("COLOR");
const byName = Object.create(null);
for (const v of allColor) byName[v.name] = v;
function req(path) {
  const v = byName[path];
  if (!v) throw new Error("Missing color variable: " + path);
  return v;
}
const coll = await figma.variables.getVariableCollectionByIdAsync(DISPLAY_COLL_ID);
const createdNodeIds = [];
const docRoot = figma.createFrame();
docRoot.name = "Typography documentation";
docRoot.layoutMode = "VERTICAL";
docRoot.primaryAxisAlignItems = "MIN";
docRoot.counterAxisAlignItems = "MIN";
docRoot.itemSpacing = 40;
docRoot.paddingLeft = 64;
docRoot.paddingRight = 64;
docRoot.paddingTop = 56;
docRoot.paddingBottom = 72;
docRoot.resize(1180, 100);
docRoot.fills = [bindColor(req(VAR.bgLow))];
docRoot.strokes = [];
docRoot.setExplicitVariableModeForCollection(coll, LIGHT_MODE_ID);
page.appendChild(docRoot);
docRoot.layoutSizingVertical = "HUG";
createdNodeIds.push(docRoot.id);
const headerBlock = figma.createFrame();
headerBlock.name = "Header";
headerBlock.layoutMode = "VERTICAL";
headerBlock.itemSpacing = 12;
headerBlock.fills = [];
docRoot.appendChild(headerBlock);
headerBlock.layoutSizingHorizontal = "FILL";
headerBlock.layoutSizingVertical = "HUG";
createdNodeIds.push(headerBlock.id);
await figma.loadFontAsync({ family: "Playfair Display", style: "Bold" });
const title = figma.createText();
title.name = "Title";
title.characters = "Typography";
title.fontName = { family: "Playfair Display", style: "Bold" };
title.fontSize = 48;
title.fills = [bindColor(req(VAR.textHigh))];
headerBlock.appendChild(title);
title.layoutSizingHorizontal = "HUG";
title.layoutSizingVertical = "HUG";
createdNodeIds.push(title.id);
await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
const subtitle = figma.createText();
subtitle.name = "Subtitle";
subtitle.characters =
  "Text styles — preview, category, specs (size, line-height, tracking).";
subtitle.fontName = { family: "Roboto", style: "Regular" };
subtitle.fontSize = 18;
subtitle.lineHeight = { unit: "PIXELS", value: 28 };
subtitle.fills = [bindColor(req(VAR.textMiddle))];
headerBlock.appendChild(subtitle);
subtitle.layoutSizingHorizontal = "FILL";
subtitle.layoutSizingVertical = "HUG";
createdNodeIds.push(subtitle.id);
const tableCard = figma.createFrame();
tableCard.name = "Table";
tableCard.layoutMode = "HORIZONTAL";
tableCard.primaryAxisAlignItems = "MIN";
tableCard.counterAxisAlignItems = "MIN";
tableCard.itemSpacing = 0;
tableCard.cornerRadius = 20;
tableCard.fills = [bindColor(req(VAR.surfaceHigh))];
tableCard.strokes = [bindColor(req(VAR.borderLow))];
tableCard.strokeWeight = 1;
tableCard.setExplicitVariableModeForCollection(coll, LIGHT_MODE_ID);
docRoot.appendChild(tableCard);
tableCard.layoutSizingHorizontal = "FILL";
tableCard.layoutSizingVertical = "HUG";
createdNodeIds.push(tableCard.id);
const accent = figma.createRectangle();
accent.name = "Accent";
accent.resize(6, 1);
accent.layoutAlign = "STRETCH";
accent.fills = [bindColor(req(VAR.surfacePrimary))];
accent.strokes = [];
tableCard.appendChild(accent);
createdNodeIds.push(accent.id);
accent.layoutSizingVertical = "FILL";
const tableInner = figma.createFrame();
tableInner.name = "Table inner";
tableInner.layoutMode = "VERTICAL";
tableInner.itemSpacing = 0;
tableInner.fills = [];
tableCard.appendChild(tableInner);
tableInner.layoutSizingHorizontal = "FILL";
tableInner.layoutSizingVertical = "HUG";
createdNodeIds.push(tableInner.id);
await figma.loadFontAsync({ family: "Roboto", style: "Medium" });
const row = figma.createFrame();
row.name = "Row / Header";
row.layoutMode = "HORIZONTAL";
row.primaryAxisAlignItems = "CENTER";
row.counterAxisAlignItems = "CENTER";
row.itemSpacing = 24;
row.paddingLeft = 28;
row.paddingRight = 28;
row.paddingTop = 20;
row.paddingBottom = 20;
row.fills = [bindColor(req(VAR.surfaceLow))];
row.strokes = [];
row.setExplicitVariableModeForCollection(coll, LIGHT_MODE_ID);
const cols = [
  { w: 220, label: "Style" },
  { w: 120, label: "Category" },
  { w: 360, label: "Specifications" },
  { w: 420, label: "Preview" },
];
for (const c of cols) {
  const cell = figma.createFrame();
  cell.layoutMode = "HORIZONTAL";
  cell.primaryAxisAlignItems = "MIN";
  cell.counterAxisAlignItems = "CENTER";
  cell.fills = [];
  cell.resize(c.w, 40);
  const t = figma.createText();
  t.fontName = { family: "Roboto", style: "Medium" };
  t.fontSize = 13;
  t.characters = c.label;
  t.fills = [bindColor(req(VAR.textPrimary))];
  t.letterSpacing = { unit: "PERCENT", value: 4 };
  t.textCase = "UPPER";
  cell.appendChild(t);
  row.appendChild(cell);
  cell.layoutSizingHorizontal = "FIXED";
  cell.layoutSizingVertical = "HUG";
  createdNodeIds.push(t.id, cell.id);
}
tableInner.appendChild(row);
row.layoutSizingHorizontal = "FILL";
row.layoutSizingVertical = "HUG";
createdNodeIds.push(row.id);
return { createdNodeIds, docRootId: docRoot.id, tableInnerId: tableInner.id };
