const checkpawnMoves   = require("../PieceMoves/Pawn");
const checkKnightMoves = require("../PieceMoves/Knight");
const checkBishopMoves = require("../PieceMoves/Bishop");
const checkRookMoves   = require("../PieceMoves/Rook");
const checkQueenMoves  = require("../PieceMoves/Queen");
const checkKingMoves   = require("../PieceMoves/King");

const vaildMoves = require("../Checks&CheckMate/VaildMoves");
// import { allCapturesIndex, allMovesIndex, currentSelected } from "../script.js";

// Problem in this

function checkboardState(turn, board, checkStatusWhite, checkStatusBlack, currentSelectedCor, allCapturesIndex, allMovesIndex) {

    if(!turn)return;

    const possible = {};

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {

            const piece = board[i][j];
            if (piece === '0') continue;

            const color = piece[0];
            const type = piece[1];

            if (color !== turn) continue;

            let moves = [];
            let captures = [];

            switch (type) {
                case 'p':
                    moves = checkpawnMoves(i, j, board, true);
                    captures = checkpawnMoves(i, j, board, false);
                    break;

                case 'n':
                    moves = checkKnightMoves(i, j, board, true);
                    captures = checkKnightMoves(i, j, board, false);
                    break;

                case 'B':
                    moves = checkBishopMoves(i, j, board, true);
                    captures = checkBishopMoves(i, j, board, false);
                    break;

                case 'r':
                    moves = checkRookMoves(i, j, board, true);
                    captures = checkRookMoves(i, j, board, false);
                    break;

                case 'q':
                    moves = checkQueenMoves(i, j, board, true);
                    captures = checkQueenMoves(i, j, board, false);
                    break;

                case 'k':
                    moves = checkKingMoves(i, j, board, true);
                    captures = checkKingMoves(i, j, board, false);
                    break;

            }
            // Replace the valMoves/valCaptures section inside your loop with this
            let valMoves = moves;
            let valCaptures = captures;

            // Only filter them further if the current side is in check
            if (checkStatusBlack.isCheck) {
                valMoves = vaildMoves(board, true, checkStatusBlack, [i, j], captures, moves);
                valCaptures = vaildMoves(board, false, checkStatusBlack, [i, j], captures, moves);
            } else if (checkStatusWhite.isCheck) {
                valMoves = vaildMoves(board, true, checkStatusWhite, [i, j], captures, moves);
                valCaptures = vaildMoves(board, false, checkStatusWhite, [i, j], captures, moves);
            }
            if(valMoves.length === 0 && valCaptures.length === 0)continue;

            possible[piece + ` - ${i + 1},${j + 1}`] = [...valMoves, ...valCaptures];
        }
    }

    return possible;
}


module.exports = checkboardState;