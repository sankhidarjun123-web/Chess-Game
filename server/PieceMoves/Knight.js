const checkPin = require("../Rules/Pin");

// =====================
//  KNIGHT MOVES
// =====================

function checkKnightMoves(row, col, initialBoard, demandMoves) { 
    let moves = [], captures = []; 
    row = Number(row); 
    col = Number(col);
    
    const piece = initialBoard[row][col];

    const pinStatus = checkPin(piece, row, col, initialBoard);   // Object to determine the pin on the piece

    const possibleMoves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    // Selecting all the squares without enemy and with enemy
    for(let x of possibleMoves) {

        let r = row + x[0];
        let c = col + x[1];

        if ((r < 0 || r > 7) || (c < 0 || c > 7)) continue;

        const p = initialBoard[r][c];

        if (p === '0') {
            moves.push([r, c]);
        } else if (p !== '0' && p.includes(piece.includes('w') ? 'b' : 'w')) {
            captures.push([r, c]);
        }
    }

    if (pinStatus.isPin) return [];

    return (demandMoves) ? moves : captures;
}

module.exports = checkKnightMoves;
