/**
 * 椭圆曲线EllipseCurve
 */
import * as THREE from 'three';

 // 椭圆曲线，中心是 0，0；长短半径是100， 50、指定角度为从 0 到 Math.PI / 2（即 90 度）
const arc = new THREE.EllipseCurve(0, 0, 100, 50, 0, Math.PI / 2)
const pointsList = arc.getPoints(20); // 按照将椭圆曲线分为20份（20条线段），获取组成这20份的点，即21个点

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsList); // 把这21个点通过 setFromPoints 设置到几何体中

// const material = new THREE.PointsMaterial({
//     color: new THREE.Color('pink'),
//     size: 10
// })

// const point = new THREE.Points(geometry, material) // 创建点模型

const material = new THREE.LineBasicMaterial({
    color: new THREE.Color('pink')
});

const line = new THREE.Line(geometry, material); // 创建线模型

export default line;