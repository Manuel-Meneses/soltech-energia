import fs from "node:fs";
import path from "node:path";
import { getGallery } from "@/lib/galeria";
import { pibe } from "@/lib/pibe";
import { WorksGallery } from "./works-reel";
import { BeforeAfter, type BeforeAfterPhotos } from "./before-after";

/* Las fotos del antes y después: antes.* y despues.* en public/pibe/antes-despues/. */
const BA_DIR = "/pibe/antes-despues";
function beforeAfterPhotos(): BeforeAfterPhotos {
  const abs = path.join(process.cwd(), "public", BA_DIR);
  const files = fs.existsSync(abs) ? fs.readdirSync(abs) : [];
  const find = (name: string) => {
    const f = files.find((f) => new RegExp(`^${name}\\.(jpe?g|png|webp|avif)$`, "i").test(f));
    return f ? `${BA_DIR}/${f}` : null;
  };
  return { before: find("antes"), after: find("despues") };
}

/**
 * Trabajos hechos, lo primero después del hero: la prueba antes de pedir nada. El mosaico de obras,
 * con sus filtros, y a un toque el visor con la foto entera y su descripción. Debajo, un antes y
 * después con los pasos del trabajo.
 */
export async function Works() {
  const photos = await getGallery();
  const ba = beforeAfterPhotos();
  /* Publicado, sin las dos fotos no sale: el sitio no muestra lugares vacíos. */
  const showBeforeAfter = (ba.before && ba.after) || process.env.NODE_ENV === "development";
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

        {showBeforeAfter && <BeforeAfter photos={ba} />}
      </div>
    </section>
  );
}
