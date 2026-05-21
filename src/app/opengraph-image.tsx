import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Stackform: I build systems that grow your business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080810",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle high-tech grid overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.15,
            backgroundImage:
              "linear-gradient(to right, #4f6ef7 1px, transparent 1px), linear-gradient(to bottom, #4f6ef7 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Outer glowing aura sphere */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,110,247,0.2) 0%, rgba(99,102,241,0.05) 50%, transparent 100%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Central Brand Box */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {/* Logo Icon (SVG Isometric Stack) */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 32 32"
            fill="none"
            style={{ marginBottom: "28px" }}
          >
            {/* Bottom Layer */}
            <path
              d="M16 26.5L6 21.5L16 16.5L26 21.5L16 26.5Z"
              fill="#4f6ef7"
              fillOpacity="0.12"
              stroke="#4f6ef7"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            {/* Middle Layer */}
            <path
              d="M16 20.5L6 15.5L16 10.5L26 15.5L16 20.5Z"
              fill="#4f6ef7"
              fillOpacity="0.35"
              stroke="#4f6ef7"
              strokeWidth="1.2"
              strokeOpacity="0.65"
            />
            {/* Top Layer */}
            <path
              d="M16 14.5L6 9.5L16 4.5L26 9.5L16 14.5Z"
              fill="#6366f1"
              stroke="#f0f0ff"
              strokeWidth="1.5"
            />
            {/* Glowing Core */}
            <circle cx="16" cy="9.5" r="2.5" fill="#ffffff" />
          </svg>

          {/* Agency Name */}
          <span
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              marginBottom: "16px",
            }}
          >
            Stackform
          </span>

          {/* Tagline */}
          <span
            style={{
              fontSize: "24px",
              fontWeight: 500,
              color: "#c5c5e0",
              maxWidth: "600px",
              textAlign: "center",
              lineHeight: "1.4",
              marginBottom: "48px",
            }}
          >
            I build systems that grow your business.
          </span>
        </div>

        {/* Footer Brand Info */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "0 80px",
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: "14px", color: "#6366f1", fontWeight: 600 }}>
            stack-form.dev
          </span>
          <span style={{ fontSize: "14px", color: "#475569" }}>
            Web Development &amp; Automation
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
