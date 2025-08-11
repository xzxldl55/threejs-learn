import * as THREE from 'three'
import SpriteText from 'three-spritetext'

const TEXT = ['我', '是', '一', '个', '人', '不', '要', '看', '眼', '睛']


const { innerWidth: width, innerHeight: height } = window

const columnWidht = 50 // 列宽
const columnNum = Math.floor(width / columnWidht) // 列数

const fontSize = 28
const lineHeight = fontSize * 1.3

const textNumOfColumn = Math.ceil(height * 2 / lineHeight) // 每列文本数量（这里X2，因为要滚动所以是双倍的）

const group = new THREE.Group()
const columns = []

for (let i = 0; i < columnNum; i++) {
    const column = []

    for (let j = 0; j < textNumOfColumn; j++) {
        const text = TEXT[Math.floor(Math.random() * 10)]; // 生成一个十以内的随机整数作为内容
        const spriteText = new SpriteText(text, fontSize, 'green')
        spriteText.strokeWidth = 1
        spriteText.strokeColor = 'lightgreen'
    
        const x = i * columnWidht
        const y = j * lineHeight + Math.random() * 50 // 使用随机数进行y轴方向的随机偏移
        spriteText.position.set(x, y, 0)
        spriteText.material.opacity = 0.2 + Math.random() * 0.5 // 设置文字随机透明度[0.5, 1)
        group.add(spriteText)
        column.push(spriteText)
    }

    columns.push(column)
}

function fallAnimate() {
    columns.forEach(column => {
        column.forEach(spriteText => {
            spriteText.position.y -= 2 + 6 * Math.random()
            if (spriteText.position.y < 0) {
                spriteText.position.y = height // 重置到顶部
            }
        })
    })
    requestAnimationFrame(fallAnimate)
}
fallAnimate()

export default group

