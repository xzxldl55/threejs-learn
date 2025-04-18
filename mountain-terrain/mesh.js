import * as THREE from 'three';
import { createNoise2D } from 'noise';

const noise = createNoise2D();

const geometry = new THREE.PlaneGeometry(3000, 3000, 200, 200); // 100 X 100 网格的面

export function updatePosition() {
    const positions = geometry.attributes.position;
    const positionLen = positions.count;

    for (let i = 0; i < positionLen; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);

        const z = noise(x / 300, y / 300) * 50; // 使用噪声算法计算z位置，生成与x，y位置有关的连续噪声 --> 当 X，Y 参数固定时，噪声算法输出的 Z 也是固定的

        /**
         *  使用正弦函数，随机生成 -1 ~ 1 的值并乘十 --> (-10, 10)
         *      使用时间作为参数之一，这样会随着时间变化，持续变化
         *      使用X作为第二个参数，这样X轴不同的点有着不同的起伏，可以达成一个沿着X轴不同区域起起伏伏的感觉
         *      使用一个较小的系数，让起伏的幅度变小，渐进式
         */
        const sinNum = Math.sin(Date.now() * 0.002 + x * 0.03) * 10;
        positions.setZ(i, z + sinNum); // 控制山脉在(-10 ~ 10)起伏
    }

    positions.needsUpdate = true;
}


const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange'),
    wireframe: true
});

const mesh = new THREE.Mesh(geometry, material);

// 绕X轴旋转90° --> 这里也是为什么上面山脉起伏是修改的 Z 轴而不是 Y 轴了，因为旋转后，Z 轴变成朝上的竖直方向了
// 但需要注意的是，这是这个mesh的轴发生了变化，我们在利用 OrbitControls 拖动，和AxseHelper看到的轴是相机的轴，不是mesh的
mesh.rotateX(Math.PI / 2);

export default mesh;