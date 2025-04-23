/**
 * 通过ShapeGeometry定义多边形
 * 通过Shape对象创建形状（Path的子类）
 * 通过ExtrudeGeometry创建基于Shape拉伸的3D几何体
 */

import * as THREE from 'three'

const pointsList = [
    new THREE.Vector2(100, 0),
    new THREE.Vector2(50, 20),
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 50),
    new THREE.Vector2(50, 100),
]

/**
 * 也等同于下面的操作（像canvas一样操作）
 * shape.moveTo(100, 0);
 * shape.lineTo(50, 20);
 * shape.lineTo(0, 0);
 * shape.lineTo(0, 50);
 * shape.lineTo(50, 100);
 */
const shape = new THREE.Shape(pointsList);

// 挖一个圆形
const path = new THREE.Path();
path.arc(50, 50, 10); // 利用Path在(50, 50)挖个半径10的孔 --> 这样挖的孔没办法控制分段数
shape.holes.push(path); // 将这个孔适应到Shape上

// 再挖一个三角形
const path2 = new THREE.Path();
path2.moveTo(10, 20);
path2.lineTo(20, 40);
path2.lineTo(30, 20);
shape.holes.push(path2);

// const geometry = new THREE.ShapeGeometry(shape);

// 将会沿Z轴的正方向进行拉伸，depth为拉伸的深度（Z方向长度）
const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 50
})
const material = new THREE.MeshLambertMaterial({ color: new THREE.Color('lightgreen'), side: THREE.DoubleSide });

const mesh = new THREE.Mesh(geometry, material);

export default mesh;