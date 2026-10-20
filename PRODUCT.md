# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Quien decide:** dueños de casas, PH y departamentos con terraza, y comerciantes (un local, un taller, una despensa) de Buenos Aires que piensan en poner paneles solares o un termotanque solar para bajar la factura de luz o de gas, o que ya los tienen y necesitan mantenimiento o limpieza. No son técnicos: llegan con la factura en la mano y quieren saber si les conviene, cuánto ocupa, cuánto sale y quién viene a casa.
- **Quien recibe la propuesta:** Matías Moreira, que arranca su emprendimiento por su cuenta. El sitio es una propuesta para mostrarle: tiene que reconocerse en él y ver con claridad qué material propio le falta cargar (precios, contactos, barrios de cada trabajo).

## Product Purpose

El Pibe del Aire es el emprendimiento de Matías Moreira: instala paneles solares en casas y comercios, instala termotanques solares y hace mantenimiento y limpieza de equipos solares en Buenos Aires. El sitio (`/`) le presenta a un vecino quién es Matías, qué hace, cuánto equipo necesitaría su casa, cómo trabaja, sus trabajos y cómo escribirle. El éxito es que un visitante escriba por WhatsApp con lo necesario para arrancar: qué servicio busca, si es casa o comercio, su barrio y su consumo.

## Positioning

Una persona, de punta a punta: el mismo que mira tu techo es el que te pasa el presupuesto, instala y vuelve a mantenerlo. Frente a las empresas grandes, trato directo y cercanía de barrio; frente al instalador informal, un sitio prolijo, una forma de trabajo explicada y trabajos a la vista.

## Operating Context

- **Zona:** Buenos Aires. Falta precisar barrios o partidos que cubre.
- **Contacto:** WhatsApp, Instagram y email, todavía sin cargar. El formulario no tiene backend: arma el mensaje y abre WhatsApp. Sin número cargado, abre WhatsApp con el mensaje para elegir el contacto.
- **Rutas:** el sitio vive en `/`; `/pibe-del-aire`, la dirección anterior, redirige (307) a la raíz. No se indexa: es una vista previa.

## Capabilities and Constraints

- **Servicios:** paneles solares para casas y comercios, termotanques solares, mantenimiento, limpieza de paneles.
- **Abierto:** el nombre sugiere aire acondicionado. No se sabe si Matías también trabaja con aires; hasta confirmarlo el sitio no los menciona.
- **Stack:** Next.js 16 (App Router), Tailwind CSS v4 y Phosphor Icons. Las animaciones son CSS: no hay librería de animación. Los datos viven en `lib/pibe.ts`.
- **Restricciones:** liviano en celular, sin blur (`filter: blur` ni `backdrop-filter`), solo `transform` y `opacity` en lo que se anima al cargar o con el scroll.

## Brand Commitments

- **Nombre:** El Pibe del Aire. No tiene logo: el sitio propone una marca tipográfica (un sol con tres líneas de aire) que Matías tiene que aprobar.
- **Paleta elegida:** "Cielo y sol": azul noche, papel celeste y celeste porteño, con un dorado sobrio en lugar de amarillo para la acción (pedido del usuario: "algo más profesional").
- **Voz:** primera persona de Matías, español rioplatense con voseo ("Pedí una visita", "Contame qué necesitás"). Directa, de barrio y concreta, sin superlativos.

## Evidence on Hand

- Nombre, nombre del emprendimiento, servicios y zona general.
- Las fotos de Matías ya están (hero, retrato y cinco trabajos, en public/pibe/); falta el barrio de cada trabajo.
- **Sin inventar:** no hay precios, clientes, testimonios, matrícula, años de experiencia ni cifras. Lo que falta se muestra como "A completar" y lo que es de ejemplo se marca como tal. La calculadora es una estimación orientativa con supuestos a la vista, no una promesa.

## Product Principles

1. **La persona primero.** Un emprendedor vende confianza en sí mismo: su cara, su nombre y su forma de trabajar van antes que el catálogo.
2. **Hacer la cuenta con el vecino.** Responder "¿cuánto necesito?" en la página, con su consumo, antes de pedirle que escriba.
3. **Todo lleva a WhatsApp** con el contexto ya cargado.
4. **Honesto con lo que falta.** Los lugares vacíos se ven como lugares a completar, no como relleno.

## Accessibility & Inclusion

WCAG 2.1 AA: contraste mínimo de 4.5:1 en texto, navegación completa por teclado con foco visible, respeto por `prefers-reduced-motion` (el contenido nunca depende de una animación para verse) y errores de formulario anunciados y enlazados a su campo.
