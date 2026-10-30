"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, ArrowsOutSimpleIcon, WhatsappLogoIcon, XIcon } from "@phosphor-icons/react";
import type { GalleryPhoto } from "@/lib/galeria";
import { pibe, waLink, workKinds, type WorkKind } from "@/lib/pibe";
import { TrackedLink } from "./tracked-link";

const pad = (n: number) => String(n).padStart(2, "0");
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Cuántas fotos abren el mosaico antes de "Ver las N fotos". */
const FIRST = 8;

/**
 * El dibujo del mosaico. Cada letra es una celda: g, grande (2×2); a, ancha (2×1); p, panorámica
 * (a todo el ancho); c, chica (1×1). Cada tanda suma un múltiplo de 4 columnas (y de 2 en el
 * celular), así que nunca queda un hueco, con cualquier cantidad de fotos.
 */
type Slot = "g" | "a" | "p" | "c";
const BLOCKS: Slot[][] = [
  ["g", "c", "c", "c", "c", "c", "c", "a"],
  ["c", "c", "g", "c", "c", "a", "c", "c"],
];
const REST: Record<number, Slot[]> = {
  1: ["p"],
  2: ["g", "g"],
  3: ["g", "a", "a"],
  4: ["g", "c", "c", "a"],
  5: ["g", "c", "c", "c", "c"],
  6: ["g", "g", "c", "c", "c", "c"],
  7: ["g", "c", "c", "c", "c", "a", "a"],
};

type Tile = { photo: GalleryPhoto; slot: Slot };

/**
 * Reparte las fotos en el dibujo en el orden de la planilla. La única excepción: dentro de cada
 * tanda, las celdas anchas toman primero una foto apaisada, porque una vertical ahí queda cortada
 * (en las grandes, casi cuadradas, no hace falta).
 */
function arrange(photos: GalleryPhoto[]): Tile[] {
  const tiles: Tile[] = [];
  let block = 0;
  for (let at = 0; at < photos.length; block++) {
    const left = photos.length - at;
    const pattern = left >= FIRST ? BLOCKS[block % BLOCKS.length] : REST[left];
    const pool = photos.slice(at, at + pattern.length);
    const placed: (GalleryPhoto | undefined)[] = pattern.map(() => undefined);

    pattern.forEach((slot, i) => {
      if (slot === "c" || slot === "g") return;
      const best = pool.findIndex((p) => p.ratio >= 1.2);
      const any = pool.findIndex((p) => p.ratio >= 1);
      [placed[i]] = pool.splice(best >= 0 ? best : any >= 0 ? any : 0, 1);
    });
    pattern.forEach((slot, i) => {
      if (slot === "c" || slot === "g") placed[i] = pool.shift();
    });

    pattern.forEach((slot, i) => tiles.push({ photo: placed[i]!, slot }));
    at += pattern.length;
  }
  return tiles;
}

const tileSizes: Record<Slot, string> = {
  g: "(min-width: 768px) 50vw, 100vw",
  a: "(min-width: 768px) 50vw, 100vw",
  p: "100vw",
  c: "(min-width: 768px) 25vw, 50vw",
};

/**
 * Mueve una foto entre el mosaico y el visor con una transición de vista: el navegador anima la
 * captura con transform y opacity. Sin soporte, o con movimiento reducido, cambia sin animar.
 */
function morph(from: HTMLElement | null | undefined, change: () => HTMLElement | null | undefined) {
  if (!document.startViewTransition || reducedMotion()) {
    change();
    return;
  }
  if (from) from.style.viewTransitionName = "pa-obra";
  let to: HTMLElement | null | undefined;
  const transition = document.startViewTransition(() => {
    if (from) from.style.viewTransitionName = "";
    to = change();
    if (to) to.style.viewTransitionName = "pa-obra";
  });
  const clear = () => {
    if (to) to.style.viewTransitionName = "";
  };
  transition.finished.then(clear, clear);
}

/**
 * La galería de Trabajos: filtros por tipo de obra pegados a un mosaico de fotos. Tocar una foto la
 * abre en el visor, con todas las de ese filtro para pasar.
 */
export function WorksGallery({ photos, instagram }: { photos: GalleryPhoto[]; instagram: string | null }) {
  const [kind, setKind] = useState<WorkKind | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  /** Las fotos entran animadas al filtrar o abrir más, nunca al cargar la página. */
  const [touched, setTouched] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLUListElement>(null);
  const more = useRef<HTMLButtonElement>(null);

  const kinds = useMemo(
    () => workKinds.map((k) => ({ kind: k, count: photos.filter((p) => p.kind === k).length })).filter((k) => k.count > 0),
    [photos],
  );
  const tiles = useMemo(() => arrange(kind ? photos.filter((p) => p.kind === kind) : photos), [photos, kind]);
  const shown = expanded ? tiles : tiles.slice(0, FIRST);
  const label = kind ? `${tiles.length} ${tiles.length === 1 ? "foto" : "fotos"} de ${kind}` : `${tiles.length} fotos`;

  function filter(next: WorkKind | null) {
    setKind(next);
    setExpanded(false);
    setTouched(true);
  }

  function toggleMore() {
    if (expanded) {
      requestAnimationFrame(() => root.current?.scrollIntoView({ block: "start", behavior: reducedMotion() ? "auto" : "smooth" }));
    }
    setExpanded(!expanded);
    setTouched(true);
  }

  const tileOf = (i: number) => grid.current?.querySelector<HTMLElement>(`[data-tile="${i}"] img`);

  function openAt(i: number) {
    morph(tileOf(i), () => {
      flushSync(() => setOpen(i));
      return document.querySelector<HTMLElement>(`[data-slide="${i}"] img`);
    });
  }

  function close(from: HTMLElement | null, current: number) {
    morph(from, () => {
      flushSync(() => setOpen(null));
      // El foco vuelve a la foto; si se pasó a una que el mosaico no muestra, al botón de ver más.
      const tile = grid.current?.querySelector<HTMLElement>(`[data-tile="${current}"] button`);
      (tile ?? more.current)?.focus({ preventScroll: true });
      tile?.scrollIntoView({ block: "nearest" });
      return tileOf(current);
    });
  }

  return (
    <div ref={root} className="mt-14 scroll-mt-2">
      {kinds.length > 1 && (
        <div className="pa-filters" role="group" aria-label="Filtrar las obras por tipo">
          <button type="button" aria-pressed={kind === null} onClick={() => filter(null)} className="pa-filter">
            Todas <span className="pa-num">{photos.length}</span>
          </button>
          {kinds.map((k) => (
            <button key={k.kind} type="button" aria-pressed={kind === k.kind} onClick={() => filter(k.kind)} className="pa-filter">
              {k.kind} <span className="pa-num">{k.count}</span>
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {touched ? `Se muestran ${shown.length} de ${label}.` : ""}
      </p>

      <ul ref={grid} key={kind ?? "todas"} className="pa-works" aria-label={`Obras: ${label}`}>
        {shown.map(({ photo: p, slot }, i) => {
          const enters = touched && (kind !== null || i >= FIRST || !expanded);
          const delay = i >= FIRST && expanded ? i - FIRST : i;
          return (
            <li
              key={p.src}
              data-tile={i}
              className={`pa-works-cell pa-tile-${slot}${enters ? " pa-tile-in" : ""}`}
              style={enters ? { animationDelay: `${Math.min(delay, 8) * 45}ms` } : undefined}
            >
              <button type="button" onClick={() => openAt(i)} aria-label={`Ver en grande: ${p.description ?? p.alt}`} className="pa-works-btn">
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes={tileSizes[slot]}
                  className="object-cover"
                  style={p.pos ? { objectPosition: p.pos } : undefined}
                />
                {p.description && <span className="pa-works-cap">{p.description}</span>}
                <ArrowsOutSimpleIcon size={18} weight="bold" className="pa-works-zoom" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
        {tiles.length > FIRST && (
          <button ref={more} type="button" onClick={toggleMore} aria-expanded={expanded} className="pa-btn pa-btn-line">
            {expanded ? "Ver menos" : `Ver las ${label}`}
            <ArrowRightIcon size={18} weight="bold" className={expanded ? "-rotate-90" : "rotate-90"} aria-hidden="true" />
          </button>
        )}
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

      {open !== null && <WorksViewer photos={tiles.map((t) => t.photo)} start={open} onClose={close} />}
    </div>
  );
}

/**
 * El visor a pantalla completa, sobre un <dialog> nativo: atrapa el foco y cierra con Esc. La pista
 * tiene scroll-snap: en el celular se pasa con el dedo, sin JavaScript de por medio; las flechas,
 * el teclado y las miniaturas la mueven con scrollTo. La foto actual sale de la posición del
 * scroll, así todo queda sincronizado.
 */
function WorksViewer({
  photos,
  start,
  onClose,
}: {
  photos: GalleryPhoto[];
  start: number;
  onClose: (from: HTMLElement | null, current: number) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
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

  // Antes de pintar: el diálogo abierto y la pista en la foto elegida, para que la transición la
  // encuentre en su lugar. Si cambia el tamaño (girar el celular), la pista vuelve a la misma foto.
  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    if (!dialog.current?.open) dialog.current?.showModal();
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
    return () => {
      el.removeEventListener("scroll", onScroll);
      resize.disconnect();
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

  function onKey(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "ArrowRight") go(current + 1);
    else if (e.key === "ArrowLeft") go(current - 1);
    else return;
    e.preventDefault();
  }

  function close() {
    onClose(track.current?.querySelector<HTMLElement>(`[data-slide="${current}"] img`) ?? null, current);
  }

  const photo = photos[current] ?? photos[0];
  const ask = photo.kind
    ? `Hola, vi una obra de ${photo.kind.toLowerCase()} en la galería de ${pibe.name} y quiero consultar por algo parecido.`
    : `Hola, vi una obra en la galería de ${pibe.name} y quiero consultar por algo parecido.`;

  return (
    <dialog
      ref={dialog}
      className="pa-lb pa-dark"
      aria-label="Fotos de obras"
      onKeyDown={onKey}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
    >
      <div ref={track} className="pa-lb-track" tabIndex={0} aria-label="Foto actual; usá las flechas para pasar">
        {photos.map((p, i) => (
          <figure key={p.src} data-slide={i} className="pa-lb-slide" aria-hidden={i !== current}>
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 1024px) 75vw, 100vw"
              loading={Math.abs(i - start) <= 1 ? "eager" : "lazy"}
              className="object-contain"
            />
          </figure>
        ))}
      </div>

      <ol ref={thumbs} className="pa-wr-thumbs pa-lb-thumbs" aria-label="Todas las fotos">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button type="button" onClick={() => go(i)} aria-current={i === current} aria-label={`Ver foto ${i + 1}`} className="pa-wr-thumb">
              <Image src={p.src} alt="" fill sizes="8rem" className="object-cover" />
            </button>
          </li>
        ))}
      </ol>

      <div className="pa-lb-panel">
        <div className="pa-lb-top">
          <p className="pa-wr-count pa-num" aria-live="polite">
            {pad(current + 1)}
            <span> / {pad(total)}</span>
          </p>
          <button type="button" onClick={close} aria-label="Cerrar" className="pa-lb-close">
            <XIcon size={22} weight="bold" aria-hidden="true" />
          </button>
        </div>

        <div className="pa-lb-text" aria-live="polite">
          {photo.kind && <p className="pa-lb-kind">{photo.kind}</p>}
          {photo.description ? (
            <p className="pa-lb-desc">{photo.description}</p>
          ) : (
            <p className="pa-lb-pitch">¿Querés algo parecido? Contanos qué necesitás y te pasamos un presupuesto.</p>
          )}
        </div>

        <div className="pa-lb-foot">
          <div className="pa-lb-arrows">
            <button type="button" onClick={() => go(current - 1)} aria-label="Foto anterior">
              <ArrowLeftIcon size={20} weight="bold" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => go(current + 1)} aria-label="Foto siguiente">
              <ArrowRightIcon size={20} weight="bold" aria-hidden="true" />
            </button>
          </div>
          <TrackedLink
            href={waLink(ask)}
            event="whatsapp"
            from="galeria"
            target="_blank"
            rel="noopener noreferrer"
            className="pa-btn pa-btn-action pa-lb-cta"
          >
            <WhatsappLogoIcon size={20} weight="bold" aria-hidden="true" />
            Quiero algo así
          </TrackedLink>
        </div>
      </div>
    </dialog>
  );
}
