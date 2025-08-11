import * as THREE from 'three'
import SpriteText from 'three-spritetext'

// 使用spritetext自动生成sprite文字标注，将自动计算大小设定颜色
// (文字内容，字体大小，字体颜色)
const spriteText = new SpriteText('使用Sprite + Canvas标注\n支持换行', 48, '#ebca5f');

// And 内部封装了一系列样式控制方法
spriteText.padding = 80;
spriteText.strokeWidth = 2;
spriteText.strokeColor = 'blue';
spriteText.borderColor = '#ffffff';
spriteText.borderWidth = 10;
spriteText.borderRadius = 100;
spriteText.backgroundColor = 'lightpink';

export default spriteText;