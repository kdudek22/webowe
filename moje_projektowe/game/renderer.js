import { state, WELL_WIDTH, WELL_HEIGHT, WELL_DEPTH } from "./state.js";

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

export const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(8, 8, 14);

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
const wellGeo = new THREE.BoxGeometry(WELL_WIDTH, WELL_HEIGHT, WELL_DEPTH);
const wellWire = new THREE.EdgesGeometry(wellGeo);
const well = new THREE.LineSegments(wellWire, new THREE.LineBasicMaterial({ color: 0x00ffff }));
well.position.z = -WELL_DEPTH / 2;
scene.add(well);

/* cubes */
const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
const cubeMat = new THREE.MeshStandardMaterial({ color: 0xff4444 });

let meshes = [];

