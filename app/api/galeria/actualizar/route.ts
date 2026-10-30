import { createHash, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { after } from "next/server";
import { GALLERY_TAG, galleryConnected, syncSheet } from "@/lib/galeria";

const digest = (s: string) => createHash("sha256").update(s).digest();
const allowed = (key: string | null) => {
  const expected = process.env.GALERIA_CLAVE;
  return Boolean(expected && key && timingSafeEqual(digest(key), digest(expected)));
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** La respuesta la lee el cliente: una página mínima, sin marca de sistema ni detalles técnicos. */
function page(title: string, lines: string[], status = 200) {
  const items = lines.map((l) => `<p>${l}</p>`).join("");
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(title)}</title><style>body{margin:0;padding:2rem 1.25rem;font:1.0625rem/1.5 system-ui,sans-serif;background:#eef2f7;color:#172331}main{max-width:36rem;margin:auto}h1{font-size:1.75rem;line-height:1.1;margin:0 0 1rem}a{color:#34516f;font-weight:600}</style></head><body><main><h1>${escapeHtml(title)}</h1>${items}</main></body></html>`;
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/**
 * El enlace "Traer fotos nuevas y publicar" de la planilla: la pone al día con la carpeta de Drive
 * y publica la galería en el momento. Sin tocarlo, el sitio igual se actualiza solo a los minutos.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  if (!allowed(url.searchParams.get("clave"))) return page("Enlace no válido", ["Pedí el enlace correcto a quien administra el sitio."], 403);
  if (!galleryConnected) return page("La galería no está conectada", ["Falta configurar Google Drive y la planilla en el sitio."], 503);

  try {
    const { empty, added, removed, skipped, sheetUrl } = await syncSheet(url.href);
    if (empty) {
      return page("La carpeta está vacía", [
        "El sitio no encontró fotos en la carpeta de Drive, así que no cambiamos nada: la planilla y la galería siguen como estaban.",
        "Si las fotos están, revisá que la carpeta siga compartida con el sitio.",
        `<a href="${escapeHtml(sheetUrl)}">Volver a la planilla</a>`,
      ]);
    }
    // Marca la página como vieja y, ya respondido esto, la pide una vez para que se rehaga sin esperar
    // a un visitante. Si Google falla en ese momento, se sigue sirviendo la versión anterior.
    revalidateTag(GALLERY_TAG, "max");
    after(() => fetch(url.origin, { cache: "no-store" }).catch(() => {}));
    const lines = [
      added.length > 0
        ? `Agregamos ${plural(added.length, "foto nueva", "fotos nuevas")} a la planilla. Escribí su descripción y elegí el tipo; se publican solas a los pocos minutos.`
        : "No hay fotos nuevas en la carpeta.",
      ...(removed > 0 ? [`Sacamos ${plural(removed, "fila", "filas")} de fotos que ya no están en Drive.`] : []),
      ...(skipped.length > 0
        ? [`Estas fotos no se pueden mostrar en la web: ${skipped.map(escapeHtml).join(", ")}. Subilas de nuevo en formato JPG.`]
        : []),
      "La galería del sitio ya está al día.",
      `<a href="${escapeHtml(sheetUrl)}">Volver a la planilla</a> · <a href="${escapeHtml(url.origin)}/#trabajos">Ver la galería</a>`,
    ];
    return page("Listo", lines);
  } catch (error) {
    console.error("Galería: no se pudo actualizar la planilla", error);
    return page(
      "No pudimos actualizar la galería",
      ["Google no respondió o la carpeta y la planilla dejaron de estar compartidas con el sitio. Probá de nuevo en unos minutos; si sigue igual, avisale a quien administra el sitio."],
      502,
    );
  }
}
