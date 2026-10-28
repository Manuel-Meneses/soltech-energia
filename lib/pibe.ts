/**
 * Soltech Energía: empresa de energía solar para casas y empresas.
 * Lo confirmado (octubre 2026): nombre, quien está al frente (Matías Moreira), servicios
 * (sistemas fotovoltaicos on-grid, híbridos, off-grid y móviles, que diseña, vende e instala;
 * sistemas de respaldo con batería e inversor sin paneles, climatización de piscinas con bomba
 * de calor o con colectores solares, mantenimiento y limpieza) y zona (todo el país, con base en la Provincia de Buenos Aires). Los
 * termotanques solares también los instala, pero el cliente los quiere en segundo plano:
 * se nombran al pie de Servicios y en Preguntas, no se muestran como servicio.
 * Todo lo que vale `null` falta cargar: el sitio no lo muestra y no inventa nada en su lugar.
 * No hay precios (el cliente no los publica), testimonios, garantía ni cifras de obras.
 */

export const pibe = {
  name: "Soltech Energía",
  zone: "Provincia de Buenos Aires",
  description:
    "Soltech Energía diseña, vende e instala sistemas fotovoltaicos a medida (conectados a la red, híbridos con baterías, aislados y móviles) en todo el país, con base en la Provincia de Buenos Aires. También respaldo con baterías para los cortes y climatización de piscinas.",
  /**
   * Quien está al frente, solo como dato: el sitio no lo muestra. El cliente quiere que se lea como
   * una empresa, no como una persona, así que la marca va adelante y habla en plural.
   */
  owner: "Matías Moreira",
  /** Solo dígitos, con código de país (549 + área + número). Sin número, WhatsApp abre el mensaje para elegir a quién mandarlo. */
  whatsapp: "5491161875709" as string | null,
  /** El mismo número, como se lee. */
  whatsappShown: "+54 9 11 6187-5709" as string | null,
  /** Usuario de Instagram, sin @. */
  instagram: "matias.soltech" as string | null,
  /** Teléfono para llamar, solo dígitos con código de país. Con número aparece "Llamar" en el contacto y el pie. */
  phone: null as string | null,
  /** El mismo teléfono, como se lee. */
  phoneShown: null as string | null,
  /** Mail general. Aparece en el contacto y el pie. */
  email: "info@soltech-energia.com" as string | null,
  /** Mail de ventas. Aparece en el contacto y el pie, y el formulario manda la consulta por acá. */
  salesEmail: "ventas@soltech-energia.com" as string | null,
  /**
   * Dirección del sitio publicado, con https y sin barra final (ej.: "https://soltechenergia.com.ar").
   * Con dominio, Google indexa el sitio, se arma el sitemap y las vistas previas al compartir usan la
   * dirección real. Sin dominio, el sitio queda como vista previa: no se indexa.
   */
  domain: "https://soltech-energia.com" as string | null,
  license: "Electricista matriculado" as string | null,
  experience: "Más de 8 años" as string | null,
  /** Base en Provincia de Buenos Aires; llega a cualquier punto del país. */
  coverage: "Todo el país, con base en la Provincia de Buenos Aires",
} as const;

/** Enlace de WhatsApp con el mensaje cargado; sin número, wa.me deja elegir el contacto. */
export function waLink(text?: string) {
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${pibe.whatsapp ?? ""}${q}`;
}

/** Enlace de mail a `to` con el asunto y el mensaje cargados; sin dirección no hay enlace. */
export function mailLink(to: string | null, subject?: string, body?: string) {
  if (!to) return null;
  const q = [subject && `subject=${encodeURIComponent(subject)}`, body && `body=${encodeURIComponent(body.replace(/\n/g, "\r\n"))}`]
    .filter(Boolean)
    .join("&");
  return `mailto:${to}${q ? `?${q}` : ""}`;
}

export const pibeCta = { label: "Pedí una visita", href: "#contacto" } as const;

/** Enlace para llamar; sin teléfono cargado no hay enlace. */
export const telLink = pibe.phone ? `tel:+${pibe.phone}` : null;

export const pibeLinks = [
  { label: "Trabajos", href: "#trabajos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Calculadora", href: "#calculadora" },
  { label: "Cómo trabajamos", href: "#como-trabajo" },
  { label: "Empresas", href: "#empresas" },
  { label: "Preguntas", href: "#preguntas" },
];

/** Lugar de referencia de la calculadora (horas de sol). */
export const sunSite = { name: "Buenos Aires" } as const;

export type ServiceId = "paneles" | "respaldo" | "piscinas" | "mantenimiento" | "limpieza";

/**
 * Los cinco servicios, en la grilla de components/pibe/services.tsx. Todas las fotos son de obras
 * propias (public/pibe/trabajos/); `pos` es su encuadre en la celda. `more` lleva a la sección
 * propia del servicio (respaldo y piscinas): la hoja del hero salta ahí en vez de a la celda.
 */
export const services: {
  id: ServiceId;
  title: string;
  short: string;
  body: string;
  details: string[];
  ask: string;
  photo: { src: string; alt: string; pos: string };
  more?: { label: string; href: string };
}[] = [
  {
    id: "paneles",
    title: "Paneles solares",
    short: "Casa, campo o ruta",
    body: "Paneles en el techo o la terraza, conectados a tu instalación. De día la casa, el local o la planta usa la energía del sol y le pide menos a la red.",
    details: ["Casas, PH y terrazas", "Comercios, galpones e industrias", "Inversor y tablero"],
    ask: "Quiero consultar por paneles solares.",
    photo: {
      src: "/pibe/trabajos/foto_14.jpeg",
      alt: "Vista aérea de una terraza en la ciudad con tres filas de paneles.",
      pos: "50% 55%",
    },
    more: { label: "Elegí tu sistema", href: "#sistemas" },
  },
  {
    id: "respaldo",
    title: "Sistemas de respaldo",
    short: "Luz en los cortes",
    body: "Un inversor y una batería, sin paneles. Cuando se corta la luz, la casa o el local sigue andando con la batería; cuando vuelve, la batería se carga de la red.",
    details: ["Inversor y batería", "No hacen falta paneles", "Paneles después, si querés"],
    ask: "Quiero consultar por un sistema de respaldo con batería para los cortes de luz.",
    photo: {
      src: "/pibe/trabajos/foto_8.jpeg",
      alt: "Sala con piso de ladrillo, un inversor, un rack de baterías y cajas de protecciones en la pared.",
      pos: "50% 52%",
    },
    more: { label: "Mirá cómo funciona", href: "#respaldo" },
  },
  {
    id: "piscinas",
    title: "Climatización de piscinas",
    short: "Bomba de calor o solar",
    body: "Templamos el agua de la pileta sin gas, para que la uses más meses del año: con una bomba de calor, que calienta con cualquier clima, o con colectores solares, que usan el sol.",
    details: ["Bomba de calor", "Colectores solares", "Casas y clubes"],
    ask: "Quiero consultar por climatización de piscinas.",
    photo: {
      src: "/pibe/trabajos/foto_30.jpeg",
      alt: "Casa con pileta y una fila de paneles sobre el techo de tejas negras.",
      pos: "50% 72%",
    },
    more: { label: "Bomba de calor o solar", href: "#piscinas" },
  },
  {
    id: "mantenimiento",
    title: "Mantenimiento",
    short: "Que siga rindiendo",
    body: "Revisamos paneles, conexiones, inversor y tablero para que el equipo rinda lo que tiene que rendir.",
    details: ["Revisión de conexiones", "Control del inversor", "Equipos de pileta"],
    ask: "Quiero consultar por mantenimiento de mi equipo solar.",
    photo: {
      src: "/pibe/trabajos/foto_9.jpeg",
      alt: "Técnico conectando tres inversores azules montados en una pared blanca.",
      pos: "50% 42%",
    },
  },
  {
    id: "limpieza",
    title: "Limpieza de paneles",
    short: "Polvo, hollín y hojas",
    body: "Los paneles juntan polvo, tierra, hollín y hojas, y un panel sucio genera menos. Los limpiamos y te contamos cómo están.",
    details: ["Techos, terrazas y campo", "Vidrio, marco y bordes", "Revisión de cada panel"],
    ask: "Quiero consultar por limpieza de paneles.",
    photo: {
      src: "/pibe/trabajos/foto_10.jpeg",
      alt: "Larga fila de paneles sobre una terraza blanca, con árboles y cielo nublado de fondo.",
      pos: "50% 72%",
    },
  },
];

/** Cómo trabajamos, del primer mensaje a la vuelta. Cada paso toma una hora del día. */
export const steps = [
  {
    title: "Nos escribís",
    body: "Por WhatsApp, con una foto de tu factura de luz y, si podés, una del techo. Con eso ya nos hacemos una idea.",
    hour: "Amanecer",
  },
  {
    title: "Vamos a ver tu techo",
    body: "Medimos el lugar, miramos hacia dónde da, qué sombras tiene y cómo está la instalación eléctrica.",
    hour: "Mañana",
  },
  {
    title: "Te pasamos el presupuesto",
    body: "Con el equipo que va y la cantidad de paneles, o lo que necesita la pileta.",
    hour: "Mediodía",
  },
  {
    title: "Instalamos",
    body: "Montamos, conectamos y probamos. Antes de irnos te mostramos cómo funciona y qué mirar para saber que anda bien.",
    hour: "Tarde",
  },
  {
    title: "Volvemos",
    body: "Para el mantenimiento y la limpieza. Si algo no anda, nos escribís y lo resolvemos.",
    hour: "Noche",
  },
] as const;

/**
 * La foto del hero, a pantalla completa: paneles sobre el techo de un galpón al atardecer, con el sol a la derecha
 * (lejos del titular). No es una obra propia: es de Nuno Marques en Unsplash (unsplash.com/photos/0GbrjL3vZF4,
 * licencia Unsplash, uso comercial libre), espejada; por eso vive fuera de trabajos/ y no entra en la grilla de obras.
 * `pos` es el encuadre en escritorio y `posMobile` en celular, donde la pantalla angosta recorta los costados.
 */
export const heroPhoto = {
  src: "/pibe/hero-atardecer.jpg",
  alt: "Paneles solares sobre el techo de chapa de un galpón al atardecer, con el sol bajo sobre el horizonte.",
  pos: "50% 50%",
  posMobile: "97% 50%",
} as const;

/** Una obra en curso: va en "Quiénes somos". La leyenda nombra a la empresa, no a quien instala. */
export const portrait = {
  src: "/pibe/matias.jpg",
  alt: "Instalador conectando la caja de protecciones debajo de un inversor, en la pared de una casa.",
} as const;

/**
 * Fichas de las fotos de trabajos. El visor de "Ver todas las fotos" (components/pibe/works-reel.tsx)
 * muestra TODAS las fotos que haya en public/pibe/trabajos/, ordenadas por el número del nombre
 * (foto_1, foto_2…): alcanza con soltar el archivo ahí. Una foto con ficha lleva su leyenda (`what`)
 * y su `alt`; una sin ficha sale con una leyenda genérica. `place` es la localidad: cuando se
 * carga, se suma a la leyenda.
 */
export const works: { src: string; what: string; place: string | null; alt: string }[] = [
  {
    src: "/pibe/trabajos/foto_1.jpeg",
    what: "Tres filas de paneles en el campo, vistas desde el drone",
    place: null,
    alt: "Vista aérea de una casa en el monte con tres filas de paneles solares sobre el pasto y uno sobre el techo de chapa.",
  },
  {
    src: "/pibe/trabajos/fot_3.jpeg",
    what: "Paneles sobre el techo de chapa de un galpón",
    place: null,
    alt: "Fila de paneles sobre un techo de chapa a dos aguas, con un tanque de agua y árboles alrededor.",
  },
  {
    src: "/pibe/trabajos/fot_4.jpeg",
    what: "Pileta en el jardín de una casa",
    place: null,
    alt: "Pileta en el jardín de una casa, con un equipo instalado al costado y agua de fondo.",
  },
  {
    src: "/pibe/trabajos/foto_4.jpeg",
    what: "Tablero de protecciones armado en obra",
    place: null,
    alt: "Tablero de protecciones abierto en plena obra, junto a una caja de herramientas.",
  },
  {
    src: "/pibe/trabajos/foto_5.jpeg",
    what: "En el campo, entre filas de paneles",
    place: null,
    alt: "Instalador con casco y anteojos de sol, delante de filas de paneles sobre el pasto.",
  },
  {
    src: "/pibe/trabajos/foto_6.jpeg",
    what: "Con arnés, sobre un techo de paneles",
    place: null,
    alt: "Instalador con arnés amarillo sobre un techo cubierto de paneles.",
  },
  {
    src: "/pibe/trabajos/foto_7.jpeg",
    what: "Inversor y baterías en la sala técnica de una casa",
    place: null,
    alt: "Inversor blanco junto a un rack de baterías, en la sala técnica de una casa.",
  },
  {
    src: "/pibe/trabajos/foto_8.jpeg",
    what: "Sala técnica con inversor, baterías y tablero",
    place: null,
    alt: "Sala con piso de ladrillo, un inversor, un rack de baterías y cajas de protecciones en la pared.",
  },
  {
    src: "/pibe/trabajos/foto_9.jpeg",
    what: "Conexión de tres inversores en la pared",
    place: null,
    alt: "Técnico conectando tres inversores azules montados en una pared blanca.",
  },
  {
    src: "/pibe/trabajos/foto_10.jpeg",
    what: "Una larga fila de paneles en una terraza",
    place: null,
    alt: "Larga fila de paneles sobre una terraza blanca, con árboles y cielo nublado de fondo.",
  },
  {
    src: "/pibe/trabajos/fot_15.jpg",
    what: "Paneles sobre tejas, en una casa con pileta",
    place: null,
    alt: "Casa con pileta y una fila de paneles sobre el techo de tejas negras.",
  },
  {
    src: "/pibe/trabajos/foto_11.jpeg",
    what: "Paneles sobre chapa negra, en una casa de campo",
    place: null,
    alt: "Paneles sobre un techo de chapa negra, con campo y casas a lo lejos.",
  },
  {
    src: "/pibe/trabajos/foto_12.jpeg",
    what: "Inversor y protecciones en una oficina",
    place: null,
    alt: "Vista desde arriba de una oficina con un inversor y cajas de protecciones en la pared.",
  },
  {
    src: "/pibe/trabajos/foto_13.jpeg",
    what: "Paneles sobre el techo de un local, en la ciudad",
    place: null,
    alt: "Paneles sobre el techo de chapa de un local, con la calle y autos abajo.",
  },
  {
    src: "/pibe/trabajos/foto_14.jpeg",
    what: "Tres filas de paneles en una terraza, vistas desde el drone",
    place: null,
    alt: "Vista aérea de una terraza en la ciudad con tres filas de paneles.",
  },
  {
    src: "/pibe/trabajos/foto_16.jpg",
    what: "Techo de paneles para un estacionamiento",
    place: null,
    alt: "Estructura azul con un techo de paneles que da sombra a una fila de autos estacionados.",
  },
  {
    src: "/pibe/trabajos/foto_17.jpg",
    what: "Paneles sobre bases de hormigón, en el pasto",
    place: null,
    alt: "Instalador con casco, con el pulgar arriba, junto a una fila de paneles solares apoyados sobre bases de hormigón en el pasto.",
  },
  {
    src: "/pibe/trabajos/foto_18.jpg",
    what: "Paneles y termotanques solares en una terraza",
    place: null,
    alt: "Vista desde arriba de una terraza con colectores de tubos para agua caliente y una larga fila de paneles.",
  },
  {
    src: "/pibe/trabajos/foto_19.jpg",
    what: "Paneles en el techo de un galpón de colectivos",
    place: null,
    alt: "Instalador con casco y arnés sobre un techo de chapa cubierto de paneles, con colectivos estacionados abajo.",
  },
  {
    src: "/pibe/trabajos/foto_20.jpg",
    what: "Paneles sobre chapa, en una casa",
    place: null,
    alt: "Fila de paneles sobre un techo de chapa, con casas y árboles alrededor y el cielo nublado.",
  },
  {
    src: "/pibe/trabajos/foto_21.jpg",
    what: "Conexión de protecciones bajo un inversor",
    place: null,
    alt: "Instalador conectando la caja de protecciones debajo de un inversor, en la pared de una casa.",
  },
];

/**
 * Las obras de la grilla de Trabajos, en su orden: la primera va grande y la última, ancha.
 * `pos` es el encuadre en su celda; leyenda y alt salen de `works`.
 */
export const featuredWorks: { src: string; pos?: string }[] = [
  { src: "/pibe/trabajos/foto_19.jpg", pos: "50% 58%" },
  { src: "/pibe/trabajos/foto_20.jpg", pos: "50% 60%" },
  { src: "/pibe/trabajos/foto_18.jpg" },
  { src: "/pibe/trabajos/foto_17.jpg", pos: "45% 60%" },
  { src: "/pibe/trabajos/foto_8.jpeg", pos: "50% 55%" },
  { src: "/pibe/trabajos/fot_3.jpeg", pos: "50% 62%" },
  { src: "/pibe/trabajos/foto_11.jpeg", pos: "50% 60%" },
  { src: "/pibe/trabajos/foto_1.jpeg", pos: "50% 62%" },
];

/** La foto de "Para empresas": el techo de paneles de un estacionamiento. */
export const businessPhoto = {
  src: "/pibe/trabajos/foto_16.jpg",
  alt: "Estructura azul con un techo de paneles que da sombra a una fila de autos estacionados.",
  pos: "50% 50%",
} as const;

/**
 * Para empresas: lo que cambia cuando el techo es de un comercio, un galpón o una industria.
 * Son generalidades del rubro, sin cifras ni promesas de ahorro.
 */
export const business = [
  {
    title: "Estudio de consumo",
    body: "Miramos las facturas de los últimos meses y en qué horario consume la empresa, para dimensionar el equipo a lo que usa de día.",
  },
  {
    title: "Techos grandes y estructuras",
    body: "Chapa de galpón, losa o estructuras nuevas, como un techo de paneles para el estacionamiento que además da sombra.",
  },
  {
    title: "Conexión a la red",
    body: "Equipos conectados a la red bajo la Ley 27.424 de generación distribuida o el régimen de cada provincia. El trámite depende de cada distribuidora.",
  },
  {
    title: "Mantenimiento programado",
    body: "Revisión y limpieza con fecha, para que el equipo no pierda rendimiento sin que nadie lo note.",
  },
] as const;

/** Preguntas de quien no es técnico. Las respuestas son generales del rubro, sin precios ni promesas de ahorro. */
export const faqs = [
  {
    q: "¿Cuánto sale?",
    a: "Depende de cuánta energía usás, de cómo es el techo y del equipo que haga falta, por eso no hay un precio de lista. Con una foto de tu factura y del techo ya podemos orientarte, y después de ver el lugar te pasamos el presupuesto con el equipo y la cantidad de paneles.",
  },
  {
    q: "¿Mi techo sirve?",
    a: "En Buenos Aires lo ideal es que los paneles miren al norte y no les den sombra edificios, árboles ni tanques durante el mediodía. Sirven la losa, la chapa y la teja. Lo confirmamos cuando vamos a verlo.",
  },
  {
    q: "¿Qué me instalan?",
    a: "Los paneles, que pasan la luz del sol a electricidad; el inversor, que la convierte en la que usa la casa o la empresa y muestra cuánto se genera; la estructura, que sostiene los paneles con la inclinación justa sobre chapa, teja, losa o el suelo, y un tablero con las protecciones. Si querés tener luz durante los cortes, se suman baterías.",
  },
  {
    q: "¿Funcionan si está nublado?",
    a: "Sí, pero generan menos. Un panel rinde según la luz que recibe: al mediodía de un día de sol, mucho; en un día gris, una parte. Por eso la cuenta se hace con el promedio del año.",
  },
  {
    q: "¿Qué pasa si se corta la luz?",
    a: "Un equipo de paneles conectado a la red se apaga en el corte, por seguridad de quienes trabajan en la línea. Para tener luz durante un corte hacen falta baterías. Y no hace falta tener paneles: un sistema de respaldo, con un inversor y una batería que se cargan de la red, mantiene andando lo que conectes.",
  },
  {
    q: "¿Puedo inyectar a la red lo que no uso?",
    a: "Sí, con la Ley 27.424 de generación distribuida, a la que adhiere la Provincia de Buenos Aires, o con el régimen de tu provincia: conectás el equipo a la red y te reconocen lo que inyectás. Las condiciones y el trámite dependen de tu provincia y tu distribuidora.",
  },
  {
    q: "¿Cada cuánto hay que limpiar los paneles?",
    a: "Depende del polvo, el hollín y los árboles de la zona. En la ciudad, revisarlos y limpiarlos un par de veces por año suele alcanzar. Si ves que el equipo genera menos que antes, es momento de mirarlos.",
  },
  {
    q: "¿Bomba de calor o colectores solares?",
    a: "La bomba de calor calienta con cualquier clima y de noche, y gasta electricidad. Los colectores solares no gastan para calentar, pero necesitan sol y un lugar donde ponerlos. Depende de cuándo usás la pileta y del lugar que tengas: lo vemos en la visita.",
  },
  {
    q: "¿La pileta se puede usar en invierno?",
    a: "Una bomba de calor alarga mucho la temporada; los colectores solares templan el agua en primavera y otoño. En pleno invierno una pileta descubierta pierde mucho calor, así que lo vemos caso por caso. Con cualquiera de los dos, una cobertura térmica ayuda a que no pierda de noche el calor que juntó de día.",
  },
  {
    q: "¿Instalan termotanques solares?",
    a: "Sí. Si querés agua caliente con el sol para la casa, contanos cuántos viven y te decimos qué equipo va.",
  },
  {
    q: "¿Hasta dónde van?",
    a: "A todo el país. Tenemos base en la Provincia de Buenos Aires y llegamos a cualquier punto de Argentina: contanos dónde es y lo organizamos.",
  },
];

/** Supuestos de la calculadora, a la vista en la página. */
export const calc = {
  /** Horas de sol pico promedio por día en Buenos Aires, a lo largo del año. */
  sunHours: 4.5,
  /** Rendimiento del sistema: pérdidas por temperatura, cableado e inversor. */
  performance: 0.8,
  /** Panel de referencia. */
  panelW: 550,
  /** Superficie de un panel de referencia, en m². */
  panelM2: 2.6,
  /**
   * Precio del kWh con impuestos, en pesos. Referencia: cargo variable residencial de Edenor y
   * Edesur de octubre de 2026 (~$159 sin impuestos) más IVA y tasas. Actualizar cuando cambie el
   * cuadro tarifario.
   */
  kwhPrice: 200,
  /** Cargo fijo mensual con impuestos, en pesos: no baja con los paneles. */
  fixedCharge: 2300,
  /** Mes del cuadro tarifario de referencia, para la nota al pie. */
  priceAsOf: "octubre de 2026",
  /** Vida útil de los paneles, en años: el ahorro acumulado se cuenta sobre este plazo. */
  lifeYears: 25,
} as const;

export type SystemId = "ongrid" | "hibrido" | "offgrid" | "movil";

/**
 * Los cuatro sistemas fotovoltaicos que diseña, vende e instala Soltech (confirmados por el
 * cliente, 27 oct. 2026), en el selector de components/pibe/systems.tsx. `need` es cómo lo dice
 * quien no es técnico; `name`, cómo se llama en el rubro. `chain` es el recorrido de la energía,
 * `kit` lo que lleva, y `traits` las tres marcas que los distinguen en la hoja de datos.
 */
export const systems: {
  id: SystemId;
  need: string;
  name: string;
  tag: string;
  body: string;
  chain: string[];
  kit: string[];
  traits: { red: boolean; baterias: boolean; sinRed: boolean };
  ask: string;
  more?: { label: string; href: string };
}[] = [
  {
    id: "ongrid",
    need: "Tengo red y quiero pagar menos",
    name: "On-grid",
    tag: "Conectado a la red",
    body: "Generás tu propia energía y le pedís menos a la red: de día, la casa o la empresa usa primero la del sol. Lo que no usás se puede inyectar a la red con la ley de generación distribuida (la 27.424 o la de tu provincia).",
    chain: ["Sol", "Paneles", "Inversor", "Casa y red"],
    kit: ["Paneles", "Inversor on-grid", "Estructura", "Tablero de protecciones"],
    traits: { red: true, baterias: false, sinRed: false },
    ask: "Quiero consultar por un sistema on-grid, conectado a la red, para pagar menos luz.",
  },
  {
    id: "hibrido",
    need: "Tengo red, pero se corta seguido",
    name: "Híbrido",
    tag: "Ahorro y respaldo",
    body: "Ahorrás como con un on-grid y además tenés baterías: cuando se corta la luz, la casa sigue andando. De día el sol carga las baterías, y si falta, las carga la red.",
    chain: ["Sol", "Paneles", "Inversor", "Baterías y casa"],
    kit: ["Paneles", "Inversor híbrido", "Baterías", "Tablero de protecciones"],
    traits: { red: true, baterias: true, sinRed: true },
    ask: "Quiero consultar por un sistema híbrido, con baterías para los cortes de luz.",
    more: { label: "¿Solo baterías, sin paneles?", href: "#respaldo" },
  },
  {
    id: "offgrid",
    need: "No llega la red: campo, quinta o lugar aislado",
    name: "Off-grid",
    tag: "Autonomía total",
    body: "Donde no hay red, el sistema es la red: los paneles cargan las baterías de día y la casa usa esa energía a toda hora. Se dimensiona con cuidado, porque no hay una red de reserva.",
    chain: ["Sol", "Paneles", "Inversor y baterías", "Casa"],
    kit: ["Paneles", "Inversor off-grid", "Baterías", "Estructura"],
    traits: { red: false, baterias: true, sinRed: true },
    ask: "Quiero consultar por un sistema off-grid, para un lugar sin red.",
  },
  {
    id: "movil",
    need: "Va sobre ruedas: casa rodante, motorhome o vehículo",
    name: "Móvil",
    tag: "Energía en la ruta",
    body: "Paneles en el techo del vehículo y una batería, para tener energía en la ruta o donde estaciones: luces, heladera y cargar el celular, sin depender de un enchufe.",
    chain: ["Sol", "Panel", "Regulador y batería", "Vehículo"],
    kit: ["Paneles para techo", "Regulador de carga", "Batería", "Inversor, si necesitás 220 V"],
    traits: { red: false, baterias: true, sinRed: true },
    ask: "Quiero consultar por un sistema solar para una casa rodante, motorhome o vehículo.",
  },
];

/** Lo que dice cada marca de la hoja de datos de un sistema. */
export const systemTraits = [
  { key: "red", label: "Usa la red" },
  { key: "baterias", label: "Lleva baterías" },
  { key: "sinRed", label: "Anda sin red" },
] as const;

/**
 * Sistemas de respaldo (components/pibe/backup.tsx): inversor y batería, sin paneles. Lo que
 * sigue andando depende de lo que se conecte y de la batería: no se promete una duración.
 */
export const backup = {
  photo: {
    src: "/pibe/trabajos/foto_7.jpeg",
    alt: "Inversor blanco junto a un rack de baterías, en la sala técnica de una casa.",
    caption: "Inversor y baterías en la sala técnica de una casa. Obra nuestra.",
  },
  /** Lo que suele conectarse al respaldo. */
  keeps: ["Heladera", "Luces", "Wifi", "Bomba de agua", "Alarma"],
  facts: [
    {
      title: "No hacen falta paneles",
      body: "Es un equipo aparte: sirve aunque no tengas lugar en el techo, o para empezar por ahí.",
    },
    {
      title: "Vos elegís qué sigue andando",
      body: "Conectamos al respaldo los circuitos que importan. Cuánto dura depende de la batería y de lo que tengas conectado.",
    },
    {
      title: "Paneles cuando quieras",
      body: "Con un inversor híbrido, más adelante sumás paneles y la batería también se carga con el sol.",
    },
  ],
  ask: "Quiero consultar por un sistema de respaldo con batería para los cortes de luz.",
} as const;

/**
 * Climatización de piscinas (components/pibe/pools.tsx). Los meses van de julio a junio, para que
 * el verano quede en el medio. Las temporadas son orientativas, para una pileta descubierta en
 * Buenos Aires con cobertura térmica de noche: el cliente puede corregirlas acá.
 */
export const poolMonths = ["Jul", "Ago", "Sep", "Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr", "May", "Jun"];
export const poolMonthNames = [
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
];

/** Cada temporada, como índices de `poolMonths` (desde y hasta, inclusive). La primera es la base. */
export const poolSeasons = [
  { id: "sin", label: "Sin climatizar", from: 5, to: 8 },
  { id: "solar", label: "Colectores solares", from: 3, to: 9 },
  { id: "bomba", label: "Bomba de calor", from: 2, to: 10 },
] as const;

/** La foto de la sección: la bomba de calor de una obra, al costado de la pileta. */
export const poolPhoto = {
  src: "/pibe/trabajos/fot_4.jpeg",
  alt: "Pileta en el jardín de una casa, con una bomba de calor instalada al costado.",
  caption: "Bomba de calor junto a una pileta. Obra nuestra.",
} as const;

export type PoolMethodId = "bomba" | "solar";

/** Las dos formas de templar la pileta, lado a lado, con las mismas filas para comparar. */
export const poolMethods: {
  id: PoolMethodId;
  title: string;
  chain: [string, string, string];
  body: string;
  facts: { k: string; v: string }[];
  ask: string;
}[] = [
  {
    id: "bomba",
    title: "Bomba de calor",
    chain: ["Aire", "Bomba de calor", "Agua templada"],
    body: "Funciona como un aire acondicionado en modo calor: toma el calor del aire y se lo pasa al agua que sale del filtro. Calienta de día y de noche, con sol o nublado, y mantiene la temperatura que elijas.",
    facts: [
      { k: "Calienta", v: "Con cualquier clima, de día y de noche" },
      { k: "Gasta", v: "Electricidad; con paneles solares, menos" },
      { k: "Va", v: "Al lado de la pileta, al aire libre" },
    ],
    ask: "Quiero consultar por una bomba de calor para mi pileta.",
  },
  {
    id: "solar",
    title: "Colectores solares",
    chain: ["Sol", "Colectores", "Agua templada"],
    body: "El agua del filtro pasa por colectores al sol, en un techo o junto a la pileta, y vuelve más tibia. Calentarla no gasta gas ni electricidad: el agua la mueve la misma bomba del filtro.",
    facts: [
      { k: "Calienta", v: "Con sol" },
      { k: "Gasta", v: "Nada más que la bomba del filtro" },
      { k: "Va", v: "En un techo o un lugar al sol, cerca de la pileta" },
    ],
    ask: "Quiero consultar por climatización solar para mi pileta.",
  },
];

/** Evento con el que la calculadora y los servicios precargan el formulario de contacto. */
export const PREFILL_EVENT = "pibe:prefill";
export type ContactPrefill = { servicio?: string; lugar?: string; mensaje?: string };

export function prefillContact(detail: ContactPrefill) {
  window.dispatchEvent(new CustomEvent<ContactPrefill>(PREFILL_EVENT, { detail }));
  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Enlaces directos a WhatsApp e Instagram. Sin usuario de Instagram, lleva a los canales del contacto. */
export const social = {
  whatsapp: {
    label: "WhatsApp",
    hint: "Escribinos por WhatsApp",
    href: waLink(`Hola, les escribo desde la página de ${pibe.name}.`),
    missing: !pibe.whatsapp,
  },
  instagram: {
    label: "Instagram",
    hint: pibe.instagram ? `@${pibe.instagram}` : "Instagram: usuario a cargar",
    href: pibe.instagram ? `https://instagram.com/${pibe.instagram}` : "#contacto",
    missing: !pibe.instagram,
  },
} as const;

/**
 * Marcas que Soltech instala (confirmadas, octubre 2026), en "Quiénes somos" y en la franja del
 * hero. Logos originales en public/pibe/marcas/: de Wikimedia Commons o del sitio de cada marca. No la hacen
 * instaladora oficial de ninguna; para decir eso hace falta que la marca lo certifique.
 * `rem`: alto del logo, para que todos pesen parecido a la vista.
 */
export const brands: { group: string; items: { name: string; src: string; w: number; h: number; rem: number }[] }[] = [
  {
    group: "Paneles",
    items: [
      { name: "JA Solar", src: "/pibe/marcas/ja-solar.svg", w: 453, h: 80, rem: 1.55 },
      { name: "Jinko Solar", src: "/pibe/marcas/jinko-solar.png", w: 146, h: 59, rem: 2.6 },
      { name: "Trina Solar", src: "/pibe/marcas/trina-solar.svg", w: 251, h: 58, rem: 1.9 },
    ],
  },
  {
    group: "Inversores",
    items: [
      { name: "Deye", src: "/pibe/marcas/deye.png", w: 140, h: 54, rem: 2.3 },
      { name: "Huawei", src: "/pibe/marcas/huawei.svg", w: 576, h: 98, rem: 1.35 },
      { name: "Growatt", src: "/pibe/marcas/growatt.png", w: 182, h: 31, rem: 1.35 },
      { name: "Fronius", src: "/pibe/marcas/fronius.png", w: 500, h: 250, rem: 2.6 },
    ],
  },
  {
    group: "Baterías",
    items: [
      { name: "Pylontech", src: "/pibe/marcas/pylontech.svg", w: 219, h: 44, rem: 1.85 },
      { name: "Dyness", src: "/pibe/marcas/dyness.svg", w: 139, h: 21, rem: 1.35 },
    ],
  },
];
