import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js';
import mesh2 from './mesh2.js';
import textureCube from './bg.js';

const scene = new THREE.Scene();
scene.background = textureCube; // 设置全景背景图
// scene.add(mesh);
scene.add(mesh2);

const { innerWidth: width, innerHeight: height } = window;

const AmbientLight = new THREE.AmbientLight(0xffffff);
scene.add(AmbientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(500, 600, 800);
scene.add(directionalLight);

const axesHelper = new THREE.AxesHelper(500);
// scene.add(axesHelper);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
camera.position.set(500, 600, 800);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
	antialias: true,
});
renderer.setSize(width, height);

document.body.append(renderer.domElement);

function render() {
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}
render();

const controls = new OrbitControls(camera, renderer.domElement);
