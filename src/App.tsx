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
import { GateIntro } from "./components/Music/GateIntro";
import { MusicControl } from "./components/Music/MusicControl";

function App() {
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
            <Hero />
            <div className="page-body">
              <Lore />
              <MagicSection />
              <Features />
              <HowToPlay />
              <Rules />
            </div>
          </main>

          <Footer />
          <MusicControl />
          <GateIntro />
        </div>
      </MusicProvider>
    </ToastProvider>
  );
}

export default App;
