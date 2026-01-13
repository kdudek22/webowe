import { renderState, renderer, scene, camera, controls } from "./game/renderer.js";
import { spawnPiece } from "./game/pieces.js";
import {fixPiece, tryMove, checkIfLevelsFilled} from "./game/logic.js";
import {setupInput} from "./game/input.js";


const START_GAME_MESSAGE = document.getElementById("play")
START_GAME_MESSAGE.addEventListener("click", () => startGame())

const GAME_LOST_MESSAGE = document.getElementById("gameLost")
GAME_LOST_MESSAGE.addEventListener("click", () => {window.location.reload()})

const GAME_SCORE = document.getElementById("score")


const AUTO_MOVE_INTERVAL = 500
let timer = 0
let activePiece = spawnPiece()
let isPlaying = false;
let score = 0


const startGame = () => {
  isPlaying = true
  START_GAME_MESSAGE.style.display  = "none"
}

const showGameLostMessage = () => {
  GAME_LOST_MESSAGE.style.display = "block"
  isPlaying = false
}

const updateGameScore = () => {
  score += 1
  GAME_SCORE.textContent = `Wynik: ${score}`
}


setupInput(() => activePiece);

function animate(time){
  requestAnimationFrame(animate)

  if(!isPlaying){
    return
  }


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
        showGameLostMessage()
      }
      fixPiece(activePiece)
      activePiece = spawnPiece()
      updateGameScore()
      checkIfLevelsFilled()
    }
  }

  renderState(activePiece)
  renderer.render(scene, camera);
}


animate();
