import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AVIF primero (bastante más liviano que WebP en fotos de obra); WebP para el resto.
  images: { formats: ["image/avif", "image/webp"] },
  // La propuesta vivía en /pibe-del-aire: los enlaces viejos llevan a la raíz.
  redirects() {
    return [{ source: "/pibe-del-aire", destination: "/", permanent: false }];
  },
};

export default nextConfig;
