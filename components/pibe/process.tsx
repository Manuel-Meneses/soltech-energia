"use client";

import { steps } from "@/lib/pibe";
import { useReveal } from "@/components/use-reveal";

/* La altura del sol en cada paso (horizonte en y = 104 de 120): sale, sube, culmina al
   mediodía, baja y de noche queda bajo el horizonte. */
const HORIZON = 104;
const heights = [0.14, 0.62, 1, 0.48, -0.2];
const sunAt = (i: number) => ({ y: HORIZON - heights[i] * 84 });

/**
 * Cómo trabajamos, de sol a sol: cinco pasos numerados en celdas unidas por juntas, cada uno con
 * el sol a la altura de su hora. El número dice el orden; el sol, la hora del día. Al entrar, los
 * pasos suben en orden y el sol sale. En celular es un carril que se desliza de costado.
 */
export function Process() {
  const ref = useReveal<HTMLOListElement>();

  return (
    <section id="como-trabajo" aria-labelledby="pa-process-title" className="pa-dark" data-own-entrance>
      <div className="mx-auto max-w-[88rem] px-5 pt-20 sm:px-8 sm:pt-28 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pa-process-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            Cómo trabajamos, de sol a sol.
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-on-dark-muted)] lg:col-span-5">
            Del primer mensaje a la vuelta para el mantenimiento: lo que pasa en cada paso.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[88rem] px-5 pt-14 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <ol ref={ref} className="pa-day pa-mrail grid lg:grid-cols-5">
          {steps.map((s, i) => {
            const sun = sunAt(i);
            return (
              <li key={s.title} className="pa-day-step" data-night={i === steps.length - 1 || undefined} style={{ ["--i" as string]: i }}>
                <div className="flex items-start justify-between gap-4">
                  <span className="pa-day-n pa-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <svg viewBox="0 0 120 120" className="pa-day-sun" aria-hidden="true">
                    <line x1="0" x2="120" y1={HORIZON} y2={HORIZON} />
                    <circle cx="60" cy={sun.y} r="14" />
                  </svg>
                </div>
                <h3 className="pa-wide mt-6 text-xl font-semibold leading-snug">
                  <span className="sr-only">
                    Paso {i + 1}, {s.hour}:{" "}
                  </span>
                  {s.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[var(--pa-on-dark-muted)]">{s.body}</p>
              </li>
            );
          })}
        </ol>
        <p className="pa-swipe-hint mt-5">Deslizá para ver los pasos</p>
      </div>
    </section>
  );
}
