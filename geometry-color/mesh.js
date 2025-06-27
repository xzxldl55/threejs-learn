import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const point1 = new THREE.Vector3(0, 0, 0);
const point2 = new THREE.Vector3(0, 100, 0);
const point3 = new THREE.Vector3(100, 0, 0);
geometry.setFromPoints([point1, point2, point3]);

const colors = new Float32Array([
    1, 0, 0, // Red
    0, 1, 0, // Green
    0, 0, 1, // Blue
]);

geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

const material = new THREE.PointsMaterial({
    vertexColors: true, // 允许自定义顶点颜色
    size: 30
});

const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true, // 允许自定义顶点颜色，这里会按照我们自定义的顶点颜色进行连线后渐变色处理
})

const meshMaterial = new THREE.MeshBasicMaterial({
    vertexColors: true, // 同理按照顶点颜色的渐变的面
    side: THREE.DoubleSide, // 双面渲染
})

const points = new THREE.Points(geometry, material);
const line = new THREE.Line(geometry, lineMaterial);
const mesh = new THREE.Mesh(geometry, meshMaterial);

export {
    points,
    line,
    mesh
};