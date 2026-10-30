import type { MetadataRoute } from "next";
import { pibe } from "@/lib/pibe";

/** Sin dominio cargado en lib/pibe.ts el sitio es una vista previa: no se deja rastrear. */
export default function robots(): MetadataRoute.Robots {
  if (!pibe.domain) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${pibe.domain}/sitemap.xml` };
}
