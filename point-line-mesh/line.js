/**
 * 线模型：
 *      渲染线条，将连接各个点，但不会组成面，仅展示线条，
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

const material = new THREE.LineBasicMaterial({
    color: new THREE.Color('green')
});

/**
 * Line：将点依次连接成线，但首尾不会连接使其封闭
 * LineLoop：封闭首尾
 * LineSegment：每两个点之间连接，形成线段
 */
const line = new THREE.Line(geometry, material);

export default line;