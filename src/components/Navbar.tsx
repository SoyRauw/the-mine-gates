import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { CONFIG } from "../data/config";
import { NAV_LINKS } from "../data/content";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { ConfigLink } from "./ui/ConfigLink";
import { IpWidget } from "./IpWidget";
import { RuneIcon } from "./ui/RuneIcon";

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

function DiscordMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19.3 5.3A17.4 17.4 0 0 0 15 4l-.5 1a16 16 0 0 0-5 0L9 4a17.4 17.4 0 0 0-4.3 1.3C2.1 9.2 1.4 13 1.7 16.7A17.6 17.6 0 0 0 7 19.4l1.1-1.8a11 11 0 0 1-1.7-.8l.4-.3a12.5 12.5 0 0 0 10.4 0l.4.3a11 11 0 0 1-1.7.8l1.1 1.8a17.6 17.6 0 0 0 5.3-2.7c.4-4.3-.7-8.1-3-11.4ZM8.6 14.6c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.8 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activeId = useScrollSpy(SECTION_IDS);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const openMenu = () => {
    setMenuOpen(true);
    dialogRef.current?.showModal();
  };

  const closeMenu = () => {
    dialogRef.current?.close();
    setMenuOpen(false);
  };

  return (
    <>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <header className={`navbar${scrolled ? " is-scrolled" : ""}`}>
        <div className="navbar__inner">
          <a
            className="navbar__brand"
            href="#inicio"
            aria-label="THE MINE GATE’S · Inicio"
          >
            <span className="navbar__brand-rune" aria-hidden="true">
              <RuneIcon variant="arcane" size={42} />
            </span>
            <span className="navbar__brand-text">
              <span className="navbar__wordmark">THE MINE GATE’S</span>
              <span className="navbar__tagline">Fantasía oscura · Magia prohibida</span>
            </span>
          </a>

          <nav className="navbar__nav" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`navbar__link${activeId === link.id ? " is-active" : ""}`}
                aria-current={activeId === link.id ? "location" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="navbar__actions">
            <ConfigLink
              className="fd-btn fd-btn--discord navbar__discord"
              href={CONFIG.discordUrl}
              placeholder="El enlace de Discord estará disponible muy pronto."
              ariaLabel="Unirse al Discord del servidor"
            >
              <DiscordMark />
              <span>Discord</span>
            </ConfigLink>
            <button
              type="button"
              className="navbar__burger"
              aria-label="Abrir menú de navegación"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={openMenu}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        className="mobile-menu"
        aria-label="Menú principal"
        onClose={() => setMenuOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="mobile-menu__inner">
          <div className="mobile-menu__top">
            <span className="fd-eyebrow">La Puerta está abierta</span>
            <button
              type="button"
              className="mobile-menu__close"
              onClick={closeMenu}
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>

          <nav className="mobile-menu__nav" aria-label="Navegación móvil">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`mobile-menu__link${activeId === link.id ? " is-active" : ""}`}
                style={{ animationDelay: 0.08 + index * 0.05 + "s" }}
                onClick={closeMenu}
              >
                <span>{link.label}</span>
                <span aria-hidden="true">✦</span>
              </a>
            ))}
          </nav>

          <div className="mobile-menu__footer">
            <IpWidget compact />
            <ConfigLink
              className="fd-btn fd-btn--fire"
              href={CONFIG.discordUrl}
              placeholder="El enlace de Discord estará disponible muy pronto."
              onNavigate={closeMenu}
            >
              <DiscordMark />
              Unirse al Discord
            </ConfigLink>
          </div>
        </div>
      </dialog>
    </>
  );
}
