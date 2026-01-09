export function setupControls(state) {
    document.addEventListener("keydown", e => {
        const p = state.activePiece;
        if (!p) return;

        if (e.key === "ArrowLeft" && canMove(state, -1,0,0)) p.x -= 1;
        if (e.key === "ArrowRight" && canMove(state, 1,0,0)) p.x += 1;
        if (e.key === "ArrowUp" && canMove(state,0,1,0)) p.y +=1;
        if (e.key === "ArrowDown" && canMove(state,0,-1,0)) p.y -=1;

        if (e.key === " ") state.fallInterval = 50; // soft drop
    });
    document.addEventListener("keyup", e => {
        if (e.key===" ") state.fallInterval = 600;
    });
}

function canMove(state, dx, dy, dz) {
    const p = state.activePiece;
    return p.shape.every(([ox,oy,oz])=>{
        const x = p.x+ox+dx;
        const y = p.y+oy+dy;
        const z = p.z+oz+dz;
        return (
            x>=0 && x<state.grid.length &&
            y>=0 && y<state.grid[0].length &&
            z>=0 && z<state.grid[0][0].length &&
            state.grid[x][y][z]===null
        );
    });
}
