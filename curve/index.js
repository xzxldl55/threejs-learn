import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import mesh from './ellipse.js';
import mesh2 from './spline.js';
import mesh3 from './bezier.js';
import mesh4 from './cubic-bezier.js';
import mesh5 from './curve-path.js';

const scene = new THREE.Scene();
// scene.add(mesh);
// scene.add(mesh2.point);
// scene.add(mesh2.line);
// scene.add(mesh3);
// scene.add(mesh4);
scene.add(mesh5);

const pointLight = new THREE.PointLight(0xffffff, 10000);
pointLight.position.set(200, 200, 200);
scene.add(pointLight);

const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

const { innerWidth: width, innerHeight: height } = window;
const camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

function render () {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)