import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import tube from './tube.js';
import mesh from './mesh-normal.js';

const scene = new THREE.Scene();
// scene.add(tube);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.set(500, 500, 500);
scene.add(directionLight);

const { innerWidth: width, innerHeight: height } = window;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);

function render (){
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);