import type { CSSProperties } from "react";
import { useMusic } from "./music-context";

export function MusicControl() {
  const { hasEntered, isPlaying, isMuted, volume, toggle, setVolume } =
    useMusic();

  if (!hasEntered) return null;

  return (
    <div
      className={`music-control${isPlaying && !isMuted ? " is-playing" : ""}${isMuted ? " is-muted" : ""}`}
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
        aria-label={isMuted ? "Activar música" : "Silenciar música"}
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
          <span className="music-control__label">Música de la Puerta</span>
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
