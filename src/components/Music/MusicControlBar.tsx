import type { CSSProperties } from "react";
import { useMusic } from "./music-context";

export function MusicControlBar({ visible }: { visible: boolean }) {
  const { isPlaying, isMuted, isBlocked, volume, toggle, setVolume } =
    useMusic();

  if (!visible) return null;

  const toggleLabel = isBlocked
    ? "Activar sonido"
    : isMuted
      ? "Activar música"
      : "Silenciar música";

  return (
    <div
      className={`music-control${isPlaying && !isMuted ? " is-playing" : ""}${isMuted ? " is-muted" : ""}${isBlocked ? " is-blocked" : ""}`}
      style={
        {
          "--music-progress": `${Math.round(volume * 100)}%`,
        } as CSSProperties
      }
      role="group"
      aria-label="Control de música"
    >
      <button
        type="button"
        className="music-control__toggle"
        onClick={toggle}
        aria-pressed={!isMuted}
        aria-label={toggleLabel}
        title={toggleLabel}
      >
        <span className="music-control__equalizer" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
      </button>

      <div className="music-control__body">
        <div className="music-control__top">
          <span className="music-control__label">
            {isBlocked ? "Activar sonido" : "Música de la Puerta"}
          </span>
          <span className="music-control__value">
            {Math.round(volume * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          aria-label="Volumen de la música"
          aria-valuetext={`${Math.round(volume * 100)}%`}
        />
      </div>
    </div>
  );
}
