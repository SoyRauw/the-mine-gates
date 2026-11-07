import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/cinzel/latin-600.css";
import "@fontsource/cinzel/latin-700.css";
import "@fontsource/eb-garamond/latin-500.css";
import "@fontsource/eb-garamond/latin-600.css";
import "@fontsource/eb-garamond/latin-500-italic.css";
import "../styles/fantasy.css";
import "./admin.css";
import { AdminApp } from "./AdminApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminApp />
  </StrictMode>,
);
