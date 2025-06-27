import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import mesh from './mesh.js'

const scene = new THREE.Scene()
scene.add(mesh)

const directionLight = new THREE.DirectionalLight(0xffffff)
directionLight.position.set(100, 100, 100)
scene.add(directionLight)

// const ambLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambLight)

const helper = new THREE.AxesHelper(1000)
scene.add(helper)

const { innerWidth: width, innerHeight: height } = window

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000)
camera.position.set(100, 100, 100)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({
    antialias: true
})
renderer.setSize(width, height)

function render (){
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render()

document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)