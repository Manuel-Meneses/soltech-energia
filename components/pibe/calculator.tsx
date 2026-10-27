"use client";

import { useId, useState } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { calc, prefillContact, sunSite } from "@/lib/pibe";
import { trackConversion } from "@/lib/track";

const covers = [
  { value: 0.5, label: "50%" },
  { value: 0.75, label: "75%" },
  { value: 1, label: "100%" },
];

type Place = "casa" | "empresa";
type Period = "mes" | "bim";

/** Lo que paga por mes, en pesos: una casa y un comercio no se mueven en la misma escala. */
const ranges: Record<Place, { min: number; max: number; step: number; start: number }> = {
  casa: { min: 20_000, max: 400_000, step: 5_000, start: 80_000 },
  empresa: { min: 100_000, max: 3_000_000, step: 25_000, start: 500_000 },
};

/** Lugares del techo dibujado. Si el equipo no entra, cada cuadro pasa a valer varios paneles. */
const ROOF_SLOTS = 30;

const fmt = (n: number, d = 0) => n.toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
const money = (n: number) =>
  n >= 1_000_000 ? `$${fmt(n / 1_000_000, n >= 10_000_000 ? 0 : 1)} millones` : `$${fmt(Math.round(n / 100) * 100)}`;

/** La cuenta, con los supuestos de lib/pibe.ts a la vista. */
function estimate(bill: number, cover: number) {
  const kwh = Math.max(0, (bill - calc.fixedCharge) / calc.kwhPrice); // lo que consume por mes
  const perKwp = 30 * calc.sunHours * calc.performance; // kWh por mes que da 1 kWp
  const panels = Math.max(1, Math.ceil((((kwh * cover) / perKwp) * 1000) / calc.panelW));
  const kwp = (panels * calc.panelW) / 1000;
  const monthly = kwp * perKwp;
  const saving = Math.min(monthly, kwh) * calc.kwhPrice;
  return { kwh, panels, kwp, m2: Math.ceil(panels * calc.panelM2), monthly: Math.round(monthly), saving };
}

/**
 * ¿Cuánto ahorrás con el sol? El vecino pone lo que paga de luz (por mes o por bimestre, en una
 * casa o en un comercio) y la página le dice cuánto deja de pagar y qué equipo lleva: los paneles
 * aparecen de a uno sobre el techo. Es una estimación orientativa, y lo dice. Sin precios del
 * equipo: el cliente no los publica. El botón precarga el formulario con la cuenta.
 */
export function Calculator() {
  const id = useId();
  const [place, setPlace] = useState<Place>("casa");
  const [period, setPeriod] = useState<Period>("mes");
  const [bill, setBill] = useState(ranges.casa.start);
  const [draft, setDraft] = useState<string | null>(null);
  const [cover, setCover] = useState(1);

  const k = period === "bim" ? 2 : 1;
  const range = { min: ranges[place].min * k, max: ranges[place].max * k, step: ranges[place].step * k };
  const clamp = (n: number) => Math.min(range.max, Math.max(range.min, Math.round(n)));
  const r = estimate(bill / k, cover);
  const unit = Math.max(1, Math.ceil(r.panels / ROOF_SLOTS));
  const filled = Math.ceil(r.panels / unit);

  function changePlace(next: Place) {
    if (next === place) return;
    setBill(ranges[next].start * k);
    setPlace(next);
    setDraft(null);
  }

  function changePeriod(next: Period) {
    if (next === period) return;
    const step = ranges[place].step;
    setBill((b) => (next === "bim" ? b * 2 : Math.max(ranges[place].min, Math.round(b / 2 / step) * step)));
    setPeriod(next);
    setDraft(null);
  }

  function send() {
    trackConversion("calculadora_enviada", { pesos: Math.round(bill / k), paneles: r.panels });
    prefillContact({
      servicio: "Paneles solares",
      lugar: place === "casa" ? "Casa" : "Empresa",
      mensaje: `Hice la cuenta en la página: pago unos ${money(bill)} de luz por ${period === "bim" ? "bimestre" : "mes"} y quiero cubrir el ${Math.round(cover * 100)}%. Me dio ${r.panels} paneles (${fmt(r.kwp, 1)} kWp), unos ${r.m2} m² de techo y un ahorro de ${money(r.saving)} por mes. ¿Me pasan un presupuesto?`,
    });
  }

  function sendBigBill() {
    trackConversion("calculadora_enviada", { pesos: Math.round(bill / k), paneles: "a medida" });
    prefillContact({
      servicio: "Paneles solares",
      lugar: place === "casa" ? "Casa" : "Empresa",
      mensaje: `Pagamos más de ${money(range.max)} de luz por ${period === "bim" ? "bimestre" : "mes"}. Les mando la factura para que calculen el equipo.`,
    });
  }

  return (
    <section id="calculadora" aria-labelledby="pa-calc-title" className="pa-paper">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pa-calc-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            ¿Cuánto ahorrás con el sol?
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-muted)] lg:col-span-5">
            Poné lo que pagás de luz y te mostramos cuánto dejás de pagar y qué equipo necesitás.
          </p>
        </div>

        <div className="pa-calc mt-14 grid lg:grid-cols-12">
          {/* Entradas */}
          <div className="pa-calc-in lg:col-span-5">
            <fieldset>
              <legend className="font-semibold">¿Para dónde es?</legend>
              <div className="mt-3 grid max-w-sm grid-cols-2 gap-2">
                {(["casa", "empresa"] as const).map((p) => (
                  <label key={p} className="pa-choice">
                    <input
                      type="radio"
                      name={`${id}-place`}
                      checked={place === p}
                      onChange={() => changePlace(p)}
                      className="sr-only"
                    />
                    {p === "casa" ? "Casa" : "Comercio o empresa"}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-9">
              <legend className="font-semibold">Tu factura llega</legend>
              <div className="mt-3 grid max-w-sm grid-cols-2 gap-2">
                {(["mes", "bim"] as const).map((p) => (
                  <label key={p} className="pa-choice">
                    <input
                      type="radio"
                      name={`${id}-period`}
                      checked={period === p}
                      onChange={() => changePeriod(p)}
                      className="sr-only"
                    />
                    {p === "mes" ? "Cada mes" : "Cada dos meses"}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-9">
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
                <label id={`${id}-bill-label`} htmlFor={`${id}-bill`} className="font-semibold">
                  Cuánto pagás {period === "bim" ? "por bimestre" : "por mes"}
                </label>
                <span className="pa-kwh">
                  <span className="text-[var(--pa-muted)]">$</span>
                  <input
                    id={`${id}-bill`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={draft ?? fmt(bill)}
                    onChange={(e) => {
                      // Se escribe como en la factura, con o sin puntos: cuentan solo los dígitos.
                      const digits = e.target.value.replace(/\D/g, "");
                      setDraft(digits && fmt(Number(digits)));
                      if (digits) setBill(clamp(Number(digits)));
                    }}
                    onBlur={() => setDraft(null)}
                    className="pa-kwh-input pa-money-input pa-num"
                  />
                </span>
              </div>
              <input
                type="range"
                min={range.min}
                max={range.max}
                step={range.step}
                value={bill}
                onChange={(e) => {
                  setBill(Number(e.target.value));
                  setDraft(null);
                }}
                aria-labelledby={`${id}-bill-label`}
                aria-valuetext={`${fmt(bill)} pesos ${period === "bim" ? "por bimestre" : "por mes"}`}
                className="pa-range mt-4"
                style={{ ["--fill" as string]: `${((bill - range.min) / (range.max - range.min)) * 100}%` }}
              />
              <div className="mt-1 flex justify-between text-xs text-[var(--pa-muted)]">
                <span>${fmt(range.min)}</span>
                <span>${fmt(range.max)}</span>
              </div>
            </div>

            <fieldset className="mt-9">
              <legend className="font-semibold">¿Qué parte de la factura querés cubrir con el sol?</legend>
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

            <p className="pa-calc-big">
              ¿Pagás más de {money(range.max)}?{" "}
              <button type="button" onClick={sendBigBill} className="pa-link font-semibold">
                Mandanos la factura
              </button>{" "}
              y lo calculamos a medida.
            </p>
          </div>

          {/* Resultado: el ahorro primero, después el techo con sus paneles */}
          <div className="pa-calc-out pa-dark lg:col-span-7" aria-live="polite">
            <p className="pa-calc-save">
              <span className="pa-calc-save-label">Dejás de pagar por mes, aprox.</span>
              <span className="pa-display pa-num pa-calc-save-value">{money(r.saving)}</span>
              <span className="pa-calc-save-more">
                {money(r.saving * 12)} por año · {money(r.saving * 12 * calc.lifeYears)} en {calc.lifeYears} años, con
                la tarifa de {calc.priceAsOf}
              </span>
            </p>

            {/* El techo tiene lugares fijos: los paneles los van ocupando y los vacíos quedan marcados. */}
            <div className="pa-roof-grid mt-8" aria-hidden="true">
              {Array.from({ length: ROOF_SLOTS }, (_, i) =>
                i < filled ? (
                  <span key={`p${i}`} className="pa-pv" style={{ ["--k" as string]: i % 10 }} />
                ) : (
                  <span key={`e${i}`} className="pa-pv-slot" />
                ),
              )}
            </div>
            {unit > 1 && <p className="pa-calc-unit">Cada cuadro, {unit} paneles.</p>}

            <dl className="pa-calc-figures mt-8 grid grid-cols-2 sm:grid-cols-4">
              <div>
                <dt>paneles de {calc.panelW} W</dt>
                <dd className="pa-display pa-num">{r.panels}</dd>
              </div>
              <div>
                <dt>de potencia instalada</dt>
                <dd className="pa-display pa-num">
                  {fmt(r.kwp, 1)}
                  <small>kWp</small>
                </dd>
              </div>
              <div>
                <dt>de techo libre, al norte</dt>
                <dd className="pa-display pa-num">
                  ~{fmt(r.m2)}
                  <small>m²</small>
                </dd>
              </div>
              <div>
                <dt>generados por mes, en promedio</dt>
                <dd className="pa-display pa-num">
                  ~{r.monthly >= 1000 ? fmt(r.monthly / 1000, 1) : fmt(r.monthly)}
                  <small>{r.monthly >= 1000 ? "MWh" : "kWh"}</small>
                </dd>
              </div>
            </dl>

            <button type="button" onClick={send} className="pa-btn pa-btn-action mt-8 w-full sm:w-auto">
              Pedí un presupuesto con esta cuenta
              <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="mt-5 max-w-[72ch] text-sm leading-relaxed text-[var(--pa-muted)]">
          Es una cuenta orientativa, no un presupuesto. Pasamos tu factura a kWh con un precio de referencia de $
          {fmt(calc.kwhPrice)} por kWh con impuestos (Edenor y Edesur, {calc.priceAsOf}) y ${fmt(calc.fixedCharge)} de
          cargo fijo, que no baja. La tarifa cambia seguido: si en tu factura el kWh sale distinto, cambia la cantidad de
          paneles, y si la luz sube, lo que ahorrás sube con ella. Para {sunSite.name}: {fmt(calc.sunHours, 1)} horas de sol pico por día en promedio del
          año, {Math.round((1 - calc.performance) * 100)}% de pérdidas y paneles de {calc.panelW} W. La energía que
          sobra y va a la red se paga a otro precio, así que el número final sale de tu factura y de ver tu techo.
        </p>
      </div>
    </section>
  );
}
