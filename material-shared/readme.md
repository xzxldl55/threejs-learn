共享材质

`mesh.clone`得到的克隆体，其geometry和material是与原体共享的，即我们修改克隆体的材质等参数会影响到原物体上。

此时可以通过针对geometry和material也克隆一次来实现独立，如此对克隆体的修改则是独立的
```js
const box3 = box.clone()
box3.geometry = box.geometry.clone()
box3.material = box.material.clone()
```