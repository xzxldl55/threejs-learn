import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader()

const mesh = new THREE.Group()

async function main() {
    // 1. 异步加载模型
    // const gltf = await loader.loadAsync('./tent/Map_RT_Daylight.gltf')
    const gltf = await loader.loadAsync('./IridescenceSuzanne.glb')

    gltf.scene.scale.setScalar(50)
    mesh.add(gltf.scene)

    // 2. 使用expandByObject(scene)拓展包围盒（即利用场景模型来拓展包围盒）
    const box = new THREE.Box3()
    box.expandByObject(gltf.scene)

    const xSize = box.max.x - box.min.x
    const ySize = box.max.y - box.min.y
    const zSize = box.max.z - box.min.z

    gltf.scene.position.y = ySize / 2;
    gltf.scene.position.z = zSize / 2;
    console.log(xSize, ySize, zSize);

    const helper1 = new THREE.BoxHelper(gltf.scene);
    mesh.add(helper1);

    // 3. 基于Box3的Hepler
    const box2 = new THREE.Box3()
    box2.expandByObject(gltf.scene) // 重新获取包围盒
    const helper2 = new THREE.Box3Helper(box2, 'red') // 设置基于box的helper --> 可以看到两个hepler重合到一起了
    mesh.add(helper2)
    // box2.expandByScalar(100); // 可以使用expandByScalar放大包围盒大小

    // 4. 使用Box3.getSize(Vector3)来直接获取模型大小（无需自己用max - min计算了）
    const box3 = new THREE.Box3()
    const v = new THREE.Vector3()
    box3.expandByObject(gltf.scene)
    box3.getSize(v)
    console.log(v) // 与我们在:27计算的大小一致

    // 5. 使用setFromObject(scene)扩展包围盒，该函数同 expandByObject
    box3.setFromObject(gltf.scene)
    console.log(box3)

    // 6. 使用intersectsBox判断两个包围盒是否相交-->可用于碰撞检测
    const gltfDuck = await loader.loadAsync('./Duck.glb')
    gltfDuck.scene.scale.setScalar(50)
    mesh.add(gltfDuck.scene)
    const boxDuck = new THREE.Box3()
    boxDuck.setFromObject(gltfDuck.scene)
    const helperDuck = new THREE.Box3Helper(boxDuck, 'green')
    mesh.add(helperDuck)
    console.log('是否与gltf碰撞：', boxDuck.intersectsBox(box3))
    // 移动一下模型（并刷新包围盒）
    gltfDuck.scene.position.z = -500
    boxDuck.setFromObject(gltfDuck.scene)
    console.log('是否与gltf碰撞：', boxDuck.intersectsBox(box3)) // 重新检测碰撞状态

    // 7. intersect获取两个包围盒相交部分的大小 --> 求交后boxDuck大小会改变为交集，影响下面求并，所以这里先注释
    // gltfDuck.scene.position.z = 0
    // boxDuck.setFromObject(gltfDuck.scene)
    // const v2 = new THREE.Vector3()
    // const intersectBox = boxDuck.intersect(box3)
    // const size = intersectBox.getSize(v2)
    // console.log('相交部分大小：', size, v2)

    // 8. union获取两个包围盒的并集
    const unionBox = boxDuck.union(box3)
    const unionHelper = new THREE.Box3Helper(unionBox, 'pink')
    mesh.add(unionHelper)
    const unionSize = boxDuck.getSize(new THREE.Vector3())
    console.log('并集大小：', unionSize)

    // 9. getCenter获取模型中心位置
    console.log('中心位置：', boxDuck.getCenter(new THREE.Vector3()))
}

main()

export default mesh