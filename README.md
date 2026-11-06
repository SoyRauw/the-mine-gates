# THE MINE GATE’S

Landing page de fantasía oscura para el servidor de Minecraft **THE MINE GATE’S**.
Construida con React + Vite + TypeScript, Framer Motion (`motion`) y el sistema visual de la skill `dark-fantasy-ui`.

**Demo:** https://soyrauw.github.io/the-mine-gates/
**Repositorio:** https://github.com/SoyRauw/the-mine-gates

## Stack

- React 19 + Vite 8
- TypeScript
- Framer Motion (`motion/react`)
- CSS plano con los tokens y componentes de `src/styles/fantasy.css`
- Tipografías self-hosted con `@fontsource` (Cinzel + EB Garamond)
- Cielo WebGL propio, basado en `sky.js` de la skill
- Música de fondo con crossfade infinito y controles persistentes
- Sin imágenes externas: toda la ilustración es SVG/CSS original

## Arrancar

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Compilar

```bash
npm run build
npm run preview
```

El resultado queda en `dist/`. El proyecto usa `base: './'`, así que puedes subir la carpeta a cualquier hosting estático.

## Configuración rápida

Casi todo lo editable está en:

- `src/data/config.ts` — IP, versión, Discord, perfil, tienda, soporte y enlaces de launchers.
- `src/data/schools.ts` — las 14 escuelas, hechizos, sinergias, equipo y notas.
- `src/data/bosses.ts` — bestiario y barras de vida.
- `src/data/content.ts` — navegación, features, pasos, reglas y addons.

### Placeholders pendientes

Estos valores están vacíos a propósito y muestran un aviso al pulsarlos:

```ts
discordUrl: "",
profileUrl: "",
storeUrl: "",
supportUrl: "",
```

La IP actual es un placeholder:

```ts
serverIp: "play.theminegates.com",
```

Cámbiala por la IP real cuando la tengas. El indicador “Servidor Online” es visual/estático, no consulta ninguna API.

## Música

La música está en `src/assets/audio/dark-fantasy-theme.mp3` (copia del MP3 original; el archivo de la raíz se conserva solo como respaldo local y está ignorado por git).

- Al cargar, las puertas de la Puerta se abren automáticamente.
- La música intenta reproducirse sola. Si el navegador la bloquea, empieza silenciada y se activa con el primer clic, toque o tecla, sin ningún modal.
- El tema se reproduce en bucle infinito con crossfade de 2 segundos.
- El control flotante inferior izquierdo permite silenciar/activar y ajustar el volumen.
- Se recuerdan en `localStorage` el estado de música y el volumen.
- La configuración de volumen y crossfade está en `MUSIC_CONFIG` dentro de `src/data/config.ts`.
- El MP3 pesa 5,4 MB. Si quieres optimizar la carga, se puede recomprimir a 128–192 kbps.

## Estructura

```text
src/
  App.tsx
  main.tsx
  components/
    Sky.tsx              Cielo WebGL
    Navbar.tsx           Navegación fija + menú móvil
    Hero.tsx             Hero + widget de IP
    HeroGate.tsx         Puerta SVG original
    Lore.tsx             Crónica y manuscrito
    Magic/               Grimorio, escuelas, addons y bestiario
    Features.tsx         Grid de características
    HowToPlay.tsx        Pasos de instalación
    Rules.tsx            Códice y acordeón
    Footer.tsx           CTA final, enlaces y descargo
    Music/               Intro, reproductor, crossfade y controles
  assets/audio/          Tema musical del servidor
  data/                  Contenido tipado
  hooks/                 Scrollspy y copiar IP
  lib/                   Cielo WebGL y portapapeles
  styles/
    fantasy.css          Base de la skill
    site.css             Layout y animaciones generales
    magic.css            Grimorio, escuelas y bestiario
    music.css            Intro y control de música
```

## Accesibilidad y rendimiento

- HTML semántico, `aria` en tabs, acordeón, diálogo móvil, intro y estados de copiado.
- Las puertas bloquean el fondo con `inert` mientras están cerradas.
- Foco visible, contraste alto y objetivos táctiles de 44px.
- `prefers-reduced-motion` desactiva animaciones no esenciales.
- El cielo se pausa al ocultar la pestaña y baja resolución en móvil.
- Sin librerías de scroll pesadas ni imágenes remotas.

## Créditos

- Sistema visual base: skill `dark-fantasy-ui`.
- Cielo WebGL: adaptación del `sky.js` de la skill.
- Fuentes: Cinzel y EB Garamond vía Fontsource.
- Arte, runas, puerta, textos y composición: originales para este proyecto.
- Música: archivo proporcionado por el servidor. Verifica los derechos de uso antes de publicar el sitio.

## Descargo

Minecraft es una marca de Mojang Studios. Este proyecto no está afiliado oficialmente con Mojang o Microsoft.
