import type { CSSProperties } from "react";
import { FEATURES } from "../data/content";
import { CONFIG } from "../data/config";
import { Reveal } from "./ui/Reveal";
import { RuneIcon } from "./ui/RuneIcon";
import { SectionHeader } from "./ui/SectionHeader";

const STATS = [
  { value: CONFIG.version, label: "Java Edition" },
  { value: "14", label: "Escuelas de magia" },
  { value: "90+", label: "Hechizos de addon" },
  { value: "24/7", label: "Comunidad activa" },
];

export function Features() {
  return (
    <section
      id="caracteristicas"
      className="section features-section"
      aria-labelledby="features-title"
    >
      <div className="container">
        <SectionHeader
          id="features-title"
          eyebrow="Capítulo III · El Mundo"
          title={
            <>
              Un mundo que
              <br />
              respira oscuridad
            </>
          }
          subtitle="Better MC como base, magia prohibida como ley y una comunidad que construye refugios mientras los jefes afilan sus garras."
        />

        <div className="features-grid">
          {FEATURES.map((feature, index) => (
            <Reveal
              key={feature.id}
              delay={index * 0.06}
              className={`feature-card feature-card--${feature.id}`}
            >
              <article
                className="fd-panel feature-card__panel"
                style={
                  {
                    "--feature-accent": feature.accent,
                  } as CSSProperties
                }
              >
                <div className="feature-card__top">
                  <span className="feature-card__tag">{feature.tag}</span>
                  <span className="feature-card__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="feature-card__icon" aria-hidden="true">
                  <RuneIcon
                    variant={feature.rune}
                    size={index === 0 ? 82 : 64}
                  />
                </div>
                <h3 className="fd-title feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">
                  {feature.description}
                </p>
                <span className="feature-card__line" aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="server-stats" delay={0.1}>
          {STATS.map((stat) => (
            <div className="server-stat" key={stat.label}>
              <span className="server-stat__value">{stat.value}</span>
              <span className="server-stat__label">{stat.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
