import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import mesh from './uv.js';
import meshAnimate from './uv-animate.js';

const scene = new THREE.Scene();

scene.add(meshAnimate);

const axesHelper = new THREE.AxesHelper(200);
// scene.add(axesHelper);

const pointLight = new THREE.PointLight(0xffffff, 10000);
pointLight.position.set(100, 100, 100)
scene.add(pointLight);

const { innerHeight: height, innerWidth: width } = window;

const camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(width, height);

function render() {
    meshAnimate.material.map.offset.x += 0.001; // 让纹理贴图进行位移，结合texture.wrapT[S]进行重复贴图实现无限滚动
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);