// 获取游戏面板和得分元素
const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');

// 游戏设置
const GRID_SIZE = 20;
let snake = [
    { x: 10, y: 10 }
];
let food = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
let direction = { x: 0, y: 0 };
let score = 0;

// 游戏循环
function gameLoop() {
    // 更新蛇的位置
    update();
    // 绘制游戏面板
    draw();
    // 每秒执行3次
    setTimeout(gameLoop, 1000 / 3);
}

// 更新蛇的位置
function update() {
    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        food = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
    } else {
        // 移除蛇的尾部
        snake.pop();
    }

    // 检查是否撞到墙或自己
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || isColliding(head)) {
        // 游戏结束
        alert('游戏结束！你的得分是: ' + score);
        // 重置游戏
        snake = [
            { x: 10, y: 10 }
        ];
        direction = { x: 0, y: 0 };
        score = 0;
        scoreElement.textContent = score;
    }

    // 添加新的头部
    snake.unshift(head);
}

// 检查是否撞到自己
function isColliding(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

// 绘制游戏面板
function draw() {
    // 清空游戏面板
    gameBoard.innerHTML = '';

    // 绘制蛇
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y + 1;
        snakeElement.style.gridColumnStart = segment.x + 1;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });

    // 绘制食物
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y + 1;
    foodElement.style.gridColumnStart = food.x + 1;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

// 监听键盘事件
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// 启动游戏
gameLoop();