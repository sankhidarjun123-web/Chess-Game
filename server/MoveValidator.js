const checkSquaresFn = require("./GameHandler/checkSquares");
const checkForChecks = require("./KingMovementHandler/Check");
const vaildMoves = require("./KingMovementHandler/VaildMoves");

function giveValidMoves(selectedSquare, piece, board, castleStatus, whiteKingPosition, blackKingPosition, currentTurn) {

    const [row, col] = selectedSquare;
    let details = { moves: [], captures: [] };

    if (piece === "wp" || piece === "bp") {
        details = checkSquaresFn("pawn", row, col, board, castleStatus);
    } else if (piece === "wn" || piece === "bn") {
        details = checkSquaresFn("knight", row, col, board, castleStatus);
    } else if (piece === "wB" || piece === "bB") {
        details = checkSquaresFn("bishop", row, col, board, castleStatus);
    } else if (
        piece === "wra" || piece === "wrh" ||
        piece === "bra" || piece === "brh"
    ) {
        details = checkSquaresFn("rook", row, col, board, castleStatus);
    } else if (piece === "wq" || piece === "bq") {
        details = checkSquaresFn("queen", row, col, board, castleStatus);
    } else if (piece === "wk" || piece === "bk") {
        details = checkSquaresFn("king", row, col, board, castleStatus);
    }


    const checkStatusWhite = isKingInCheck("wk", whiteKingPosition[0], whiteKingPosition[1], board);

    const checkStatusBlack = isKingInCheck("bk", blackKingPosition[0], blackKingPosition[1], board);

    let filteredMoves = [], filteredCaptures = [];
    if(checkStatusWhite.isCheck && currentTurn === 'w') {
        filteredMoves = vaildMoves(board, true, checkStatusWhite, [row, col], details.captures, details.moves);
        filteredCaptures = vaildMoves(board, false, checkStatusWhite, [row, col], details.captures, details.moves);
    } else if(checkStatusBlack.isCheck && currentTurn === 'b') {
        filteredMoves = vaildMoves(board, true, checkStatusBlack, [row, col], details.captures, details.moves);
        filteredCaptures = vaildMoves(board, false, checkStatusBlack, [row, col], details.captures, details.moves);
    } else {
        console.log(details);
        return details;
    }

    console.log(filteredMoves, filteredCaptures);
    return {
        moves: filteredMoves,
        captures: filteredCaptures
    };

}


function isKingInCheck(piece, row, col, board) {

    const checkStatus = checkForChecks(piece, row, col, board);

    return checkStatus;
}

module.exports = giveValidMoves