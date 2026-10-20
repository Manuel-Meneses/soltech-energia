"use client";

import { useEffect, useId, useState } from "react";
import { ArrowRightIcon, CheckIcon, EnvelopeSimpleIcon, InstagramLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { pibe, PREFILL_EVENT, services, waLink, type ContactPrefill } from "@/lib/pibe";
import { Todo } from "./todo";

/* Sin backend: arma el mensaje y abre WhatsApp con los datos cargados. Los servicios y la
   calculadora precargan el servicio y el mensaje (PREFILL_EVENT). */
type Fields = { nombre: string; barrio: string; lugar: string; servicio: string; mensaje: string };
type Errors = Partial<Record<keyof Fields, string>>;

const lugares = ["Casa", "Comercio"];
const servicios = [...services.map((s) => s.title), "Otra consulta"];
const empty: Fields = { nombre: "", barrio: "", lugar: "", servicio: "", mensaje: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.nombre.trim().length < 2) e.nombre = "Escribí tu nombre.";
  if (f.barrio.trim().length < 2) e.barrio = "Contame en qué barrio o localidad es.";
  if (!f.servicio) e.servicio = "Elegí qué necesitás.";
  if (f.mensaje.trim().length < 5) e.mensaje = "Contame en una línea qué necesitás.";
  return e;
}

function message(f: Fields) {
  return [
    `Hola ${pibe.firstName}, te escribo desde la página de ${pibe.name}.`,
    `Nombre: ${f.nombre.trim()}`,
    `Barrio: ${f.barrio.trim()}`,
    f.lugar ? `Es para: ${f.lugar}` : "",
    `Necesito: ${f.servicio}`,
    f.mensaje.trim(),
  ]
    .filter(Boolean)
    .join("\n");
}

export function PibeContact() {
  const id = useId();
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<string | null>(null);
  // Cada precarga suma uno: remonta los campos precargados para que destellen.
  const [flash, setFlash] = useState(0);

  const set = (k: keyof Fields, v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { servicio, lugar, mensaje } = (e as CustomEvent<ContactPrefill>).detail;
      setSent(null);
      setF((p) => ({
        ...p,
        ...(servicio ? { servicio } : {}),
        ...(lugar ? { lugar } : {}),
        ...(mensaje ? { mensaje } : {}),
      }));
      setErrors({});
      setFlash((n) => n + 1);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(f);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) return document.getElementById(`${id}-${first}`)?.focus();
    const url = waLink(message(f));
    setSent(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const err = (k: keyof Fields) =>
    errors[k] && (
      <p id={`${id}-${k}-err`} className="mt-2 text-sm font-medium text-[var(--pa-error)]">
        {errors[k]}
      </p>
    );

  const field = (k: "nombre" | "barrio", label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={`${id}-${k}`} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={`${id}-${k}`}
        name={k}
        value={f[k]}
        onChange={(e) => set(k, e.target.value)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `${id}-${k}-err` : undefined}
        className="pa-field"
        {...props}
      />
      {err(k)}
    </div>
  );

  const choices = (k: "lugar" | "servicio", legend: string, options: string[], cols: string) => (
    <fieldset aria-describedby={errors[k] ? `${id}-${k}-err` : undefined}>
      <legend className="text-sm font-semibold">{legend}</legend>
      <div className={`mt-2 grid gap-2 ${cols}`}>
        {options.map((o, i) => (
          <label key={o} className="pa-choice">
            <input
              type="radio"
              name={k}
              value={o}
              id={i === 0 ? `${id}-${k}` : undefined}
              checked={f[k] === o}
              onChange={() => set(k, o)}
              className="sr-only"
            />
            {o}
          </label>
        ))}
      </div>
      {err(k)}
    </fieldset>
  );

  const channels = [
    { icon: WhatsappLogoIcon, tone: "pa-social-wa", label: "WhatsApp", todo: "Número a cargar", value: pibe.whatsapp ? `+${pibe.whatsapp}` : null, href: waLink() },
    {
      icon: InstagramLogoIcon,
      tone: "pa-social-ig",
      label: "Instagram",
      todo: "Usuario a cargar",
      value: pibe.instagram ? `@${pibe.instagram}` : null,
      href: pibe.instagram ? `https://instagram.com/${pibe.instagram}` : null,
    },
    { icon: EnvelopeSimpleIcon, tone: "", label: "Email", todo: "Mail a cargar", value: pibe.email, href: pibe.email ? `mailto:${pibe.email}` : null },
  ];

  // Sin la entrada de celdas: es el destino de cada acción y tiene que estar a la vista al llegar.
  return (
    <section id="contacto" aria-labelledby="pa-contact-title" data-own-entrance className="pa-sky">
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <h2 id="pa-contact-title" className="pa-display text-[clamp(2.5rem,4.4vw,4.25rem)]">
            Contame qué necesitás.
          </h2>
          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed">
            Con tu barrio y una línea alcanza para arrancar. Si tenés la factura de luz o una foto del techo, mandala por el
            chat.
          </p>

          <ul className="pa-channels mt-10">
            {channels.map((c) => (
              <li key={c.label}>
                <span className={`pa-channel-icon ${c.tone}`} aria-hidden="true">
                  <c.icon size={18} weight={c.label === "WhatsApp" ? "fill" : "bold"} />
                </span>
                <span className="text-sm font-semibold">{c.label}</span>
                {c.value && c.href ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="pa-link pa-num font-semibold">
                    {c.value}
                    <span className="sr-only"> (se abre en otra pestaña)</span>
                  </a>
                ) : (
                  <Todo className="pa-todo-sky">{c.todo}</Todo>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="pa-sheet-paper p-6 sm:p-10 lg:col-span-7">
          {sent ? (
            <div key="ok" role="status" className="pa-swap flex min-h-[460px] flex-col justify-center">
              <span className="flex size-12 items-center justify-center bg-[var(--pa-ink)] text-[var(--pa-on-dark)]">
                <CheckIcon size={24} weight="bold" aria-hidden="true" />
              </span>
              <h3 className="pa-wide mt-6 text-2xl font-semibold">Tu mensaje está listo.</h3>
              <p className="mt-2 max-w-[44ch] text-[var(--pa-muted)]">
                Abrí WhatsApp con tus datos cargados. Enviá el mensaje y, si la tenés, sumá la foto de la factura o del
                techo.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={sent} target="_blank" rel="noopener noreferrer" className="pa-btn pa-btn-gold">
                  <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
                  Abrir WhatsApp
                </a>
                <button type="button" onClick={() => setSent(null)} className="pa-btn pa-btn-line">
                  Editar datos
                </button>
              </div>
            </div>
          ) : (
            <form key="form" noValidate onSubmit={submit} className="pa-swap grid gap-6 sm:grid-cols-2">
              {field("nombre", "Nombre", { autoComplete: "name" })}
              {field("barrio", "Barrio o localidad", { autoComplete: "address-level2", placeholder: "Ej.: Caballito" })}
              <div key={`s${flash}`} className="sm:col-span-2" data-flash={flash > 0 || undefined}>
                {choices("servicio", "¿Qué necesitás?", servicios, "grid-cols-2 sm:grid-cols-3")}
              </div>
              <div className="sm:col-span-2">{choices("lugar", "¿Para dónde es?", lugares, "grid-cols-2 sm:max-w-xs")}</div>
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-mensaje`} className="text-sm font-semibold">
                  Contame un poco más
                </label>
                <textarea
                  id={`${id}-mensaje`}
                  name="mensaje"
                  rows={4}
                  value={f.mensaje}
                  onChange={(e) => set("mensaje", e.target.value)}
                  aria-invalid={!!errors.mensaje}
                  aria-describedby={errors.mensaje ? `${id}-mensaje-err` : undefined}
                  placeholder="Ej.: casa de dos plantas con terraza, gastamos unos 350 kWh por mes."
                  key={`m${flash}`}
                  className={`pa-field resize-y ${flash > 0 ? "pa-field-flash" : ""}`}
                />
                {err("mensaje")}
              </div>
              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[var(--pa-muted)]">Se abre WhatsApp con tu mensaje armado.</p>
                <button type="submit" className="pa-btn pa-btn-ink">
                  Enviar por WhatsApp
                  <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
