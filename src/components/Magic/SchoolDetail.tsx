import type { CSSProperties } from "react";
import type { School } from "../../data/types";
import { SchoolRune } from "./SchoolRune";

const CATEGORY_LABEL: Record<School["category"], string> = {
  base: "Escuela base",
  addon: "Escuela de addon",
  server: "Escuela del servidor",
};

export function SchoolDetail({ school }: { school: School }) {
  const uid = school.id;

  return (
    <article
      className="school-detail"
      style={
        {
          "--school-accent": school.accent,
          "--school-soft": school.accentSoft,
        } as CSSProperties
      }
    >
      <div className="school-detail__aura" aria-hidden="true" />
      <header className="school-detail__header">
        <SchoolRune
          school={school}
          size={88}
          active
          className="school-detail__rune"
        />
        <div>
          <div className="school-detail__meta">
            <span className="school-detail__source">{school.source}</span>
            <span className="school-detail__category">
              {CATEGORY_LABEL[school.category]}
            </span>
          </div>
          <h3 className="fd-title school-detail__name">{school.name}</h3>
          <p className="school-detail__tagline">{school.tagline}</p>
        </div>
      </header>

      <div className="school-detail__specs">
        <div className="spec">
          <span className="spec__label">Foco</span>
          <span className="spec__value">{school.focus}</span>
        </div>
        <div className="spec">
          <span className="spec__label">Rol</span>
          <span className="spec__value">{school.role}</span>
        </div>
        <div className="spec">
          <span className="spec__label">Hechizo estrella</span>
          <span className="spec__value spec__value--accent">
            {school.signatureSpell}
          </span>
        </div>
      </div>

      <p className="school-detail__description">{school.description}</p>

      <section
        className="school-detail__block"
        aria-labelledby={`spells-heading-${uid}`}
      >
        <div className="school-detail__block-head">
          <h4
            id={`spells-heading-${uid}`}
            className="school-detail__block-title"
          >
            Hechizos emblemáticos
          </h4>
          <span className="school-detail__block-line" aria-hidden="true" />
        </div>
        <div className="spell-list">
          {school.spells.map((spell) => (
            <div className="spell" key={spell.name}>
              <span className="spell__diamond" aria-hidden="true" />
              <div>
                <strong>{spell.name}</strong>
                <p>{spell.description}</p>
              </div>
            </div>
          ))}
        </div>
        {school.spellNote ? (
          <p className="school-detail__spell-note">{school.spellNote}</p>
        ) : null}
      </section>

      {school.featuredSpell ? (
        <section
          className="school-detail__featured"
          aria-labelledby={`featured-heading-${uid}`}
        >
          <span className="fd-eyebrow">Hechizo de firma</span>
          <h4
            id={`featured-heading-${uid}`}
            className="fd-title school-detail__featured-title"
          >
            {school.featuredSpell.name}
          </h4>
          <p>{school.featuredSpell.description}</p>
          <ul>
            {school.featuredSpell.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="school-detail__columns">
        <section aria-labelledby={`synergies-heading-${uid}`}>
          <div className="school-detail__block-head">
            <h4
              id={`synergies-heading-${uid}`}
              className="school-detail__block-title"
            >
              Sinergias
            </h4>
            <span className="school-detail__block-line" aria-hidden="true" />
          </div>
          <div className="school-detail__chips">
            {school.synergies.map((synergy) => (
              <span className="school-chip" key={synergy}>
                {synergy}
              </span>
            ))}
          </div>
        </section>

        <section aria-labelledby={`gear-heading-${uid}`}>
          <div className="school-detail__block-head">
            <h4
              id={`gear-heading-${uid}`}
              className="school-detail__block-title"
            >
              Equipo y botín
            </h4>
            <span className="school-detail__block-line" aria-hidden="true" />
          </div>
          <ul className="gear-list">
            {school.gear.map((gear) => (
              <li key={gear}>
                <span aria-hidden="true">✦</span>
                {gear}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {school.bosses?.length ? (
        <div className="school-detail__bosses">
          <span className="school-detail__bosses-label">Jefes vinculados</span>
          {school.bosses.map((boss) => (
            <span className="boss-chip" key={boss}>
              {boss}
            </span>
          ))}
        </div>
      ) : null}

      <aside className="school-detail__note">
        <span className="school-detail__note-mark" aria-hidden="true">
          ✦
        </span>
        <div>
          <strong>Nota del servidor</strong>
          <p>{school.note}</p>
        </div>
      </aside>
    </article>
  );
}
