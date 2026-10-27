"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { pibe, pibeCta, pibeLinks } from "@/lib/pibe";
import { trackConversion } from "@/lib/track";
import { Wordmark } from "./wordmark";

/**
 * La barra es un módulo fotovoltaico: marco, celdas de vidrio azul noche
 * separadas por juntas y busbars tenues. La celda de la sección que estás viendo se enciende
 * en celeste; el pedido de visita es la celda clara, la única de papel.
 */
export function PibeHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), { rootMargin: "-80px 0px 0px 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Scroll-spy: la sección que cruza la franja central de la pantalla enciende su celda.
  useEffect(() => {
    const sections = pibeLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((s): s is HTMLElement => !!s);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrent(e.target.id);
          else setCurrent((c) => (c === e.target.id ? null : c));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:top-4 sm:px-6 lg:px-10">
      <div className="pa-module mx-auto max-w-[86rem]" data-solid={solid || open}>
        <a href="#inicio" aria-label={`${pibe.name}, inicio`} className="pa-cell pa-cell-logo">
          <Wordmark />
        </a>

        <nav aria-label="Principal" className="contents">
          {pibeLinks.map((l) => {
            const on = current === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={on ? "location" : undefined}
                data-on={on}
                className="pa-cell pa-cell-link hidden xl:flex"
              >
                <span className="pa-mark" aria-hidden="true" />
                {l.label}
              </a>
            );
          })}
        </nav>

        <a
          href={pibeCta.href}
          onClick={() => trackConversion("pedi_visita", { desde: "cabecera" })}
          className="pa-cell pa-cell-cta hidden sm:flex"
        >
          {pibeCta.label}
          <ArrowRightIcon size={16} weight="bold" className="pa-arrow" aria-hidden="true" />
        </a>

        <button
          type="button"
          className="pa-cell pa-cell-menu xl:hidden"
          aria-expanded={open}
          aria-controls="pa-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <XIcon size={22} /> : <ListIcon size={22} />}
        </button>
      </div>

      {open && (
        <>
          <div aria-hidden="true" onClick={() => setOpen(false)} className="pa-menu-veil fixed inset-0 -z-10 xl:hidden" />
          <nav
            id="pa-menu"
            aria-label="Menú"
            className="pa-module pa-module-menu pa-menu-in mx-auto mt-2 max-w-[86rem] xl:hidden"
            data-solid="true"
          >
            {pibeLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-on={current === l.href.slice(1)}
                className="pa-cell pa-cell-link pa-cell-big pa-menu-item"
                style={{ ["--i" as string]: i }}
              >
                <span className="pa-mark" aria-hidden="true" />
                {l.label}
              </a>
            ))}
            <a href={pibeCta.href} onClick={() => setOpen(false)} className="pa-cell pa-cell-cta col-span-2">
              {pibeCta.label}
              <ArrowRightIcon size={16} weight="bold" aria-hidden="true" />
            </a>
          </nav>
        </>
      )}
    </header>
  );
}
