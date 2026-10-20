import Image from "next/image";
import { pibe, works } from "@/lib/pibe";
import { Todo } from "./todo";

/**
 * Trabajos hechos: un mosaico con las fotos de Matías, unidas por juntas como las celdas de
 * un panel. Cada foto lleva lo que se ve en ella y, cuando Matías lo confirme, el barrio.
 */
export function Works() {
  const missingPlaces = works.some((w) => !w.place);

  return (
    <section id="trabajos" aria-labelledby="pa-works-title" className="pa-dark">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pa-works-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            Techos donde ya estuve.
          </h2>
          <div className="lg:col-span-5">
            <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-on-dark-muted)]">
              Casas, comercios y terrazas: paneles sobre chapa, teja y losa, y termotanques solares.
            </p>
            {missingPlaces && <Todo className="pa-todo-dark mt-5">Barrio de cada foto, a confirmar con {pibe.firstName}</Todo>}
          </div>
        </div>

        <ul className="pa-works mt-14">
          {works.map((w) => (
            <li key={w.src} className="pa-work">
              <figure className="relative h-full">
                <Image
                  src={w.src}
                  alt={w.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  style={w.pos ? { objectPosition: w.pos } : undefined}
                />
                <figcaption className="pa-work-caption" data-svc={w.kind}>
                  <span className="pa-swatch" aria-hidden="true" />
                  {w.place ? `${w.place} · ${w.what}` : w.what}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
