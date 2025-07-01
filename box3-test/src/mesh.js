import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

const mesh = new THREE.Group();

loader.load("./IridescenceSuzanne.glb", function (gltf) {
    gltf.scene.scale.setScalar(20);
    mesh.add(gltf.scene);

    // 可视化包围盒
    const helper = new THREE.BoxHelper(gltf.scene, 'pink');
    mesh.add(helper);

    // 计算包围盒大小
    const box = new THREE.Box3()
    box.expandByObject(gltf.scene) // 传入需要计算的模型
    const width = box.max.x - box.min.x // 使用最大/最小坐标进行计算即可得到长宽高
    const height = box.max.y - box.min.y
    const depth = box.max.z - box.min.z
    console.log('模型大小：', {
        width,
        height,
        depth
    })

    // 验证计算大小--创建一个大小一致的盒子
    const geometry = new THREE.BoxGeometry(width, height, depth)
    const material = new THREE.MeshBasicMaterial({
        color: 'red',
        transparent: true,
        opacity: 0.5
    })
    const redBox = new THREE.Mesh(geometry, material)
    mesh.add(redBox)

    // 给包围盒增加一层圆环
    const horMaxLen = Math.max(width, depth) // 取x/z最大边
    const circelGeometry = new THREE.RingGeometry(horMaxLen / 2, horMaxLen / 2 + 10)
    const circelMaterial = new THREE.MeshBasicMaterial({
        color: 'green',
        side: THREE.DoubleSide
    })
    const circel = new THREE.Mesh(circelGeometry, circelMaterial)
    mesh.add(circel)
    circel.rotateX(Math.PI / 2)
})

export default mesh;