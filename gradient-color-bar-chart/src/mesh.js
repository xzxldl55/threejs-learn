import * as THREE from 'three'

const group = new THREE.Group()

// 基于X、Y轴画两条轴线长度100
function createLine(type) {
  const points = [
    new THREE.Vector3(0, 0, 0),
    type === 'y' ? new THREE.Vector3(0, 100, 0) : new THREE.Vector3(100, 0, 0),
  ]

  const geometry = new THREE.BufferGeometry()
  const material = new THREE.LineBasicMaterial({
    color: '#ffffff'
  })

  geometry.setFromPoints(points)

  const line = new THREE.Line(geometry, material)
  return line
}

// 绘制刻度
function createScaleLine(type) {
  const points = [];
  for (let i = 0; i <= 100; i += 10) {
    if (type === 'y') {
      points.push(new THREE.Vector3(0, i, 0))
      points.push(new THREE.Vector3(-5, i, 0)) // 绘制刻度线长度为 5
    } else {
      points.push(new THREE.Vector3(i, 0, 0))
      points.push(new THREE.Vector3(i, -5, 0)) // 绘制刻度线长度为 5
    }
  }

  const geometry = new THREE.BufferGeometry
  const material = new THREE.LineBasicMaterial({
    color: '#ffffff'
  })

  geometry.setFromPoints(points)

  const scaleLine = new THREE.LineSegments(geometry, material)
  return scaleLine
}

// 绘制柱状图
function createBar(dataArr) {
  const bars = new THREE.Group()

  dataArr.forEach((data, i) => {
    const geometry = new THREE.PlaneGeometry(10, data) // 柱状图宽度为10，高度为数据值
    const positions = geometry.attributes.position
    const height = Math.max(...dataArr)

    const colorArr = []
    const color1 = new THREE.Color('red')
    const color2 = new THREE.Color('blue')
    for (let i = 0; i < positions.count; i++) {
      const percent = (positions.getY(i) + data / 2) / height // 获取当前柱高度每隔点相对最大值高度的百分比，作为颜色渐变的依据
      const c = color1.clone().lerp(color2, percent)
      colorArr.push(c.r, c.g, c.b)
    }
    const colors = new Float32Array(colorArr)
    geometry.attributes.color = new THREE.BufferAttribute(colors, 3)

    const material = new THREE.MeshBasicMaterial({
      // color: 'orange',
      vertexColors: colors,
      side: THREE.DoubleSide
    })

    const bar = new THREE.Mesh(geometry, material)
    bar.position.x = 10 + i * 20 + 5 // 第一个10为空置最前面10的位置，i*20为距离前一个柱的距离10+前一个柱自身宽度10，第三个 5则因为Plan的0坐标在自己中间，所以要加上10/2=5
    bar.position.y = data / 2 // 柱状图的中心位置设置为数据值的一半，这样柱状图就会从Y轴的0位置开始绘制
    bars.add(bar)
  })

  bars.add(createNum(dataArr))

  return bars
}

function createNum(dataArr) {
  const nums = new THREE.Group()
  dataArr.forEach((item, i) => {
    const textaure = new THREE.CanvasTexture(createCanvas(item))
    const geometry = new THREE.PlaneGeometry(10, 10)
    const material = new THREE.MeshBasicMaterial({
      // color: 'orange',
      map: textaure,
      side: THREE.DoubleSide
    })
    const num = new THREE.Mesh(geometry, material)
    num.position.y = item + 10 // 放置到柱狀圖的上面距離10的位置
    num.position.x = 10 + i * 20 + 5
    nums.add(num)
  })
  return nums
}

// 将文字画到canvas上，再将canvas放到Three上
function createCanvas(text) {
  const canvas = document.createElement('canvas')
  const w = canvas.width = 100
  const h = canvas.height = 100

  const ctx = canvas.getContext('2d')
  ctx.translate(w / 2, h / 2) // 坐标原点移动到画布的中心位置
  ctx.fillStyle = '#ffffff'
  ctx.font = 'normal 48px 宋体'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(text, 0, 0)
  return canvas
}

const xLine = createLine('x')
const yLine = createLine('y')
const xScaleLine = createScaleLine('x')
const yScaleLine = createScaleLine('y')
const bars = createBar([70, 50, 40, 80, 120])

group.add(xLine, yLine, xScaleLine, yScaleLine, bars)

export default group