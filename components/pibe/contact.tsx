"use client";

import { useEffect, useId, useState } from "react";
import { ArrowRightIcon, CheckIcon, EnvelopeSimpleIcon, InstagramLogoIcon, PhoneIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { mailLink, pibe, PREFILL_EVENT, services, telLink, waLink, type ContactPrefill } from "@/lib/pibe";
import { trackConversion, type Conversion } from "@/lib/track";

/* Sin backend: arma el mensaje y lo abre en WhatsApp o, con el segundo botón, en el programa de
   mail con el asunto y el texto cargados. Los servicios y la calculadora precargan el servicio y
   el mensaje (PREFILL_EVENT). */
type Fields = { nombre: string; barrio: string; lugar: string; servicio: string; mensaje: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Via = "wa" | "mail";

const lugares = ["Casa", "Empresa"];
const servicios = [...services.map((s) => s.title), "Otra consulta"];
const empty: Fields = { nombre: "", barrio: "", lugar: "", servicio: "", mensaje: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.nombre.trim().length < 2) e.nombre = "Escribí tu nombre.";
  if (f.barrio.trim().length < 2) e.barrio = "Contanos en qué barrio o localidad es.";
  if (!f.servicio) e.servicio = "Elegí qué necesitás.";
  return e;
}

function message(f: Fields) {
  return [
    `Hola, les escribo desde la página de ${pibe.name}.`,
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
  const [sent, setSent] = useState<{ via: Via; url: string } | null>(null);
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
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const mail = submitter?.value === "mail" ? mailLink(pibe.salesEmail, `Consulta desde la página: ${f.servicio}`, message(f)) : null;
    const via: Via = mail ? "mail" : "wa";
    const url = mail ?? waLink(message(f));
    trackConversion("formulario_enviado", { servicio: f.servicio, lugar: f.lugar || "sin decir", por: via });
    setSent({ via, url });
    // El mail abre el programa de correo en la misma pestaña; WhatsApp, en otra.
    if (via === "mail") window.location.href = url;
    else window.open(url, "_blank", "noopener,noreferrer");
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

  const channels: {
    icon: typeof WhatsappLogoIcon;
    tone: string;
    label: string;
    value: string | null;
    href: string | null;
    event?: Conversion;
  }[] = [
    {
      icon: WhatsappLogoIcon,
      tone: "pa-social-wa",
      label: "WhatsApp",
      value: pibe.whatsappShown,
      href: waLink(),
      event: "whatsapp",
    },
    { icon: PhoneIcon, tone: "", label: "Teléfono", value: pibe.phoneShown, href: telLink, event: "llamada" },
    {
      icon: InstagramLogoIcon,
      tone: "pa-social-ig",
      label: "Instagram",
      value: pibe.instagram ? `@${pibe.instagram}` : null,
      href: pibe.instagram ? `https://instagram.com/${pibe.instagram}` : null,
      event: "instagram",
    },
    { icon: EnvelopeSimpleIcon, tone: "", label: "Email", value: pibe.email, href: mailLink(pibe.email), event: "email" },
    { icon: EnvelopeSimpleIcon, tone: "", label: "Ventas", value: pibe.salesEmail, href: mailLink(pibe.salesEmail), event: "email" },
  ];
  const shownChannels = channels.filter((c) => c.value && c.href);

  // Sin la entrada de celdas: es el destino de cada acción y tiene que estar a la vista al llegar.
  return (
    <section id="contacto" aria-labelledby="pa-contact-title" data-own-entrance className="pa-sky">
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <h2 id="pa-contact-title" className="pa-display text-[clamp(2.5rem,4.4vw,4.25rem)]">
            Contanos qué necesitás.
          </h2>
          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed">
            Con tu nombre, tu localidad y qué necesitás alcanza para arrancar. Si tenés la factura de luz o una foto del
            techo, mandala por WhatsApp{pibe.salesEmail ? " o adjuntala en el mail" : ""}.
          </p>

          <ul className="pa-channels mt-10">
            {shownChannels.map((c) => {
              const external = c.href!.startsWith("http");
              return (
                <li key={c.label}>
                  <span className={`pa-channel-icon ${c.tone}`} aria-hidden="true">
                    <c.icon size={18} weight={c.label === "WhatsApp" ? "fill" : "bold"} />
                  </span>
                  <span className="text-sm font-semibold">{c.label}</span>
                  <a
                    href={c.href!}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    onClick={() => c.event && trackConversion(c.event, { desde: "contacto" })}
                    className="pa-link pa-num font-semibold"
                  >
                    {c.value}
                    {external && <span className="sr-only"> (se abre en otra pestaña)</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="pa-sheet-paper p-6 sm:p-10 lg:col-span-7">
          {sent ? (
            <div key="ok" role="status" className="pa-swap flex min-h-[460px] flex-col justify-center">
              <span className="flex size-12 items-center justify-center bg-[var(--pa-ink)] text-[var(--pa-on-dark)]">
                <CheckIcon size={24} weight="bold" aria-hidden="true" />
              </span>
              <h3 className="pa-wide mt-6 text-2xl font-semibold">Tu mensaje está listo.</h3>
              {sent.via === "mail" ? (
                <p className="mt-2 max-w-[44ch] text-[var(--pa-muted)]">
                  Abrimos tu programa de mail con la consulta armada para {pibe.salesEmail}. Enviala y, si la tenés, adjuntá la
                  foto de la factura o del techo.
                </p>
              ) : (
                <p className="mt-2 max-w-[44ch] text-[var(--pa-muted)]">
                  Abrí WhatsApp con tus datos cargados. Enviá el mensaje y, si la tenés, sumá la foto de la factura o del
                  techo.
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                {sent.via === "mail" ? (
                  <a href={sent.url} onClick={() => trackConversion("email", { desde: "confirmacion" })} className="pa-btn pa-btn-action">
                    <EnvelopeSimpleIcon size={20} weight="bold" aria-hidden="true" />
                    Abrir el mail
                  </a>
                ) : (
                  <a
                    href={sent.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversion("whatsapp", { desde: "confirmacion" })}
                    className="pa-btn pa-btn-action"
                  >
                    <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
                    Abrir WhatsApp
                  </a>
                )}
                <button type="button" onClick={() => setSent(null)} className="pa-btn pa-btn-line">
                  Editar datos
                </button>
              </div>
            </div>
          ) : (
            <form key="form" noValidate onSubmit={submit} className="pa-swap grid gap-6 sm:grid-cols-2">
              {field("nombre", "Nombre", { autoComplete: "name" })}
              {field("barrio", "Barrio o localidad", { autoComplete: "address-level2", placeholder: "Ej.: Morón" })}
              <div key={`s${flash}`} className="sm:col-span-2" data-flash={flash > 0 || undefined}>
                {choices("servicio", "¿Qué necesitás?", servicios, "grid-cols-2 sm:grid-cols-3")}
              </div>
              <div className="sm:col-span-2">{choices("lugar", "¿Para dónde es?", lugares, "grid-cols-2 sm:max-w-xs")}</div>
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-mensaje`} className="text-sm font-semibold">
                  Contanos un poco más <span className="font-normal text-[var(--pa-muted)]">(opcional)</span>
                </label>
                <textarea
                  id={`${id}-mensaje`}
                  name="mensaje"
                  rows={4}
                  value={f.mensaje}
                  onChange={(e) => set("mensaje", e.target.value)}
                  placeholder="Ej.: casa de dos plantas con terraza, gastamos unos 350 kWh por mes."
                  key={`m${flash}`}
                  className={`pa-field resize-y ${flash > 0 ? "pa-field-flash" : ""}`}
                />
              </div>
              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[var(--pa-muted)]">
                  {pibe.salesEmail ? "Se abre WhatsApp o tu mail con el mensaje armado." : "Se abre WhatsApp con tu mensaje armado."}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row-reverse">
                  <button type="submit" value="wa" className="pa-btn pa-btn-ink">
                    Enviar por WhatsApp
                    <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
                  </button>
                  {pibe.salesEmail && (
                    <button type="submit" value="mail" className="pa-btn pa-btn-line">
                      <EnvelopeSimpleIcon size={18} weight="bold" aria-hidden="true" />
                      Enviar por mail
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
