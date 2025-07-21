import * as THREE from 'three'
import { CSS3DObject } from 'three/addons/Addons.js'

const geometry = new THREE.BoxGeometry(800, 500, 100)
const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('skyblue')
})
const mesh = new THREE.Mesh(geometry, material)

const ele = document.createElement('div')
ele.innerHTML = `
    <iframe src="https://www.baidu.com" width="700px" height="400px" style="border:none;"></iframe>
`
ele.style.backfaceVisibility = 'hidden' // 背面看隐藏
const obj = new CSS3DObject(ele)
obj.position.y = 0

mesh.add(obj)

export default mesh