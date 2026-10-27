import fs from "node:fs";
import path from "node:path";
import { featuredWorks, pibe, works } from "@/lib/pibe";
import { WorksGallery, type ReelPhoto } from "./works-reel";

/* Todas las fotos de public/pibe/trabajos/, leídas una vez al armar la página: para sumar una
   obra alcanza con soltar la foto en esa carpeta. Van en el orden del número del nombre
   (foto_1, foto_2…); las que tienen ficha en lib/pibe.ts llevan su leyenda. */
const DIR = "/pibe/trabajos";
const num = (f: string) => Number(f.match(/\d+/)?.[0] ?? Infinity);
const files = fs
  .readdirSync(path.join(process.cwd(), "public", DIR))
  .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
  .sort((a, b) => num(a) - num(b) || a.localeCompare(b, "es"));

const known = new Map(works.map((w) => [w.src, w]));
const photos: ReelPhoto[] = files.map((f, i) => {
  const src = `${DIR}/${f}`;
  const w = known.get(src);
  if (!w) return { src, alt: `Obra de ${pibe.name}, foto ${i + 1}.`, caption: null };
  return { src, alt: w.alt, caption: w.place ? `${w.place} · ${w.what}` : w.what };
});

/* Las obras de la grilla, como posición dentro de todas las fotos: tocar una abre el visor ahí. */
const featured = featuredWorks
  .map((f) => ({ index: photos.findIndex((p) => p.src === f.src), pos: f.pos }))
  .filter((f) => f.index >= 0);

/**
 * Trabajos hechos, lo primero después del hero: la prueba antes de pedir nada. Una grilla de
 * obras elegidas y, a un toque, el visor con todas las fotos.
 */
export function Works() {
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

        <WorksGallery photos={photos} featured={featured} instagram={pibe.instagram} />
      </div>
    </section>
  );
}
