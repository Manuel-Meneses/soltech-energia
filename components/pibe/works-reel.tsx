"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ArrowsOutSimpleIcon, ArrowUpRightIcon, SquaresFourIcon } from "@phosphor-icons/react";
import { TrackedLink } from "./tracked-link";

export type ReelPhoto = { src: string; alt: string; caption: string | null };

const pad = (n: number) => String(n).padStart(2, "0");
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * La grilla de obras elegidas y, en su mismo lugar, el visor con todas las fotos. Tocar una obra
 * abre el visor en esa foto; el botón de abajo pasa de uno al otro.
 */
export function WorksGallery({
  photos,
  featured,
  instagram,
}: {
  photos: ReelPhoto[];
  featured: { index: number; pos?: string }[];
  instagram: string | null;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const last = featured.length - 1;

  function show(i: number | null) {
    setOpen(i);
    if (i === null) toggle.current?.focus({ preventScroll: true });
    requestAnimationFrame(() => root.current?.scrollIntoView({ block: "start", behavior: reducedMotion() ? "auto" : "smooth" }));
  }

  return (
    <div ref={root} className="mt-14 scroll-mt-2">
      {open === null ? (
        <ul className="pa-works" aria-label="Obras elegidas">
          {featured.map((f, k) => {
            const p = photos[f.index];
            return (
              <li key={p.src} className="pa-works-cell">
                <button
                  type="button"
                  onClick={() => show(f.index)}
                  aria-label={`Ver en grande: ${p.caption ?? p.alt}`}
                  className="pa-works-btn"
                >
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    sizes={k === 0 || k === last ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                    className="object-cover"
                    style={f.pos ? { objectPosition: f.pos } : undefined}
                  />
                  {p.caption && <span className="pa-works-cap">{p.caption}</span>}
                  <ArrowsOutSimpleIcon size={18} weight="bold" className="pa-works-zoom" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <WorksReel photos={photos} start={open} />
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
        <button
          ref={toggle}
          type="button"
          onClick={() => show(open === null ? 0 : null)}
          aria-expanded={open !== null}
          className="pa-btn pa-btn-line"
        >
          {open === null ? `Ver las ${photos.length} fotos` : "Volver a las obras elegidas"}
          {open === null ? (
            <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
          ) : (
            <SquaresFourIcon size={18} weight="bold" aria-hidden="true" />
          )}
        </button>
        {instagram && (
          <TrackedLink
            href={`https://instagram.com/${instagram}`}
            event="instagram"
            from="trabajos"
            target="_blank"
            rel="noopener noreferrer"
            className="pa-link inline-flex items-center gap-1.5 font-semibold"
          >
            Más obras en Instagram
            <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" />
            <span className="sr-only"> (se abre en otra pestaña)</span>
          </TrackedLink>
        )}
      </div>
    </div>
  );
}

/**
 * El visor de todas las fotos. La pantalla es una pista con scroll-snap: en el celular se pasa
 * con el dedo, sin JavaScript de por medio; las flechas, el teclado y las miniaturas la mueven
 * con scrollTo. La foto actual sale de la posición del scroll, así todo queda sincronizado.
 */
function WorksReel({ photos, start }: { photos: ReelPhoto[]; start: number }) {
  const track = useRef<HTMLDivElement>(null);
  const thumbs = useRef<HTMLOListElement>(null);
  const [current, setCurrent] = useState(start);
  const total = photos.length;

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const next = (i + total) % total;
      el.scrollTo({ left: next * el.clientWidth, behavior: reducedMotion() ? "auto" : "smooth" });
    },
    [total],
  );

  // Abre en la foto elegida, sin animar, con el foco en la pista para pasar con las flechas.
  // La foto actual sale de la posición del scroll (también cuando se pasa con el dedo). Si
  // cambia el tamaño (girar el celular, achicar la ventana), la pista vuelve a la misma foto:
  // sin esto el navegador la reencaja en la primera.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let index = start;
    let frame = 0;
    const keep = () => {
      el.scrollLeft = index * el.clientWidth;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        index = Math.round(el.scrollLeft / el.clientWidth);
        setCurrent(index);
      });
    };
    keep();
    el.focus({ preventScroll: true });
    el.addEventListener("scroll", onScroll, { passive: true });
    const resize = new ResizeObserver(keep);
    resize.observe(el);
    window.addEventListener("resize", keep);
    return () => {
      el.removeEventListener("scroll", onScroll);
      resize.disconnect();
      window.removeEventListener("resize", keep);
      cancelAnimationFrame(frame);
    };
  }, [start]);

  // La miniatura actual queda a la vista dentro de su tira, sin mover la página.
  useEffect(() => {
    const strip = thumbs.current;
    const item = strip?.children[current] as HTMLElement | undefined;
    if (!strip || !item) return;
    const left = item.offsetLeft - strip.clientWidth / 2 + item.clientWidth / 2;
    strip.scrollTo({ left, behavior: reducedMotion() ? "auto" : "smooth" });
  }, [current]);

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") go(current + 1);
    else if (e.key === "ArrowLeft") go(current - 1);
    else return;
    e.preventDefault();
  }

  const photo = photos[current];

  return (
    <div className="pa-reel-works pa-dark" role="region" aria-roledescription="carrusel" aria-label="Todas las fotos de trabajos" onKeyDown={onKey}>
      <div ref={track} className="pa-wr-track" tabIndex={0} aria-label="Foto actual; usá las flechas para pasar">
        {photos.map((p, i) => (
          <figure
            key={p.src}
            className="pa-wr-slide"
            role="group"
            aria-roledescription="foto"
            aria-label={`${i + 1} de ${total}`}
            aria-hidden={i !== current}
          >
            <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1408px) 1408px, 100vw" className="object-contain" />
          </figure>
        ))}
      </div>

      <div className="pa-wr-bar">
        <p className="pa-wr-count pa-num" aria-live="polite">
          {pad(current + 1)}
          <span> / {pad(total)}</span>
        </p>
        <p className="pa-wr-caption">{photo?.caption ?? "Obra de Soltech Energía"}</p>
        <div className="pa-wr-arrows">
          <button type="button" onClick={() => go(current - 1)} aria-label="Foto anterior">
            <ArrowLeftIcon size={20} weight="bold" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(current + 1)} aria-label="Foto siguiente">
            <ArrowRightIcon size={20} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ol ref={thumbs} className="pa-wr-thumbs" aria-label="Todas las fotos">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button type="button" onClick={() => go(i)} aria-current={i === current} aria-label={`Ver foto ${i + 1}`} className="pa-wr-thumb">
              <Image src={p.src} alt="" fill sizes="8rem" className="object-cover" />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
