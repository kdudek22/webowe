const PIECES = [
    [[0,0,0],
     [1,0,0],
     [0,1,0],
     [1,1,0]],

    [[0,0,0]]
]


export function createPiece(scene) {
    const g = new THREE.Group();
    // Choose a random shape
    const blocks = PIECES[Math.floor(Math.random() * PIECES.length)]

    blocks.forEach(p => {
        const c = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshStandardMaterial({color: 0xff4444}));
        c.position.set(...p);
        g.add(c);
    });

    scene.add(g);
    return g;
}
