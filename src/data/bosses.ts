import type { Boss } from "./types";

export const BOSSES: Boss[] = [
  {
    id: "nightwarden",
    name: "Nightwarden",
    source: "T.O Magic ’n Extras",
    rune: "boss",
    accent: "#ff9a3c",
    mechanic:
      "El guardián de la noche alterna fases de acecho con ráfagas de oscuridad. Exige movilidad, coordinación y saber cuándo bajar el DPS para reposicionarse.",
    loot: "Báculos míticos, materiales de jefe y equipo de alto nivel.",
    health: 84,
    threat: "Amenaza alta",
  },
  {
    id: "hastur",
    name: "Hastur, el Rey de Amarillo",
    source: "Eldritch End · Boss Edition",
    rune: "crown",
    accent: "#f0d58a",
    mechanic:
      "El Rey de Amarillo castiga con corrupción, ilusiones y juicios del vacío. El grupo debe gestionar los stacks de corrupción mientras esquiva sus fases.",
    loot: "Pergaminos prohibidos del Fin, reliquias de Etyr y materiales de corrupción.",
    health: 100,
    threat: "Jefe final",
  },
  {
    id: "faceless",
    name: "The Faceless",
    source: "Eldritch End · Boss Edition",
    rune: "mask",
    accent: "#c04cff",
    mechanic:
      "Un boss de ritual y paciencia. Invoca tormentas, divide al grupo y obliga a resolver mecánicas antes de abrir su ventana de daño.",
    loot: "Reliquias del vacío, materiales del Primordial Abyss y pergaminos raros.",
    health: 92,
    threat: "Amenaza crítica",
  },
  {
    id: "eldritch-eye",
    name: "The Eldritch Eye",
    source: "Eldritch End · Boss Edition",
    rune: "eye",
    accent: "#7fe3c0",
    mechanic:
      "Un ojo flotante que corrompe la mirada y dispara rayos de vacío. Sus adds y su campo de corrupción castigan a quien se queda quieto.",
    loot: "Materiales de corrupción, fragmentos del Fin y botín de evento.",
    health: 88,
    threat: "Amenaza alta",
  },
];
