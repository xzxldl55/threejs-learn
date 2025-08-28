import * as THREE from 'three';

const group = new THREE.Group();

function createPlane(x, y) {
    const texture = new THREE.CanvasTexture(createCanvas2())
    texture.colorSpace = THREE.SRGBColorSpace
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshPhongMaterial({
        // color: 'white'
        map: texture
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, 0);
    return mesh;
}

function createCanvas() {
    const dpr = (window.devicePixelRatio || 1) * 16 // 放大dpr，绘制效果更精细，抗锯齿
    const canvas = document.createElement('canvas')
    const w = canvas.width = 100 * dpr
    const h = canvas.height = 100 * dpr

    const c = canvas.getContext('2d')
    c.imageSmoothingEnabled = true
    c.imageSmoothingQuality = 'high'
    c.translate(w / 2, h / 2)
    c.arc(0, 0, 40 * dpr, 0, Math.PI * 2)
    c.fillStyle = 'orange'
    c.fill()

    c.beginPath()
    c.moveTo(-10 * dpr, -20 * dpr)
    c.lineTo(-10 * dpr, 20 * dpr)
    c.lineTo(20 * dpr, 0)
    c.closePath()
    c.fillStyle = 'white'
    c.fill()

    return canvas
}

function createCanvas2() {
    const dpr = (window.devicePixelRatio || 1) * 16 // 放大dpr，绘制效果更精细，抗锯齿
    const canvas = document.createElement('canvas')
    const w = canvas.width = 100 * dpr
    const h = canvas.height = 100 * dpr

    const ctx = canvas.getContext('2d')
    ctx.translate(w / 2, h / 2)
    ctx.moveTo(-50 * dpr, -10 * dpr)
    ctx.lineTo(50 * dpr, -10 * dpr);
    ctx.lineTo(-30 * dpr, 50 * dpr);
    ctx.lineTo(0 * dpr, -50 * dpr);
    ctx.lineTo(30 * dpr, 50 * dpr);
    ctx.lineTo(-50 * dpr, -10 * dpr);
    ctx.closePath();
    ctx.strokeStyle = "red";
    ctx.stroke();
    // ctx.fillStyle = 'red'
    // ctx.fill()

    return canvas
}

group.add(createPlane(-300, 0));
group.add(createPlane(0, 0));
group.add(createPlane(300, 0));

export default group;