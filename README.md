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

Para que la whitelist funcione, define antes las variables de Supabase:

```bash
cp .env.example .env.local
# edita .env.local con la URL y la anon public key de tu proyecto
```

La anon key es pública y se incrusta en el bundle. **Nunca** uses la `service_role` key en el cliente.

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

- Las puertas permanecen cerradas hasta que las fuentes, la página y el audio están listos (máximo 8 s), con una runa de carga.
- Al abrirse, revelan la página progresivamente con un destello de portal; no queda un fondo negro residual.
- Si el navegador permite el audio, las puertas se abren solas con la música sonando.
- Si lo bloquea, las puertas esperan con la runa central pulsando. El primer clic, toque o tecla abre las puertas y arranca la música con sonido, sin modal ni pregunta. Si pasan 10 s sin interacción, se abren en silencio para no bloquear la entrada.
- El tema se reproduce en bucle infinito con crossfade de 2 segundos.
- El control flotante inferior izquierdo permite silenciar/activar y ajustar el volumen.
- Se recuerdan en `localStorage` el estado de música y el volumen.
- La configuración de volumen y crossfade está en `MUSIC_CONFIG` dentro de `src/data/config.ts`.
- El MP3 pesa 5,4 MB. Si quieres optimizar la carga, se puede recomprimir a 128–192 kbps.

## Whitelist y panel del staff

La landing incluye un formulario público y un panel privado separado:

- Formulario público: `#whitelist` en la landing. Pide **usuario de Minecraft** y **nombre real**, más la aceptación de las reglas. Tiene honeypot antispam y validación en cliente.
- Panel privado: `admin.html` (en producción, `https://soyrauw.github.io/the-mine-gates/admin.html`). Login con Supabase Auth, listado de solicitudes, filtros, búsqueda, aprobar/rechazar y copia de `whitelist add <usuario>`.
- La aprobación es **manual**: el panel cambia el estado, pero la whitelist del servidor se sigue aplicando con comandos en la consola. No hay RCON ni automatismos.
- El nombre real solo es legible por usuarios autenticados. Un visitante anónimo únicamente puede insertar solicitudes con estado `pending`; no puede leer nada.

### Puesta en marcha en Supabase

1. Abre el proyecto en [Supabase](https://supabase.com/dashboard).
2. Ve a **SQL Editor**, pega el contenido de `supabase/migrations/001_whitelist.sql` y ejecútalo. Crea la tabla `whitelist_applications`, el índice de duplicados pendientes, las políticas RLS y los permisos.
3. Ve a **Authentication → Sign In / Providers → Email** y desactiva **Allow new users to sign up**. El panel no tiene registro público.
4. Ve a **Authentication → Users → Add user** y crea la cuenta del staff con email y contraseña. Marca el email como confirmado si hace falta.
5. Añade los secretos del repositorio para el despliegue:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

Con `gh`:

```bash
gh secret set VITE_SUPABASE_URL --body "https://tu-proyecto.supabase.co"
gh secret set VITE_SUPABASE_ANON_KEY --body "tu-anon-public-key"
```

### Comportamiento de seguridad

- `anon` solo puede hacer `insert`; las políticas exigen `status = 'pending'`, `reviewed_at` y `reviewed_by` nulos.
- `authenticated` puede leer y actualizar. Por eso es importante desactivar el registro público y crear solo cuentas de staff.
- El índice único `lower(minecraft_username)` sobre solicitudes pendientes evita duplicados mientras la anterior sigue sin revisar.
- La tabla no se expone en la landing y el panel lleva `noindex, nofollow`.

### Flujo de revisión

1. El jugador envía el formulario y ve “Solicitud sellada”.
2. El staff entra en `admin.html`, revisa la solicitud y pulsa **Aprobar** o **Rechazar**.
3. Si se aprueba, pulsa **Copiar comando** y ejecuta en la consola del servidor:

```text
whitelist add <usuario>
```

No se envía ningún aviso automático porque el formulario no recoge Discord ni email.

## Estructura

```text
admin.html                Entrada del panel del staff
src/
  App.tsx
  main.tsx
  admin/
    main.tsx              Bootstrap del panel
    AdminApp.tsx          Login, dashboard y revisión
    admin.css             Estilos del panel
  components/
    Sky.tsx               Cielo WebGL
    Navbar.tsx            Navegación fija + menú móvil
    Hero.tsx              Hero + widget de IP
    HeroGate.tsx          Puerta SVG original
    Lore.tsx              Crónica y manuscrito
    Magic/                Grimorio, escuelas, addons y bestiario
    Features.tsx          Grid de características
    HowToPlay.tsx         Pasos de instalación
    Rules.tsx             Códice y acordeón
    Whitelist.tsx         Formulario público de solicitud
    Footer.tsx            CTA final, enlaces y descargo
    Music/                Intro, reproductor, crossfade y controles
  assets/audio/           Tema musical del servidor
  data/                   Contenido tipado (whitelist.ts incluido)
  hooks/                  Scrollspy y copiar IP
  lib/                    Cielo WebGL, portapapeles y cliente Supabase
  styles/
    fantasy.css           Base de la skill
    site.css              Layout y animaciones generales
    magic.css             Grimorio, escuelas y bestiario
    music.css             Intro y control de música
    whitelist.css         Formulario público de whitelist
supabase/
  migrations/
    001_whitelist.sql     Tabla, índices, RLS y permisos
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
