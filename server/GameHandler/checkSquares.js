const checkpawnMoves   = require("../PieceMoves/Pawn");
const checkKnightMoves = require("../PieceMoves/Knight");
const checkBishopMoves = require("../PieceMoves/Bishop");
const checkRookMoves   = require("../PieceMoves/Rook");
const checkQueenMoves  = require("../PieceMoves/Queen");
const checkKingMoves   = require("../PieceMoves/King");


const checkSquares = (piece, row, col, board, castleStatus) => {

    let moves = [], captures = [];
    switch(piece) {

        case "pawn" :
            moves = checkpawnMoves(row, col, board, true);
            captures = checkpawnMoves(row, col, board, false);
            break;

        case "bishop" :
            moves = checkBishopMoves(row, col, board, true);
            captures = checkBishopMoves(row, col, board, false);
            break;

        case "knight" :
            moves = checkKnightMoves(row, col, board, true);
            captures = checkKnightMoves(row, col, board, false);
            break;

        case "rook" :
            moves = checkRookMoves(row, col, board, true);
            captures = checkRookMoves(row, col, board, false);
            break;

        case "queen" :
            moves = checkQueenMoves(row, col, board, true);
            captures = checkQueenMoves(row, col, board, false);
            break;

        case "king" :
            moves = checkKingMoves(row, col, board, true, castleStatus);
            captures = checkKingMoves(row, col, board, false, castleStatus);
            break;

        default :
            throw new Error("Not a valid piece!");
    }

    return {
        moves: moves,
        captures: captures
    };

};


module.exports = checkSquares;