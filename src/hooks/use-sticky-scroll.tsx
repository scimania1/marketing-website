"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import React from "react";

export default function useStickyScroll(ref: React.RefObject<HTMLElement>) {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const getRelativeHeights = React.useCallback(() => {
    const stickyScrollElements = document.querySelectorAll(
      "[data-sticky-scroll-item]",
    );
    let relativeHeights: number[] = [0];
    for (let i = 1; i < stickyScrollElements.length; ++i) {
      const h =
        stickyScrollElements[i].getBoundingClientRect().height /
        ref.current!.clientHeight;
      relativeHeights.push(h + relativeHeights[i - 1]);
    }
    return relativeHeights;
  }, [ref]);
  useMotionValueEvent(scrollYProgress, "change", (latestValue) => {
    const relativeHeights = getRelativeHeights();
    let idx = 0;
    for (let i = 0; i < relativeHeights.length; ++i) {
      const distance = Math.abs(latestValue - relativeHeights[i]);
      if (distance < Math.abs(latestValue - relativeHeights[idx])) {
        idx = i;
      }
    }
    setActiveIdx(idx);
  });
  return activeIdx;
}
