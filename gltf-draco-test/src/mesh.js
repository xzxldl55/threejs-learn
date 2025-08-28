import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader()

const mesh = new THREE.Group()

loader.load('./CesiumMan.glb', gltf => {
    console.log(gltf)
    gltf.scene.scale.setScalar(5)
    mesh.add(gltf.scene)
    console.log(mesh)
})

export default mesh