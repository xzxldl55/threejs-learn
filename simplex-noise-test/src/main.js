import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js';
import mesh2 from './mesh2.js'

const scene = new THREE.Scene();
scene.add(mesh2);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(500, 400, 300);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);

const { innerWidth: width, innerHeight: height } = window;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(800, 1000, 1500);
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

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
