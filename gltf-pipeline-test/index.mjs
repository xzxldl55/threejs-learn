import gltfPipeline from 'gltf-pipeline'
import fs from 'fs'

const { gltfToGlb } = gltfPipeline

const content = fs.readFileSync('./model/CesiumMan.gltf', 'utf-8')
const gltfJson = JSON.parse(content)

gltfToGlb(gltfJson, {
    // 设置gltfJson中涉及资源所在目录
    resourceDirectory: './model/'
}).then(function (result) {
    // 打包后将glb文件保存到本地
    fs.writeFileSync('model.glb', result.glb)
})
