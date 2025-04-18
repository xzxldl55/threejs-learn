import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';

const scene = new THREE.Scene();

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