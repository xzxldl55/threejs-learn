import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';

const textureCube = new THREE.CubeTextureLoader().setPath('./').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

const loader = new GLTFLoader();
const mesh = new THREE.Group();

const gui = new GUI();
const body = gui.addFolder('车身');
const win = gui.addFolder('车窗');

loader.load('./car.glb', (gltf) => {
	console.log(gltf);
	mesh.add(gltf.scene);
	gltf.scene.scale.set(200, 200, 200);
	gltf.scene.traverse((obj) => {
		if (obj.isMesh) {
			if (obj.material.isMeshPhysicalMaterial) {
				obj.material.envMap = textureCube;
				obj.material.envMapIntensity = 2;
			}

            /**
             * 通过调节各项物理参数达到拟真效果
             */
			if (obj.name === '车窗') {
				// obj.material.color = new THREE.Color('transparent');
				console.log(obj.name, obj);
				obj.material.color.set('white');
				obj.material.transmission = 1; // 0.0 完全不透明，1.0 完全透明
				obj.material.ior = 1.3416;
                obj.material.metalness = 0.164 // 金属镀 --> 加一点有一种镀膜玻璃的感觉
				win.addColor(obj.material, 'color');
				win.add(obj.material, 'transmission', 0, 1);
				win.add(obj.material, 'ior', 1, 2.3);
				win.add(obj.material, 'metalness', 0, 1);
				win.add(obj.material, 'roughness', 0, 1);
			} else if (obj.name === '车身') {
				console.log(obj.name, obj);
				obj.material.metalness = 0.705;
				obj.material.roughness = 0.84;
				obj.material.clearcoat = 1;
				obj.material.clearcoatRoughness = 0.252;
				body.addColor(obj.material, 'color');
				body.add(obj.material, 'metalness', 0, 1);
				body.add(obj.material, 'roughness', 0, 1);
				body.add(obj.material, 'clearcoat', 0, 1);
				body.add(obj.material, 'clearcoatRoughness', 0, 1);
			} else if (obj.name === '底盘') {
				console.log(obj.name, obj);
			} else if (obj.name === '轮毂') {
				console.log(obj.name, obj);
			}
		}
	});
});

export default mesh;
