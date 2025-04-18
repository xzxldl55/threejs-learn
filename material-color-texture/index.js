import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import mesh from './mesh.js';
import mesh2 from './mesh2.js';
import mesh3 from './mesh3.js';
import mesh4 from './mesh4.js';

const scene = new THREE.Scene();

scene.add(mesh3);

const axesHelper = new THREE.AxesHelper(200);
// scene.add(axesHelper);

const pointLight = new THREE.PointLight(0xffffff, 10000);
pointLight.position.set(100, 100, 100)
scene.add(pointLight);

const { innerHeight: height, innerWidth: width } = window;

const camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
camera.position.set(90, 230, 1175);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);