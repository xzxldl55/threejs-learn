import * as THREE from 'three';

const geometry = new THREE.PlaneGeometry(200, 100);

/**
 * 设置UV坐标
 * 
 * 如下，正常一张贴图完整坐标就是 0,0 | 1,0 | 1,1 | 0,1
 * 
 * V
 * ⬆
 * |
 * |
 * |
 * ------------→ U
 * 
 * 下面改成切图整张贴图的左下角，则整个Plane平面只渲染切图后的这部分贴图了
 */ 
const uvs = new Float32Array([
    0, 0.5,
    0.5, 0.5,
    0.5, 0,
    0, 0
])

geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2); // 2个参数为一个坐标，设置uv的坐标限制

const loader = new THREE.TextureLoader();
const texture = loader.load('../assets/uv-test.jpg');
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshBasicMaterial({
    map: texture,
});

const mesh = new THREE.Mesh(geometry, material);

console.log(mesh)

export default mesh;