"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const THEME_EVENT = "theme-change";
const THEME_COLORS = {
  dark: "#09090b",
  light: "#f8fafc",
} as const;

function subscribeTheme(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function getThemeSnapshot(): Theme {
  return localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark";
}

const getServerTheme = (): Theme => "dark";

export default function ThemeColor() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerTheme);

  useEffect(() => {
    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = THEME_COLORS[theme];
  }, [theme]);

  return null;
}
