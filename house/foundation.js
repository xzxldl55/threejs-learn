import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('../assets/foundation.jpg');
texture.colorSpace = THREE.SRGBColorSpace;

// 地基
const geometry = new THREE.BoxGeometry(4000, 300, 3000);
const material = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('gray')
    map: texture,
    aoMap: texture,
});
const foundation = new THREE.Mesh(geometry, material);

export default foundation;