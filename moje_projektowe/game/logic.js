import {WELL_DEPTH, WELL_HEIGHT, WELL_WIDTH} from "./state.js";
import {state} from "./state.js";
// import {scene} from "./renderer";

export const x = 123

export const tryMove = (piece, dx, dy, dz) => {
  if(piece.position.z === WELL_DEPTH -1){
    console.log(piece.position.z)
      console.log("Piece reached the bottom")
      return false
  }

  const nextPos = {
      x: piece.position.x + dx,
      y: piece.position.y + dy,
      z: piece.position.z + dz
    };

  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      if (!piece.blocks[j + 1][i + 1]) continue

      const x = nextPos.x + i
      const y = nextPos.y + j
      const z = nextPos.z

      // ─── Bounds check ───────────────────────────
      if (
        x < 0 || x >= WELL_WIDTH ||
        y < 0 || y >= WELL_HEIGHT ||
        z < 0 || z >= WELL_DEPTH
      ) {
        return false
      }

      // ─── Collision check ────────────────────────
      if (state[z][y][x]) {
        return false
      }
    }
  }

  for(let i= -1; i<2; i++){
      for(let j=-1; j<2; j++){
          if(piece.blocks[j + 1][i + 1]){
              const globalX = piece.position.x + i
              const globalY = piece.position.y + j

              console.log(globalX)
              console.log(globalY)

              if(state[piece.position.z + 1][piece.position.y + j][piece.position.x + i]){
                console.log("Pieced is blocked below")
                return false
              }
          }
      }
  }



  piece.position = nextPos

  // if (fits(piece.blocks, nextPos)) {
  //   piece.pos = nextPos;
  //   return true;
  // }
  return true;
}

export const fixPiece = (piece) => {
  for(let i = -1; i < 2; i++){
    for(let j = -1; j < 2; j ++){
      if(piece.blocks[j + 1][ i + 1]){
        state[piece.position.z][piece.position.y + j][piece.position.x + i] = 1
      }
    }
  }

  console.log(state)

  // console.log(state[-1 * piece.position.z])

  // state[piece.position.z]
  // return false
}
