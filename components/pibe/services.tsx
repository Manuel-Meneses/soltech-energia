"use client";

import { useState } from "react";
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react";
import { prefillContact, services, type ServiceId } from "@/lib/pibe";
import { HouseDrawing } from "./house-drawing";

/**
 * Lo que hago, sobre el corte de una casa. Al pasar el mouse o el foco por un servicio se
 * enciende su pieza en el dibujo; en celular el dibujo queda arriba con todas encendidas.
 * "Consultar" precarga el formulario con el servicio y baja hasta él.
 */
export function Services() {
  const [active, setActive] = useState<ServiceId | null>(null);

  return (
    <section id="servicios" aria-labelledby="pa-services-title" className="pa-dark">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pa-services-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            Del techo al enchufe.
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-on-dark-muted)] lg:col-span-5">
            Cuatro trabajos, todos en tu techo o tu terraza. Instalo lo nuevo y cuido lo que ya está puesto.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <div className="pa-house-frame lg:sticky lg:top-28">
              <HouseDrawing active={active} className="w-full" />
            </div>
          </div>

          <ol className="lg:col-span-6 lg:row-start-1" onMouseLeave={() => setActive(null)}>
            {services.map((s, i) => (
              <li
                key={s.id}
                id={`servicio-${s.id}`}
                className="pa-service"
                data-svc={s.id}
                data-on={active === s.id}
                onMouseEnter={() => setActive(s.id)}
                onFocus={() => setActive(s.id)}
              >
                <div className="flex items-baseline gap-4">
                  <span className="pa-service-num pa-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="pa-wide text-[clamp(1.4rem,2.2vw,1.85rem)] font-semibold leading-tight">{s.title}</h3>
                    <p className="mt-3 max-w-[52ch] leading-relaxed text-[var(--pa-on-dark-muted)]">{s.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      {s.details.map((d) => (
                        <li key={d} className="flex items-center gap-2">
                          <CheckIcon size={14} weight="bold" className="text-[var(--svc)]" aria-hidden="true" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => prefillContact({ servicio: s.title, mensaje: s.ask })}
                      className="pa-link mt-6 inline-flex items-center gap-2 font-semibold"
                    >
                      Consultar por {s.title.toLowerCase()}
                      <ArrowRightIcon size={16} weight="bold" className="pa-arrow" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
