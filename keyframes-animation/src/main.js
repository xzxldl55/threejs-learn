import './style.css'
import * as THREE from 'three'
import {
  OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js';
import horse from './horse.js';

const scene = new THREE.Scene();
// scene.add(mesh);
scene.add(horse)

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
camera.position.set(300, 300, 500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

function createNormalBoxAnimation() {
  // 关键帧动画
  mesh.name = 'Box'
  const times = [0, 2, 5] // 定义了在0，2，5秒的关键帧的位置值构成关键帧动画
  const values = [
    0, 0, 0,
    0, 100, 0,
    0, 0, -100
  ]
  const track = new THREE.KeyframeTrack('Box.position', times, values); // 定义动画轨迹：位移，这里上面给模型定义了名字Box，所以使用Box.position表示关键帧动画应用到Box的位置属性上
  const track2 = new THREE.KeyframeTrack('Box.scale', [0, 1, 4], [
    1, 1, 1,
    1, 2, 1,
    1, 0.5, 1
  ]); // 定义动画：缩放
  
  const clip = new THREE.AnimationClip("hello", 5, [track, track2]); // 定义动画片段：一个动画片段可以由多个关键帧轨道（动画轨道）组成
  const mixer = new THREE.AnimationMixer(mesh); // 定义动画混合器：将动画片段应用到模型上
  const clipAction = mixer.clipAction(clip); // 定义动画动作：将动画片段应用到模型上

  return {
    mixer,
    clipAction
  }
}

const { mixer, clipAction } = createNormalBoxAnimation()
clipAction.play()

const clock = new THREE.Clock()
function render() {
  const detla = clock.getDelta()
  // mixer.update(detla)

  renderer.render(scene, camera);
  requestAnimationFrame(render);

}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
