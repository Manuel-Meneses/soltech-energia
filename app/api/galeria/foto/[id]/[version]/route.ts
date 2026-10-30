import { fetchFolderPhoto } from "@/lib/galeria";

/**
 * Sirve una foto de la carpeta de Drive para que la tome next/image. La versión es la huella del
 * archivo: una foto reemplazada cambia de dirección, así que esta se puede guardar para siempre.
 */
export async function GET(_: Request, { params }: { params: Promise<{ id: string; version: string }> }) {
  const { id } = await params;
  try {
    const photo = await fetchFolderPhoto(id);
    if (!photo) return new Response("No encontrada", { status: 404 });
    return new Response(photo.body, {
      headers: {
        "Content-Type": photo.mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Galería: no se pudo traer la foto", id, error);
    return new Response("No encontrada", { status: 404 });
  }
}
