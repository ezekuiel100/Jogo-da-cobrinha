let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const size = 20;
let snake = [{ x: 0, y: 100 }];

let food = { x: 60, y: 200 };

let direcao;

function DesenharSnake() {
  snake.forEach((posicao, i) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(posicao.x, posicao.y, size, size);
  });
}

function DesenharGrade() {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";

  for (let i = 20; i < 600; i += 20) {
    ctx.beginPath();
    ctx.lineTo(i, 0);
    ctx.lineTo(i, 500);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(600, i);
    ctx.stroke();
  }
}

function Comida() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, size, size);
}

function MoverSnake() {
  if (!direcao) return;

  let cabecaSnake = snake[snake.length - 1];

  if (direcao == "right") {
    snake.push({ x: cabecaSnake.x + 20, y: cabecaSnake.y });
  }

  if (direcao == "left") {
    snake.push({ x: cabecaSnake.x - 20, y: cabecaSnake.y });
  }

  if (direcao == "up") {
    snake.push({ x: cabecaSnake.x, y: cabecaSnake.y - 20 });
  }

  if (direcao == "down") {
    snake.push({ x: cabecaSnake.x, y: cabecaSnake.y + 20 });
  }

  snake.shift();
}

function ChegarComeu() {
  let cabecaSnake = snake[snake.length - 1];

  if (cabecaSnake.x == food.x && cabecaSnake.y == food.y) {
    snake.push(cabecaSnake);
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp" && direcao != "down") {
    direcao = "up";
  }
  if (e.key == "ArrowDown" && direcao != "up") {
    direcao = "down";
  }
  if (e.key == "ArrowRight" && direcao != "left") {
    direcao = "right";
  }

  if (e.key == "ArrowLeft" && direcao != "right") {
    direcao = "left";
  }
});

let loop;

function Game() {
  clearTimeout(loop);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Comida();
  DesenharSnake();
  MoverSnake();
  ChegarComeu();
  DesenharGrade();

  loop = setTimeout(() => {
    Game();
  }, 200);
}
Game();
