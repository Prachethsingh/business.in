import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BUSINESS.IN — Bengaluru Commercial Location Simulator",
    short_name: "BUSINESS.IN",
    description:
      "Monte Carlo location intelligence & feasibility simulator for Bengaluru businesses and commercial real estate.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#00FF85",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-preview.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
