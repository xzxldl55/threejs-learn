import * as THREE from 'three'

export default function dynamicGenRay(x, y, camera, mesh) {
    const rayCaster = new THREE.Raycaster()
    rayCaster.setFromCamera(new THREE.Vector2(x, y), camera) // 以相机位置为origin射向点击方向

    // 检测射线是否与物体香蕉
    const intersections = rayCaster.intersectObjects(mesh.children)
    intersections.forEach(item => {
        item.object.material.color = new THREE.Color('yellow')
    })
}