import type { MetadataRoute } from "next";
import { pibe } from "@/lib/pibe";

/** Una sola página. Sin dominio cargado en lib/pibe.ts no hay dirección que listar. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!pibe.domain) return [];
  return [{ url: pibe.domain, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
