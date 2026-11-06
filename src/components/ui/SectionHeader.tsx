import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  id,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  id?: string;
  align?: "center" | "left";
}) {
  return (
    <header className={`section-header section-header--${align}`}>
      <Reveal>
        <span className="fd-eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 id={id} className="fd-title section-title">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.14}>
        <div className="fd-divider section-divider" aria-hidden="true">
          <i />
        </div>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.18}>
          <p className="section-subtitle">{subtitle}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
