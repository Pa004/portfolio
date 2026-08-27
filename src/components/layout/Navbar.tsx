"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: { en: "About", es: "Sobre mí" }, href: "#about" },
  { label: { en: "Skills", es: "Skills" }, href: "#skills" },
  { label: { en: "Projects", es: "Proyectos" }, href: "#projects" },
  { label: { en: "Education", es: "Educación" }, href: "#education" },
  { label: { en: "Contact", es: "Contacto" }, href: "#contact" },
];

type Lang = "en" | "es";

const noopSubscribe = () => () => {};
const getMounted = () => true;
const getServerMounted = () => false;

const LANG_EVENT = "lang-change";

interface NavbarProps {
  lang: Lang;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function Navbar({ lang, theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const hasOpenedRef = useRef(false);
  const mounted = useSyncExternalStore(noopSubscribe, getMounted, getServerMounted);

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

  useEffect(() => {
    if (menuOpen) {
      hasOpenedRef.current = true;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      document.addEventListener("keydown", onKey);
      firstMenuLinkRef.current?.focus();
      return () => document.removeEventListener("keydown", onKey);
    }
    if (hasOpenedRef.current) hamburgerRef.current?.focus();
  }, [menuOpen]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s, backdrop-filter 0.3s, border-color 0.3s",
        background: scrolled || menuOpen ? (theme === "light" ? "rgba(248,250,252,0.9)" : "rgba(9,9,11,0.9)") : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled ? "0.5px solid var(--border)" : "none",
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
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          PD<span style={{ color: "var(--accent)" }}>.</span>
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
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    position: "relative",
                    paddingBottom: "2px",
                  }}
                >
                  {link.label[lang]}
                  <span
                    className="nav-underline"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      width: 0,
                      height: "1px",
                      background: "var(--accent)",
                      transition: "width 0.25s ease, left 0.25s ease",
                    }}
                  />
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
              border: "0.5px solid var(--border)",
              background: "var(--surface)",
            }}
          >
            {(["en", "es"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  localStorage.setItem("portfolio-lang", l);
                  window.dispatchEvent(new Event(LANG_EVENT));
                }}
                aria-pressed={lang === l}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: "pointer",
                  border: "none",
                  background:
                    lang === l ? "var(--badge-bg)" : "transparent",
                  color: lang === l ? "var(--accent-text)" : "var(--text-muted)",
                  boxShadow:
                    lang === l ? "inset 0 0 0 0.5px var(--badge-border)" : "none",
                  transition: "all 0.2s",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={lang === "es" ? "Cambiar tema" : "Toggle theme"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              borderRadius: "8px",
              border: "0.5px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: "14px",
            }}
          >
            {mounted ? (theme === "dark" ? "☀️" : "🌙") : null}
          </button>

          {/* Hamburger — only on mobile */}
          {isMobile && (
            <button
              ref={hamburgerRef}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={
                menuOpen
                  ? lang === "es"
                    ? "Cerrar menú"
                    : "Close menu"
                  : lang === "es"
                    ? "Abrir menú"
                    : "Open menu"
              }
              aria-controls="mobile-menu"
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "var(--card-bg)",
              backdropFilter: "blur(12px)",
              borderBottom: "0.5px solid var(--border)",
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
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    ref={index === 0 ? firstMenuLinkRef : undefined}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      fontSize: "15px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      fontWeight: 500,
                      padding: "8px 0",
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
