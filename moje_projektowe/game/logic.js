import {WELL_DEPTH} from "./state.js";
import {state} from "./state.js";
// import {scene} from "./renderer";

export const x = 123

export const tryMove = (piece, dx, dy, dz) => {
  if(piece.position.z === WELL_DEPTH){
      console.log("Piece reached the bottom")
      return false
  }

  const nextPos = {
    x: piece.position.x + dx,
    y: piece.position.y + dy,
    z: piece.position.z + dz
  };

  for(let i= -1; i<2; i++){
      for(let j=-1; j<2; j++){
          if(piece.blocks[j + 1][i + 1]){
              if(state[piece.position.z + 1][piece.position.y + j][piece.position.x + i]){
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
  // console.log(state[-1 * piece.position.z])
  // console.log(piece.position)

  console.log("fixing a piece")

  for(let i = -1; i < 2; i++){
    for(let j = -1; j < 2; j ++){
      if(piece.blocks[j + 1][ i + 1]){
        state[piece.position.z -1][piece.position.y + j][piece.position.x + i] = 1 // we subtract one from the z, as for 0 indexing
      }
    }
  }

  console.log(state)

  // console.log(state[-1 * piece.position.z])

  // state[piece.position.z]
  // return false
}
