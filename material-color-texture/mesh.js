import * as THREE from 'three';

const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
const edgeGeometry = new THREE.EdgesGeometry(boxGeometry); // 将网格模型转换成线框模型，才能渲染线模型（Box有36个顶点【索引】，而edge线模型只有24个）

// 使用虚线材质，可以设置虚线的大小（即长度）和虚线间的间隔
const material = new THREE.LineDashedMaterial({
    color: new THREE.Color('orange'),
    dashSize: 4,
    gapSize: 2
})

const line = new THREE.Line(edgeGeometry, material);
line.computeLineDistances(); // 计算虚线

console.log(line)

export default line;