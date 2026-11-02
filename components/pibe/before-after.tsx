"use client";

import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { beforeAfter, prefillContact } from "@/lib/pibe";
import { trackConversion } from "@/lib/track";

export type BeforeAfterPhotos = { before: string | null; after: string | null };

/**
 * Antes y después de una obra, debajo de la galería: las dos fotos unidas por una junta, una al
 * lado de la otra (en celular, una arriba de la otra), y abajo la ficha con sus cifras. Las
 * fotos las lee Works de public/pibe/antes-despues/; si falta una, se ve el marco con el nombre
 * del archivo que hay que subir (solo en `next dev`: publicado, el bloque no sale).
 */
export function BeforeAfter({ photos }: { photos: BeforeAfterPhotos }) {
  const ba = beforeAfter;
  const frames = [
    { label: "Antes", file: "antes.jpg", src: photos.before, ...ba.before },
    { label: "Después", file: "despues.jpg", src: photos.after, ...ba.after },
  ];

  function ask() {
    trackConversion("servicio_consultado", { servicio: ba.servicio });
    prefillContact({ servicio: ba.servicio, mensaje: ba.ask });
  }

  return (
    <div className="pa-ba mt-20 sm:mt-24" aria-labelledby="pa-ba-title" role="group">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="pa-ba-kicker">Antes y después · {ba.place}</p>
          <h3 id="pa-ba-title" className="pa-wide mt-3 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight">
            {ba.title}
          </h3>
        </div>
        <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-muted)] lg:col-span-5">{ba.intro}</p>
      </div>

      <div className="pa-ba-pair mt-10">
        {frames.map((f) => (
          <figure key={f.label} className="pa-ba-photo">
            {f.src ? (
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(min-width: 768px) 44rem, 100vw"
                className="object-cover"
                style={f.pos ? { objectPosition: f.pos } : undefined}
              />
            ) : (
              <span className="pa-ba-missing">
                Falta la foto: public/pibe/antes-despues/{f.file}
              </span>
            )}
            <figcaption className="pa-ba-tag" data-after={f.label === "Después" || undefined}>
              {f.label}
            </figcaption>
          </figure>
        ))}
      </div>

      <dl className="pa-ba-facts mt-12">
        {ba.facts.map((f) => (
          <div key={f.label} className="pa-ba-fact">
            <dt className="mt-2 leading-snug text-[var(--pa-muted)]">{f.label}</dt>
            <dd className="pa-ba-value pa-num">{f.value}</dd>
          </div>
        ))}
      </dl>

      <button type="button" onClick={ask} className="pa-btn pa-btn-action mt-12 w-full sm:w-auto">
        Consultar por un trabajo así
        <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
      </button>
    </div>
  );
}
