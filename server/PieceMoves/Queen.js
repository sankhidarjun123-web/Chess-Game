const checkBishopMoves = require('./Bishop');
const checkRookMoves = require('./Rook');

// =====================
//  QUEEN MOVES
// =====================

function checkQueenMoves(row, col, initialBoard, demandMoves) {

    // Moves logic
    let moves = [
        ...checkBishopMoves(row, col, initialBoard, true), 
        ...checkRookMoves(row, col, initialBoard, true)
    ];
    // Capture logic
    let captures = [
        ...checkBishopMoves(row, col, initialBoard, false),
        ...checkRookMoves(row, col, initialBoard, false)
    ];

    // if(!ind) {
    //     return (demandMoves)?moves:captures;
    // }
    return (demandMoves)?moves:captures;
}

module.exports = checkQueenMoves;