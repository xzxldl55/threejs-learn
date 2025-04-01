import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import { GUI } from 'data-gui';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(100, 100, 100); // 创建盒状几何体
const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('#ff00a2'),
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);

// 设置gui控制器，添加可配置范围：材质颜色，坐标位置
const gui = new GUI();
const meshFolder = gui.addFolder('立方体');
meshFolder.addColor(mesh.material, 'color').onChange(value => {
    console.log(value);
})
meshFolder.add(mesh.position, 'x').step(10);
meshFolder.add(mesh.position, 'y').step(10);
meshFolder.add(mesh.position, 'z').step(10);

const pointLight = new THREE.PointLight(0xffffff, 10000);
pointLight.position.set(80, 80, 80)
scene.add(pointLight);

// 设置gui控制器调节灯光
const lightFolder = gui.addFolder('灯光');
lightFolder.addColor(pointLight, 'color');
lightFolder.add(pointLight, 'intensity').step(1000);
lightFolder.add(pointLight.position, 'x').step(10);
lightFolder.add(pointLight.position, 'y').step(10);
lightFolder.add(pointLight.position, 'z').step(10);

{
    const obj = {
        param1: 'xzxldl',
        bool: false,
        num: 0,
        arr: 'opt1',
        objArr: 'Opt1',
        alert() {
            alert('点一下玩一年');
        }
    }
    const otherFolder = gui.addFolder('其他');
    otherFolder.add(obj, 'param1').onChange(value => {
        console.log(value);
    })
    otherFolder.add(obj, 'bool');
    otherFolder.add(obj, 'num').min(0).max(100).step(1);
    otherFolder.add(obj, 'arr', ['opt1', 'opt2', 'opt3'])
    otherFolder.add(obj, 'objArr', { Opt1: 0, Opt2: 1 })
    otherFolder.add(obj, 'alert');
}

const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(90, width / height, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
