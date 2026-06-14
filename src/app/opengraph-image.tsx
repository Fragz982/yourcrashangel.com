import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = {
  width: 1200,
  height: 630,
};

export const alt =
  "yourcrashangel — Just got hit? Take a breath. Calm, free help from a real LA collision estimator.";
export const dynamic = "force-static";
export const contentType = "image/png";

export default async function OGImage() {
  const [anton, inter] = await Promise.all([
    readFile(join(process.cwd(), "src/app/_ogfonts/Anton.ttf")),
    readFile(join(process.cwd(), "src/app/_ogfonts/Inter-500.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#f7f2e9",
          backgroundImage:
            "radial-gradient(900px 520px at 78% -8%, rgba(255,184,92,0.45), rgba(255,184,92,0) 60%)",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#b0541f",
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            marginBottom: 22,
          }}
        >
          Your crash angel · Los Angeles
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Anton",
            fontSize: 112,
            color: "#211a14",
            lineHeight: 0.95,
            textTransform: "uppercase" as const,
          }}
        >
          Just got hit?
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Anton",
            fontSize: 112,
            color: "#e8431f",
            lineHeight: 0.95,
            textTransform: "uppercase" as const,
            marginBottom: 30,
          }}
        >
          Take a breath.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#6b5d4d",
            maxWidth: 760,
            lineHeight: 1.4,
          }}
        >
          Calm, honest help with your car and your insurance claim — from a real
          LA collision estimator. Always free.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 64,
            right: 90,
            display: "flex",
            background: "#e8431f",
            color: "#f7f2e9",
            padding: "14px 30px",
            borderRadius: 999,
            fontSize: 24,
          }}
        >
          Text: (213) 279-2992
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Anton", data: anton, style: "normal", weight: 400 },
        { name: "Inter", data: inter, style: "normal", weight: 500 },
      ],
    }
  );
}
