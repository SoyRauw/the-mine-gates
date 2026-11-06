export type RuneVariant =
  | "fire"
  | "ice"
  | "lightning"
  | "holy"
  | "blood"
  | "ender"
  | "evocation"
  | "nature"
  | "eldritch"
  | "necro"
  | "deep"
  | "void"
  | "arcane"
  | "sound"
  | "boss"
  | "eye"
  | "mask"
  | "crown";

export type SchoolCategory = "base" | "addon" | "server";

export interface Spell {
  name: string;
  description: string;
}

export interface FeaturedSpell {
  name: string;
  description: string;
  bullets: string[];
}

export interface School {
  id: string;
  name: string;
  category: SchoolCategory;
  source: string;
  sourceShort: string;
  accent: string;
  accentSoft: string;
  focus: string;
  role: string;
  tagline: string;
  description: string;
  spells: Spell[];
  signatureSpell: string;
  featuredSpell?: FeaturedSpell;
  synergies: string[];
  gear: string[];
  bosses?: string[];
  note: string;
  spellNote?: string;
  rune: RuneVariant;
}

export interface Boss {
  id: string;
  name: string;
  source: string;
  rune: RuneVariant;
  accent: string;
  mechanic: string;
  loot: string;
  health: number;
  threat: string;
}
