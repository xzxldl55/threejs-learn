import * as THREE from 'three';

const geometry = new THREE.BufferGeometry(); // 自定义几何体

// 创建顶点数组: 重复的顶点可以省略，然后用index索引进行指定
const vertices = new Float32Array([
    0, 0, 0,
    0, 100, 0,
    0, 0, 100,
    // 下面这两个顶点是重复的
    // 0, 100, 0,
    // 100, 0, 0,
    0, 100, 100
]);
const indexes = new Uint16Array([0, 1, 2, 2, 1, 3]); // 按顺序指定6个顶点使用的顶点索引

// 使用顶点数组组成几何面，每3个顶点为一组进行组合
const attribute = new THREE.BufferAttribute(vertices, 3);

geometry.attributes.position = attribute;
geometry.index = new THREE.BufferAttribute(indexes, 1); // 1表示一个为一组，即6个顶点6个索引一一对应的

const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#ff00a2')
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;