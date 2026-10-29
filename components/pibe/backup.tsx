"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRightIcon, LightningIcon, LightningSlashIcon } from "@phosphor-icons/react";
import { backup, brands, prefillContact } from "@/lib/pibe";
import { trackConversion } from "@/lib/track";

/** La cuadra: cada casa es una grilla de ventanas (columnas × pisos). La cuarta es la tuya. */
const HOUSES = [
  { cols: 2, rows: 3 },
  { cols: 3, rows: 2 },
  { cols: 2, rows: 4 },
  { cols: 3, rows: 3, yours: true },
  { cols: 2, rows: 2 },
  { cols: 3, rows: 4 },
  { cols: 2, rows: 3 },
];

/** Cada ventana se apaga a su tiempo, para que la cuadra no se apague de golpe como una foto. */
const winDelay = (house: number, win: number) => ((house * 7 + win * 13) % 9) * 45;

const batteries = brands.find((g) => g.group === "Baterías")?.items.map((b) => b.name) ?? [];

/**
 * Sistemas de respaldo: un inversor y baterías, sin paneles. La cuadra se apaga y tu casa
 * sigue con luz. La primera vez que la escena entra en pantalla, el corte pasa solo (salvo con
 * movimiento reducido); después lo maneja el botón. El texto de estado se anuncia a lectores de
 * pantalla y la escena es decorativa. El cable y la batería solo se animan mientras se ven.
 */
export function Backup() {
  const [on, setOn] = useState(true);
  const [toggled, setToggled] = useState(false);
  const [inView, setInView] = useState(false);
  const touched = useRef(false);
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scene.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let demo: number | undefined;
    let shown = false;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting && e.intersectionRatio >= 0.6 && !shown && !reduce) {
          shown = true;
          demo = window.setTimeout(() => {
            if (touched.current) return;
            setToggled(true);
            setOn(false);
          }, 1100);
        }
      },
      { threshold: [0, 0.6] },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(demo);
    };
  }, []);

  function toggle() {
    touched.current = true;
    setToggled(true);
    setOn((v) => !v);
  }

  function ask() {
    trackConversion("servicio_consultado", { servicio: "Sistemas de respaldo" });
    prefillContact({ servicio: "Sistemas de respaldo", mensaje: backup.ask });
  }

  return (
    <section id="respaldo" aria-labelledby="pa-bk-title" className="pa-paper">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pa-bk-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            Se corta la luz. Tu casa sigue.
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-muted)] lg:col-span-5">
            Un sistema de respaldo es un inversor y baterías, sin paneles. Mientras hay luz, las baterías se cargan de
            la red; cuando se corta, la casa pasa a las baterías sola.
          </p>
        </div>

        <div className="pa-bk mt-14">
          <div
            ref={scene}
            className="pa-bk-scene pa-dark"
            data-power={on ? "on" : "off"}
            data-toggled={toggled || undefined}
            data-inview={inView || undefined}
          >
            <div className="pa-bk-top">
              <p className="pa-bk-status" aria-live="polite">
                <span className="pa-bk-dot" aria-hidden="true" />
                {on ? "Hay luz en la cuadra. Las baterías se cargan de la red." : "Se cortó la luz. Tu casa sigue con las baterías."}
              </p>
              <button type="button" aria-pressed={!on} onClick={toggle} className="pa-btn pa-btn-action pa-bk-switch">
                {on ? (
                  <LightningSlashIcon size={20} weight="bold" aria-hidden="true" />
                ) : (
                  <LightningIcon size={20} weight="fill" aria-hidden="true" />
                )}
                {on ? "Cortar la luz" : "Volver a dar la luz"}
              </button>
            </div>

            <div className="pa-bk-street" aria-hidden="true">
              <span className="pa-bk-wire">
                <span className="pa-bk-flow" />
              </span>
              <div className="pa-bk-houses">
                {HOUSES.map((h, i) => (
                  <div
                    key={i}
                    className="pa-bk-house"
                    data-yours={h.yours || undefined}
                    style={{ ["--cols" as string]: h.cols } as CSSProperties}
                  >
                    {Array.from({ length: h.cols * h.rows }, (_, w) => (
                      <span key={w} className="pa-bk-win" style={{ ["--d" as string]: `${winDelay(i, w)}ms` } as CSSProperties} />
                    ))}
                    {h.yours && (
                      <>
                        <span className="pa-bk-label">Tu casa</span>
                        <span className="pa-bk-battery">
                          <span className="pa-bk-cells">
                            {[0, 1, 2, 3].map((c) => (
                              <i key={c} style={{ ["--c" as string]: c } as CSSProperties} />
                            ))}
                          </span>
                          <span className="pa-bk-battery-label">Batería</span>
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pa-bk-keeps">
              <p>Lo que conectes sigue andando:</p>
              <ul>
                {backup.keeps.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
          </div>

          <figure className="pa-bk-photo">
            <Image src={backup.photo.src} alt={backup.photo.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            <figcaption>{backup.photo.caption}</figcaption>
          </figure>
        </div>

        <ul className="pa-bk-facts mt-12">
          {backup.facts.map((f) => (
            <li key={f.title} className="pa-bk-fact">
              <h3 className="pa-wide text-xl font-semibold leading-snug">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-[var(--pa-muted)]">{f.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <button type="button" onClick={ask} className="pa-btn pa-btn-action w-full sm:w-auto">
            Consultar por un respaldo
            <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
          </button>
          {batteries.length > 0 && (
            <p className="text-[var(--pa-muted)]">Trabajamos con baterías {batteries.join(" y ")}.</p>
          )}
        </div>
      </div>
    </section>
  );
}
