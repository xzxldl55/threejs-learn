import * as THREE from 'three';

function createMesh(color, x) {
    const geometry = new THREE.DodecahedronGeometry(1);
    const material = new THREE.MeshBasicMaterial({
        color: color
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = x;
    return mesh;    
}

const loader = new THREE.TextureLoader()
function createSprite(x, y) {
    const texture = loader.load('./Sprite.png')
    const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        color: 'pink'
    })
    const sprite = new THREE.Sprite(spriteMaterial)
    sprite.position.set(x, y)
    return sprite
}

const mesh = createMesh('orange', 0);
const mesh2 = createMesh('skyblue', 5);
const mesh3 = createMesh('lightgreen', -5);
const sp1 = createSprite(0, 1.5)
const sp2 = createSprite(5, 1.5)
const sp3 = createSprite(-5, 1.5)

const group = new THREE.Group();
group.add(mesh);
group.add(mesh2);
group.add(mesh3);
group.add(sp1)
group.add(sp2)
group.add(sp3)

export default group;