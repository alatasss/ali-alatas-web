"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/ali.alatas" },
  { label: "Twitter", href: "https://twitter.com/alialatas" },
  { label: "GitHub", href: "https://github.com/alialatas" },
];

export default function MenuButton() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const navItems = [
    { href: "#categories", label: "Explore" },
    { href: "/the-polymath-note", label: "Note" },
    { href: "https://logbook-alataasss.vercel.app", external: true, label: "Logbook" },
    { href: "https://tillnite-studio.web.app", external: true, label: "Studio" },
    { href: "/the-map", label: "Map" },
  ];

  return (
    <>
      {/* Main header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Left - Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`font-sf text-lg font-bold tracking-tight ${
              isScrolled ? "text-gray-800" : "text-gray-700"
            }`}
          >
            AA
          </motion.a>

          {/* Center - Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`rounded-full px-4 py-2 font-sf text-sm transition-all ${
                  isScrolled
                    ? "text-gray-600 hover:bg-gray-100"
                    : "text-gray-600 hover:bg-white/50"
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right - Social & Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 md:flex">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full px-3 py-1.5 font-sf text-xs font-medium transition-all ${
                    isScrolled
                      ? "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      : "text-gray-500 hover:bg-white/50"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all md:hidden ${
                isScrolled
                  ? "bg-gray-100 text-gray-700"
                  : "bg-white/50 text-gray-600"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.svg
                    key="close"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-gradient-to-br from-white via-pink-50 to-purple-50 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="flex h-full flex-col items-center justify-center gap-4 px-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-6 text-center"
              >
                <h2 className="text-2xl font-bold text-gray-800">Ali Alatas</h2>
                <p className="text-sm text-gray-500">Polymath & Creative</p>
              </motion.div>

              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  whileHover={{ x: 10 }}
                  className="w-full max-w-xs rounded-2xl bg-white/60 px-6 py-4 text-center font-sf text-lg font-medium text-gray-700 backdrop-blur transition-all hover:bg-white/80"
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex gap-4"
              >
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="rounded-full bg-white/60 px-4 py-2 font-sf text-sm text-gray-600 backdrop-blur transition-all hover:bg-white/80"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
