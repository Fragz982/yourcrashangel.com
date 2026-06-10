import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const dynamic = "force-static";
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#ff4d2e",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            marginBottom: 20,
          }}
        >
          yourcrashangel
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#fafafa",
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          JUST GOT HIT?
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#c7ff3c",
            lineHeight: 1,
            marginBottom: 32,
          }}
        >
          DON&apos;T PANIC.
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#71717a",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Real collision estimator in LA. Free, honest advice on your car and
          your insurance claim.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              background: "#ff4d2e",
              color: "#0a0a0a",
              padding: "12px 28px",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            Text: (213) 279-2992
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
