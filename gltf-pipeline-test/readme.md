使用gltf-pipeline包将glb转换成 gltf + bin + jpg，反之亦然

使用命令：将glb转换成内联的gltf
> npx gltf-pipeline -i CesiumMan.glb -o CesiumMan.gltf

使用命令：将glb转换成分离的gltf（增加参数 -s）
> npx gltf-pipeline -i CesiumMan.glb -o ./model/CesiumMan.gltf -s

使用命令：将gltf转glb
> npx gltf-pipeline -i CesiumMan.gltf -o CesiumMan.glb