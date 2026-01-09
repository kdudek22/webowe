import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.155/examples/jsm/controls/OrbitControls.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.155/build/three.module.js";


export function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(6,6,12);

    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x444444));
    const light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(5,10,5);
    scene.add(light);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0,0,-10);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return { scene, camera, renderer, controls };
}
