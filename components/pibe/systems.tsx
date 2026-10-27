"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import {
  ArrowRightIcon,
  BatteryChargingIcon,
  BatteryHighIcon,
  HouseIcon,
  LightningIcon,
  SolarPanelIcon,
  SunIcon,
  VanIcon,
} from "@phosphor-icons/react";
import { prefillContact, systems, systemTraits, type SystemId } from "@/lib/pibe";
import { trackConversion } from "@/lib/track";

/** El ícono de cada eslabón del recorrido, en el orden de `chain`. */
const chainIcons: Record<SystemId, (typeof SunIcon)[]> = {
  ongrid: [SunIcon, SolarPanelIcon, LightningIcon, HouseIcon],
  hibrido: [SunIcon, SolarPanelIcon, LightningIcon, BatteryHighIcon],
  offgrid: [SunIcon, SolarPanelIcon, BatteryChargingIcon, HouseIcon],
  movil: [SunIcon, SolarPanelIcon, BatteryChargingIcon, VanIcon],
};

/**
 * ¿Qué sistema va con tu lugar? Cuatro pestañas que parten de lo que le pasa al vecino (tengo
 * red, se me corta, no llega la red, va sobre ruedas) y muestran el sistema que corresponde: el
 * recorrido de la energía, la hoja de datos (red, baterías, anda sin red), lo que lleva y el
 * botón que precarga el formulario. Pestañas con flechas, Inicio y Fin; al cambiar, el recorrido
 * se arma de a un eslabón.
 */
export function Systems() {
  const [active, setActive] = useState<SystemId>("ongrid");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = systems.find((x) => x.id === active) ?? systems[0];
  const icons = chainIcons[s.id];

  function onKey(e: KeyboardEvent, i: number) {
    const last = systems.length - 1;
    const to =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i === last ? 0 : i + 1)
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i === 0 ? last : i - 1)
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (to === null) return;
    e.preventDefault();
    setActive(systems[to].id);
    tabs.current[to]?.focus();
  }

  function ask() {
    trackConversion("servicio_consultado", { servicio: `Sistema ${s.name}` });
    prefillContact({ servicio: "Paneles solares", mensaje: s.ask });
  }

  return (
    <div id="sistemas" className="pa-sys">
      <div className="pa-sys-pick">
        <h3 id="pa-sys-title" className="pa-sys-title">
          ¿Qué sistema va con tu lugar?
        </h3>
        <div role="tablist" aria-labelledby="pa-sys-title" className="pa-sys-tabs">
          {systems.map((x, i) => {
            const on = x.id === active;
            return (
              <button
                key={x.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`pa-sys-tab-${x.id}`}
                aria-selected={on}
                aria-controls="pa-sys-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(x.id)}
                onKeyDown={(e) => onKey(e, i)}
                className="pa-sys-tab"
              >
                <span className="pa-sys-need">{x.need}</span>
                <span className="pa-sys-name">{x.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        key={s.id}
        role="tabpanel"
        id="pa-sys-panel"
        aria-labelledby={`pa-sys-tab-${s.id}`}
        tabIndex={0}
        className="pa-sys-panel"
      >
        <p className="pa-sys-in pa-sys-tag" style={{ ["--i" as string]: 0 } as CSSProperties}>
          {s.tag}
        </p>
        <h4 className="pa-sys-in pa-sys-big" style={{ ["--i" as string]: 0 } as CSSProperties}>
          {s.name}
        </h4>

        <ol className="pa-chain mt-7" aria-label={`Recorrido de la energía: ${s.chain.join(", ")}`}>
          {s.chain.map((step, i) => {
            const Icon = icons[i];
            return (
              <li key={step} aria-hidden="true" className="pa-sys-in" style={{ ["--i" as string]: i + 1 } as CSSProperties}>
                <Icon size={22} weight={i === 0 ? "fill" : "regular"} className="pa-chain-icon" data-sun={Icon === SunIcon || undefined} />
                {step}
              </li>
            );
          })}
        </ol>

        <p className="pa-sys-in pa-sys-body" style={{ ["--i" as string]: 5 } as CSSProperties}>
          {s.body}
        </p>

        <dl className="pa-sys-in pa-sys-traits" style={{ ["--i" as string]: 6 } as CSSProperties}>
          {systemTraits.map((t) => {
            const yes = s.traits[t.key];
            return (
              <div key={t.key} data-yes={yes || undefined}>
                <dt>
                  <span className="pa-sys-mark" aria-hidden="true" />
                  {t.label}
                </dt>
                <dd>{yes ? "Sí" : "No"}</dd>
              </div>
            );
          })}
        </dl>

        <div className="pa-sys-in pa-sys-kit" style={{ ["--i" as string]: 7 } as CSSProperties}>
          <p>Lleva</p>
          <ul>
            {s.kit.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>

        <div className="pa-sys-in pa-svc-cta" style={{ ["--i" as string]: 8 } as CSSProperties}>
          <button type="button" onClick={ask} className="pa-btn pa-btn-action">
            Consultar por un sistema {s.name.toLowerCase()}
            <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
          </button>
          {s.more && (
            <a href={s.more.href} className="pa-link font-semibold">
              {s.more.label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
