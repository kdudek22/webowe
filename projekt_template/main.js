import { renderState, renderer, scene, camera, controls } from "./game/renderer.js";
import { spawnPiece, tryMove, fixPiece } from "./game/gameLogic.js";
import { setupInput } from "./game/input.js";

let activePiece = spawnPiece();

let gravityTimer = 0;
const GRAVITY_INTERVAL = 500; // ms per step

setupInput(() => activePiece);

function animate(time) {
  requestAnimationFrame(animate);

  gravityTimer += time ? time - (animate.lastTime || time) : 0;
  animate.lastTime = time;

  if (gravityTimer >= GRAVITY_INTERVAL) {
    gravityTimer = 0;

    if (!tryMove(activePiece, 0, 0, -1)) {
      fixPiece(activePiece);
      activePiece = spawnPiece();
    }
  }

  renderState(activePiece);
  controls.update();
  renderer.render(scene, camera);
}

animate();
