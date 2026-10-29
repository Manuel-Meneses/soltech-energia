"use client";

import { useEffect } from "react";

/**
 * Entrada de cada sección: los títulos suben desde abajo, los textos aparecen y las celdas y
 * filas entran escalonadas, cada una cuando llega a la pantalla. Todo con transform y opacidad
 * (pibe.css, "Entradas").
 *
 * Sin JavaScript o con prefers-reduced-motion no se agrega nada y todo se ve tal cual. Lo que
 * ya está en pantalla al cargar no se esconde (sin parpadeo), y el contacto queda siempre a la
 * vista: es el destino de cada botón.
 */
const TARGETS = [
  // Encabezado de cada sección: el título y la bajada de al lado.
  "main > section:not(#inicio):not(#contacto):not(#quien) > div:first-child > .grid:first-child > *",
  ".pa-works",
  ".pa-video",
  ".pa-sys",
  ".pa-svc",
  ".pa-svc-extra",
  ".pa-bk-scene",
  ".pa-bk-photo",
  ".pa-bk-fact",
  ".pa-pool-row",
  ".pa-pool-photo",
  ".pa-pool-method",
  ".pa-calc",
  "#quien .pa-portrait",
  "#quien h2",
  "#quien h2 ~ div > p",
  ".pa-sheet-row",
  ".pa-brands-row",
  ".pa-biz-photo",
  ".pa-biz-row",
  "#empresas .pa-btn",
  "#preguntas h2",
  ".pa-faq",
].join(",");

/** Escalón máximo: más allá, los de abajo entran todos juntos. */
const MAX_STEP = 6;
/** Cuando terminó la entrada se saca el atributo y vuelven las transiciones propias (hover, etc.). */
const DONE_MS = 1800;

export function SectionEntrance() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fold = window.innerHeight * 0.92;
    const els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter(
      (el) => el.getBoundingClientRect().top > fold,
    );

    // El escalón de cada uno: su lugar entre los hermanos que también entran.
    for (const el of els) {
      const siblings = Array.from(el.parentElement?.children ?? []).filter((s) => els.includes(s as HTMLElement));
      el.style.setProperty("--ei", String(Math.min(siblings.indexOf(el), MAX_STEP)));
      el.dataset.enter = "armed";
    }

    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.dataset.enter = "lit";
          io.unobserve(el);
          timers.push(window.setTimeout(() => delete el.dataset.enter, DONE_MS));
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      els.forEach((el) => delete el.dataset.enter);
    };
  }, []);

  return null;
}
