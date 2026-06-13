"use client";

import { useState, useEffect } from "react";

const roles = {
  en: [
    "Full Stack Developer",
    "Frontend Engineer",
    "AI Enthusiast",
    "Flutter Developer",
  ],
  es: [
    "Desarrollador Full Stack",
    "Ingeniero Frontend",
    "Entusiasta de IA",
    "Desarrollador Flutter",
  ],
};

interface TypeWriterProps {
  lang: "en" | "es";
}

export default function TypeWriter({ lang }: TypeWriterProps) {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    setIndex(0);
    setCharIndex(0);
    setDeleting(false);
    setText("");
  }, [lang]);

  useEffect(() => {
    const words = roles[lang];
    const word = words[index];
    const delay = deleting ? 40 : charIndex === word.length ? 1800 : 80;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        if (charIndex + 1 === word.length) setDeleting(true);
      } else {
        setText(word.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, index, lang]);

  return (
    <span className="text-[#06b6d4] font-medium">
      {text}
      <span className="animate-blink ml-0.5 inline-block w-0.5 h-5 bg-[#06b6d4] align-middle" />
    </span>
  );
}