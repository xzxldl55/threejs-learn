/**
 * 网格模型：
 *  - 正反面：
 *      Three.js规定了，从相机看过去的方向，如果一个三角形是逆时针连接的顶点，就是正面（可见），如果是顺时针，就是反面（不可见）
 *      但可以通过材质的参数 side: THREE.DoubleSide 来设置，让网格模型可以显示正面和反面
 */

import * as THREE from 'three';

const geometry = new THREE.PlaneGeometry(100, 100, 2, 3) // 2, 3 表示这个网格的分段参数，即分为 2 X 3 的网格

const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('yellow'),
    // wireframe: true,
    side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;