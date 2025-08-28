import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/Addons.js'; // 噪声插件已在 Three 包中内置了，可以直接引用

const geometry = new THREE.PlaneGeometry(3000, 3000, 200, 200);

const noise = new SimplexNoise();

const positions = geometry.attributes.position;

for (let i = 0; i < positions.count; i++) {
	const x = positions.getX(i);
	const y = positions.getY(i);

	let z = noise.noise(x / 1000, y / 1000) * 300; // 根据 x，y 来使用噪声算法计算连续的 z 位置（z 会根据 x，y 位置来随机，确保随机的噪声具有在 x，y 上的连续性而不会太突兀）
	z += noise.noise(x / 400, y / 400) * 100; // 添加多层噪，使得更加崎岖
	z += noise.noise(x / 200, y / 200) * 50;
	positions.setZ(i, z);
}

const material = new THREE.MeshBasicMaterial({
	color: new THREE.Color('orange'),
	wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-Math.PI / 2);

export default mesh;
