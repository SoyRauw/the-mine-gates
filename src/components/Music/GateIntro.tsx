import { useEffect, useRef, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RuneIcon } from "../ui/RuneIcon";
import { useMusic } from "./music-context";

export function GateIntro() {
  const { hasEntered, preferredMusic, enter, isReady } = useMusic();
  const reduce = useReducedMotion();
  const primaryRef = useRef<HTMLButtonElement>(null);
  const secondaryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hasEntered) return;

    document.body.classList.add("intro-open");
    const inertTargets = [
      document.querySelector<HTMLElement>(".navbar"),
      document.getElementById("contenido"),
      document.querySelector<HTMLElement>(".footer"),
      document.querySelector<HTMLElement>(".skip-link"),
    ].filter((element): element is HTMLElement => Boolean(element));

    inertTargets.forEach((element) => {
      element.inert = true;
    });
    primaryRef.current?.focus();

    return () => {
      document.body.classList.remove("intro-open");
      inertTargets.forEach((element) => {
        element.inert = false;
      });
    };
  }, [hasEntered]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      enter(false);
      return;
    }

    if (event.key !== "Tab") return;
    const first = primaryRef.current;
    const last = secondaryRef.current;
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {!hasEntered ? (
        <motion.div
          className="gate-intro"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-intro-title"
          aria-describedby="gate-intro-desc"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          onKeyDown={handleKeyDown}
        >
          <div className="gate-intro__portal" aria-hidden="true" />
          <div className="gate-intro__grain" aria-hidden="true" />

          <motion.div
            className="gate-intro__inner"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="gate-intro__arch" aria-hidden="true">
              <span className="gate-intro__sigil">
                <RuneIcon variant="eldritch" size={112} />
              </span>
            </div>

            <span className="fd-eyebrow">La Puerta está abierta</span>
            <h2 id="gate-intro-title" className="fd-title gate-intro__title">
              THE MINE GATE’S
            </h2>
            <div className="fd-divider gate-intro__divider" aria-hidden="true">
              <i />
            </div>
            <p id="gate-intro-desc" className="gate-intro__description">
              Cruza el umbral hacia un mundo de grimorios ancestrales, magia
              prohibida y mazmorras que respiran en la oscuridad.
            </p>

            <div className="gate-intro__actions">
              <button
                ref={primaryRef}
                type="button"
                className="fd-btn fd-btn--fire gate-intro__primary"
                onClick={() => enter(preferredMusic)}
              >
                {preferredMusic ? "Entrar con música" : "Entrar sin música"}
              </button>
              <button
                ref={secondaryRef}
                type="button"
                className="gate-intro__secondary"
                onClick={() => enter(!preferredMusic)}
              >
                {preferredMusic
                  ? "Entrar sin música"
                  : "Activar música y entrar"}
              </button>
            </div>

            <p className="gate-intro__note">
              {preferredMusic && !isReady
                ? "Preparando el eco de la Puerta…"
                : preferredMusic
                  ? "Se recomienda usar auriculares. La música se reproduce en bucle."
                  : "Puedes activar la música en cualquier momento desde el control inferior."}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
