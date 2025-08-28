import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/Addons.js';
import { Easing, Group, Tween } from 'three/examples/jsm/libs/tween.module.js';

const group = new THREE.Group();

for (let i = 0; i < 100; i++) {
	const material = new THREE.SpriteMaterial({
		color: 'orange',
	});
	const sprite = new THREE.Sprite(material);
	sprite.scale.set(100, 100);
	group.add(sprite);

	const x = -2000 + 4000 * Math.random();
	const y = -2000 + 4000 * Math.random();
	const z = -2000 + 4000 * Math.random();

	sprite.position.set(x, y, z);
}

function throttle(fn, time, that = null) {
	let timer = null;
	return function (...args) {
		if (timer) {
			return;
		}
		timer = setTimeout(() => {
			fn.apply(that, args);
			clearTimeout(timer);
			timer = null;
		}, time);
	};
}

const tweenGroup = new Group();
const noise2 = new SimplexNoise();
let time = 0;
function updatePosition() {
	// 利用噪声算法，更新每个随机点的位置，营造抖动位移的效果
	group.traverse((obj) => {
		if (obj.isSprite) {
			const { x, y, z } = obj.position;
			const x2 = x + noise2.noise(x, time) * 50;
			const y2 = y + noise2.noise(y, time) * 50;
			const z2 = z + noise2.noise(z, time) * 50;
			// obj.position.set(x2, y2, z2);

			const tween = new Tween(obj.position)
				.to({ x: x2, y: y2, z: z2 }, 500)
				.easing(Easing.Quadratic.InOut)
				.repeat(0)
				.start()
				.onComplete(() => {
					tweenGroup.remove(tween);
				});
			tweenGroup.add(tween);
		}
	});
	time++;
}

// 利用 tween 补间动画实现缓动效果，这里节流一哈
const throttleUpdatePosition = throttle(updatePosition, 500)

function render() {
	tweenGroup.update();
	throttleUpdatePosition();
	requestAnimationFrame(render);
}
render();

export default group;
