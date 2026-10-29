import fs from "node:fs";
import path from "node:path";
import { pibe, video } from "@/lib/pibe";
import { VideoPlayer } from "./video-player";

/* El primer video de public/pibe/videos/, leído una vez al armar la página, en el orden del número
   del nombre (video_1, video_2…). Si hay una imagen con el mismo nombre (video_1.jpg) va de
   portada; si no, se ve el primer cuadro. Sin video, la sección no sale. */
const DIR = "/pibe/videos";
const ABS = path.join(process.cwd(), "public", DIR);
const num = (f: string) => Number(f.match(/\d+/)?.[0] ?? Infinity);
const all = fs.existsSync(ABS) ? fs.readdirSync(ABS) : [];
const file = all
  .filter((f) => /\.(mp4|webm|mov)$/i.test(f))
  .sort((a, b) => num(a) - num(b) || a.localeCompare(b, "es"))[0];

const clip = file
  ? (() => {
      const base = file.replace(/\.[^.]+$/, "");
      const poster = all.find((p) => p.startsWith(`${base}.`) && /\.(jpe?g|png|webp)$/i.test(p));
      return {
        src: `${DIR}/${file}`,
        type: /\.webm$/i.test(file) ? "video/webm" : "video/mp4",
        poster: poster ? `${DIR}/${poster}` : null,
      };
    })()
  : null;

/**
 * Una obra en movimiento, al lado de Trabajos: un solo video grande, que arranca recién cuando se
 * lo toca, con sonido y controles del navegador.
 */
export function Videos() {
  if (!clip) return null;

  return (
    <section id="videos" aria-labelledby="pa-videos-title" className="pa-paper">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pa-videos-title" className="pa-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            Mirá una obra de cerca.
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--pa-muted)] lg:col-span-5">
            Un minuto de drone sobre instalaciones nuestras: paneles sobre chapa y sobre losa, tal como quedaron.
          </p>
        </div>

        <VideoPlayer
          {...clip}
          label={video.caption ?? `Video de instalaciones de ${pibe.name}`}
          caption={video.caption}
          duration={video.duration}
        />
      </div>
    </section>
  );
}
