import changePosition from "./MovementAndCapture/PieceAnimation.js";
// =====================
//  ELEMENTS & BOARD SETUP
// =====================

const board = document.getElementById('chess-board');

let game = {};
let castleStatus = {};
let Board = [];

let currentTurn;

let capturedWhitePiece = [];
let capturedBlackPiece = [];

let allSquares;

const squares = [];      // Main board of element and the information very important

const shiftTurn = () => {
    currentTurn = currentTurn === "w" ? "b" : "w"; 
}


document.addEventListener("DOMContentLoaded", async function () {
    const gameDefault = await fetch("/gameDetails");
    const gameDetails = await gameDefault.json();

    castleStatus = gameDetails.castleStatus;
    Board = gameDetails.board;
    game = gameDetails;
    currentTurn = gameDetails.currentTurn
    createBoard();
});


const pieceValue = {
    // =====================
    // WHITE PIECES
    // =====================
    wp: 1,
    wn: 2,
    wB: 3,
    wra: 5,
    wrh: 5,
    wq: 9,
    wk: 1000,

    // =====================
    // BLACK PIECES
    // =====================
    bp: 1,
    bn: 2,
    bB: 3,
    bra: 5,
    brh: 5,
    bq: 9,
    bk: 1000,
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
    'images/pieces/blackKing.png',
    'images/pieces/whiteKing.png',
    'images/pieces/blackQueen.png',
    'images/pieces/whiteQueen.png'
];

const [bishopB, bishopW, knightB, knightW] = [
    'images/pieces/blackBishop.png',
    'images/pieces/whiteBishop.png',
    'images/pieces/blackknight.png',
    'images/pieces/whiteKnight.png',
];

const [rookB, rookW, pawnB, pawnW] = [
    'images/pieces/blackRook.png',
    'images/pieces/whiteRook.png',
    'images/pieces/blackPawn.png',
    'images/pieces/whitePawn.png'
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


function attachSquareListeners() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            squares[i][j].addEventListener('click', () => {
                const sq = squares[i][j];

                // If a piece is selected and clicked square is a valid move
                if (currentSelected && allMoves.includes(sq)) {

                    const p = currentSelected.querySelector('img');
                    movePieceTo(sq); // Move the piece
                    resetSelection(); // Reset selection & highlights
                } else if (currentSelected && allCaptures.includes(sq)) {

                    const p = currentSelected.querySelector('img');
                    capturePieceOn(sq);  // Capture the piece
                    resetSelection();    // Reset selection & highlights
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
                } else if (currentSelected && allCaptures.includes(sq)) {

                    const p = currentSelected.querySelector('img');
                    capturePieceOn(sq);  // Capture the piece
                    resetSelection();    // Reset selection & highlights
                } else {
                    selectedSquare(sq); // Select a piece
                }
            });
        }
    }
}


// =====================
//  CREATE THE CHESS BOARD + PIECES
// =====================
function createBoard() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {

            const square = document.createElement('div');
            square.className = 'square';
            square.dataset.row = i;
            square.dataset.col = j;
            square.dataset.originalColor = (i % 2 === 0) ? ((j % 2 === 0) ? "#eae9d2" : "#4f6fa1") : ((j % 2 === 0) ? "#4f6fa1" : "#eae9d2");
            square.style.backgroundColor = square.dataset.originalColor;
            square.style.display = "flex";
            square.style.alignItems = "center";
            square.style.justifyContent = "center";
            square.id = `square-${i}-${j}`;
            // square.style.position = "relative";

            const pieceInfo = Board[i][j];

            const piece = (pieceInfo === '0') ? document.createElement('div') : document.createElement('img');
            piece.src = pieceImages[pieceInfo];
            piece.id = pieceInfo;
            piece.style.width = pieceInfo.includes('bp') || pieceInfo.includes('wp')
                ? "80%"
                : "95%";
            piece.style.aspectRatio = "1/1";

            // Properties to work on the position of the piece
            piece.dataset.startingSquare = square.id;
            piece.dataset.prevSquare = null;
            piece.dataset.currSquare = null;
            square.appendChild(piece);

            board.appendChild(square);

        }
    }

    allSquares = document.querySelectorAll('.square');

    let count = 0;

    for (let i = 0; i < 8; i++) {
        let rows = [];
        for (let j = 0; j < 8; j++) {
            rows.push(allSquares[count++]);
        }
        squares.push(rows);
    }

    attachSquareListeners();
}

// =====================
//  SELECTION / HIGHLIGHT SYSTEM
// =====================

let currentSelected = null;
let currentSelectedCor = [];
let allMoves = [];
let allCaptures = [];

let allMovesIndex = [];
let allCapturesIndex = [];




async function fetchMoves(piece, row, col) {
    try {
        const res = await fetch("/moves", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                selectedSquare: [row, col],
                piece: piece,
                board: Board
            })
        });

        if (!res.ok) {
            throw new Error("Response not ok!");
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Error occured while fetching the moves!", error.message);
        return null;
    }
}

const updateGameDetails = function (from, to, movedPiece, capturePiece) {

    if(movedPiece === "wk") {
        game.whiteKingPosition = [Number(to.dataset.row), Number(to.dataset.col)];
    }

    if(movedPiece === "bk") {
        game.blackKingPosition = [Number(to.dataset.row), Number(to.dataset.col)];
    }

    game.board = Board;
    game.move.from = from.dataset.row + "-" + from.dataset.col;
    game.move.to = to.dataset.row + "-" + to.dataset.col;
    game.movedPiece = movedPiece;
    game.capturePiece = capturePiece;
    game.castleStatus = castleStatus;
    game.currentTurn = currentTurn;

    putData(game);
}

const putData = (game) => {
    fetch("/gameDetails", {
        method: "PATCH",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(game),
    }).then(response => {
        if (!response.ok) {
            throw new Error("Failed to update game details");
        }

        return response.json();
    }).catch(error => {
        console.error("Error updating game details: ", error);
    });
}

const selectedSquare = function (square) {

    if (squares.length === 0) return;

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
        if (!piece.id.startsWith(currentTurn)) return;

        if (piece.id === '0') return;

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

        // You left here

        fetchMoves(piece.id, r, c).then((moveRes) => {
            if (!moveRes) return;

            allMovesIndex = moveRes.moves;
            allCapturesIndex = moveRes.captures;

            allMoves = allMovesIndex.map(
                ([mr, mc]) => squares[mr][mc]
            );
            allCaptures = allCapturesIndex.map(
                ([cr, cc]) => squares[cr][cc]
            );

            allMoves.forEach((sq) => {
                sq.style.backgroundColor = "rgba(0, 0, 255, 0.25)";
                sq.style.border = "1px solid blue";
            });

            // Setting up the color property for all available squares with enemy
            allCaptures.forEach((sq) => {
                sq.style.backgroundColor = "rgba(255, 0, 0, 0.35)";
                sq.style.border = "1px solid red";
            });
        });
    }

    // Problem here
}

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

    Board[newRow][newCol] = piece.id;
    Board[oldRow][oldCol] = "0";

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

        shiftTurn();
        updateGameDetails(sourceSquare, targetSquare, piece.id, "none");


    }, { once: true });
    console.log(Board);
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

    Board[newRow][newCol] = friendlyPiece.id;
    Board[oldRow][oldCol] = "0";

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

        shiftTurn();
        updateGameDetails(sourceSquare, target, friendlyPiece.id, enemyPiece.id);

    }, { once: true });
    console.log(Board);
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
    Board[kr0][kc0] = "0";
    Board[rr0][rc0] = "0";
    Board[kr1][kc1] = king.id;
    Board[rr1][rc1] = rook.id;

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

        shiftTurn();

        updateGameDetails(kingSqO, kingSqN, king.id, "none");

    }, { once: true });
};




function resetSelection() {

    let p;
    if (currentSelected) {
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


