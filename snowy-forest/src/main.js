import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import mountainside from './mountainside.js'
import snow from './snow'
import { Tween, Easing } from '@tweenjs/tween.js'
import tube, { tubePoints } from './tube.js'

const scene = new THREE.Scene();

scene.add(mountainside);
scene.add(snow)
// scene.add(tube)

const directionLight = new THREE.DirectionalLight(0xffffff, 5);
directionLight.position.set(1000, 2000, 1000);
// 设置阴影投影
directionLight.castShadow = true;
directionLight.shadow.camera.left = -2000; // 4000 X 4000 的阴影投射范围覆盖整个mountainside范围
directionLight.shadow.camera.right = 2000;
directionLight.shadow.camera.top = 2000;
directionLight.shadow.camera.bottom = -2000;
directionLight.shadow.camera.near = 0.5;
directionLight.shadow.camera.far = 10000;
scene.add(directionLight);

// const cameraHelper = new THREE.CameraHelper(directionLight.shadow.camera);
// scene.add(cameraHelper);

// const axesHelper = new THREE.AxesHelper(1000)
// scene.add(axesHelper)

const { innerWidth: width, innerHeight: height } = window

const camera = new THREE.PerspectiveCamera(60, width / height, 100, 10000);
camera.position.set(1000, 300, 0);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)
renderer.shadowMap.enabled = true // 开启阴影渲染
renderer.setClearColor(new THREE.Color('blue'))

function tubeTraverAnimation(i = 0) {
    if (i < tubePoints.length - 1) {
        camera.position.copy(tubePoints[i])
        camera.lookAt(tubePoints[i + 1])
    }
}

function planeRotateAnimation() {
    const r = 1000
    const tween = new Tween({ angle: 0 })
        .to({ angle: 360 }, 240000)
        .repeat(Infinity)
        .easing(Easing.Quadratic.InOut)
        .onUpdate(obj => {
            camera.position.x = r * Math.cos(obj.angle)
            camera.position.z = r * Math.sin(obj.angle);
            camera.lookAt(0, 0, 0);
        })

    return tween
}
const rotateTween = planeRotateAnimation()
let i = 0
function render(time) {
    if (i < tubePoints.length - 1) {
        camera.position.copy(tubePoints[i])
        camera.lookAt(tubePoints[i + 1])
        i += 3
    } else {
        if (!rotateTween.isPlaying()) {
            rotateTween.start()
        }
    }

    rotateTween.update(time)
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);