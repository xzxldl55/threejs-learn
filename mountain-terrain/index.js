import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import mesh, { updatePosition } from './mesh.js'

const scene = new THREE.Scene();

scene.add(mesh);

const { innerWidth: width, innerHeight: height } = window;

const camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
camera.position.set(450, 150, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer() ;
renderer.setSize(width, height);

function render() {
    updatePosition(); // 每帧都更新一下mesh，构造山脉起伏的效果
    mesh.rotateZ(0.001); // 不断转动以展示效果
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);