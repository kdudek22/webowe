import {WELL_DEPTH} from "./state.js";


class Piece1{
    constructor() {
        this.blocks = [
          [1, 1, 0],
          [0, 1, 0],
          [0, 1, 1]
        ]
        this.position = {
            x: 3,
            y: 3,
            z: 0
        }
    }

}


export const spawnPiece = () => {
    const piece = new Piece1()
    return new Piece1()
}


export const tryMove = (piece, dx, dy, dz) => {
  const nextPos = {
    x: piece.pos.x + dx,
    y: piece.pos.y + dy,
    z: piece.pos.z + dz
  };

  if(nextPos.z === WELL_DEPTH){
      return false
  }

  if (fits(piece.blocks, nextPos)) {
    piece.pos = nextPos;
    return true;
  }
  return false;
}
