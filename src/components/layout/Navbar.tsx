"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: { en: "About", es: "Sobre mí" }, href: "#about" },
  { label: { en: "Skills", es: "Skills" }, href: "#skills" },
  { label: { en: "Projects", es: "Proyectos" }, href: "#projects" },
  { label: { en: "Education", es: "Educación" }, href: "#education" },
  { label: { en: "Contact", es: "Contacto" }, href: "#contact" },
];

type Lang = "en" | "es";

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090b]/90 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
            href="#"
            className="text-sm font-bold tracking-tight text-zinc-100 hover:text-white transition-colors"
        >
            PD<span className="text-[#3b82f6]">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
                <a
                    href={link.href}
                    className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors duration-200 tracking-wide"
                >
                    {link.label[lang]}
                </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex items-center gap-1 p-1 rounded-md border border-white/[0.08] bg-white/[0.02]">
            {(["en", "es"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all duration-200 cursor-pointer ${
                  lang === l
                    ? "bg-[#3b82f6]/20 text-[#93c5fd] border border-[#3b82f6]/30"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#09090b]/95 backdrop-blur-md border-b border-white/[0.06] px-6 py-4"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                    <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                    >
                        {link.label[lang]}
                    </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}