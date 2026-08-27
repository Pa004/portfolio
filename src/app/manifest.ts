import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pablo Domínguez — Full Stack Developer",
    short_name: "Pablo Domínguez",
    description:
      "Software Engineering student at ESPE. Building modern web experiences and intelligent systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/icon",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
