import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import mesh from './mesh.js'

const scene = new THREE.Scene()
scene.add(mesh)

const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(500, 400, 300)
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const { innerWidth: width, innerHeight: height } = window

const axesHelper = new THREE.AxesHelper(500)
// scene.add(axesHelper)

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000)
camera.position.set(30, 0, 240)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(width, height)

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

document.body.append(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
