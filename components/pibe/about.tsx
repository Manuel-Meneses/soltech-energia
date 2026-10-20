import Image from "next/image";
import { pibe, portrait } from "@/lib/pibe";
import { Todo } from "./todo";

/**
 * Quién te instala. Un emprendedor vende confianza en sí mismo: su cara y su forma de
 * trabajar van antes que el catálogo. La foto y los datos que faltan quedan marcados.
 */
export function About() {
  const sheet: { label: string; value: string | null; hint?: string }[] = [
    { label: "Nombre", value: pibe.person },
    { label: "Zona", value: pibe.zone, hint: "Barrios o partidos que cubre" },
    { label: "Trabaja en", value: "Casas, PH, terrazas y comercios" },
    { label: "Matrícula", value: pibe.license, hint: "Electricista o instalador" },
    { label: "En el rubro desde", value: pibe.since },
  ];

  return (
    <section id="quien" aria-labelledby="pa-about-title" className="pa-paper">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-x-10 lg:px-12">
        <figure className="pa-portrait lg:col-span-5">
          <div className="pa-portrait-photo">
            <Image src={portrait.src} alt={portrait.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <figcaption className="mt-3 text-sm text-[var(--pa-muted)]">{pibe.person}, El Pibe del Aire.</figcaption>
        </figure>

        <div className="lg:col-span-7 lg:pl-6">
          <h2 id="pa-about-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)]">
            Trato directo, de principio a fin.
          </h2>
          <div className="mt-7 max-w-[56ch] space-y-4 text-lg leading-relaxed">
            <p>
              Trabajo por mi cuenta. Así que el que mira tu techo, el que te pasa el presupuesto y el que sube a instalar es
              la misma persona.
            </p>
            <p className="text-[var(--pa-muted)]">
              Si algo no anda, no hay un call center: me escribís a mí y lo vemos. Y como vuelvo a mantener y limpiar lo que
              instalo, me conviene que quede bien la primera vez.
            </p>
          </div>

          <dl className="pa-sheet mt-12">
            {sheet.map((row) => (
              <div key={row.label} className="pa-sheet-row">
                <dt className="text-sm text-[var(--pa-muted)]">{row.label}</dt>
                <dd className="pa-wide font-semibold">
                  {row.value ?? <Todo>{row.hint ?? "A completar"}</Todo>}
                  {row.value && row.hint && row.label === "Zona" && (
                    <Todo className="ml-3 align-middle">{row.hint}</Todo>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
