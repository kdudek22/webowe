import { createScene } from "./game/scene.js";
import { WELL_SIZE, WELL_DEPTH, createWellGrid } from "./game/well.js";
import { spawnPiece } from "./game/pieces.js";
import { setupControls } from "./game/controls.js";
import { animateLoop } from "./game/animate.js";

const { scene, camera, renderer, controls } = createScene();

const state = {
    grid: createWellGrid(),
    well: { width: WELL_SIZE, height: WELL_SIZE, depth: WELL_DEPTH },
    activePiece: null,
    fixed: [],
    fallInterval: 600,
    lastFallTime: 0
};

state.activePiece = spawnPiece(state.grid);

setupControls(state);
animateLoop(state, renderer, scene, camera, controls);
