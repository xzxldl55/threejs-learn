/**
 * 使用自定义点，生成不规则曲线
 * 
 * SplineCurve
 */
import * as THREE from 'three';

const arr = [
    new THREE.Vector2(-100, 0),
    new THREE.Vector2(-50, 50),
    new THREE.Vector2(0, 0),
    new THREE.Vector2(50, -50),
    new THREE.Vector2(100, 0),
];

const curve = new THREE.SplineCurve(arr); // 使用我们自定义的几个点构成曲线 --> 会按照我们取得点数自动光滑
const pointsList = curve.getPoints(20);

const geometry = new THREE.BufferGeometry();

geometry.setFromPoints(pointsList);

const meterial = new THREE.LineBasicMaterial({ color: new THREE.Color('orange') });

const line = new THREE.Line(geometry, meterial);

const pointMaterial = new THREE.PointsMaterial({
    color: new THREE.Color('red'),
    size: 5,
})

const point = new THREE.Points(geometry, pointMaterial);

export default {
    point,
    line
};