"use client";

import { playfairDisplay } from "@/app/fonts";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

export default function Typewriter() {
  const textArrayRef = React.useRef([
    "Mind",
    "Visionary",
    "Pioneer",
    "Founder",
  ]);
  const textIdx = useMotionValue(0);
  const textRef = useTransform(
    textIdx,
    (idx) => textArrayRef.current[idx] || "",
  );
  const idx = useMotionValue(0);
  const roundedIdx = useTransform(idx, (val) => Math.round(val));
  const displayText = useTransform(roundedIdx, (idx) =>
    textRef.get().slice(0, idx),
  );
  const updatedThisRound = useMotionValue(true);

  React.useEffect(() => {
    const animation = animate(idx, 9, {
      duration: 0.7,
      stiffness: 300,
      damping: 25,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.5,
      onUpdate: (idx) => {
        if (updatedThisRound.get() === true && idx > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && idx === 0) {
          if (textIdx.get() === textArrayRef.current.length - 1) {
            textIdx.set(0);
          } else {
            textIdx.set(textIdx.get() + 1);
          }
          updatedThisRound.set(true);
        }
      },
    });
    return () => animation.stop();
  }, [idx, updatedThisRound, textIdx, textRef]);
  return (
    <>
      <h1
        className={`${playfairDisplay.className} text-center text-muted-foreground tracking-tight text-3xl sm:text-4xl md:text-5xl xl:text-7xl`}
      >
        The{" "}
        <motion.span className="text-secondary-foreground">
          {displayText}
        </motion.span>{" "}
        <span className="block">Behind Modern Engineers (India)</span>
      </h1>
    </>
  );
}
