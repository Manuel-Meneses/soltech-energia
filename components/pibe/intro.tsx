import { Wordmark } from "./wordmark";

/**
 * Animación de inicio: un módulo de celdas azul noche tapa
 * la pantalla, aparece la marca con una barra dorada que carga y las celdas se retiran en
 * diagonal desde abajo a la izquierda, como el sol barriendo un panel. CSS puro, menos de
 * 2 s, una vez por sesión: el script la apaga si ya se vio o con movimiento reducido.
 */
const COLS = 12;
const ROWS = 8;
const M_COLS = 6;
const M_ROWS = 12;

const cells = Array.from({ length: COLS * ROWS }, (_, i) => {
  const c = i % COLS;
  const r = Math.floor(i / COLS);
  const mc = i % M_COLS;
  const mr = Math.floor(i / M_COLS);
  return { d: c + (ROWS - 1 - r), md: mr < M_ROWS ? mc + (M_ROWS - 1 - mr) : -1 };
});

const skipScript = `try{var k="pa-intro-seen";if(sessionStorage.getItem(k)||matchMedia("(prefers-reduced-motion: reduce)").matches){var s=document.createElement("style");s.textContent=".pa-intro{display:none!important}.pa{--intro-delay:0ms}";document.head.appendChild(s)}else{sessionStorage.setItem(k,"1")}}catch(e){}`;

export function PibeIntro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: skipScript }} />
      <div className="pa-intro" aria-hidden="true">
        <div className="pa-intro-grid">
          {cells.map((cell, i) => (
            <span
              key={i}
              data-m={cell.md >= 0 ? undefined : "off"}
              style={{ ["--d" as string]: cell.d, ["--md" as string]: Math.max(0, cell.md) }}
            />
          ))}
        </div>
        <div className="pa-intro-mark">
          <Wordmark className="pa-intro-word" />
          <span className="pa-intro-bar" />
        </div>
      </div>
    </>
  );
}
