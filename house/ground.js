import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('../assets/grassland.jpg')
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapS = THREE.RepeatWrapping; // 水平方向平铺
texture.wrapT = THREE.RepeatWrapping; // 垂直方向平铺
texture.repeat.set(50, 50); // 设置平铺的次数，这里是10000

const geometry = new THREE.PlaneGeometry(100000, 100000);

const material = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('green')
    map: texture,
    aoMap: texture,
});

const ground = new THREE.Mesh(geometry, material);

ground.rotateX(-Math.PI / 2);
ground.translateZ(-150)

export default ground;