import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import type { PointerEvent } from "react";
import { CONFIG } from "../data/config";
import { useMusic } from "./Music/music-context";
import { ConfigLink } from "./ui/ConfigLink";
import { IpWidget } from "./IpWidget";
import { HeroGate } from "./HeroGate";
import { RuneIcon } from "./ui/RuneIcon";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.35,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.2, 0.7, 0.2, 1] },
  },
};

export function Hero() {
  const reduce = useReducedMotion();
  const { hasEntered } = useMusic();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(42);
  const springX = useSpring(pointerX, { stiffness: 55, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 55, damping: 22 });
  const light = useMotionTemplate`radial-gradient(650px circle at ${springX}% ${springY}%, rgba(192, 132, 252, 0.18), rgba(255, 154, 60, 0.05) 32%, transparent 62%)`;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 100);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      id="inicio"
      className="hero"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
    >
      <motion.div
        className="hero-pointer-light"
        style={{ background: light }}
        aria-hidden="true"
      />
      <HeroGate />

      <motion.div
        className="hero__content"
        variants={container}
        initial={reduce ? false : "hidden"}
        animate={reduce || hasEntered ? "show" : "hidden"}
      >
        <motion.div className="hero__sigil" variants={item} aria-hidden="true">
          <RuneIcon variant="eldritch" size={58} />
        </motion.div>

        <motion.span className="fd-eyebrow hero__eyebrow" variants={item}>
          Servidor de fantasía oscura · Java {CONFIG.version}
        </motion.span>

        <motion.h1
          id="hero-title"
          className={`fd-title hero__title${hasEntered ? " is-entered" : ""}`}
          initial={
            reduce
              ? false
              : { opacity: 0, clipPath: "inset(0 100% 0 0)" }
          }
          animate={
            reduce || hasEntered
              ? { opacity: 1, clipPath: "inset(0 0 0 0)" }
              : { opacity: 0, clipPath: "inset(0 100% 0 0)" }
          }
          transition={{
            duration: 1.35,
            delay: 0.45,
            ease: [0.2, 0.7, 0.2, 1],
          }}
        >
          THE MINE GATE’S
        </motion.h1>

        <motion.div
          className="fd-divider hero__divider"
          variants={item}
          aria-hidden="true"
        >
          <i />
        </motion.div>

        <motion.p className="hero__subtitle" variants={item}>
          Cruza el portal hacia un mundo dominado por grimorios ancestrales,
          magia prohibida y mazmorras implacables.
        </motion.p>

        <motion.div className="hero__status" variants={item}>
          <span className="status-dot" aria-hidden="true" />
          <span>{CONFIG.status}</span>
          <span className="hero__status-sep" aria-hidden="true">
            •
          </span>
          <span>{CONFIG.version}</span>
        </motion.div>

        <motion.div className="hero__actions" variants={item}>
          <IpWidget />
          <div className="hero__cta">
            <a className="fd-btn fd-btn--fire" href="#como-jugar">
              Cómo jugar
            </a>
            <ConfigLink
              className="fd-btn fd-btn--ghost"
              href={CONFIG.discordUrl}
              placeholder="El enlace de Discord estará disponible muy pronto."
            >
              Unirse al Discord
            </ConfigLink>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        className="hero__scroll"
        href="#lore"
        variants={item}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: reduce || hasEntered ? 1 : 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <motion.span
          className="hero__scroll-rune"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={
            reduce
              ? undefined
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
          aria-hidden="true"
        >
          ✦
        </motion.span>
        <span>Desciende a la crónica</span>
      </motion.a>
    </section>
  );
}
