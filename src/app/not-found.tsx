"use client";

import Link from "next/link";
import { gridBg } from "@/lib/styles";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#09090b",
        padding: "24px",
        ...gridBg,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "rgba(255,255,255,0.03)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        {/* Terminal title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            background: "rgba(255,255,255,0.02)",
            borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ fontSize: "12px", color: "#71717a", marginLeft: "8px", fontFamily: "monospace" }}>
            bash — 404
          </span>
        </div>

        {/* Terminal body */}
        <div style={{ padding: "24px", fontFamily: "monospace", fontSize: "13px" }}>
          <p style={{ color: "#a1a1aa", marginBottom: "8px" }}>
            <span style={{ color: "#3b82f6" }}>❯</span> cd /this/route
          </p>
          <p style={{ color: "#ef4444", marginBottom: "16px" }}>
            bash: cd: /this/route: No such file or directory
          </p>
          <p style={{ color: "#f4f4f5", fontWeight: 700, marginBottom: "8px" }}>
            $ Error 404 — Page not found
          </p>
          <p style={{ color: "#71717a", marginBottom: "24px", lineHeight: 1.6 }}>
            {/* The route you&apos;re looking for doesn&apos;t exist or has been moved. */}
          </p>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "8px",
              background: "#3b82f6",
              color: "#fff",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "inherit",
            }}
          >
            <span style={{ color: "#93c5fd" }}>❯</span> cd /home
          </Link>
        </div>
      </div>
    </main>
  );
}
