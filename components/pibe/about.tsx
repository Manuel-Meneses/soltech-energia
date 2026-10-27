import Image from "next/image";
import { brands, pibe, portrait } from "@/lib/pibe";

/**
 * Quiénes somos. La empresa vende confianza con su forma de trabajar antes que con el
 * catálogo: un mismo equipo de punta a punta y con qué marcas. Habla la empresa, no una persona:
 * el cliente no quiere que se lea como un emprendimiento unipersonal. Un dato sin
 * cargar no sale en la ficha. Las marcas van en celdas blancas, para que cada logo vaya en sus
 * colores.
 */
export function About() {
  const sheet = [
    { label: "Zona", value: pibe.coverage },
    { label: "Trabajamos en", value: "Casas, empresas, campos y vehículos" },
    { label: "Instalaciones", value: pibe.license && `Con ${pibe.license.toLowerCase()}` },
    { label: "En el rubro", value: pibe.experience },
  ].filter((row): row is { label: string; value: string } => !!row.value);

  return (
    <section id="quien" aria-labelledby="pa-about-title" className="pa-paper">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          <figure className="pa-portrait lg:col-span-5">
            <div className="pa-portrait-photo">
              <Image src={portrait.src} alt={portrait.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-sm text-[var(--pa-muted)]">Instalación de un inversor, por {pibe.name}.</figcaption>
          </figure>

          <div className="lg:col-span-7 lg:pl-6">
            <h2 id="pa-about-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)]">
              Un mismo equipo, de principio a fin.
            </h2>
            <div className="mt-7 max-w-[56ch] space-y-4 text-lg leading-relaxed">
              <p>
                {pibe.name} diseña, vende e instala sistemas fotovoltaicos. Nuestro equipo técnico acompaña cada proyecto de
                principio a fin: estudia tu consumo, dimensiona el sistema justo para lo que necesitás e instala con
                criterio técnico y seguridad.
              </p>
              <p>
                El mismo equipo que releva tu techo arma el presupuesto y hace la instalación. Nada pasa de mano en mano.
              </p>
              <p className="text-[var(--pa-muted)]">
                Si algo no anda, nos escribís y lo vemos. Y como volvemos a mantener y limpiar lo que instalamos, nos
                conviene que quede bien la primera vez.
              </p>
            </div>

            <dl className="pa-sheet mt-12">
              {sheet.map((row) => (
                <div key={row.label} className="pa-sheet-row">
                  <dt className="text-sm text-[var(--pa-muted)]">{row.label}</dt>
                  <dd className="pa-wide font-semibold">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20 lg:mt-24">
          <h3 className="pa-wide text-[clamp(1.4rem,2.2vw,1.85rem)] leading-tight font-semibold">Marcas que instalamos</h3>
          <p className="mt-2 max-w-[52ch] text-[var(--pa-muted)]">
            Paneles, inversores y baterías de marcas que se conocen en todo el mundo.
          </p>
          <div className="pa-brands mt-8">
            {brands.map((g) => (
              <div key={g.group} className="pa-brands-row">
                <h4 className="pa-brands-label pa-wide">{g.group}</h4>
                <ul className="pa-brands-cells" style={{ ["--n" as string]: g.items.length }}>
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
