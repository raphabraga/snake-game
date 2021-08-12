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
  switch (direction) {
    case "left":
      headX = headX === 0 * box ? 15 * box : headX - box;
      break;
    case "right":
      headX = headX === 15 * box ? 0 : headX + box;
      break;
    case "up":
      headY = headY === 0 * box ? 15 * box : headY - box;
      break;
    case "down":
      headY = headY === 15 * box ? 0 : headY + box;
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

const changeDirection = (pressKeyEvent) => {
  switch (pressKeyEvent.key) {
    case "ArrowLeft":
      direction = direction === "right" ? "right" : "left";
      break;
    case "ArrowRight":
      direction = direction === "left" ? "left" : "right";
      break;
    case "ArrowUp":
      direction = direction === "down" ? "down" : "up";
      break;
    case "ArrowDown":
      direction = direction === "up" ? "up" : "down";
      break;
    default:
      break;
  }
};

window.addEventListener("keydown", changeDirection);
let gameRender = refreshRender();
