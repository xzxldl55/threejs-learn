import './style.css'
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshPhongMaterial({
  color: 'orange'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.set(500, 400, 300);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const helper = new THREE.AxesHelper(500);
scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
camera.position.set(500, 600, 800);
camera.lookAt(-373, -160, -257);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(width, height)

const controls = new OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true // 配合controls.update()自动水平旋转相机，默认转一周 30s
controls.autoRotateSpeed = 10 // 设置自动旋转速度 X 10
controls.enableDamping = true // 设置拖动惯性
// controls.enableRotate = false; // 禁用旋转
// controls.enablePan = false; // 禁用平移
controls.enableZoom  = false; // 禁用缩放
// 修改鼠标默认操作
controls.mouseButtons = {
    RIGHT: THREE.MOUSE.ROTATE, // 右键改成旋转 
    LEFT: THREE.MOUSE.PAN // 左键改成平移
}
controls.maxPolarAngle  = Math.PI /2; // 修改旋转范围，改成180°，这样不能转到地底下去

// 监听相机的变化，相机位置是 camra.position 相机焦点是 controls.target
controls.addEventListener('change', () => {
  console.log(camera.position, controls.target);
})

// 设置控制器焦点（同步相机和控制器焦点，否则控制器默认焦点会重置相机的焦点）
controls.target.set(-373, -160, -257);

function render() {
  controls.update()
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);
