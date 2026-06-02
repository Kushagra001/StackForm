import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#080810",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 32 32"
          fill="none"
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
      </div>
    ),
    {
      ...size,
    }
  );
}
