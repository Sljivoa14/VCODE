//povezat sve
const canvas = document.getElementById("gameCanvas ");
const ctx = canvas.getContext("2d");

const nextCanvas = document.getElementById("nextCanvas");
const nextCtx = nextCanvas.getContext("2d");



const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("restartBtn");

const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const linesDisplay = document.getElementById("lines");

const gameOverscreen = document.getElementById("gameOverScreen");
const finalScoreDisplay = document.getElementById("finalScore");
const finalLevelDisplay = document.getElementById("finalLevel");
const finalLinesDisplay = document.getElementById("finalLines");
const restartGameBtn = document.getElementById("restartGameBtn");

const COLS = 10;
const ROWS = 20;
const BLOCK = 24;

let board, current, next;
let score, lines, level;
let dropInterval, lastTime, dropCounter;
let paused = false;
let gameOver = false;
let linesCleared = 0;



const COLORS= {
    I: "#0DC2FF", // cyan
    J: "#FF0D72", // pink
    L: "#FF8E0D", // orange
    O: "#FFE138", // yellow
    S: "#0DFF72", // green
    T: "#F538FF", // purple
    Z: "#3877FF"  // blue
};
 

const TETROMINOS = {
    I: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    J: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    L: [
        [0, 0, 1],   // ⚠️ fix here (see below)
        [1, 1, 1],
        [0, 0, 0]
    ],
    O: [
        [1, 1],
        [1, 1]
    ],
    S: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    T: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ]
};
   


/*const gridSize = 30;
let gameOver = false;

let paused = false;
let score = 0;
let level = 1;
let linesCleared = 0;
let dropInterval = 1000; // initial drop speed
let lastDropTime = 0;
let time = 0;

let currentPiece = null;
let nextPiece = null;
let grid = createEmptyGrid(10, 20);
*/

//dfinisat oblike 
function createPiece(type) {
    const piece = {
        shape: TETREMINOS[type],
        color: COLORS[type],
        row: 0,
        col: Math.floor(COLS / 2) - Math.ceil(TETREMINOS[type][0].length / 2)
    };
    return piece;
}
//boje

//random piece generator
function randomPiece() {
    const keys = Object.keys(TETREMINOS);
    const type= keys[Math.floor(Math.random() * keys.length)];
    return createPiece(type);
}

// funkcije za drawCell
function drawCell(x, y, color, size = BLOCK) {
    ctx.fillStyle = color;
    ctx.fillRect(x * size, y * size, size, size);

    ctx.strokeStyle = "#000";
    ctx.strokeRect (x * size, y * size, size, size);


}
//drawBoard
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
}

// funkcije za rotiranje

// funkcije za provjeru kolizije

// funkcije za crtanje

// funkcije za brisanje linija

//funkcije za gravity



//resetovanje igre
function resetGame() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    score = 0;
    lines = 0;
    level = 1;
    linesCleared = 0;
    // other reset logic
    dropInterval = 900; // reset drop speed
    DropTime = 0;
    lastTime = 0;

    paused = false;
    gameOver = false;

    currentPiece =randomPiece();
    nextPiece = randomPiece();

    gameOverscreen.classList.remove("show");
    updateUI();

}

//event listeneri