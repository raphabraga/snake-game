let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

createBackground = () => {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
};

drawSnake = (snake) => {
  context.fillStyle = "green";
  snake.forEach((el) => context.fillRect(el.x, el.y, box, box));
};

createBackground();
drawSnake(snake);
