import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import { GUI } from 'data-gui';

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(200);
// scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0);

const camera2 = new THREE.PerspectiveCamera(10, 16 / 9, 100, 300);
let cameraHelper = new THREE.CameraHelper(camera2); // 创建相机辅助器，可以观察到相机的具体视锥体
scene.add(cameraHelper);

function onChange() {
    scene.remove(cameraHelper);
    cameraHelper = new THREE.CameraHelper(camera2);
    scene.add(cameraHelper);
}

const gui = new GUI();
const cameraHelperFolder = gui.addFolder('cameraHelper');
cameraHelperFolder.add(camera2, 'fov', [10, 30, 60, 90]).onChange(onChange)
cameraHelperFolder.add(camera2, 'aspect', {
    '16/9': 16 / 9,
    '4/3': 4 / 3
}).onChange(onChange);
cameraHelperFolder.add(camera2, 'near', 0, 300).onChange(onChange);
cameraHelperFolder.add(camera2, 'far', 300, 1000).onChange(onChange);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
