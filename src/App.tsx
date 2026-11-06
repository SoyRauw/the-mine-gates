import { useCallback, useEffect, useState } from "react";
import { Sky } from "./components/Sky";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Lore } from "./components/Lore";
import { MagicSection } from "./components/Magic/MagicSection";
import { Features } from "./components/Features";
import { HowToPlay } from "./components/HowToPlay";
import { Rules } from "./components/Rules";
import { Footer } from "./components/Footer";
import { ToastProvider } from "./components/ui/Toast";
import { MusicProvider } from "./components/Music/MusicProvider";
import { MusicControlBar } from "./components/Music/MusicControlBar";
import { GateDoors } from "./components/GateDoors";

function App() {
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [doorsFinished, setDoorsFinished] = useState(false);

  const handleDoorsOpened = useCallback(() => setDoorsOpen(true), []);
  const handleDoorsFinished = useCallback(() => setDoorsFinished(true), []);

  useEffect(() => {
    if (doorsFinished) {
      document.body.classList.remove("doors-closed");
      return;
    }

    document.body.classList.add("doors-closed");
    const inertTargets = [
      document.querySelector<HTMLElement>(".navbar"),
      document.getElementById("contenido"),
      document.querySelector<HTMLElement>(".footer"),
      document.querySelector<HTMLElement>(".skip-link"),
    ].filter((element): element is HTMLElement => Boolean(element));

    inertTargets.forEach((element) => {
      element.inert = true;
    });

    return () => {
      document.body.classList.remove("doors-closed");
      inertTargets.forEach((element) => {
        element.inert = false;
      });
    };
  }, [doorsFinished]);

  return (
    <ToastProvider>
      <MusicProvider>
        <div className="app fd" data-realm="twilight">
          <Sky />
          <div className="sky-veil" aria-hidden="true" />
          <div className="fd-fog" aria-hidden="true" />
          <div className="fd-vignette" aria-hidden="true" />
          <a className="skip-link" href="#contenido">
            Saltar al contenido
          </a>

          <Navbar />

          <main id="contenido">
            <Hero doorsOpen={doorsOpen} />
            <div className="page-body">
              <Lore />
              <MagicSection />
              <Features />
              <HowToPlay />
              <Rules />
            </div>
          </main>

          <Footer />
          <MusicControlBar visible={doorsFinished} />
          <GateDoors
            onOpened={handleDoorsOpened}
            onFinished={handleDoorsFinished}
          />
        </div>
      </MusicProvider>
    </ToastProvider>
  );
}

export default App;
