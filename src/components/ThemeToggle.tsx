"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/lib/useTheme";

export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
    >
      <span className="sr-only">Toggle theme</span>
      {mounted && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isDark ? (
            <>
              <circle cx="12" cy="12" r="4.2" />
              <line x1="12" y1="1.6" x2="12" y2="3.6" />
              <line x1="12" y1="20.4" x2="12" y2="22.4" />
              <line x1="1.6" y1="12" x2="3.6" y2="12" />
              <line x1="20.4" y1="12" x2="22.4" y2="12" />
            </>
          ) : (
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          )}
        </svg>
      )}
    </motion.button>
  );
}
