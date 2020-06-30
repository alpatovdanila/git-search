import React from "react";
import style from "./animation.module.scss";
type Animation = "rotate" | "jello" | "pulsate";
type Timing = "ease-in" | "ease-out" | "ease-in-out";

type AnimationProps = {
  type: Animation;
  infinite?: boolean;
  iterationCount?: number;
  timing?: Timing;
  duration?: number;
  children?: React.ReactChild;
};

export const Animation = ({
  type,
  infinite = false,
  iterationCount = 1,
  timing,
  duration = 250,
  children,
}: AnimationProps) => (
  <div
    className={style.animation}
    style={{
      animationDuration: `${duration}ms`,
      animationIterationCount: infinite ? "infinite" : iterationCount,
      animationTimingFunction: timing ? timing : "linear",
      animationName: style[type],
    }}
  >
    {children}
  </div>
);
