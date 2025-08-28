import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import point from './point.js';
import line from './line.js'
import mesh from './mesh.js'
import mesh2 from './mesh2.js'
import mesh3 from './mesh3.js';

const scene = new THREE.Scene();
scene.add(point);
scene.add(line);
scene.add(mesh);
scene.add(mesh2);
scene.add(mesh3)

const pointLight = new THREE.PointLight(0xffffff, 10000);
pointLight.position.set(80, 80, 80);
scene.add(pointLight);

const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

const { innerWidth: width, innerHeight: height } = window;

const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement);