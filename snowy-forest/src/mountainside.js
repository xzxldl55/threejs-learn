import * as THREE from 'three'
import { createNoise2D } from "simplex-noise"
import loadTree from './tree';

const geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);

const noise2D = createNoise2D();

const positions = geometry.attributes.position;

for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);

    const z = noise2D(x / 800, y / 800) * 50;

    positions.setZ(i, z);
}

function genColor() {
    const hightArr = []
    for (let i = 0; i < positions.count; i++) {
        hightArr.push(positions.getZ(i)) // 旋转前Z是山坡高度
    }

    const minHeight = Math.min(...hightArr)
    const maxHeight = Math.max(...hightArr)
    const hightDiff = maxHeight - minHeight

    const colors = []
    const color1 = new THREE.Color('gray') // 山谷灰色
    const color2 = new THREE.Color('white') // 山顶白色
    for (let i = 0; i < positions.count; i++) {
        const hight = hightArr[i]
        const color = color1.clone().lerp(color2, (hight - minHeight) / hightDiff) // 获取当前高度在最大-最小高度中的比例，通过这个比例生成%颜色
        colors.push(color.r, color.g, color.b)
    }

    return new Float32Array(colors)
}
geometry.attributes.color = new THREE.BufferAttribute(genColor(), 3)

const material = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('white'),
    vertexColors:true, // 使用顶点颜色
    // wireframe: true
});

const mountainside = new THREE.Mesh(geometry, material);
mountainside.rotateX(- Math.PI / 2);

mountainside.receiveShadow = true // 开启阴影接收效果

loadTree(tree => {
    // 获取山坡的坐标，然后在山坡上种树
    let i = 0
    // 减少树木数量，每隔更多点种树
    while(i < positions.count) { 
        const newTree = tree.clone()
        newTree.position.set(positions.getX(i), positions.getY(i), positions.getZ(i))
        mountainside.add(newTree)
        newTree.rotateX(Math.PI / 2)

        i += Math.floor(1000 * Math.random()) // 增大随机数跳跃间隔
    }
})

export default mountainside;