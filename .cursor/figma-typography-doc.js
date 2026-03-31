// Run via use_figma MCP - typography documentation table
const DISPLAY_COLL_ID = "VariableCollectionId:61:2";
const LIGHT_MODE_ID = "61:0";

const STYLE_ORDER = [
  "Display/Hero",
  "Display/L",
  "Heading/H1",
  "Heading/H2",
  "Heading/H3",
  "Heading/H4",
  "Lead/Lead",
  "Body/L",
  "Body/M",
  "Body/S",
  "Body/Strong/M",
  "Label/L",
  "Label/M",
  "Caption/Caption",
  "Overline/Overline",
];

const VAR = {
  bgLow: "Backgrounds/Defaults/background-low",
  bgHigh: "Backgrounds/Defaults/background-high",
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

function previewSample(fontSize) {
  if (fontSize >= 80) return "Hero";
  if (fontSize >= 50) return "Display";
  if (fontSize >= 24) return "Heading sample";
  return "The quick brown fox.";
}

function formatSpec(style) {
  const fn = style.fontName;
  const lh =
    style.lineHeight.unit === "PIXELS"
      ? style.lineHeight.value + "px"
      : style.lineHeight.value + "%";
  const ls =
    style.letterSpacing.unit === "PERCENT"
      ? style.letterSpacing.value + "%"
      : style.letterSpacing.value + "px";
  return fn.family + " " + fn.style + " · " + style.fontSize + "px / " + lh + " · " + ls;
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

const styles = await figma.getLocalTextStylesAsync();
const byStyleName = Object.create(null);
for (const s of styles) byStyleName[s.name] = s;

const ordered = [];
for (const n of STYLE_ORDER) {
  const s = byStyleName[n];
  if (s) ordered.push(s);
}
for (const s of styles) {
  if (!STYLE_ORDER.includes(s.name)) ordered.push(s);
}

const coll = await figma.variables.getVariableCollectionByIdAsync(DISPLAY_COLL_ID);

const createdNodeIds = [];

const docRoot = figma.createFrame();
docRoot.name = "📋 Typography — documentation";
docRoot.layoutMode = "VERTICAL";
docRoot.primaryAxisAlignItems = "MIN";
docRoot.counterAxisAlignItems = "MIN";
docRoot.itemSpacing = 40;
docRoot.paddingLeft = 64;
docRoot.paddingRight = 64;
docRoot.paddingTop = 56;
docRoot.paddingBottom = 72;
docRoot.resize(1180, 100);
docRoot.layoutSizingVertical = "HUG";
docRoot.fills = [bindColor(req(VAR.bgLow))];
docRoot.strokes = [];
docRoot.setExplicitVariableModeForCollection(coll, LIGHT_MODE_ID);
page.appendChild(docRoot);
createdNodeIds.push(docRoot.id);

const headerBlock = figma.createFrame();
headerBlock.name = "Header";
headerBlock.layoutMode = "VERTICAL";
headerBlock.itemSpacing = 12;
headerBlock.fills = [];
headerBlock.layoutSizingHorizontal = "FILL";
headerBlock.layoutSizingVertical = "HUG";
docRoot.appendChild(headerBlock);
createdNodeIds.push(headerBlock.id);

await figma.loadFontAsync({ family: "Playfair Display", style: "Bold" });
const title = figma.createText();
title.name = "Title";
title.characters = "Typography";
title.fontName = { family: "Playfair Display", style: "Bold" };
title.fontSize = 48;
title.fills = [bindColor(req(VAR.textHigh))];
title.layoutSizingHorizontal = "HUG";
title.layoutSizingVertical = "HUG";
headerBlock.appendChild(title);
createdNodeIds.push(title.id);

await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
const subtitle = figma.createText();
subtitle.name = "Subtitle";
subtitle.characters =
  "Text styles de la librairie — pr\u00e9visualisation, cat\u00e9gorie et sp\u00e9cifications (taille, interligne, chasse).";
subtitle.fontName = { family: "Roboto", style: "Regular" };
subtitle.fontSize = 18;
subtitle.lineHeight = { unit: "PIXELS", value: 28 };
subtitle.fills = [bindColor(req(VAR.textMiddle))];
subtitle.layoutSizingHorizontal = "FILL";
subtitle.layoutSizingVertical = "HUG";
headerBlock.appendChild(subtitle);
createdNodeIds.push(subtitle.id);

const tableCard = figma.createFrame();
tableCard.name = "Table";
tableCard.layoutMode = "HORIZONTAL";
tableCard.primaryAxisAlignItems = "MIN";
tableCard.counterAxisAlignItems = "MIN";
tableCard.itemSpacing = 0;
tableCard.paddingLeft = 0;
tableCard.paddingRight = 0;
tableCard.paddingTop = 0;
tableCard.paddingBottom = 0;
tableCard.cornerRadius = 20;
tableCard.fills = [bindColor(req(VAR.surfaceHigh))];
tableCard.strokes = [bindColor(req(VAR.borderLow))];
tableCard.strokeWeight = 1;
tableCard.layoutSizingHorizontal = "FILL";
tableCard.layoutSizingVertical = "HUG";
tableCard.setExplicitVariableModeForCollection(coll, LIGHT_MODE_ID);
docRoot.appendChild(tableCard);
createdNodeIds.push(tableCard.id);

const accent = figma.createRectangle();
accent.name = "Accent";
accent.resize(6, 1);
accent.layoutAlign = "STRETCH";
accent.cornerRadius = 0;
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
tableInner.layoutSizingHorizontal = "FILL";
tableInner.layoutSizingVertical = "HUG";
tableCard.appendChild(tableInner);
createdNodeIds.push(tableInner.id);

await figma.loadFontAsync({ family: "Roboto", style: "Medium" });

function makeHeaderRow() {
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
  row.layoutSizingHorizontal = "FILL";
  row.layoutSizingVertical = "HUG";
  row.setExplicitVariableModeForCollection(coll, LIGHT_MODE_ID);

  const cols = [
    { w: 220, label: "Style" },
    { w: 120, label: "Cat\u00e9gorie" },
    { w: 360, label: "Sp\u00e9cifications" },
    { w: 420, label: "Aper\u00e7u" },
  ];
  for (const c of cols) {
    const cell = figma.createFrame();
    cell.name = "Cell";
    cell.layoutMode = "HORIZONTAL";
    cell.primaryAxisAlignItems = "MIN";
    cell.counterAxisAlignItems = "CENTER";
    cell.fills = [];
    cell.resize(c.w, 40);
    cell.layoutSizingHorizontal = "FIXED";
    cell.layoutSizingVertical = "HUG";
    const t = figma.createText();
    t.fontName = { family: "Roboto", style: "Medium" };
    t.fontSize = 13;
    t.characters = c.label;
    t.fills = [bindColor(req(VAR.textPrimary))];
    t.letterSpacing = { unit: "PERCENT", value: 4 };
    t.textCase = "UPPER";
    cell.appendChild(t);
    createdNodeIds.push(t.id);
    row.appendChild(cell);
    createdNodeIds.push(cell.id);
  }
  return row;
}

const headerRow = makeHeaderRow();
tableInner.appendChild(headerRow);
createdNodeIds.push(headerRow.id);

let rowIdx = 0;
for (const style of ordered) {
  const row = figma.createFrame();
  row.name = "Row / " + style.name.replace(/\//g, " — ");
  row.layoutMode = "HORIZONTAL";
  row.primaryAxisAlignItems = "CENTER";
  row.counterAxisAlignItems = "CENTER";
  row.itemSpacing = 24;
  row.paddingLeft = 28;
  row.paddingRight = 28;
  row.paddingTop = 20;
  row.paddingBottom = 20;
  const zebra = rowIdx % 2 === 0;
  row.fills = [
    bindColor(req(zebra ? VAR.surfaceHigh : VAR.bgHigh)),
  ];
  row.strokes = [];
  row.layoutSizingHorizontal = "FILL";
  row.layoutSizingVertical = "HUG";
  row.setExplicitVariableModeForCollection(coll, LIGHT_MODE_ID);
  rowIdx++;

  const nameParts = style.name.split("/");
  const category = nameParts[0] || "";
  const shortName = style.name;

  const c1 = figma.createFrame();
  c1.resize(220, 32);
  c1.layoutMode = "HORIZONTAL";
  c1.fills = [];
  c1.layoutSizingHorizontal = "FIXED";
  c1.layoutSizingVertical = "HUG";
  const tName = figma.createText();
  await figma.loadFontAsync(style.fontName);
  tName.fontName = style.fontName;
  tName.fontSize = 13;
  tName.lineHeight = { unit: "PIXELS", value: 18 };
  tName.characters = shortName;
  tName.fills = [bindColor(req(VAR.textHigh))];
  c1.appendChild(tName);
  row.appendChild(c1);
  createdNodeIds.push(c1.id, tName.id);

  const c2 = figma.createFrame();
  c2.resize(120, 32);
  c2.layoutMode = "HORIZONTAL";
  c2.fills = [];
  c2.layoutSizingHorizontal = "FIXED";
  c2.layoutSizingVertical = "HUG";
  const tCat = figma.createText();
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  tCat.fontName = { family: "Roboto", style: "Regular" };
  tCat.fontSize = 13;
  tCat.lineHeight = { unit: "PIXELS", value: 18 };
  tCat.characters = category;
  tCat.fills = [bindColor(req(VAR.textMiddle))];
  c2.appendChild(tCat);
  row.appendChild(c2);
  createdNodeIds.push(c2.id, tCat.id);

  const c3 = figma.createFrame();
  c3.resize(360, 32);
  c3.layoutMode = "VERTICAL";
  c3.primaryAxisAlignItems = "MIN";
  c3.fills = [];
  c3.layoutSizingHorizontal = "FIXED";
  c3.layoutSizingVertical = "HUG";
  const tSpec = figma.createText();
  tSpec.fontName = { family: "Roboto", style: "Regular" };
  tSpec.fontSize = 12;
  tSpec.lineHeight = { unit: "PIXELS", value: 18 };
  tSpec.characters = formatSpec(style);
  tSpec.fills = [bindColor(req(VAR.textMiddle))];
  c3.appendChild(tSpec);
  row.appendChild(c3);
  createdNodeIds.push(c3.id, tSpec.id);

  const c4 = figma.createFrame();
  c4.name = "Preview cell";
  c4.layoutMode = "VERTICAL";
  c4.primaryAxisAlignItems = "MIN";
  c4.counterAxisAlignItems = "MIN";
  c4.fills = [];
  c4.resize(420, 40);
  c4.layoutSizingHorizontal = "FIXED";
  c4.layoutSizingVertical = "HUG";
  const tPrev = figma.createText();
  await figma.loadFontAsync(style.fontName);
  tPrev.textStyleId = style.id;
  tPrev.characters = previewSample(style.fontSize);
  tPrev.fills = [bindColor(req(VAR.textHigh))];
  tPrev.textAutoResize = "HEIGHT";
  tPrev.layoutSizingHorizontal = "FILL";
  c4.appendChild(tPrev);
  row.appendChild(c4);
  createdNodeIds.push(c4.id, tPrev.id);

  tableInner.appendChild(row);
  createdNodeIds.push(row.id);
}

return {
  createdNodeIds,
  docRootId: docRoot.id,
  rowCount: ordered.length,
};
