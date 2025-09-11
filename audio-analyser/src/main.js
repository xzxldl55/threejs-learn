import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.set(500, 400, 300);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const helper = new THREE.AxesHelper(500);
// scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
camera.position.set(0, 1000, 2000);
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

// 可视化音频
{
	const listener = new THREE.AudioListener();
	const audio = new THREE.Audio(listener);
	const audioLoader = new THREE.AudioLoader();
	audioLoader.load('./superman.mp3', (buffer) => {
		audio.setBuffer(buffer);
	});
	document.body.addEventListener('click', () => {
		return audio.isPlaying ? audio.pause() : audio.play();
	});

	// 使用 box 模拟可视化音频
	const group = new THREE.Group();
	for (let i = 0; i < 16; i++) {
		const geometry = new THREE.BoxGeometry(100, 500, 100);
		const material = new THREE.MeshPhongMaterial({
			// color: 'orange',
			vertexColors: true
		});
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.y = 250;
		mesh.position.x = i * 150;
		group.add(mesh);
	}
	group.position.x = -1500;
	group.position.y = -500;
	scene.add(group);

	// 使用 AudioAnalyser 分析音频得到音频数据
	const analyser = new THREE.AudioAnalyser(audio);
	function audioRender() {
		const data = analyser.getFrequencyData();
		const audioData = dealFrequencyData(data); // 将 1024 大小的数据分为 16 组便于显示
		updateBoxHeight(audioData);
		requestAnimationFrame(audioRender);
	}
	audioRender();

	// 将 1024 的数据分成 16 组，每组 64 个求均值
	function dealFrequencyData(data) {
		const newData = Array.from({ length: 16 }, (_, index) => []);
		for (let i = 0; i < data.length; i++) {
			newData[Math.floor(i / 64)].push(data[i]);
		}
		return newData.map((arr) => arr.reduce((pre, cur) => pre + cur, 0) / arr.length);
	}

	function updateBoxHeight(audioData) {
		for (let i = 0; i < 16; i++) {
			const box = group.children[i];
			const height = audioData[i] * 3;
			box.geometry.dispose(); // 先释放掉原来的几何题内存
			box.geometry = new THREE.BoxGeometry(100, height, 100);
			box.position.y = height / 2;

			// 根据高度设置渐变色
			const positions = box.geometry.attributes.position;
			const colorsArr = [];
			const color1 = new THREE.Color('red');
			const color2 = new THREE.Color('yellow');
			for (let i = 0; i < positions.count; i++) {
				const percent = positions.getY(i) / 300;
				const c = color1.clone().lerp(color2, percent);
				colorsArr.push(c.r, c.g, c.b);
			}
			const colors = new Float32Array(colorsArr);
			box.geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
		}
	}
}
