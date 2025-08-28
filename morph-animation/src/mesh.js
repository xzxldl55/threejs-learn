import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(300, 300, 300);
const material = new  THREE.MeshLambertMaterial({
    color: 'orange'
})

// 复制两份position，分别在X/Y方向上拉长到两倍
const positions = geometry.attributes.position.clone()
const positions2 = geometry.attributes.position.clone()
for (let i = 0; i < positions.count; i++) {
    positions.setY(i, positions.getY(i) * 2)
    positions2.setX(i, positions2.getX(i) * 2)
}

geometry.morphAttributes.position = [positions, positions2]

const mesh = new THREE.Mesh(geometry, material);

mesh.morphTargetInfluences[0] = 0 // 设置形变效果的影响因子[0, 1]
mesh.morphTargetInfluences[1] = 0 // ~,0 表示第二个形变效果的影响时0%（即positions2不影响）

// 使用关键帧动画播放形变动画
mesh.name = 'Box'
const track1 = new THREE.KeyframeTrack('Box.morphTargetInfluences[0]', [0, 3], [0, 1]) // 0~3s，执行第一个形变
const track2 = new THREE.KeyframeTrack('Box.morphTargetInfluences[1]', [3, 6], [0, 1]) // 3~6s，执行第二个形变
const clip = new THREE.AnimationClip('morph', 6, [track1, track2])

const mixer = new THREE.AnimationMixer(mesh)
const clipAction = mixer.clipAction(clip)
clipAction.play()

const clock = new THREE.Clock()
function render() {
    const delta = clock.getDelta()
    mixer.update(delta)

    requestAnimationFrame(render)
}
render()

export default mesh;