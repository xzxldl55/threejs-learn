import './style.css';
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh';
import { Easing, Tween, Group } from '@tweenjs/tween.js'

const scene = new THREE.Scene();
scene.add(mesh)

const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.set(500, 400, 300);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const helper = new THREE.AxesHelper(1000);
scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
camera.position.set(500, 600, 800);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

const tween = new Tween(mesh.position)
  .to({ x: 400 }, 1000)
  .easing(Easing.Quadratic.InOut)
  .repeat(0)
  // .start()

const tween2 = new Tween(mesh.rotation)
  .to({ x: Math.PI * 2 }, 1000)
  .easing(Easing.Bounce.Out)
  .repeat(0)
  // .start()

const tweenGroup = new Group()
tweenGroup.add(tween, tween2)

// 使用t.chain(t)来串行执行补间动画，先移动在旋转
tween.chain(tween2).start()
function render() {
  tweenGroup.update()
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);