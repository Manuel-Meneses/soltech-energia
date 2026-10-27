"use client";

import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { prefillContact, services } from "@/lib/pibe";
import { trackConversion } from "@/lib/track";
import { Systems } from "./systems";

/** Los paneles se eligen en el selector de sistemas, arriba; la grilla muestra el resto. */
const gridServices = services.filter((s) => s.id !== "paneles");

function consult(servicio: string, mensaje: string) {
  trackConversion("servicio_consultado", { servicio });
  prefillContact({ servicio, mensaje });
}

/**
 * Lo que hacemos: primero el selector de sistemas fotovoltaicos (on-grid, híbrido, off-grid y
 * móvil); debajo, los otros cuatro servicios en un módulo de dos por dos, unidos por juntas de
 * 2px como las celdas de un panel. Cada celda lleva una foto de obra propia y su botón precarga
 * el formulario; respaldo y piscinas suman un enlace a su sección. Los termotanques van en la
 * franja de abajo, nombrados y nada más, por pedido del cliente.
 */
export function Services() {
  return (
    <section id="servicios" aria-labelledby="pa-services-title" className="pa-dark">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pa-services-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            Lo que hacemos.
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-on-dark-muted)] lg:col-span-5">
            Diseñamos, vendemos e instalamos sistemas fotovoltaicos a tu medida, en todo el país. Y cuidamos lo que ya
            está puesto.
          </p>
        </div>

        <div className="mt-14">
          <Systems />
        </div>

        <ul className="pa-svc-grid mt-12">
          {gridServices.map((s) => (
            <li key={s.id} id={`servicio-${s.id}`} className="pa-svc">
              <figure className="pa-svc-photo">
                <Image
                  src={s.photo.src}
                  alt={s.photo.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: s.photo.pos }}
                />
              </figure>
              <div className="pa-svc-body">
                <h3 className="pa-svc-title">{s.title}</h3>
                <p className="pa-svc-text">{s.body}</p>
                <ul className="pa-svc-details">
                  {s.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <div className="pa-svc-cta">
                  <button type="button" onClick={() => consult(s.title, s.ask)} className="pa-btn pa-btn-action">
                    Consultar
                    <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
                  </button>
                  {s.more && (
                    <a href={s.more.href} className="pa-link font-semibold">
                      {s.more.label}
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
          <li className="pa-svc-extra">
            <p className="pa-svc-extra-title">¿Agua caliente con el sol?</p>
            <p>También instalamos termotanques solares, para el agua caliente de la casa.</p>
            <button
              type="button"
              onClick={() => consult("Otra consulta", "Quiero consultar por un termotanque solar.")}
              className="pa-link inline-flex items-center gap-2 font-semibold"
            >
              Consultar
              <ArrowRightIcon size={16} weight="bold" className="pa-arrow" aria-hidden="true" />
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}
