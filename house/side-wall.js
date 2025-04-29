import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('../assets/red-wall.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.set(0.001, 0.001);

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, 2000);
shape.lineTo(-1500, 3000);
shape.lineTo(-3000, 2000);
shape.lineTo(-3000, 0);

const windowPath = new THREE.Path();
windowPath.moveTo(-800, 600);
windowPath.lineTo(-800, 1600);
windowPath.lineTo(-2200, 1600);
windowPath.lineTo(-2200, 600);
shape.holes.push(windowPath);

const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 200
});

const material = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('lightgray')
    map: texture,
    aoMap: texture,
});

const sideWall = new THREE.Mesh(geometry, material);

export default sideWall;