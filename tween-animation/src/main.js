import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import mesh from './mesh.js'
import { Tween, Easing } from '@tweenjs/tween.js'


const scene = new THREE.Scene()
scene.add(mesh)

const directionLight = new THREE.DirectionalLight(0xffffff)
directionLight.position.set(100, 200, 300)
scene.add(directionLight)

const lightHelper = new THREE.DirectionalLightHelper(directionLight, 10)
scene.add(lightHelper)

const axesHelper = new THREE.AxesHelper(1000)
scene.add(axesHelper)

const { innerWidth: width, innerHeight: height } = window

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000)
camera.position.set(300, 300, 300)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(width, height)

// 使用补间动画对物体进行缓动
// const tween = new Tween(mesh.position)
//   .to({
//     x: 150,
//     y: 150,
//   }, 1000)
//   .easing(Easing.Quadratic.InOut)
//   .start()
// 补间动画实现相机旋转
const r = 300
camera.position.y = 150
const tween = new Tween({ angle: 0 })
  .to({ angle: Math.PI * 2 }, 5000)
  .onUpdate(obj => {
    console.log(obj.angle)
    camera.position.x = r * Math.cos(obj.angle)
    camera.position.z = r * Math.sin(obj.angle)

    camera.lookAt(0, 0, 0)
  })
  .easing(Easing.Quadratic.InOut)
  .repeat(Infinity)
  .start()
function render(time) {
  tween.update(time)

  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)