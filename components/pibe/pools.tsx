"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRightIcon, FanIcon, SunIcon, WavesIcon, WindIcon, SolarPanelIcon } from "@phosphor-icons/react";
import {
  poolMethods,
  poolMonthNames,
  poolMonths,
  poolPhoto,
  poolSeasons,
  prefillContact,
  type PoolMethodId,
} from "@/lib/pibe";
import { trackConversion } from "@/lib/track";

const base = poolSeasons[0];

/** El ícono de cada eslabón: de dónde sale el calor, qué lo pasa al agua y la pileta. */
const chainIcons: Record<PoolMethodId, [typeof WindIcon, typeof WindIcon, typeof WindIcon]> = {
  bomba: [WindIcon, FanIcon, WavesIcon],
  solar: [SunIcon, SolarPanelIcon, WavesIcon],
};

const range = (from: number, to: number) => `${poolMonthNames[from]} a ${poolMonthNames[to]}`;

/**
 * Climatización de piscinas: cuántos meses de pileta da cada forma, en una tira de doce meses
 * por fila (de julio a junio, el verano al medio). Los meses de la temporada sin climatizar van
 * en azul acero; los que suma cada equipo, en azul claro. Al entrar, los meses se llenan desde
 * el verano hacia afuera. Debajo, las dos formas lado a lado con las mismas filas para comparar.
 */
export function Pools() {
  function ask(id: PoolMethodId, mensaje: string) {
    trackConversion("servicio_consultado", { servicio: `Piscinas: ${id}` });
    prefillContact({ servicio: "Climatización de piscinas", mensaje });
  }

  return (
    <section id="piscinas" aria-labelledby="pa-pool-title" className="pa-dark">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pa-pool-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            La pileta, más meses.
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-on-dark-muted)] lg:col-span-5">
            Templamos el agua sin gas, de dos formas: con una bomba de calor o con colectores solares. Te ayudamos a
            elegir según tu pileta y cuándo la usás.
          </p>
        </div>

        <div className="pa-pool mt-14">
          <div className="pa-pool-season">
            <div className="pa-pool-row pa-pool-months" aria-hidden="true">
              <span />
              <span className="pa-pool-cells">
                {poolMonths.map((m) => (
                  <span key={m}>
                    <span className="max-sm:hidden">{m}</span>
                    <span className="sm:hidden">{m[0]}</span>
                  </span>
                ))}
              </span>
            </div>
            {poolSeasons.map((s) => {
              const n = s.to - s.from + 1;
              const extra = n - (base.to - base.from + 1);
              return (
                <div key={s.id} className="pa-pool-row" data-season={s.id}>
                  <p className="pa-pool-label">
                    <span className="pa-wide font-semibold">{s.label}</span>
                    <span className="pa-pool-n pa-num">
                      {n} meses
                      {extra > 0 && <span className="pa-pool-plus"> +{extra}</span>}
                    </span>
                    <span className="sr-only">, de {range(s.from, s.to)}.</span>
                  </p>
                  <span className="pa-pool-cells" aria-hidden="true">
                    {poolMonths.map((m, i) => {
                      const lit = i >= s.from && i <= s.to;
                      const inBase = i >= base.from && i <= base.to;
                      return (
                        <span
                          key={m}
                          className="pa-pool-cell"
                          data-lit={lit ? (inBase ? "base" : "extra") : undefined}
                          style={{ ["--k" as string]: Math.abs(i - 6.5) } as CSSProperties}
                        >
                          <span />
                        </span>
                      );
                    })}
                  </span>
                </div>
              );
            })}
            <p className="pa-pool-note">
              Orientativo, para una pileta descubierta en Buenos Aires con cobertura térmica de noche. Cambia con la pileta,
              el equipo y el clima de cada año.
            </p>
          </div>

          <figure className="pa-pool-photo">
            <Image src={poolPhoto.src} alt={poolPhoto.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            <figcaption>{poolPhoto.caption}</figcaption>
          </figure>
        </div>

        <ul className="pa-pool-methods mt-12">
          {poolMethods.map((m) => {
            const season = poolSeasons.find((s) => s.id === m.id);
            const icons = chainIcons[m.id];
            return (
              <li key={m.id} className="pa-pool-method">
                <ol className="pa-chain" aria-label={`Cómo funciona: ${m.chain.join(", ")}`}>
                  {m.chain.map((step, i) => {
                    const Icon = icons[i];
                    return (
                      <li key={step} aria-hidden="true">
                        <Icon
                          size={22}
                          weight={i === 0 && m.id === "solar" ? "fill" : "regular"}
                          className="pa-chain-icon"
                          data-sun={Icon === SunIcon || undefined}
                        />
                        {step}
                      </li>
                    );
                  })}
                </ol>
                <h3 className="pa-svc-title mt-8">{m.title}</h3>
                <p className="pa-svc-text">{m.body}</p>
                <dl className="pa-pool-facts">
                  {m.facts.map((f) => (
                    <div key={f.k}>
                      <dt>{f.k}</dt>
                      <dd>{f.v}</dd>
                    </div>
                  ))}
                  {season && (
                    <div>
                      <dt>Temporada</dt>
                      <dd>De {range(season.from, season.to)}</dd>
                    </div>
                  )}
                </dl>
                <div className="pa-svc-cta">
                  <button type="button" onClick={() => ask(m.id, m.ask)} className="pa-btn pa-btn-action">
                    Consultar por {m.title.toLowerCase()}
                    <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
