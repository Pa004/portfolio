"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

type Lang = "en" | "es";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <main style={{ minHeight: "100vh", background: "#09090b" }}>
      <Navbar lang={lang} setLang={setLang} />
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