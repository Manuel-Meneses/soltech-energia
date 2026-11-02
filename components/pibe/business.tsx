"use client";

import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { business, businessPhotos, prefillContact } from "@/lib/pibe";
import { trackConversion } from "@/lib/track";

/**
 * Para empresas: el techo de un comercio, un galpón o una industria. Cuatro obras para empresas
 * en un recuadro de dos por dos, unidas por juntas como las celdas de un panel, y al lado lo que cambia, en filas como una hoja de datos. El botón precarga el
 * formulario con "Empresa" y baja hasta él.
 */
export function Business() {
  function ask() {
    trackConversion("servicio_consultado", { servicio: "Empresa" });
    prefillContact({
      servicio: "Paneles solares",
      lugar: "Empresa",
      mensaje: "Quiero consultar por paneles solares para mi empresa.",
    });
  }

  return (
    <section id="empresas" aria-labelledby="pa-biz-title" className="pa-dark">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pa-biz-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            También para tu empresa.
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-on-dark-muted)] lg:col-span-5">
            Comercios, galpones e industrias. Una empresa usa la mayor parte de su energía de día, justo cuando el sol
            genera.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="pa-biz-photos lg:col-span-6">
            {businessPhotos.map((p) => (
              <figure key={p.src} className="pa-biz-photo">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: p.pos }}
                />
              </figure>
            ))}
          </div>

          <div className="lg:col-span-6">
            <ul className="pa-biz">
              {business.map((b) => (
                <li key={b.title} className="pa-biz-row">
                  <h3 className="pa-wide text-xl font-semibold leading-snug">{b.title}</h3>
                  <p className="mt-2 leading-relaxed text-[var(--pa-on-dark-muted)]">{b.body}</p>
                </li>
              ))}
            </ul>

            <button type="button" onClick={ask} className="pa-btn pa-btn-action mt-10 w-full sm:w-auto">
              Pedí una visita para tu empresa
              <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
