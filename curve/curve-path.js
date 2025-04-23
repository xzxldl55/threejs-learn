/**
 * 使用curvePath组合多条曲线形成一条复合曲线
 */

import * as THREE from 'three';

const p1 = new THREE.Vector2(0, 0);
const p2 = new THREE.Vector2(100, 100);
const line1 = new THREE.LineCurve(p1, p2); // 直线

const arc = new THREE.EllipseCurve(0, 100, 100, 100, 0, Math.PI); // 圆心再 （0， 100）的半圆

const p3 = new THREE.Vector2(-100, 100);
const p4 = new THREE.Vector2(0, 0);
const line2 = new THREE.LineCurve(p3, p4);

const curvePath = new THREE.CurvePath();
curvePath.add(line1);
curvePath.add(arc);
curvePath.add(line2);

const pointsList = curvePath.getPoints(20);
const geometry = new THREE.BufferGeometry().setFromPoints(pointsList);
const material = new THREE.LineBasicMaterial({ color: new THREE.Color('green')  });

const line = new THREE.Line(geometry, material);

export default line;