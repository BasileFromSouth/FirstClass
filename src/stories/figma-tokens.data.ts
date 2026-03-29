/**
 * Couleurs synchronisées avec le fichier Figma Stoodio :
 * collections « Primitives / Color » et « Display ».
 *
 * Fichier : https://www.figma.com/design/OslApqcneRIMzWSg0lWSUI/Stoodio
 * Dernière extraction : valeurs résolues côté Figma (mode Base + Light/Dark).
 */
export const FIGMA_FILE_URL =
  'https://www.figma.com/design/OslApqcneRIMzWSg0lWSUI/Stoodio';

export type PrimitiveColor = {
  name: string;
  /** Mode Base */
  hex: string;
};

export type DisplayColor = {
  name: string;
  /** Alias primitives par mode (documentation) */
  aliases: { Light: string; Dark: string };
  /** Couleurs résolues pour affichage */
  resolved: { Light: string; Dark: string };
};

export const PRIMITIVES_COLOR: PrimitiveColor[] = [
  { name: 'Neutral/0', hex: '#ffffff' },
  { name: 'Neutral/50', hex: '#fafafa' },
  { name: 'Neutral/200', hex: '#e5e5e5' },
  { name: 'Neutral/400', hex: '#999999' },
  { name: 'Neutral/600', hex: '#737373' },
  { name: 'Neutral/700', hex: '#595959' },
  { name: 'Neutral/900', hex: '#262626' },
  { name: 'Neutral/950', hex: '#171717' },
  { name: 'Brand/500', hex: '#ff1a3d' },
  { name: 'Brand/600', hex: '#cc0f30' },
];

export const DISPLAY_COLOR: DisplayColor[] = [
  {
    name: 'Surface/Canvas',
    aliases: { Light: 'Neutral/0', Dark: 'Neutral/950' },
    resolved: { Light: '#ffffff', Dark: '#171717' },
  },
  {
    name: 'Surface/Elevated',
    aliases: { Light: 'Neutral/50', Dark: 'Neutral/900' },
    resolved: { Light: '#fafafa', Dark: '#262626' },
  },
  {
    name: 'Text/Primary',
    aliases: { Light: 'Neutral/950', Dark: 'Neutral/0' },
    resolved: { Light: '#171717', Dark: '#ffffff' },
  },
  {
    name: 'Text/Secondary',
    aliases: { Light: 'Neutral/600', Dark: 'Neutral/400' },
    resolved: { Light: '#737373', Dark: '#999999' },
  },
  {
    name: 'Border/Default',
    aliases: { Light: 'Neutral/200', Dark: 'Neutral/700' },
    resolved: { Light: '#e5e5e5', Dark: '#595959' },
  },
  {
    name: 'Accent/Primary',
    aliases: { Light: 'Brand/500', Dark: 'Brand/500' },
    resolved: { Light: '#ff1a3d', Dark: '#ff1a3d' },
  },
  {
    name: 'Accent/Primary Hover',
    aliases: { Light: 'Brand/600', Dark: 'Brand/600' },
    resolved: { Light: '#cc0f30', Dark: '#cc0f30' },
  },
];

/** Map prénom → hex pour résolution rapide */
export function primitiveHexByName(): Record<string, string> {
  return Object.fromEntries(PRIMITIVES_COLOR.map((p) => [p.name, p.hex]));
}
