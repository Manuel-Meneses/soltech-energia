import { getGallery } from "@/lib/galeria";
import { pibe } from "@/lib/pibe";
import { WorksGallery } from "./works-reel";

/**
 * Trabajos hechos, lo primero después del hero: la prueba antes de pedir nada. El mosaico de obras,
 * con sus filtros, y a un toque el visor con la foto entera y su descripción.
 */
export async function Works() {
  const photos = await getGallery();
  return (
    <section id="trabajos" aria-labelledby="pa-works-title" className="pa-paper">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pa-works-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            Techos donde ya trabajamos.
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-muted)] lg:col-span-5">
            Casas, comercios, galpones y campos: paneles sobre chapa, teja, losa y en el suelo. Todas las fotos son obras
            nuestras.
          </p>
        </div>

        <WorksGallery photos={photos} instagram={pibe.instagram} />
      </div>
    </section>
  );
}
