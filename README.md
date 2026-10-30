# Soltech Energía

Sitio de **El Pibe del Aire**, el emprendimiento de Matías Moreira: paneles solares,
termotanques solares, mantenimiento y limpieza en Buenos Aires.

Hecho con Next.js 16. El contenido (servicios, fotos, precios, contacto) se carga en
`lib/pibe.ts`; el diseño está documentado en `DESIGN.md` y el producto en `PRODUCT.md`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Galería de Trabajos: Drive + planilla

El cliente maneja las fotos sin tocar el código. Las fotos están en una carpeta de Google Drive y
los textos en una planilla de Google, una fila por foto. Sin configurar, el sitio muestra las fotos
de `public/pibe/trabajos/` con las fichas de `lib/pibe.ts`.

### Para el cliente

- **Sumar fotos:** soltarlas en la carpeta de Drive y tocar **Traer fotos nuevas y publicar**, en la
  planilla. Aparece una fila por foto, con su miniatura: escribir la descripción y elegir el tipo.
- **Sacar una foto:** borrarla de Drive. Se va del sitio; su fila se borra al tocar el enlace.
- **Cambiar el orden:** arrastrar las filas. Las primeras 8 son las que abren la galería.
- **Cuándo se ve:** al tocar el enlace, enseguida; si no, solo, en unos 5 minutos.
- **Fotos del iPhone:** tienen que estar en JPG. El enlace avisa cuáles están en HEIC.

### Configurarla (una sola vez)

1. En [Google Cloud](https://console.cloud.google.com/), crear un proyecto, activar **Google Drive
   API** y **Google Sheets API**, crear una **cuenta de servicio** y bajar su clave en JSON.
2. En Drive, crear una carpeta para la galería y subir las fotos de `public/pibe/trabajos/` con el
   mismo nombre: así las filas nacen con su descripción, su tipo y su orden. Compartir la carpeta con
   el mail de la cuenta de servicio, como **lector**.
3. Crear una planilla vacía y compartirla con ese mail, como **editor**.
4. Cargar en Vercel (Production) estas variables y volver a publicar:

   | Variable | Valor |
   | --- | --- |
   | `GALERIA_GOOGLE_CREDENCIALES` | El contenido entero del JSON de la clave |
   | `GALERIA_CARPETA_ID` | Lo que sigue a `/folders/` en la dirección de la carpeta |
   | `GALERIA_PLANILLA_ID` | Lo que está entre `/d/` y `/edit` en la dirección de la planilla |
   | `GALERIA_CLAVE` | Una clave larga al azar (`openssl rand -hex 24`) |

5. Abrir una vez, en el dominio definitivo, `https://soltech-energia.com/api/galeria/actualizar?clave=LA_CLAVE`.
   Arma la planilla (títulos, lista de tipos, enlace) y carga las filas.
6. Compartir la carpeta y la planilla con el cliente, como **editor**. Quien pueda ver la planilla ve
   el enlace con la clave: no la publiques.
