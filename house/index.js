import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import house from './house.js';
import ground from './ground.js';

const scene = new THREE.Scene();
scene.add(house);
scene.add(ground);
scene.fog = new THREE.Fog(0xcccccc, 1000, 40000);

// 平行光源:平行光是沿着特定方向发射的光。这种光的表现像是无限远，从它发出的光线都是平行的。常常用平行光来模拟太阳光的效果。 太阳足够远，因此我们可以认为太阳的位置是无限远，所以我们认为从太阳发出的光线也都是平行的。
const directionLight = new THREE.DirectionalLight(0xffffff);
directionLight.position.set(3000, 3000, 3000);
scene.add(directionLight);

// 环境光源
const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(10000);
// scene.add(axesHelper);

const { innerWidth: width, innerHeight: height } = window;

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000000);
camera.position.set(5000, 5000, 5000);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    logarithmicDepthBuffer: true, // 开启对数深度缓冲
});
renderer.setSize(width, height);
renderer.setClearColor(new THREE.Color('skyblue'));


let angle = 0;
let r = 5000; // Y轴线（0, 5000, 0）为圆心，固定5000半径，绕Y轴旋转，根据角度和半径计算出相机的x和z坐标
function render() {
    angle += 0.02;

    /**
     * 根据三角函数，我们有
     * sin(angle) = z / y(r)
     * cos(angle) = x / y(r)
     * 
     * 所以：
     */
    // 每绕一周随机一下绕圈的半径，并随机一下Y的高度
    if (angle > Math.PI * 2) { // 绕Y轴一周
        angle -= Math.PI * 2; // 减去2π，回到原点;

        r = Math.random() * 10000 + 5000; // 随机半径

        camera.position.y = 1000 + Math.random() * 10000; // 随机高度
    }
    camera.position.x = r * Math.cos(angle);
    camera.position.z = r * Math.sin(angle);

    camera.lookAt(0, 0, 0); // 让相机一直看着Y轴

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
