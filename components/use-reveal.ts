"use client";

import { useEffect, useRef } from "react";

/**
 * Marca un bloque con data-reveal para que el CSS anime su entrada propia:
 * "armed" (listo, fuera de pantalla) y "lit" (entró). Sin JavaScript, con
 * prefers-reduced-motion o si ya estaba a la vista al cargar, queda sin atributo o
 * directo en "lit": el contenido nunca depende de la animación para verse.
 */
export function useReveal<T extends HTMLElement>(rootMargin = "0px 0px -18% 0px") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.82) return;
    el.dataset.reveal = "armed";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.dataset.reveal = "lit";
        io.disconnect();
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return ref;
}
