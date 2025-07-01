import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader()

const mesh = new THREE.Group()

async function main() {
    // 异步加载
    const gltf = await loader.loadAsync('./IridescenceSuzanne.glb')
    console.log(gltf)

    gltf.scene.scale.setScalar(50)
    mesh.add(gltf.scene)

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
}

main()

export default mesh