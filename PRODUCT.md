# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Quien decide:** dueños de casas, PH y terrazas, y empresas (comercios, galpones, industrias) de la Provincia de Buenos Aires y del resto del país, campos y quintas sin red, y dueños de casas rodantes, motorhomes y vehículos, que piensan en poner paneles solares o climatizar la pileta con el sol para gastar menos, o que ya tienen equipos y necesitan mantenimiento o limpieza. No son técnicos: llegan con la factura de luz en la mano y quieren saber si les conviene, cuánto ocupa, quién viene y si ya lo hicieron antes.
- **Quien recibe el sitio:** Soltech Energía, el cliente. Es la entrega final: el sitio tiene que poder publicarse tal cual, sin lugares vacíos a la vista.

## Product Purpose

Soltech Energía instala paneles solares en casas y empresas, sistemas de respaldo con batería e inversor (sin paneles) para los cortes de luz, climatiza piscinas con bomba de calor o con colectores solares y hace mantenimiento y limpieza de equipos, en la Provincia de Buenos Aires (y otras zonas, a consultar). También instala termotanques solares, pero el cliente los quiere en segundo plano. El sitio (`/`) muestra primero obras reales, después qué hacen, el respaldo para los cortes, las dos formas de climatizar la pileta, cuántos paneles necesitaría la casa, cómo trabajan, quiénes son y qué cambia para una empresa. El éxito es que el visitante escriba por WhatsApp con lo necesario para arrancar: qué servicio busca, si es casa o empresa, su localidad y, si hizo la cuenta, su consumo.

## Positioning

Energía solar a tu medida: diseño, venta e instalación de sistemas fotovoltaicos (on-grid, híbridos, off-grid y móviles) en todo el país. Al frente está Matías Moreira, instalador de sistemas fotovoltaicos, que acompaña cada proyecto de principio a fin: analiza el consumo, dimensiona el equipo justo e instala con criterio técnico y seguridad. Un mismo equipo de punta a punta: el que mira tu techo es el que arma el presupuesto, instala y vuelve a mantener. Frente a las empresas grandes, trato directo; frente al instalador informal, electricista matriculado, más de 8 años en el rubro, marcas reconocidas y obras propias a la vista.

## Operating Context

- **Zona:** todo el país, con base en la Provincia de Buenos Aires (confirmado por el cliente, 27 oct. 2026). No hay lista de partidos.
- **Contacto:** WhatsApp (+54 9 11 6187-5709), Instagram (@matias.soltech) y mail (matias.moreira@soltech-energia.com). El formulario manda la consulta por WhatsApp (principal) o por mail (abre el programa de correo con asunto y texto armados). El teléfono para llamar está por llegar: con `phone` cargado en `lib/pibe.ts` aparece "Teléfono" en el contacto y el pie. El formulario no tiene backend: arma el mensaje y abre WhatsApp.
- **Dominio:** https://soltech-energia.com (confirmado el 27 oct. 2026). Con `domain` cargado en `lib/pibe.ts` el sitio se indexa: `metadataBase` en `app/layout.tsx`, canonical, `robots.txt` con sitemap y la URL e imagen del JSON-LD. Con `domain` en `null` vuelve a ser una vista previa (`noindex`, sin sitemap).
- **Medición:** Vercel Analytics, con eventos propios de conversión (`lib/track.ts`): pedi_visita, whatsapp, instagram, email, llamada, formulario_enviado, calculadora_enviada, servicio_consultado. Los eventos propios solo se ven en los planes Pro o Enterprise de Vercel.

## Capabilities and Constraints

- **Servicios:** sistemas fotovoltaicos de cuatro tipos (on-grid, híbrido con baterías, off-grid para lugares sin red y móvil para casas rodantes, motorhomes y vehículos), que se diseñan, venden e instalan; en el formulario van como "Paneles solares". Además: sistemas de respaldo (inversor y batería, sin paneles; se pueden sumar paneles después con un inversor híbrido), climatización de piscinas (bomba de calor o colectores solares), mantenimiento, limpieza de paneles. Termotanques solares: nombrados al pie de Servicios y en Preguntas, no como servicio propio.
- **Piscinas:** confirmado por el cliente (26 oct. 2026): bomba de calor (la foto de obra la muestra) y colectores solares. Los meses de temporada de cada una (`poolSeasons` en `lib/pibe.ts`) son orientativos y están a la vista como tales; el cliente puede corregirlos.
- **Stack:** Next.js 16 (App Router), Tailwind CSS v4, Phosphor Icons, `@vercel/analytics`. Las animaciones son CSS: no hay librería de animación. Los datos viven en `lib/pibe.ts`; las fotos de obras, en `public/pibe/trabajos/` (se leen solas).
- **Restricciones:** liviano en celular, sin blur (`filter: blur`, `backdrop-filter` ni `placeholder="blur"`), solo `transform` y `opacity` en lo que se anima.

## Brand Commitments

- **Nombre:** Soltech Energía, con su ícono (`app/icon.svg`).
- **Paleta:** azul acero del cliente, `--color-50` #eef2f7 a `--color-950` #080d11. Azul noche (900) y papel (50) alternados; azul claro (300) para lo vivo; acción en azul acero 600 sobre papel y en papel sobre azul noche.
- **Voz:** la empresa en plural ("Instalamos", "Contanos", "Pedí una visita"), español rioplatense con voseo al visitante. Directa y concreta, sin superlativos.

## Evidence on Hand

- Nombre, servicios, zona, WhatsApp, Instagram, "Electricista matriculado", "Más de 8 años", marcas (JA Solar, Jinko, Trina / Huawei, Fronius, Deye / Pylontech, Dyness).
- 21 fotos de obras propias, con leyenda en `works` de `lib/pibe.ts`. Sin barrio por foto.
- **No van a llegar:** testimonios, garantía, visita sin cargo, plazos, fotos propias de pileta terminada. No planificar secciones que dependan de eso.
- **Sin inventar:** no hay precios (el cliente no los publica), testimonios, garantía ni cifras de obras. Lo que falta vale `null` y no se muestra. La calculadora es una estimación orientativa con los supuestos a la vista.

## Product Principles

1. **La prueba primero.** Obras propias inmediatamente después del hero, antes de pedir nada.
2. **Hacer la cuenta con el vecino.** Responder "¿cuántos paneles necesito?" en la página, con su factura (mensual o bimestral) o una casa parecida.
3. **Todo lleva a WhatsApp** con el contexto ya cargado.
4. **Nada vacío a la vista.** Un dato que falta no aparece; nunca se rellena.

## Accessibility & Inclusion

WCAG 2.1 AA: contraste mínimo de 4.5:1 en texto, navegación completa por teclado con foco visible en cada fondo, respeto por `prefers-reduced-motion` (el contenido nunca depende de una animación para verse) y errores de formulario anunciados y enlazados a su campo.
