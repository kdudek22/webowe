import { state, WELL_WIDTH, WELL_HEIGHT, WELL_DEPTH } from "./state.js";

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

export const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 10);

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, -10);
controls.enableDamping = true;

scene.add(new THREE.AmbientLight(0x444444));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);


/* well */
/* well */
const wellGeo = new THREE.BoxGeometry(WELL_WIDTH, WELL_HEIGHT, WELL_DEPTH);

// Shift geometry so it starts at 0,0,0 and extends to its full size
wellGeo.translate(WELL_WIDTH / 2, WELL_HEIGHT / 2, WELL_DEPTH / 2);

const wellWire = new THREE.EdgesGeometry(wellGeo);
const well = new THREE.LineSegments(
  wellWire,
  new THREE.LineBasicMaterial({ color: 0x00ffff })
);

// Now the well starts at 0,0,0
scene.add(well);

const CUBE_SIZE = 1; // size of corner cubes

const cornerPositions = [
  [0, 0, 0], // top-front-left
  [3, 3, WELL_DEPTH], // top-front-right
  [0, WELL_HEIGHT, 0], // bottom-front-left
  [WELL_WIDTH, WELL_HEIGHT, 0] // bottom-front-right
];

// create corner cubes
cornerPositions.forEach(pos => {
  const cubeGeo = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
  const cubeMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const cube = new THREE.Mesh(cubeGeo, cubeMat);

  // position the cube (center it on the corner)
  cube.position.set(
    pos[0] - CUBE_SIZE / 2,
    pos[1] - CUBE_SIZE / 2,
    pos[2] - CUBE_SIZE / 2
  );

  scene.add(cube);
});




/* cubes */
const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
const cubeMat = new THREE.MeshStandardMaterial({ color: 0xff4444 });

let meshes = [];

export function renderState(activePiece) {
  meshes.forEach(m => scene.remove(m));
  meshes = [];

  for (let z = 0; z < WELL_DEPTH; z++)
    for (let y = 0; y < WELL_HEIGHT; y++)
      for (let x = 0; x < WELL_WIDTH; x++)
        if (state[z][y][x]) {
          const c = new THREE.Mesh(cubeGeo, cubeMat);
          c.position.set(
            x - 0.5,
            y - 0.5,
            z + 0.5, // here we add 0.5 for indexing :)
          );
          scene.add(c);
          meshes.push(c);
        }

  if (activePiece) {
      for(let i= -1; i<2; i++){
          for(let j=-1; j<2; j++){
              if(activePiece.blocks[j + 1][i + 1]){
                  const c = new THREE.Mesh(cubeGeo, cubeMat);
                  c.position.set(
                    activePiece.position.x + i - 0.5,
                    activePiece.position.y + j - 0.5,
                    activePiece.position.z - 0.5
                  )
                  scene.add(c)
                  meshes.push(c)
              }
          }
      }
  }
}
