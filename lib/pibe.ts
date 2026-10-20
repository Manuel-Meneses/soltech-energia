/**
 * El Pibe del Aire: el emprendimiento de Matías Moreira.
 * Lo confirmado (octubre 2026): nombre, servicios (paneles en casas y comercios,
 * termotanques solares, mantenimiento y limpieza) y zona (Buenos Aires).
 * Todo lo que vale `null` falta cargar: el sitio lo muestra como "A completar" y no
 * inventa nada en su lugar. No hay precios, clientes, testimonios ni cifras.
 */

export const pibe = {
  name: "El Pibe del Aire",
  person: "Matías Moreira",
  firstName: "Matías",
  zone: "Buenos Aires",
  description:
    "Matías Moreira instala paneles solares y termotanques solares en casas y comercios de Buenos Aires, y los mantiene y limpia.",
  /** Solo dígitos, con código de país (549 + área + número). Sin número, WhatsApp abre el mensaje para elegir a quién mandarlo. */
  whatsapp: null as string | null,
  /** Usuario de Instagram, sin @. */
  instagram: null as string | null,
  email: null as string | null,
  license: null as string | null,
  since: null as string | null,
} as const;

/** Enlace de WhatsApp con el mensaje cargado; sin número, wa.me deja elegir el contacto. */
export function waLink(text?: string) {
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${pibe.whatsapp ?? ""}${q}`;
}

export const pibeCta = { label: "Pedí una visita", href: "#contacto" } as const;

export const pibeLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Calculadora", href: "#calculadora" },
  { label: "Cómo trabajo", href: "#como-trabajo" },
  { label: "Trabajos", href: "#trabajos" },
  { label: "Precios", href: "#precios" },
  { label: "Preguntas", href: "#preguntas" },
];

/** Sitio de referencia del sol del hero: el Obelisco. */
export const sunSite = { name: "Buenos Aires", lat: -34.6037, lon: -58.3816, utcOffset: -3 } as const;

export type ServiceId = "paneles" | "termotanque" | "mantenimiento" | "limpieza";

/** `part` es la pieza que se enciende en el dibujo de la casa (components/pibe/house-drawing.tsx). */
export const services: {
  id: ServiceId;
  title: string;
  short: string;
  body: string;
  details: string[];
  ask: string;
}[] = [
  {
    id: "paneles",
    title: "Paneles solares",
    short: "Para casas y comercios",
    body: "Paneles en el techo o la terraza, conectados a tu instalación. De día la casa o el local usa la energía del sol y le pide menos a la red.",
    details: ["Casas, PH y terrazas", "Locales y comercios", "Inversor y tablero"],
    ask: "Quiero consultar por paneles solares.",
  },
  {
    id: "termotanque",
    title: "Termotanques solares",
    short: "Agua caliente con el sol",
    body: "Un termotanque en el techo que calienta el agua con el sol. Gastás menos gas o luz para bañarte y lavar.",
    details: ["Elección de litros según la familia", "Instalación en techo o terraza", "Conexión al agua de la casa"],
    ask: "Quiero consultar por un termotanque solar.",
  },
  {
    id: "mantenimiento",
    title: "Mantenimiento",
    short: "Que siga rindiendo",
    body: "Reviso paneles, conexiones, inversor y tablero para que el equipo rinda lo que tiene que rendir.",
    details: ["Revisión de conexiones", "Control del inversor", "Termotanques solares"],
    ask: "Quiero consultar por mantenimiento de mi equipo solar.",
  },
  {
    id: "limpieza",
    title: "Limpieza de paneles",
    short: "Polvo, hollín y hojas",
    body: "En la ciudad los paneles juntan polvo, hollín y hojas, y un panel sucio genera menos. Los limpio y te cuento cómo están.",
    details: ["Techos y terrazas", "Vidrio, marco y bordes", "Revisión visual de cada panel"],
    ask: "Quiero consultar por limpieza de paneles.",
  },
];

/** Cómo trabaja, del primer mensaje a la vuelta. Cada paso toma una hora del día. */
export const steps = [
  {
    title: "Me escribís",
    body: "Por WhatsApp, con una foto de tu factura de luz y, si podés, una del techo. Con eso ya me hago una idea.",
    hour: "Amanecer",
  },
  {
    title: "Voy a ver tu techo",
    body: "Mido el lugar, miro hacia dónde da, qué sombras tiene y cómo está la instalación eléctrica.",
    hour: "Mañana",
  },
  {
    title: "Te paso el presupuesto",
    body: "Con el equipo que va, la cantidad de paneles o los litros del termotanque.",
    hour: "Mediodía",
  },
  {
    title: "Instalo",
    body: "Monto, conecto y pruebo. Antes de irme te muestro cómo funciona y qué mirar para saber que anda bien.",
    hour: "Tarde",
  },
  {
    title: "Vuelvo",
    body: "Para el mantenimiento y la limpieza. Si algo no anda, me escribís a mí.",
    hour: "Noche",
  },
] as const;

/**
 * La foto del hero, a pantalla completa: Matías junto a los paneles. `pos` es el encuadre en
 * escritorio y `posMobile` en celular, donde la pantalla angosta recorta los costados.
 */
export const heroPhoto = {
  src: "/pibe/trabajos/bases-hormigon.jpg",
  alt: "Matías con casco, con el pulgar arriba, junto a una fila de paneles solares apoyados sobre bases de hormigón en el pasto.",
  pos: "50% 58%",
  posMobile: "80% 50%",
} as const;

/** Matías trabajando: va en "Quién te instala". */
export const portrait = {
  src: "/pibe/matias.jpg",
  alt: "Matías conectando la caja de protecciones debajo de un inversor, en la pared de una casa.",
} as const;

/**
 * Las fotos de trabajos de Matías, en public/pibe/trabajos/. El mosaico (.pa-works en
 * pibe.css) las reparte en orden: la primera grande y las otras cuatro de a dos a su lado.
 * `what` es lo que se ve en la foto; `place` es el barrio, que confirma Matías.
 * `pos` corre el encuadre cuando la celda recorta la foto.
 */
export const works: { src: string; kind: ServiceId; what: string; place: string | null; alt: string; pos?: string }[] = [
  {
    src: "/pibe/trabajos/galpon-colectivos.jpg",
    kind: "paneles",
    what: "Paneles en el techo de un galpón de colectivos",
    place: null,
    alt: "Matías con casco y arnés sobre un techo de chapa cubierto de paneles, con colectivos estacionados abajo.",
    pos: "50% 62%",
  },
  {
    src: "/pibe/trabajos/casa-pileta.jpg",
    kind: "paneles",
    what: "Paneles sobre tejas, en una casa con pileta",
    place: null,
    alt: "Casa con pileta y una fila de paneles sobre el techo de tejas negras.",
    pos: "50% 66%",
  },
  {
    src: "/pibe/trabajos/casa-chapa.jpg",
    kind: "paneles",
    what: "Paneles sobre chapa, en una casa",
    place: null,
    alt: "Fila de paneles sobre un techo de chapa, con casas y árboles alrededor y el cielo nublado.",
    pos: "50% 92%",
  },
  {
    src: "/pibe/trabajos/estacionamiento.jpg",
    kind: "paneles",
    what: "Techo de paneles para un estacionamiento",
    place: null,
    alt: "Estructura azul con un techo de paneles que da sombra a una fila de autos estacionados.",
    pos: "50% 52%",
  },
  {
    src: "/pibe/trabajos/terraza-termotanques.jpg",
    kind: "termotanque",
    what: "Termotanques solares y paneles en una terraza",
    place: null,
    alt: "Vista desde arriba de una terraza con colectores de tubos para agua caliente y una larga fila de paneles.",
    pos: "50% 55%",
  },
];

/**
 * Idea para mostrar precios. Las filas son de ejemplo: los rangos de paneles y litros son
 * referencias de tamaño, y el precio lo carga Matías (`price`).
 */
export const priceRows: { service: ServiceId; title: string; size: string; price: string | null }[] = [
  { service: "paneles", title: "Casa chica", size: "4 a 6 paneles", price: null },
  { service: "paneles", title: "Casa de familia", size: "7 a 10 paneles", price: null },
  { service: "paneles", title: "Comercio", size: "A medida", price: null },
  { service: "termotanque", title: "Termotanque solar", size: "150 a 300 litros", price: null },
  { service: "mantenimiento", title: "Mantenimiento", size: "Por visita", price: null },
  { service: "limpieza", title: "Limpieza de paneles", size: "Por panel o por visita", price: null },
];

/** Formas de pago a confirmar con Matías. */
export const payments: { label: string; confirmed: boolean }[] = [
  { label: "Efectivo", confirmed: false },
  { label: "Transferencia", confirmed: false },
  { label: "Tarjeta en cuotas", confirmed: false },
  { label: "Mercado Pago", confirmed: false },
];

/** Preguntas de quien no es técnico. Las respuestas son generales del rubro, sin promesas de ahorro. */
export const faqs = [
  {
    q: "¿Mi techo sirve?",
    a: "En Buenos Aires lo ideal es que los paneles miren al norte y no les den sombra edificios, árboles ni tanques durante el mediodía. Sirven la losa, la chapa y la teja. Lo confirmo cuando voy a verlo.",
  },
  {
    q: "¿Funcionan si está nublado?",
    a: "Sí, pero generan menos. Un panel rinde según la luz que recibe: al mediodía de un día de sol, mucho; en un día gris, una parte. Por eso la cuenta se hace con el promedio del año.",
  },
  {
    q: "¿Qué pasa si se corta la luz?",
    a: "Un equipo conectado a la red se apaga en el corte, por seguridad de quienes trabajan en la línea. Si querés tener luz durante un corte, hacen falta baterías.",
  },
  {
    q: "¿Puedo inyectar a la red lo que no uso?",
    a: "La Ley 27.424 de generación distribuida permite conectar el equipo a la red y que te reconozcan lo que inyectás. El trámite depende de tu distribuidora.",
  },
  {
    q: "¿Cada cuánto hay que limpiar los paneles?",
    a: "Depende del polvo, el hollín y los árboles de la zona. En la ciudad, revisarlos y limpiarlos un par de veces por año suele alcanzar. Si ves que el equipo genera menos que antes, es momento de mirarlos.",
  },
  {
    q: "¿Un termotanque solar reemplaza al de gas?",
    a: "Puede trabajar solo o antes del termotanque que ya tenés: el agua llega precalentada y el de gas o eléctrico prende menos. En invierno o en días nublados sigue ayudando el otro.",
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
  /** Litros de agua caliente por persona por día. */
  litersPerPerson: 50,
  tankSizes: [150, 200, 250, 300],
} as const;

/** Evento con el que la calculadora y los servicios precargan el formulario de contacto. */
export const PREFILL_EVENT = "pibe:prefill";
export type ContactPrefill = { servicio?: string; lugar?: string; mensaje?: string };

export function prefillContact(detail: ContactPrefill) {
  window.dispatchEvent(new CustomEvent<ContactPrefill>(PREFILL_EVENT, { detail }));
  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Los equipos en 3D (components/pibe/equipos.tsx). Cada punto numerado va en el espacio
 * del modelo (metros aprox.) y dice qué hace la pieza y, si toca, qué reviso o limpio.
 * `confirmed: false`: falta que Matías diga si lo instala; el sitio lo marca a confirmar.
 */
export type EquipoId = "paneles" | "atmosferico" | "presurizado";

export const equipos: {
  id: EquipoId;
  label: string;
  /** En celular la pestaña va en dos renglones: `kicker` chico arriba y `tab` abajo. */
  kicker: string;
  tab: string;
  short: string;
  servicio: string;
  ask: string;
  confirmed: boolean;
  specs: string[];
  /** `back`: la pieza está atrás; al elegirla el equipo se da vuelta. Su punto solo se ve de atrás, y los de adelante, de frente. */
  parts: { pos: [number, number, number]; title: string; body: string; back?: boolean }[];
}[] = [
  {
    id: "paneles",
    label: "Paneles solares",
    kicker: "Paneles",
    tab: "Solares",
    short: "Electricidad del sol",
    servicio: "Paneles solares",
    ask: "Quiero consultar por paneles solares.",
    confirmed: true,
    specs: ["Casas, PH y terrazas", "Locales y comercios", "Inversor y tablero"],
    parts: [
      {
        pos: [-0.5, 0.8, 0.19],
        title: "Celdas",
        body: "Pasan la luz del sol a electricidad. Mientras más derecho les pega el sol, más generan.",
      },
      {
        pos: [0.6, 0.46, 0.78],
        title: "Vidrio",
        body: "Acá se juntan el polvo, el hollín y las hojas, y un vidrio sucio genera menos. Es lo que limpio.",
      },
      {
        pos: [-1.03, 0.31, 0.99],
        title: "Marco de aluminio",
        body: "Protege el vidrio y fija el panel a la estructura. En el mantenimiento reviso que siga firme.",
      },
      {
        pos: [0.53, 0.72, -0.08],
        title: "Caja de conexión",
        body: "Atrás del panel. De acá sale el cable al inversor; reviso que las conexiones estén sanas.",
        back: true,
      },
    ],
  },
  {
    id: "atmosferico",
    label: "Termotanque atmosférico",
    kicker: "Termotanque",
    tab: "Atmosférico",
    short: "Tubos de vacío, sin presión",
    servicio: "Termotanques solares",
    ask: "Quiero consultar por un termotanque solar atmosférico.",
    confirmed: true,
    specs: ["De 150 a 300 litros", "Para casas con tanque de reserva en altura", "En techo o terraza"],
    parts: [
      {
        pos: [0.62, 1.66, -0.36],
        title: "Tanque",
        body: "Guarda el agua que se calienta. Los litros los elijo según cuántos viven en la casa.",
      },
      {
        pos: [0.18, 0.72, 0.42],
        title: "Tubos de vacío",
        body: "Toman el calor del sol y se lo pasan al agua. El vacío entre los dos vidrios no deja que se escape.",
      },
      {
        pos: [-1.04, 0.5, -0.36],
        title: "Estructura",
        body: "Le da la inclinación justa y lo sostiene firme en el techo o la terraza.",
      },
    ],
  },
  {
    id: "presurizado",
    label: "Termotanque presurizado",
    kicker: "Termotanque",
    tab: "Presurizado",
    short: "Heat pipe, aguanta heladas",
    servicio: "Termotanques solares",
    ask: "Quiero consultar por un termotanque solar presurizado.",
    confirmed: false,
    specs: ["Trabaja con la presión de la red o con bomba", "Aguanta heladas", "Se suma a tu termotanque o caldera"],
    parts: [
      {
        pos: [0.5, 1.4, -0.24],
        title: "Cabezal",
        body: "Los tubos le pasan el calor al agua acá arriba, sin que el agua baje por los tubos.",
      },
      {
        pos: [-0.25, 0.7, 0.42],
        title: "Tubos heat pipe",
        body: "Cada tubo lleva el calor por un caño sellado. Por eso no se rompe con las heladas.",
      },
      {
        pos: [-1.24, 0.9, -0.25],
        title: "Conexión al agua",
        body: "Entra el agua fría y sale la caliente hacia tu termotanque o caldera de siempre.",
      },
    ],
  },
];

/** Enlaces directos a WhatsApp e Instagram. Sin usuario de Instagram, lleva a los canales del contacto. */
export const social = {
  whatsapp: {
    label: "WhatsApp",
    hint: "Escribime por WhatsApp",
    href: waLink(`Hola ${pibe.firstName}, te escribo desde la página de ${pibe.name}.`),
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
 * Marcas reconocidas del rubro, con su logo original (public/pibe/marcas/, de Wikimedia
 * Commons). Son una propuesta: quedan las que Matías instala de verdad. No lo hacen
 * instalador oficial de ninguna; para decir eso hace falta que la marca lo certifique.
 * `rem`: alto del logo, para que todos pesen parecido a la vista.
 */
export const brandsConfirmed = false;

export const brands: { group: string; items: { name: string; src: string; w: number; h: number; rem: number }[] }[] = [
  {
    group: "Paneles",
    items: [
      { name: "JA Solar", src: "/pibe/marcas/ja-solar.svg", w: 453, h: 80, rem: 1.55 },
      { name: "Jinko Solar", src: "/pibe/marcas/jinko-solar.png", w: 146, h: 59, rem: 2.6 },
      { name: "Trina Solar", src: "/pibe/marcas/trina-solar.svg", w: 251, h: 58, rem: 1.9 },
      { name: "Canadian Solar", src: "/pibe/marcas/canadian-solar.png", w: 435, h: 65, rem: 1.45 },
    ],
  },
  {
    group: "Inversores y baterías",
    items: [
      { name: "Huawei", src: "/pibe/marcas/huawei.svg", w: 576, h: 98, rem: 1.35 },
      { name: "Fronius", src: "/pibe/marcas/fronius.png", w: 500, h: 250, rem: 2.6 },
      { name: "SMA", src: "/pibe/marcas/sma.svg", w: 600, h: 380, rem: 2.9 },
      { name: "Victron Energy", src: "/pibe/marcas/victron-energy.svg", w: 261, h: 50, rem: 1.7 },
    ],
  },
];
