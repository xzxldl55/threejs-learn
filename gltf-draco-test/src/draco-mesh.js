import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader()

const mesh = new THREE.Group()

const dracoLoader = new DRACOLoader()

// 加载cdn远程的解码器
// dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

// 我们node_modules下的three内部也有这个解码器 three/examples/jsm/libs/draco/gltf/ 将目录下内容拷贝出来即可无需从cdn下载
dracoLoader.setDecoderPath('./draco-gltf/')

loader.setDRACOLoader(dracoLoader)

loader.load('./CesiumMan-draco.glb', gltf => {
    gltf.scene.translateX(-5)
    gltf.scene.scale.setScalar(5)
    mesh.add(gltf.scene)
})

export default mesh