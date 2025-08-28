import * as THREE from 'three'

const geometry = new THREE.BoxGeometry(300, 300, 300);
const material = new THREE.MeshLambertMaterial({
  color: 'orange'
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh