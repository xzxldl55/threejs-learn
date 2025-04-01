import * as THREE from 'three';
import {
  OrbitControls
} from 'orbitcontrols'

const scene = new THREE.Scene();

// 1. 添加简单几何体到场景中
{
  // /几啊么趣/
  const geometry = new THREE.BoxGeometry(100, 100, 100); // 创建盒状几何体
  // 创建漫反射材质，设定为橙色
  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('orange'),
  });

  // 使用形状和材质构成一个 Mesh 物体
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
}

// 2. 添加光源
{
  // 添加点光源，颜色为白色，强度10000
  const pointLight = new THREE.PointLight(0xffffff, 10000);
  pointLight.position.set(80, 80, 80);
  scene.add(pointLight);
}

// 3. 添加坐标轴辅助器，显示三个坐标轴
{
  const axesHelper = new THREE.AxesHelper(200); // 坐标轴长度设为200
  scene.add(axesHelper);
}

// 4. 添加相机
{
  const width = window.innerWidth;
  const height = window.innerHeight;

  console.log(width, height)

  // 创建透视相机，参数定义了相机视锥体（视锥体角度【从视图底部到顶部角度，即视角范围】，视锥体宽高比，相机近端面，相机远端面）
  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  camera.position.set(200, 200, 200) // 相机位置设置
  camera.lookAt(0, 0, 0) // 相机看向 0，0，0坐标

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height)

  // 循环渲染（帧间一次）
  function render() {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  render();

  document.body.append(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement); // 添加控制器，可以进行相机移动（本质上是监听鼠标移动，来更新相机位置）

  // 更新相机和渲染器比例、尺寸
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.render(scene, camera)
  })
}
