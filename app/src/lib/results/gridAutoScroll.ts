// Auto-scroll al seleccionar celdas arrastrando el mouse: mientras el puntero
// sigue apretado fuera del area de celdas, la vista avanza hacia ese lado.

const MIN_STEP = 4;
const MAX_STEP = 48;

// Cuanto mover el scroll (px por cuadro) segun donde esta el puntero respecto
// del area visible de celdas [start, end]. Dentro del area es 0; cuanto mas
// lejos del borde, mas rapido, con un tope para no perder el control.
export function edgeScrollStep(pointer: number, start: number, end: number): number {
  if (pointer < start) return -Math.min(MAX_STEP, MIN_STEP + (start - pointer) / 4);
  if (pointer > end) return Math.min(MAX_STEP, MIN_STEP + (pointer - end) / 4);
  return 0;
}

// El punto del area de celdas mas cercano al puntero, con un margen para no
// caer sobre los scrollbars dibujados encima ni fuera del cuerpo.
export function clampToBody(pointer: number, start: number, end: number, inset: number): number {
  return Math.min(Math.max(pointer, start + inset), end - inset);
}
