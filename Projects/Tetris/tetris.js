//povezat sve
const canvas = document.getElementById("gameCanvas ");
const ctx = canvas.getContext("2d");

const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const linesDisplay = document.getElementById("lines");

const COLORS= [
    "#FF0D72", // pink
    "#0DC2FF", // cyan
    "#0DFF72", // green
    "#F538FF", // purple
    "#FF8E0D", // orange
    "#FFE138", // yellow
    "#3877FF"  // blue
];

const TETREMINOS = [
    //I
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    //J
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    //L
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    //O
    [
        [1, 1],
        [1, 1]
    ],
    //S
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    //T
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    //Z
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]

    ]   

];


const gridSize = 30;

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

//dfinisat oblike 
function createPiece(type) {
    const piece = {
        shape: TETREMINOS[type],
        color: COLORS[type],

        //progress
    };
    return piece;
}
//boje

// funkcije za pomjeranje

// funkcije za rotiranje

// funkcije za provjeru kolizije

// funkcije za crtanje

// funkcije za brisanje linija

//funkcije za gravity

//

//resetovanje igre
function resetGame() {
    score = 0;
    level = 1;
    linesCleared = 0;
    // other reset logic
    dropInterval = 1000; // reset drop speed
    lastDropTime = 0;
    time = 0;
    currentPiece = null;
    nextPiece = null;
    grid = createEmptyGrid(10, 20);
    
}

//event listeneri