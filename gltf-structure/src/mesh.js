import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader()

const mesh = new THREE.Group()

// 加载融合式的gltf文件（内部的bin、jpg等文件以base64形式存在）
loader.load('./gltf1/CesiumMan.gltf', (gltf) => {
    mesh.add(gltf.scene)

    gltf.scene.scale.set(50, 50, 50) // 放大一下

    gltf.scene.traverse(obj => {
        if (obj.isMesh) {
            console.log(obj)

            obj.material.wireframe = true // 展示线框
            obj.material.map = null // 去掉贴图
        }
    })
})

// 加载分离的gltf文件（内部会自动引用bin、jpg资源的url）
loader.load('./gltf2/CesiumMan.gltf', (gltf) => {
    mesh.add(gltf.scene)

    gltf.scene.scale.set(50, 50, 50)
    gltf.scene.translateX(-50)
})

// 加载glb
loader.load('./gltf3/CesiumMan.glb', (gltf) => {
    mesh.add(gltf.scene)

    gltf.scene.scale.set(50, 50, 50)
    gltf.scene.translateX(50)
})
export default mesh