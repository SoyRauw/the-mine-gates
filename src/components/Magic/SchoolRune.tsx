import type { CSSProperties } from "react";
import type { School } from "../../data/types";
import { RuneIcon } from "../ui/RuneIcon";

export function SchoolRune({
  school,
  size = 56,
  className = "",
  active = false,
}: {
  school: School;
  size?: number;
  className?: string;
  active?: boolean;
}) {
  return (
    <span
      className={`school-rune${active ? " is-active" : ""} ${className}`}
      style={
        {
          "--school-accent": school.accent,
          "--school-soft": school.accentSoft,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <span className="school-rune__ring" />
      <span className="school-rune__glyph">
        <RuneIcon variant={school.rune} size={size} />
      </span>
    </span>
  );
}
