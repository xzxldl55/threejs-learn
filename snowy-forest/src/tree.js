import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader();
const tree = new THREE.Group()

function loadTree(callback) {
    loader.load('./tree.gltf', (gltf) => {
        tree.add(gltf.scene)
        gltf.scene.scale.set(10, 10, 10);
        gltf.scene.traverse(obj => {
            if (!obj.isMesh) {
                return
            }
            obj.castShadow = true // 开启阴影投射
            if (obj.name === 'tree001') {
                obj.material.color = new THREE.Color('brown') // 树干
            } else {
                obj.material.color = new THREE.Color('green') // 树叶
            }
        })
        callback(tree)
    })
}

export default loadTree