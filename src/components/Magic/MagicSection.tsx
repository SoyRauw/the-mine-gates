import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  SCHOOLS,
  SCHOOL_CATEGORIES,
  type SchoolFilter,
} from "../../data/schools";
import { SectionHeader } from "../ui/SectionHeader";
import { RuneIcon } from "../ui/RuneIcon";
import { AddonShowcase } from "./AddonShowcase";
import { Bestiary } from "./Bestiary";
import { SchoolDetail } from "./SchoolDetail";

export function MagicSection() {
  const [filter, setFilter] = useState<SchoolFilter>("all");
  const [activeId, setActiveId] = useState(SCHOOLS[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduce = useReducedMotion();

  const filteredSchools = useMemo(
    () =>
      filter === "all"
        ? SCHOOLS
        : SCHOOLS.filter((school) => school.category === filter),
    [filter],
  );

  const activeSchool =
    filteredSchools.find((school) => school.id === activeId) ??
    filteredSchools[0] ??
    SCHOOLS[0];

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const key = event.key;
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) {
      return;
    }
    event.preventDefault();
    let nextIndex = index;
    if (key === "ArrowDown" || key === "ArrowRight") {
      nextIndex = (index + 1) % filteredSchools.length;
    } else if (key === "ArrowUp" || key === "ArrowLeft") {
      nextIndex = (index - 1 + filteredSchools.length) % filteredSchools.length;
    } else if (key === "Home") {
      nextIndex = 0;
    } else if (key === "End") {
      nextIndex = filteredSchools.length - 1;
    }
    const nextSchool = filteredSchools[nextIndex];
    if (nextSchool) {
      setActiveId(nextSchool.id);
      requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
    }
  };

  return (
    <section
      id="magia"
      className="section magic-section"
      aria-labelledby="magia-title"
    >
      <div className="container">
        <SectionHeader
          id="magia-title"
          eyebrow="Capítulo II · El Grimorio"
          title={
            <>
              Catorce escuelas.
              <br />
              Un solo destino.
            </>
          }
          subtitle="Nueve escuelas ancestrales, tres ramas prohibidas y dos disciplinas nacidas en la Puerta. Elige tu camino, domina sus hechizos y combina elementos con tu party."
        />

        <AddonShowcase />

        <div className="grimoire fd-panel">
          <div className="grimoire__index">
            <div className="grimoire__index-head">
              <span className="fd-eyebrow">Índice del grimorio</span>
              <span className="grimoire__folio">FOLIO II</span>
            </div>

            <div
              className="grimoire__filters"
              role="group"
              aria-label="Filtrar escuelas de magia"
            >
              {SCHOOL_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`grimoire__filter${filter === category.id ? " is-active" : ""}`}
                  aria-pressed={filter === category.id}
                  onClick={() => setFilter(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div
              className="school-grid"
              role="tablist"
              aria-label="Escuelas de magia"
              aria-orientation="vertical"
            >
              {filteredSchools.map((school, index) => (
                <button
                  key={school.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`school-tab-${school.id}`}
                  aria-selected={activeSchool.id === school.id}
                  aria-controls="school-panel"
                  tabIndex={activeSchool.id === school.id ? 0 : -1}
                  className={`school-tab${activeSchool.id === school.id ? " is-active" : ""}`}
                  style={
                    {
                      "--school-accent": school.accent,
                      "--school-soft": school.accentSoft,
                    } as CSSProperties
                  }
                  onClick={() => setActiveId(school.id)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  <span className="school-tab__rune" aria-hidden="true">
                    <RuneIcon variant={school.rune} size={30} />
                  </span>
                  <span className="school-tab__text">
                    <span className="school-tab__name">{school.name}</span>
                    <span className="school-tab__source">
                      {school.sourceShort}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <p className="grimoire__hint">
              9 escuelas base · 3 addons · 2 del servidor
            </p>
          </div>

          <div
            className="grimoire__detail"
            role="tabpanel"
            id="school-panel"
            aria-labelledby={`school-tab-${activeSchool.id}`}
            tabIndex={0}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSchool.id}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.34, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <SchoolDetail school={activeSchool} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Bestiary />
      </div>
    </section>
  );
}
