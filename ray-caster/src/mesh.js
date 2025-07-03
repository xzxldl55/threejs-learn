import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const point1 = new THREE.Vector3(0, 0, 0);
const point2 = new THREE.Vector3(300, 0, 0);
const point3 = new THREE.Vector3(0, 300, 0);

geometry.setFromPoints([point1, point2, point3]);

const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange')
});

const mesh = new THREE.Mesh(geometry, material);

const ray = new THREE.Ray(new THREE.Vector3(50, 50, 100), new THREE.Vector3(0, 0, -1))
const arrowHelper = new THREE.ArrowHelper(ray.direction, ray.origin, 1000, new THREE.Color('pink')); // 用箭头可视化射线Ray
mesh.add(arrowHelper)

const point = new THREE.Vector3();
ray.intersectTriangle(point1, point2, point3, false, point); // 获取射线与三角形的焦点
console.log(point);

export default mesh;