import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('../assets/red-wall.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.set(0.001, 0.001);

const Shape = new THREE.Shape(); 
Shape.moveTo(0, 0);
Shape.lineTo(4000, 0);
Shape.lineTo(4000, 2000);
Shape.lineTo(0, 2000);

const doorPath = new THREE.Path();
doorPath.moveTo(1000, 0);
doorPath.lineTo(1000, 1200);
doorPath.lineTo(1800, 1200);
doorPath.lineTo(1800, 0);
Shape.holes.push(doorPath);

const windowPath = new THREE.Path();
windowPath.moveTo(2000, 600);
windowPath.lineTo(2000, 1200);
windowPath.lineTo(2800, 1200);
windowPath.lineTo(2800, 600);
Shape.holes.push(windowPath);

const behindWall = new THREE.Mesh(
    new THREE.ExtrudeGeometry(Shape, {
        depth: 200
    }),
    new THREE.MeshLambertMaterial({
        // color: new THREE.Color('lightgray'),
        map: texture,
        aoMap: texture,
    })
);

export default behindWall;