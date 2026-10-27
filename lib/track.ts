import { track } from "@vercel/analytics";

/**
 * Las consultas que trae el sitio, contadas en Vercel Analytics (pestaña Events). Son los
 * momentos en que alguien pasa a hablar con Soltech: abrir WhatsApp, llamar, mandar el
 * formulario o la cuenta de la calculadora. Vercel solo guarda eventos propios en los planes
 * Pro y Enterprise; en Hobby la llamada no hace nada y el sitio funciona igual.
 */
export type Conversion =
  | "pedi_visita"
  | "whatsapp"
  | "instagram"
  | "email"
  | "llamada"
  | "formulario_enviado"
  | "calculadora_enviada"
  | "servicio_consultado";

export function trackConversion(name: Conversion, props?: Record<string, string | number>) {
  try {
    track(name, props);
  } catch {
    // Medir nunca puede trabar una consulta.
  }
}
