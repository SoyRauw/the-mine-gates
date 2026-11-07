import { useEffect, useState } from "react";
import { CONFIG } from "../data/config";
import { ConfigLink } from "./ui/ConfigLink";
import { IpWidget } from "./IpWidget";
import { Reveal } from "./ui/Reveal";
import { RuneIcon } from "./ui/RuneIcon";

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setShowBackToTop(window.scrollY > window.innerHeight * 0.6);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <Reveal className="fd-panel fd-panel--arch final-cta">
          <div className="final-cta__glow" aria-hidden="true" />
          <div className="final-cta__inner">
            <span className="fd-eyebrow">La Puerta permanece abierta</span>
            <h2 className="fd-title final-cta__title">LA PUERTA TE ESPERA</h2>
            <div className="fd-divider final-cta__divider" aria-hidden="true">
              <i />
            </div>
            <p>
              Copia la IP, entra con Java {CONFIG.version} y escribe tu propia
              crónica. La primera escuela siempre se elige con miedo; la última,
              con hambre.
            </p>
            <div className="final-cta__actions">
              <IpWidget compact />
              <ConfigLink
                className="fd-btn fd-btn--fire"
                href={CONFIG.discordUrl}
                placeholder="El enlace de Discord estará disponible muy pronto."
              >
                Unirse al Discord
              </ConfigLink>
              <a className="fd-btn fd-btn--ghost" href="#como-jugar">
                Cómo jugar
              </a>
            </div>
          </div>
        </Reveal>

        <div className="footer__grid">
          <div className="footer__brand">
            <a className="footer__brand-link" href="#inicio">
              <span className="footer__brand-rune" aria-hidden="true">
                <RuneIcon variant="arcane" size={54} />
              </span>
              <span>
                <span className="footer__wordmark">THE MINE GATE’S</span>
                <span className="footer__tagline">
                  Fantasía oscura · Magia prohibida · Better MC
                </span>
              </span>
            </a>
            <p>
              Un servidor cooperativo para quienes creen que toda mazmorra
              mejora con un grimorio y un grupo que no huye a la primera.
            </p>
            <div className="footer__online">
              <span className="status-dot" aria-hidden="true" />
              {CONFIG.status} · {CONFIG.version}
            </div>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">El Gremio</h3>
            <ul>
              <li>
                <a href="#whitelist">Solicitar whitelist</a>
              </li>
              <li>
                <ConfigLink
                  href={CONFIG.discordUrl}
                  placeholder="El enlace de Discord estará disponible muy pronto."
                >
                  Discord
                </ConfigLink>
              </li>
              <li>
                <a href="#reglas">Reglas del servidor</a>
              </li>
              <li>
                <ConfigLink
                  href={CONFIG.supportUrl}
                  placeholder="El canal de soporte estará disponible muy pronto."
                >
                  Soporte
                </ConfigLink>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">El Portal</h3>
            <ul>
              <li>
                <a href="#como-jugar">Cómo jugar</a>
              </li>
              <li>
                <ConfigLink
                  href={CONFIG.profileUrl}
                  placeholder="El perfil del servidor estará disponible muy pronto."
                >
                  Descargar perfil
                </ConfigLink>
              </li>
              <li>
                <a
                  href={CONFIG.modpackUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Modpack base
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">La Letra Pequeña</h3>
            <ul>
              <li>
                <ConfigLink
                  href={CONFIG.storeUrl}
                  placeholder="La tienda estará disponible próximamente."
                >
                  Tienda y donaciones
                </ConfigLink>
              </li>
              <li>
                <a href="#reglas">Aviso de convivencia</a>
              </li>
              <li>
                <span className="footer__muted">No afiliado oficialmente</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © 2026 THE MINE GATE’S. Hecho por la comunidad, para la comunidad.
          </p>
          <p>
            Minecraft es una marca de Mojang Studios. No afiliado oficialmente
            con Mojang o Microsoft.
          </p>
          <p>
            <a className="footer__staff-link" href="./admin.html">
              Acceso del staff
            </a>
          </p>
        </div>
      </div>

      <a
        className={`back-to-top${showBackToTop ? " is-visible" : ""}`}
        href="#inicio"
        aria-label="Volver al inicio"
      >
        <span aria-hidden="true">✦</span>
      </a>
    </footer>
  );
}
