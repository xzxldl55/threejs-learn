使用Draco压缩gltf模型，提升加载速度

1. 使用gltf-pipeline对gltf模型进行draco压缩

> gltf-pipeline -i ./public/CesiumMan.glb -o ./public/CesiumMan-draco.glb -d

2. 引用draco压缩后的模型

此时模型无法直接进行引用了，需要使用对应的额解压缩工具 DRACOLoader 进行解压缩才能加载

![示例](./src/draco-mesh.js)