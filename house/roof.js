import * as THREE from 'three';
import { GUI } from 'data-gui';

const loader = new THREE.TextureLoader();
const texture = loader.load('../assets/roof.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.set(2, 1);

// 斜边最小是1802
const geometry = new THREE.BoxGeometry(4200, 2141, 200);
const material = new THREE.MeshLambertMaterial({
    map: texture,
    aoMap: texture,
});

const roof = new THREE.Mesh(geometry, material);

roof.position.y = 2700;
roof.rotation.x = 56.3 / 180 * Math.PI;
roof.position.z = -835;

export default roof;
