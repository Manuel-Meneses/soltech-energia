/**
 * Marca propuesta (Matías no tiene logo): un sol que asoma con tres líneas de aire,
 * y el nombre en Archivo expandida. Toma el color de donde esté; el sol es siempre dorado.
 */
export function Sunmark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="10" fill="var(--pa-gold)" />
      <path d="M3 19.5 H22 M8 23.5 H29 M3 27.5 H18" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`pa-wordmark ${className}`}>
      <Sunmark className="pa-wordmark-sun" />
      <span>
        El Pibe <span className="pa-wordmark-del">del</span> Aire
      </span>
    </span>
  );
}
