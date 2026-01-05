const checkPin = require("../Rules/Pin");

// =====================
//  BISHOP MOVES
// =====================

function checkBishopMoves(row, col, initialBoard, demandMoves) {

    let moves = [], captures = [];
    const piece = initialBoard[row][col];

    const pinStatus = checkPin(piece, row, col, initialBoard);
    // Selecting all the squares without enemy and with enemy in all four direction

    if (pinStatus.isPin && (pinStatus.horizontal || pinStatus.vertical)) return [];

    if (!pinStatus.rightDiagonal) {
        // Bottom-right
        for (let i = row + 1, j = col + 1; i < 8 && j < 8; i++, j++) {

            const p = initialBoard[i][j];
            if (p !== '0' && p.includes(piece.includes('w') ? 'b' : 'w')) {
                captures.push([i, j]);
                break;
            }
            if (p !== '0' && p.includes(piece.includes('w') ? 'w' : 'b')) break;

            if (p === '0') moves.push([i, j]);
        }

        // Top-left
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {

            const p = initialBoard[i][j];
            if (p !== '0' && p.includes(piece.includes('w') ? 'b' : 'w')) {
                captures.push([i, j]);
                break;
            }
            if (p !== '0' && p.includes(piece.includes('w') ? 'w' : 'b')) break;

            if (p === '0') moves.push([i, j]);
        }
    }

    if (!pinStatus.leftDiagonal) {

        // Bottom-left
        for (let i = row + 1, j = col - 1; i < 8 && j >= 0; i++, j--) {

            const p = initialBoard[i][j];
            if (p !== '0' && p.includes(piece.includes('w') ? 'b' : 'w')) {
                captures.push([i, j]);
                break;
            }
            if (p !== '0' && p.includes(piece.includes('w') ? 'w' : 'b')) break;

            if (p === '0') moves.push([i, j]);
        }

        // Top-right
        for (let i = row - 1, j = col + 1; i >= 0 && j < 8; i--, j++) {

            const p = initialBoard[i][j];
            if (p !== '0' && p.includes(piece.includes('w') ? 'b' : 'w')) {
                captures.push([i, j]);
                break;
            }
            if (p !== '0' && p.includes(piece.includes('w') ? 'w' : 'b')) break;

            if (p === '0') moves.push([i, j]);
        }
    }

    return (demandMoves) ? moves : captures;
}

module.exports = checkBishopMoves;
