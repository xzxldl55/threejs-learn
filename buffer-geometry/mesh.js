import * as THREE from 'three';

const geometry = new THREE.BufferGeometry(); // 自定义几何体

// 创建顶点数组
const vertices = new Float32Array([
    0, 0, 0,
    100, 0, 0,
    0, 100, 0,
    0, 100, 0,
    100, 0, 0,
    100, 100, 0
]);

// 使用顶点数组组成几何面，每3个顶点为一组进行组合
const attribute = new THREE.BufferAttribute(vertices, 3);

geometry.attributes.position = attribute;

const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#ff00a2')
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;