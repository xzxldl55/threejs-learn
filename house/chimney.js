import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('../assets/foundation.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.set(0.001, 0.001);

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(300, 0);
shape.lineTo(300, 300);
shape.lineTo(0, 300);

const hole = new THREE.Path();
hole.moveTo(50, 50);
hole.lineTo(250, 50);
hole.lineTo(250, 250);
hole.lineTo(50, 250);

shape.holes.push(hole);

const geometry = new THREE.ExtrudeGeometry(shape, { depth: 3200 });
const material = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('lightgray'),
    map: texture,
    aoMap: texture,
});

const chimney = new THREE.Mesh(geometry, material);

export default chimney;