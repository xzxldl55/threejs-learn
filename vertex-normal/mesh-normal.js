import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
    0, 0, 0,
    100, 0, 0,
    0, 100, 0,
    100, 100, -100
]);

const indexes = new Uint16Array([
    0, 1, 2,
    2, 1, 3
]);

/**
 * 定义和position顶点数量相同的法线方向（这里是沿Z轴方向）
 */
const normals = new Float32Array([
    0, 0, 1,
    0, 0, 1, 
    0, 0, 1,
    1, 1, 0,
])

geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);
geometry.index = new THREE.BufferAttribute(indexes, 1);

// 使用镜面反射材质（光照需要按照法线为轴进行反射
// --> 所以，针对这种BufferGeometry没有自动生成法线的，我们需要自定义法线）
const material = new THREE.MeshPhongMaterial({
    color: new THREE.Color('orange'),
    shininess: 1000,
    side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);

console.log(mesh);

export default mesh;