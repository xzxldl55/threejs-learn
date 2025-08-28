/**
 * 使用Canvas + Sprite来模拟标注效果
 * Canvas可绘制文字等内容，作为Sprite的2D贴图进行渲染
 * 
 * 需要手动的动态计算canvas应该的大小和对应sprite的大小
 */
import * as THREE from 'three';

let length = 0
const fontSize = 92

function createCanvas(text) {
    const canvas = document.createElement("canvas");
    const dpr = window.devicePixelRatio;
    const w = canvas.width = length * fontSize * dpr;

    const h = canvas.height = 300 * dpr;

    const c = canvas.getContext('2d');
    c.translate(w / 2, h / 2);
    c.fillStyle = "#ffffff";
    c.font = "normal " + 92 * dpr + "px 微软雅黑";
    c.textBaseline = "middle";
    c.textAlign = "center";
    c.fillText(text, 0, 0);
    return canvas;
}

const str = '使用Sprite + Canvas标注'
length = str.length


const texture = new THREE.CanvasTexture(createCanvas(str));

const spriteMaterial = new THREE.SpriteMaterial({
    map: texture
});

const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(length * fontSize, 300);
export default sprite;
