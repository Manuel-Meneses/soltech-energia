import { mailLink, pibe, pibeLinks, telLink, waLink } from "@/lib/pibe";
import { TrackedLink } from "./tracked-link";
import { Wordmark } from "./wordmark";

/** El pie repite cómo contactarnos: quien baja hasta el final suele estar buscando el número. */
export function PibeFooter() {
  const contact = [
    pibe.whatsappShown && { label: "WhatsApp", value: pibe.whatsappShown, href: waLink(), event: "whatsapp" as const },
    pibe.phoneShown && telLink && { label: "Teléfono", value: pibe.phoneShown, href: telLink, event: "llamada" as const },
    pibe.instagram && {
      label: "Instagram",
      value: `@${pibe.instagram}`,
      href: `https://instagram.com/${pibe.instagram}`,
      event: "instagram" as const,
    },
    pibe.email && { label: "Email", value: pibe.email, href: mailLink()!, event: "email" as const },
  ].filter((c) => !!c);

  return (
    <footer className="pa-dark">
      <div className="mx-auto max-w-[88rem] px-5 pt-20 pb-10 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-[var(--pa-dark-line)] pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark className="pa-wordmark-lg" />
            <p className="mt-6 max-w-[42ch] text-[var(--pa-on-dark-muted)]">{pibe.description}</p>
          </div>
          <div className="md:col-span-4">
            <h2 className="text-sm font-semibold text-[var(--pa-on-dark-muted)]">Contacto</h2>
            <ul className="mt-3 space-y-1">
              {contact.map((c) => {
                const external = c.href.startsWith("http");
                return (
                  <li key={c.label}>
                    <TrackedLink
                      href={c.href}
                      event={c.event}
                      from="pie"
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="pa-nav-link inline-flex gap-3 py-2"
                    >
                      <span className="w-20 flex-none text-[var(--pa-on-dark-muted)]">{c.label}</span>
                      <span className="pa-num font-semibold">{c.value}</span>
                      {external && <span className="sr-only"> (se abre en otra pestaña)</span>}
                    </TrackedLink>
                  </li>
                );
              })}
              <li className="flex gap-3 py-2">
                <span className="w-20 flex-none text-[var(--pa-on-dark-muted)]">Zona</span>
                <span className="font-semibold">{pibe.coverage}</span>
              </li>
            </ul>
          </div>
          <nav aria-label="Pie" className="md:col-span-3">
            <ul className="grid grid-cols-2 gap-x-8 md:grid-cols-1">
              {pibeLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="pa-nav-link inline-block py-2">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-2 pt-8 text-sm text-[var(--pa-on-dark-muted)] sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {pibe.name}
          </p>        </div>
      </div>
    </footer>
  );
}
