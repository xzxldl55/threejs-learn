import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import mesh from './mesh.js'
import mesh2 from './draco-mesh.js'

const scene = new THREE.Scene()
scene.add(mesh)
scene.add(mesh2)

const light = new THREE.DirectionalLight(0xffffff)
light.position.set(100, 100, 100)
scene.add(light)

const light2 = new THREE.AmbientLight()
scene.add(light2)

const axesHelper = new THREE.AxesHelper(1000)
scene.add(axesHelper)

const { innerWidth: width, innerHeight: height } = window

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000)
camera.position.set(10, 10, 10)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(width, height)

function render () {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
