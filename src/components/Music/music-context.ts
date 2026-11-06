import { createContext, useContext } from "react";

export interface MusicContextValue {
  enabled: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  isBlocked: boolean;
  volume: number;
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
