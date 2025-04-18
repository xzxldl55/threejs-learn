/**
 * 网格模型：
 *  - 正反面：
 *      Three.js规定了，从相机看过去的方向，如果一个三角形是逆时针连接的顶点，就是正面（可见），如果是顺时针，就是反面（不可见）
 *      但可以通过材质的参数 side: THREE.DoubleSide 来设置，让网格模型可以显示正面和反面
 */

import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
    0, 0, 100,
    100, 0, 100,
    0, 100, 100,
    100, 100, 100,
]);

geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);

// 这里的索引，使得在相机默认方向上，两个三角形都是逆时针的也就是正面，可见
const indexes = new Uint16Array([0, 1, 2, 2, 1, 3])

geometry.index = new THREE.BufferAttribute(indexes, 1);

const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('red'),
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;