/**
 * 点模型：
 *      渲染点阵，而不将其连接成面，用于进行一些标注，点云业务
 */

import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
    0, 0, 0,
    100, 0, 0,
    0, 100, 0,
    0, 0, 100,
    100, 100, 0
]);
const attributes = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attributes;

// 使用点材质，设置点的大小为10
const meterial = new THREE.PointsMaterial({
    color: new THREE.Color('orange'),
    size: 10,
});

// 创建点对象，最终渲染出来五个点（大小10）
const points = new THREE.Points(geometry, meterial);

export default points;