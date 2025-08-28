import * as THREE from 'three'

// const geometry = new THREE.BoxGeometry(100, 100, 100);
// const material = new THREE.MeshLambertMaterial({
//   color: new THREE.Color('orange')
// });
// const mesh = new THREE.Mesh(geometry, material);

const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
const planeMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('skyblue')
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(- Math.PI / 2);
plane.position.y = -50;
plane.receiveShadow = true // 开启阴影效果接收

const boxGeometry = new THREE.BoxGeometry(200, 600, 200);
const boxMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('orange')
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = 200;
box.castShadow = true // 开启阴影

const box2 = box.clone();
box2.position.x = 500;

const mesh = new THREE.Group();
mesh.add(plane);
mesh.add(box);
mesh.add(box2);

export default mesh