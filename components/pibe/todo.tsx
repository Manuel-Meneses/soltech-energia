import { PencilSimpleLineIcon } from "@phosphor-icons/react/ssr";

/**
 * Lo que falta cargar se ve como un lugar a completar, nunca como relleno: un recuadro
 * punteado con lo que va ahí. Cuando llega el dato real, el componente que lo usa deja
 * de mostrarlo.
 */
export function Todo({ children = "A completar", className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <span className={`pa-todo ${className}`}>
      <PencilSimpleLineIcon size={14} weight="bold" aria-hidden="true" />
      {children}
    </span>
  );
}
