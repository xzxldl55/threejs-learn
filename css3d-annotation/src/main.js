import './style.css'
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import { CSS3DRenderer } from 'three/addons/Addons.js'
import mesh from './mesh.js';
import mesh2 from './mesh2.js'

const scene = new THREE.Scene();

scene.add(mesh2);

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
camera.position.set(0, 100, 1000);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(width, height)

function createCss3DRender(webGLRendererDom) {
  const css3dRender = new CSS3DRenderer()
  css3dRender.setSize(width, height)

  const div = document.createElement('div')
  div.style.position = 'relative'
  div.appendChild(css3dRender.domElement)
  css3dRender.domElement.style.position = 'absolute'
  css3dRender.domElement.style.left = '0px'
  css3dRender.domElement.style.top = '0px'
  css3dRender.domElement.style.pointerEvents = 'none'
  div.appendChild(webGLRendererDom)
  document.body.appendChild(div)

  return css3dRender
}

const css3dRender = createCss3DRender(renderer.domElement)

function render() {
  css3dRender.render(scene, camera)
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

// document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);