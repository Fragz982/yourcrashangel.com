import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "yourcrashangel — The Accident Translator",
    short_name: "yourcrashangel",
    description:
      "Just got hit? A real collision estimator in LA who explains your car and your insurance claim — free, honest, no BS.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
