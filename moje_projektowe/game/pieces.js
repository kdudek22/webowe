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
    // The defined shapes on a 3x3 grid
    static PIECES = [
        [[1, 1, 1],
        [0, 1, 0],
        [0, 1, 1]],

        [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],

        [[0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]]
    ]
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

    static getRandomPiece(position){
        return new Piece(this.PIECES[Math.floor(Math.random() * this.PIECES.length)], position)
    }
}


export const spawnPiece = () => {
  return Piece.getRandomPiece(getPieceStartingPosition());
};
