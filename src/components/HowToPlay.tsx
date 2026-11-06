import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CONFIG } from "../data/config";
import { STEPS } from "../data/content";
import { ConfigLink } from "./ui/ConfigLink";
import { IpWidget } from "./IpWidget";
import { Reveal } from "./ui/Reveal";
import { RuneIcon } from "./ui/RuneIcon";
import { SectionHeader } from "./ui/SectionHeader";

function LauncherChip({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      className="launcher-chip"
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      <span aria-hidden="true">↗</span>
      {children}
    </a>
  );
}

export function HowToPlay() {
  const reduce = useReducedMotion();

  return (
    <section
      id="como-jugar"
      className="section how-section"
      aria-labelledby="how-title"
    >
      <div className="container">
        <SectionHeader
          id="how-title"
          eyebrow="Capítulo IV · El Ritual de Entrada"
          title={
            <>
              Tres pasos para
              <br />
              cruzar la Puerta
            </>
          }
          subtitle="No necesitas ser un experto en mods. Solo necesitas el launcher correcto, el perfil del servidor y ganas de desaparecer en una mazmorra durante seis horas."
        />

        <div className="steps">
          <motion.div
            className="steps__line steps__line--h"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
            aria-hidden="true"
          />
          <motion.div
            className="steps__line steps__line--v"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
            aria-hidden="true"
          />

          {STEPS.map((step, index) => (
            <Reveal key={step.id} delay={index * 0.08} className="step-card">
              <article className="fd-panel step-card__panel">
                <div className="step-card__number" aria-hidden="true">
                  <span>{step.numeral}</span>
                </div>
                <div className="step-card__icon" aria-hidden="true">
                  <RuneIcon variant={step.rune} size={42} />
                </div>
                <span className="fd-eyebrow">Paso {step.numeral}</span>
                <h3 className="fd-title step-card__title">{step.title}</h3>
                <p className="step-card__description">{step.description}</p>
                <span className="step-card__note">{step.note}</span>

                <div className="step-card__actions">
                  {step.id === "launcher" ? (
                    <>
                      <LauncherChip href={CONFIG.curseforgeUrl}>
                        CurseForge
                      </LauncherChip>
                      <LauncherChip href={CONFIG.modrinthUrl}>
                        Modrinth
                      </LauncherChip>
                      <LauncherChip href={CONFIG.prismUrl}>
                        Prism Launcher
                      </LauncherChip>
                    </>
                  ) : null}

                  {step.id === "grimorio" ? (
                    <>
                      <ConfigLink
                        className="fd-btn fd-btn--fire fd-btn--sm"
                        href={CONFIG.profileUrl}
                        placeholder="El perfil del servidor estará disponible muy pronto."
                      >
                        Descargar perfil
                      </ConfigLink>
                      <ConfigLink
                        className="fd-btn fd-btn--ghost fd-btn--sm"
                        href={CONFIG.modpackUrl}
                        placeholder="El modpack base estará disponible muy pronto."
                      >
                        Ver modpack base
                      </ConfigLink>
                    </>
                  ) : null}

                  {step.id === "puerta" ? (
                    <>
                      <IpWidget compact />
                      <ConfigLink
                        className="fd-btn fd-btn--ghost fd-btn--sm"
                        href={CONFIG.discordUrl}
                        placeholder="El enlace de Discord estará disponible muy pronto."
                      >
                        Pedir ayuda
                      </ConfigLink>
                    </>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="support-note fd-panel" delay={0.1}>
          <span className="support-note__rune" aria-hidden="true">
            <RuneIcon variant="holy" size={54} />
          </span>
          <div>
            <span className="fd-eyebrow">¿Atascado en el umbral?</span>
            <h3 className="fd-title support-note__title">
              El gremio te ayuda a entrar
            </h3>
            <p>
              Si el launcher se resiste, faltan addons o no sabes qué escuela
              elegir, pasa por el Discord. Hay soporte, guías y gente que ya
              cometió esos errores antes que tú.
            </p>
          </div>
          <ConfigLink
            className="fd-btn fd-btn--ghost fd-btn--sm"
            href={CONFIG.supportUrl}
            placeholder="El canal de soporte estará disponible muy pronto."
          >
            Ir a soporte
          </ConfigLink>
        </Reveal>
      </div>
    </section>
  );
}
