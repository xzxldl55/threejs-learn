/**
 * 使用tubeGeometry生成管道（根据曲线来生成一个具体半径的圆形管道）
 */

import * as THREE from 'three';

const pointsList = [
    new THREE.Vector3(-100, 0, 0),
    new THREE.Vector3(-50, 20, 20),
    new THREE.Vector3(0, 80, 0),
    new THREE.Vector3(50, -60, -50),
    new THREE.Vector3(-40, -50, -30),
];

const curve = new THREE.CatmullRomCurve3(pointsList); // 生成曲线

// 通过曲线生成一个，半径为20，圆形分段30，管道分段80的管道
const geometry = new THREE.TubeGeometry(curve, 80, 20, 30);

const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('orange'),
    side: THREE.DoubleSide,
    wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

// 对照组
const geometry2 = new THREE.BufferGeometry().setFromPoints(pointsList);
const pointMaterial = new THREE.PointsMaterial({
    color: new THREE.Color('red'),
    size: 5,
});
const lineMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color('red'),
});

const point = new THREE.Points(geometry2, pointMaterial);
const line = new THREE.Line(geometry2, lineMaterial);

mesh.add(point, line);

export default mesh;