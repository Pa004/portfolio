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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s",
        background: scrolled || menuOpen ? "rgba(9,9,11,0.9)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled ? "0.5px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#f4f4f5",
            textDecoration: "none",
          }}
        >
          PD<span style={{ color: "#3b82f6" }}>.</span>
        </a>

        {/* Desktop links — hidden on mobile */}
        {!isMobile && (
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    fontSize: "13px",
                    color: "#a1a1aa",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                  }}
                >
                  {link.label[lang]}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Language toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px",
              borderRadius: "8px",
              border: "0.5px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {(["en", "es"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: "pointer",
                  border: "none",
                  fontFamily: "inherit",
                  background:
                    lang === l ? "rgba(59,130,246,0.2)" : "transparent",
                  color: lang === l ? "#93c5fd" : "#71717a",
                  outline:
                    lang === l ? "0.5px solid rgba(59,130,246,0.3)" : "none",
                  transition: "all 0.2s",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Hamburger — only on mobile */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "none",
                color: "#a1a1aa",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "rgba(9,9,11,0.97)",
              backdropFilter: "blur(12px)",
              borderBottom: "0.5px solid rgba(255,255,255,0.06)",
              padding: "20px 24px 24px",
            }}
          >
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontSize: "15px",
                      color: "#a1a1aa",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
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
