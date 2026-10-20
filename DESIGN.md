---
name: El Pibe del Aire
description: Paneles y termotanques solares en Buenos Aires, contados con un techo porteño bajo el sol de ahora, en azul noche, papel celeste y un dorado sobrio.
colors:
  ink: "#0e2240"
  ink-2: "#163158"
  paper: "#edf4fa"
  paper-2: "#dde9f4"
  line: "#c5d6e6"
  muted: "#4a5e76"
  on-dark: "#eef4fa"
  on-dark-muted: "#a9bcd3"
  dark-line: "#2a4670"
  sky: "#6fb6e8"
  sky-deep: "#1d6fa8"
  gold: "#e3a53c"
  gold-hover: "#ecb85e"
  error: "#b3261e"
  roof-far: "#12294c"
  roof-near: "#173360"
  roof-house: "#1c3d72"
  night-deep: "#0b1d38"
  field: "#ffffff"
  day-dawn: "#f5ddc9"
  day-morning: "#dcebf6"
  day-noon: "#c9e2f5"
  day-afternoon: "#f3d9ae"
  day-dawn-ink: "#4d4a55"
  day-noon-ink: "#3f5470"
  day-afternoon-ink: "#554a3c"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(min(2.9rem, 12vw), min(5.2vw, 10svh), 5.5rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.02em"
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
  section-close: "128px"
  module-joint: "2px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.gold-hover}"
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
    padding: "0 12px"
    height: "4rem"
  header-cell-cta:
    backgroundColor: "{colors.gold}"
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
  todo:
    backgroundColor: "transparent"
    textColor: "{colors.sky-deep}"
    rounded: "{rounded.none}"
    padding: "0 9.6px"
    height: "1.75rem"
  data-sheet:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.figure}"
    rounded: "{rounded.none}"
    padding: "16px 16px 0 0"
---

# Design System: El Pibe del Aire

## Overview

**Creative North Star: "Plano y Módulo, bajo el cielo de Buenos Aires"**

Es un sitio "Plano y Módulo" para un instalador solo que trabaja en techos porteños. Todo sale del material del rubro: la cabecera es un módulo fotovoltaico con celdas de vidrio azul noche, juntas de 2px y busbars tenues, las secciones se destapan como un panel que se enciende y las cifras van en hojas de datos con filetes. Las fotos reales de Matías (él trabajando y sus techos) llevan el hero, "Quién te instala" y "Trabajos". Lo que no tiene foto se dibuja a escuadra: el corte de una casa con sus piezas y un techo que se llena de módulos a medida que el vecino hace la cuenta. Ninguna esquina es redondeada.

La página alterna azul noche y papel celeste por capítulo y cierra en un campo celeste a pleno, el cielo de día, con el formulario apoyado encima como una hoja de plano. El celeste es el cielo y lo que está vivo: la sección actual, el panel que genera, la luz sobre el vidrio. El dorado es la acción, siempre con texto en azul noche encima. Es un dorado sobrio y no un amarillo: lo pidió el usuario para que se vea "algo más profesional". El sol que aparece en el hero es el de Buenos Aires en este momento, a su altura real.

Una sola familia, Archivo, trabajada con su eje de ancho: expandida (125) y semibold en titulares, como un cartel de obra, y a ancho normal (100) para leer. Lo que falta del cliente se muestra como falta, en un recuadro punteado "A completar", y nunca se inventa. El movimiento usa un ease-out fuerte y anima solo transformación y opacidad. Todo respeta el movimiento reducido.

**Key Characteristics:**
- Azul noche y papel celeste alternados por capítulo; el cierre es un campo celeste a pleno.
- Celeste para el cielo y lo vivo; dorado sobrio solo para la acción, con texto en azul noche.
- Archivo con eje de ancho: 125 en titulares y cifras, 118 en títulos, 100 para leer.
- Cero radio, filetes de 1px y juntas de 2px; módulos con celdas y busbars.
- Fotos reales de Matías, tal como salen del celular, y dibujos de línea a escuadra donde no hay foto.
- Lo que falta se marca "A completar" con borde punteado; nada se inventa.
- Un color por servicio: color con trabajo, nunca de adorno.
- Sin blur; la entrada y el scroll animan solo transformación y opacidad.

## Colors

Azul noche y papel celeste como base, un celeste que da vida, un dorado que decide, un color por servicio y los tintes del día porteño en "Cómo trabajo".

### Primary
- **Dorado Sobrio** (gold): la acción. Botón principal "Pedí una visita", celda de contacto de la cabecera, barra de contacto en celular, pulgar del deslizador, selección de texto, anillo de foco y el ícono del sol en la placa del hero. Sobre él, siempre texto en azul noche (ink). Al pasar el mouse se aclara (gold-hover).

### Secondary
- **Celeste Cielo** (sky): el cielo y lo vivo. Marca y luz de la celda de la sección actual en la cabecera, el sol del logotipo, los filetes de los dibujos sobre azul noche, la primera cifra de la calculadora (paneles) y el fondo entero del capítulo de contacto. También es el destello de la entrada en panel.
- **Celeste Hondo** (sky-deep): el celeste que se lee sobre papel. Texto y borde punteado de "A completar", cursor de los campos, íconos sobre papel y la raya del aviso de deslizar.

### Tertiary
- **Color por servicio** (svc-paneles celeste, svc-termotanque coral, svc-mantenimiento verde, svc-limpieza turquesa, cada uno con su versión honda `-deep` para papel): identifica cada servicio en toda la página. Es la raya de arriba de cada celda de la hoja del hero, el número y los tildes de cada servicio, la pieza que le toca en el corte de la casa (la elegida se llena, el resto queda tenue), el cuadrito de cada fila de precios y el de cada epígrafe de "Trabajos". Se aplica con `data-svc` y las variables `--svc` y `--svc-deep`. Sobre noche y fotos va el claro; sobre papel, el hondo. Nunca es texto corrido.
- **Night-deep**: el fondo de plano del corte de la casa y el lugar vacío de un módulo en la calculadora.
- **El Día Porteño** (day-dawn, day-morning, day-noon, day-afternoon, con sus tintas day-dawn-ink, day-noon-ink y day-afternoon-ink): cada paso de "Cómo trabajo" toma el tinte de su hora, del amanecer al mediodía y la tarde. El último paso es la noche y usa azul noche (ink). La mañana lee su texto en muted. Cada tinta sobre su tinte cumple AA.

### Neutral
- **Azul Noche** (ink): fondo de los capítulos oscuros, del hero y del pie, texto principal sobre papel y sobre celeste, y el color del fondo de la página.
- **Azul Noche Claro** (ink-2): hover de lo oscuro y marco de la barra de contacto en celular.
- **Papel Celeste** (paper) y **Papel Hondo** (paper-2): fondos claros. Paper-2 separa "Preguntas" y es el fondo de la forma de pago y el que asoma mientras carga el retrato. En paper-2, el gris de nota se oscurece un paso (#435670) para mantener AA.
- **Junta** (line) y **Junta Oscura** (dark-line): filetes de 1px sobre papel y sobre azul noche. La junta oscura también es el color que asoma entre las celdas de la grilla de trabajos.
- **Gris Nota** (muted) y **Gris Nota sobre Noche** (on-dark-muted): texto secundario, siempre con contraste AA.
- **Blanco de Campo** (field): el interior de campos y opciones del formulario, para que la hoja de plano se lea como papel para llenar, y las celdas de "Marcas que instalo", para que cada logo vaya en sus colores originales.
- **Colores de las apps** (WhatsApp `#25d366`, el degradé de Instagram): solo en los botones flotantes de la derecha y en los íconos de esos canales en el contacto. Son los únicos colores de afuera de la paleta: están para que la gente los reconozca de lejos.
- **Error** (error): borde del campo inválido y su mensaje.

### Named Rules
**The Gold Acts Rule.** El dorado marca la acción, y nada más que la acción (y el sol, que es el mismo color). Lo elegido de un servicio va en el color de ese servicio, no en dorado. Un fondo de sección, un título o un adorno en dorado es un error. Siempre lleva texto en azul noche.

**The Sky Lives Rule.** El celeste es lo que está vivo o es cielo: la sección actual, lo que genera, lo elegido en el dibujo y el cierre de día. No se usa para decorar.

**The Working Color Rule.** Todo color fuera de azul noche, papel, celeste y dorado tiene un trabajo nombrado (el servicio, la hora del día, la app o la marca que identifica). Si no se puede decir qué identifica, no va.

## Typography

**Display Font:** Archivo, eje de ancho (with system-ui, sans-serif)
**Body Font:** Archivo, eje de ancho (with system-ui, sans-serif)

**Character:** Una sola familia con dos voces. Expandida y semibold es la rotulación de obra. A ancho normal, con un leve espacio entre palabras (0.04em), es la voz en primera persona de Matías, que se lee sin esfuerzo.

### Hierarchy
- **Display** (600, clamp(min(2.9rem, 12vw), min(5.2vw, 10svh), 5.5rem), 0.98; wdth 125): el titular del hero, en dos líneas que no se parten en escritorio.
- **Headline** (600, clamp(2.25rem, 5vw, 4rem), 0.98; wdth 125): el título de cada capítulo, con `text-wrap: balance`. El contacto sube un poco (hasta 4.25rem).
- **Title** (600, 1.25rem, 1.375; wdth 118): títulos de pasos, servicios, celdas de la hoja del hero y respuestas de la ficha.
- **Figure** (600, clamp(1.6rem, 2.5vw, 2.15rem), 1; wdth 125; cifras tabulares): las cuatro cifras de la calculadora, con la unidad a media escala en gris nota.
- **Lead** (400, 1.125rem a 1.25rem, 1.625): bajadas de sección, de 38 a 56ch.
- **Body** (400, 1rem, 1.5): texto corrido y respuestas.
- **Label** (600, 0.875rem): rótulos de campos, de la ficha y de los canales. "A completar" va a 0.8rem con wdth 108.

### Named Rules
**The Width Axis Rule.** La jerarquía sale del eje de ancho y del peso, nunca de otra familia: expandida para ser vista, normal para ser leída.

**The Tabular Figures Rule.** Toda cifra que se compara o cuenta (paneles, kW, ahorro, horas del sol, precios) va con números tabulares.

## Layout

- **Contenedor y márgenes:** contenedor de 88rem centrado, con márgenes de 20px en celular, 32px en tablet y 48px en escritorio. Grilla de 12 columnas en escritorio: el título ocupa 7 columnas y la bajada, 5, alineada abajo con el título.
- **Ritmo y fondos:** los capítulos llevan 80px de padding vertical (112px desde tablet). El contacto, que cierra, lleva 96px y 128px. El orden de fondos es: hero en noche, quién en papel, servicios en noche, calculadora en papel, equipos en 3D en noche, proceso y precios en papel, trabajos en noche, preguntas en papel hondo, contacto en celeste y el pie en noche.
- **Hero:** azul noche a 100svh, con una foto de Matías junto a los paneles a pantalla completa, sin filtros. Encima va un degradé de azul noche del lado del texto. Desde 768px, el degradé va de izquierda a derecha (opaco hasta el 46% y transparente desde el 82%), con un velo arriba y abajo. En celular va de arriba abajo, más claro hacia el pie. El texto ocupa hasta el 62% del ancho y la bajada, 40ch. La placa del sol de ahora va debajo de los botones. La hoja de cuatro servicios va en una franja opaca a todo el ancho, así que la foto termina donde empieza la hoja. El encuadre cambia en celular (`posMobile`) para que Matías siga en cuadro.
- **Equipos en 3D:** tres pestañas-celda unidas por juntas de 2px (la elegida se funde con el escenario y lleva la luz celeste arriba), el escenario en night-deep con el equipo sobre un pedazo de terraza en los azules de techo, y la ficha de partes al costado (abajo en celular). Los puntos numerados son cuadrados: azul noche con filete celeste y en dorado el elegido. three.js baja solo cerca de la sección; sin WebGL queda la ficha.
- **Trabajos:** cinco fotos sin huecos, unidas por juntas de 2px. En escritorio, la primera ocupa un bloque de 2×2 y las otras cuatro van de a dos a su lado. En celular, la primera va arriba y el resto de a dos. Cada foto lleva su epígrafe sobre un degradé azul noche (sin desenfoque), con el cuadrito del color de su servicio, y con mouse se acerca un 3%.
- **Celular:** las pilas de pasos pasan a un carril horizontal (84% de ancho, con snap y la siguiente asomando), las tablas pasan a filas y una barra de contacto fija en dorado aparece abajo, con la columna de WhatsApp e Instagram a su derecha. Los enlaces suman alto de toque con punteros gruesos.

## Elevation & Depth

El sistema es plano. La profundidad sale del tono (papel sobre noche, hoja sobre cielo, techo cercano sobre lejano) y de filetes de 1px. Las sombras quedan solo para lo que flota o se apoya.

### Shadow Vocabulary
- **Módulo flotante** (`box-shadow: 0 10px 30px rgb(6 16 32 / 0.2)`; sólido al bajar: `0 12px 34px rgb(6 16 32 / 0.32)`): la cabecera.
- **Hoja de plano** (`box-shadow: 0 1px 0 rgb(6 16 32 / 0.06), 0 18px 40px -16px rgb(6 16 32 / 0.35)`): el formulario apoyado sobre el campo celeste del cierre. Es una sombra corta y difusa, no un desplazamiento duro.
- **Barra flotante** (`box-shadow: 0 10px 30px -8px rgb(6 16 32 / 0.45)`): la barra de contacto en celular y la columna de WhatsApp e Instagram (cuadrados de 3.5rem, abajo a la derecha). Aparecen al dejar el hero y se corren en el contacto.

### Named Rules
**The No Blur Rule.** Nada se desenfoca: ni `filter: blur` ni `backdrop-filter`. Lo que flota usa un fondo más denso (el vidrio de la cabecera, el velo del menú al 90%).

**The Flat Sheet Rule.** Las tarjetas, las cifras, las tablas y las listas no llevan sombra. Si algo necesita separarse, va un filete, una junta o un cambio de tono.

## Shapes

- **Radio:** cero en todo, sin excepciones, también en el pulgar del deslizador y en el número de servicio.
- **Juntas:** los módulos se arman con juntas de 2px (cabecera, trabajos, pasos del día) en las que el fondo asoma entre celdas, y de 3px en el techo de la calculadora.
- **Celdas de panel:** el vidrio lleva busbars de medio píxel. Las fotos van sin retoque ni filtros, con filete de 1px; el encuadre se corre por foto (`pos` en lib/pibe.ts) cuando la celda las recorta.
- **Círculos:** el único círculo es el sol (en el logotipo, en el hero y en cada paso del día). Las marcas e indicadores son cuadrados.
- **Dibujos:** son de línea a escuadra con uniones en inglete y trazo de 2px. Los cables y caños van punteados (6 5) y el arco del sol, en puntos (3 9).

## Components

### Buttons
- **Shape:** a escuadra (0px), de 52px de alto y 24px de padding lateral. Label semibold con wdth 110. La flecha avanza 4px al pasar el mouse y el botón se achica a 0.97 al presionar. En teléfonos el rótulo puede partir en dos renglones, alineado a la izquierda y con la flecha a la derecha.
- **Primary:** dorado con texto en azul noche: "Pedí una visita" y "Abrir WhatsApp".
- **Ink:** azul noche con texto claro, sobre papel (enviar el formulario); al pasar el mouse pasa a ink-2.
- **Line:** borde de 1px del color del texto; al pasar el mouse toma un tinte del 10%.
- **Focus:** anillo dorado de 2px, desplazado 3px. Sobre celeste y en campos el anillo es azul noche.
- **Link:** subrayado de 1px al 35% y desplazado 5px, que al pasar el mouse toma dorado sobre noche y el color del texto sobre papel o celeste.

### Navigation (el módulo)
- **Style:** una barra fija y flotante que es un módulo fotovoltaico: marco translúcido, celdas de vidrio azul noche al 78% (96% al bajar), sin desenfoque y con tres busbars por celda.
- **States:** la celda de la sección actual genera: aparece un cuadrado celeste de 7px y una luz celeste sube del borde. Al pasar el mouse, un reflejo de sol cruza el vidrio en diagonal. El contacto es la celda dorada.
- **Mobile:** menú en grilla de dos columnas con celdas grandes (wdth 118) y un velo azul noche al 90%.

### Inputs / Fields
- **Style:** fondo blanco, borde de 1px (line), cursor celeste hondo y radio cero, sobre la hoja de papel.
- **Focus:** contorno azul noche de 2px.
- **Error:** borde en error, con el mensaje enlazado al campo.
- **Opciones:** se eligen con botones a escuadra de 48px de alto. La elegida se llena de azul noche. Lo que trae la calculadora destella dorado una vez en el campo.

### "A completar" (lugar pendiente)
- **Style:** un recuadro punteado de 1px en celeste hondo, con un tinte celeste del 12%, un lápiz de 14px y el texto de lo que falta ("Foto a cargar", "Precio", "Confirmar"). Sobre noche va en celeste y sobre el cielo, en azul noche.
- **Rule:** es un componente deliberado: el material que el cliente no entregó se muestra como pendiente y nunca se inventa. Cuando llega el dato real, el lugar desaparece.

### Data Sheet (hoja de datos)
- **Style:** cifras expandidas con números tabulares, su unidad a media escala y su rótulo debajo, separadas por filetes. Aparece en la calculadora (la primera cifra en celeste) y, como hoja de cuatro servicios con flecha dorada, al pie del hero. La ficha de Matías es la versión en filas sobre papel.

### Signature: Matías y sus paneles, con el sol de ahora
El hero es una foto real de Matías con el pulgar arriba junto a sus paneles, a pantalla completa y sin retoque. El titular se lee sobre un degradé de azul noche que deja la foto limpia del lado de él. Debajo de los botones, una placa muestra el sol de Buenos Aires en este momento: su altura y la salida y la puesta de hoy, en números tabulares (sun-now.tsx).

### Signature: El techo de la calculadora
Un módulo por panel, en filas de diez, que aparecen de a uno (escala y opacidad). Los lugares vacíos quedan punteados, y las cifras se arman con la factura del vecino.

### Signature: De sol a sol
Cinco pasos como las horas de un día, cada uno con el tinte de su hora y un sol a su altura. No llevan rótulo de hora visible: la hora la dicen el tinte y el sol, y se anuncia solo para lectores de pantalla.

### Signature: Intro y entrada en panel
Un módulo de celdas azul noche tapa la pantalla, el logotipo aparece con una barra dorada que carga y las celdas se retiran, en menos de 2 s. Cada sección sin entrada propia arranca tapada por celdas de su color, que la luz celeste barre. Todo anima solo con transformación y opacidad.

### Signature: Entrada del hero
En cada visita, después de la intro (o enseguida, si ya se vio en la sesión), cada línea del titular sube desde su renglón y la foto aparece y se asienta (de 106% a 100% de escala). Después sube la placa del sol y se dibujan las rayas de color de los servicios. Es una entrada serena, de transformación y opacidad. Con movimiento reducido, todo aparece solo con un fundido de opacidad.

## Do's and Don'ts

### Do:
- **Do** alternar azul noche y papel celeste por capítulo, y cerrar en el campo celeste del día.
- **Do** usar el dorado solo en la acción, con texto en azul noche encima.
- **Do** usar el celeste para lo vivo y el cielo, y el celeste hondo cuando tiene que leerse sobre papel.
- **Do** titular con Archivo expandida (wdth 125, semibold, tracking -0.02em) y leer a ancho normal.
- **Do** separar con filetes de 1px y juntas de 2px, y mostrar las cifras en hojas de datos con números tabulares.
- **Do** dibujar a escuadra lo que no tiene foto, y marcar como "A completar" lo que el cliente todavía no dio.
- **Do** animar solo `transform` y `opacity` en lo que se mueve al cargar o con el scroll, y respetar el movimiento reducido.
- **Do** en celular, pasar las pilas a carriles al 84% de ancho y dar alto de toque a los enlaces.

### Don't:
- **Don't** redondear esquinas, en ningún componente.
- **Don't** inventar fotos, precios, contactos ni testimonios; lo que falta va en "A completar".
- **Don't** usar fotos de stock, íconos de adorno ni emojis en lugar de íconos.
- **Don't** volver al amarillo: la acción es el dorado sobrio.
- **Don't** llenar fondos o títulos de dorado, ni usar degradés en el texto.
- **Don't** usar blur (`filter: blur` o `backdrop-filter`).
- **Don't** poner sombras en tarjetas, tablas o listas; la profundidad es tonal.
- **Don't** sumar una segunda familia tipográfica.
- **Don't** armar la página con tres tarjetas iguales de ícono, título y texto.
- **Don't** poner una etiqueta o antetítulo encima de un título, ni rótulos de hora visibles en los pasos del día.
