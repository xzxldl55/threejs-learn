import * as THREE from 'three';
import textureCube from './bg';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';

const geometry = new THREE.CylinderGeometry(200, 200, 500);
const material = new THREE.MeshStandardMaterial({
	// color: 'orange',
	roughness: 0.1, // 粗糙程度[0, 1]
	metalness: 1, // 金属度[0, 1]
	envMapIntensity: 0.6, // 环境贴图强度[0, 5] 贴图反射的光亮强度
});

const mesh = new THREE.Mesh(geometry, material);

mesh.material.envMap = textureCube; // 设置环境贴图为背景贴图，实现物体反射背景的效果

const gui = new GUI();
gui.addColor(material, 'color').name('颜色');
gui.add(material, 'roughness', 0, 1).name('粗糙度');
gui.add(material, 'metalness', 0, 1).name('金属度');
gui.add(material, 'envMapIntensity', 0, 5).name('环境贴图强度');

export default mesh;
