"use client";

import { useRef, useState } from "react";
import { PlayIcon } from "@phosphor-icons/react";

/**
 * El video de la sección Videos. Antes de tocarlo es la portada con un play grande y la duración;
 * al tocarlo arranca con sonido y quedan los controles del navegador.
 */
export function VideoPlayer({
  src,
  type,
  poster,
  label,
  caption,
  duration,
}: {
  src: string;
  type: string;
  poster: string | null;
  label: string;
  caption: string | null;
  duration: string | null;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    ref.current?.play().catch(() => {});
  };

  return (
    <figure className="pa-video mt-14" data-started={started || undefined}>
      <div className="pa-video-frame">
        <video
          ref={ref}
          controls={started}
          playsInline
          preload="metadata"
          poster={poster ?? undefined}
          aria-label={label}
          onPlay={() => setStarted(true)}
        >
          {/* Sin portada, el #t lleva al primer cuadro: Safari si no muestra un recuadro negro. */}
          <source src={poster ? src : `${src}#t=0.1`} type={type} />
        </video>
        <button type="button" className="pa-video-play" onClick={start} tabIndex={started ? -1 : 0} aria-hidden={started}>
          <span className="pa-video-play-dot">
            <PlayIcon size={30} weight="fill" />
          </span>
          <span className="pa-video-play-label">
            Ver el video{duration && <span className="pa-video-play-time">{duration}</span>}
          </span>
        </button>
      </div>
      {caption && <figcaption className="pa-video-cap">{caption}</figcaption>}
    </figure>
  );
}
