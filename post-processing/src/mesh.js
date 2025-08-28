import * as THREE from 'three'

function createMesh(color, x) {
    const geometry = new THREE.DodecahedronGeometry(100)
    const material = new THREE.MeshPhongMaterial({
        color
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = x

    return mesh
}

const mesh1 = createMesh(new THREE.Color('pink'), 0)
const mesh2 = createMesh(new THREE.Color('red'), 300)
const mesh3 = createMesh(new THREE.Color('green'), -300)

const group = new THREE.Group()
group.add(mesh1)
group.add(mesh2)
group.add(mesh3)

export default group