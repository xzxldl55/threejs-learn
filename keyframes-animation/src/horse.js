import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader()

const mesh = new THREE.Group();

loader.load('./Horse.gltf', gltf => {
    mesh.add(gltf.scene);
    console.log(gltf)
    gltf.scene.scale.set(30, 30, 30);

    gltf.scene.traverse(obj => {
        if (obj.isMesh) {
            // console.log('mesh', obj);
            if (obj.name === 'Cylinder') {
                obj.material.color = new THREE.Color('white');
            } else if (obj.name === 'Cylinder_1') {
                obj.material.color = new THREE.Color('pink');
            }
        }
    });

    const mixer = new THREE.AnimationMixer(gltf.scene)
    const clipAction = mixer.clipAction(gltf.animations[0]) // 播放模型动画
    clipAction.play()

    const clock = new THREE.Clock()
    function render () {
        requestAnimationFrame(render)

        const detla = clock.getDelta()
        mixer.update(detla)
    }
    render()
})

export default mesh
