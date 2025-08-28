import './style.css'
import * as THREE from 'three'
import {
  OrbitControls
} from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import mesh from './mesh.js'

const gui = new GUI();

const { innerWidth: width, innerHeight: height } = window

const scene = new THREE.Scene()
scene.add(mesh)

const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);

// 切换不同的光源，阴影相机不同
// const light = new THREE.light(0xffffff); // 阴影为正投相机投影
const light = new THREE.PointLight(0xffffff, 1000000); // 点光源阴影投影为透视相机投影
// const light = new THREE.SpotLight(0xffffff, 1000000) // 聚光灯阴影投影为透视相机投影
light.position.set(1000, 1000, 500);
scene.add(light);
light.castShadow = true;
console.log(light.shadow.camera) // 查看阴影范围 --> 一个正投相机（平行光是正投相机，点光、聚光灯则是透视相机），默认很小，所以看不到阴影
// 调整阴影正投相机的显示范围，使得要显示阴影的物体能够在范围内即可展示阴影
light.shadow.camera.left = -500
light.shadow.camera.right = 500
light.shadow.camera.top = 500
light.shadow.camera.bottom = -500
light.shadow.camera.near = 0.1
light.shadow.camera.far = 10000

gui.add(light.position, 'x', 0, 10000);
gui.add(light.position, 'y', 0, 10000);
gui.add(light.position, 'z', 0, 10000);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(1000, 2000, 1000);
camera.lookAt(0, 0, 0);
// 使用正交投影相机
// const aspectRatio = width / height // 屏幕比例
// const num = 500 // 相机高度 / 2
// // 设定相机取景范围
// const camera2 = new THREE.OrthographicCamera(
//   -num * aspectRatio, // left
//   num * aspectRatio, // right
//   num, // top
//   -num, // bottom
//   0.1,
//   1000
// )
// camera2.position.set(400, 200, 300);
// camera2.lookAt(0, 0, 0);
// const camera2Helper = new THREE.CameraHelper(camera2); // 辅助查看正投相机投影
// scene.add(camera2Helper);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(width, height)
renderer.shadowMap.enabled = true; // 开启阴影

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);


