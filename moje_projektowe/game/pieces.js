import {WELL_DEPTH} from "./state.js";
import {getPieceStartingPosition, canRotate} from "./logic.js";


function rotateMatrixClockwise(matrix) {
    const N = matrix.length
    const rotated = Array.from({ length: N }, () => Array(N).fill(0))

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            rotated[row][col] = matrix[N - col - 1][row]
        }
    }

    return rotated
}

function rotateMatrixAntiClockwise(matrix) {
    const N = matrix.length
    const rotated = Array.from({ length: N }, () => Array(N).fill(0))

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            rotated[row][col] = matrix[col][N - row - 1]
        }
    }

    return rotated
}

class Piece {
    constructor(blocks, position) {
        this.blocks = blocks
        this.position = position
    }

    rotateClockwise() {
        const rotated = rotateMatrixClockwise(this.blocks)
        if (canRotate(this, rotated)) {
          this.blocks = rotated
        }
    }

    rotateAntiClockwise() {
        const rotated = rotateMatrixAntiClockwise(this.blocks)
        if (canRotate(this, rotated)) {
          this.blocks = rotated
        }
    }
}

class Piece1 extends Piece {
    constructor(position) {
        super(
            [
                [1, 1, 1],
                [0, 1, 0],
                [0, 1, 1]
            ],
            position
        )
    }
}

class Piece2 extends Piece {
    constructor(position) {
        super(
            [
                [1, 1, 1],
                [0, 0, 0],
                [0, 0, 0]
            ],
            position
        )
    }
}

class Piece3 extends Piece {
    constructor(position) {
        super(
            [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0]
            ],
            position
        )
    }
}


export const spawnPiece = () => {
  const pieces = [Piece1, Piece2, Piece3];
  const RandomPiece = pieces[Math.floor(Math.random() * pieces.length)];
  return new RandomPiece(getPieceStartingPosition());
};


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
