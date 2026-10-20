---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["components/pibe","lib/pibe.ts"]
---

# Surface brief: / (El Pibe del Aire)

Scope: landing de El Pibe del Aire (Matías Moreira, emprendedor solo de energía solar en Buenos Aires). Propuesta para mostrarle a Matías. Modo: Persuade.
Audiencia: vecinos con casa, PH o terraza y comerciantes chicos de Buenos Aires. Acción: escribir por WhatsApp (formulario que arma el mensaje).
Prueba disponible: casi nada todavía. Nombre, servicios (paneles en casas y comercios, termotanques solares, mantenimiento, limpieza), zona. 6 o 7 fotos que faltan cargar. Contactos sin cargar. Sin precios. Todo lo faltante se ve como "A completar".
Decisiones del usuario (20 oct. 2026): misma filosofía de diseño que la propuesta anterior (esquinas rectas, Archivo con eje de ancho, módulos de panel, el sol del hero, entrada en panel) con paleta "Cielo y sol" y un dorado sobrio en vez de amarillo ("algo más profesional"). Lo de aires acondicionados queda abierto: no se menciona.

## Direction contract

THESIS: El techo de Buenos Aires como escenario: la página muestra un techo porteño con el sol real de ahora y hace la cuenta de paneles con el vecino. Rechaza la landing de instalador con foto de stock, tres tarjetas de servicios y "¡Ahorrá ya!".

OWN-WORLD: "Plano y Módulo" recoloreado. Azul noche #0e2240 y papel celeste #edf4fa alternados por capítulo; celeste #6fb6e8 = el cielo y lo vivo; dorado #e3a53c = la acción (texto en azul noche encima). Archivo expandida 125 en titulares, 100 para leer. Cero radio, filetes de 1px, juntas de 2px, celdas de panel con busbars. Dibujos de línea a escuadra de techos porteños (tanque de agua, medianeras, terrazas) en lugar de fotos que no hay.

STORY: El vecino ve un techo como el suyo con el sol de este momento, entiende que Matías instala y mantiene paneles y termotanques, conoce a Matías, hace la cuenta con su factura, ve cómo trabaja, sus trabajos y cómo se paga, y le escribe con los números ya cargados.

FIRST VIEWPORT: Azul noche, 100svh. Arriba a la izquierda el titular expandido en dos líneas, bajada en primera persona y CTA dorado "Pedí una visita" con enlace a la calculadora. Abajo, a todo el ancho, la silueta de techos porteños con la casa de Matías bajo el centro del arco del sol, en el tercio derecho (paneles y termotanque en la terraza; la ciudad baja a la izquierda para no subir hasta el texto); el sol de Buenos Aires en su altura real cruza un arco sobre ellos, los paneles se encienden según la altura del sol y de noche se prenden las ventanas. Al pie, una hoja de datos de cuatro celdas: los cuatro servicios, cada una lleva a su parte.

FORM: extensión del mundo establecido de la propuesta anterior con paleta nueva, estructura derivada del contenido (sin tirada de concept-seed: el usuario fijó la filosofía de diseño). Firma: el techo con el sol en vivo del hero; segunda pieza: la calculadora que arma el módulo de paneles.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Ajustes (20 oct. 2026, revisión final): contacto sobre un campo celeste a pleno, el cielo de día del cierre, con el formulario como hoja de plano (papel y sombra corta). Los pasos de "Cómo trabajo" no llevan rótulo de hora visible: la hora la dicen el tinte y la altura del sol (texto oculto para lectores de pantalla). El dibujo del hero apoya 5.5rem sobre el pie, con línea de calle, para que la tira de servicios no tape la casa.

Actualización (20 oct. 2026): el usuario sacó a Lumager del proyecto; el sitio vive en / y /pibe-del-aire redirige a la raíz. Repositorio: soltech-energia.
