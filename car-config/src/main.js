import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js';

const scene = new THREE.Scene();
scene.add(mesh);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(400, 500, 800);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(1000);
// scene.add(axesHelper);

const { innerWidth: width, innerHeight: height } = window;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.set(400, 500, 800);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
	antialias: true,
});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

function render() {
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}
render();

const controls = new OrbitControls(camera, renderer.domElement);

window.onresize = function () {
	const { innerWidth: width, innerHeight: height } = window;
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
};
