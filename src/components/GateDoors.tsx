import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { RuneIcon } from "./ui/RuneIcon";

export function GateDoors({
  ready,
  onOpened,
  onFinished,
}: {
  ready: boolean;
  onOpened: () => void;
  onFinished: () => void;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(reduce === true);
  const [hidden, setHidden] = useState(reduce === true);
  const openedRef = useRef(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (reduce) {
      if (!openedRef.current) {
        openedRef.current = true;
        onOpened();
      }
      if (!finishedRef.current) {
        finishedRef.current = true;
        onFinished();
      }
      return;
    }

    if (!ready || openedRef.current) return;

    const openTimer = window.setTimeout(() => {
      if (openedRef.current) return;
      openedRef.current = true;
      setOpen(true);
      onOpened();
    }, 300);

    return () => window.clearTimeout(openTimer);
  }, [onFinished, onOpened, ready, reduce]);

  useEffect(() => {
    if (reduce || !open || finishedRef.current) return;

    const finishTimer = window.setTimeout(() => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setHidden(true);
      onFinished();
    }, 2800);

    return () => window.clearTimeout(finishTimer);
  }, [onFinished, open, reduce]);

  if (reduce || hidden) return null;

  return (
    <div className={`gate-doors${open ? " is-open" : ""}`}>
      <div className="gate-doors__flash" aria-hidden="true" />
      <div className="gate-doors__portal" aria-hidden="true" />
      <div className="gate-doors__light" aria-hidden="true" />

      <div className="gate-door gate-door--left" aria-hidden="true">
        <div className="gate-door__face">
          <span className="gate-door__bands" />
          <span className="gate-door__runes">
            <RuneIcon variant="eldritch" size={62} />
            <RuneIcon variant="arcane" size={62} />
            <RuneIcon variant="holy" size={62} />
          </span>
          <span className="gate-door__edge" />
        </div>
      </div>

      <div className="gate-door gate-door--right" aria-hidden="true">
        <div className="gate-door__face">
          <span className="gate-door__bands" />
          <span className="gate-door__runes">
            <RuneIcon variant="void" size={62} />
            <RuneIcon variant="necro" size={62} />
            <RuneIcon variant="sound" size={62} />
          </span>
          <span className="gate-door__edge" />
        </div>
      </div>

      <div className="gate-doors__lock" aria-hidden="true">
        <RuneIcon variant="arcane" size={112} />
      </div>

      <div className="gate-doors__loading" role="status" aria-live="polite">
        <span className="gate-doors__loading-rune" aria-hidden="true">
          <RuneIcon variant="arcane" size={34} />
        </span>
        <span>
          {ready ? "La Puerta se abre…" : "La Puerta está despertando…"}
        </span>
        <span className="gate-doors__loading-bar" aria-hidden="true">
          <span />
        </span>
      </div>
    </div>
  );
}
