import * as THREE from 'three'

// 根据点创建曲线路径
const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1000, 200, 900),
    new THREE.Vector3(-400, 800, 1000),
    new THREE.Vector3(0, 0, 0)
])

// 根据曲线路径创建一个管道
const geomtry = new THREE.TubeGeometry(path, 100, 50, 30)
const material = new THREE.PointsMaterial({
    color: new THREE.Color('transparent'),
    size: 5,
})

const tube = new THREE.Points(geomtry, material)
tube.position.set(0, 500, 800)

 // 从管道上均匀获取1000个点
export const tubePoints = path.getSpacedPoints(1000).map(v => new THREE.Vector3(v.x, v.y + 500, v.z + 800)) // 因为上面管道位移了，这里取得每个点都需要添加偏移量

export default tube