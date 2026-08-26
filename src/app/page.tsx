"use client";

import { useState, useSyncExternalStore } from "react";
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

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerTheme);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", next);
    document.documentElement.setAttribute("data-theme", next);
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <main data-theme={theme} style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", transition: "background 0.3s, color 0.3s" }}>
      <MouseSpotlight />
      <Navbar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
      <Hero lang={lang} />
      <About lang={lang} />
      <Skills lang={lang} />
      <Projects lang={lang} />
      <Education lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}