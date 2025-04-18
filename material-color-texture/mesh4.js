/**
 * 使用砖墙贴图 + PlaneGeometry 制作墙面
 */
import * as THREE from 'three';

const loader = new THREE.TextureLoader()
const texture = loader.load('../assets/wall.jpg');
texture.wrapS = THREE.RepeatWrapping; // 水平方向设置重复贴图
texture.wrapT = THREE.RepeatWrapping; // 竖直方向设置重复贴图
texture.repeat.set(2, 2); // 设置贴图的重复次数
texture.colorSpace = THREE.SRGBColorSpace; // 设置贴图颜色空间

const geometry = new THREE.PlaneGeometry(1000, 1000);

const material = new THREE.MeshBasicMaterial({
    map: texture,
})

const mesh = new THREE.Mesh(geometry, material);

export default mesh