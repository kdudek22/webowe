

export function setupControls(state) {
    document.addEventListener("keydown", e => {
        const p = state.activePiece;

        if (!p || !checkIfCanMove(p.position, state.well.size)){
            return;
        }

        if (e.key === "ArrowLeft")  p.position.x -= 1;
        if (e.key === "ArrowRight") p.position.x += 1;
        if (e.key === "ArrowUp")    p.position.y += 1;
        if (e.key === "ArrowDown")  p.position.y -= 1;

        if (e.key === "a") p.rotation.z += Math.PI / 2;
        if (e.key === "d") p.rotation.z -= Math.PI / 2;
        if (e.key === " ") state.speed = 0.2;
    });
}


// TODO for now this is super simplified, but it should be more complex
const checkIfCanMove = (position, wellSize) => {
    return position.x >= -1*wellSize/2 && position.x <= wellSize/2
        && position.y >= -1*wellSize/2 && position.y <= wellSize/2

}