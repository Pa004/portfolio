"use client";

import { motion, useReducedMotion } from "framer-motion";

interface StaggerTextProps {
  text: string;
  style?: React.CSSProperties;
  as?: "h2" | "h3" | "span";
}

export default function StaggerText({ text, style, as: Tag = "h2" }: StaggerTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <Tag style={{ display: "flex", flexWrap: "wrap", gap: "0.3em", ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={reduced ? {} : { opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
