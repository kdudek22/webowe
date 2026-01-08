
export function animateLoop(state, renderer, scene, camera) {
    function loop(time) {
        requestAnimationFrame(loop);

        if (timeToMove(time, state)) {
            state.lastFallTime = time;
            state.activePiece.position.z -= 1;

            if (bottomReached(state)) {
                const piece = state.activePiece
                piece.position.z = -state.well.depth + 1;
                updatePieceColor(piece)
                state.fixed.push(piece);
                state.spawn();
                console.log(state.well.well)
            }
        }

        renderer.render(scene, camera);
    }
    loop(0);
}

const timeToMove = (time, state) => {
    return time - state.lastFallTime > state.fallInterval
}

const bottomReached = (state) => {
    return state.activePiece.position.z <= -state.well.depth + 1
}

const updatePieceColor = (piece) => {
    const color = DEPTH_TO_COLOR_MAP.get(piece.position.z) || "#ffffff"
    piece.children.forEach(cube => {
        cube.material.color.set(color)
    });
}

export const DEPTH_TO_COLOR_MAP = new Map([
  [0, "#EAC435"],
  [-1, "#345995"],
  [-2, "#E40066"],
  [-3, "#03CEA4"],
  [-4, "#00E404"]
]);