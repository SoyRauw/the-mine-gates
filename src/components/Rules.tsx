import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CONFIG } from "../data/config";
import { RULES } from "../data/content";
import { ConfigLink } from "./ui/ConfigLink";
import { Reveal } from "./ui/Reveal";
import { RuneIcon } from "./ui/RuneIcon";
import { SectionHeader } from "./ui/SectionHeader";

export function Rules() {
  const [openIndex, setOpenIndex] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section
      id="reglas"
      className="section rules-section"
      aria-labelledby="rules-title"
    >
      <div className="container">
        <SectionHeader
          id="rules-title"
          eyebrow="Capítulo V · El Códice"
          title={
            <>
              Reglas para
              <br />
              sobrevivir juntos
            </>
          }
          subtitle="La Puerta no perdona, pero la comunidad sí. Tres reglas sostienen el servidor; el resto es sentido común y magia responsable."
        />

        <div className="rules-layout">
          <Reveal className="fd-panel rules-intro" delay={0.05}>
            <div className="rules-intro__seal" aria-hidden="true">
              <RuneIcon variant="holy" size={110} />
            </div>
            <span className="fd-eyebrow">Códice de la Puerta</span>
            <h3 className="fd-title rules-intro__title">
              El poder no exime de las consecuencias
            </h3>
            <p>
              Al entrar al servidor aceptas este código. No está aquí para
              limitar tu magia, sino para que la gente que construye, explora y
              muere a tu lado siga queriendo volver mañana.
            </p>
            <blockquote>
              “Un archimago sin respeto solo es un grifer con un grimorio.”
            </blockquote>
            <div className="rules-intro__meta">
              <span>3 reglas</span>
              <span aria-hidden="true">◆</span>
              <span>Sentido común</span>
            </div>
          </Reveal>

          <div className="rules-list">
            {RULES.map((rule, index) => {
              const open = openIndex === index;
              return (
                <Reveal key={rule.id} delay={index * 0.06}>
                  <article className={`rule${open ? " is-open" : ""}`}>
                    <h3 className="rule__heading">
                      <button
                        type="button"
                        id={`rule-trigger-${rule.id}`}
                        className="rule__trigger"
                        aria-expanded={open}
                        aria-controls={`rule-panel-${rule.id}`}
                        onClick={() => setOpenIndex(open ? -1 : index)}
                      >
                        <span className="rule__numeral" aria-hidden="true">
                          {rule.numeral}
                        </span>
                        <span className="rule__text">
                          <span className="rule__title">{rule.title}</span>
                          <span className="rule__summary">{rule.summary}</span>
                        </span>
                        <span className="rule__toggle" aria-hidden="true">
                          <span />
                          <span />
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          id={`rule-panel-${rule.id}`}
                          className="rule__panel"
                          role="region"
                          aria-labelledby={`rule-trigger-${rule.id}`}
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={
                            reduce ? undefined : { height: 0, opacity: 0 }
                          }
                          transition={{
                            duration: 0.36,
                            ease: [0.2, 0.7, 0.2, 1],
                          }}
                        >
                          <div className="rule__body">
                            <p>{rule.body}</p>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </article>
                </Reveal>
              );
            })}

            <Reveal className="rules-note" delay={0.12}>
              <span className="rules-note__mark" aria-hidden="true">
                ✦
              </span>
              <p>
                El staff puede aplicar sanciones según la gravedad. Si dudas si
                un hechizo o una acción puede afectar a otro jugador, pregunta
                antes de lanzarlo.
              </p>
              <ConfigLink
                className="rules-note__link"
                href={CONFIG.discordUrl}
                placeholder="El enlace de Discord estará disponible muy pronto."
              >
                Leer el código completo en Discord ↗
              </ConfigLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
