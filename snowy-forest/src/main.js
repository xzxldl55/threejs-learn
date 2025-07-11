import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import mountainside from './mountainside.js'
import snow from './snow'

const scene = new THREE.Scene();

scene.add(mountainside);
scene.add(snow)

const directionLight = new THREE.DirectionalLight(0xffffff, 5);
directionLight.position.set(1000, 2000, 1000);
// 设置阴影投影
directionLight.castShadow = true;
directionLight.shadow.camera.left = -2000; // 4000 X 4000 的阴影投射范围覆盖整个mountainside范围
directionLight.shadow.camera.right = 2000;
directionLight.shadow.camera.top = 2000;
directionLight.shadow.camera.bottom = -2000;
directionLight.shadow.camera.near = 0.5;
directionLight.shadow.camera.far = 10000;
scene.add(directionLight);

// const cameraHelper = new THREE.CameraHelper(directionLight.shadow.camera);
// scene.add(cameraHelper);

// const axesHelper = new THREE.AxesHelper(1000)
// scene.add(axesHelper)

const { innerWidth: width, innerHeight: height } = window

const camera = new THREE.PerspectiveCamera(60, width / height, 100, 10000);
camera.position.set(300, 300, 500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)
renderer.shadowMap.enabled = true // 开启阴影渲染
renderer.setClearColor(new THREE.Color('blue'))

let angle = 0;
let r = 1000;
function render() {
    angle += 0.01;

    camera.position.x = r * Math.cos(angle);
    camera.position.z = r * Math.sin(angle);

    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);