import type { Metadata, Viewport } from "next";
import { PibeIntro } from "@/components/pibe/intro";
import { PibeHeader } from "@/components/pibe/header";
import { PibeHero } from "@/components/pibe/hero";
import { About } from "@/components/pibe/about";
import { Services } from "@/components/pibe/services";
import { Calculator } from "@/components/pibe/calculator";
import { Equipos } from "@/components/pibe/equipos";
import { Process } from "@/components/pibe/process";
import { Works } from "@/components/pibe/works";
import { Prices } from "@/components/pibe/prices";
import { Faq } from "@/components/pibe/faq";
import { PibeContact } from "@/components/pibe/contact";
import { PibeFooter } from "@/components/pibe/footer";
import { PibeMobileCta } from "@/components/pibe/mobile-cta";
import { PanelEntrance } from "@/components/panel-entrance";
import { pibe } from "@/lib/pibe";
import { archivo } from "@/app/font";
import "./pibe.css";

/* Propuesta para mostrarle a Matías. No se indexa: es una vista previa. */
export const metadata: Metadata = {
  title: `${pibe.name} | Paneles y termotanques solares en ${pibe.zone}`,
  description: pibe.description,
  robots: { index: false, follow: false },
  openGraph: {
    title: `${pibe.name} | Paneles y termotanques solares`,
    description: pibe.description,
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e2240",
};

export default function PibeHome() {
  return (
    <div className={`pa ${archivo.variable}`}>
      <PibeIntro />
      <PibeHeader />
      {/* El orden sigue las preguntas de un vecino que no es técnico, un capítulo por pregunta:
          1. ¿Qué es esto? El sol sobre un techo como el mío y los cuatro servicios.
          2. ¿Quién viene a casa? Matías, en primera persona.
          3. ¿Qué hace exactamente? El corte de la casa, pieza por pieza.
          4. ¿Cuánto necesito? La calculadora, con su factura.
          4b. ¿Cómo es lo que me ponen? Los equipos en 3D, con sus partes.
          5. ¿Cómo es el proceso? De sol a sol.
          6. ¿Lo hizo antes? Sus trabajos.
          7. ¿Cuánto sale y cómo pago? Precios de referencia y formas de pago.
          8. Dudas sueltas, y el contacto. */}
      <main>
        <PibeHero />
        <About />
        <Services />
        <Calculator />
        <Equipos />
        <Process />
        <Works />
        <Prices />
        <Faq />
        <PibeContact />
      </main>
      <PibeFooter />
      <PibeMobileCta />
      <PanelEntrance />
    </div>
  );
}
