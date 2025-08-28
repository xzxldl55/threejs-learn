import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import mesh from './mesh.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js'
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js'
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { HalftonePass } from 'three/addons/postprocessing/HalftonePass.js'
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js'
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js';

const scene = new THREE.Scene()
scene.add(mesh)

const { innerWidth: width, innerHeight: height } = window

const directionLight = new THREE.DirectionalLight(0xffffff, 2)
directionLight.position.set(500, 400, 300)
scene.add(directionLight)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(800)
// scene.add(axesHelper)

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000)
camera.position.set(500, 500, 500)
camera.lookAt(0, 0, 0)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  // antialias: true
})
renderer.setSize(width, height)
document.body.append(renderer.domElement)

const composer = new EffectComposer(renderer)
// 后期处理效果展示
{
  // 1. 渲染3d效果
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  // 2. 闪烁故障效果
  const glitchPass = new GlitchPass()
  // composer.addPass(glitchPass)

  // 3. 运动残影效果
  const afterimagePass = new AfterimagePass()
  // composer.addPass(afterimagePass)

  // 4. 电影雪花片效果
  const filmPass = new FilmPass(1, false) // 强度, 是否灰白处理
  // composer.addPass(filmPass)

  // 5. 发光效果 --> 模拟unreal引擎的高质量泛光效果，对性能有更高要求，可以使用低位替代 bloomPass
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window, height), 1.5, 0.5, 0.2) // 
  // composer.addPass(bloomPass)

  // 6. 三色圆点效果
  const halftonePass = new HalftonePass({
    radius: 5
  })
  // composer.addPass(halftonePass)

  // 7. 描边效果
  const outlinePass = new OutlinePass(new THREE.Vector2(window, height), scene, camera, [mesh])
  outlinePass.visibleEdgeColor.set('gold')
  outlinePass.edgeStrength = 20; // 亮光强度
  outlinePass.edgeThickness = 10; // 边缘厚度
  outlinePass.pulsePeriod = 1; // 闪烁间隔时间
  // composer.addPass(outlinePass)

  // 8. 抗锯齿（可以替换renderer.antialias）
  /**
   * antialias抗锯齿硬件加速 消耗少 但仅对几何边缘进行抗锯齿
   * SMAA 对几何、纹理、阴影、后期处理都能抗锯齿 ，兼容性高 ，但性能开销大，调整后可能有边缘模糊
   */
  const pixelRatio = renderer.getPixelRatio();
  const smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio)
  composer.addPass(smaaPass)

  // 9. 伽马校正：很多通道会导致物体原本颜色变化，此时可以使用ShaderPass进行伽马校正来校正颜色
  const gammaPass = new ShaderPass(GammaCorrectionShader)
  composer.addPass(gammaPass)
}

function render() {
  // renderer.render(scene, camera)
  composer.render()
  requestAnimationFrame(render)
}
render()

const controls = new OrbitControls(camera, renderer.domElement)