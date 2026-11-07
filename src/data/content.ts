import type { RuneVariant } from "./types";

export const NAV_LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "lore", label: "Lore" },
  { id: "magia", label: "Magia" },
  { id: "caracteristicas", label: "Características" },
  { id: "como-jugar", label: "Cómo Jugar" },
  { id: "reglas", label: "Reglas" },
  { id: "whitelist", label: "Whitelist" },
] as const;

export interface Feature {
  id: string;
  tag: string;
  title: string;
  description: string;
  rune: RuneVariant;
  accent: string;
}

export const FEATURES: Feature[] = [
  {
    id: "better-mc",
    tag: "Mundo",
    title: "Better MC Overhaul",
    description:
      "Generación de mundo renovada, estructuras masivas, dimensiones oscuras y secretos que no aparecen en ningún mapa. Cada expedición puede terminar en una mazmorra que no estaba ahí ayer.",
    rune: "nature",
    accent: "#7fbf5f",
  },
  {
    id: "grimorios",
    tag: "Progresión",
    title: "Grimorios y Báculos",
    description:
      "De aprendiz a archimago: craftea pergaminos, sella hechizos en grimorios y empuña báculos que amplifican tu escuela. La progresión mágica es tan importante como el nivel.",
    rune: "evocation",
    accent: "#c084fc",
  },
  {
    id: "jefes",
    tag: "Combate",
    title: "Jefes y Mazmorras Épicas",
    description:
      "Nightwarden, Hastur, The Faceless y el Ojo Eldritch no se derrotan con una build copiada. Cada incursión exige cooperación, preparación y la combinación correcta de elementos.",
    rune: "necro",
    accent: "#e0243a",
  },
  {
    id: "comunidad",
    tag: "Comunidad",
    title: "Economía y Comunidad",
    description:
      "Un servidor cooperativo optimizado, con eventos comunitarios, mercado, zonas protegidas y espacio para construir tu propio refugio sin que la magia de área lo borre del mapa.",
    rune: "holy",
    accent: "#f0d58a",
  },
];

export interface Step {
  id: string;
  numeral: string;
  title: string;
  description: string;
  note: string;
  rune: RuneVariant;
}

export const STEPS: Step[] = [
  {
    id: "launcher",
    numeral: "I",
    title: "Elige tu portal",
    description:
      "Instala CurseForge, Modrinth o Prism Launcher. Para este perfil recomendamos Prism Launcher o CurseForge: importan el paquete custom sin pelearse con las dependencias.",
    note: "Java Edition · 1.20.1",
    rune: "arcane",
  },
  {
    id: "grimorio",
    numeral: "II",
    title: "Forja tu grimorio",
    description:
      "Descarga el perfil prehecho del servidor: Better MC como base, Iron’s Spells ’n Spellbooks y el paquete curado de addons de magia, jefes y báculos. También puedes partir del modpack base y añadir los addons a mano.",
    note: "Perfil custom · Addons incluidos",
    rune: "evocation",
  },
  {
    id: "puerta",
    numeral: "III",
    title: "Cruza la Puerta",
    description:
      "Añade el servidor con la IP oficial, entra con Java 1.20.1 y busca tu primera escuela. Si es tu primera vez, pregunta en Discord: siempre hay alguien dispuesto a adoptar a un aprendiz.",
    note: "IP oficial · Servidor Online",
    rune: "ender",
  },
];

export interface Rule {
  id: string;
  numeral: string;
  title: string;
  summary: string;
  body: string;
}

export const RULES: Rule[] = [
  {
    id: "respeto",
    numeral: "I",
    title: "Respeto mutuo",
    summary: "La comunidad es el primer recurso del servidor.",
    body:
      "Trata a todos con respeto. No se toleran insultos, acoso, discriminación, amenazas ni drama. Las discusiones se resuelven con calma o con el staff; nunca con magia, trampas ni ataques personales.",
  },
  {
    id: "juego-limpio",
    numeral: "II",
    title: "Juego limpio",
    summary: "Cheats, hacks y exploits están prohibidos.",
    body:
      "No se permiten cheats, hacks, x-ray, clientes modificados no autorizados, dupes ni exploits. Si encuentras un bug, repórtalo al staff; usarlo para obtener ventaja conlleva sanción. La magia del servidor ya es suficientemente peligrosa sin trampas.",
  },
  {
    id: "magia-segura",
    numeral: "III",
    title: "La magia no destruye el hogar",
    summary: "Respeta las zonas protegidas y las construcciones ajenas.",
    body:
      "No uses magia de área, explosivos, fuego, terremotos o hechizos destructivos para grifear zonas protegidas, construcciones ajenas o eventos. Si dudas de si un hechizo puede afectar a otro jugador, pregunta antes de lanzarlo.",
  },
];

export interface Addon {
  id: string;
  name: string;
  source: string;
  description: string;
  tags: string[];
  rune: RuneVariant;
  accent: string;
  featured?: boolean;
}

export const ADDONS: Addon[] = [
  {
    id: "to-magic",
    name: "T.O Magic ’n Extras",
    source: "El rey de los jefes",
    description:
      "Más de 40 hechizos, jefes masivos, báculos míticos y equipo de alto nivel. Integra L_Ender’s Cataclysm y Alex’s Caves en la progresión mágica, con Nightwarden como guardián de la noche.",
    tags: ["40+ hechizos", "Jefes", "Báculos míticos", "Cataclysm", "Alex’s Caves"],
    rune: "boss",
    accent: "#ff9a3c",
    featured: true,
  },
  {
    id: "monsters",
    name: "Monsters & Spellbooks",
    source: "Nigromancia y bestias",
    description:
      "La escuela Necro, más de 90 hechizos, 12 sets de armadura, 30 armas y 10 mobs lanzadores. Sus estructuras enormes esconden minijefes nigromantes y botín legendario.",
    tags: ["Necro", "90+ hechizos", "Estructuras", "Minijefes"],
    rune: "necro",
    accent: "#8fe3a8",
  },
  {
    id: "deeper",
    name: "Deeper and Darker: Spellbooks",
    source: "El Otherside despierta",
    description:
      "Warden Battlemage Armor, el spellbook Volume of the Deep, el báculo The Whispers y cuatro invocaciones del Otherside. Dos estructuras nuevas y una línea de lore propia.",
    tags: ["Otherside", "4 invocaciones", "Warden", "Lore"],
    rune: "deep",
    accent: "#4fd1c5",
  },
  {
    id: "eldritch-end",
    name: "Eldritch End: Boss Edition",
    source: "El Fin corrompido",
    description:
      "9 criaturas del vacío, un jefe final masivo y pergaminos prohibidos de la escuela del Fin. La corrupción, Hastur y The Faceless convierten el End en una pesadilla lovecraftiana.",
    tags: ["Vacío", "9 criaturas", "Jefe final", "Pergaminos del Fin"],
    rune: "void",
    accent: "#c04cff",
  },
];
