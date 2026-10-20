import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { heroPhoto, pibe, pibeCta, services } from "@/lib/pibe";
import { SunNow } from "./sun-now";

/**
 * Primera pantalla: una foto real de Matías junto a los paneles, a pantalla completa, y el
 * sol de Buenos Aires ahora. Un degradé de azul noche del lado del texto (arriba, en celular)
 * asegura que el titular se lea sobre cualquier parte de la foto.
 * Al pie, la hoja de datos: los cuatro servicios, cada uno con su color y un enlace a su parte.
 * Al entrar, las líneas del titular suben desde su renglón y la foto se asienta.
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
        <div className="max-w-[44rem] lg:max-w-[62%]">
          <h1 id="pa-hero-title" className="pa-display text-[clamp(min(2.9rem,12vw),min(5.2vw,10svh),5.5rem)]">
            <span className="pa-line lg:whitespace-nowrap" style={{ ["--i" as string]: 0 }}>
              <span>El sol ya pega</span>
            </span>
            <span className="pa-line lg:whitespace-nowrap" style={{ ["--i" as string]: 1 }}>
              <span>en tu techo.</span>
            </span>
          </h1>
          <p
            className="pa-rise mt-7 max-w-[44ch] lg:max-w-[40ch] text-lg leading-relaxed text-[var(--pa-on-dark)]/85 sm:text-xl"
            style={{ ["--i" as string]: 3 }}
          >
            Soy {pibe.person}. Instalo paneles solares y termotanques solares en casas y comercios de {pibe.zone}, y
            después los mantengo y los limpio para que sigan rindiendo.
          </p>
          <div className="pa-rise mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ ["--i" as string]: 4 }}>
            <a href={pibeCta.href} className="pa-btn pa-btn-gold w-full sm:w-auto">
              {pibeCta.label}
              <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
            </a>
            <a href="#calculadora" className="pa-link font-semibold">
              Calculá cuántos paneles necesitás
            </a>
          </div>
          <SunNow className="mt-10 mb-10 lg:mb-0" />
        </div>
      </div>

      {/* La franja del pie es opaca a todo el ancho: la foto termina donde empieza la hoja. */}
      <div className="relative mt-auto w-full bg-[var(--pa-ink)]">
        <div className="mx-auto w-full max-w-[88rem] px-5 pb-8 sm:px-8 lg:px-12 lg:pb-10">
          <ul className="pa-hero-sheet grid grid-cols-2 lg:-mx-6 lg:grid-cols-4" aria-label="Servicios">
            {services.map((s, k) => (
              <li key={s.id} className="pa-rise" style={{ ["--i" as string]: 6 + k }}>
                <a href={`#servicio-${s.id}`} className="pa-hero-cell" data-svc={s.id}>
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
