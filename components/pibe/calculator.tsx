"use client";

import { useId, useState } from "react";
import { ArrowRightIcon, MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { calc, pibe, prefillContact } from "@/lib/pibe";

const covers = [
  { value: 0.5, label: "50%" },
  { value: 0.75, label: "75%" },
  { value: 1, label: "100%" },
];

/** Lugares del techo: alcanzan para 1.500 kWh por mes (el máximo del control). */
const ROOF_SLOTS = 30;

const fmt = (n: number, d = 0) => n.toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });

/** La cuenta, con los supuestos de lib/pibe.ts a la vista. */
function estimate(kwh: number, cover: number, people: number) {
  const perKwp = 30 * calc.sunHours * calc.performance; // kWh por mes que da 1 kWp
  const kwp = (kwh * cover) / perKwp;
  const panels = Math.max(1, Math.ceil((kwp * 1000) / calc.panelW));
  const realKwp = (panels * calc.panelW) / 1000;
  const liters = people * calc.litersPerPerson;
  const tank = calc.tankSizes.find((t) => t >= liters) ?? calc.tankSizes[calc.tankSizes.length - 1];
  return {
    panels,
    kwp: realKwp,
    m2: Math.ceil(panels * calc.panelM2),
    monthly: Math.round(realKwp * perKwp),
    tank,
  };
}

/**
 * ¿Cuántos paneles necesitás? El vecino pone su consumo y la página arma el módulo: los
 * paneles aparecen de a uno sobre el techo. Es una estimación orientativa, y lo dice.
 * "Mandarle estos números" precarga el formulario con la cuenta.
 */
export function Calculator() {
  const id = useId();
  const [kwh, setKwh] = useState(300);
  const [cover, setCover] = useState(1);
  const [people, setPeople] = useState(3);
  const r = estimate(kwh, cover, people);

  const send = () =>
    prefillContact({
      servicio: "Paneles solares",
      mensaje: `Hice la cuenta en la página: consumo ${fmt(kwh)} kWh por mes y quiero cubrir el ${Math.round(cover * 100)}%. Me dio ${r.panels} paneles (${fmt(r.kwp, 1)} kWp) y unos ${r.m2} m² de techo. ¿Me pasás un presupuesto?`,
    });

  return (
    <section id="calculadora" aria-labelledby="pa-calc-title" className="pa-paper">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pa-calc-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            ¿Cuántos paneles necesitás?
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-muted)] lg:col-span-5">
            Buscá en tu factura de luz el consumo en kWh y movelo acá. Si tu factura es bimestral, dividilo por dos.
          </p>
        </div>

        <div className="pa-calc mt-14 grid lg:grid-cols-12">
          {/* Entradas */}
          <div className="pa-calc-in lg:col-span-5">
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`${id}-kwh`} className="font-semibold">
                  Consumo por mes
                </label>
                <span className="pa-display pa-num text-[clamp(1.75rem,3vw,2.5rem)]">
                  {fmt(kwh)}
                  <span className="ml-1.5 text-[0.5em] text-[var(--pa-muted)]">kWh</span>
                </span>
              </div>
              <input
                id={`${id}-kwh`}
                type="range"
                min={100}
                max={1500}
                step={10}
                value={kwh}
                onChange={(e) => setKwh(Number(e.target.value))}
                aria-valuetext={`${fmt(kwh)} kWh por mes`}
                className="pa-range mt-5"
                style={{ ["--fill" as string]: `${((kwh - 100) / 1400) * 100}%` }}
              />
              <div className="mt-2 flex justify-between text-xs text-[var(--pa-muted)]">
                <span>100</span>
                <span>Casa chica ~200</span>
                <span>1.500</span>
              </div>
            </div>

            <fieldset className="mt-10">
              <legend className="font-semibold">¿Qué parte del consumo querés cubrir con el sol?</legend>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {covers.map((c) => (
                  <label key={c.value} className="pa-choice">
                    <input
                      type="radio"
                      name={`${id}-cover`}
                      checked={cover === c.value}
                      onChange={() => setCover(c.value)}
                      className="sr-only"
                    />
                    {c.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-10">
              <label htmlFor={`${id}-people`} className="font-semibold">
                Personas en la casa <span className="font-normal text-[var(--pa-muted)]">(para el termotanque)</span>
              </label>
              <div className="pa-stepper mt-3">
                <button type="button" onClick={() => setPeople((n) => Math.max(1, n - 1))} aria-label="Una persona menos">
                  <MinusIcon size={18} weight="bold" aria-hidden="true" />
                </button>
                <output id={`${id}-people`} className="pa-num" aria-live="polite">
                  {people}
                </output>
                <button type="button" onClick={() => setPeople((n) => Math.min(10, n + 1))} aria-label="Una persona más">
                  <PlusIcon size={18} weight="bold" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Resultado: el techo con sus paneles */}
          <div className="pa-calc-out pa-dark lg:col-span-7" aria-live="polite">
            {/* El techo tiene lugar para el consumo más alto del control: los lugares vacíos
                quedan marcados y los paneles los van ocupando. */}
            <div className="pa-roof-grid">
              {Array.from({ length: ROOF_SLOTS }, (_, i) =>
                i < r.panels ? (
                  <span key={`p${i}`} className="pa-pv" style={{ ["--k" as string]: i % 10 }} />
                ) : (
                  <span key={`e${i}`} className="pa-pv-slot" />
                ),
              )}
            </div>

            <dl className="pa-calc-figures mt-8 grid grid-cols-2 sm:grid-cols-4">
              <div>
                <dt>paneles de {calc.panelW} W</dt>
                <dd className="pa-display pa-num">{r.panels}</dd>
              </div>
              <div>
                <dt>de potencia</dt>
                <dd className="pa-display pa-num">
                  {fmt(r.kwp, 1)}
                  <small>kWp</small>
                </dd>
              </div>
              <div>
                <dt>de techo libre, al norte</dt>
                <dd className="pa-display pa-num">
                  ~{r.m2}
                  <small>m²</small>
                </dd>
              </div>
              <div>
                <dt>generados por mes, en promedio</dt>
                <dd className="pa-display pa-num">
                  ~{fmt(r.monthly)}
                  <small>kWh</small>
                </dd>
              </div>
            </dl>

            <p className="mt-6 border-t border-[var(--pa-dark-line)] pt-5 text-[var(--pa-on-dark-muted)]">
              Y para el agua caliente de {people} {people === 1 ? "persona" : "personas"}: un termotanque solar de unos{" "}
              <strong className="pa-num font-semibold text-[var(--pa-on-dark)]">{r.tank} litros</strong>.
            </p>

            <button type="button" onClick={send} className="pa-btn pa-btn-gold mt-8 w-full sm:w-auto">
              Mandale estos números a {pibe.firstName}
              <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="mt-5 max-w-[80ch] text-sm leading-relaxed text-[var(--pa-muted)]">
          Es una cuenta orientativa para {pibe.zone}: {fmt(calc.sunHours, 1)} horas de sol pico por día en promedio del año,{" "}
          {Math.round((1 - calc.performance) * 100)}% de pérdidas, paneles de referencia de {calc.panelW} W y{" "}
          {calc.litersPerPerson} litros de agua caliente por persona. El número final sale de ver tu techo.
        </p>
      </div>
    </section>
  );
}
