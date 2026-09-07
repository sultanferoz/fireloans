import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#051710",
          color: "#D8BD85",
        }}
      >
        <svg width="90" height="14" viewBox="0 0 90 14" style={{ marginBottom: 6 }}>
          <path d="M2 12 Q45 -4 88 12" fill="none" stroke="#D8BD85" strokeWidth={3} strokeLinecap="round" />
        </svg>
        <div style={{ fontSize: 96, fontWeight: 700, fontFamily: "Georgia, serif", lineHeight: 1 }}>F</div>
      </div>
    ),
    { ...size }
  );
}
