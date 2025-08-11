import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import meshNumberRain from './mesh.js'

const scene = new THREE.Scene()
scene.add(meshNumberRain)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const { innerWidth: width, innerHeight: height } = window

const helper = new THREE.AxesHelper(1000)
scene.add(helper)

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000)
camera.position.set(width / 2, height / 2, 500)
camera.lookAt(width / 2, height / 2, 0)

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(width, height)

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

document.body.appendChild(renderer.domElement)

// const controls = new OrbitControls(camera, renderer.domElement)
