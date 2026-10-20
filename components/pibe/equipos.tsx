"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  ArrowRightIcon,
  CornersOutIcon,
  HandGrabbingIcon,
} from "@phosphor-icons/react";
import { brands, brandsConfirmed, equipos, pibe, prefillContact, type EquipoId } from "@/lib/pibe";
import { Todo } from "./todo";

// three.js baja solo en el cliente y recién cuando la sección está cerca.
const EquipoStage = dynamic(() => import("./equipo-stage"), { ssr: false, loading: () => <StageNote>Cargando el equipo en 3D</StageNote> });

function StageNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <p className="pa-eq-loading text-sm text-[var(--pa-on-dark-muted)]">{children}</p>
    </div>
  );
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const reduceQuery = "(prefers-reduced-motion: reduce)";
function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(reduceQuery);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(reduceQuery).matches,
    () => false,
  );
}

/**
 * Los equipos en 3D: paneles y termotanques que se giran con el dedo o el mouse, con sus
 * partes numeradas. Cada parte dice qué hace y, si toca, qué limpia o revisa Matías. La
 * lista de partes de abajo es la misma información sin 3D (y lo que queda si no hay WebGL).
 * Cierra con las marcas, en celdas blancas para que cada logo vaya en sus colores.
 */
export function Equipos() {
  const baseId = useId();
  const reduced = useReducedMotion();
  const [id, setId] = useState<EquipoId>("paneles");
  const [part, setPart] = useState(0);
  const [yaw, setYaw] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [near, setNear] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const eq = equipos.find((e) => e.id === id)!;
  const active = eq.parts[part];

  // Carga diferida: arranca a ~600px de entrar en pantalla.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setWebgl(hasWebGL());
        setNear(true);
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function choose(next: EquipoId) {
    setId(next);
    setPart(0);
    setYaw(0);
    setResetKey((k) => k + 1);
  }

  // Una pieza de atrás da vuelta el equipo para mostrarla; las demás lo vuelven al frente.
  function pickPart(i: number) {
    setPart(i);
    setYaw(eq.parts[i].back ? Math.PI : 0);
  }

  function onTabKey(e: KeyboardEvent<HTMLDivElement>) {
    const i = equipos.findIndex((x) => x.id === id);
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (step === undefined && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const j = e.key === "Home" ? 0 : e.key === "End" ? equipos.length - 1 : (i + step! + equipos.length) % equipos.length;
    choose(equipos[j].id);
    document.getElementById(`${baseId}-tab-${equipos[j].id}`)?.focus();
  }

  return (
    <section id="equipos" aria-labelledby="pa-eq-title" className="pa-dark">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pa-eq-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            Lo que va en tu techo, de cerca.
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-on-dark-muted)] lg:col-span-5">
            Giralo con el dedo o el mouse. Tocá los números para ver qué hace cada parte y qué reviso cuando vuelvo.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Equipos"
          onKeyDown={onTabKey}
          className="pa-eq-tabs mt-12 grid grid-cols-3 lg:mt-14"
        >
          {equipos.map((e) => {
            const selected = e.id === id;
            return (
              <button
                key={e.id}
                id={`${baseId}-tab-${e.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(e.id)}
                className="pa-eq-tab"
              >
                <span className="block sm:hidden">
                  <span className="block text-xs text-[var(--pa-on-dark-muted)]">{e.kicker}</span>
                  <span className="mt-0.5 block text-[0.9rem] leading-tight font-semibold">{e.tab}</span>
                </span>
                <span className="pa-wide hidden text-lg leading-tight font-semibold sm:block">{e.label}</span>
                <span className="mt-1 hidden text-sm text-[var(--pa-on-dark-muted)] sm:block">{e.short}</span>
              </button>
            );
          })}
        </div>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${id}`}
          className="grid lg:grid-cols-12"
        >
          <div ref={stageRef} className="pa-eq-stage relative aspect-[4/3.6] w-full sm:aspect-[4/3] lg:col-span-8 lg:aspect-auto lg:min-h-[min(38rem,72svh)]">
            {webgl === false ? (
              <StageNote>Tu navegador no muestra 3D. Abajo están las partes del equipo.</StageNote>
            ) : near ? (
              <div className="absolute inset-0">
                <EquipoStage
                  id={id}
                  activePart={part}
                  onPart={pickPart}
                  yaw={yaw}
                  resetKey={resetKey}
                  reduced={reduced}
                  onFail={() => setWebgl(false)}
                />
              </div>
            ) : (
              <StageNote>Cargando el equipo en 3D</StageNote>
            )}

            {webgl !== false && (
              <>
                <p className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 text-sm text-[var(--pa-on-dark-muted)]">
                  <HandGrabbingIcon size={18} aria-hidden="true" />
                  Arrastrá para girar
                </p>
                <div className="pa-eq-ctrls absolute right-3 bottom-3 flex">
                  <button type="button" className="pa-eq-ctrl" aria-label="Girar a la izquierda" onClick={() => setYaw((y) => y - Math.PI / 4)}>
                    <ArrowCounterClockwiseIcon size={18} aria-hidden="true" />
                  </button>
                  <button type="button" className="pa-eq-ctrl" aria-label="Girar a la derecha" onClick={() => setYaw((y) => y + Math.PI / 4)}>
                    <ArrowClockwiseIcon size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="pa-eq-ctrl"
                    aria-label="Volver a la vista de entrada"
                    onClick={() => {
                      setYaw(0);
                      setResetKey((k) => k + 1);
                    }}
                  >
                    <CornersOutIcon size={18} aria-hidden="true" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* La ficha: las partes (también para quien no ve el 3D), lo que trae y la consulta. */}
          <div className="pa-eq-sheet flex flex-col lg:col-span-4">
            <div className="p-5 sm:p-7" aria-live="polite">
              <h3 className="text-sm font-semibold text-[var(--pa-on-dark-muted)]">Partes</h3>
              <ul className="mt-3">
                {eq.parts.map((p, i) => (
                  <li key={p.title}>
                    <button type="button" onClick={() => pickPart(i)} aria-pressed={part === i} className="pa-eq-part">
                      <span className="pa-eq-part-n pa-num" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className="pa-wide font-semibold">{p.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-5 min-h-[4lh] leading-relaxed text-[var(--pa-on-dark-muted)]">
                <span className="font-semibold text-[var(--pa-on-dark)]">{active.title}.</span> {active.body}
              </p>
            </div>

            <div className="mt-auto border-t border-[var(--pa-dark-line)] p-5 sm:p-7">
              <ul className="space-y-2 text-sm">
                {eq.specs.map((s) => (
                  <li key={s} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 bg-[var(--pa-sky)]" />
                    {s}
                  </li>
                ))}
              </ul>
              {!eq.confirmed && <Todo className="pa-todo-dark mt-5">Confirmar si {pibe.firstName} lo instala</Todo>}
              <button
                type="button"
                onClick={() => prefillContact({ servicio: eq.servicio, mensaje: eq.ask })}
                className="pa-btn pa-btn-gold mt-6 w-full"
              >
                Consultar por este equipo
                <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div>
              <h3 className="pa-wide text-[clamp(1.4rem,2.2vw,1.85rem)] leading-tight font-semibold">Marcas que instalo</h3>
              <p className="mt-2 max-w-[52ch] text-[var(--pa-on-dark-muted)]">
                Paneles, inversores y baterías de marcas que se conocen en todo el mundo.
              </p>
            </div>
            {!brandsConfirmed && <Todo className="pa-todo-dark">Confirmar con {pibe.firstName} cuáles usa</Todo>}
          </div>
          <div className="pa-brands mt-8">
            {brands.map((g) => (
              <div key={g.group} className="pa-brands-row">
                <h4 className="pa-brands-label pa-wide">{g.group}</h4>
                <ul className="pa-brands-cells">
                  {g.items.map((b) => (
                    <li key={b.name} className="pa-brand">
                      <Image
                        src={b.src}
                        alt={b.name}
                        width={b.w}
                        height={b.h}
                        sizes="12rem"
                        className="pa-brand-logo"
                        style={{ ["--h" as string]: `${b.rem}rem` }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
