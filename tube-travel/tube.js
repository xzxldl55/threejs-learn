import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('../assets/tube.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.repeat.x = 5;
texture.colorSpace = THREE.SRGBColorSpace;

// 创建3D路径
const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100, 20, 90),
    new THREE.Vector3(-40, 80, 100),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(100, -40, 80),
    new THREE.Vector3(150, 60, 60)
]);

const geometry = new THREE.TubeGeometry(path, 100, 5, 32);

const material = new THREE.MeshBasicMaterial({
    map: texture,
    aoMap: texture,
    side: THREE.DoubleSide,
})

const mesh = new THREE.Mesh(geometry, material);

export const tubePoints = path.getPoints(999);

export default mesh;