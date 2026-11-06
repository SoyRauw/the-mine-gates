import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BOSSES } from "../../data/bosses";
import { Reveal } from "../ui/Reveal";
import { RuneIcon } from "../ui/RuneIcon";

export function Bestiary() {
  const reduce = useReducedMotion();

  return (
    <div className="bestiary">
      <div className="bestiary__heading">
        <span className="fd-eyebrow">Sala de Jefes · Bestiario</span>
        <h3 className="fd-title bestiary__title">
          Los titanes que guardan la Puerta
        </h3>
        <p>
          Cuatro nombres que se susurran en las tabernas. Ninguno cae en
          solitario.
        </p>
      </div>

      <div className="bestiary__grid">
        {BOSSES.map((boss, index) => (
          <Reveal key={boss.id} delay={index * 0.07}>
            <article
              className="fd-panel boss-card"
              style={
                {
                  "--boss-accent": boss.accent,
                } as CSSProperties
              }
            >
              <div className="boss-card__top">
                <span className="boss-card__source">{boss.source}</span>
                <span className="boss-card__threat">{boss.threat}</span>
              </div>
              <div className="boss-card__seal" aria-hidden="true">
                <RuneIcon variant={boss.rune} size={72} />
              </div>
              <h4 className="fd-title boss-card__name">{boss.name}</h4>
              <p className="boss-card__mechanic">{boss.mechanic}</p>
              <p className="boss-card__loot">
                <span aria-hidden="true">◆</span> {boss.loot}
              </p>
              <div className="boss-card__bar-wrap">
                <div className="boss-card__bar-label">
                  <span>Vida</span>
                  <span>{boss.health}%</span>
                </div>
                <div
                  className="boss-card__bar"
                  role="progressbar"
                  aria-label={`Vida de ${boss.name}`}
                  aria-valuenow={boss.health}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <motion.span
                    initial={
                      reduce ? { scaleX: boss.health / 100 } : { scaleX: 0 }
                    }
                    whileInView={{ scaleX: boss.health / 100 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            duration: 1.15,
                            delay: 0.15 + index * 0.08,
                            ease: [0.2, 0.7, 0.2, 1],
                          }
                    }
                  />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
