"use client";

import { useState } from "react";
import Link from "next/link";
import { gridBg } from "@/lib/styles";

type Lang = "en" | "es";

export default function Error({ reset }: { reset: () => void }) {
  const [lang] = useState<Lang>(() =>
    typeof window !== "undefined" &&
    window.localStorage.getItem("portfolio-lang") === "es"
      ? "es"
      : "en"
  );

  const content =
    lang === "es"
      ? {
          heading: "$ Error — Something went wrong",
          body: "No se pudo renderizar la página. Intenta recargar o vuelve al inicio.",
          retry: "Reintentar",
          home: "⌂ /home",
        }
      : {
          heading: "$ Error — Something went wrong",
          body: "The page could not be rendered. Try reloading or go back home.",
          retry: "Try again",
          home: "⌂ /home",
        };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        padding: "24px",
        ...gridBg,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "var(--surface)",
          border: "0.5px solid var(--border)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            background: "var(--surface)",
            borderBottom: "0.5px solid var(--border)",
          }}
        >
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "8px", fontFamily: "monospace" }}>
            bash — 500
          </span>
        </div>

        <div style={{ padding: "24px", fontFamily: "monospace", fontSize: "13px" }}>
          <p style={{ color: "#ef4444", marginBottom: "16px" }}>
            {content.heading}
          </p>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px", lineHeight: 1.6 }}>
            {content.body}
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                background: "var(--accent)",
                color: "var(--accent-btn-text)",
                border: "none",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {content.retry}
            </button>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "0.5px solid var(--border)",
                color: "var(--text)",
                textDecoration: "none",
                fontSize: "13px",
                fontFamily: "inherit",
              }}
            >
              {content.home}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
