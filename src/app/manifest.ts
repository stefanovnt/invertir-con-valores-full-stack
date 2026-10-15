import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Invertir con Valores",
    short_name: "Invertir con Valores",
    description: "Inversión consciente para personas con valores.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1c92e1",
    lang: "es-ES",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
