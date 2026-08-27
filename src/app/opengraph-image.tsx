import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";

export const runtime = "edge";
export const alt     = "Pablo Domínguez — Full Stack Developer";
export const size    = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%",
        background: "#09090b",
        display: "flex", flexDirection: "column",
        alignItems: "flex-start", justifyContent: "center",
        padding: "80px",
        fontFamily: "sans-serif",
        position: "relative",
      }}>
        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        {/* Glow */}
        <div style={{
          position: "absolute", top: "-100px", right: "-100px",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />

        {/* Badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 16px", borderRadius: "20px",
          border: "1px solid rgba(59,130,246,0.3)",
          background: "rgba(59,130,246,0.1)",
          marginBottom: "28px",
        }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ fontSize: "14px", color: "#93c5fd" }}>Available for opportunities</span>
        </div>

        {/* Name */}
        <div style={{ fontSize: "72px", fontWeight: 900, letterSpacing: "-3px", lineHeight: 1, marginBottom: "16px", display: "flex" }}>
          <span style={{ color: "#f4f4f5" }}>Pablo </span>
          <span style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)", WebkitBackgroundClip: "text", color: "transparent" }}>Domínguez</span>
          <span style={{ color: "#3b82f6" }}>.</span>
        </div>

        {/* Role */}
        <div style={{ fontSize: "24px", color: "#71717a", marginBottom: "40px" }}>
          Full Stack Developer · Software Engineering @ ESPE
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {["React", "Next.js", "Node.js", "Flutter", "Python", "TypeScript"].map(tag => (
            <div key={tag} style={{
              padding: "6px 14px", borderRadius: "6px",
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              fontSize: "14px", color: "#93c5fd",
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom right — URL */}
        <div style={{
          position: "absolute", bottom: "48px", right: "80px",
          fontSize: "14px", color: "#3f3f46", fontFamily: "monospace",
        }}>
          {new URL(SITE_URL).host}
        </div>
      </div>
    ),
    { ...size }
  );
}