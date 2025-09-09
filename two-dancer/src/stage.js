import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const stage = new THREE.Group();

loader.load('./stage.glb', (gltf) => {
	stage.add(gltf.scene);
	gltf.scene.scale.set(50, 50, 50);

	gltf.scene.traverse((obj) => {
		obj.receiveShadow = true; // 开启阴影接收 --> 接受 dancer 投射的引用
	});
});

function loadDancer(cb, z, angle) {
	loader.load('./Michelle.glb', function (gltf) {
		cb(gltf.scene);

		stage.add(gltf.scene);
		gltf.scene.scale.set(300, 300, 300);
		gltf.scene.position.z = z;
		gltf.scene.rotateY(angle);

		gltf.scene.traverse((obj) => {
			obj.castShadow = true; // 开启阴影投射
		});

		{
			const mixer = new THREE.AnimationMixer(gltf.scene);
			const clipAction = mixer.clipAction(gltf.animations[0]);
			clipAction.play();
			const clock = new THREE.Clock();
			function render() {
				const delta = clock.getDelta();
				mixer.update(delta);

				requestAnimationFrame(render);
			}
			render();
		}
	});
}

loadDancer(
	(dancer) => {
		dancer.name = 'dancer1';
		dancer.traverse((obj) => {
			obj.target = dancer;
		});
	},
	200,
	Math.PI
);
loadDancer(
	(dancer) => {
		dancer.name = 'dancer2';
		dancer.traverse((obj) => {
			obj.target = dancer;
		});
		dancer.traverse((obj) => {
			if (obj.isMesh) {
				console.log(obj);
				obj.material = obj.material.clone(); // 修改前克隆一份防止是共用的材质导致污染
				obj.material.color.set('pink');
			}
		});
	},
	-200,
	0
);

export default stage;
