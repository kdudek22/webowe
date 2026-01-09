import { tryMove } from "./logic.js";

export function setupInput(getPiece) {
  document.addEventListener("keydown", e => {
    const p = getPiece();
    if (!p) return;

    if (e.key === "ArrowLeft") tryMove(p, 1, 0, 0);
    if (e.key === "ArrowRight") tryMove(p, -1, 0, 0);
    if (e.key === "ArrowUp") tryMove(p, 0, 1, 0);
    if (e.key === "ArrowDown") tryMove(p, 0, -1, 0);
    if(e.key === "a") p.rotateAntiClockwise()
    if(e.key === "d") p.rotateClockwise()
  });
}
