import { renderState, renderer, scene, camera, controls } from "./game/renderer.js";
import { spawnPiece } from "./game/pieces.js";
import {fixPiece, tryMove, checkIfLevelsFilled} from "./game/logic.js";
import {setupInput} from "./game/input.js";

const AUTO_MOVE_INTERVAL = 500
let timer = 0
let activePiece = spawnPiece()


setupInput(() => activePiece);

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
      if(activePiece.position.z === 0){
        alert("You have lost, refresh to start again")
        window.location.reload();
      }
      fixPiece(activePiece)
      activePiece = spawnPiece()
      checkIfLevelsFilled()
    }
  }

  renderState(activePiece)
  renderer.render(scene, camera);
}




animate();
