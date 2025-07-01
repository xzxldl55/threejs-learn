/**
 * 三次方程贝塞尔区县，再三维空间中进行弯曲
 */

/**
 * 使用 QuadraticBezierCurve控制曲线曲率
 */

import * as THREE from 'three';

const p1 = new THREE.Vector3(-100, 0, 0);
const p2 = new THREE.Vector3(50, 100, 0);
const p3 = new THREE.Vector3(100, 0, 100);
const p4 = new THREE.Vector3(100, 0, 0);

const curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
const pointsList = curve.getPoints(20);

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsList);

const material = new THREE.LineBasicMaterial({ color: new THREE.Color('green') });

const line = new THREE.Line(geometry, material);

// 对照组：不使用贝塞尔曲线
const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints([p1, p2, p3, p4]);

const material2 = new THREE.PointsMaterial({ color: new THREE.Color('gold'), size: 5  });

const point2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial({ color: new THREE.Color('red')   }));

line.add(point2, line2); // 将对照组组合到原曲线上去

export default line;