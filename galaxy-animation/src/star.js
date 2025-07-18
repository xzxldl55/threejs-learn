import * as THREE from 'three'
import { getRandomPolarCoordinate } from './utils'

const params = {
    starCount: 300000, // 星辰数
    starSize: 0.03, // 星辰大小
    branches: 6, // 分支数
    branchRadius: 5, // 最大半径
    spin: 0.8, // 星辰螺旋离散程度，越大螺旋臂卷曲程度越高（每个星辰的旋转角度就越大，星系的螺旋臂会更加紧密地缠绕在一起，给人一种更加卷曲、密集的视觉效果。）
    radialRandomness: 0.3, // 用于添加径向随机（Y轴方向随机），趋近0时所有点都将集中到一个Y上，越大则向Y轴方向随机扩散越大（星云越厚实）
    innerColor: '#ff812e', // 星云中央颜色
    outerColor: '#a668ff' // 星云外围颜色
}

const starTexture = new THREE.TextureLoader().load('./star.png')

const positions = new Float32Array(params.starCount * 3)
const colors = new Float32Array(params.starCount * 3)
const innerColor = new THREE.Color(params.innerColor)
const outerColor = new THREE.Color(params.outerColor)

// 生成各个星辰的坐标和颜色
for (let i = 0; i < params.starCount; i++) {
    const i3 = i * 3 // 每三位一组，这里是第i组的第一个点

    const radius = params.branchRadius * Math.random() // 获取[0, 5]的随机半径，确定星辰距离星系中心的距离
    const branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2 // 将圆周等分为 branches 份，计算当前星辰所在分支的角度
    const spinAngle = params.spin * radius * Math.PI * 2; // 计算旋转角度，使星系呈现螺旋状，旋转角度与半径成正比

    const randRadius = Math.random() * params.radialRandomness * radius // 生成一个随机半径，用于添加径向随机性（Y轴方向扩散）
    const { x: randX, y: randY, z: randZ } = getRandomPolarCoordinate(randRadius) // 获取随机的极坐标，用于添加星辰位置的随机性

    positions[i3] = radius * Math.cos(branchAngle + spinAngle) + randX // 计算星辰的 x 坐标，结合分支角度、旋转角度和随机偏移量
    positions[i3 + 1] = randY
    positions[i3 + 2] = radius * Math.sin(branchAngle + spinAngle) + randZ // 计算星辰的 z 坐标，结合分支角度、旋转角度和随机偏移量

    const mixedColor = innerColor.clone().lerp(outerColor, radius / params.branchRadius) // 根据距离星系中心的比例来调配颜色
    colors[i3] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
}

const geometry = new THREE.BufferGeometry()
geometry.attributes.position = new THREE.BufferAttribute(positions, 3);
geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
const material = new THREE.PointsMaterial({
    size: params.starSize,
    sizeAttenuation: true, // 点的大小根据透视相机距离而衰减
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
    alphaMap: starTexture
})

const points = new THREE.Points(geometry, material)

export default points