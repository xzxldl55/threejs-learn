import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Group, Tween, Easing } from 'three/examples/jsm/libs/tween.module.js';
// import mesh from './mesh.js';
import pie from './pie.js';

const scene = new THREE.Scene();
scene.add(pie);

const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.set(500, 400, 300);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const helper = new THREE.AxesHelper(1000);
// scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
camera.position.set(500, 600, 800);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
	antialias: true,
});
renderer.setSize(width, height);

const tweenGroup = new Group();
function render() {
	tweenGroup.update();
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

renderer.domElement.addEventListener('click', (e) => {
	const x = (e.offsetX / width) * 2 - 1;
	const y = -((e.offsetY / height) * 2 - 1);

	const rayCaster = new THREE.Raycaster();
	rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

	const intersections = rayCaster.intersectObjects(pie.children);

	if (intersections.length) {
		const obj = intersections[0].object.target;

		// 先重制所有的饼的位置
		pie.traverse((item) => {
			if (item.isSprite) {
				return;
			}
			// 加入补间动画
			const tween = new Tween(item.position)
				.to(
					{
						x: 0,
						y: 0,
					},
					500
				)
				.easing(Easing.Quadratic.InOut)
				.repeat(0)
				.onComplete(() => {
					tweenGroup.remove(tween);
				})
				.start();
			tweenGroup.add(tween);
		});

		const tween = new Tween(obj.position)
			.to(
				{
					x: 100 * Math.cos(obj.angle),
					y: 100 * Math.sin(obj.angle),
				},
				500
			)
			.easing(Easing.Quadratic.InOut)
			.repeat(0)
			.onComplete(() => {
				tweenGroup.remove(tween);
			})
			.start();
		tweenGroup.add(tween);

		obj.position.x = 100 * Math.cos(obj.angle);
		obj.position.y = 100 * Math.sin(obj.angle);
	}
});
