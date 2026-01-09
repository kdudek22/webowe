import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.155/build/three.module.js";


export const SHAPES = {
    L: [[0,0,0],[1,0,0],[0,1,0]],
    I: [[0,0,0],[1,0,0],[2,0,0],[3,0,0]],
    O: [[0,0,0],[1,0,0],[0,1,0],[1,1,0]],
    T: [[0,0,0],[-1,0,0],[1,0,0],[0,1,0]],
    Z: [[0,0,0],[1,0,0],[0,1,0],[-1,1,0]],
    CORNER_3D: [[0,0,0],[1,0,0],[0,1,0],[0,0,1]]
};

export function createPiece(shapeName, well) {
    const shape = SHAPES[shapeName];
    const piece = {
        shape,
        x: Math.floor(well.length/2),
        y: Math.floor(well[0].length/2),
        z: 0,
        color: new THREE.Color(Math.random(), Math.random(), Math.random())
    };
    return piece;
}

export function spawnPiece(well) {
    const keys = Object.keys(SHAPES);
    const shape = keys[Math.floor(Math.random()*keys.length)];
    return createPiece(shape, well);
}
