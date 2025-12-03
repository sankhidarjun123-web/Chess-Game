import checkpawnMoves from "./MovementAndCapture/Pawn.js";
import checkKnightMoves from "./MovementAndCapture/Knight.js";
import checkBishopMoves from "./MovementAndCapture/Bishop.js";
import checkRookMoves from "./MovementAndCapture/Rook.js";
import checkQueenMoves from "./MovementAndCapture/Queen.js";
import checkKingMoves from "./MovementAndCapture/King.js";



// =====================
//  ELEMENTS & BOARD SETUP
// =====================

const board = document.getElementById('chess-board');

let initialBoard = [
  ['black-rook','black-knight','black-bishop','black-queen','black-king','black-bishop','black-knight','black-rook'],
  Array(8).fill('black-pawn'),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill('white-pawn'),
  ['white-rook','white-knight','white-bishop','white-queen','white-king','white-bishop','white-knight','white-rook'],
];

let capturedWhitePiece = [];
let capturedBlackPiece = [];

// =====================
//  IMAGE IMPORT SECTION
// =====================

const [kingB, kingW, queenB, queenW] = [
    'images/Black/chess-king-solid-full.svg', 
    'images/White/chess-king-solid-full.svg', 
    'images/Black/chess-queen-solid-full.svg', 
    'images/White/chess-queen-solid-full.svg'
];

const [bishopB, bishopW, knightB, knightW] = [
    'images/Black/chess-bishop-solid-full.svg',
    'images/White/chess-bishop-solid-full.svg',
    'images/Black/chess-knight-solid-full.svg',
    'images/White/chess-knight-solid-full.svg'
];

const [rookB, rookW, pawnB, pawnW] = [
    'images/Black/chess-rook-solid-full.svg',
    'images/White/chess-rook-solid-full.svg',
    'images/Black/chess-pawn-solid-full.svg',
    'images/White/chess-pawn-solid-full.svg'
];

const pieceImages = {
  'black-rook': rookB,
  'black-knight': knightB,
  'black-bishop': bishopB,
  'black-king': kingB,
  'black-queen': queenB,
  'black-pawn': pawnB,
  'white-rook': rookW,
  'white-knight': knightW,
  'white-bishop': bishopW,
  'white-king': kingW,
  'white-queen': queenW,
  'white-pawn': pawnW,
};

// =====================
//  DESCRIPTION NAVIGATION
// =====================

let currentDesc = document.getElementById('moves');
let allDesc = document.getElementsByClassName('dn-element');

Array.from(allDesc).forEach(d => {
    d.addEventListener("click", () => {
        currentDesc.style.backgroundColor = "#444444";
        currentDesc = d;
        currentDesc.style.backgroundColor = "black";
    });
});

// =====================
//  CHECK FOR THE CURRENT TURN OF THE PLAYER
// =====================

let prevTurn = null;

// =====================
//  CREATE THE CHESS BOARD + PIECES
// =====================

for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {

        const square = document.createElement('div');
        square.className = 'square';
        square.dataset.row = i;
        square.dataset.col = j;
        square.dataset.originalColor = (i%2 === 0)?((j%2 === 0)?"#C6A667":"#665D1E"):((j%2 === 0)?"#665D1E":"#C6A667");
        square.style.backgroundColor = square.dataset.originalColor;
        square.style.display = "flex";
        square.style.alignItems = "center";
        square.style.justifyContent = "center";

        const pieceInfo = initialBoard[i][j];
        if(pieceInfo) {
            const piece = document.createElement('img');
            piece.src = pieceImages[pieceInfo];
            piece.id = pieceInfo;
            piece.style.width = pieceInfo.includes("pawn")?"70%":"85%";
            piece.style.aspectRatio = "1/1";
            square.appendChild(piece);

        }
        board.appendChild(square);
        
    }
}

// =====================
//  MAKE BOARD 2D ARRAY
// =====================

const allSquares = document.querySelectorAll('.square');
const squares = [];
let count = 0;

for(let i = 0; i < 8; i++) {
    let rows = [];
    for(let j = 0; j < 8; j++) {
        rows.push(allSquares[count++]);
    }
    squares.push(rows);
}

// =====================
//  SELECTION / HIGHLIGHT SYSTEM
// =====================

let currentSelected = null;
let allMoves = [];
let allCaptures = [];

const selectedSquare = function(square) {

    if(currentSelected === square) {
        square.style.backgroundColor = square.dataset.originalColor;
        square.style.border = "none";
        allMoves.forEach((sq) => {
            sq.style.backgroundColor = sq.dataset.originalColor;
            sq.style.border = "none"; 
        });
        allCaptures.forEach((sq) => {
            sq.style.backgroundColor = sq.dataset.originalColor;
            sq.style.border = "none";
        });
        currentSelected = null;
        allMoves = [];
        allCaptures = [];
    } else {

        const r = Number(square.dataset.row);
        const c = Number(square.dataset.col);

        const piece = square.querySelector('img');


        // Statement to handle the turn logic simple minded and controlled by the global declaration statement
        if(!prevTurn && piece.id.includes('black')){
            console.log(prevTurn)
            return;
        }else if(prevTurn === "white" && piece.id.includes('white')) {
            return;
        }
        else if(prevTurn === "black" && piece.id.includes('black')){
            return;
        }else {
            // boardRotate();
        }

        if(!piece)return;

        if(currentSelected) {
            currentSelected.style.backgroundColor = currentSelected.dataset.originalColor;
            currentSelected.style.border = "none";
            allMoves.forEach((sq) => {
                sq.style.backgroundColor = sq.dataset.originalColor;
                sq.style.border = "none"; 
            });

            allCaptures.forEach((sq) => {
                sq.style.backgroundColor = sq.dataset.originalColor;
                sq.style.border = "none";
            });
        }

        currentSelected = square;
        currentSelected.style.backgroundColor = "rgba(33, 33, 250, 0.4)";
        currentSelected.style.border = "3px solid blue";

        // The selected piece is a pawn
        if(piece.id.includes('pawn')) {
            allMoves = checkpawnMoves(square, r, c, squares, true);
            allCaptures = checkpawnMoves(square, r, c, squares, false);
        }

        // The selected piece is a knight
        if(piece.id.includes('knight')) {
            allMoves = checkKnightMoves(square, r, c, squares, true);
            allCaptures = checkKnightMoves(square, r, c, squares, false);
        }

        // The selected piece is a bishop
        if(piece.id.includes('bishop')) {
            allMoves = checkBishopMoves(square, r, c, squares, true);
            allCaptures = checkBishopMoves(square, r, c, squares, false);
        }

        // The selected piece is a rook
        if(piece.id.includes('rook')) {
            allMoves = checkRookMoves(square, r, c, squares, true);
            allCaptures = checkRookMoves(square, r, c, squares, false);
        }

        // The selected piece is a queen
        if(piece.id.includes('queen')) {
            allMoves = checkQueenMoves(square, r, c, squares, true);
            allCaptures = checkQueenMoves(square, r, c, squares, false);
        }

        // The slected piece is a king
        if(piece.id.includes('king')) {
            allMoves = checkKingMoves(square, r, c, squares, true);
            allCaptures = checkKingMoves(square, r, c, squares, false);
        }

        // Setting up the color property for all available squares without enemy
        allMoves.forEach((sq) => {
            sq.style.backgroundColor = "rgba(33, 33, 250, 0.4)";
            sq.style.border = "3px solid blue";
        });

        // Setting up the color property for all available squares with enemy
        allCaptures.forEach((sq) => {
            sq.style.backgroundColor = "rgba(250, 33, 33, 0.4)";
            sq.style.border = "3px solid red";
        });
    }
}

// =====================
//  MOVEMENT HANDLER
// =====================

const movePieceTo = (target) => {
    if(!currentSelected) return;

    const piece = currentSelected.querySelector('img');

    if(piece) {
        target.appendChild(piece);

        const oldRow = Number(currentSelected.dataset.row);
        const oldCol = Number(currentSelected.dataset.col);
        const newRow = Number(target.dataset.row);
        const newCol = Number(target.dataset.col);

        initialBoard[newRow][newCol] = piece.id;
        initialBoard[oldRow][oldCol] = null;
    } 
}

const capturePieceOn = (target) => {
    if(!currentSelected)return;

    let whiteCol = document.getElementById("collection-1");
    let blackCol = document.getElementById("collection-2");

    const friendlyPiece = currentSelected.querySelector('img');
    const enemyPiece = target.querySelector('img');

    if(friendlyPiece && enemyPiece) {
        target.removeChild(enemyPiece);
        target.appendChild(friendlyPiece);

        const oldRow = Number(currentSelected.dataset.row);
        const oldCol = Number(currentSelected.dataset.col);
        const newRow = Number(target.dataset.row);
        const newCol = Number(target.dataset.col);

        initialBoard[newRow][newCol] = friendlyPiece.id;
        initialBoard[oldRow][oldCol] = null;
    }

    if(enemyPiece.id.includes('white')) {
        whiteCol.appendChild(enemyPiece);
    } else {
        blackCol.appendChild(enemyPiece);
    }

}

function resetSelection() {

    let p;
    if(currentSelected){
        currentSelected.style.backgroundColor = currentSelected.dataset.originalColor;
        currentSelected.style.border = "none";
        p = currentSelected.querySelector('img');
    }
    allMoves.forEach(sq => {
        sq.style.backgroundColor = sq.dataset.originalColor;
        sq.style.border = "none";
    });
    allCaptures.forEach(sq => {
        sq.style.backgroundColor = sq.dataset.originalColor;
        sq.style.border = "none";
    });
    currentSelected = null;
    allMoves = [];
    allCaptures = [];
}


// =====================
//  ADD EVENT LISTENERS TO ALL SQUARES
// =====================

for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
        squares[i][j].addEventListener('click', () => {
            const sq = squares[i][j];

            // If a piece is selected and clicked square is a valid move
            if(currentSelected && allMoves.includes(sq)){
                
                const p = currentSelected.querySelector('img');
                movePieceTo(sq); // Move the piece
                resetSelection(); // Reset selection & highlights
                prevTurn = p.id.includes('white')?'white':'black';
            }else if(currentSelected && allCaptures.includes(sq)){

                const p = currentSelected.querySelector('img');
                capturePieceOn(sq);  // Capture the piece
                resetSelection();    // Reset selection & highlights
                prevTurn = p.id.includes('white')?'white':'black';
            }else {
                selectedSquare(sq); // Select a piece
            }
        });
    }
}