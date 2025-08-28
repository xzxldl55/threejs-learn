import './style.css'
import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js';
import mesh2 from './mesh2.js'
import dynamicGenRay from './dynamic-gen-ray.js';

const scene = new THREE.Scene();

// scene.add(mesh);
scene.add(mesh2)


const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(500, 400, 300);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(500, 500, 500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(width, height)

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

/**
 * 3D场景中，选中物体的原理
 * ThreeX = (mouseX / windowWidth) * 2 - 1
 * 这里three的坐标是正常数学的坐标系，即0,0在中间，右上为正坐标轴方向，且需要限定在[-1, 1]
 * 而屏幕坐标是以左上角为坐标原点，右下为正坐标轴方向，故此
 * 进行坐标转换需要：
 * ① 首先用 offsetX / width：获取当前屏幕坐标位置在整个屏幕宽度的占比
 * ② 接着，进行归一化到[-1, 1]，先将上述比例 * 2，得到范围[0, 2]，再-1，得到范围[-1, 1]
 * ③ 同理可得 Y 的three坐标，但需要注意，屏幕坐标和three坐标的Y轴正轴方向是相反的，所以要对结果进行取负
 * 
 * 如此，通过点击屏幕可以获得three的射线需要的坐标位置，通过射线检测与物体是否相交，来对用户点击进行再3D环境的模拟
 */
renderer.domElement.addEventListener('click', (e) => {
  const x = (e.offsetX / width) * 2 - 1; // 将坐标限定到-1 ~ 1范围
  const y = -(e.offsetY / height) * 2 + 1; // 这里取反，因为网页的坐标系向下是正值

  // 这里通过点击创建射线 --> 再检测射线是否与物体香蕉，从而能够通过点击来获取被点击的物体（这里我们是修改颜色）
  dynamicGenRay(x, y, camera, mesh2)
})