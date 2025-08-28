import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('../assets/foundation.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.set(0.001, 0.001);

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(900, 0);
shape.lineTo(900, 100);
shape.lineTo(600, 100);
shape.lineTo(600, 200);
shape.lineTo(300, 200);
shape.lineTo(300, 300);
shape.lineTo(0, 300);

const geometry = new THREE.ExtrudeGeometry(shape, { depth: 800 });
const material = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('gray'),
    map: texture,
    aoMap: texture,
});

const step = new THREE.Mesh(geometry, material);
export default step;