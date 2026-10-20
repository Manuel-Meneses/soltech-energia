import type { Metadata, Viewport } from "next";
import { pibe } from "@/lib/pibe";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: pibe.name,
  description: pibe.description,
};

export const viewport: Viewport = {
  themeColor: "#0e2240",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className="antialiased">
      <body className="min-h-dvh">{children}</body>
      <Analytics />
    </html>
  );
}
