import { useEffect, useRef } from "react";
import { mountDarkSky } from "../lib/darkSky";

export function Sky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const handle = mountDarkSky(canvasRef.current, {
      realm: "twilight",
      swirl: 0.68,
      stars: 0.9,
      fadeIn: 1.5,
      scale: window.innerWidth < 720 ? 0.45 : 0.6,
    });
    return () => handle?.destroy();
  }, []);

  return <canvas ref={canvasRef} className="fd-sky" aria-hidden="true" />;
}
