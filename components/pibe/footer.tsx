import { pibe, pibeLinks } from "@/lib/pibe";
import { Wordmark } from "./wordmark";

export function PibeFooter() {
  return (
    <footer className="pa-dark">
      <div className="mx-auto max-w-[88rem] px-5 pt-20 pb-10 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-[var(--pa-dark-line)] pb-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <Wordmark className="pa-wordmark-lg" />
            <p className="mt-6 max-w-[42ch] text-[var(--pa-on-dark-muted)]">{pibe.description}</p>
          </div>
          <nav aria-label="Pie" className="md:col-span-5">
            <ul className="grid grid-cols-2 gap-x-8">
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
            © {new Date().getFullYear()} {pibe.name} · {pibe.person}
          </p>
          <p>{pibe.zone}</p>
        </div>
      </div>
    </footer>
  );
}
