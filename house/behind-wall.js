import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('../assets/red-wall.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.set(3, 2);

const behindWall = new THREE.Mesh(
    new THREE.BoxGeometry(4000, 2000, 200),
    new THREE.MeshLambertMaterial({
        // color: new THREE.Color('lightgray'),
        map: texture,
        aoMap: texture,
    })
);

export default behindWall;