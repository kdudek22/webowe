import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.155/build/three.module.js";

export function animateLoop(state, renderer, scene, camera, controls) {

    function drawGrid() {
        // remove old meshes
        scene.children
            .filter(obj=>obj.userData?.isPieceMesh)
            .forEach(obj=>scene.remove(obj));

        for (let x=0; x<state.grid.length; x++) {
            for (let y=0; y<state.grid[0].length; y++) {
                for (let z=0; z<state.grid[0][0].length; z++) {
                    const color = state.grid[x][y][z];
                    if (color) {
                        const mat = new THREE.MeshStandardMaterial({color});
                        const cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), mat);
                        cube.position.set(x, y, -z);
                        cube.userData.isPieceMesh = true;
                        scene.add(cube);
                    }
                }
            }
        }
    }

    function fixPiece() {
        const p = state.activePiece;
        p.shape.forEach(([ox,oy,oz])=>{
            const x = p.x+ox, y=p.y+oy, z=p.z+oz;
            state.grid[x][y][z] = p.color;
        });
        state.fixed.push(p);
        state.activePiece = spawnPiece(state.grid);
    }

    function canMoveDown() {
        const p = state.activePiece;
        return p.shape.every(([ox,oy,oz])=>{
            const x = p.x+ox, y=p.y+oy, z=p.z+oz+1;
            return z<state.grid[0][0].length && state.grid[x][y][z]===null;
        });
    }

    function loop(time) {
        requestAnimationFrame(loop);

        if (time - state.lastFallTime > state.fallInterval) {
            state.lastFallTime = time;

            if (canMoveDown()) {
                state.activePiece.z += 1;
            } else {
                fixPiece();
            }
        }

        drawGrid();
        controls.update();
        renderer.render(scene, camera);
    }

    loop(0);
}
