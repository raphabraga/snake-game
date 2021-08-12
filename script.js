let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let direction = "right";

const createBackground = () => {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
};

const drawSnake = () => {
  context.fillStyle = "green";
  snake.forEach((el) => context.fillRect(el.x, el.y, box, box));
};

const gameStart = () => {
  createBackground();
  drawSnake();

  let { x: headX, y: headY } = snake[0];
  console.log(headX, headY);
  switch (direction) {
    case "left":
      headX -= box;
      break;
    case "right":
      headX = headX === 16 * box ? 0 : headX + box;
      break;
    case "up":
      headY -= box;
      break;
    case "down":
      headY -= box;
      break;
    default:
      break;
  }
  snake.pop();
  snake.unshift({ x: headX, y: headY });
};

const refreshRender = () => {
  window.setInterval(() => {
    gameStart();
  }, 100);
};

let gameRender = refreshRender();
