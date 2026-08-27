"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

interface RevealSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export default function RevealSection({
  children,
  delay = 0,
  direction = "up",
}: RevealSectionProps) {
  const reduced = useReducedMotion();

  const variants: Variants = reduced
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: {
          opacity: 0,
          y: direction === "up" ? 40 : 0,
          x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
