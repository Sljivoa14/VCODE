const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const nextCanvas = document.getElementById("nextCanvas");
const nextCtx = nextCanvas.getContext("2d");

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const linesEl = document.getElementById("lines");

const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");

const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const finalLevel = document.getElementById("finalLevel");
const finalLines = document.getElementById("finalLines");
const restartGameBtn = document.getElementById("restartGameBtn");

const COLS = 10;
const ROWS = 20;
const BLOCK = 24;

let board, current, next;
let score, lines, level;
let dropInterval, lastTime, dropCounter;
let paused = false;
let gameOver = false;

const TETROMINOES = {
  I: [[1,1,1,1]],
  O: [[1,1],[1,1]],
  T: [[0,1,0],[1,1,1]],
  L: [[1,0,0],[1,1,1]],
  J: [[0,0,1],[1,1,1]],
  S: [[0,1,1],[1,1,0]],
  Z: [[1,1,0],[0,1,1]]
};

const COLORS = {
  I: "cyan",
  O: "yellow",
  T: "purple",
  L: "orange",
  J: "blue",
  S: "green",
  Z: "red"
};

function resetGame() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  score = 0;
  lines = 0;
  level = 1;
  dropInterval = 800;
  dropCounter = 0;
  lastTime = 0;
  paused = false;
  gameOver = false;

  current = randomPiece();
  next = randomPiece();

  updateUI();
  gameOverScreen.classList.remove("show");
}

function randomPiece() {
  const keys = Object.keys(TETROMINOES);
  const type = keys[Math.floor(Math.random() * keys.length)];
  return {
    shape: TETROMINOES[type],
    type,
    row: 0,
    col: 3
  };
}

function drawCell(ctx, x, y, color, size = BLOCK) {
  ctx.fillStyle = color;
  ctx.fillRect(x * size, y * size, size, size);

  ctx.strokeStyle = "black";
  ctx.strokeRect(x * size, y * size, size, size);
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) drawCell(ctx, x, y, COLORS[cell]);
    });
  });
}

function drawPiece(piece, context, offsetX = 0, offsetY = 0, size = BLOCK) {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        drawCell(context, piece.col + x + offsetX, piece.row + y + offsetY, COLORS[piece.type], size);
      }
    });
  });
}

function drawNext() {
  nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);

  next.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        drawCell(nextCtx, x + 1, y + 1, COLORS[next.type], 20);
      }
    });
  });
}

function collision(offsetX = 0, offsetY = 0, shape = current.shape) {
  return shape.some((row, y) => {
    return row.some((value, x) => {
      if (!value) return false;

      let newX = current.col + x + offsetX;
      let newY = current.row + y + offsetY;

      return (
        newX < 0 ||
        newX >= COLS ||
        newY >= ROWS ||
        (newY >= 0 && board[newY][newX])
      );
    });
  });
}

function merge() {
  current.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        board[current.row + y][current.col + x] = current.type;
      }
    });
  });
}

function clearLines() {
  let cleared = 0;

  board = board.filter(row => {
    if (row.every(cell => cell !== 0)) {
      cleared++;
      return false;
    }
    return true;
  });

  while (board.length < ROWS) {
    board.unshift(Array(COLS).fill(0));
  }

  if (cleared > 0) {
    lines += cleared;
    score += [0, 100, 300, 500, 800][cleared] * level;

    level = Math.floor(lines / 10) + 1;
    dropInterval = Math.max(100, 800 - (level - 1) * 70);

    updateUI();
  }
}

function updateUI() {
  scoreEl.textContent = score;
  linesEl.textContent = lines;
  levelEl.textContent = level;
}

function spawn() {
  current = next;
  current.row = 0;
  current.col = 3;
  next = randomPiece();

  if (collision()) {
    endGame();
  }
}

function moveDown() {
  if (!collision(0, 1)) {
    current.row++;
  } else {
    merge();
    clearLines();
    spawn();
  }
}

function rotate() {
  const rotated = current.shape[0].map((_, i) =>
    current.shape.map(row => row[i]).reverse()
  );

  const prev = current.shape;
  current.shape = rotated;

  if (collision()) current.shape = prev;
}

function update(time = 0) {
  if (paused || gameOver) return;

  const delta = time - lastTime;
  lastTime = time;
  dropCounter += delta;

  if (dropCounter > dropInterval) {
    moveDown();
    dropCounter = 0;
  }

  drawBoard();
  drawPiece(current, ctx);
  drawNext();

  requestAnimationFrame(update);
}

function endGame() {
  gameOver = true;
  finalScore.textContent = score;
  finalLevel.textContent = level;
  finalLines.textContent = lines;
  gameOverScreen.classList.add("show");
}

document.addEventListener("keydown", e => {
  if (gameOver) return;

  if (e.key === "ArrowLeft") {
    if (!collision(-1, 0)) current.col--;
  }
  if (e.key === "ArrowRight") {
    if (!collision(1, 0)) current.col++;
  }
  if (e.key === "ArrowDown") {
    moveDown();
  }
  if (e.key === "ArrowUp") {
    rotate();
  }
  if (e.code === "Space") {
    paused = !paused;
    if (!paused) update();
  }
});

pauseBtn.onclick = () => {
  paused = !paused;
  if (!paused) update();
};

restartBtn.onclick = () => {
  resetGame();
  update();
};

restartGameBtn.onclick = () => {
  resetGame();
  update();
};

// start game
resetGame();
update();