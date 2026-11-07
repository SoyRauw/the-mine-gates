import { createContext, useContext } from "react";

export type MusicStartResult = "playing" | "blocked" | "disabled";

export interface MusicContextValue {
  enabled: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  isBlocked: boolean;
  audioReady: boolean;
  volume: number;
  startMusic: () => Promise<MusicStartResult>;
  toggle: () => void;
  setVolume: (value: number) => void;
}

export const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic(): MusicContextValue {
  const value = useContext(MusicContext);
  if (!value) {
    throw new Error("useMusic must be used inside MusicProvider");
  }
  return value;
}
