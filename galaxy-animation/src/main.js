import './style.css'
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import stars from './star'


function initThreeEnv() {
  const scene = new THREE.Scene()

  const { innerWidth: width, innerHeight: height } = window

  const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 10000)
  camera.position.set(7, 12, 15)

  const renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(width, height)

  document.body.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true;

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };
  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  const stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.domElement);

  return {
    scene,
    renderer,
    camera,
    controls,
    stats
  }
}

const { scene, renderer, camera, controls, stats } = initThreeEnv()

scene.add(stars)

function render () {
  stats.begin()
  controls.update()
  stars.geometry.rotateY(0.001 * 1)
  stats.end()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()