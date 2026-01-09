import { renderState, renderer, scene, camera, controls } from "./game/renderer.js";
import { spawnPiece } from "./game/pieces.js";
import {fixPiece, tryMove} from "./game/logic.js";
// import { setupInput } from "./game/input.js";


// setupInput(() => activePiece);

// function animate(time) {
//   requestAnimationFrame(animate);
//
//   moveTimer += time ? time - (animate.lastTime || time) : 0;
//   animate.lastTime = time;
//
//   if (gravityTimer >= GRAVITY_INTERVAL) {
//     moveTimer = 0;
//
//     // if (!tryMove(activePiece, 0, 0, -1)) {
//     //   fixPiece(activePiece);
//     //   activePiece = spawnPiece();
//     // }
//   }
//
//   // renderState(activePiece);
//   controls.update();

// }

const AUTO_MOVE_INTERVAL = 500
let timer = 0
let activePiece = spawnPiece()

function animate(time){
  requestAnimationFrame(animate)

  // this adds the delta time between frames
  timer += time ? time - (animate.lastTime || time) : 0
  animate.lastTime = time

  if(!activePiece){
    return
  }

  if(timer >= AUTO_MOVE_INTERVAL ){
    timer = 0

    if(!tryMove(activePiece, 0, 0, 1)){
      fixPiece(activePiece)
      console.log("spawning new piece")
      activePiece = spawnPiece()

    }

    // activePiece.position.z -= 1

  }

  renderState(activePiece)
  renderer.render(scene, camera);
  // controls.update()
}


animate();
