import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import themeMusic from "../../assets/audio/dark-fantasy-theme.mp3";
import { MUSIC_CONFIG } from "../../data/config";
import { useToast } from "../ui/toast-context";
import { MusicContext } from "./music-context";

type AudioSlot = "a" | "b";

function readStoredEnabled(): boolean {
  try {
    const stored = window.localStorage.getItem(MUSIC_CONFIG.enabledStorageKey);
    return stored === null ? true : stored === "1";
  } catch {
    return true;
  }
}

function readStoredVolume(): number {
  try {
    const stored = window.localStorage.getItem(MUSIC_CONFIG.volumeStorageKey);
    if (stored === null) return MUSIC_CONFIG.defaultVolume;
    const parsed = Number(stored);
    return Number.isFinite(parsed)
      ? Math.min(1, Math.max(0, parsed))
      : MUSIC_CONFIG.defaultVolume;
  } catch {
    return MUSIC_CONFIG.defaultVolume;
  }
}

function persist(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private browsing / storage blocked: the session still works.
  }
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [enabled, setEnabled] = useState(readStoredEnabled);
  const [volume, setVolumeState] = useState(readStoredVolume);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const audioARef = useRef<HTMLAudioElement>(null);
  const audioBRef = useRef<HTMLAudioElement>(null);
  const activeSlotRef = useRef<AudioSlot>("a");
  const fadeFrameRef = useRef<number | null>(null);
  const fadingRef = useRef(false);
  const enabledRef = useRef(enabled);
  const volumeRef = useRef(volume);
  const errorShownRef = useRef(false);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  const getActive = useCallback(
    () => (activeSlotRef.current === "a" ? audioARef.current : audioBRef.current),
    [],
  );

  const getInactive = useCallback(
    () => (activeSlotRef.current === "a" ? audioBRef.current : audioARef.current),
    [],
  );

  const applyVolume = useCallback(
    (value: number) => {
      const active = getActive();
      const inactive = getInactive();
      if (active) active.volume = value;
      if (inactive) inactive.volume = value;
    },
    [getActive, getInactive],
  );

  const cancelFade = useCallback(() => {
    if (fadeFrameRef.current !== null) {
      cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }
    fadingRef.current = false;
  }, []);

  const pauseAll = useCallback(() => {
    cancelFade();
    audioARef.current?.pause();
    audioBRef.current?.pause();
    setIsPlaying(false);
  }, [cancelFade]);

  const playActive = useCallback(async () => {
    const active = getActive();
    const inactive = getInactive();
    if (!active) return;

    active.muted = false;
    if (inactive) inactive.muted = false;

    const base = enabledRef.current ? volumeRef.current : 0;
    if (!fadingRef.current) applyVolume(base);

    try {
      await active.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
    } catch {
      setIsPlaying(false);
    }
  }, [applyVolume, getActive, getInactive]);

  const startCrossfade = useCallback(() => {
    if (fadingRef.current || !enabledRef.current) return;
    const current = getActive();
    const next = getInactive();
    if (!current || !next) return;

    fadingRef.current = true;
    next.currentTime = 0;
    next.volume = 0;
    next.muted = current.muted;

    const start = performance.now();
    const duration = MUSIC_CONFIG.crossfadeSeconds * 1000;

    const step = (now: number) => {
      if (!fadingRef.current) return;
      const base = enabledRef.current ? volumeRef.current : 0;
      const progress = Math.min(1, (now - start) / duration);
      current.volume = base * (1 - progress);
      next.volume = base * progress;

      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(step);
        return;
      }

      current.pause();
      current.currentTime = 0;
      current.volume = base;
      next.volume = base;
      activeSlotRef.current = activeSlotRef.current === "a" ? "b" : "a";
      fadingRef.current = false;
      fadeFrameRef.current = null;
    };

    void next
      .play()
      .then(() => {
        fadeFrameRef.current = requestAnimationFrame(step);
      })
      .catch(() => {
        fadingRef.current = false;
        next.volume = 0;
      });
  }, [getActive, getInactive]);

  const handleTimeUpdate = useCallback(
    (audio: HTMLAudioElement) => {
      if (
        audio !== getActive() ||
        fadingRef.current ||
        !enabledRef.current ||
        audio.paused
      ) {
        return;
      }
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
      if (audio.duration <= MUSIC_CONFIG.crossfadeSeconds * 3) return;

      const remaining = audio.duration - audio.currentTime;
      if (remaining <= MUSIC_CONFIG.crossfadeSeconds) {
        startCrossfade();
      }
    },
    [getActive, startCrossfade],
  );

  const handleEnded = useCallback(
    (audio: HTMLAudioElement) => {
      if (fadingRef.current || audio !== getActive()) return;
      if (!enabledRef.current) return;
      audio.currentTime = 0;
      void audio.play().catch(() => setIsPlaying(false));
    },
    [getActive],
  );

  const handleError = useCallback(() => {
    if (errorShownRef.current) return;
    errorShownRef.current = true;
    showToast("No se pudo cargar la música de la Puerta.");
  }, [showToast]);

  const unlockAudio = useCallback(() => {
    const active = getActive();
    const inactive = getInactive();
    if (!active) return;

    let nextVolume = volumeRef.current;
    if (nextVolume === 0) {
      nextVolume = MUSIC_CONFIG.defaultVolume;
      setVolumeState(nextVolume);
      volumeRef.current = nextVolume;
      persist(MUSIC_CONFIG.volumeStorageKey, String(nextVolume));
    }

    setEnabled(true);
    enabledRef.current = true;
    persist(MUSIC_CONFIG.enabledStorageKey, "1");
    setAutoplayBlocked(false);

    active.muted = false;
    if (inactive) inactive.muted = false;
    if (!fadingRef.current) applyVolume(nextVolume);

    void active
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [applyVolume, getActive, getInactive]);

  useEffect(() => {
    if (!enabledRef.current) return;
    const active = getActive();
    const inactive = getInactive();
    if (!active) return;

    let cancelled = false;

    const attempt = async () => {
      active.volume = volumeRef.current;
      active.muted = false;

      try {
        await active.play();
        if (!cancelled) {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        }
      } catch {
        if (cancelled) return;

        setAutoplayBlocked(true);
        active.muted = true;
        if (inactive) inactive.muted = true;

        try {
          await active.play();
          if (!cancelled) setIsPlaying(true);
        } catch {
          if (!cancelled) setIsPlaying(false);
        }
      }
    };

    void attempt();
    return () => {
      cancelled = true;
    };
  }, [getActive, getInactive]);

  useEffect(() => {
    if (!autoplayBlocked) return;

    const unlock = () => unlockAudio();
    const events = ["pointerdown", "keydown", "touchstart", "wheel"];

    events.forEach((event) => {
      window.addEventListener(event, unlock, { once: true });
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, unlock);
      });
    };
  }, [autoplayBlocked, unlockAudio]);

  const toggle = useCallback(() => {
    if (autoplayBlocked) {
      unlockAudio();
      return;
    }

    if (enabledRef.current && volumeRef.current > 0) {
      setEnabled(false);
      enabledRef.current = false;
      persist(MUSIC_CONFIG.enabledStorageKey, "0");
      pauseAll();
      return;
    }

    let nextVolume = volumeRef.current;
    if (nextVolume === 0) {
      nextVolume = MUSIC_CONFIG.defaultVolume;
      setVolumeState(nextVolume);
      volumeRef.current = nextVolume;
      persist(MUSIC_CONFIG.volumeStorageKey, String(nextVolume));
    }

    setEnabled(true);
    enabledRef.current = true;
    persist(MUSIC_CONFIG.enabledStorageKey, "1");
    void playActive();
  }, [autoplayBlocked, pauseAll, playActive, unlockAudio]);

  const setVolume = useCallback(
    (value: number) => {
      const nextVolume = Math.min(1, Math.max(0, value));
      setVolumeState(nextVolume);
      volumeRef.current = nextVolume;
      persist(MUSIC_CONFIG.volumeStorageKey, String(nextVolume));

      if (nextVolume > 0 && autoplayBlocked) {
        unlockAudio();
        return;
      }

      if (nextVolume > 0 && !enabledRef.current) {
        setEnabled(true);
        enabledRef.current = true;
        persist(MUSIC_CONFIG.enabledStorageKey, "1");
        void playActive();
      }

      if (!fadingRef.current) {
        applyVolume(enabledRef.current ? nextVolume : 0);
      }
    },
    [applyVolume, autoplayBlocked, playActive, unlockAudio],
  );

  useEffect(() => {
    const audioA = audioARef.current;
    const audioB = audioBRef.current;

    const resume = () => {
      if (document.hidden || !enabledRef.current) return;
      const active = getActive();
      if (active?.paused) {
        void active.play().catch(() => {});
      }
    };

    const onVisibilityChange = () => resume();
    const onPageShow = () => resume();

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pageshow", onPageShow);
      cancelFade();
      audioA?.pause();
      audioB?.pause();
    };
  }, [cancelFade, getActive]);

  const isMuted = !enabled || volume === 0 || autoplayBlocked;

  return (
    <MusicContext.Provider
      value={{
        enabled,
        isPlaying,
        isMuted,
        isBlocked: autoplayBlocked,
        volume,
        toggle,
        setVolume,
      }}
    >
      {children}
      <audio
        ref={audioARef}
        className="music-audio"
        src={themeMusic}
        preload="auto"
        onTimeUpdate={(event) => handleTimeUpdate(event.currentTarget)}
        onEnded={(event) => handleEnded(event.currentTarget)}
        onError={handleError}
      />
      <audio
        ref={audioBRef}
        className="music-audio"
        src={themeMusic}
        preload="auto"
        onTimeUpdate={(event) => handleTimeUpdate(event.currentTarget)}
        onEnded={(event) => handleEnded(event.currentTarget)}
        onError={handleError}
      />
    </MusicContext.Provider>
  );
}
