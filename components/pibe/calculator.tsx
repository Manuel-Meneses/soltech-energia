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

type Period = "mes" | "bim";

/** El control sigue a la factura: una bimestral trae el doble de kWh que una mensual. */
const ranges: Record<Period, { min: number; max: number; step: number }> = {
  mes: { min: 100, max: 1500, step: 10 },
  bim: { min: 200, max: 3000, step: 20 },
};

/** Lugares del techo: alcanzan para 1.500 kWh por mes (el máximo del control). */
const ROOF_SLOTS = 30;

const fmt = (n: number, d = 0) => n.toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });

/** La cuenta, con los supuestos de lib/pibe.ts a la vista. */
function estimate(kwh: number, cover: number) {
  const perKwp = 30 * calc.sunHours * calc.performance; // kWh por mes que da 1 kWp
  const kwp = (kwh * cover) / perKwp;
  const panels = Math.max(1, Math.ceil((kwp * 1000) / calc.panelW));
  const realKwp = (panels * calc.panelW) / 1000;
  return {
    panels,
    kwp: realKwp,
    m2: Math.ceil(panels * calc.panelM2),
    monthly: Math.round(realKwp * perKwp),
  };
}

/**
 * ¿Cuántos paneles necesitás? El vecino escribe el consumo tal como dice su factura (mensual o
 * bimestral) o elige una casa parecida, y la página arma el módulo: los paneles aparecen de a uno
 * sobre el techo. Es una estimación orientativa, y lo dice. El botón precarga el formulario con
 * la cuenta.
 */
export function Calculator() {
  const id = useId();
  const [period, setPeriod] = useState<Period>("mes");
  const [bill, setBill] = useState(300);
  const [draft, setDraft] = useState<string | null>(null);
  const [cover, setCover] = useState(1);

  const range = ranges[period];
  const clamp = (n: number) => Math.min(range.max, Math.max(range.min, Math.round(n)));
  const monthly = period === "bim" ? bill / 2 : bill;
  const r = estimate(monthly, cover);

  function changePeriod(next: Period) {
    if (next === period) return;
    setBill((b) => (next === "bim" ? b * 2 : Math.max(ranges.mes.min, Math.round(b / 20) * 10)));
    setPeriod(next);
    setDraft(null);
  }

  function pickPreset(kwh: number) {
    setBill(period === "bim" ? kwh * 2 : kwh);
    setDraft(null);
  }

  function send() {
    trackConversion("calculadora_enviada", { kwh: monthly, paneles: r.panels });
    prefillContact({
      servicio: "Paneles solares",
      mensaje: `Hice la cuenta en la página: mi factura ${period === "bim" ? "bimestral" : "mensual"} dice ${fmt(bill)} kWh y quiero cubrir el ${Math.round(cover * 100)}%. Me dio ${r.panels} paneles (${fmt(r.kwp, 1)} kWp) y unos ${r.m2} m² de techo. ¿Me pasan un presupuesto?`,
    });
  }

  function sendBigBill() {
    trackConversion("calculadora_enviada", { kwh: monthly, paneles: "a medida" });
    prefillContact({
      servicio: "Paneles solares",
      lugar: "Empresa",
      mensaje: "Consumimos más de 1.500 kWh por mes. Les mando la factura para que calculen el equipo.",
    });
  }

  return (
    <section id="calculadora" aria-labelledby="pa-calc-title" className="pa-paper">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pa-calc-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            ¿Cuántos paneles necesitás?
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-muted)] lg:col-span-5">
            Buscá en tu factura de luz el consumo en kWh y escribilo acá, o elegí una casa parecida a la tuya.
          </p>
        </div>

        <div className="pa-calc mt-14 grid lg:grid-cols-12">
          {/* Entradas */}
          <div className="pa-calc-in lg:col-span-5">
            <fieldset>
              <legend className="font-semibold">Tu factura es</legend>
              <div className="mt-3 grid max-w-xs grid-cols-2 gap-2">
                {(["mes", "bim"] as const).map((p) => (
                  <label key={p} className="pa-choice">
                    <input
                      type="radio"
                      name={`${id}-period`}
                      checked={period === p}
                      onChange={() => changePeriod(p)}
                      className="sr-only"
                    />
                    {p === "mes" ? "Mensual" : "Bimestral"}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-9">
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
                <label id={`${id}-kwh-label`} htmlFor={`${id}-kwh`} className="font-semibold">
                  Consumo {period === "bim" ? "del bimestre" : "del mes"}
                </label>
                <span className="pa-kwh">
                  <input
                    id={`${id}-kwh`}
                    type="number"
                    inputMode="numeric"
                    min={range.min}
                    max={range.max}
                    step={range.step}
                    value={draft ?? String(bill)}
                    onChange={(e) => {
                      setDraft(e.target.value);
                      const n = Number(e.target.value);
                      if (e.target.value !== "" && Number.isFinite(n)) setBill(clamp(n));
                    }}
                    onBlur={() => setDraft(null)}
                    className="pa-kwh-input pa-num"
                  />
                  <span className="text-[var(--pa-muted)]">kWh</span>
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
                aria-labelledby={`${id}-kwh-label`}
                aria-valuetext={`${fmt(bill)} kWh ${period === "bim" ? "por bimestre" : "por mes"}`}
                className="pa-range mt-4"
                style={{ ["--fill" as string]: `${((bill - range.min) / (range.max - range.min)) * 100}%` }}
              />
              <div className="mt-1 flex justify-between text-xs text-[var(--pa-muted)]">
                <span>{fmt(range.min)}</span>
                <span>{fmt(range.max)}</span>
              </div>
            </div>

            <div className="mt-7">
              <p className="text-sm text-[var(--pa-muted)]">¿No tenés la factura a mano?</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {calc.presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => pickPreset(p.kwh)}
                    aria-pressed={monthly === p.kwh}
                    className="pa-preset"
                  >
                    {p.label}
                    <span className="pa-num text-[var(--pa-muted)]">~{p.kwh} kWh/mes</span>
                  </button>
                ))}
              </div>
            </div>

            <fieldset className="mt-9">
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

            <p className="pa-calc-big">
              ¿Más de 1.500 kWh por mes? Es común en comercios y galpones.{" "}
              <button type="button" onClick={sendBigBill} className="pa-link font-semibold">
                Mandanos la factura
              </button>{" "}
              y lo calculamos a medida.
            </p>
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
                <dt>de potencia instalada</dt>
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

            <button type="button" onClick={send} className="pa-btn pa-btn-action mt-8 w-full sm:w-auto">
              Pedí una visita con esta cuenta
              <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="mt-5 max-w-[72ch] text-sm leading-relaxed text-[var(--pa-muted)]">
          Es una cuenta orientativa para {sunSite.name}: {fmt(calc.sunHours, 1)} horas de sol pico por día en promedio del año,{" "}
          {Math.round((1 - calc.performance) * 100)}% de pérdidas y paneles de referencia de {calc.panelW} W. kWp es la
          potencia de los paneles a pleno sol. El número final sale de ver tu techo.
        </p>
      </div>
    </section>
  );
}
