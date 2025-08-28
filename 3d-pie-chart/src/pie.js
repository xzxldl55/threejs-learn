import * as THREE from 'three';
import { LineMaterial } from 'three/examples/jsm/Addons.js';
import createLabel from './label.js';

const data = [
	{
		name: '春节销售额',
		value: 1000,
	},
	{
		name: '夏节销售额',
		value: 3000,
	},
	{
		name: '秋节销售额',
		value: 800,
	},
	{
		name: '冬节销售额',
		value: 500,
	},
];

const group = new THREE.Group();
const R = 300;

// 随机颜色获取生成器，不放回获取
function genRandomColorGetter(colors = ['red', 'pink', 'blue', 'purple', 'orange', 'lightblue', 'green', 'lightgreen']) {
	let usedColor = [];
	let execCount = 0;
	function getRandomColor() {
		execCount++;
		if (execCount > colors.length) {
			throw new Error('no more color');
		}
		let index = Math.floor(Math.random() * colors.length);
		while (usedColor.includes(index)) {
			// TODO:性能堪忧
			index = Math.floor(Math.random() * colors.length);
		}
		usedColor.push(index);
		return colors[index];
	}

	return getRandomColor;
}

function createPieChart(data) {
	let total = 0; // 总值大小
	data.forEach((item) => {
		total += item.value;
	});

	const angles = data.map((item) => (item.value / total) * 360); // 计算每一项应占据角度

	const getRandomColor = genRandomColorGetter();

	/**
	 * 首先用 MathUtils.degToRad 把角度转为弧度制。
	 * 开始角度从 0 开始，结束角度就是加上当前的角度。
	 * 然后分别通过两条直线一条弧线把形状画出来之后，用 ExtrudeGeometry 拉伸下。
	 * 两条直线的 x、y 是通过 cos、sin 算出来的。
	 * 下个饼图的 part 的开始角度要加上已经画过的角度。
	 */
	let startAngle = 0;
	angles.forEach((angle, i) => {
		const curvePath = new THREE.CurvePath();

		const rad = THREE.MathUtils.degToRad(angle); // 角度转化为弧度（JS的Math三角函数都是支持弧度的）
		const endAngle = startAngle + rad; // 当前扇形的结束角度

		const x1 = R * Math.cos(startAngle);
		const y1 = R * Math.sin(startAngle); // 扇形开始点

		const x2 = R * Math.cos(endAngle);
		const y2 = R * Math.sin(endAngle); // 扇形结束点

		const v1 = new THREE.Vector2(0, 0); // 都从原点出发
		const v2 = new THREE.Vector2(x1, y1);
		const v3 = new THREE.Vector2(x2, y2);

		// 绘制线段1（原点到v2）
		const line1 = new THREE.LineCurve(v1, v2);
		curvePath.add(line1);

		// 绘制圆弧
		const arc = new THREE.EllipseCurve(0, 0, R, R, startAngle, endAngle);
		curvePath.add(arc);

		// 绘制线段2
		const line2 = new THREE.LineCurve(v1, v3);
		curvePath.add(line2);

		const points = curvePath.getPoints(100);
		const shape = new THREE.Shape(points);

		const geometry = new THREE.ExtrudeGeometry(shape, {
			depth: 100,
		});
		const material = new THREE.MeshPhongMaterial({
			color: getRandomColor(),
		});

		const mesh = new THREE.Mesh(geometry, material);
		group.add(mesh);

		mesh.angle = (startAngle + endAngle) / 2; // 记录中间位置角度，方便做点击交互

		const label = createLabel(data[i].name + '' + data[i].value);
		label.position.x = 400 * Math.cos(mesh.angle);
		label.position.y = 400 * Math.sin(mesh.angle);
		label.position.z = 150;
		mesh.add(label);

		// 设置点击目标都在mesh上，这样在判断点击操作时可以统一对mesh处理，不用找父级
		label.target = mesh;
		mesh.target = mesh;

		startAngle += rad; // 更新开始角度
	});
}

createPieChart(data);

group.rotateX(-Math.PI / 2);

export default group;
