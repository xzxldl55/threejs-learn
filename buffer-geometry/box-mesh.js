import * as THREE from 'three';

const geometry = new THREE.BufferGeometry(); // 自定义几何体

// 创建顶点数组
const vertices = new Float32Array([
    0, 0, 0, // 0
    0, 100, 0, // 1
    100, 0, 0, // 2
    // 100, 0, 0,
    // 0, 100, 0,
    100, 100, 0, // 3

    // 0, 0, 0,
    0, 0, 100, // 4
    // 0, 100, 0,
    // 0, 100, 0,
    // 0, 0, 100,
    0, 100, 100, // 5

    // 100, 100, 0,
    // 0, 100, 0,
    100, 100, 100, // 6
    // 100, 100, 100,
    // 0, 100, 0,
    // 0, 100, 100,

    // 0, 100, 100,
    // 0, 0, 100,
    100, 0, 100, // 7
    // 100, 0, 100,
    // 100, 100, 100,
    // 0, 100, 100,

    // 100, 0, 100,
    // 100, 0, 0,
    // 100, 100, 0,
    // 100, 100, 0,
    // 100, 100, 100,
    // 100, 0, 100,

    // 0, 0, 0,
    // 100, 0, 0,
    // 100, 0, 100,
    // 100, 0, 100,
    // 0, 0, 100,
    // 0, 0, 0,
]);

const indexes = new Uint16Array([
    0, 1, 2, 2, 1, 3,
    0, 4, 1, 1, 4, 5,
    3, 1, 6, 6, 1, 5,
    5, 4, 7, 7, 6, 5,
    7, 2, 3, 3, 6, 7,
    0, 2, 7, 7, 4, 0,
]);

// 使用顶点数组组成几何面，每3个顶点为一组进行组合
const attribute = new THREE.BufferAttribute(vertices, 3);

geometry.attributes.position = attribute;
geometry.index = new THREE.BufferAttribute(indexes, 1);

const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('green'),
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;