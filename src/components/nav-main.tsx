"use client";

import navigationLinks from "@/config/links";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function NavMain() {
  const currentPath = usePathname();
  const currentPathIdx = useMemo(() => {
    let idx = 0;
    navigationLinks.forEach((link, i) => {
      if (link.url === "/") {
        idx = 0;
      } else if (currentPath.includes(link.url)) {
        idx = i;
      }
    });
    return idx;
  }, [currentPath]);
  const [selectedIdx, setSelectedIdx] = useState(currentPathIdx);
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);
  // this fixes the issue of when the `currentPath` changes, the selectedIdx should also change
  useEffect(() => {
    setSelectedIdx(currentPathIdx);
  }, [currentPathIdx]);

  return (
    <ul
      className="text-md hidden items-center md:flex md:gap-5 lg:text-lg"
      onMouseLeave={() => setFocusedIdx(null)}
      aria-label="primary navigation links"
    >
      {navigationLinks.map((link, idx) => (
        <li key={link.url} className="relative z-10">
          <Link
            href={link.url}
            className={`rounded-md p-2 outline-offset-[6px] outline-ring transition-all duration-150 ease-in-quad hover:text-foreground focus:text-foreground ${
              selectedIdx === idx
                ? "text-foreground font-medium"
                : "text-muted-foreground font-normal"
            }`}
            onClick={() => setSelectedIdx(idx)}
            onFocus={() => setFocusedIdx(idx)}
            onMouseEnter={() => setFocusedIdx(idx)}
            onKeyDown={(e) => (e.key === "Enter" ? setSelectedIdx(idx) : null)}
          >
            {idx === selectedIdx && (
              <span className="sr-only">Active Page Link</span>
            )}
            {link.name}
          </Link>
          {focusedIdx === idx && (
            <motion.div
              layoutId="bg-hover"
              className="absolute inset-[-3px] z-[-10] rounded-lg bg-muted md:inset-[-7px]"
              transition={{
                ease: "easeOut",
                duration: 0.18,
              }}
            />
          )}
          {selectedIdx === idx && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-[-24px] left-[-5px] right-[-5px] h-[2px] rounded-sm bg-primary lg:bottom-[-22px]"
              transition={{
                duration: 0.3,
              }}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
