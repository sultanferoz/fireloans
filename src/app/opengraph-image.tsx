import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background:
            "radial-gradient(130% 120% at 20% 15%, #0d3a2b 0%, #082a1f 45%, #051710 75%, #020b07 100%)",
        }}
      >
        <svg width="260" height="34" viewBox="0 0 260 34" style={{ marginBottom: 18 }}>
          <path d="M4 28 Q130 -10 256 28" fill="none" stroke="#D8BD85" strokeWidth={4} strokeLinecap="round" />
        </svg>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, fontFamily: "Georgia, serif" }}>
          <span style={{ color: "#ffffff" }}>F.I.R.E&nbsp;</span>
          <span style={{ color: "#00B389" }}>LOANS</span>
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 30,
            color: "#D8BD85",
            fontFamily: "Georgia, serif",
            letterSpacing: 1,
          }}
        >
          Helping Australians Achieve Financial Independence
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 22,
            color: "rgba(255,255,255,0.65)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Australian Mortgage &amp; Finance Broker
        </div>
      </div>
    ),
    { ...size }
  );
}
