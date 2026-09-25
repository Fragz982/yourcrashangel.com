import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import BottomBarGate from "../components/BottomBarGate";
import "./globals.css";

// Outfit: the one face for the whole site, the same as Angel's EstimateGuard
// and ReviewEngine apps. Heavy and tight for display, regular for reading.
// It is also the hero LCP text, so preload it.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Car Accident Help & Free Collision Estimate Advice in LA | yourcrashangel",
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

export const viewport: Viewport = {
  themeColor: "#eeebe6",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={outfit.variable}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <BottomBarGate />
      </body>
    </html>
  );
}
