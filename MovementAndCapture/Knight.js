import checkPin from "../Rules/Pin.js";

// =====================
//  KNIGHT MOVES
// =====================

function checkKnightMoves(square, row, col, squares, demandMoves) { 
    let moves = [], captures = []; 
    row = Number(row); 
    col = Number(col);
    
    const piece = square.querySelector('img');

    const pinStatus = checkPin(piece, row, col, squares);   // Object to determine the pin on the piece

    const possibleMoves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    // Selecting all the squares without enemy and with enemy
    for(let x of possibleMoves) {

        let r = row+x[0];
        let c = col+x[1];

        if((r < 0 || r > 7) || (c < 0 || c > 7))continue;

        const p = squares[r][c].querySelector('img');

        if(!p)moves.push([r, c]);
        else if(p.id.includes(piece.id.includes('white')?'black':'white'))captures.push([r,c]);
    }

    if(pinStatus.isPin)return [];

    return (demandMoves)?moves.map(([r, c]) => squares[r][c]):captures.map(([r, c]) => squares[r][c]);
}

export default checkKnightMoves;