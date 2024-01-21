"use client";

import { cn } from "@/lib/utils";
import {
  useMotionValue,
  useTransform,
  motion,
  animate,
  useInView,
} from "framer-motion";
import { useEffect, useRef } from "react";

export default function NumberCount({
  start,
  end,
  duration,
  className,
}: {
  start: number;
  end: number;
  duration: number;
  className?: string;
}) {
  const count = useMotionValue(start);
  const rounded = useTransform(count, Math.round);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, end, { duration });
      return animation.stop;
    } else {
      count.set(1);
    }
  }, [count, end, isInView, duration]);

  return (
    <motion.span className={cn(className)} ref={ref}>
      {rounded}
    </motion.span>
  );
}
