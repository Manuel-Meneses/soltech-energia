---
name: Soltech Energía
description: Sistemas fotovoltaicos, respaldo y piscinas climatizadas en todo el país, en un sitio "Plano y Módulo" de azul noche y papel con un sol ámbar, con obras propias a la vista.
colors:
  ink: "#172331"
  ink-2: "#263a50"
  paper: "#eef2f7"
  paper-2: "#cedbe8"
  line: "#afc4d9"
  muted: "#34516f"
  on-dark: "#eef2f7"
  on-dark-muted: "#afc4d9"
  dark-line: "#34516f"
  sky: "#90accb"
  sky-deep: "#43678e"
  sun: "#fcbf5a"
  sun-light: "#ffd99a"
  sun-hot: "#ef8a32"
  sun-deep: "#a84a14"
  action: "#43678e"
  action-hover: "#34516f"
  on-action: "#ffffff"
  deep: "#080d11"
  error: "#b3261e"
  field: "#ffffff"
typography:
  hero:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, min(7vw, 12.5svh), 7.5rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.035em"
    fontVariation: "\"wdth\" 125"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 125"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.375
    fontVariation: "\"wdth\" 118"
  figure:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 2.5vw, 2.15rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\" 1"
    fontVariation: "\"wdth\" 125"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    fontVariation: "\"wdth\" 100"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    fontVariation: "\"wdth\" 100"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.3
    fontVariation: "\"wdth\" 100"
  button:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1
    fontVariation: "\"wdth\" 110"
rounded:
  none: "0px"
spacing:
  gutter-mobile: "20px"
  gutter-tablet: "32px"
  gutter-desktop: "48px"
  container: "88rem"
  section: "80px"
  section-lg: "112px"
  module-joint: "2px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.on-action}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.on-action}"
  button-primary-on-dark:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "3.25rem"
  button-primary-on-dark-hover:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "3.25rem"
  button-ink-hover:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.on-dark}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "3.25rem"
  header-cell:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "4rem"
  header-cell-cta:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 22.4px"
    height: "4rem"
  field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12.8px 16px"
  choice-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.none}"
    padding: "8px 14.4px"
    height: "3rem"
  data-sheet:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.figure}"
    rounded: "{rounded.none}"
    padding: "16px 16px 0 0"
---

# Design System: Soltech Energía

## Overview

**Creative North Star: "Plano y Módulo, en azul acero"**

Un sitio "Plano y Módulo" para una empresa que instala sobre techos de la Provincia de Buenos Aires. Todo sale del material del rubro: la cabecera es un módulo fotovoltaico con celdas de vidrio azul noche, juntas de 2px y busbars tenues; las obras, los servicios y los pasos se arman como celdas de un panel, unidas por juntas; las cifras van en hojas de datos con filetes. Las fotos son todas de obras propias, tal como salen del celular, sin filtros. Ninguna esquina es redondeada.

La página alterna azul noche y papel por capítulo y cierra en un campo azul claro a pleno, con el formulario apoyado encima como una hoja de plano. El azul claro es lo eléctrico y lo elegido: la sección actual, la pestaña elegida, los paneles que genera la calculadora. El sol ámbar, sacado del atardecer del hero, es lo cálido: el sol de la marca y del titular, el calor, lo que se destaca en cada sección. La acción es azul acero 600 con texto blanco sobre papel, y papel con texto azul noche sobre lo oscuro: siempre el contraste más fuerte de su fondo.

Una sola familia, Archivo, trabajada con su eje de ancho: expandida (125) en titulares y cifras, como un cartel de obra, y a ancho normal (100) para leer. Lo que falta del cliente no aparece; nunca se inventa. El movimiento usa un ease-out fuerte, anima solo transformación y opacidad y respeta el movimiento reducido.

**Key Characteristics:**
- Azul noche y papel alternados por capítulo; el cierre es un campo azul claro a pleno.
- Una sola escala de color, la del cliente (`--color-50` a `--color-950`); afuera de ella, solo los colores de WhatsApp, Instagram y los logos de marcas.
- Archivo con eje de ancho: 125 en titulares y cifras, 118 en títulos, 100 para leer.
- Cero radio, filetes de 1px y juntas de 2px.
- Fotos de obras propias, sin retoque; ningún dibujo ni foto de banco. La única excepción, por decisión del cliente, es la foto del hero (un galpón con paneles al atardecer, de Unsplash), que no se presenta como obra.
- Lo que falta no se muestra; nada se inventa.
- Sin blur; lo que se mueve anima solo transformación y opacidad.

## Colors

La escala azul acero del cliente, de `#eef2f7` (50) a `#080d11` (950). Cada rol es un paso de la escala.

### Primary
- **Azul Acero** (action, 600): la acción sobre papel. Botones "Consultar", "Pedí una visita con esta cuenta", la barra de contacto en celular. Texto blanco encima; al pasar el mouse, 700.
- **Papel como acción** (paper sobre ink): sobre azul noche el botón principal es papel con texto azul noche (hover 100). Es el botón del hero, la celda "Pedí una visita" de la cabecera, los botones de Servicios, Empresas y el resultado de la calculadora.

### Secondary
- **Sol** (sun, #fcbf5a), con **Sol Claro** (#ffd99a) y **Sol de Atardecer** (#ef8a32): lo que viene del sol y lo que se destaca, sacado del atardecer de la foto del hero. El sol de la marca y de la O de "SOL" (con un degradé de claro a naranja, como un sol que se pone), los tildes de la franja de confianza, los cuadritos de detalles y de "Lleva", las marcas "Sí" de la hoja de sistemas, el ícono del sol en cada cadena, las ventanas con luz de la cuadra (la de tu casa, en sol claro) y su indicador, los meses que suma cada equipo de pileta y su "+N", el primer número de la calculadora, los soles de Cómo trabajamos (naranja al salir y al ponerse, claro al mediodía), el filete de arriba de la lista de Empresas, el disco de "¿Agua caliente con el sol?", el marco de la miniatura del visor y la selección de texto.
- **Sol Hondo** (sun-deep, #a84a14): el sol que se lee sobre papel (5:1 sobre 50, 4:1 sobre 100). El filete de arriba de la ficha de Quiénes somos y los "+" de Preguntas.
- **Azul Claro** (sky, 300): lo vivo sobre oscuro. La celda de la sección actual en la cabecera, el panel de la marca, la pestaña elegida de sistemas, los números de los pasos, las rayas de la hoja del hero, los íconos de las cadenas, la corriente y la batería del respaldo, el anillo de foco sobre oscuro y el fondo entero del contacto.
- **Azul Hondo** (sky-deep, 600): el azul claro que se lee sobre papel: anillo de foco, cursor de los campos, raya del aviso de deslizar.

### Neutral
- **Azul Noche** (ink, 900): fondo de hero, Servicios, Cómo trabajamos, Empresas y pie; texto sobre papel y sobre azul claro.
- **Azul Noche Claro** (ink-2, 800): hover de lo oscuro y la franja de termotanques al pie de Servicios.
- **Papel** (paper, 50) y **Papel Hondo** (paper-2, 100): fondos claros. Paper-2 es el de Preguntas y la columna de rótulos de las marcas.
- **Junta** (line, 200) y **Junta Oscura** (dark-line, 700): filetes y juntas sobre papel y sobre azul noche.
- **Gris Nota** (muted, 700) y **Gris Nota sobre Noche** (on-dark-muted, 200): texto secundario, siempre AA.
- **Fondo de foto** (deep, 950): lo que asoma mientras carga una foto y el fondo del visor.
- **Blanco de Campo** (field): campos, opciones, casas de referencia y celdas de marcas (cada logo en sus colores).
- **Colores de las apps** (WhatsApp `#25d366`, el degradé de Instagram): solo en los botones flotantes y los íconos de esos canales.
- **Error** (error): borde del campo inválido y su mensaje.

### Named Rules
**The Strongest Contrast Acts Rule.** El botón principal es siempre el contraste más fuerte de su fondo: azul acero con blanco sobre papel, papel con azul noche sobre lo oscuro. Nada más usa esas combinaciones como relleno.

**The Sky Lives Rule.** El azul claro es lo eléctrico y lo elegido: la sección actual, la pestaña elegida, la batería, el foco. No se usa para decorar.

**The Sun Warms Rule.** El ámbar es el sol y lo cálido: lo que viene del sol, el calor y lo que se destaca en cada sección. Nunca rellena un botón ni lleva texto chico sobre papel (ahí va el Sol Hondo); la acción sigue siendo azul acero y papel.

**The Two Lights Rule.** Todo color sale de la escala azul acero del cliente o de la del sol (pedido del cliente, 27 oct. 2026: "que no sea todo tan frío"). No hay colores por servicio: lo que distingue es la foto, el texto y el número.

## Typography

**Display Font:** Archivo, eje de ancho (with system-ui, sans-serif)
**Body Font:** Archivo, eje de ancho (with system-ui, sans-serif)

**Character:** Una sola familia con dos voces. Expandida es la rotulación de obra. A ancho normal, con un leve espacio entre palabras (0.04em), es la voz de la empresa, que se lee sin esfuerzo.

### Hierarchy
- **Hero** (800, clamp(2.2rem, min(7vw, 12.5svh), 7.5rem), 0.86; wdth 125; mayúsculas): el titular del hero, limitado por el alto de la pantalla para que entre en una notebook.
- **Headline** (600, clamp(2.25rem, 5vw, 4rem), 0.98; wdth 125): el título de cada capítulo, con `text-wrap: balance`.
- **Title** (600, 1.25rem, 1.375; wdth 118): títulos de pasos, filas de Empresas, preguntas. Los títulos de servicio suben a clamp(1.6rem, 2.6vw, 2.25rem) con wdth 125.
- **Figure** (600, clamp(1.6rem, 2.5vw, 2.15rem), 1; wdth 125; cifras tabulares): las cuatro cifras de la calculadora, con la unidad a media escala. El campo de kWh y los números de los pasos usan la misma voz, más grande.
- **Lead** (400, 1.125rem a 1.3rem, 1.55 a 1.625): bajadas de sección, de 44 a 56ch.
- **Body** (400, 1rem, 1.5): texto corrido y respuestas.
- **Label** (600, 0.875rem): rótulos de campos, de la ficha, de los canales y de la franja de confianza.

### Named Rules
**The Width Axis Rule.** La jerarquía sale del eje de ancho y del peso, nunca de otra familia.

**The Tabular Figures Rule.** Toda cifra que se compara o cuenta (paneles, kWp, m², kWh, contador del visor) va con números tabulares.

## Layout

- **Contenedor y márgenes:** 88rem centrado, márgenes de 20px en celular, 32px en tablet y 48px en escritorio. Grilla de 12 columnas: el título ocupa 7 columnas y la bajada 5, alineada abajo.
- **Orden y fondos:** hero (noche) → Trabajos (papel) → Servicios (noche) → Respaldo (papel) → Piscinas (noche) → Calculadora (papel) → Cómo trabajamos (noche) → Quiénes somos y marcas (papel) → Empresas (noche) → Preguntas (papel hondo) → Contacto (azul claro) → pie (noche).
- **Ritmo:** 80px de padding vertical por capítulo (112px desde tablet).
- **Hero:** azul noche a 100svh, foto en alta resolución de paneles sobre un galpón al atardecer (Unsplash, espejada para que el sol quede a la derecha, lejos del titular) a pantalla completa bajo un degradé de azul noche del lado del texto (de arriba abajo en celular). Titular en mayúsculas, bajada con el beneficio, botón en papel y enlace a la calculadora, y debajo la franja de confianza: una placa azul noche al 90% con filetes entre datos (matrícula, años, marcas), apilada en celular. Al pie, la hoja de cuatro servicios en una franja opaca.
- **Trabajos:** ocho obras elegidas en una grilla sin huecos con juntas de 2px: la primera ocupa 2×2 y la última va a lo ancho (4 columnas en escritorio, 2 en celular). Cada celda abre el visor en esa foto. El visor (en el mismo lugar) muestra las 21 fotos enteras sobre fondo 950, con barra de contador, leyenda y flechas, y una tira de miniaturas; su alto sale del ancho del visor (`cqi`) y entra entero en una pantalla de notebook.
- **Servicios:** arriba, el selector de sistemas (pestañas a la izquierda y el sistema elegido a la derecha desde 1200px; apilados por debajo). Debajo, módulo de 2×2 con juntas de 2px (respaldo, piscinas, mantenimiento, limpieza): foto 16:9 arriba, título, texto, detalles y "Consultar" abajo, alineados entre celdas; respaldo y piscinas suman un enlace a su sección. A lo ancho, la franja de termotanques.
- **Respaldo:** módulo de dos celdas: la escena de la cuadra (azul noche, dos tercios) y la foto de obra del inversor con baterías; debajo, tres datos con filete y el botón.
- **Piscinas:** módulo de dos celdas: la temporada mes a mes (dos tercios) y la foto de la bomba de calor; debajo, las dos formas lado a lado, con las filas compartidas por subgrid.
- **Calculadora:** dos columnas unidas: entradas sobre papel (factura mensual o bimestral, campo de kWh y deslizador, casas de referencia, cobertura, aviso de consumo alto al pie) y el resultado en azul noche (techo de 30 lugares, cuatro cifras, botón). Los supuestos van debajo, en una nota.
- **Celular:** los pasos pasan a un carril horizontal con snap; la barra de contacto fija (azul acero) aparece abajo con WhatsApp e Instagram a su derecha, y la página reserva su alto al saltar por anclas (`scroll-padding-bottom`).

## Elevation & Depth

El sistema es plano. La profundidad sale del tono y de filetes de 1px. Las sombras quedan para lo que flota o se apoya.

### Shadow Vocabulary
- **Módulo flotante** (`0 10px 30px rgb(8 13 17 / 0.2)`; al bajar, `0 12px 34px rgb(8 13 17 / 0.32)`): la cabecera.
- **Hoja de plano** (`0 1px 0 rgb(8 13 17 / 0.06), 0 18px 40px -16px rgb(8 13 17 / 0.35)`): el formulario sobre el campo azul claro.
- **Barra flotante** (`0 10px 30px -8px rgb(8 13 17 / 0.45)`): la barra de contacto en celular y la columna de WhatsApp e Instagram.

### Named Rules
**The No Blur Rule.** Nada se desenfoca: ni `filter: blur`, ni `backdrop-filter`, ni `placeholder="blur"`. Lo que flota usa un fondo más denso (celdas de la cabecera al 78%, 96% al bajar; la franja de confianza al 90%).

**The Flat Sheet Rule.** Celdas, cifras, tablas y listas no llevan sombra. Si algo necesita separarse, va un filete, una junta o un cambio de tono.

## Shapes

- **Radio:** cero en todo, sin excepciones.
- **Juntas:** los módulos se arman con juntas de 2px (cabecera, obras, servicios, pasos, marcas, barra del visor) en las que el fondo asoma entre celdas, y de 3px en el techo de la calculadora.
- **Fotos:** sin retoque ni filtros; el encuadre se corre por foto (`pos` en lib/pibe.ts) cuando la celda las recorta. Con mouse, la foto de una celda se acerca un 3%.
- **Círculos:** el único círculo es el sol: el de cada paso y la O de "SOL" en el titular del hero. Indicadores y viñetas son cuadrados.

## Components

### Buttons
- **Shape:** a escuadra, 52px de alto y 24px de padding lateral; label semibold con wdth 110. La flecha avanza 4px al pasar el mouse y el botón se achica a 0.97 al presionar.
- **Primary:** azul acero con texto blanco sobre papel; papel con texto azul noche sobre azul noche.
- **Ink:** azul noche con texto claro: "Enviar por WhatsApp".
- **Line:** borde de 1px del color del texto; al pasar el mouse toma un tinte del 10%. "Ver las 21 fotos".
- **Focus:** anillo de 2px desplazado 3px: azul claro sobre oscuro, azul hondo sobre papel; azul noche en campos y en la celda clara de la cabecera.
- **Link:** subrayado de 1px desplazado, del color del texto.

### Navigation (el módulo)
- **Style:** barra fija y flotante que es un módulo fotovoltaico: marco translúcido, celdas de vidrio azul noche, busbars por celda, sin desenfoque.
- **States:** la celda de la sección actual genera: un cuadrado azul claro de 7px y una luz que sube del borde. Al pasar el mouse, un reflejo cruza el vidrio en diagonal. "Pedí una visita" es la única celda de papel.
- **Mobile:** menú en grilla de dos columnas con celdas grandes.

### Inputs / Fields
- **Style:** fondo blanco, borde de 1px (line), cursor azul hondo y radio cero, sobre la hoja de papel.
- **Focus:** contorno azul noche de 2px.
- **Error:** borde en error y mensaje enlazado al campo. Obligatorios: nombre, localidad y servicio; el mensaje es opcional.
- **Opciones:** botones a escuadra de 48px; la elegida se llena de azul noche. Lo que trae un botón "Consultar" o la calculadora destella una vez en el campo.

### Data Sheet (hoja de datos)
- **Style:** cifras expandidas con números tabulares, su unidad a media escala y su rótulo debajo, separadas por filetes. En la calculadora (la primera cifra en azul claro), al pie del hero como hoja de cuatro servicios, y en filas sobre papel en "Quiénes somos".

### Signature: Obras a la vista
Lo primero después del hero son ocho obras propias en un módulo de celdas. Tocar una abre el visor de las 21 fotos en esa misma foto, sin salir de la sección; el botón de abajo vuelve a la grilla.

### Signature: El techo de la calculadora
Treinta lugares en filas de diez; los paneles aparecen de a uno (escala y opacidad) a medida que el vecino escribe su consumo o elige una casa parecida. Los lugares vacíos quedan marcados.

### Signature: ¿Qué sistema va con tu lugar?
En Servicios, cuatro pestañas que parten de lo que le pasa al vecino ("Tengo red y quiero pagar menos", "Se corta seguido", "No llega la red", "Va sobre ruedas"); la elegida se llena de azul claro. El sistema aparece con su nombre del rubro en grande (ON-GRID, HÍBRIDO, OFF-GRID, MÓVIL), el recorrido de la energía en eslabones con conectores, una hoja de datos de tres marcas (usa la red, lleva baterías, anda sin red) y lo que lleva. Al cambiar de pestaña, el panel entra de a una línea.

### Signature: La cuadra que se apaga
En Respaldo, una cuadra de casas hechas de ventanas cuelga del cable de la red, por el que corre la corriente en azul claro. Con "Cortar la luz" (o sola, la primera vez que la escena entra en pantalla) las ventanas de los vecinos, encendidas en ámbar, parpadean y se apagan, cae la noche detrás y tu casa sigue igual: se marca en azul claro y su batería se llena. El estado se anuncia a lectores de pantalla; el cable y la batería solo se animan mientras se ven.

### Signature: La temporada de pileta
En Piscinas, una tira de doce meses por fila (julio a junio, el verano al medio): sin climatizar, colectores solares y bomba de calor. Los meses del verano en azul acero 600 y los que suma cada equipo en azul claro, con la cifra de meses al lado. Al entrar, los meses se llenan desde el verano hacia afuera.

### Signature: De sol a sol
Cinco pasos numerados en celdas azul noche unidas por juntas. El número dice el orden; un sol a la altura de su hora dice el momento del día (el último, la noche, bajo el horizonte). La hora se anuncia solo para lectores de pantalla.

### Signature: Entrada del hero y de las secciones
Cada línea del titular sube desde su renglón y la foto se asienta (de 106% a 100%); cuando llega el último renglón, el sol que hace de O en "SOL" sale desde la línea base, como amanece, y se dibujan las rayas de la hoja. Al bajar, títulos, celdas y filas entran escalonados (components/section-entrance.tsx). Solo transformación y opacidad; con movimiento reducido, todo aparece sin moverse.

## Do's and Don'ts

### Do:
- **Do** alternar azul noche y papel por capítulo y cerrar en el campo azul claro.
- **Do** hacer del botón principal el contraste más fuerte de su fondo.
- **Do** usar el azul claro para lo vivo y el azul hondo cuando tiene que leerse sobre papel.
- **Do** titular con Archivo expandida y leer a ancho normal.
- **Do** separar con filetes de 1px y juntas de 2px, y mostrar las cifras con números tabulares.
- **Do** usar solo fotos de obras propias, con su encuadre por foto (la del hero es la única excepción).
- **Do** animar solo `transform` y `opacity`, y respetar el movimiento reducido.

### Don't:
- **Don't** redondear esquinas.
- **Don't** inventar fotos, precios, contactos, testimonios ni garantías; lo que falta no se muestra.
- **Don't** usar fotos de banco fuera del hero, ni presentarlas como obras; tampoco dibujos de relleno, íconos de adorno ni emojis.
- **Don't** sumar colores por servicio, tintes por hora ni un acento fuera de la escala.
- **Don't** usar blur (`filter: blur`, `backdrop-filter`, `placeholder="blur"`).
- **Don't** poner sombras en celdas, tablas o listas.
- **Don't** sumar una segunda familia tipográfica.
- **Don't** poner una etiqueta o antetítulo encima de un título.
