import * as THREE from 'three'
import { CSS2DObject } from 'three/addons/Addons.js'

const planeGeometry = new THREE.PlaneGeometry(1000, 1000)
const planeMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('skyblue'),
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial) // 地板
plane.rotateX(-Math.PI / 2)
plane.position.y = -50

const boxGeometry = new THREE.BoxGeometry(100, 100, 100)
const boxMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('orange')
})
const box = new THREE.Mesh(boxGeometry, boxMaterial)
const box2 = box.clone()
box2.position.x = 200

const group = new THREE.Group()

group.add(plane)
group.add(box)
group.add(box2)

/**
 * 添加标注
 */
const ele = document.createElement('div')
ele.innerHTML = `<p style="background: #fff; padding: 10px;">这是 Box1</p>`
const obj = new CSS2DObject(ele)
obj.position.y = 100
box.add(obj)
obj.name = 'tag'
obj.visible = false

const ele2 = document.createElement('div')
ele2.innerHTML = `<p style="background: #fff; padding: 10px;">这是 Box2</p>`
const obj2 = new CSS2DObject(ele2)
obj2.position.y = 100
box2.add(obj2)
obj2.name = 'tag'
obj2.visible = false


export default group