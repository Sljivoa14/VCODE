const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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
/*
const I = [
  [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0]
  ],
  [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0]
  ]
];

const J = [
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ]
];

const L = [
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0]
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ]
];

const O = [
  [
    [1, 1],
    [1, 1]
  ]
];

const S = [
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1]
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0]
  ]
];

const T = [
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0]
  ]
];

const Z = [
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0]
  ]
];


const userName = prompt("please write your username to procceed: ");
if(userName=== Number){
    alert("u can not type numbers ")
}*/

const COLS = 10;
const ROWS = 20;
const BLOCK = 30;

let board = Array.from({ length: ROWS }, () => Array(COLS).fill(null))


let pX = 3;
let pY = 0;
let current = null;

function drawBoard(){
    for (let i = 0; i < ROWS; i++) {
        for(let j = 0; j< COLS; j++){
            drawSquare(j, i, board[i][j] || "black");
        }
    }
}

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);//prametri ovih funkcija su inače: (x, y, width, height), 

    ctx.strokeStyle = "white";
    ctx.strokeRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);//crta Lajne
}
drawBoard();

//rotate
function rotate() {
    const rotated = current.shape[0].map((_, i) => 
        current.shape.map(row => row[i]).reverse());
    const originalShape= current.shape;
    current.shape = rotated;

    if(!isValidPosition(0,0)){
        current.shape = originalShape;
    }
}

function isValidPosition(offsetX = 0, offsetY = 0) {
    for (let row = 0; row < current.shape.length; row++) {
        for(let col = 0; col < current.shape[row].length; col++){
            if(!current.shape[row][col]){
                continue; //ako je 0, onda preskacemo tu celiju
                }
                
                const newX = pX + col + offsetX;
                const newY = pY + row + offsetY;
                if(newX <0 || newX >= COLS || newY >= ROWS){
                    return false; //ako je van granica table, onda nije validna pozicija

            }
            if(newY >= 0 && board[newY][newX]){
                return false; //ako je na toj poziciji vec nesto, onda nije validna pozicija
            }
        }
    }
    return true;
}

//there is many coordinate systems in JS such as:
// There are MANY coordinate systems in JS:
/*
Property:  	 Relative to:
offsetX/Y	 element itself
clientX/Y	 browser window
pageX/Y	     entire webpage
screenX/Y	 physical monitor
*/

function movingPiece(){
    //if(isValidPosition(0,1)){}
    current.shape.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            if(value){
                drawSquare(pX + colIndex, pY + rowIndex, COLORS[current.type]);

            }
        });
        
    });
}

//draw piece
function createpiece(){
    const types = Object.keys(TETROMINOS);
    const type = types[Math.floor(Math.random()*types.length)];
    return {
        shape : TETROMINOS[type],
        type,
        color: COLORS[type],
        x: pX,
        y: pY
    };
}


current = createpiece();

function drawPlayer(){
    drawSquare(pX, pY, "red");
}

function draw(){
    drawBoard();
    movingPiece();
    drawPlayer();
}



// if touches the bottom or another piece, merge it into the board
function merge(){
    current.shape.forEach((row, rowIndex)=>{
        row.forEach((value, colIndex)=>{
            if(value){
                board[pY + rowIndex][pX + colIndex] = COLORS[current.type]; //postavljamo tip komada na tu poziciju na tabli
            }
        });
    });
}

//delete line
function clearLine(){
    //make the lines dissapear after complete a line like in tetris
    for(let row = ROWS - 1; row >= 0; row--){
        const fullRow = board[row].every(cell => cell !== null);
        if(fullRow){
            board.splice(row, 1);
            board.unshift(Array(COLS).fill(null));

            row++;
        }
    }
    
}

//spawn new piece
function spawnPiece(){
    merge();
    clearLine();
    current = createpiece();
    pX = 3;
    pY = 0;
    
    if (!isValidPosition(0, 0)) {
        alert("Game Over!");
        board = Array.from({ length: ROWS }, () => Array(COLS).fill(null)); // 
        current = createpiece();

        pX = 3;
        pY = 0;
    }
}

//event listeners

/*document.addEventListener("keydown", function(event){

    if(event.key === "ArrowLeft"){
        if(pX > 0){ //ako nije na lijevoj ivici, onda se moze pomjeriti lijevo
        pX--;
        }
    } 
    else if(event.key === "ArrowRight"){
        if(pX < COLS - 1){ //ako nije na desnoj ivici, onda se moze pomjeriti desno
            pX++;
        }
    }
    else if(event.key === "ArrowDown"){
        if(pY < ROWS - 1){ //ako nije na donjoj ivici, onda se moze pomjeriti dolje
            pY++;
        }
    }

    if(event.key === "ArrowUp"){
        //ovdje ce ici kod za rotaciju komada
        rotate(current);
    }
    spawnPiece();

    draw();

});*/

document.addEventListener("keydown", function(event){
    if(event.key === "ArrowLeft"){
        if(isValidPosition(-1, 0)){
            pX--;
        }
    }
    else if(event.key === "ArrowRight"){
        if(isValidPosition(1,0)){
            pX++;
        }
    }
    else if(event.key === "ArrowDown"){
        if(isValidPosition(0,1)){
            pY++;
        }
    }
    if(event.key === "ArrowUp"){
        rotate(current);
    }
    draw();
});
/*
canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
});*/

setInterval(()=>{
    if(isValidPosition(0,1)){
        pY++;
    }
    else{
        spawnPiece();
    }
    draw();
}, 300);


draw();

/*
if (<canvas width="800" height="600" style="width:400px;height:300px"></canvas>){
    const scaleX = canvas.width / canvas.clientWidth;
    const sclaeY = canvas.hight / canvas.clientHeight;

    const x = e.offsetX * scaleX;
    const y = e.offsetY * sclaeY;
}


Canvas Position:
(0,0) ------------------> X
  |         
  |
  |
  v
  Y

  top left is always (0, 0);
  so if offsetX = 200;
  and offsetY = 100;
means: 200 right
       100 down
*/