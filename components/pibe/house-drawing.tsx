import type { ServiceId } from "@/lib/pibe";

/**
 * Corte de una casa de dos plantas con terraza, a escuadra y en línea, como un plano.
 * Cada servicio es una pieza del dibujo, en el color de su servicio: la que está activa se
 * enciende y el resto queda tenue. Los marcadores cuadrados llevan el número de su fila en la lista.
 */
export function HouseDrawing({ active, className = "" }: { active: ServiceId | null; className?: string }) {
  const on = (id: ServiceId) => (active === null || active === id ? "true" : "false");

  return (
    <svg viewBox="0 0 640 520" className={`pa-house ${className}`} aria-hidden="true" data-active={active ?? "none"}>
      {/* La casa: muros, losa con baranda, entrepiso, puerta y ventanas. */}
      <g className="pa-house-shell">
        <path d="M60 480 H600" />
        <rect x="90" y="250" width="460" height="230" />
        <path d="M90 365 H550 M90 250 V232 H550 V250 M90 242 H550" />
        <rect x="300" y="404" width="52" height="76" />
        <rect x="120" y="282" width="70" height="52" />
        <rect x="430" y="282" width="80" height="52" />
        <rect x="120" y="396" width="70" height="52" />
        <rect x="430" y="396" width="80" height="52" />
      </g>

      {/* 1. Paneles: tres paneles inclinados sobre su estructura, y el cable que baja. */}
      <g className="pa-house-part" data-svc="paneles" data-on={on("paneles")}>
        {[112, 196, 280].map((x) => (
          <g key={x}>
            <polygon points={`${x},224 ${x + 74},188 ${x + 78},194 ${x + 4},230`} className="pa-house-fill" />
            <path d={`M${x + 64} 196 V232 M${x + 14} 222 V232`} />
          </g>
        ))}
        <path d="M352 210 H372 V300 H222" className="pa-house-wire" />
      </g>

      {/* 2. Termotanque: colector inclinado, tanque arriba y caño hasta el baño. */}
      <g className="pa-house-part" data-svc="termotanque" data-on={on("termotanque")}>
        <polygon points="410,226 520,226 510,180 420,180" className="pa-house-fill" />
        <path d="M434 226 V180 M456 226 V180 M478 226 V180 M500 226 V180" />
        <rect x="406" y="150" width="118" height="26" className="pa-house-fill" />
        <path d="M512 176 V232 M520 232 V300 H535 V420 H490" className="pa-house-pipe" />
        <rect x="460" y="410" width="30" height="20" />
      </g>

      {/* 3. Mantenimiento: inversor y tablero en la pared de arriba. */}
      <g className="pa-house-part" data-svc="mantenimiento" data-on={on("mantenimiento")}>
        <rect x="222" y="282" width="46" height="62" className="pa-house-fill" />
        <rect x="230" y="292" width="30" height="12" />
        <rect x="290" y="288" width="38" height="50" className="pa-house-fill" />
        <path d="M298 300 H320 M298 310 H320 M298 320 H320 M268 314 H290" />
      </g>

      {/* 4. Limpieza: el agua y el secador que pasan sobre los paneles. */}
      <g className="pa-house-part" data-svc="limpieza" data-on={on("limpieza")}>
        <path d="M118 170 L196 132 M150 178 L232 138 M206 176 L290 134 M248 186 L336 142" className="pa-house-sweep" />
        <path d="M300 118 L346 96 M323 107 L332 150" />
        <rect x="104" y="126" width="6" height="10" className="pa-house-fill" />
        <rect x="132" y="112" width="6" height="10" className="pa-house-fill" />
        <rect x="168" y="104" width="6" height="10" className="pa-house-fill" />
      </g>

      {/* Marcadores numerados: el número es la fila de la lista. */}
      {(
        [
          ["paneles", 92, 166],
          ["termotanque", 540, 132],
          ["mantenimiento", 196, 302],
          ["limpieza", 352, 76],
        ] as const
      ).map(([id, x, y], i) => (
        <g key={id} className="pa-house-tag" data-svc={id} data-on={on(id)} transform={`translate(${x} ${y})`}>
          <rect x="-13" y="-13" width="26" height="26" />
          <text textAnchor="middle" dominantBaseline="central">
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}
