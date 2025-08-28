import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';

{
	const listener = new THREE.AudioListener();
	const audio = new THREE.Audio(listener);
	const loader = new THREE.AudioLoader();
	loader.load('./superman.mp3', function (buffer) {
		audio.setBuffer(buffer);
		audio.setLoop(true); // 循环播放
		audio.play();
	});

	// document.body.addEventListener('click', () => {
	// 	if (audio.isPlaying) {
	// 		audio.pause();
	// 	} else {
	// 		audio.play();
	// 	}
	// });

	const gui = new GUI();
	const obj = {
		volume: 1,
		loop: true,
		playbackRate: 1,
		offset: 0,
		detune: 0,
		play() {
			audio.play();
		},
		pause() {
			audio.pause();
		},
	};
	gui.add(obj, 'volume', 0, 1).onChange((value) => {
		audio.setVolume(value);
	});
	gui.add(obj, 'playbackRate', [0.5, 1, 2]).onChange((value) => {
		audio.playbackRate = value;
		audio.pause();
		audio.play();
	});
	gui.add(obj, 'loop').onChange((value) => {
		audio.setLoop(value);
		audio.pause();
		audio.play();
	});
	gui.add(obj, 'offset', 0, 150).onChange((value) => { // 调整进度
		audio.offset = value;
		audio.pause();
		audio.play();
	});
	gui.add(obj, 'detune', 0, 1000).onChange((value) => { // 调整音高
		audio.detune = value;
		audio.pause();
		audio.play();
	});
	gui.add(obj, 'play');
	gui.add(obj, 'pause');
}

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(500, 400, 300);
scene.add(directionalLight);

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const { innerWidth: width, innerHeight: height } = window;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.set(500, 600, 800);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
	antialias: true,
});
renderer.setSize(width, height);

function render() {
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}
render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
