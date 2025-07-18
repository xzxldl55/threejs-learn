import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import mesh from './mesh.js'
import mesh2 from './mesh2.js'

const scene = new THREE.Scene()
// scene.add(mesh)
scene.add(mesh2)

const directionLight = new THREE.DirectionalLight(0xffffff, 2)
directionLight.position.set(500, 400, 300)
scene.add(directionLight)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const axesHelper = new THREE.AxesHelper(500)
scene.add(axesHelper)

const {innerWidth: width, innerHeight: height} = window

const camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 10000)
camera.position.set(300, 300, 300)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(width, height)

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera)
})

// function render () {
//   renderer.render(scene, camera)
//   requestAnimationFrame(render)
// }
// render()

document.body.append(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
