import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import { GUI } from 'data-gui';
import mesh from './lathe.js';
import mesh2 from './tube.js';
import mesh3 from './shape.js';

const scene = new THREE.Scene();
// scene.add(mesh);
// scene.add(mesh2);
scene.add(mesh3);

// 切换到直射光
const directionLight = new THREE.DirectionalLight(0xffffff);
directionLight.position.set(100, 100, 100);
scene.add(directionLight);

// 增加环境光源：环境光会均匀的照亮场景中的所有物体(环境光不能用来投射阴影，因为它没有方向)。
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const { innerWidth: width, innerHeight: height } = window;

const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// GUI配置mesh2管道几何
{
    const tubeObj = {
        tubularSegments: mesh2.geometry.parameters.tubularSegments,
        radius: mesh2.geometry.parameters.radius,
        radialSegments: mesh2.geometry.parameters.radialSegments,
        closed: mesh2.geometry.parameters.closed,
    }
    const gui = new GUI();
    function onTubeChange() {
        mesh2.geometry = new THREE.TubeGeometry(
            mesh2.geometry.parameters.path,
            tubeObj.tubularSegments,
            tubeObj.radius,
            tubeObj.radialSegments,
            tubeObj.closed,
        );
    }
    gui.add(tubeObj, 'tubularSegments')
        .min(1).max(100).step(1).name('管道分段数').onChange(onTubeChange);
    gui.add(tubeObj, 'radius')
        .min(1).max(100).step(1).name('管道口径半径').onChange(onTubeChange);
    gui.add(tubeObj, 'radialSegments')
        .min(3).max(100).step(1).name('管道口径分段数').onChange(onTubeChange);
    gui.add(tubeObj, 'closed')
        .name('管道是否闭合').onChange(onTubeChange);
}