/**
 * 车床几何体
 * LatheGeometry创建具有轴对称性质的网格，比如花瓶，沿着Y轴进行旋转创建模型
 */

import * as THREE from 'three';

// 这里利用这四个点可以构成一个面
const pointsList = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(50, 50),
    new THREE.Vector2(20, 80),
    new THREE.Vector2(0, 150),
];

// 沿着Y轴旋转这个面构成一个3d几何体(第二个参数为分段,即精细程度)
const geometry = new THREE.LatheGeometry(pointsList, 100);

const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('pink'),
    side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);

// 这里辅助观察,创建点模型和线模型
const geometry2 = new THREE.BufferGeometry().setFromPoints(pointsList);
const pointMaterial = new THREE.PointsMaterial({
    color: new THREE.Color('red'),
    size: 5
});
const point = new THREE.Points(geometry2, pointMaterial);
const lineMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color('red')
});
const line = new THREE.Line(geometry2, lineMaterial);

mesh.add(point, line);

export default mesh;