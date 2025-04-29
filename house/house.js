import * as THREE from 'three';
import foundation from './foundation.js';
import sideWallLeft from './side-wall.js';
import behindWall from './behind-wall.js';
import frontWall from './front-wall.js';
import roof from './roof.js';
import step from './step.js';
import chimney from './chimney.js';

const { width, height, depth } = foundation.geometry.parameters;

// 添加一组物体到house中
const house = new THREE.Group();

// 地基
foundation.translateY(1);
house.add(foundation);

// 左右的墙面
const sideWallRight = sideWallLeft.clone();

// 把两边的墙壁旋转平移到合适的位置上
sideWallLeft.translateZ(-depth / 2);
sideWallLeft.translateX(-width / 2);
sideWallLeft.translateY(height / 2);
sideWallLeft.rotateY(Math.PI / 2);

sideWallRight.rotateY(Math.PI / 2);
sideWallRight.translateX(depth / 2);
sideWallRight.translateZ(width / 2 - sideWallRight.geometry.parameters.options.depth);
sideWallRight.translateY(height / 2);

house.add(sideWallLeft);
house.add(sideWallRight);

// 后墙
behindWall.translateZ(-depth / 2 + behindWall.geometry.parameters.depth / 2);
behindWall.translateY(behindWall.geometry.parameters.height / 2 + height / 2);
house.add(behindWall);

// 前墙
frontWall.translateZ(depth / 2 - frontWall.geometry.parameters.options.depth);
frontWall.translateY(height / 2);
frontWall.translateX(-width / 2);
house.add(frontWall);

// 屋顶
const roofFornt = roof.clone();
roofFornt.rotateX(67.4 / 180 * Math.PI);
roofFornt.position.z = -roof.position.z;

house.add(roof);
house.add(roofFornt);

// 台阶
step.translateZ(depth / 2);
step.translateX(-200);
step.translateY(-height / 2);
step.rotateY(-90 / 180 * Math.PI);
house.add(step);

// 烟囱
chimney.translateX(width / 2 - sideWallRight.geometry.parameters.options.depth - 300);
chimney.translateZ(1000);
chimney.rotateX(-90 / 180 * Math.PI);
house.add(chimney);

export default house;