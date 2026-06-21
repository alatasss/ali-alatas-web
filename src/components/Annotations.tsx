"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const ACCENT = "#5CE1E6";

/* Block highlight — accent background behind the text that wipes in.
   Uses box-decoration-clone so it wraps cleanly across multiple lines. */
export function Highlight({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease, delay }}
      style={{
        backgroundImage: `linear-gradient(${ACCENT}, ${ACCENT})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        WebkitBoxDecorationBreak: "clone",
        boxDecorationBreak: "clone",
      }}
      className="px-1.5 py-0.5 text-ink"
    >
      {children}
    </motion.span>
  );
}
