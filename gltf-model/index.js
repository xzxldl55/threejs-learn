import * as THREE from 'three'
import { OrbitControls } from 'orbitcontrols'
import mesh from './mesh.js'

const scene = new THREE.Scene()
scene.add(mesh)

const light = new THREE.DirectionalLight(0xffffff)
light.position.set(100, 100, 100)
scene.add(light)

const axesHelper = new THREE.AxesHelper(1000)
scene.add(axesHelper)

const { innerWidth: width, innerHeight: height } = window

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000)
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

document.body.append(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
