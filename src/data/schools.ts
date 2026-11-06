import type { School } from "./types";

export const SCHOOLS: School[] = [
  {
    id: "fuego",
    name: "Fuego",
    category: "base",
    source: "Iron’s Spells · Escuela base",
    sourceShort: "Base",
    accent: "#ff9a3c",
    accentSoft: "rgba(255, 154, 60, 0.16)",
    focus: "Blaze Rod",
    role: "Daño directo · Zonas de fuego",
    tagline: "La escuela que convierte el campo de batalla en una fragua.",
    description:
      "Fuego es presión constante: proyectiles, conos, muros y explosiones que obligan al enemigo a moverse. Su maestría premia la agresión calculada, el control de zonas y saber cuándo encender el mundo entero.",
    spells: [
      {
        name: "Fireball",
        description: "Una esfera de fuego que estalla al impactar y castiga a los grupos.",
      },
      {
        name: "Wall of Fire",
        description: "Levanta un muro ígneo que bloquea proyectiles y quema a quien lo cruza.",
      },
      {
        name: "Blaze Storm",
        description: "Descarga una tormenta de bolas de fuego mientras mantienes la canalización.",
      },
      {
        name: "Raise Hell",
        description: "Golpea el suelo y desata una onda de fuego masiva alrededor del lanzador.",
      },
    ],
    signatureSpell: "Raise Hell",
    synergies: [
      "Naturaleza · veneno + quemadura",
      "Rayo · detonación de área",
      "Sonido · crescendo ígneo",
    ],
    gear: ["Báculo de llamas", "Grimorio de fuego", "Armadura de piromante"],
    bosses: ["Nightwarden"],
    note: "Los hechizos de fuego respetan las zonas protegidas del servidor; el daño a estructuras está limitado para evitar griefing accidental.",
    rune: "fire",
  },
  {
    id: "hielo",
    name: "Hielo",
    category: "base",
    source: "Iron’s Spells · Escuela base",
    sourceShort: "Base",
    accent: "#5ec8ff",
    accentSoft: "rgba(94, 200, 255, 0.15)",
    focus: "Frozen Bone",
    role: "Control · Supervivencia",
    tagline: "El arte de detener el tiempo bajo una capa de escarcha.",
    description:
      "Hielo no solo ralentiza: congela, encierra y quiebra. Es la escuela del control y la supervivencia, capaz de convertir una huida desesperada en una prisión de cristal para el enemigo.",
    spells: [
      {
        name: "Ice Tomb",
        description: "Te encierras en un sepulcro de hielo que absorbe un golpe y te cura mientras dura.",
      },
      {
        name: "Blizzard",
        description: "Invoca un vórtice de nieve que arrastra y congela a las criaturas atrapadas.",
      },
      {
        name: "Frost Step",
        description: "Te teletransportas dejando una sombra de hielo que atrae la agresión enemiga.",
      },
      {
        name: "Summon Polar Bear",
        description: "Convoca un oso polar espectral que lucha y puede llevarte como montura.",
      },
    ],
    signatureSpell: "Ice Tomb",
    synergies: [
      "Rayo · tormenta de cristal",
      "Sangre · escarcha carmesí",
      "Profundidades · eco congelado",
    ],
    gear: ["Báculo de escarcha", "Corona de hielo", "Tomo de invierno"],
    bosses: ["Nightwarden"],
    note: "La congelación prolongada tiene un límite contra jefes y minijefes para mantener los combates justos.",
    rune: "ice",
  },
  {
    id: "rayo",
    name: "Rayo",
    category: "base",
    source: "Iron’s Spells · Escuela base",
    sourceShort: "Base",
    accent: "#9db8ff",
    accentSoft: "rgba(157, 184, 255, 0.16)",
    focus: "Bottle o’ Lightning",
    role: "Daño concentrado · Movilidad",
    tagline: "Un instante de trueno, una sentencia.",
    description:
      "Rayo es velocidad y descarga. Sus hechizos castigan grupos enteros, interrumpen canalizaciones y te permiten reposicionarte en el aire. La escuela perfecta para quien prefiere no quedarse quieto.",
    spells: [
      {
        name: "Chain Lightning",
        description: "Un relámpago que salta entre enemigos cercanos en una cadena devastadora.",
      },
      {
        name: "Thunderstorm",
        description: "Conjura una tormenta personal que castiga periódicamente a los enemigos cercanos.",
      },
      {
        name: "Ascension",
        description: "Te impulsa al cielo con una descarga en los pies y reduce tu gravedad.",
      },
      {
        name: "Lightning Lance",
        description: "Carga y lanza una lanza de relámpago que perfora al objetivo.",
      },
    ],
    signatureSpell: "Thunderstorm",
    synergies: [
      "Hielo · tormenta de cristal",
      "Fuego · detonación de área",
      "Sonido · onda de choque",
    ],
    gear: ["Báculo tormentoso", "Botas del relámpago", "Anillo de tormenta"],
    bosses: ["Nightwarden"],
    note: "Los relámpagos no generan fuego en zonas protegidas y respetan las restricciones de daño del servidor.",
    rune: "lightning",
  },
  {
    id: "sagrado",
    name: "Sagrado",
    category: "base",
    source: "Iron’s Spells · Escuela base",
    sourceShort: "Base",
    accent: "#f0d58a",
    accentSoft: "rgba(240, 213, 138, 0.15)",
    focus: "Divine Pearl",
    role: "Apoyo · Sanación · Escudos",
    tagline: "La luz que sostiene a los que aún respiran.",
    description:
      "Sagrado es la escuela de los que mantienen viva a la party. Cura, protege, purga efectos y castiga la corrupción con luz. Un buen sanador cambia el resultado de una incursión antes de que empiece.",
    spells: [
      {
        name: "Heal",
        description: "Infunde energía sagrada en ti mismo y recupera salud al instante.",
      },
      {
        name: "Healing Circle",
        description: "Coloca un círculo de luz que sana a todos los aliados dentro de su radio.",
      },
      {
        name: "Angel Wings",
        description: "Te otorga alas de energía sagrada que funcionan como un elytra temporal.",
      },
      {
        name: "Sunbeam",
        description: "Canaliza la luz del cielo en un rayo que castiga el área objetivo.",
      },
    ],
    signatureSpell: "Angel Wings",
    synergies: [
      "Sangre · mártir",
      "Sonido · himno de batalla",
      "Arcano · barrera prismática",
    ],
    gear: ["Báculo del alba", "Armadura de cruzado", "Reliquia divina"],
    bosses: ["Hastur, el Rey de Amarillo"],
    note: "Las curaciones de área no afectan a jugadores enemigos durante eventos PvP del servidor.",
    rune: "holy",
  },
  {
    id: "sangre",
    name: "Sangre",
    category: "base",
    source: "Iron’s Spells · Escuela base",
    sourceShort: "Base",
    accent: "#e0243a",
    accentSoft: "rgba(224, 36, 58, 0.15)",
    focus: "Blood Vial",
    role: "Sacrificio · Drenaje · Pactos",
    tagline: "El poder tiene un precio, y la sangre lo paga.",
    description:
      "Sangre es la escuela prohibida: drena vida, invoca muertos y convierte el dolor en poder. Es agresiva, arriesgada y profundamente egoísta. El único rojo carmesí de la interfaz pertenece a esta escuela.",
    spells: [
      {
        name: "Heartstop",
        description: "Detienes tu corazón temporalmente y te vuelves invulnerable, pero pagas parte del daño acumulado al final.",
      },
      {
        name: "Raise Dead",
        description: "Levanta esqueletos y criaturas muertas del suelo para que luchen a tu lado.",
      },
      {
        name: "Ray of Siphoning",
        description: "Canaliza un rayo necrótico que drena vida del enemigo y te cura.",
      },
      {
        name: "Sacrifice",
        description: "Detona una de tus invocaciones para liberar una explosión de sangre y daño en área.",
      },
    ],
    signatureSpell: "Heartstop",
    synergies: [
      "Nigromancia · legión carmesí",
      "Sagrado · mártir",
      "Arcano · pacto de maná",
    ],
    gear: ["Báculo hemático", "Grimorio carmesí", "Anillo de pacto"],
    bosses: ["The Faceless"],
    note: "La magia de sangre está regulada en zonas protegidas: sus áreas no dañan construcciones ni jugadores fuera de eventos.",
    rune: "blood",
  },
  {
    id: "ender",
    name: "Ender",
    category: "base",
    source: "Iron’s Spells · Escuela base",
    sourceShort: "Base",
    accent: "#a06bff",
    accentSoft: "rgba(160, 107, 255, 0.16)",
    focus: "Ender Pearl",
    role: "Movilidad · Control · Arcana",
    tagline: "El espacio es una puerta; el vacío, una elección.",
    description:
      "Ender es la escuela arcana por excelencia: portales, teletransportes, agujeros negros y espadas espectrales. Domina la geometría del combate y convierte la distancia en una sugerencia.",
    spells: [
      {
        name: "Magic Missile",
        description: "El proyectil arcano clásico: rápido, barato y siempre útil.",
      },
      {
        name: "Black Hole",
        description: "Abre una fisura en el vacío que succiona y tritura a las criaturas cercanas.",
      },
      {
        name: "Teleport",
        description: "Te desplazas instantáneamente hacia donde miras, dejando un rastro de ender.",
      },
      {
        name: "Summon Swords",
        description: "Invoca tres armas espectrales con estilos de combate distintos.",
      },
    ],
    signatureSpell: "Black Hole",
    synergies: [
      "Arcano · geometría de la Puerta",
      "Evocación · ejército espectral",
      "Vacío · susurros del Fin",
    ],
    gear: ["Báculo del fin", "Grimorio de ender", "Manto de evasión"],
    bosses: ["The Eldritch Eye"],
    note: "Los portales de Ender no pueden atravesar barreras de protección ni zonas de evento bloqueadas.",
    rune: "ender",
  },
  {
    id: "evocacion",
    name: "Evocación",
    category: "base",
    source: "Iron’s Spells · Escuela base",
    sourceShort: "Base",
    accent: "#c084fc",
    accentSoft: "rgba(192, 132, 252, 0.16)",
    focus: "Emerald",
    role: "Conjuración · Engaño · Utilidad",
    tagline: "El arte de hacer que la realidad obedezca.",
    description:
      "Evocación es la escuela más versátil: invoca aliados, levanta escudos, desvía la agresión y manipula el terreno. Su repertorio cubre ataque, defensa y utilidad sin renunciar a nada.",
    spells: [
      {
        name: "Fang Strike",
        description: "Conjura una línea de colmillos de evocador que emerge del suelo.",
      },
      {
        name: "Shield",
        description: "Crea un escudo arcano estacionario que bloquea proyectiles y criaturas.",
      },
      {
        name: "Summon Vex",
        description: "Invoca vexes que siguen, protegen y luchan por ti.",
      },
      {
        name: "Spectral Hammer",
        description: "Golpea la piedra con un martillo espectral que mina un cubo entero.",
      },
    ],
    signatureSpell: "Summon Vex",
    synergies: [
      "Arcano · constructos",
      "Ender · espectros",
      "Naturaleza · invocaciones salvajes",
    ],
    gear: ["Báculo de invocación", "Grimorio de evocador", "Máscara de ilusión"],
    bosses: ["Nightwarden"],
    note: "Las invocaciones desaparecen al entrar en zonas seguras y no pueden usarse para empujar a otros jugadores.",
    rune: "evocation",
  },
  {
    id: "naturaleza",
    name: "Naturaleza",
    category: "base",
    source: "Iron’s Spells · Escuela base",
    sourceShort: "Base",
    accent: "#7fbf5f",
    accentSoft: "rgba(127, 191, 95, 0.15)",
    focus: "Poisonous Potato",
    role: "Debuffs · Control · Desgaste",
    tagline: "Lo que crece también puede pudrir.",
    description:
      "Naturaleza no busca la explosión perfecta: busca que el enemigo llegue agotado, envenenado y atrapado. Raíces, peste, terremotos y cortezas vivas convierten el tiempo en tu arma.",
    spells: [
      {
        name: "Poison Arrow",
        description: "Carga una flecha venenosa que libera una nube tóxica al impactar.",
      },
      {
        name: "Root",
        description: "Hace brotar raíces que atrapan a una criatura y bloquean su movimiento.",
      },
      {
        name: "Earthquake",
        description: "Sacude el suelo en un área, dañando y ralentizando a los enemigos.",
      },
      {
        name: "Oakskin",
        description: "Endurece tu piel como corteza, reduciendo el daño recibido a cambio de velocidad.",
      },
    ],
    signatureSpell: "Root",
    synergies: [
      "Fuego · incendio tóxico",
      "Profundidades · sculk vivo",
      "Sangre · peste hemática",
    ],
    gear: ["Báculo de savia", "Armadura de guardián", "Tomo de la espesura"],
    bosses: ["Hastur, el Rey de Amarillo"],
    note: "Las raíces y terremotos no rompen bloques ni afectan a zonas protegidas.",
    rune: "nature",
  },
  {
    id: "eldritch",
    name: "Eldritch",
    category: "base",
    source: "Iron’s Spells · Escuela base",
    sourceShort: "Base",
    accent: "#7fe3c0",
    accentSoft: "rgba(127, 227, 192, 0.15)",
    focus: "Echo Shard",
    role: "Conocimiento prohibido · Control · Movilidad",
    tagline: "Lo que no debía ser recordado, ahora te recuerda.",
    description:
      "Eldritch no se aprende: se recuerda. Sus hechizos manipulan la percepción, el espacio y el sonido. Para dominarla hay que reunir manuscritos antiguos y aceptar que algo antiguo te esté mirando de vuelta.",
    spells: [
      {
        name: "Eldritch Blast",
        description: "Dispara rayos de energía pura y devastadora desde planos imposibles.",
      },
      {
        name: "Sonic Boom",
        description: "Una explosión sónica que atraviesa bloques y daña a todo lo que encuentra.",
      },
      {
        name: "Pocket Dimension",
        description: "Te transporta a una dimensión personal de bolsillo solo accesible para ti.",
      },
      {
        name: "Telekinesis",
        description: "Atrapa a una criatura con fuerza espectral y arrástrala hacia tu mirada.",
      },
    ],
    signatureSpell: "Sonic Boom",
    synergies: [
      "Vacío · susurros del Fin",
      "Sonido · resonancia imposible",
      "Ender · geometría imposible",
    ],
    gear: ["Manuscrito eldritch", "Báculo del eco", "Manto planar"],
    bosses: ["Hastur, el Rey de Amarillo", "The Eldritch Eye"],
    note: "La escuela se desbloquea con manuscritos eldritch y fragmentos de conocimiento antiguo; no está disponible desde el inicio.",
    rune: "eldritch",
  },
  {
    id: "nigromancia",
    name: "Nigromancia",
    category: "addon",
    source: "Monsters & Spellbooks · Addon",
    sourceShort: "Addon",
    accent: "#8fe3a8",
    accentSoft: "rgba(143, 227, 168, 0.15)",
    focus: "Necromancer Armor · Esencia de alma",
    role: "Maldiciones · Daño en el tiempo · Invocaciones",
    tagline: "La muerte no es el final; es una escuela.",
    description:
      "La escuela Necro de Monsters & Spellbooks convierte la putrefacción en estrategia. Maldice, desgasta y levanta ejércitos de huesos mientras el enemigo se consume. Sus estructuras y minijefes nigromantes guardan botines legendarios.",
    spells: [
      {
        name: "Maldición de la tumba",
        description: "El objetivo recibe más daño y se cura menos durante unos segundos.",
      },
      {
        name: "Peste necrótica",
        description: "Una nube de podredumbre que se extiende entre enemigos cercanos.",
      },
      {
        name: "Ejército de huesos",
        description: "Levanta esqueletos armados que luchan hasta desmoronarse.",
      },
      {
        name: "Cadena de almas",
        description: "Encadena a varios enemigos y reparte el daño entre ellos.",
      },
    ],
    signatureSpell: "Ejército de huesos",
    spellNote:
      "Nombres orientativos del enfoque Necro. El addon incluye más de 90 hechizos repartidos entre escuelas.",
    synergies: [
      "Sangre · legión carmesí",
      "Profundidades · ejército del Otherside",
      "Sagrado · juicio inverso",
    ],
    gear: ["Armadura Necromancer", "Báculo de hueso", "Tomo de almas"],
    bosses: ["Minijefes nigromantes", "The Faceless"],
    note: "Monsters & Spellbooks añade 12 sets de armadura, 30 armas, 10 mobs lanzadores y 2 estructuras. También registra Aero/Viento como rama secundaria del addon.",
    rune: "necro",
  },
  {
    id: "profundidades",
    name: "Profundidades",
    category: "addon",
    source: "Deeper and Darker: Spellbooks · Addon",
    sourceShort: "Addon",
    accent: "#4fd1c5",
    accentSoft: "rgba(79, 209, 197, 0.15)",
    focus: "Sculk Rod",
    role: "Invocación · Control · Exploración",
    tagline: "El Otherside susurra a quien se atreve a escuchar.",
    description:
      "Profundidades conecta la magia de Iron’s con el Otherside y el Deep Dark. Sus invocaciones arrastran criaturas del abismo, su armadura Warden Battlemage resiste la oscuridad y sus estructuras esconden ecos que no deberían existir.",
    spells: [
      {
        name: "Invocación del Otherside",
        description: "Invoca una criatura del Deep Dark para que luche a tu lado.",
      },
      {
        name: "Eco del Warden",
        description: "Un pulso sónico que revela y daña a los enemigos ocultos.",
      },
      {
        name: "Susurros del Abismo",
        description: "Aplica un debuff de miedo y ralentiza a las criaturas cercanas.",
      },
      {
        name: "Siembra de Sculk",
        description: "Extiende sculk por el suelo, ralentizando y desgastando a quien lo pisa.",
      },
    ],
    signatureSpell: "Eco del Warden",
    spellNote:
      "Invocaciones y hechizos del addon; los nombres son representativos de su enfoque.",
    synergies: [
      "Eldritch · resonancia",
      "Naturaleza · sculk vivo",
      "Nigromancia · ejército del abismo",
    ],
    gear: [
      "Warden Battlemage Armor",
      "Volume of the Deep",
      "The Whispers",
      "Abyssal Codex",
    ],
    bosses: ["Warden", "The Eldritch Eye"],
    note: "Incluye 4 invocaciones nuevas, 2 estructuras y una línea de lore propia. El báculo The Whispers y el spellbook Volume of the Deep son sus piezas más buscadas.",
    rune: "deep",
  },
  {
    id: "vacio",
    name: "Vacío",
    category: "addon",
    source: "Eldritch End: Boss Edition · Addon",
    sourceShort: "Addon",
    accent: "#c04cff",
    accentSoft: "rgba(192, 76, 255, 0.16)",
    focus: "Ojo Eldritch · Pergamino del Fin",
    role: "Corrupción · Jefes · Escuela del Fin",
    tagline: "El Fin no termina; se corrompe.",
    description:
      "Vacío es la rama más peligrosa del servidor. Eldritch End añade 9 criaturas del vacío, un jefe final masivo y pergaminos prohibidos de la escuela del Fin. La corrupción es una mecánica central: cuanto más poder tomas, más te reclama el abismo.",
    spells: [
      {
        name: "Susurro de Hastur",
        description: "Corrompe la mente del objetivo y siembra confusión entre sus aliados.",
      },
      {
        name: "Marea del Abismo",
        description: "Una ola de energía del Primordial Abyss que arrastra y corrompe.",
      },
      {
        name: "Ojo del Vacío",
        description: "Revela lo oculto, aterroriza a los enemigos y marca objetivos.",
      },
      {
        name: "Juicio del Rey de Amarillo",
        description: "Un juicio de vacío que castiga el área con daño masivo y corrupción.",
      },
    ],
    signatureSpell: "Juicio del Rey de Amarillo",
    spellNote:
      "Pergaminos prohibidos del Fin; nombres representativos del addon y su línea de jefes.",
    synergies: [
      "Eldritch · susurros",
      "Ender · vacío",
      "Sangre · pacto de corrupción",
    ],
    gear: ["Armadura de Etyr", "Pergaminos del Fin", "Reliquias del Vacío"],
    bosses: [
      "Hastur, el Rey de Amarillo",
      "The Faceless",
      "The Eldritch Eye",
    ],
    note: "Eldritch End añade los biomas Hasturian Wastes y Primordial Abyss, corrupción, 9 criaturas del vacío y un jefe final masivo. La armadura de Etyr ofrece resistencia a la corrupción.",
    rune: "void",
  },
  {
    id: "arcano",
    name: "Arcano",
    category: "server",
    source: "Escuela del servidor · La Puerta",
    sourceShort: "Servidor",
    accent: "#b388ff",
    accentSoft: "rgba(179, 136, 255, 0.16)",
    focus: "Núcleo de Maná",
    role: "Barreras · Maná · Manipulación",
    tagline: "La geometría pura de la Puerta.",
    description:
      "Arcano es la disciplina de quienes han mirado la Puerta y han entendido su lenguaje. No invoca criaturas ni drena sangre: manipula maná, levanta barreras, anula hechizos y reescribe las reglas del combate durante unos segundos.",
    spells: [
      {
        name: "Barrera Prismática",
        description: "Un domo de energía que absorbe proyectiles y acelera la regeneración de maná aliada.",
      },
      {
        name: "Sello de Anulación",
        description: "Interrumpe canalizaciones y elimina efectos positivos en un área.",
      },
      {
        name: "Sifón de Maná",
        description: "Canaliza la energía enemiga y la convierte en maná para ti.",
      },
      {
        name: "Reescritura",
        description: "Restablece los cooldowns de tus últimos hechizos a cambio de una gran cantidad de maná.",
      },
    ],
    signatureSpell: "Reescritura",
    synergies: [
      "Ender · portales",
      "Evocación · constructos",
      "Sonido · resonancia",
    ],
    gear: ["Báculo del Archimago", "Grimorio de la Puerta", "Anillo de maná"],
    bosses: ["Nightwarden"],
    note: "Escuela de prestigio del servidor. Se desbloquea completando la cadena de misiones de la Puerta y está pensada para jugadores que dominan la gestión de maná.",
    rune: "arcane",
  },
  {
    id: "sonido",
    name: "Sonido",
    category: "server",
    source: "Escuela del servidor · Los Ecos de la Puerta",
    sourceShort: "Servidor",
    accent: "#7ee8fa",
    accentSoft: "rgba(126, 232, 250, 0.15)",
    focus: "Diapasón de Resonancia",
    role: "Apoyo · Control · Minijuego",
    tagline: "La música es magia; la Puerta es el escenario.",
    description:
      "La escuela del Sonido nació en la Puerta y no existe en ningún otro servidor. Sus hechizos usan ondas, ritmo y resonancia para buffear aliados, silenciar enemigos y convertir una pelea en una actuación. Su hechizo estrella abre un minijuego rítmico en pleno combate.",
    spells: [
      {
        name: "Obertura",
        description: "Un acorde de apertura que otorga prisa y poder mágico a los aliados cercanos.",
      },
      {
        name: "Nota Discordante",
        description: "Un proyectil sónico que perfora enemigos y aplica Desafinado, reduciendo su resistencia.",
      },
      {
        name: "Onda de Choque",
        description: "Un cono de fuerza sónica que empuja e interrumpe canalizaciones.",
      },
      {
        name: "Coro Espectral",
        description: "Invoca cantores espectrales que siguen a los aliados y los curan con el tiempo.",
      },
      {
        name: "Silencio Absoluto",
        description: "Un área de silencio que impide lanzar hechizos durante unos segundos.",
      },
      {
        name: "Vibrato",
        description: "Un dash sónico con estelas de luz que otorga velocidad y evita el daño de caída.",
      },
      {
        name: "Contrapunto",
        description: "Durante unos segundos, parte del daño recibido se devuelve como daño sónico.",
      },
      {
        name: "Sinfonía de la Ruina",
        description: "Canaliza un crescendo de área que crece en daño mientras permaneces inmóvil.",
      },
      {
        name: "Requiem",
        description: "El ultimate de la escuela: una onda masiva que aturde y deja un campo de resonancia.",
      },
    ],
    signatureSpell: "Crescendo de la Puerta",
    featuredSpell: {
      name: "Crescendo de la Puerta",
      description:
        "El hechizo estrella de la escuela. Abre un minijuego de ritmo de cuatro carriles: las notas caen al compás y cada acierto aumenta tu Armonía. Tu personaje baila mientras dura el hechizo y la puntuación final se convierte en buffs para ti y tu party.",
      bullets: [
        "0–40% · Fervor: prisa y velocidad de movimiento.",
        "41–70% · Fortissimo: poder mágico aumentado.",
        "71–90% · Legato: reducción de cooldowns.",
        "91–100% · Coda: escudo de resonancia y todos los buffs anteriores.",
      ],
    },
    synergies: [
      "Sagrado · himno de batalla",
      "Rayo · trueno",
      "Arcano · resonancia prismática",
    ],
    gear: [
      "Lira de la Puerta",
      "Diapasón del Eco",
      "Manto del Bardo",
      "Partitura prohibida",
    ],
    bosses: ["Nightwarden"],
    note: "Incluye el minijuego Crescendo, animación de baile, buffs por puntuación y soporte para packs de sonido personalizados. El servidor valida los archivos antes de cargarlos.",
    rune: "sound",
  },
];

export const SCHOOL_CATEGORIES = [
  { id: "all", label: "Todas" },
  { id: "base", label: "Base" },
  { id: "addon", label: "Addons" },
  { id: "server", label: "Servidor" },
] as const;

export type SchoolFilter = (typeof SCHOOL_CATEGORIES)[number]["id"];
