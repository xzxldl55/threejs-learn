import * as THREE from 'three'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader()

const group = new THREE.Group()

loader.load('./Michelle.glb', gltf => {
    console.log(gltf)

    group.add(gltf.scene)
    gltf.scene.scale.setScalar(100)

    const skeletonHelper = new THREE.SkeletonHelper(gltf.scene) // 可视化骨架
    // group.add(skeletonHelper)

    // 另一个Mesh为SkinnedMesh(蒙皮网格模型)，这类Mesh会自动绑定骨架随骨架一起运动
    // SkinnedMesh下的skeleton.bones存放着所有骨架关节，当对关节位置进行变化时，对应的SkinnedMesh也会随之变动
    // gltf.scene.traverse(obj => {
    //     // 这里找了一个肩部关节，对其进行旋转
    //     if (obj.isBone && obj.name === "mixamorigLeftShoulder") {
    //         obj.rotateX(-Math.PI / 3)
    //     }
    // })

    // 可以使用关键帧动画来操作关节运动
    const tracker1 = new THREE.KeyframeTrack('mixamorigLeftShoulder.quaternion', [0, 3], [0, 0, 0, 0, 1.2, 0, 0, 0])
    const clip = new THREE.AnimationClip('zhuanShou', 3, [tracker1])
    const mixer = new THREE.AnimationMixer(gltf.scene)
    const clipAction = mixer.clipAction(clip)
    const gltfClip0 = gltf.animations[0]
    const gltfClipAction = mixer.clipAction(gltfClip0)
    // clipAction.play()
    gltfClipAction.play()

    const clock = new THREE.Clock()
    function render () {
        const delta = clock.getDelta()
        mixer.update(delta)
        requestAnimationFrame(render)
    }
    render()
})

export default group