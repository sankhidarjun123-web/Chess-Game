// Once again the problem lies here and only here the check checker which i would fix later okkie

function checkForChecks(piece, row, col, initialBoard) {

    // Final check status to return
    let checkStatus = {
        isCheck: false,
        checkedKing: null,
        checkedKingCor: [row, col],
        checkingPiece: [],
        checkDirection: [],
        squaresBetweenCalc: [],
        enemyPieceCoordinates: [],
        fallBack: []
    };
    
    // Pawn array
    const pawnCheck = [
        [1, 1], [1, -1]
    ];

    // Knight array
    const knightCheck = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    // Pawn check logic
    for (let x of pawnCheck) {
        if (piece === "wk") {
            let r = row - x[0];
            let c = col - x[1];

            if (r < 0 || r >= 8 || c < 0 || c >= 8) continue;
            const enemyPawn = initialBoard[r][c];
            if (enemyPawn !== '0' && enemyPawn === "bp") {
                checkStatus.isCheck = true;
                checkStatus.checkingPiece.push("pawn");
                checkStatus.enemyPieceCoordinates = [r, c];
                checkStatus.checkedKing = piece;
                break;
            }
        }

        if (piece === "bk") {
            let r = row + x[0];
            let c = col + x[1];

            if (r < 0 || r >= 8 || c < 0 || c >= 8) continue;
            const enemyPawn = initialBoard[r][c];
            if (enemyPawn !== '0' && enemyPawn === "wp") {
                checkStatus.isCheck = true;
                checkStatus.checkingPiece.push("pawn");
                checkStatus.enemyPieceCoordinates = [r, c];
                checkStatus.checkedKing = piece;
                break;
            }
        }
    }

    // Knight check logic
    for (let x of knightCheck) {

        const r = row + x[0];
        const c = col + x[1];

        if (r < 0 || r >= 8 || c < 0 || c >= 8) continue;

        const enemyKnight = initialBoard[r][c];

        if (
            enemyKnight !== '0' &&
            enemyKnight.includes(piece === "wk" ? "bn" : "wn")
        ) {
            checkStatus.isCheck = true;
            checkStatus.checkingPiece.push("knight");
            checkStatus.enemyPieceCoordinates = [r, c];
            checkStatus.checkedKing = piece;
            break;
        }
    }

    // Checking for any side way attacks
    let enemyandCor = [null, -1];
    if (checkRowsCols(piece, row + 1, 8, col, initialBoard, enemyandCor, true)) {
        checkStatus.isCheck = true;
        checkStatus.checkingPiece.push(enemyandCor[0]);
        checkStatus.enemyPieceCoordinates = [enemyandCor[1], col];
        checkStatus.checkDirection.push("bottom");
        checkStatus.squaresBetweenCalc = [[row + 1, col], [enemyandCor[1] - 1, col]];
        checkStatus.checkedKing = piece;

        if (row - 1 >= 0) checkStatus.fallBack.push([row - 1, col]);
    }

    if (checkRowsCols(piece, row - 1, 0, col, initialBoard, enemyandCor, true)) {
        checkStatus.isCheck = true;
        checkStatus.checkingPiece.push(enemyandCor[0]);
        checkStatus.enemyPieceCoordinates = [enemyandCor[1], col];
        checkStatus.checkDirection.push("top");
        checkStatus.squaresBetweenCalc = [[row - 1, col], [enemyandCor[1] + 1, col]];
        checkStatus.checkedKing = piece;

        if (row + 1 < 8) checkStatus.fallBack.push([row + 1, col]);
    }

    if (checkRowsCols(piece, col + 1, 8, row, initialBoard, enemyandCor, false)) {
        checkStatus.isCheck = true;
        checkStatus.checkingPiece.push(enemyandCor[0]);
        checkStatus.enemyPieceCoordinates = [row, enemyandCor[1]];
        checkStatus.checkDirection.push("right");
        checkStatus.squaresBetweenCalc = [[row, col + 1], [row, enemyandCor[1] - 1]];
        checkStatus.checkedKing = piece;

        if (col - 1 >= 0) checkStatus.fallBack.push([row, col - 1]);
    }

    if (checkRowsCols(piece, col - 1, 0, row, initialBoard, enemyandCor, false)) {
        checkStatus.isCheck = true;
        checkStatus.checkingPiece.push(enemyandCor[0]);
        checkStatus.enemyPieceCoordinates = [row, enemyandCor[1]];
        checkStatus.checkDirection.push("left");
        checkStatus.squaresBetweenCalc = [[row, col - 1], [row, enemyandCor[1] + 1]];
        checkStatus.checkedKing = piece;

        if (col + 1 < 8) checkStatus.fallBack.push([row, col + 1]);
    }

    // Checking for any diagonal based attacks
    let enemyandCord = [null, -1, -1];

    if (checkDiagonals(piece, row + 1, 8, col + 1, 8, initialBoard, enemyandCord, true, true)) {
        checkStatus.isCheck = true;
        checkStatus.checkingPiece.push(enemyandCord[0]);
        checkStatus.enemyPieceCoordinates = [enemyandCord[1], enemyandCord[2]];
        checkStatus.checkDirection.push("left-diagonal-down");
        checkStatus.squaresBetweenCalc = [[row + 1, col + 1], [enemyandCord[1] - 1, enemyandCord[2] - 1]];
        checkStatus.checkedKing = piece;

        if (row - 1 >= 0 && col - 1 >= 0) checkStatus.fallBack.push([row - 1, col - 1]);
    }

    if (checkDiagonals(piece, row - 1, 0, col - 1, 0, initialBoard, enemyandCord, false, false)) {
        checkStatus.isCheck = true;
        checkStatus.checkingPiece.push(enemyandCord[0]);
        checkStatus.enemyPieceCoordinates = [enemyandCord[1], enemyandCord[2]];
        checkStatus.checkDirection.push("left-diagonal-up");
        checkStatus.squaresBetweenCalc = [[row - 1, col - 1], [enemyandCord[1] + 1, enemyandCord[2] + 1]];
        checkStatus.checkedKing = piece;

        if (row + 1 < 8 && col + 1 < 8) checkStatus.fallBack.push([row + 1, col + 1]);
    }

    if (checkDiagonals(piece, row + 1, 8, col - 1, 0, initialBoard, enemyandCord, true, false)) {
        checkStatus.isCheck = true;
        checkStatus.checkingPiece.push(enemyandCord[0]);
        checkStatus.enemyPieceCoordinates = [enemyandCord[1], enemyandCord[2]];
        checkStatus.checkDirection.push("right-diagonal-down");
        checkStatus.squaresBetweenCalc = [[row + 1, col - 1], [enemyandCord[1] - 1, enemyandCord[2] + 1]];
        checkStatus.checkedKing = piece;

        if (row - 1 >= 0 && col + 1 < 8) checkStatus.fallBack.push([row - 1, col + 1]);
    }

    if (checkDiagonals(piece, row - 1, 0, col + 1, 8, initialBoard, enemyandCord, false, true)) {
        checkStatus.isCheck = true;
        checkStatus.checkingPiece.push(enemyandCord[0]);
        checkStatus.enemyPieceCoordinates = [enemyandCord[1], enemyandCord[2]];
        checkStatus.checkDirection.push("right-diagonal-up");
        checkStatus.squaresBetweenCalc = [[row - 1, col + 1], [enemyandCord[1] + 1, enemyandCord[2] - 1]];
        checkStatus.checkedKing = piece;

        if (row + 1 < 8 && col - 1 >= 0) checkStatus.fallBack.push([row + 1, col - 1]);
    }

    return checkStatus;
}

// Helper function for the rook, bishop and queen check
function checkRowsCols(piece, start, end, fixed, initialBoard, enemyandCor, checkingRow) {
    for (let i = start; (end === 8) ? i < end : i >= end; (end === 8) ? i++ : i--) {
        const enemyFromSides = (checkingRow) ? initialBoard[i][fixed] : initialBoard[fixed][i];

        if (enemyFromSides !== '0') {
            if (
                enemyFromSides.includes(piece === "wk" ? "bq" : "wq") ||
                enemyFromSides.includes(piece === "wk" ? "br" : "wr")
            ) {
                enemyandCor[0] = enemyFromSides;
                enemyandCor[1] = i;
                return true;
            } else {
                break;
            }
        }
    }
    return false;
}

function checkDiagonals(piece, startr, endr, startc, endc, initialBoard, enemyandCor, checkingIr, checkingIc) {

    for (
        let i = startr, j = startc;
        ((endr === 8) ? i < endr : i >= endr) && ((endc === 8) ? j < endc : j >= endc);
        (checkingIr) ? i++ : i--, (checkingIc) ? j++ : j--
    ) {
        const enemyFromDiagonal = initialBoard[i][j];

        if (enemyFromDiagonal !== '0') {
            if (
                enemyFromDiagonal.includes(piece === "wk" ? "bq" : "wq") ||
                enemyFromDiagonal.includes(piece === "wk" ? "bB" : "wB")
            ) {
                enemyandCor[0] = enemyFromDiagonal;
                enemyandCor[1] = i;
                enemyandCor[2] = j;
                return true;
            } else {
                break;
            }
        }
    }

    return false;
}

module.exports = checkForChecks;
