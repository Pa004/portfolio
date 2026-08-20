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

const SectionDivider = () => (
  <div style={{
    height: "1px",
    background: "linear-gradient(to right, transparent, rgba(59,130,246,0.15), transparent)",
    margin: "0 24px"
  }} />
);

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <main style={{ minHeight: "100vh", background: "#09090b" }}>
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <SectionDivider />
      <About lang={lang} />
      <SectionDivider />
      <Skills lang={lang} />
      <SectionDivider />
      <Projects lang={lang} />
      <SectionDivider />
      <Education lang={lang} />
      <SectionDivider />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}