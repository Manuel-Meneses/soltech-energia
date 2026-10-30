import { createSign } from "node:crypto";

/**
 * Conexión con Google para la galería, con una cuenta de servicio y sin librerías: la cuenta firma
 * un JWT, lo cambia por un token y con ese token se llama a las APIs de Drive y Sheets. Solo ve lo
 * que se le compartió: la carpeta de fotos y la planilla. Las credenciales son el JSON entero que
 * da Google Cloud, en la variable GALERIA_GOOGLE_CREDENCIALES.
 */
const SCOPES = "https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets";
const base64url = (s: string | Buffer) => Buffer.from(s).toString("base64url");

async function accessToken() {
  const { client_email: email, private_key: key } = JSON.parse(process.env.GALERIA_GOOGLE_CREDENCIALES!);
  const now = Math.floor(Date.now() / 1000);
  const claims = { iss: email, scope: SCOPES, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 };
  const unsigned = `${base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${base64url(JSON.stringify(claims))}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(key);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${base64url(signature)}`,
    }),
  });
  if (!res.ok) throw new Error(`Google no dio el token (${res.status})`);
  return ((await res.json()) as { access_token: string }).access_token;
}

/** Una llamada a Google con el token puesto. Tira un error si no responde bien. */
export async function googleFetch(url: string, init: RequestInit = {}) {
  const token = await accessToken();
  const res = await fetch(url, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Google respondió ${res.status} en ${new URL(url).pathname}`);
  return res;
}
