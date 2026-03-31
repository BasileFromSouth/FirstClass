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
  bgHigh: "Backgrounds/Defaults/background-high",
  surfaceHigh: "Surfaces/Defaults/surface-high",
  textHigh: "Texts/Defaults/text-high",
  textMiddle: "Texts/Defaults/text-middle",
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
await figma.setCurrentPageAsync(page);
let tableInner = null;
const docFrame = page.children.find(
  (c) => c.type === "FRAME" && c.name === "Typography documentation"
);
if (docFrame && "findAll" in docFrame) {
  const found = docFrame.findAll(
    (n) => n.type === "FRAME" && n.name === "Table inner"
  );
  tableInner = found.length ? found[0] : null;
}
if (!tableInner || tableInner.type !== "FRAME")
  throw new Error("Table inner not found — run part 1 first");
const allColor = await figma.variables.getLocalVariablesAsync("COLOR");
const byName = Object.create(null);
for (const v of allColor) byName[v.name] = v;
function req(path) {
  const v = byName[path];
  if (!v) throw new Error("Missing color variable: " + path);
  return v;
}
const coll = await figma.variables.getVariableCollectionByIdAsync(DISPLAY_COLL_ID);
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
const createdNodeIds = [];
let rowIdx = 0;
for (const style of ordered) {
  const row = figma.createFrame();
  row.name = "Row / " + style.name.split("/").join(" — ");
  row.layoutMode = "HORIZONTAL";
  row.primaryAxisAlignItems = "CENTER";
  row.counterAxisAlignItems = "CENTER";
  row.itemSpacing = 24;
  row.paddingLeft = 28;
  row.paddingRight = 28;
  row.paddingTop = 20;
  row.paddingBottom = 20;
  const zebra = rowIdx % 2 === 0;
  row.fills = [bindColor(req(zebra ? VAR.surfaceHigh : VAR.bgHigh))];
  row.strokes = [];
  row.setExplicitVariableModeForCollection(coll, LIGHT_MODE_ID);
  rowIdx++;
  const nameParts = style.name.split("/");
  const category = nameParts[0] || "";
  const shortName = style.name;
  const c1 = figma.createFrame();
  c1.resize(220, 32);
  c1.layoutMode = "HORIZONTAL";
  c1.fills = [];
  const tName = figma.createText();
  await figma.loadFontAsync(style.fontName);
  tName.fontName = style.fontName;
  tName.fontSize = 13;
  tName.lineHeight = { unit: "PIXELS", value: 18 };
  tName.characters = shortName;
  tName.fills = [bindColor(req(VAR.textHigh))];
  c1.appendChild(tName);
  row.appendChild(c1);
  c1.layoutSizingHorizontal = "FIXED";
  c1.layoutSizingVertical = "HUG";
  createdNodeIds.push(c1.id, tName.id);
  const c2 = figma.createFrame();
  c2.resize(120, 32);
  c2.layoutMode = "HORIZONTAL";
  c2.fills = [];
  const tCat = figma.createText();
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  tCat.fontName = { family: "Roboto", style: "Regular" };
  tCat.fontSize = 13;
  tCat.lineHeight = { unit: "PIXELS", value: 18 };
  tCat.characters = category;
  tCat.fills = [bindColor(req(VAR.textMiddle))];
  c2.appendChild(tCat);
  row.appendChild(c2);
  c2.layoutSizingHorizontal = "FIXED";
  c2.layoutSizingVertical = "HUG";
  createdNodeIds.push(c2.id, tCat.id);
  const c3 = figma.createFrame();
  c3.resize(360, 32);
  c3.layoutMode = "VERTICAL";
  c3.primaryAxisAlignItems = "MIN";
  c3.fills = [];
  const tSpec = figma.createText();
  tSpec.fontName = { family: "Roboto", style: "Regular" };
  tSpec.fontSize = 12;
  tSpec.lineHeight = { unit: "PIXELS", value: 18 };
  tSpec.characters = formatSpec(style);
  tSpec.fills = [bindColor(req(VAR.textMiddle))];
  c3.appendChild(tSpec);
  row.appendChild(c3);
  c3.layoutSizingHorizontal = "FIXED";
  c3.layoutSizingVertical = "HUG";
  createdNodeIds.push(c3.id, tSpec.id);
  const c4 = figma.createFrame();
  c4.name = "Preview cell";
  c4.layoutMode = "VERTICAL";
  c4.primaryAxisAlignItems = "MIN";
  c4.counterAxisAlignItems = "MIN";
  c4.fills = [];
  c4.resize(420, 40);
  const tPrev = figma.createText();
  await figma.loadFontAsync(style.fontName);
  tPrev.textStyleId = style.id;
  tPrev.characters = previewSample(style.fontSize);
  tPrev.fills = [bindColor(req(VAR.textHigh))];
  tPrev.textAutoResize = "HEIGHT";
  c4.appendChild(tPrev);
  tPrev.layoutSizingHorizontal = "FILL";
  row.appendChild(c4);
  c4.layoutSizingHorizontal = "FIXED";
  c4.layoutSizingVertical = "HUG";
  createdNodeIds.push(c4.id, tPrev.id);
  tableInner.appendChild(row);
  row.layoutSizingHorizontal = "FILL";
  row.layoutSizingVertical = "HUG";
  createdNodeIds.push(row.id);
}
return { createdNodeIds, rowCount: ordered.length };
