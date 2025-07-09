import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import mesh from './mesh.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js'

const scene = new THREE.Scene()
scene.add(mesh)

const { innerWidth: width, innerHeight: height } = window

const directionLight = new THREE.DirectionalLight(0xffffff)
directionLight.position.set(500, 500, 500)
scene.add(directionLight)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(800)
scene.add(axesHelper)

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000)
camera.position.set(500, 500, 500)
camera.lookAt(0, 0, 0)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(width, height)
document.body.append(renderer.domElement)

/**
 * 添加后期处理
 */
const composer = new EffectComposer(renderer) // 该类管理了产生最终视觉效果的后期处理过程链。 后期处理过程根据它们添加/插入的顺序来执行，最后一个过程会被自动渲染到屏幕上。
const renderPass = new RenderPass(scene, camera) // 渲染 3D 场景
composer.addPass(renderPass)
const outlinePass = new OutlinePass(new THREE.Vector2(width, height), scene, camera)
composer.addPass(outlinePass) // 给选中的物体添加描边，选中后将物体添加到selectedObjects即可
outlinePass.visibleEdgeColor.set('orange') // 颜色
outlinePass.edgeStrength = 10 // 亮度
outlinePass.edgeThickness = 10 // 描边厚度
outlinePass.pulsePeriod = 2 // 描边闪烁频率
const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.4) // 发光
// composer.addPass(bloomPass)


function render () {
  // renderer.render(scene, camera)
  composer.render()
  requestAnimationFrame(render)
}
render()

const controls = new OrbitControls(camera, renderer.domElement)

renderer.domElement.addEventListener('click', (e) => {
  const y = -((e.offsetY / height) * 2 - 1);
  const x = (e.offsetX / width) * 2 - 1;

  const rayCaster = new THREE.Raycaster()
  rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

  // const arrowHelper = new THREE.ArrowHelper(rayCaster.ray.direction, rayCaster.ray.origin, 1000)
  // scene.add(arrowHelper)

  const intersections = rayCaster.intersectObjects(mesh.children)
  // intersections.forEach(item => {
  //   item.object.material.color = new THREE.Color('yellow')
  // })

  if (intersections.length) {
    // 高亮当前选中物体
    outlinePass.selectedObjects = intersections.map(v => v.object)

    if (!composer.passes.includes(bloomPass)) {
      composer.addPass(bloomPass)
    }
  } else {
    outlinePass.selectedObjects = []
    composer.removePass(bloomPass)
  }
})
