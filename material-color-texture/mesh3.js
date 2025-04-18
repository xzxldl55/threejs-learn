/**
 * 使用纹理贴图图片作为材质-颜色贴图
 *  - 可以和颜色进行混合，即再添加颜色与贴图混合在一起
 *  这里使用地球纹理贴图制作一个3D地球
 */

import * as THREE from 'three';

const loader = new THREE.TextureLoader()
const texture = loader.load('../assets/earth-texture.jpg');
texture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.SphereGeometry(300);

const material = new THREE.MeshBasicMaterial({
    map: texture,
    // aoMap: texture,
})

const mesh = new THREE.Mesh(geometry, material);

export default mesh;