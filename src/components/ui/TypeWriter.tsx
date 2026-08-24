"use client";

import { useState, useEffect, useRef } from "react";

const roles = {
  en: ["Full Stack Developer", "Frontend Engineer", "AI Enthusiast", "Flutter Developer"],
  es: ["Desarrollador Full Stack", "Ingeniero Frontend", "Entusiasta de IA", "Desarrollador Flutter"],
};

interface TypeWriterProps {
  lang: "en" | "es";
}

function TypeWriterInner({ lang }: TypeWriterProps) {
  const [text, setText] = useState("");
  const indexRef    = useRef(0);
  const charIndexRef = useRef(0);
  const deletingRef = useRef(false);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function tick() {
      const words = roles[lang];
      const word  = words[indexRef.current];
      const ci    = charIndexRef.current;
      const del   = deletingRef.current;
      const delay = del ? 40 : ci === word.length ? 1800 : 80;

      timerRef.current = setTimeout(() => {
        if (!del) {
          const next = ci + 1;
          setText(word.slice(0, next));
          charIndexRef.current = next;
          if (next === word.length) deletingRef.current = true;
        } else {
          const next = ci - 1;
          setText(word.slice(0, next));
          charIndexRef.current = next;
          if (next === 0) {
            deletingRef.current = false;
            indexRef.current = (indexRef.current + 1) % words.length;
          }
        }
        tick();
      }, delay);
    }

    tick();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [lang]);

  return (
    <span aria-hidden="true" style={{ color: "var(--accent-cyan-text)", fontWeight: 500 }}>
      {text}
      <span style={{
        display: "inline-block", width: "2px", height: "20px",
        background: "var(--accent-cyan-text)", marginLeft: "2px",
        verticalAlign: "middle", animation: "blink 2s infinite",
      }} />
    </span>
  );
}

export default function TypeWriter({ lang }: TypeWriterProps) {
  return <TypeWriterInner key={lang} lang={lang} />;
}