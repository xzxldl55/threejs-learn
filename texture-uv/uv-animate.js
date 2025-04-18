/**
 * 纹理对象有一个offset属性，可以让纹理贴图再X，Y轴方向发生一些偏移，这相当于改变了uv坐标。
 * 这种改变offset的动画就叫uv动画
 */

import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('../assets/mx.jpg');
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapT = THREE.RepeatWrapping;
texture.wrapS = THREE.RepeatWrapping;

const geometry = new THREE.SphereGeometry(50);
const material = new THREE.MeshBasicMaterial({
    map: texture
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;