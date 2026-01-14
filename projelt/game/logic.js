import { WELL_DEPTH, WELL_HEIGHT, WELL_WIDTH, state } from "./state.js";


export const getPieceStartingPosition = () => {
  return {
    x: Math.floor(WELL_WIDTH / 2),
    y: Math.floor(WELL_HEIGHT / 2),
    z: 0
  }
}

const isOutOfBounds = (x, y, z) => {
    return x < 0 || x >= WELL_WIDTH ||
           y < 0 || y >= WELL_HEIGHT ||
           z < 0 || z >= WELL_DEPTH
}


const forEachBlockCell = (blocks, callback) => {
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      if (blocks[j + 1][i + 1]) {
        callback(i, j);
      }
    }
  }
};

const canOccupyPosition = (piece, blocks, position) => {
  let valid = true;

  forEachBlockCell(blocks, (i, j) => {
    const x = position.x + i;
    const y = position.y + j;
    const z = position.z;

    if (isOutOfBounds(x, y, z) || state[z][y][x]) {
      valid = false;
    }
  });

  return valid;
};


export const canRotate = (piece, rotatedBlocks) =>
  canOccupyPosition(piece, rotatedBlocks, piece.position);

export const tryMove = (piece, dx, dy, dz) => {
  if (piece.position.z === WELL_DEPTH - 1){
    return false;
  }

  const nextPos = {
    x: piece.position.x + dx,
    y: piece.position.y + dy,
    z: piece.position.z + dz
  };

  if (!canOccupyPosition(piece, piece.blocks, nextPos)) {
    return false;
  }

  // check if blocked below
  if (dz === 0) {
    const belowPos = { ...piece.position, z: piece.position.z + 1 };
    if (!canOccupyPosition(piece, piece.blocks, belowPos)) {
      return false;
    }
  }

  piece.position = nextPos;
  return true;
};

export const fixPiece = (piece) => {
  forEachBlockCell(piece.blocks, (i, j) => {
    const x = piece.position.x + i;
    const y = piece.position.y + j;
    const z = piece.position.z;
    state[z][y][x] = 1;
  });
};

export const checkIfLevelsFilled = () => {
  for (let z = WELL_DEPTH - 1; z >= 0; z--) {
    const isFull = state[z].every(row => row.every(cell => cell !== 0));
    if (!isFull) continue;

    state.splice(z, 1);

    const emptyLayer = Array.from({ length: WELL_HEIGHT }, () =>
      Array(WELL_WIDTH).fill(0)
    );

    state.unshift(emptyLayer);
  }
};
