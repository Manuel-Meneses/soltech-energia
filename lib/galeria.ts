import fs from "node:fs";
import path from "node:path";
import { googleFetch } from "@/lib/google";
import { featuredWorks, pibe, workKinds, works, type WorkKind } from "@/lib/pibe";

/**
 * Las fotos de la galería de Trabajos. El cliente las maneja solo: las fotos están en una carpeta
 * de Google Drive y los textos en una planilla, una fila por foto (el orden de las filas es el de
 * la galería). Lo que manda es la carpeta: una foto borrada de Drive se va del sitio aunque siga
 * en la planilla, y una foto nueva aparece aunque todavía no tenga fila.
 *
 * Sin las variables de entorno de Google, salen las fotos de public/pibe/trabajos/ con las fichas
 * de lib/pibe.ts.
 */
export type GalleryPhoto = {
  src: string;
  alt: string;
  description: string | null;
  kind: WorkKind | null;
  /** Ancho sobre alto: el mosaico reserva las celdas anchas para las fotos apaisadas. */
  ratio: number;
  pos?: string;
};

export type SyncResult = { empty: boolean; added: string[]; removed: number; skipped: string[]; sheetUrl: string };

/** La marca de los datos de Google en la caché de la página, para publicar con revalidateTag. */
export const GALLERY_TAG = "galeria";

const FOLDER = process.env.GALERIA_CARPETA_ID;
const SHEET = process.env.GALERIA_PLANILLA_ID;
export const galleryConnected = Boolean(FOLDER && SHEET && process.env.GALERIA_GOOGLE_CREDENCIALES);

const DRIVE = "https://www.googleapis.com/drive/v3/files";
const SHEETS = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET}`;

/** La página lee lo guardado en caché; la puesta al día de la planilla, siempre lo último. */
const CACHED: RequestInit = { next: { tags: [GALLERY_TAG] } };
const FRESH: RequestInit = { cache: "no-store" };

/** Lo que next/image puede procesar. Las HEIC del iPhone no: el aviso de "actualizar" las nombra. */
const SHOWABLE = /^image\/(jpeg|png|webp|avif)$/;

const seed = (name: string) => works.find((w) => w.src.endsWith(`/${name}`));
const seedRank = (name: string) => {
  const i = featuredWorks.findIndex((f) => f.src.endsWith(`/${name}`));
  return i === -1 ? featuredWorks.length : i;
};
const seedPos = (name: string) => featuredWorks.find((f) => f.src.endsWith(`/${name}`))?.pos;

/* ---------- Sin Google: las fotos del repo ---------- */

function localGallery(): GalleryPhoto[] {
  const dir = "/pibe/trabajos";
  const num = (f: string) => Number(f.match(/\d+/)?.[0] ?? Infinity);
  return fs
    .readdirSync(path.join(process.cwd(), "public", dir))
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort((a, b) => seedRank(a) - seedRank(b) || num(a) - num(b) || a.localeCompare(b, "es"))
    .map((f, i) => {
      const w = seed(f);
      return {
        src: `${dir}/${f}`,
        alt: w?.alt ?? `Obra de ${pibe.name}, foto ${i + 1}.`,
        description: w?.what ?? null,
        kind: w?.kind ?? null,
        ratio: w?.ratio ?? 4 / 3,
        pos: seedPos(f),
      };
    });
}

/* ---------- Con Google: la carpeta y la planilla ---------- */

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  md5Checksum?: string;
  imageMediaMetadata?: { width?: number; height?: number; rotation?: number };
};

type Row = { id: string; description: string; kind: string };

async function listFolder(init: RequestInit) {
  const files: DriveFile[] = [];
  let pageToken = "";
  do {
    const params = new URLSearchParams({
      q: `'${FOLDER}' in parents and trashed = false and mimeType contains 'image/'`,
      fields: "nextPageToken,files(id,name,mimeType,md5Checksum,imageMediaMetadata(width,height,rotation))",
      orderBy: "name_natural",
      pageSize: "200",
      supportsAllDrives: "true",
      includeItemsFromAllDrives: "true",
    });
    if (pageToken) params.set("pageToken", pageToken);
    const res = await googleFetch(`${DRIVE}?${params}`, init);
    const page = (await res.json()) as { files?: DriveFile[]; nextPageToken?: string };
    files.push(...(page.files ?? []));
    pageToken = page.nextPageToken ?? "";
  } while (pageToken);
  return files;
}

/** Las columnas de la planilla: A miniatura, B descripción, C tipo, D archivo, E id de Drive. */
async function readRows(init: RequestInit): Promise<(Row & { row: number })[]> {
  const res = await googleFetch(`${SHEETS}/values/${encodeURIComponent("A2:E")}`, init);
  const { values = [] } = (await res.json()) as { values?: string[][] };
  return values.map((v, i) => ({
    row: i + 1,
    description: (v[1] ?? "").trim(),
    kind: (v[2] ?? "").trim(),
    id: (v[4] ?? "").trim(),
  }));
}

const photoSrc = (f: DriveFile) => `/api/galeria/foto/${f.id}/${f.md5Checksum ?? "0"}`;

function toKind(text: string): WorkKind | null {
  const wanted = text.toLocaleLowerCase("es");
  return workKinds.find((k) => k.toLocaleLowerCase("es") === wanted) ?? null;
}

function toPhoto(f: DriveFile, row?: Row): GalleryPhoto {
  const { width, height, rotation } = f.imageMediaMetadata ?? {};
  const turned = rotation === 1 || rotation === 3;
  const description = row?.description || null;
  return {
    src: photoSrc(f),
    alt: description ?? `Obra de ${pibe.name}.`,
    description,
    kind: toKind(row?.kind ?? ""),
    ratio: width && height ? (turned ? height / width : width / height) : 4 / 3,
    pos: seedPos(f.name),
  };
}

async function remoteGallery(): Promise<GalleryPhoto[]> {
  const [files, rows] = await Promise.all([listFolder(CACHED), readRows(CACHED)]);
  const pending = new Map(files.filter((f) => SHOWABLE.test(f.mimeType)).map((f) => [f.id, f]));
  const photos: GalleryPhoto[] = [];
  for (const row of rows) {
    const file = pending.get(row.id);
    if (!file) continue;
    photos.push(toPhoto(file, row));
    pending.delete(row.id);
  }
  for (const file of pending.values()) photos.push(toPhoto(file));
  return photos;
}

/**
 * Las fotos para la página. Si Google falla mientras se arma el sitio, salen las del repo para no
 * trabar la publicación; si falla después, el error deja vigente la última versión de la página
 * en vez de vaciar la galería (por eso se publica con el perfil "max" de revalidateTag, que nunca
 * descarta la versión anterior antes de tener la nueva). Una carpeta vacía también vuelve a las del repo: es más probable un
 * error de permisos que un cliente que quiera mostrar una galería sin fotos.
 */
export async function getGallery(): Promise<GalleryPhoto[]> {
  if (!galleryConnected) return localGallery();
  try {
    const photos = await remoteGallery();
    return photos.length > 0 ? photos : localGallery();
  } catch (error) {
    if (process.env.NEXT_PHASE !== "phase-production-build") throw error;
    console.error("Galería: no se pudo leer Google al compilar; salen las fotos del repo.", error);
    return localGallery();
  }
}

/** Trae una foto de la carpeta. Cualquier otro archivo que vea la cuenta de servicio da null. */
export async function fetchFolderPhoto(id: string) {
  if (!galleryConnected || !/^[\w-]+$/.test(id)) return null;
  const meta = await googleFetch(`${DRIVE}/${id}?fields=mimeType,parents&supportsAllDrives=true`);
  const { mimeType, parents = [] } = (await meta.json()) as { mimeType: string; parents?: string[] };
  if (!SHOWABLE.test(mimeType) || !parents.includes(FOLDER!)) return null;
  const res = await googleFetch(`${DRIVE}/${id}?alt=media&supportsAllDrives=true`);
  return { body: res.body, mimeType };
}

/* ---------- Poner la planilla al día ---------- */

type Cell = { userEnteredValue?: Record<string, string>; userEnteredFormat?: { textFormat: { link?: { uri: string }; bold?: boolean } } };
const text = (stringValue: string): Cell => ({ userEnteredValue: { stringValue } });
const link = (stringValue: string, uri: string, bold = false): Cell => ({
  userEnteredValue: { stringValue },
  userEnteredFormat: { textFormat: { link: { uri }, bold } },
});
const CELL_FIELDS = "userEnteredValue,userEnteredFormat.textFormat";

function batchUpdate(requests: unknown[]) {
  return googleFetch(`${SHEETS}:batchUpdate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requests }),
  });
}

function newRow(f: DriveFile, origin: string) {
  const thumb = `${origin}/_next/image?url=${encodeURIComponent(photoSrc(f))}&w=256&q=75`;
  const known = seed(f.name);
  return {
    values: [
      { userEnteredValue: { formulaValue: `=IMAGE("${thumb}")` } },
      text(known?.what ?? ""),
      text(known?.kind ?? ""),
      link(f.name, `https://drive.google.com/file/d/${f.id}/view`),
      text(f.id),
    ],
  };
}

/** La primera vez: títulos, enlace para actualizar, lista de tipos y columnas a medida. */
function prepareSheet(sheetId: number, updateUrl: string) {
  const title = (s: string): Cell => ({ userEnteredValue: { stringValue: s }, userEnteredFormat: { textFormat: { bold: true } } });
  const width = (startIndex: number, pixelSize: number) => ({
    updateDimensionProperties: {
      range: { sheetId, dimension: "COLUMNS", startIndex, endIndex: startIndex + 1 },
      properties: { pixelSize },
      fields: "pixelSize",
    },
  });
  return batchUpdate([
    {
      updateCells: {
        start: { sheetId, rowIndex: 0, columnIndex: 0 },
        rows: [{ values: [title("Foto"), title("Descripción"), title("Tipo"), title("Archivo"), title("ID (no tocar)"), {}, link("Traer fotos nuevas y publicar", updateUrl, true)] }],
        fields: CELL_FIELDS,
      },
    },
    { updateSheetProperties: { properties: { sheetId, gridProperties: { frozenRowCount: 1 } }, fields: "gridProperties.frozenRowCount" } },
    {
      repeatCell: {
        range: { sheetId, startRowIndex: 1, startColumnIndex: 1, endColumnIndex: 2 },
        cell: { userEnteredFormat: { wrapStrategy: "WRAP", verticalAlignment: "TOP" } },
        fields: "userEnteredFormat(wrapStrategy,verticalAlignment)",
      },
    },
    {
      setDataValidation: {
        range: { sheetId, startRowIndex: 1, startColumnIndex: 2, endColumnIndex: 3 },
        rule: { condition: { type: "ONE_OF_LIST", values: workKinds.map((userEnteredValue) => ({ userEnteredValue })) }, showCustomUi: true, strict: false },
      },
    },
    width(0, 150),
    width(1, 460),
    width(2, 110),
    width(3, 170),
    width(6, 240),
    { updateDimensionProperties: { range: { sheetId, dimension: "COLUMNS", startIndex: 4, endIndex: 5 }, properties: { hiddenByUser: true }, fields: "hiddenByUser" } },
  ]);
}

/**
 * Pone la planilla al día con la carpeta: agrega una fila por cada foto nueva (con su miniatura) y
 * saca las filas de las fotos borradas. Las descripciones y el orden que cargó el cliente no se
 * tocan. Con la carpeta vacía no borra nada: sería perder todos los textos por un error de permisos.
 */
export async function syncSheet(updateUrl: string): Promise<SyncResult> {
  const origin = new URL(updateUrl).origin;
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${SHEET}/edit`;
  const files = await listFolder(FRESH);
  const showable = files.filter((f) => SHOWABLE.test(f.mimeType));
  const skipped = files.filter((f) => !SHOWABLE.test(f.mimeType)).map((f) => f.name);
  if (showable.length === 0) return { empty: true, added: [], removed: 0, skipped, sheetUrl };

  const metaRes = await googleFetch(`${SHEETS}?fields=sheets.properties(sheetId,title)`, FRESH);
  const { sheets } = (await metaRes.json()) as { sheets: { properties: { sheetId: number; title: string } }[] };
  const { sheetId } = sheets[0].properties;

  const headerRes = await googleFetch(`${SHEETS}/values/${encodeURIComponent("A1:A1")}`, FRESH);
  const { values: header } = (await headerRes.json()) as { values?: string[][] };
  if (!header?.[0]?.[0]) await prepareSheet(sheetId, updateUrl);

  const rows = await readRows(FRESH);
  const inFolder = new Set(showable.map((f) => f.id));
  const inSheet = new Set(rows.map((r) => r.id));

  // De abajo hacia arriba, para que borrar una fila no corra las que faltan.
  const gone = rows.filter((r) => r.id && !inFolder.has(r.id)).reverse();
  const fresh = showable.filter((f) => !inSheet.has(f.id)).sort((a, b) => seedRank(a.name) - seedRank(b.name));
  const requests = [
    ...gone.map((r) => ({ deleteDimension: { range: { sheetId, dimension: "ROWS", startIndex: r.row, endIndex: r.row + 1 } } })),
    ...(fresh.length > 0 ? [{ appendCells: { sheetId, rows: fresh.map((f) => newRow(f, origin)), fields: CELL_FIELDS } }] : []),
    ...(fresh.length > 0
      ? [{ updateDimensionProperties: { range: { sheetId, dimension: "ROWS", startIndex: 1, endIndex: rows.length - gone.length + fresh.length + 1 }, properties: { pixelSize: 110 }, fields: "pixelSize" } }]
      : []),
  ];
  if (requests.length > 0) await batchUpdate(requests);

  return { empty: false, added: fresh.map((f) => f.name), removed: gone.length, skipped, sheetUrl };
}
