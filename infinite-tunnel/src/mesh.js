import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('./storm.jpg');
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(1, 2);

const geometry = new THREE.CylinderGeometry(30, 50, 1000, 32, 32, true); // 空心圆柱

const material = new THREE.MeshBasicMaterial({
    side: THREE.BackSide, // 单面内部可见
    alphaMap: texture,
    transparent: true,
});

const tunnel = new THREE.Mesh(geometry, material);

export default tunnel;