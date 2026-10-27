import Image from "next/image";
import { ArrowRightIcon, SealCheckIcon } from "@phosphor-icons/react/ssr";
import { brands, heroPhoto, pibe, pibeCta, services } from "@/lib/pibe";
import { TrackedLink } from "./tracked-link";

/** Las dos primeras marcas de paneles y de inversores. */
const topBrands = brands.slice(0, 2).flatMap((g) => g.items.slice(0, 2).map((b) => b.name));

/** La hoja del pie: cuatro servicios. Respaldo y piscinas saltan a su sección; limpieza queda en Servicios. */
const sheet = services.filter((s) => s.id !== "limpieza");

/** Lo que respalda a Soltech, con los datos cargados en lib/pibe.ts: un dato sin cargar no sale. */
const trust = [
  pibe.license,
  pibe.experience && `${pibe.experience} en el rubro`,
  `Equipos ${topBrands.slice(0, -1).join(", ")} y ${topBrands.at(-1)}`,
].filter((t): t is string => !!t);

/**
 * Primera pantalla: el titular enorme en mayúsculas sobre una foto real de una instalación, lo
 * que gana el vecino en una línea, un solo botón y la franja de lo que respalda a Soltech. Un velo
 * de azul noche, más denso del lado del texto, asegura que todo se lea sobre la foto. Al pie, la
 * hoja de datos: cuatro servicios, cada uno con un enlace a su celda o a su sección.
 * Al entrar, las líneas del titular suben desde su renglón, la foto se asienta y el sol de "SOL"
 * sale desde la base del renglón, como amanece.
 */
export function PibeHero() {
  return (
    <section id="inicio" aria-labelledby="pa-hero-title" className="pa-dark pa-hero relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <figure className="pa-hero-photo absolute inset-0 -z-10">
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ ["--pos" as string]: heroPhoto.pos, ["--pos-m" as string]: heroPhoto.posMobile }}
        />
      </figure>

      <div className="mx-auto w-full max-w-[88rem] px-5 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
        <h1 id="pa-hero-title" className="pa-hero-title">
          <span className="pa-line" style={{ ["--i" as string]: 0 }}>
            <span>Generá</span>
          </span>
          <span className="pa-line" style={{ ["--i" as string]: 1 }}>
            <span>tu luz</span>
          </span>
          <span className="pa-line" style={{ ["--i" as string]: 2 }}>
            <span>
              {/* La O de "sol" es el sol del ícono; el lector de pantalla lee la palabra entera. */}
              <span className="sr-only">con el sol.</span>
              <span aria-hidden="true">
                con el{" "}
                <span className="whitespace-nowrap">
                  s<span className="pa-hero-sun" />l.
                </span>
              </span>
            </span>
          </span>
        </h1>
        <p className="pa-rise pa-hero-lead" style={{ ["--i" as string]: 3 }}>
          Energía solar a tu medida: diseñamos, vendemos e instalamos sistemas fotovoltaicos en todo el país. También
          respaldo para los cortes y piletas templadas sin gas.
        </p>
        <div className="pa-rise mt-9 flex flex-wrap items-center gap-x-8 gap-y-5" style={{ ["--i" as string]: 4 }}>
          <TrackedLink
            href={pibeCta.href}
            event="pedi_visita"
            from="hero"
            className="pa-btn pa-btn-action pa-hero-cta w-full sm:w-auto"
          >
            {pibeCta.label}
            <ArrowRightIcon size={20} weight="bold" className="pa-arrow" aria-hidden="true" />
          </TrackedLink>
          <a href="#calculadora" className="pa-link pa-hero-link">
            Calculá cuántos paneles necesitás
          </a>
        </div>
        <ul className="pa-rise pa-trust mt-10 mb-10" style={{ ["--i" as string]: 5 }} aria-label="Por qué Soltech">
          {trust.map((t) => (
            <li key={t}>
              <SealCheckIcon size={18} weight="fill" className="pa-trust-icon" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* La franja del pie es opaca a todo el ancho: la foto termina donde empieza la hoja. */}
      <div className="relative mt-auto w-full bg-[var(--pa-ink)]">
        <div className="mx-auto w-full max-w-[88rem] px-5 pb-8 sm:px-8 lg:px-12 lg:pb-10">
          <ul className="pa-hero-sheet grid grid-cols-2 lg:-mx-6 lg:grid-cols-4" aria-label="Servicios">
            {sheet.map((s, k) => (
              <li key={s.id} className="pa-rise" style={{ ["--i" as string]: 6 + k }}>
                <a href={s.more?.href ?? `#servicio-${s.id}`} className="pa-hero-cell">
                  <span className="pa-wide text-[clamp(1.05rem,1.6vw,1.35rem)] font-semibold leading-tight">{s.title}</span>
                  <span className="mt-1.5 text-sm text-[var(--pa-on-dark-muted)]">{s.short}</span>
                  <ArrowRightIcon size={16} weight="bold" className="pa-arrow pa-hero-cell-arrow" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
