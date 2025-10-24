import * as THREE from 'three';
import textureCube from './bg.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const geometry = new THREE.DodecahedronGeometry(300);
const material = new THREE.MeshPhysicalMaterial({
	color: 'blue',
	metalness: 0, // 金属度
	roughness: 0, // 粗糙度
	envMap: textureCube, // 反射环境贴图
	transmission: 0.9, // 透射度
	ior: 1.9, // 非金属材料折射率
});

const gui = new GUI();
gui.addColor(material, 'color');
gui.add(material, 'transmission', 0, 1);
gui.add(material, 'ior', 0, 2.33);

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
