import { PlusIcon } from "@phosphor-icons/react/ssr";
import { faqs } from "@/lib/pibe";

/** Preguntas de quien no es técnico. `details` nativo: funciona sin JS y con teclado. */
export function Faq() {
  return (
    <section id="preguntas" aria-labelledby="pa-faq-title" className="pa-paper-2">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <h2 id="pa-faq-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:sticky lg:top-28">
            Lo que todos me preguntan.
          </h2>
        </div>
        <div className="lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="pa-faq">
              <summary>
                <span className="pa-wide text-[clamp(1.1rem,1.6vw,1.3rem)] font-semibold">{f.q}</span>
                <PlusIcon size={20} weight="bold" className="pa-faq-icon" aria-hidden="true" />
              </summary>
              <p className="max-w-[62ch] pb-7 text-lg leading-relaxed text-[var(--pa-muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
