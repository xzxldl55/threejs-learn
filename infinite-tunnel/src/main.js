import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js';

const scene = new THREE.Scene();
scene.add(mesh);

const { innerWidth: width, innerHeight: height } = window;

const camera = new THREE.PerspectiveCamera(
    75,
    width / height,
    1,
    10000
);
camera.position.set(0.9, -520, 6.5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

let H = 0; // 通过改变色相来改变透明贴图的颜色
const clock = new THREE.Clock();
function render () {
    const delta = clock.getDelta(); // 获取每次渲染的时间间隔

    H += 0.002;
    if (H > 1) {
        H = 0;
    }
    mesh.material.color.setHSL(H, 0.5, 0.5); // 给材质上颜色与贴图融合

    mesh.material.alphaMap.offset.y += delta * 0.5; // 改变贴图的偏移量来模拟穿梭运动
    mesh.rotation.y += delta * 0.5;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);