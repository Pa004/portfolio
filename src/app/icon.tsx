import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "112px",
          border: "24px solid rgba(91,140,255,0.3)",
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            fontSize: "280px",
            fontWeight: 900,
            background: "linear-gradient(135deg, #5b8cff, #06b6d4)",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: 1,
          }}
        >
          P
        </span>
      </div>
    ),
    { ...size }
  );
}
