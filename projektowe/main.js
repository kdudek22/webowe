import { createScene } from "./game/scene.js";
import {createWell, WELL_DEPTH, WELL_SIZE} from "./game/well.js";
import { createPiece } from "./game/pieces.js";
import { setupControls } from "./game/controls.js";
import { animateLoop } from "./game/animation.js";

const { scene, camera, renderer } = createScene();
createWell(scene);

const state = {
    activePiece: null,
    fixed: [],
    fallInterval: 500,
    lastFallTime: 0,
    well: {
        depth: WELL_DEPTH,
        size: WELL_SIZE
    },
    spawn() {
        this.activePiece = createPiece(scene);
        return this.activePiece;
    }
};

state.spawn();
setupControls(state);
animateLoop(state, renderer, scene, camera);
