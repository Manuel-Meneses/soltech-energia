/**
 * Marca propuesta para Soltech Energía: un sol que asoma detrás de un panel inclinado,
 * y el nombre en Archivo expandida. El panel va en azul claro; el sol, en ámbar.
 */
export function Sunmark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="20" cy="11" r="7" fill="var(--pa-sun)" />
      <path d="M3 28 L9 16 H29 L23 28 Z" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`pa-wordmark ${className}`}>
      <Sunmark className="pa-wordmark-sun" />
      <span>
        Soltech <span className="pa-wordmark-del">Energía</span>
      </span>
    </span>
  );
}
