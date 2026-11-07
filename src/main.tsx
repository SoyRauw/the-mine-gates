import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/cinzel/latin-600.css";
import "@fontsource/cinzel/latin-700.css";
import "@fontsource/eb-garamond/latin-500.css";
import "@fontsource/eb-garamond/latin-600.css";
import "@fontsource/eb-garamond/latin-500-italic.css";
import "./styles/fantasy.css";
import "./styles/site.css";
import "./styles/magic.css";
import "./styles/music.css";
import "./styles/whitelist.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
