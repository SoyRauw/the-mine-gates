import { CONFIG } from "../data/config";
import { useCopyIp } from "../hooks/useCopyIp";
import { RuneIcon } from "./ui/RuneIcon";

export function IpWidget({ compact = false }: { compact?: boolean }) {
  const { copied, copy } = useCopyIp();

  return (
    <div className={`ip-widget${compact ? " ip-widget--compact" : ""}`}>
      <div className="ip-widget__seal" aria-hidden="true">
        <RuneIcon variant="arcane" size={compact ? 30 : 40} />
      </div>
      <div className="ip-widget__content">
        <span className="ip-widget__label">IP del servidor</span>
        <code className="ip-widget__value">{CONFIG.serverIp}</code>
      </div>
      <button
        type="button"
        className={`ip-widget__copy${copied ? " is-copied" : ""}`}
        onClick={copy}
        aria-label={`Copiar IP ${CONFIG.serverIp}`}
      >
        <span className="ip-widget__copy-icon" aria-hidden="true">
          {copied ? "✓" : "⧉"}
        </span>
        <span>{copied ? "¡Copiado!" : "Copiar IP"}</span>
      </button>
      <span className="ip-widget__spark" aria-hidden="true" />
      <span className="visually-hidden" role="status" aria-live="polite">
        {copied ? "IP copiada al portapapeles" : ""}
      </span>
    </div>
  );
}
