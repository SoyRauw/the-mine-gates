import type { CSSProperties } from "react";
import { ADDONS } from "../../data/content";
import { Reveal } from "../ui/Reveal";
import { RuneIcon } from "../ui/RuneIcon";

export function AddonShowcase() {
  return (
    <div className="addon-showcase" aria-label="Addons de magia instalados">
      {ADDONS.map((addon, index) => (
        <Reveal
          key={addon.id}
          delay={index * 0.06}
          className={`addon-card${addon.featured ? " addon-card--featured" : ""}`}
        >
          <article
            className="fd-panel addon-card__panel"
            style={
              {
                "--addon-accent": addon.accent,
              } as CSSProperties
            }
          >
            {addon.featured ? (
              <span className="addon-card__watermark" aria-hidden="true">
                <RuneIcon variant="boss" size={340} />
              </span>
            ) : null}
            <div className="addon-card__top">
              <span className="addon-card__source">{addon.source}</span>
              <span className="addon-card__seal" aria-hidden="true">
                <RuneIcon variant={addon.rune} size={addon.featured ? 64 : 46} />
              </span>
            </div>
            <h3 className="fd-title addon-card__title">{addon.name}</h3>
            <p className="addon-card__description">{addon.description}</p>
            <div className="addon-card__tags">
              {addon.tags.map((tag) => (
                <span className="addon-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            {addon.featured ? (
              <div className="addon-card__boss" aria-hidden="true">
                <span>Nightwarden</span>
                <div className="addon-card__boss-bar">
                  <span />
                </div>
                <small>Guardián de la noche</small>
              </div>
            ) : null}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
