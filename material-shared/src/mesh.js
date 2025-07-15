import * as THREE from 'three'

const geometry = new THREE.BoxGeometry(100, 100, 100)

const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('green')
})

const box = new THREE.Mesh(geometry, material)

// 克隆一份box，并修改其材质颜色与几何结构 ==> box2的material/geometry修改同样会影响到box上，二者共享了一份材质与几何模型
const box2 = box.clone()
box2.position.y = 200
box2.material.color = new THREE.Color('lightgreen')
const positions = box2.geometry.attributes.position;
for(let i = 0; i< positions.count; i++) {
  positions.setX(i, positions.getX(i) * 2);
}

// ===> 解决该问题也很简单，针对geometry和material分别再拷贝一份即可 --> 如此就不会影响到clone的对象了
const box3 = box.clone()
box3.geometry = box.geometry.clone()
box3.material = box.material.clone()
box3.material.color = new THREE.Color('gold')
box3.position.y = 400
const positions3 = box3.geometry.attributes.position;
for(let i = 0; i< positions3.count; i++) {
  positions3.setX(i, positions3.getX(i) * 2);
  positions3.setZ(i, positions3.getZ(i) * 2);
}

export {
    box, box2, box3
}