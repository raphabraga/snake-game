let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let direction = "right";
let boardSize = 16;
let snakeInitial = Math.floor(boardSize / 2);
let snake = [];
let gameSpeed = 100;
snake[0] = {
  x: snakeInitial * box,
  y: snakeInitial * box,
};
let foodPosition = null;
let rendered = false;
let gameInterval;

const createBackground = () => {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, boardSize * box, boardSize * box);
};

const drawSnake = () => {
  context.fillStyle = "rgb(46, 104, 30)";
  context.fillRect(...Object.values(snake[0]), box, box);
  context.fillStyle = "green";
  snake.slice(1).forEach((el) => {
    context.fillRect(el.x, el.y, box, box);
  });
};

const setFood = () => {
  let randomPosition;
  do {
    randomPosition = {
      x: box * Math.floor(boardSize * Math.random()),
      y: box * Math.floor(boardSize * Math.random()),
    };
  } while (
    snake.findIndex(
      (el) => el.x === randomPosition.x && el.y === randomPosition.y
    ) !== -1
  );
  foodPosition = randomPosition;
};

const drawFood = () => {
  context.fillStyle = "yellow";
  context.fillRect(foodPosition.x, foodPosition.y, box, box);
};

const gameStart = () => {
  rendered = true;
  createBackground();
  drawSnake();
  if (
    snake
      .slice(1)
      .findIndex((el) => el.x === snake[0].x && el.y === snake[0].y) !== -1
  ) {
    window.clearInterval(gameInterval);
    alert("You lose!");
    return;
  }
  if (snake.length === boardSize ** 2) {
    window.clearInterval(gameInterval);
    alert("You win!");
    return;
  }

  if (foodPosition === null) setFood();
  if (foodPosition?.x === snake[0].x && foodPosition?.y === snake[0].y) {
    setFood();
    switch (direction) {
      case "left":
        snake.push({ x: snake[0].x + box, y: snake[0].y });
        break;
      case "right":
        snake.push({ x: snake[0].x - box, y: snake[0].y });
        break;
      case "up":
        snake.push({ x: snake[0] + box, y: snake[0].y + box });
        break;
      case "down":
        snake.push({ x: snake[0].x, y: snake[0].y - box });
        break;
    }
  }
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
  gameInterval = window.setInterval(() => {
    gameStart();
  }, gameSpeed);
};

const changeDirection = (pressKeyEvent) => {
  if (rendered) {
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
  }
  rendered = false;
};

window.addEventListener("keydown", changeDirection);
refreshRender();
