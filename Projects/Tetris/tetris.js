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

const COLS = 10; // standard Tetris grid width
const ROWS = 20; // standard Tetris grid height
const BLOCK = 24; // size of each block in pixels

let board, current, next; // game state variables
let score, lines, level; // game stats variables
let dropInterval, lastTime, dropCounter; // timing variables
let paused = false; // game control variables
let gameOver = false; // game over state variable
let linesCleared = 0; // track lines cleared for level progression

const COLORS= {                     // define colors for each piece type
    I: "#0DC2FF", // cyan
    J: "#FF0D72", // pink
    L: "#FF8E0D", // orange
    O: "#FFE138", // yellow
    S: "#0DFF72", // green
    T: "#F538FF", // purple
    Z: "#3877FF"  // blue
};
 

const TETROMINOS = {                // define shapes for each piece type
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
        [0, 0, 1],   
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
function createPiece(type) {                    // create a new piece object based on the type
    const piece = {
        shape: TETREMINOS[type],                // get the shape array for the specified type
        type: type,                             // store the type of the piece
        color: COLORS[type],
        row: 0,                                     // start at the top of the board
        col: Math.floor(COLS / 2) - Math.ceil(TETREMINOS[type][0].length / 2) // center the piece horizontally, ceil is used to handle odd-width pieces like T and S/Z
    };
    return piece;                               // return the newly created piece object
}
//boje

//random piece generator
function randomPiece() {                                // get a random piece type from the TETROMINOS keys and create a new piece
    const keys = Object.keys(TETREMINOS);               // get an array of the piece types (I, J, L, O, S, T, Z)
    const type= keys[Math.floor(Math.random() * keys.length)];        // select a random type from the array
    return createPiece(type);                                   // create and return a new piece object of the selected type                                      
}

// funkcije za drawCell
function drawCell(x, y, color, size = BLOCK) {                  // set the fill color and draw a filled rectangle for the cell, drawCell is used to draw both the pieces and the board cells
    ctx.fillStyle = color;                                      //ctx is the canvas context used for drawing, color is the color to fill the cell, size is the size of the cell (default is BLOCK)
    ctx.fillRect(x * size, y * size, size, size);                   // draw the filled rectangle at the correct position based on the x and y coordinates multiplied by the size of the cell
    ctx.strokeStyle = "#000";                           // set the stroke color to black for the cell borders and strok is used to draw the borders of the cells, making them visually distinct on the board
    ctx.strokeRect (x * size, y * size, size, size);        // draw the rectangle border at the same position and size as the filled rectangle, strokeRect is used to draw the borders of the cells, making them visually distinct on the board


}
//drawBoard
function drawBoard() {                  // clear the canvas before drawing the board, this ensures that we start with a blank slate for each frame of the game
    ctx.clearRect(0, 0, canvas.width, canvas.height);       // iterate through each cell in the board array and draw it if it's not empty, this loop goes through each row and column of the board, checking if there is a piece (non-zero value) in that cell, and if so, it calls drawCell to draw it on the canvas with the appropriate color

    board.forEach((row, y )=> {
        row.forEach((cell, x) => {                           // check if the cell is not empty (non-zero value), if it contains a piece, draw it on the canvas using the color corresponding to the piece type
            if (cell) {                             //if(cell) checks if the cell value is truthy (non-zero), which indicates that there is a piece in that cell, and if so, it calls drawCell to draw it on the canvas with the appropriate color based on the piece type stored in the cell
                drawCell(x, y, COLORS[cell]);           // cell contains the type of the piece, so we use it to get the color from the COLORS object and pass it to drawCell to draw the piece on the canvas
            }
        });
    });
    
}

// funkcije za crtanje
function drawPiece(piece, context, offsetX = 0, offsetY = 0, size = BLOCK) {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === true) {
                drawCell(context, piece.col + x + offsetX, piece.row + y + offsetY, COLORS[piece.type], size);
            }
        });
    });
}

//draw next
function drawNextPiece() {
    nextCtx.clearRect(0, 0, nextCanvas.Width, nextCanvas.height);
    next.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value === true){
                drawCell(nextCtx, x, y, COLORS[next.type], BLOCK / 2);

            }
        });
    });
}

//colision
function collision(offsetX = 0, offsetY = 0, shape = current.shape) {
    return shape.some((row, y) => {
        return row.some((value, x)=>{            
            if(!value)return false;

            let newX = current.col + x + offsetX;
            let newY = current.row + y + offsetY;

            return(newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && board[newY][newX]));
        });
    });
}
            
//spawning pieces
function spawnPiece() {
    current = next || randomPiece();
    next = randomPiece();
    current.row = 0;
    current.col = Math.floor(COLS / 2) - Math.ceil(current.shape[0].length / 2);
    next = randomPiece();

    if (collision === true) {
        endGame();
    }
}




// funkcije za rotiranje
function rotate(piece) {
    const rotated = current.shape[0].map((_, i) => 
        current.shape.map(row => row[i]).reverse());

}
const previusShape = current.shape;
current.shape = rotated;
if(collision = true){
    current.shape = previusShape;
}   


// merge sort funkcija
function merge(){
    current.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value){
                board[current.row + y][current.col + x] = current.type;
            }
        });
    });
}

// update function
function update(){
    if(!paused && !gameOver){
        const now= Date.now();
        const delta = now - lastTime;
        dropCounter += delta;
        lastTime = now;
    }
    if(dropCounter > dropInterval){
        moveDown();
        dropCounter = 0;
    }
    drawBoard();
    drawPiece(current, ctx);
    drawNextPiece();

    requestAnimationFrame(update);
}

// funkcije za crtanje

// funkcije za brisanje linija
function clearLines() {
    let linesCleared = 0;
    board = board.filter(row => {
        if (row.every(cell => cell !== 0)) {
            linesCleared++;
            return false; // remove full line
        }
        return true; // keep non-full line
    });

    // add empty lines on top
    while (board.length < ROWS) {
        board.unshift(Array(COLS).fill(0));
    }

    if (linesCleared > 0) {
        lines += linesCleared;
         score += [0, 100, 300, 500, 800][linesCleared] * level;

         level = Math.floor(lines / 10) + 1;
         dropInterval = Math.max (100, 800 -(level -1)  * 70) // increase speed with level

        updateUI();
    }


}
//funkcije za gravity
function moveDown() {
    if (!collision(0, 1)) {     // if moving does not cause a collision, move the piece down
        current.row++;
    } else {
        merge();                // if there is a collision, merge the piece into the board
        clearLines();
        spawnPiece();           // spawn a new piece after merging and clearing lines

    }
}

// funkcije za update score, level, lines
function updateUI() {
    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
    linesDisplay.textContent = lines;
}
// hard drop funkcija

// funkcija za game over
function gameOver() {
    gameOver = true;
    finalScoreDisplay.textContent = score;
    finalLevelDisplay.textContent = level;
    finalLinesDisplay.textContent = lines;
    gameOverscreen.classList.add("show");
}


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
    // funkcije za kontrolu igre (pause, reset)
pauseBtn.addEventListener("click", () => {
    paused = !paused;
    if(paused){
        pauseBtn.textContent = "Resume";
        updateUI();
        update();   
    }
});
restartGameBtn.addEventListener("click", () => {
    resetGame();
    update();
});
resetBtn.addEventListener("click", () => {
    resetGame();
    update();
});

if(event.key === "ArrowLeft"){
    moveLeft();
}
if(event.key === "ArrowRight"){
    moveRight();
}
if(event.key === "ArrowDown"){
    moveDown();
}
if(event.key === "ArrowUp"){
    rotate();
}




// funkcije za kontrolu igre (move left, right, down, hard drop, rotate)

//start game
resetGame();
update();