/**
 * 使用Raycaster穿过3D物体
 */
import * as THREE from 'three'

const group = new THREE.Group()

function genBox(x, y, z, color) {
    const geometry = new THREE.BoxGeometry(100, 100, 100)
    const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color)
    })
    const box = new THREE.Mesh(geometry, material)
    box.position.set(x, y, z)
    return box
}

const box1 = genBox(0, 0, 0, 'pink')
const box2 = genBox(0, 0, 300, 'green')
const box3 = genBox(300, 0, 0, 'red')

group.add(box1, box2, box3)

// 加个异步定时器，等待renderer渲染完毕后再进行射线创建与判断香蕉
setTimeout(() => {
    // const ray = new THREE.Raycaster()
    // ray.ray.origin.set(-100, 30, 0)
    // ray.ray.direction.set(1, 0, 0)

    // // 可视化射线（否则是隐形的）
    // const arrowHelper = new THREE.ArrowHelper(
    //     ray.ray.direction,
    //     ray.ray.origin,
    //     600
    // );
    // group.add(arrowHelper);

    // const intersections = ray.intersectObjects([box1, box2, box3]);
    // console.log(intersections); // point射线与方块的第一个香蕉点；distance第一个交点距离射线起点的距离

    // intersections.forEach(item => {
    //     item.object.material.color = new THREE.Color('yellow') // 被穿过的盒子改成黄色
    // })
})

export default group