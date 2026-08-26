"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import MouseSpotlight from "@/components/ui/MouseSpotlight";

type Lang = "en" | "es";
type Theme = "dark" | "light";

const THEME_EVENT = "theme-change";

function subscribeTheme(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function getThemeSnapshot(): Theme {
  return localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark";
}

const getServerTheme = (): Theme => "dark";

const LANG_EVENT = "lang-change";

function subscribeLang(onChange: () => void) {
  window.addEventListener(LANG_EVENT, onChange);
  return () => window.removeEventListener(LANG_EVENT, onChange);
}

function getLangSnapshot(): Lang {
  const stored = localStorage.getItem("portfolio-lang");
  return stored === "es" ? "es" : "en";
}

const getServerLang = (): Lang => "en";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerTheme);

  useEffect(() => {
    const stored = getLangSnapshot();
    if (stored !== lang) setLang(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("portfolio-lang", lang);
    window.dispatchEvent(new Event(LANG_EVENT));
  }, [lang]);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", next);
    document.documentElement.setAttribute("data-theme", next);
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <main data-theme={theme} style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", transition: "background 0.3s, color 0.3s" }}>
      <a
        href="#main-content"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
        onFocus={(e) => {
          e.currentTarget.style.position = "fixed";
          e.currentTarget.style.left = "24px";
          e.currentTarget.style.top = "24px";
          e.currentTarget.style.width = "auto";
          e.currentTarget.style.height = "auto";
          e.currentTarget.style.overflow = "visible";
          e.currentTarget.style.zIndex = "9999";
          e.currentTarget.style.background = "var(--accent)";
          e.currentTarget.style.color = "var(--accent-btn-text)";
          e.currentTarget.style.padding = "12px 24px";
          e.currentTarget.style.borderRadius = "8px";
          e.currentTarget.style.fontSize = "14px";
          e.currentTarget.style.fontWeight = "600";
          e.currentTarget.style.textDecoration = "none";
          e.currentTarget.style.fontFamily = "var(--font-geist-sans)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.position = "absolute";
          e.currentTarget.style.left = "-9999px";
          e.currentTarget.style.top = "auto";
          e.currentTarget.style.width = "1px";
          e.currentTarget.style.height = "1px";
          e.currentTarget.style.overflow = "hidden";
        }}
      >
        Saltar al contenido
      </a>
      <MouseSpotlight />
      <Navbar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
      <div id="main-content" tabIndex={-1}>
        <Hero lang={lang} />
        <About lang={lang} />
        <Skills lang={lang} />
        <Projects lang={lang} />
        <Education lang={lang} />
        <Contact lang={lang} />
        <Footer lang={lang} />
      </div>
    </main>
  );
}
