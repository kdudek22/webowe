import { state, WELL_WIDTH, WELL_HEIGHT, WELL_DEPTH } from "./state.js";

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

export const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(WELL_WIDTH/2, WELL_HEIGHT/2, -10);

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(WELL_WIDTH/2, WELL_HEIGHT/2, 10);
controls.enableDamping = true;

controls.update()

scene.add(new THREE.AmbientLight(0x444444));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(20, 10, 5);
scene.add(light);


const wellGeo = new THREE.BoxGeometry(WELL_WIDTH, WELL_HEIGHT, WELL_DEPTH);

// Shift geometry so it starts at 0,0,0 and extends to its full size
wellGeo.translate(WELL_WIDTH / 2, WELL_HEIGHT / 2, WELL_DEPTH / 2);

const wellWire = new THREE.EdgesGeometry(wellGeo);
const well = new THREE.LineSegments(
  wellWire,
  new THREE.LineBasicMaterial({ color: 0x00ffff })
);

scene.add(well);



/* cubes */
const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
const cubeMat = new THREE.MeshStandardMaterial({ color: 0xff4444 });

let meshes = [];


export function renderState(activePiece) {
  meshes.forEach(m => scene.remove(m));
  meshes = [];

  for (let z = 0; z < WELL_DEPTH; z++) {
      const color = getColorBasedOnDepth(z)
      const cubeMat = new THREE.MeshStandardMaterial({color});

      for (let y = 0; y < WELL_HEIGHT; y++){
        for (let x = 0; x < WELL_WIDTH; x++){
          if (state[z][y][x]) {
            const c = new THREE.Mesh(cubeGeo, cubeMat);
            c.position.set(
              x + 0.5,
              y + 0.5,
              z + 0.5
            );
            scene.add(c);
            meshes.push(c);
          }
        }

      }

  }

  if (activePiece) {
      for(let i= -1; i<2; i++){
          for(let j=-1; j<2; j++){
              if(activePiece.blocks[j + 1][i + 1]){
                  const c = new THREE.Mesh(cubeGeo, cubeMat);
                  c.position.set(
                    activePiece.position.x + i + 0.5,
                    activePiece.position.y + j + 0.5,
                    activePiece.position.z - 0.5
                  )
                  scene.add(c)
                  meshes.push(c)
              }
          }
      }
  }
}


const getColorBasedOnDepth = (depth) => {
  const color = new THREE.Color();
  color.setHSL(0.66 * (1 - (depth / (WELL_DEPTH - 1))), 1.0, 0.5);
  return color
}
