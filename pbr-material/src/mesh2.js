import * as THREE from 'three';
import textureCube from './bg.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const geometry = new THREE.DodecahedronGeometry(300);
const material = new THREE.MeshPhysicalMaterial({
	color: 'blue',
	metalness: 0, // 金属度
	roughness: 0.5, // 粗糙度 --> 会有一种磨砂质感
	envMap: textureCube, // 反射环境贴图
	transmission: 0.9, // 透射度
	ior: 1.9, // 非金属材料折射率
    clearcoat: 1, // 表面透明图层的强度 --> 表面喷漆质感(增加反射强度平整度, 越大反射感平滑感越强越像金属/喷漆，越小则越像塑料)
    clearcoatRoughness: 0.05, // 表面透明图层的粗糙度
});

const gui = new GUI();
gui.addColor(material, 'color');
gui.add(material, 'transmission', 0, 1);
gui.add(material, 'ior', 0, 2.33);
gui.add(material, 'clearcoat', 0, 1)
gui.add(material, 'clearcoatRoughness', 0, 1)

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
