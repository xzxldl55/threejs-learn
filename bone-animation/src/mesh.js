import * as THREE from 'three'

// 创建三个关节
const bone1 = new THREE.Bone()
const bone2 = new THREE.Bone()
const bone3 = new THREE.Bone()

bone1.add(bone2)
bone2.add(bone3)

bone1.position.x = 100
bone2.position.y = 100
bone3.position.y = 50 // bone3在bone2内，所以其世界坐标其实是 100+50=150
bone3.position.x = 20 // x = 100 + 20 = 120

const group = new THREE.Group()
group.add(bone1)

const skeletonHelper = new THREE.SkeletonHelper(group)
group.add(skeletonHelper)

export default group