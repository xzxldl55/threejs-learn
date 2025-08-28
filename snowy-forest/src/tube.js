import * as THREE from 'three'

const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1800, 1200, 1000),
    new THREE.Vector3(1000, 600, 850),
    new THREE.Vector3(800, 800, 800),
    new THREE.Vector3(1000, 600, 500),
    new THREE.Vector3(1000, 300, 0),
])

const geometry = new THREE.TubeGeometry(path, 100, 50, 30)
const material = new THREE.PointsMaterial({
    color: new THREE.Color('black'),
    size: 3
})

const tube = new THREE.Points(geometry, material)

export const tubePoints = path.getSpacedPoints(1000)

export default tube