import {WELL_DEPTH, WELL_HEIGHT, WELL_WIDTH} from "./state.js";
import {state} from "./state.js";


export const getPieceStartingPosition = () => {
  return {
    x: Math.floor(WELL_WIDTH / 2),
    y: Math.floor(WELL_HEIGHT / 2),
    z: 0
  }
}

export const canRotate = (piece, rotatedBlocks) => {
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      if (!rotatedBlocks[j + 1][i + 1]) continue

      const x = piece.position.x + i
      const y = piece.position.y + j
      const z = piece.position.z

      if (x < 0 || x >= WELL_WIDTH ||
          y < 0 || y >= WELL_HEIGHT ||
          z < 0 || z >= WELL_DEPTH) {
        return false
      }

      if (state[z][y][x]) {
        return false
      }
    }
  }

  return true
}


export const tryMove = (piece, dx, dy, dz) => {
  // piece reached the bottom
  if(piece.position.z === WELL_DEPTH -1){
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

      if (
        x < 0 || x >= WELL_WIDTH ||
        y < 0 || y >= WELL_HEIGHT ||
        z < 0 || z >= WELL_DEPTH
      ) {
        return false
      }

      if (state[z][y][x]) {
        return false
      }
    }
  }

  // here we check if the piece is blocked below
  for(let i= -1; i<2; i++){
      for(let j=-1; j<2; j++){
          if(piece.blocks[j + 1][i + 1]){
              if(state[piece.position.z + 1][piece.position.y + j][piece.position.x + i]){
                return false
              }
          }
      }
  }

  // if nothing fails, that means we can move the piece
  piece.position = nextPos
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
}


export const checkIfLevelsFilled = () => {
    for (let d = WELL_DEPTH - 1; d >= 0; d--) {
        if (state[d].every(row => row.every(cell => cell !== 0))) {
            state.splice(d, 1);

            const newLayer = Array.from({ length: WELL_WIDTH }, () =>
                Array(WELL_HEIGHT).fill(0)
            );
            state.unshift(newLayer);
        }
    }
};

