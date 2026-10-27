---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["components/pibe","lib/pibe.ts"]
---

# Surface brief: / (Soltech Energía)

Scope: landing de Soltech Energía, empresa de energía solar para casas y empresas de la Provincia de Buenos Aires. Entrega final al cliente. Modo: Persuade.
Audiencia: dueños de casas, PH y terrazas, y empresas (comercios, galpones, industrias). Acción: escribir por WhatsApp (formulario que arma el mensaje, botones flotantes, barra fija en celular).
Prueba disponible: 21 fotos de obras propias, "Electricista matriculado", "Más de 8 años", marcas. Sin precios, testimonios ni garantía (no van a llegar). Por llegar: dominio y teléfono para llamar (campos `domain` y `phone` en lib/pibe.ts).

## Direction contract

THESIS: La prueba antes que la promesa: obras propias apenas termina el hero, la cuenta de paneles hecha con la factura del vecino y todo camino terminando en WhatsApp con el contexto cargado. Rechaza la landing de instalador con foto de banco, tres tarjetas de servicios y "¡Ahorrá ya!".

OWN-WORLD: "Plano y Módulo" en la escala azul acero del cliente (50–950). Azul noche 900 y papel 50 alternados; azul claro 300 = lo vivo; acción en azul acero 600 sobre papel y en papel sobre azul noche. Archivo con eje de ancho, cero radio, filetes de 1px, juntas de 2px, celdas de panel.

STORY: El vecino ve una obra real con el beneficio y quién respalda (matrícula, años, marcas), ve ocho obras más, entiende los cuatro servicios, hace la cuenta con su factura, ve cómo trabajan, quiénes son y qué cambia para una empresa, resuelve dudas y escribe.

FIRST VIEWPORT: Azul noche, 100svh. Foto de obra a pantalla completa con degradé del lado del texto; titular en mayúsculas expandido, bajada con el beneficio, botón "Pedí una visita" en papel, enlace a la calculadora y la franja de confianza. Al pie, la hoja de cuatro servicios.

FORM: extensión del mundo establecido. Firma: obras a la vista (grilla de ocho que abre el visor de todas en el lugar); segunda pieza: la calculadora que arma el techo de paneles.

Decisiones del usuario (26 oct. 2026, revisión para la entrega): sin intro ni placa del sol; Servicios en grilla de 2×2 en vez de escenas a pantalla completa; Equipos (ficha técnica) pasó a una pregunta frecuente y las marcas a "Quiénes somos"; la barra fija del celular queda como está (Pedí una visita + WhatsApp + Instagram). El método de climatización de piscinas sigue sin confirmar: el texto no lo nombra.
