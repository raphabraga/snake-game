let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let direction = "right";
let boardSize = 16;
let snakeInitial = 8;
let snake = [];
snake[0] = {
  x: snakeInitial * box,
  y: snakeInitial * box,
};
let foodPosition = null;

const createBackground = () => {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, boardSize * box, boardSize * box);
};

const drawSnake = () => {
  context.fillStyle = "green";
  snake.forEach((el) => context.fillRect(el.x, el.y, box, box));
};

const setFood = () => {
  let randomPosition;
  do {
    randomPosition = {
      x: box * Math.floor(boardSize * Math.random()),
      y: box * Math.floor(boardSize * Math.random()),
    };
  } while (snake.some((el) => el === randomPosition));
  foodPosition = randomPosition;
};

const drawFood = () => {
  context.fillStyle = "red";
  context.fillRect(foodPosition.x, foodPosition.y, box, box);
};

const gameStart = () => {
  createBackground();
  drawSnake();
  if (
    foodPosition === null ||
    (foodPosition?.x === snake[0].x && foodPosition?.y === snake[0].y)
  )
    setFood();
  drawFood();

  let { x: headX, y: headY } = snake[0];
  switch (direction) {
    case "left":
      headX = headX === 0 * box ? (boardSize - 1) * box : headX - box;
      break;
    case "right":
      headX = headX === (boardSize - 1) * box ? 0 : headX + box;
      break;
    case "up":
      headY = headY === 0 * box ? (boardSize - 1) * box : headY - box;
      break;
    case "down":
      headY = headY === (boardSize - 1) * box ? 0 : headY + box;
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
