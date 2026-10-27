import type { Metadata, Viewport } from "next";
import { pibe } from "@/lib/pibe";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: pibe.name,
  description: pibe.description,
  // Base de las direcciones completas (imagen para compartir, canónica), también para la 404.
  ...(pibe.domain && { metadataBase: new URL(pibe.domain) }),
};

export const viewport: Viewport = {
  themeColor: "#172331",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className="antialiased">
      <body className="min-h-dvh">{children}</body>
      <Analytics />
    </html>
  );
}
