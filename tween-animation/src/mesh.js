import * as THREE from 'three'

const geometry = new THREE.BoxGeometry(100, 100, 100)
const material = new THREE.MeshPhongMaterial({
    color: new THREE.Color('green')
})

const box = new THREE.Mesh(geometry, material)

export default box

