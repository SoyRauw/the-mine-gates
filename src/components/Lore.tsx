import { Reveal } from "./ui/Reveal";
import { RuneIcon } from "./ui/RuneIcon";
import { SectionHeader } from "./ui/SectionHeader";

const TIMELINE = [
  {
    era: "Acto I",
    title: "El Descenso",
    text: "Los mineros rompieron la última veta y encontraron una puerta de piedra negra. Nadie recuerda quién la abrió primero.",
  },
  {
    era: "Acto II",
    title: "La Grieta",
    text: "El cielo se quebró. La magia empezó a filtrarse por las grietas y el mundo aprendió a tener miedo de la noche.",
  },
  {
    era: "Acto III",
    title: "El Despertar",
    text: "Los grandes magos regresaron con sus grimorios. Las escuelas despertaron y la Puerta eligió a sus nuevos portadores.",
  },
];

const WORLD_STATE = [
  "Corrupción creciente",
  "Grimorios despertando",
  "La Puerta abierta",
];

export function Lore() {
  return (
    <section id="lore" className="section lore-section" aria-labelledby="lore-title">
      <div className="container">
        <SectionHeader
          id="lore-title"
          eyebrow="Capítulo I · La Corrupción"
          title={
            <>
              La Puerta que
              <br />
              no debía abrirse
            </>
          }
          subtitle="Antes de los grimorios, antes de los jefes, hubo una mina. Y bajo la mina, algo que llevaba siglos esperando ser recordado."
        />

        <div className="lore-layout">
          <Reveal className="lore-timeline" delay={0.05}>
            <div className="lore-timeline__heading">
              <span className="fd-eyebrow">Crónica de la Grieta</span>
              <span className="lore-timeline__folio">FOLIO I</span>
            </div>
            <div className="timeline">
              {TIMELINE.map((entry) => (
                <article className="timeline__item" key={entry.title}>
                  <span className="timeline__era">{entry.era}</span>
                  <h3 className="timeline__title">{entry.title}</h3>
                  <p>{entry.text}</p>
                </article>
              ))}
            </div>
            <div className="lore-timeline__seal" aria-hidden="true">
              <RuneIcon variant="eldritch" size={92} />
            </div>
          </Reveal>

          <Reveal className="fd-panel lore-manuscript" delay={0.14}>
            <div className="lore-manuscript__watermark" aria-hidden="true">
              <RuneIcon variant="void" size={420} />
            </div>
            <div className="lore-manuscript__header">
              <span className="fd-eyebrow">Manuscrito recuperado</span>
              <span className="lore-manuscript__mark" aria-hidden="true">
                ✦
              </span>
            </div>

            <p className="lore-dropcap">
              Cuando la última veta de diamante fue arrancada, la piedra dejó de
              respirar. Los mineros encontraron una puerta tallada en basalto,
              cubierta de runas que ningún idioma recordaba. La abrieron por
              codicia. La Puerta respondió con un cielo que se partió en dos.
            </p>

            <p>
              Lo que salió de la Grieta no fue un ejército, sino una memoria.
              Las ocho escuelas ancestrales despertaron a la vez, y con ellas
              los grimorios que llevaban siglos esperando un portador. La magia
              volvió al mundo como una marea: hermosa, imprevisible y hambrienta.
            </p>

            <p>
              Ahora las mazmorras respiran, los jefes antiguos reclaman sus
              tronos y los magos que sobrevivieron a la primera Grieta enseñan a
              los nuevos aprendices. Tú has cruzado la Puerta. Lo que hagas con
              el poder que encuentres será tu crónica.
            </p>

            <blockquote className="lore-quote">
              “La piedra recuerda. La magia nunca olvida.”
              <cite>— Inscripción en el arco de entrada</cite>
            </blockquote>

            <div className="lore-status" aria-label="Estado del mundo">
              {WORLD_STATE.map((state) => (
                <span className="lore-chip" key={state}>
                  <span aria-hidden="true">◆</span>
                  {state}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
