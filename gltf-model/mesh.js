import * as THREE from 'three'
import { GLTFLoader } from 'gltf'

const loader = new GLTFLoader()

const mesh = new THREE.Group()

loader.load('../assets/model/Pig.gltf', (gltf) => {
    mesh.add(gltf.scene)

    // 遍历模型
    gltf.scene.traverse(obj => {
        if(obj.isMesh) {
            console.log('mesh:', obj)
            // 可以看到里面有哪些模型组成，这里对模型材质颜色进行修改
            if (obj.name === 'Cylinder') { // 猪身子
                obj.material.color = new THREE.Color('pink')
            } else if (obj.name === 'Cylinder_1') { // 猪蹄子
                obj.material.color = new THREE.Color('gray')
            }
        }
    })

    const body = gltf.scene.getObjectByName('Cylinder')
    // 修改材质（改成不反光的方便查看），展示一下猪猪身体的线框 --> 有1566个index，即522个三角面
    body.material = new THREE.MeshBasicMaterial({
        color: 'pink',
        wireframe: true
    })
})

export default mesh