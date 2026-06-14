"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    const styles = {
      title:   "color: #3b82f6; font-size: 18px; font-weight: bold; font-family: monospace;",
      subtitle:"color: #06b6d4; font-size: 12px; font-family: monospace;",
      normal:  "color: #a1a1aa; font-size: 11px; font-family: monospace;",
      green:   "color: #22c55e; font-size: 11px; font-family: monospace;",
      purple:  "color: #a78bfa; font-size: 11px; font-family: monospace;",
    };

    console.log(
      `%c
██████╗  █████╗ ██████╗ ██╗      ██████╗ 
██╔══██╗██╔══██╗██╔══██╗██║     ██╔═══██╗
██████╔╝███████║██████╔╝██║     ██║   ██║
██╔═══╝ ██╔══██║██╔══██╗██║     ██║   ██║
██║     ██║  ██║██████╔╝███████╗╚██████╔╝
╚═╝     ╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝ 
      `,
      styles.title
    );
    console.log("%c👋 Hey there, fellow developer!", styles.subtitle);
    console.log("%c ", "");
    console.log("%c📍 Pablo Domínguez — Software Engineering @ ESPE", styles.normal);
    console.log("%c🚀 Full Stack Developer · AI Enthusiast · Flutter Dev", styles.normal);
    console.log("%c ", "");
    console.log("%c🛠️  Stack:", styles.purple);
    console.log("%c   React · Next.js · Node.js · Flutter · Python · TensorFlow", styles.green);
    console.log("%c ", "");
    console.log("%c📬 Let's connect:", styles.subtitle);
    console.log("%c   pablodo004@gmail.com", styles.green);
    console.log("%c   github.com/Pa004", styles.green);
    console.log("%c   linkedin.com/in/pablo-domínguez-445241385", styles.green);
    console.log("%c ", "");
    console.log("%c💡 If you're reading this, you're probably a developer too.", styles.normal);
    console.log("%c   Let's build something awesome together! 🔥", styles.subtitle);
  }, []);

  return null;
}