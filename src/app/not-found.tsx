"use client";

import Link from "next/link";
import { gridBg } from "@/lib/styles";
import TerminalBar from "@/components/ui/TerminalBar";

export default function NotFound() {
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
        {/* Terminal title bar */}
        <TerminalBar label="bash — 404" />

        {/* Terminal body */}
        <div style={{ padding: "24px", fontFamily: "monospace", fontSize: "13px" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: "8px" }}>
            <span style={{ color: "var(--accent)" }}>❯</span> cd /this/route
          </p>
          <p style={{ color: "#ef4444", marginBottom: "16px" }}>
            bash: cd: /this/route: No such file or directory
          </p>
          <p style={{ color: "var(--text)", fontWeight: 700, marginBottom: "8px" }}>
            $ Error 404 — Page not found
          </p>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "8px",
              background: "var(--accent)",
              color: "var(--accent-btn-text)",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "inherit",
            }}
          >
            <span style={{ color: "var(--accent-text)" }}>❯</span> cd /home
          </Link>
        </div>
      </div>
    </main>
  );
}
