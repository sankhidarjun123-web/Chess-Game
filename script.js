import checkpawnMoves from "./MovementAndCapture/Pawn.js";
import checkKnightMoves from "./MovementAndCapture/Knight.js";
import checkBishopMoves from "./MovementAndCapture/Bishop.js";
import checkRookMoves from "./MovementAndCapture/Rook.js";
import checkQueenMoves from "./MovementAndCapture/Queen.js";
import checkKingMoves from "./MovementAndCapture/King.js";
import changePosition from "./MovementAndCapture/PieceAnimation.js";
import checkForChecks from "./Checks&CheckMate/Check.js";
import vaildMoves from "./Checks&CheckMate/VaildMoves.js";
import checkboardState from "./Rules/Moves.js";



// =====================
//  ELEMENTS & BOARD SETUP
// =====================

const board = document.getElementById('chess-board');

let initialBoard = [
    ['bra', 'bn', 'bB', 'bq', 'bk', 'bB', 'bn', 'brh'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wra', 'wn', 'wB', 'wq', 'wk', 'wB', 'wn', 'wrh']
];



let capturedWhitePiece = [];
let capturedBlackPiece = [];

const pieceValue = {
    'bp': 1,
    'wp': 1,
    'wn': 2.95,
    'bn': 2.95,
    'bB': 3.05,
    'wB': 3.05,
    'bra': 5,
    'wra': 5,
    'wrh': 5,
    'wra': 5,
    'bq': 9,
    'wq': 9
};


const setCapturedPiece = function (piece, capturedCollection) {
    const childrens = capturedCollection.children;
    let i = childrens.length - 1;

    while (
        i >= 0 &&
        pieceValue[childrens[i].id] > pieceValue[piece.id]
    ) {
        i--;
    }

    if (i < 0) {
        capturedCollection.prepend(piece);
    } else {
        capturedCollection.insertBefore(piece, childrens[i + 1] || null);
    }
};


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
    'bra': rookB,
    'brh': rookB,
    'bn': knightB,
    'bB': bishopB,
    'bk': kingB,
    'bq': queenB,
    'bp': pawnB,

    'wra': rookW,
    'wrh': rookW,
    'wn': knightW,
    'wB': bishopW,
    'wk': kingW,
    'wq': queenW,
    'wp': pawnW,
};

// =====================
//  CHECK FOR THE CURRENT TURN OF THE PLAYER
// =====================

let prevTurn = null;
let currentTurn = 'w';


const getFENFormat = function (initialboard) {

    let FEN = "";

    for (const rankArr of initialBoard) {
        let emptySquares = 0;
        let rank = "";

        for (const square of rankArr) {

            if (square === '0') {
                emptySquares++;
            } else {

                // flush empty squares BEFORE piece
                if (emptySquares > 0) {
                    rank += emptySquares;
                    emptySquares = 0;
                }

                switch (square) {
                    case 'bra': rank += 'r'; break;
                    case 'brh': rank += 'r'; break;
                    case 'bn': rank += 'n'; break;
                    case 'bB': rank += 'b'; break;
                    case 'bq': rank += 'q'; break;
                    case 'bk': rank += 'k'; break;
                    case 'bp': rank += 'p'; break;

                    case 'wra': rank += 'R'; break;
                    case 'wrh': rank += 'R'; break;
                    case 'wn': rank += 'N'; break;
                    case 'wB': rank += 'B'; break;
                    case 'wq': rank += 'Q'; break;
                    case 'wk': rank += 'K'; break;
                    case 'wp': rank += 'P'; break;
                }
            }
        }

        // flush remaining empty squares
        if (emptySquares > 0) {
            rank += emptySquares;
        }

        FEN += rank + "/";
    }

    // remove trailing slash
    FEN = FEN.slice(0, -1);

    // Active color
    FEN += ` ${currentTurn}`;

    return FEN;
};

console.log(getFENFormat(initialBoard));


// =====================
//  CREATE THE CHESS BOARD + PIECES
// =====================

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {

        const square = document.createElement('div');
        square.className = 'square';
        square.dataset.row = i;
        square.dataset.col = j;
        square.dataset.originalColor = (i % 2 === 0) ? ((j % 2 === 0) ? "#C6A667" : "#665D1E") : ((j % 2 === 0) ? "#665D1E" : "#C6A667");
        square.style.backgroundColor = square.dataset.originalColor;
        square.style.display = "flex";
        square.style.alignItems = "center";
        square.style.justifyContent = "center";
        square.id = `square-${i}-${j}`;
        // square.style.position = "relative";

        const pieceInfo = initialBoard[i][j];

        const piece = (pieceInfo === '0') ? document.createElement('div') : document.createElement('img');
        piece.src = pieceImages[pieceInfo];
        piece.id = pieceInfo;
        piece.style.width = pieceInfo.includes('bp') || pieceInfo.includes('wp')
            ? "70%"
            : "85%";
        piece.style.aspectRatio = "1/1";

        // Properties to work on the position of the piece
        piece.dataset.startingSquare = square.id;
        piece.dataset.prevSquare = null;
        piece.dataset.currSquare = null;
        square.appendChild(piece);

        board.appendChild(square);

    }
}

// =====================
//  MAKE BOARD 2D ARRAY
// =====================

const allSquares = document.querySelectorAll('.square');
const squares = [];      // Main board of element and the information very important
let count = 0;

for (let i = 0; i < 8; i++) {
    let rows = [];
    for (let j = 0; j < 8; j++) {
        rows.push(allSquares[count++]);
    }
    squares.push(rows);
}

// =====================
//  SELECTION / HIGHLIGHT SYSTEM
// =====================

export let currentSelected = null;
export let currentSelectedCor = [];
let prevSelected = null;
let allMoves = [];
let allCaptures = [];

export let allMovesIndex = [];
export let allCapturesIndex = [];

const Wking = document.getElementById("wk");
const Bking = document.getElementById("bk");
let checkStatusWhite = {};
let checkStatusBlack = {};

const selectedSquare = function (square) {

    if (currentSelected === square) {
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
        allMovesIndex = [];
        allCapturesIndex = [];
    } else {

        const r = Number(square.dataset.row);
        const c = Number(square.dataset.col);

        const piece = square.querySelector('img');
        if (!piece) {
            resetSelection();
            return;
        }


        // Statement to handle the turn logic simple minded and controlled by the global declaration statement
        if (!prevTurn && piece.id.includes('b')) {
            console.log(prevTurn)
            return;
        } else if (prevTurn === "w" && piece.id.includes('w')) {
            return;
        }
        else if (prevTurn === "b" && piece.id.includes('b')) {
            return;
        } else {
            // boardRotate();
        }

        if (!piece) return;

        if (currentSelected) {
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
        currentSelectedCor = [r, c];
        console.log(currentSelectedCor);
        currentSelected.style.backgroundColor = "rgba(0, 0, 255, 0.25)";
        currentSelected.style.border = "1px solid blue"

        // The selected piece is a pawn
        if (piece.id.includes('p')) {

            allMovesIndex = checkpawnMoves(r, c, initialBoard, true);
            allCapturesIndex = checkpawnMoves(r, c, initialBoard, false);

            allMoves = allMovesIndex.map(([r, c]) => squares[r][c]);
            allCaptures = allCapturesIndex.map(([r, c]) => squares[r][c]);
        }

        // The selected piece is a knight
        if (piece.id.includes('n')) {
            allMovesIndex = checkKnightMoves(r, c, initialBoard, true);
            allCapturesIndex = checkKnightMoves(r, c, initialBoard, false);

            allMoves = allMovesIndex.map(([r, c]) => squares[r][c]);
            allCaptures = allCapturesIndex.map(([r, c]) => squares[r][c]);
        }

        if (piece.id.includes('B')) {
            allMovesIndex = checkBishopMoves(r, c, initialBoard, true);
            allCapturesIndex = checkBishopMoves(r, c, initialBoard, false);

            allMoves = allMovesIndex.map(([r, c]) => squares[r][c]);
            allCaptures = allCapturesIndex.map(([r, c]) => squares[r][c]);
        }

        // The selected piece is a rook
        if (piece.id.includes('r')) {
            allMovesIndex = checkRookMoves(r, c, initialBoard, true);
            allCapturesIndex = checkRookMoves(r, c, initialBoard, false);

            allMoves = allMovesIndex.map(([r, c]) => squares[r][c]);
            allCaptures = allCapturesIndex.map(([r, c]) => squares[r][c]);
        }

        // The selected piece is a queen
        if (piece.id.includes('q')) {
            allMovesIndex = checkQueenMoves(r, c, initialBoard, true);
            allCapturesIndex = checkQueenMoves(r, c, initialBoard, false);

            allMoves = allMovesIndex.map(([r, c]) => squares[r][c]);
            allCaptures = allCapturesIndex.map(([r, c]) => squares[r][c]);
        }

        // The slected piece is a king
        if (piece.id.includes('k')) {
            allMovesIndex = checkKingMoves(r, c, initialBoard, true);
            allCapturesIndex = checkKingMoves(r, c, initialBoard, false);

            allMoves = allMovesIndex.map(([r, c]) => squares[r][c]);
            allCaptures = allCapturesIndex.map(([r, c]) => squares[r][c]);
        }

        let returnedMoves = [];
        let returedCaptures = [];

        // Still problem I gotta figure out why the king was not moving with bishop check on the diagonal and double check
        giveCheckStatus(Wking, Bking, checkStatusWhite, checkStatusBlack);

        if (checkStatusWhite.isCheck) {
            returnedMoves = vaildMoves(initialBoard, true, checkStatusWhite, currentSelectedCor, allCapturesIndex, allMovesIndex);
            returedCaptures = vaildMoves(initialBoard, false, checkStatusWhite, currentSelectedCor, allCapturesIndex, allMovesIndex);

            allMoves = returnedMoves.map(([r, c]) => squares[r][c]);
            allCaptures = returedCaptures.map(([r, c]) => squares[r][c]);
        }

        if (checkStatusBlack.isCheck) {
            returnedMoves = vaildMoves(initialBoard, true, checkStatusBlack, currentSelectedCor, allCapturesIndex, allMovesIndex);
            returedCaptures = vaildMoves(initialBoard, false, checkStatusBlack, currentSelectedCor, allCapturesIndex, allMovesIndex);

            allMoves = returnedMoves.map(([r, c]) => squares[r][c]);
            allCaptures = returedCaptures.map(([r, c]) => squares[r][c]);
        }

        // Setting up the color property for all available squares without enemy
        allMoves.forEach((sq) => {
            sq.style.backgroundColor = "rgba(0, 0, 255, 0.25)";
            sq.style.border = "1px solid blue";
        });

        // Setting up the color property for all available squares with enemy
        allCaptures.forEach((sq) => {
            sq.style.backgroundColor = "rgba(255, 0, 0, 0.35)";
            sq.style.border = "1px solid red";
        });
    }

    // Problem here
}

// =====================
// CASTLING HANDLER
//=======================


export const castleStatus = {
    WkingMoved: false,
    WAcastleMoved: false,
    WHcastleMoved: false,
    BAcastleMoved: false,
    BHcastleMoved: false,
    BkingMoved: false
};

// =====================
//  MOVEMENT HANDLER
// =====================


// This part is throwing error also the absolute and relative values of the pieces set change them
const movePieceTo = (targetSquare) => {


    if (!currentSelected) return;

    const sourceSquare = currentSelected;
    const piece = sourceSquare.querySelector("img");
    if (!piece) return;

    if (piece.id === "wk" && targetSquare.id === "square-7-2" && (!castleStatus.WkingMoved && !castleStatus.WAcastleMoved)) {
        const rook = squares[7][0].querySelector("img");
        castling(
            piece,
            targetSquare,
            currentSelected,
            rook,
            squares[7][3],
            squares[7][0]
        );
        castleStatus.WkingMoved = true;
        castleStatus.WAcastleMoved = true;
        return;
    }

    if (piece.id === "wk" && targetSquare.id === "square-7-6" && (!castleStatus.WkingMoved && !castleStatus.WHcastleMoved)) {
        const rook = squares[7][7].querySelector("img");
        castling(
            piece,
            targetSquare,
            currentSelected,
            rook,
            squares[7][5],
            squares[7][7]
        );
        castleStatus.WkingMoved = true;
        castleStatus.WHcastleMoved = true;
        return;
    }

    if (piece.id === "bk" && targetSquare.id === "square-0-2" && (!castleStatus.BkingMoved && !castleStatus.BAcastleMoved)) {
        const rook = squares[0][0].querySelector("img");
        castling(
            piece,
            targetSquare,
            currentSelected,
            rook,
            squares[0][3],
            squares[0][0]
        );
        castleStatus.BkingMoved = true;
        castleStatus.BAcastleMoved = true;
        return;
    }

    if (piece.id === "bk" && targetSquare.id === "square-0-6" && (!castleStatus.BkingMoved && !castleStatus.BHcastleMoved)) {
        const rook = squares[0][7].querySelector("img");
        castling(
            piece,
            targetSquare,
            currentSelected,
            rook,
            squares[0][5],
            squares[0][7]
        );
        castleStatus.BkingMoved = true;
        castleStatus.BHcastleMoved = true;
        return;
    }

    if (piece.id === 'wk') castleStatus.WkingMoved = true;
    if (piece.id === 'bk') castleStatus.BkingMoved = true;
    if (piece.id === 'wra') castleStatus.WAcastleMoved = true;
    if (piece.id === 'wrh') castleStatus.WHcastleMoved = true;
    if (piece.id === 'bra') castleStatus.BAcastleMoved = true;
    if (piece.id === 'brh') castleStatus.BHcastleMoved = true;

    // Engine update first (GOOD design)
    const oldRow = +sourceSquare.dataset.row;
    const oldCol = +sourceSquare.dataset.col;
    const newRow = +targetSquare.dataset.row;
    const newCol = +targetSquare.dataset.col;

    initialBoard[newRow][newCol] = piece.id;
    initialBoard[oldRow][oldCol] = "0";

    // Animate visually
    changePosition(piece, targetSquare);

    // DOM mutation AFTER animation
    piece.addEventListener("transitionend", () => {

        // Reset animation styles
        piece.style.transition = "";
        piece.style.transform = "";

        // Clean target
        const targetEmpty = targetSquare.querySelector("div");
        if (targetEmpty) targetEmpty.remove();

        // Move piece into target square
        targetSquare.appendChild(piece);

        // Restore empty square in source
        const emptyDiv = document.createElement("div");
        sourceSquare.appendChild(emptyDiv);

        // This line is the fix of my long long hour problem okkie
        giveCheckStatus(Wking, Bking, checkStatusWhite, checkStatusBlack);
        console.log(checkStatusWhite, checkStatusBlack);
        currentTurn = currentTurn === "w" ? "b" : "w";

        // Need work here
        const boardState = checkboardState(currentTurn, initialBoard, checkStatusWhite, checkStatusBlack, currentSelectedCor, allCapturesIndex, allMovesIndex);
        console.table(boardState);

        if (checkStatusWhite.isCheck) {
            console.log("White king is in check!!!");
            Wking.style.filter = 'drop-shadow(0 0 6px rgba(160,0,0,.95)) drop-shadow(0 0 14px rgba(160,0,0,.6)) drop-shadow(0 0 24px rgba(160,0,0,.35))';
            isGameOver(boardState, "Black");
        } else {
            console.log("No longer!!");
            Wking.style.filter = '';
        }

        if (checkStatusBlack.isCheck) {
            console.log("Black king is in check!!!");
            Bking.style.filter = 'drop-shadow(0 0 6px rgba(160,0,0,.95)) drop-shadow(0 0 14px rgba(160,0,0,.6)) drop-shadow(0 0 24px rgba(160,0,0,.35))';
            isGameOver(boardState, "White");
        } else {
            console.log("No longer!!");
            Bking.style.filter = '';
        }


    }, { once: true });
    console.log(initialBoard);
};

const isGameOver = function (boardState, winner) {
    const screen = document.getElementById("game-over");
    if (Object.keys(boardState).length > 0) return;
    screen.innerHTML = "";
    screen.style.display = "flex";

    const textBox = document.createElement("p");
    textBox.innerText = `Checkmate!\n${winner} Wins`;

    const replay = document.createElement("button");
    replay.innerText = "Restart";

    replay.onclick = () => location.reload();

    screen.append(textBox, replay);

    // if (Object.keys(boardState).length === 0 && !checkStatus.isCheck) {
    //     screen.innerHTML = "";
    //     screen.style.display = "flex";

    //     const textBox = document.createElement("p");
    //     textBox.innerText = "Stalmate!";

    //     const replay = document.createElement("button");
    //     replay.innerText = "Restart";

    //     replay.onclick = () => location.reload();

    //     screen.append(textBox, replay);
    // }
};



const giveCheckStatus = function (Wking, Bking, checkStatusWhite, checkStatusBlack) {

    if (Wking) {
        const sq = Wking.parentNode;
        Object.assign(
            checkStatusWhite,
            checkForChecks(
                Wking.id,
                +sq.dataset.row,
                +sq.dataset.col,
                initialBoard
            )
        );
    }

    if (Bking) {
        const sq = Bking.parentNode;
        Object.assign(
            checkStatusBlack,
            checkForChecks(
                Bking.id,
                +sq.dataset.row,
                +sq.dataset.col,
                initialBoard
            )
        );
    }
};



const capturePieceOn = (target) => {


    if (!currentSelected) return;

    const whiteCol = document.getElementById("collection-1");
    const blackCol = document.getElementById("collection-2");

    const sourceSquare = currentSelected;
    const friendlyPiece = sourceSquare.querySelector("img");
    const enemyPiece = target.querySelector("img");

    if (!friendlyPiece || !enemyPiece) return;

    if (friendlyPiece.id === 'wk') castleStatus.WkingMoved = true;
    if (friendlyPiece.id === 'bk') castleStatus.BkingMoved = true;
    if (friendlyPiece.id === 'wra') castleStatus.WAcastleMoved = true;
    if (friendlyPiece.id === 'wrh') castleStatus.WHcastleMoved = true;
    if (friendlyPiece.id === 'bra') castleStatus.BAcastleMoved = true;
    if (friendlyPiece.id === 'brh') castleStatus.BHcastleMoved = true;

    if (enemyPiece.id === 'wra') castleStatus.WAcastleMoved = true;
    if (enemyPiece.id === 'wrh') castleStatus.WHcastleMoved = true;
    if (enemyPiece.id === 'bra') castleStatus.BAcastleMoved = true;
    if (enemyPiece.id === 'brh') castleStatus.BHcastleMoved = true;

    // Engine update (correct to do first)
    const oldRow = +sourceSquare.dataset.row;
    const oldCol = +sourceSquare.dataset.col;
    const newRow = +target.dataset.row;
    const newCol = +target.dataset.col;

    initialBoard[newRow][newCol] = friendlyPiece.id;
    initialBoard[oldRow][oldCol] = "0";

    // Animate FRIENDLY piece to TARGET SQUARE
    changePosition(friendlyPiece, target);

    friendlyPiece.addEventListener("transitionend", () => {

        // Reset animation styles
        friendlyPiece.style.transition = "";
        friendlyPiece.style.transform = "";

        // Remove enemy from board
        target.removeChild(enemyPiece);

        // Append friendly piece
        target.appendChild(friendlyPiece);

        // Restore empty square in source
        const emptyDiv = document.createElement("div");
        sourceSquare.appendChild(emptyDiv);

        // Move captured piece to collection
        if (enemyPiece.id.includes("w")) {
            setCapturedPiece(enemyPiece, whiteCol);
            capturedWhitePiece.push(enemyPiece);
        } else {
            setCapturedPiece(enemyPiece, blackCol);
            capturedBlackPiece.push(enemyPiece);
        }

        // This line is the fix of my long long hour problem okkie
        giveCheckStatus(Wking, Bking, checkStatusWhite, checkStatusBlack);
        console.log(checkStatusWhite, checkStatusBlack);
        currentTurn = currentTurn === "w" ? "b" : "w";

        const boardState = checkboardState(currentTurn, initialBoard, checkStatusWhite, checkStatusBlack, currentSelectedCor, allCapturesIndex, allMovesIndex);
        console.table(boardState);

        // Problem here
        if (checkStatusWhite.isCheck) {
            console.log("White king is in check!!!");
            Wking.style.filter = 'drop-shadow(0 0 6px rgba(160,0,0,.95)) drop-shadow(0 0 14px rgba(160,0,0,.6)) drop-shadow(0 0 24px rgba(160,0,0,.35))';
            isGameOver(boardState, "Black");
        } else {
            console.log("No longer!!");
            Wking.style.filter = '';
        }

        if (checkStatusBlack.isCheck) {
            console.log("Black king is in check!!!");
            Bking.style.filter = 'drop-shadow(0 0 6px rgba(160,0,0,.95)) drop-shadow(0 0 14px rgba(160,0,0,.6)) drop-shadow(0 0 24px rgba(160,0,0,.35))';
            isGameOver(boardState, "White");
        } else {
            console.log("No longer!!");
            Bking.style.filter = '';
        }

    }, { once: true });
    console.log(initialBoard);
};


const castling = function (king, kingSqN, kingSqO, rook, rookSqN, rookSqO) {

    const kr0 = +kingSqO.dataset.row;
    const kc0 = +kingSqO.dataset.col;
    const kr1 = +kingSqN.dataset.row;
    const kc1 = +kingSqN.dataset.col;

    const rr0 = +rookSqO.dataset.row;
    const rc0 = +rookSqO.dataset.col;
    const rr1 = +rookSqN.dataset.row;
    const rc1 = +rookSqN.dataset.col;

    // ENGINE UPDATE FIRST (correct)
    initialBoard[kr0][kc0] = "0";
    initialBoard[rr0][rc0] = "0";
    initialBoard[kr1][kc1] = king.id;
    initialBoard[rr1][rc1] = rook.id;

    // SINGLE animation per piece
    changePosition(king, kingSqN);
    changePosition(rook, rookSqN);

    // FINALIZE DOM ONCE
    king.addEventListener("transitionend", () => {

        king.style.transition = "";
        king.style.transform = "";
        rook.style.transition = "";
        rook.style.transform = "";

        kingSqN.appendChild(king);
        rookSqN.appendChild(rook);

        kingSqO.appendChild(document.createElement("div"));
        rookSqO.appendChild(document.createElement("div"));

        giveCheckStatus(Wking, Bking, checkStatusWhite, checkStatusBlack);

    }, { once: true });

    currentTurn = currentTurn === "w" ? "b" : "w";
};




function resetSelection() {

    let p;
    if (currentSelected) {
        currentSelected.style.backgroundColor = currentSelected.dataset.originalColor;
        //     if (prevSelected) {
        //     prevSelected.style.backgroundColor =
        //         prevSelected.dataset.originalColor;
        //     prevSelected.style.border = "none";
        // }
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
    prevSelected = currentSelected;
    currentSelected = null;
    allMoves = [];
    allCaptures = [];
}


// =====================
//  ADD EVENT LISTENERS TO ALL SQUARES
// =====================

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        squares[i][j].addEventListener('click', () => {
            const sq = squares[i][j];

            // If a piece is selected and clicked square is a valid move
            if (currentSelected && allMoves.includes(sq)) {

                const p = currentSelected.querySelector('img');
                movePieceTo(sq); // Move the piece
                resetSelection(); // Reset selection & highlights
                prevTurn = p.id.includes('w') ? 'w' : 'b';
            } else if (currentSelected && allCaptures.includes(sq)) {

                const p = currentSelected.querySelector('img');
                capturePieceOn(sq);  // Capture the piece
                resetSelection();    // Reset selection & highlights
                prevTurn = p.id.includes('w') ? 'w' : 'b';
            } else {
                selectedSquare(sq); // Select a piece
                // currentSelectedCor = [i, j];
            }
        });

        squares[i][j].addEventListener('touchend', () => {
            const sq = squares[i][j];

            // If a piece is selected and clicked square is a valid move
            if (currentSelected && allMoves.includes(sq)) {

                const p = currentSelected.querySelector('img');
                movePieceTo(sq); // Move the piece
                resetSelection(); // Reset selection & highlights
                prevTurn = p.id.includes('w') ? 'w' : 'b';
            } else if (currentSelected && allCaptures.includes(sq)) {

                const p = currentSelected.querySelector('img');
                capturePieceOn(sq);  // Capture the piece
                resetSelection();    // Reset selection & highlights
                prevTurn = p.id.includes('w') ? 'w' : 'b';
            } else {
                selectedSquare(sq); // Select a piece
            }
        });
    }
}


