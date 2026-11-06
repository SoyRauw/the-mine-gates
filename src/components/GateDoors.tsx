import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { RuneIcon } from "./ui/RuneIcon";

export function GateDoors({
  onOpened,
  onFinished,
}: {
  onOpened: () => void;
  onFinished: () => void;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(reduce === true);
  const [hidden, setHidden] = useState(reduce === true);

  useEffect(() => {
    if (reduce) {
      onOpened();
      onFinished();
      return;
    }

    const openTimer = window.setTimeout(() => {
      setOpen(true);
      onOpened();
    }, 600);

    const finishTimer = window.setTimeout(() => {
      setHidden(true);
      onFinished();
    }, 3200);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onFinished, onOpened, reduce]);

  if (reduce || hidden) return null;

  return (
    <div
      className={`gate-doors${open ? " is-open" : ""}`}
      aria-hidden="true"
    >
      <div className="gate-doors__light" />
      <div className="gate-doors__portal" />

      <div className="gate-door gate-door--left">
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

      <div className="gate-door gate-door--right">
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

      <div className="gate-doors__lock">
        <RuneIcon variant="arcane" size={112} />
      </div>
    </div>
  );
}
