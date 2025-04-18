/**
 * 分段数：
 *      分段书即可以看作模型精细程度，分段书越多组成魔性的三角越多，越加精细
 */

import * as THREE from 'three';

/**
 * 圆柱几何体：上圆半径，下圆半径，高度，分段数
 *      - 宽高默认分段是32已经很精细了
 *      - 这里设置分段数为5，可以看到横截面成了一个五角形，即由五个三角组成的，模型就较为粗糙不似圆形
 */
const geometry = new THREE.CylinderGeometry(50, 50, 80, 5);

const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('pink'),
    wireframe: true
})

const mesh = new THREE.Mesh(geometry, material);

export default mesh;