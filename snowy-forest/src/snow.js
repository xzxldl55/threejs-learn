import * as THREE from 'three'

const loader = new THREE.TextureLoader()
const texture = loader.load('./snow.png')
const spriteMaterial = new THREE.SpriteMaterial({
    map: texture
})

const group = new THREE.Group()

for (let i = 0; i < 500; i++) {
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(5, 5);

    const x = -1500 + 3000 * Math.random(); // x -> [-1500, 1500]
    const y = 1000 * Math.random(); // y -> [0, 1000]
    const z = -1500 + 3000 * Math.random(); // z -> [-1500, 1500]
    sprite.position.set(x, y, z);

    group.add(sprite);
}

const clock = new THREE.Clock()
function render() {
    const delta = clock.getDelta()
    group.children.forEach(snow => {
        snow.position.y -= delta * 100

        if (snow.position.y < 0) {
            snow.position.y = 1000 // 落到地上后从天上复位
        }
    })
    requestAnimationFrame(render)
}

render()

export default group