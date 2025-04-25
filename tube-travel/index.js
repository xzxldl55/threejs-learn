import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import mesh, { tubePoints } from './tube.js';

const scene = new THREE.Scene();
scene.add(mesh);

const pointLight = new THREE.PointLight(0xffffff, 10000);
pointLight.position.set(80, 80, 80);
scene.add(pointLight);

const axesHelper = new THREE.AxesHelper(200);
// scene.add(axesHelper);

const { innerWidth: width, innerHeight: height } = window;

const camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

let i = 0;
function render() {
    // 从管道曲线中取 1000 个点，每次渲染时移动相机位置到一个点上，并看向下一个点，如此形成管道穿梭的效果
    if (i < tubePoints.length) {
        camera.position.copy(tubePoints[i]);
        camera.lookAt(tubePoints[i + 1]);
        // i++; // 修改为使用键盘下键操纵
    } else {
        i = 0;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// 使用键盘操纵
{
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            i += 1;
        }
    })
}

render();

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
