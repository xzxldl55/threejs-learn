import * as THREE from 'three'

const fontSize = 32

function createCanvas(text, width) {
    const canvas = document.createElement('canvas')
    const dpr = window.devicePixelRatio
    const w = canvas.width = width * dpr
    const h = canvas.height = 50 * dpr

    const ctx = canvas.getContext('2d')
    ctx.translate(w / 2, h / 2)
    ctx.fillStyle = '#ffffff'
    ctx.font = `normal ${fontSize * dpr}px 微软雅黑`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillText(text, 0, 0)
    return canvas
}

export default function createLabel(text) {
    const texture = new THREE.CanvasTexture(createCanvas(text, text.length * fontSize))

    const spriteMaterial = new THREE.SpriteMaterial({
        map: texture
    })

    const label = new THREE.Sprite(spriteMaterial)
    label.scale.set(text.length * fontSize, 50)
    return label
}