import * as THREE from 'three'
import { LineMaterial } from 'three/examples/jsm/Addons.js'

const data = [
    {
        name: '春节销售额',
        value: 1000
    },
    {
        name: '夏节销售额',
        value: 3000
    },
    {
        name: '秋节销售额',
        value: 800
    },
    {
        name: '冬节销售额',
        value: 500
    }
];

const curvePath = new THREE.CurvePath()

const v1 = new THREE.Vector2(0, 0)
const v2 = new THREE.Vector2(0, 300)
const v3 = new THREE.Vector2(300, 0)

const line1 = new THREE.LineCurve(v1, v3)
const line2 = new THREE.LineCurve(v1, v2)
const arc = new THREE.EllipseCurve(0, 0, 300, 300, 0, Math.PI / 2)

// 绘制一个扇形
curvePath.add(line1)
curvePath.add(arc)
curvePath.add(line2)

const points = curvePath.getPoints(100)
const shape = new THREE.Shape(points)

// 将扇形拉伸成一个饼图的一块
const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 100
})

const material = new THREE.MeshPhongMaterial({
    color: 'orange'
})

const mesh = new THREE.Mesh(geometry, material)

export default mesh