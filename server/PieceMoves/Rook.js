// =====================
//  ROOK MOVES
// =====================

const checkPin = require("../Rules/Pin");

function checkRookMoves(row, col, initialBoard, demandMoves) {

    let moves = [], captures = [];

    const piece = initialBoard[row][col];

    const pinStatus = checkPin(piece, row, col, initialBoard);

    if (pinStatus.isPin && (pinStatus.leftDiagonal || pinStatus.rightDiagonal)) return [];

    // Selecting all the squares without enemy and with enemy in all four direction

    if (!pinStatus.horizontal) {
        // Down
        for (let i = row + 1; i < 8; i++) {
            const p = initialBoard[i][col];

            if (p !== '0' && p.includes(piece.includes('w') ? 'b' : 'w')) {
                captures.push([i, col]);
                break;
            }
            if (p !== '0' && p.includes(piece.includes('w') ? 'w' : 'b')) break;

            if (p === '0') moves.push([i, col]);
        }

        // Up
        for (let i = row - 1; i >= 0; i--) {
            const p = initialBoard[i][col];

            if (p !== '0' && p.includes(piece.includes('w') ? 'b' : 'w')) {
                captures.push([i, col]);
                break;
            }
            if (p !== '0' && p.includes(piece.includes('w') ? 'w' : 'b')) break;

            if (p === '0') moves.push([i, col]);
        }
    }

    if (!pinStatus.vertical) {

        // Left
        for (let i = col - 1; i >= 0; i--) {
            const p = initialBoard[row][i];

            if (p !== '0' && p.includes(piece.includes('w') ? 'b' : 'w')) {
                captures.push([row, i]);
                break;
            }
            if (p !== '0' && p.includes(piece.includes('w') ? 'w' : 'b')) break;

            if (p === '0') moves.push([row, i]);
        }

        // Right
        for (let i = col + 1; i < 8; i++) {
            const p = initialBoard[row][i];

            if (p !== '0' && p.includes(piece.includes('w') ? 'b' : 'w')) {
                captures.push([row, i]);
                break;
            }
            if (p !== '0' && p.includes(piece.includes('w') ? 'w' : 'b')) break;

            if (p === '0') moves.push([row, i]);
        }
    }

    return (demandMoves) ? moves : captures;
}

module.exports = checkRookMoves;
