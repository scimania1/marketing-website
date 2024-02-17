"use client";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ease: "easeOut", duration: 0.4 }}
      className="flex flex-col flex-1 flex-grow"
    >
      {children}
    </motion.div>
  );
}
