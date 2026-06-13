import type { Metadata } from "next";
import { Space_Grotesk, Inter, Anton, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Anton — the heavy condensed display face that drives the cinematic
// headline treatment (single weight, designed for uppercase).
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

// JetBrains Mono — technical/spec voice: eyebrows, chips, stats, claim data.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "yourcrashangel — The Accident Translator | Los Angeles",
  description:
    "Just got hit? Angel is a real collision estimator in LA who explains what's actually going on with your car and your insurance claim. Free, honest, no BS.",
  keywords: [
    "car accident help",
    "collision estimator",
    "Los Angeles body shop",
    "insurance claim help",
    "auto body estimate",
    "car crash what to do",
    "yourcrashangel",
    "accident translator",
  ],
  authors: [{ name: "yourcrashangel" }],
  creator: "yourcrashangel",
  metadataBase: new URL("https://yourcrashangel.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourcrashangel.com",
    siteName: "yourcrashangel",
    title: "yourcrashangel — The Accident Translator",
    description:
      "Just got hit? I'll tell you what's really going on — free. Real collision estimator in LA, no jargon, no sales pressure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "yourcrashangel — The Accident Translator",
    description:
      "Just got hit? I'll tell you what's really going on — free.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${anton.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
