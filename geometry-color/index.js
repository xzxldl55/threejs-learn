import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import {
    mesh,
    line,
    points
} from './mesh.js';

const scene = new THREE.Scene();
// scene.add(line);
scene.add(mesh);
scene.add(points);

const axesHelper = new THREE.AxesHelper(500);
// scene.add(axesHelper);

const { innerWidth: width, innerHeight: height } = window;
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.set(300, 300, 500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);

function render(){
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);