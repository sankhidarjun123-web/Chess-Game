import checkBishopMoves from "./Bishop.js";
import checkRookMoves from "./Rook.js";

// =====================
//  QUEEN MOVES
// =====================

function checkQueenMoves(square, row, col, squares, demandMoves) {

    // Moves logic
    let moves = [
        ...checkBishopMoves(square, row, col, squares, true), 
        ...checkRookMoves(square, row, col, squares, true)
    ];

    // Capture logic
    let captures = [
        ...checkBishopMoves(square, row, col, squares, false),
        ...checkRookMoves(square, row, col, squares, false)
    ];


    return (demandMoves)?moves:captures;
}

export default checkQueenMoves;