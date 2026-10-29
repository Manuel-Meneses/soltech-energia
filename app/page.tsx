import type { Metadata, Viewport } from "next";
import { PibeHeader } from "@/components/pibe/header";
import { PibeHero } from "@/components/pibe/hero";
import { Works } from "@/components/pibe/works";
import { Videos } from "@/components/pibe/videos";
import { Services } from "@/components/pibe/services";
import { Backup } from "@/components/pibe/backup";
import { Pools } from "@/components/pibe/pools";
import { Calculator } from "@/components/pibe/calculator";
import { Process } from "@/components/pibe/process";
import { About } from "@/components/pibe/about";
import { Business } from "@/components/pibe/business";
import { Faq } from "@/components/pibe/faq";
import { PibeContact } from "@/components/pibe/contact";
import { PibeFooter } from "@/components/pibe/footer";
import { PibeMobileCta } from "@/components/pibe/mobile-cta";
import { SectionEntrance } from "@/components/section-entrance";
import { pibe, services } from "@/lib/pibe";
import { archivo } from "@/app/font";
import "./pibe.css";

/* Sitio de Soltech Energía. Sin dominio cargado en lib/pibe.ts es una vista previa y no se indexa. */
export const metadata: Metadata = {
  title: `${pibe.name} | Sistemas fotovoltaicos, baterías y climatización de piscinas en todo el país`,
  description: pibe.description,
  ...(pibe.domain && { alternates: { canonical: "/" } }),
  robots: pibe.domain ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: `${pibe.name} | Energía solar a tu medida`,
    description: pibe.description,
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#172331",
};

/** Ficha de negocio local para Google, con los mismos datos de lib/pibe.ts. */
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: pibe.name,
  description: pibe.description,
  ...(pibe.domain && { url: pibe.domain, image: `${pibe.domain}/opengraph-image.jpg` }),
  ...((pibe.phone ?? pibe.whatsapp) && { telephone: `+${pibe.phone ?? pibe.whatsapp}` }),
  ...(pibe.email && { email: pibe.email }),
  ...(pibe.instagram && { sameAs: [`https://instagram.com/${pibe.instagram}`] }),
  address: { "@type": "PostalAddress", addressRegion: pibe.zone, addressCountry: "AR" },
  areaServed: { "@type": "Country", name: "Argentina" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.body },
    })),
  },
};

export default function PibeHome() {
  return (
    <div className={`pa ${archivo.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }}
      />
      <PibeHeader />
      {/* El orden lleva a quien llega con la factura en la mano hasta el WhatsApp:
          1. Qué gano y por qué confiar: el hero, con un solo botón.
          2. La prueba antes de pedir nada: obras propias, en fotos y en un video.
          3. Qué hacen: qué sistema va con tu lugar (on-grid, híbrido, off-grid, móvil) y los demás servicios.
          4. El respaldo para los cortes, con la cuadra que se apaga.
          5. La pileta: bomba de calor o colectores solares, mes a mes.
          6. ¿Cuánto ahorro? La calculadora, con lo que paga de luz.
          7. Cómo es el proceso, paso por paso.
          8. Quiénes son y con qué marcas trabajan.
          9. Lo que cambia para una empresa.
          10. Las dudas que frenan, y el contacto.
          Los fondos alternan azul noche y papel por capítulo; Preguntas va en papel hondo y el
          contacto cierra en el cielo. */}
      <main>
        <PibeHero />
        <Works />
        <Videos />
        <Services />
        <Backup />
        <Pools />
        <Calculator />
        <Process />
        <About />
        <Business />
        <Faq />
        <PibeContact />
      </main>
      <PibeFooter />
      <PibeMobileCta />
      <SectionEntrance />
    </div>
  );
}
