"use client";

import { useSyncExternalStore } from "react";
import { Toaster } from "sonner";

type Theme = "dark" | "light";

const THEME_EVENT = "theme-change";

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

const getServerSnapshot = (): Theme => "dark";

export default function ThemeToaster() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <Toaster
      position="bottom-right"
      theme={theme}
      toastOptions={{
        style:
          theme === "light"
            ? {
                background: "rgba(255,255,255,0.95)",
                border: "0.5px solid rgba(67,56,202,0.3)",
                color: "#0f172a",
              }
            : {
                background: "rgba(9,9,11,0.95)",
                border: "0.5px solid rgba(91,140,255,0.3)",
                color: "#f4f4f5",
              },
      }}
    />
  );
}
