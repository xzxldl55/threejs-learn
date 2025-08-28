import './style.css'
import * as THREE from 'three'
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js';
import mesh2 from './mesh2.js'
import mesh3 from './mesh3.js'

const scene = new THREE.Scene();

// scene.add(mesh);
scene.add(mesh2)
scene.add(mesh3)

const axesHelper = new THREE.AxesHelper(50);
// scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 100, 10000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);