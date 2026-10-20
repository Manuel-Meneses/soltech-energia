import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { payments, pibe, pibeCta, priceRows, services } from "@/lib/pibe";
import { Todo } from "./todo";

const kindLabel = Object.fromEntries(services.map((s) => [s.id, s.title]));

/**
 * Cuánto sale: una idea para mostrar precios de referencia sin prometer un número cerrado.
 * Cada fila es un tamaño de trabajo con su "desde"; las formas de pago van al costado.
 * Mientras Matías no los cargue (lib/pibe.ts), precios y pagos se ven a completar.
 */
export function Prices() {
  return (
    <section id="precios" aria-labelledby="pa-prices-title" className="pa-paper">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pa-prices-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            Cuánto sale, más o menos.
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-muted)] lg:col-span-5">
            Una referencia para que sepas por dónde anda. El precio cerrado va en el presupuesto, después de ver tu techo.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-12">
          <table className="pa-prices lg:col-span-8">
            <caption className="sr-only">Precios de referencia por tipo de trabajo</caption>
            <thead>
              <tr>
                <th scope="col">Trabajo</th>
                <th scope="col">Tamaño</th>
                <th scope="col" className="text-right">
                  Desde
                </th>
              </tr>
            </thead>
            <tbody>
              {priceRows.map((r) => (
                <tr key={r.title}>
                  <th scope="row">
                    <span className="pa-wide block font-semibold">{r.title}</span>
                    <span className="mt-0.5 flex items-center text-sm font-normal text-[var(--pa-muted)]" data-svc={r.service}>
                      <span className="pa-swatch" aria-hidden="true" />
                      {kindLabel[r.service]}
                    </span>
                  </th>
                  <td>{r.size}</td>
                  <td className="text-right">
                    {r.price ? <span className="pa-wide pa-num font-semibold">{r.price}</span> : <Todo>Precio</Todo>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <aside className="lg:col-span-4" aria-labelledby="pa-pay-title">
            <div className="pa-pay">
              <h3 id="pa-pay-title" className="pa-wide text-xl font-semibold">
                Formas de pago
              </h3>
              <ul className="mt-5 space-y-px">
                {payments.map((p) => (
                  <li key={p.label} className="pa-pay-row">
                    <span>{p.label}</span>
                    {p.confirmed ? null : <Todo>Confirmar</Todo>}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-[var(--pa-muted)]">
                La visita para mirar el techo y el presupuesto: <Todo>¿con o sin cargo?</Todo>
              </p>
              <a href={pibeCta.href} className="pa-btn pa-btn-ink mt-8 w-full">
                Pedile un presupuesto a {pibe.firstName}
                <ArrowRightIcon size={18} weight="bold" className="pa-arrow" aria-hidden="true" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
