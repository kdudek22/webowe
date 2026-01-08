export const WELL_SIZE = 6;
export const WELL_DEPTH = 5;

export function createWell(scene) {
    // create the well geometry, it's centered around [0, 0, 0]
    const geo = new THREE.BoxGeometry(WELL_SIZE, WELL_SIZE, WELL_DEPTH);

    const wire = new THREE.EdgesGeometry(geo);
    const well = new THREE.LineSegments(wire, new THREE.LineBasicMaterial({ color: 0x00ffff }));

    well.position.z = -WELL_DEPTH / 2;
    scene.add(well);
}


