import { createContext, useContext } from "react";

export interface MusicContextValue {
  hasEntered: boolean;
  enabled: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  preferredMusic: boolean;
  volume: number;
  isReady: boolean;
  enter: (withMusic: boolean) => void;
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
