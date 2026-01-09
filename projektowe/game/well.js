export const WELL_SIZE = 6;
export const WELL_DEPTH = 20;

export function createWellGrid() {
    const grid = [];
    for (let x=0; x<WELL_SIZE; x++) {
        grid[x] = [];
        for (let y=0; y<WELL_SIZE; y++) {
            grid[x][y] = [];
            for (let z=0; z<WELL_DEPTH; z++) {
                grid[x][y][z] = null; // empty
            }
        }
    }
    return grid;
}
