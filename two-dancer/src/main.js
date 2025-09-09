import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import stage from './stage.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { Tween, Group, Easing } from 'three/examples/jsm/libs/tween.module.js';

const scene = new THREE.Scene();
scene.add(stage);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(500, 400, 300);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// 聚光灯
const spotLight = new THREE.SpotLight('white', 5000000);
spotLight.angle = Math.PI / 6;
spotLight.position.set(0, 1000, 0);
spotLight.lookAt(0, 0, 0);
scene.add(spotLight);
spotLight.castShadow = true; // 聚光灯投射阴影
spotLight.shadow.camera.far = 10000; // 增大阴影相机可视远点范围，以显示阴影

const cameraHelper = new THREE.CameraHelper(spotLight.shadow.camera); // 可视化阴影相机
// scene.add(cameraHelper);

const axesHelper = new THREE.AxesHelper(500);
// scene.add(axesHelper);

const { innerWidth: width, innerHeight: height } = window;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.set(600, 600, 800);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const render = () => {
	renderer.render(scene, camera);
	requestAnimationFrame(render);
};
render();

const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
	const width = window.innerWidth;
	const height = window.innerHeight;

	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});

// 滤镜使用 + 相机镜头旋转
{
	const composer = new EffectComposer(renderer);
	const renderPass = new RenderPass(scene, camera);
	composer.addPass(renderPass);

	const glitchPass = new GlitchPass(); // 闪屏效果
	composer.addPass(glitchPass);

	// 增加描边效果
	const v = new THREE.Vector2(width, height);
	const outlinePass = new OutlinePass(v, scene, camera);
	outlinePass.edgeStrength = 10;
	outlinePass.edgeThickness = 10;
	outlinePass.pulsePeriod = 1;
	composer.addPass(outlinePass);

	// 添加点击交互，点击对应 dancer 后镜头聚焦到对应人物并高亮描边
	renderer.domElement.addEventListener('click', (e) => {
		const y = -((e.offsetY / height) * 2 - 1); // 归一化坐标系
		const x = (e.offsetX / width) * 2 - 1;

		const rayCaster = new THREE.Raycaster();
		rayCaster.setFromCamera(new THREE.Vector2(x, y), camera); // 射线从相机出发，射向鼠标点击位置

		const intersections = rayCaster.intersectObjects(stage.children); // 检查射线与舞台上物体是否存在交点

		const set = new Set();
		intersections.forEach((item) => {
			if (item.object.target) {
				set.add(item.object.target); // 将人物整体作为一个整体加入到点击物体
			}
		});
		outlinePass.selectedObjects = set.size ? [...set].slice(0, 1) : []; // 设置 outlinePass 的选中物体，选中后添加描边特效

		const selectedDancer = [...set].slice(0, 1)[0];
		if (selectedDancer) {
			const isDancerOne = selectedDancer.name === 'dancer1';
			tweenMove(isDancerOne ? { x: 24, y: 955, z: -580 } : { x: 42, y: 1008, z: 479 });
		}
	});

	const group = new Group();
	function tweenMove(position) {
		const tween = new Tween(camera.position)
			.to(position, 500)
			.repeat(0)
			.easing(Easing.Quadratic.InOut)
			.onUpdate((obj) => {
				camera.lookAt(0, 0, 0); // 每一帧都矫正一下相机看向的位置
			})
			.start();
		group.add(tween);
	}

	function render() {
		group.update();
		composer.render();
		requestAnimationFrame(render);
	}
	render();
}

// 音乐播放
const listener = new THREE.AudioListener();
const audio = new THREE.Audio(listener);
const loader = new THREE.AudioLoader();
loader.load('./superman.mp3', (buffer) => {
	audio.setBuffer(buffer);
});
document.body.addEventListener('click', () => {
	if (!audio.isPlaying) {
		audio.setLoop(true);
		audio.setVolume(1);
		audio.play();
	}
});
