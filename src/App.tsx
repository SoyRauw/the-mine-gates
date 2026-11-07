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
import { useMusic } from "./components/Music/music-context";
import { GateDoors } from "./components/GateDoors";

function SiteContent() {
  const { audioReady, startMusic } = useMusic();
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [doorsFinished, setDoorsFinished] = useState(false);
  const [fontsReady, setFontsReady] = useState(
    () => !document.fonts?.ready,
  );
  const [pageReady, setPageReady] = useState(
    () => document.readyState === "complete",
  );
  const [minWaitPassed, setMinWaitPassed] = useState(false);
  const [maxWaitPassed, setMaxWaitPassed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) setFontsReady(true);
      });
    }

    const onLoad = () => setPageReady(true);
    if (document.readyState !== "complete") {
      window.addEventListener("load", onLoad, { once: true });
    }

    const minTimer = window.setTimeout(() => setMinWaitPassed(true), 600);
    const maxTimer = window.setTimeout(() => setMaxWaitPassed(true), 8000);

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
    };
  }, []);

  const ready =
    maxWaitPassed ||
    (fontsReady && pageReady && audioReady && minWaitPassed);

  const handleDoorsOpened = useCallback(() => {
    setDoorsOpen(true);
    startMusic();
  }, [startMusic]);

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
        ready={ready}
        onOpened={handleDoorsOpened}
        onFinished={handleDoorsFinished}
      />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <MusicProvider>
        <SiteContent />
      </MusicProvider>
    </ToastProvider>
  );
}

export default App;
