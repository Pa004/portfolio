"use client";

import { motion } from "framer-motion";
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
  const variants = {
    hidden: {
      opacity: 0,
      y:  direction === "up"    ?  40 : 0,
      x:  direction === "left"  ? -40 : direction === "right" ? 40 : 0,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
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