// =====================
//  ROOK MOVES
// =====================

function checkRookMoves(square, row, col, squares, demandMoves) {

    let moves = [], captures = [];

    const piece = square.querySelector('img');
    const id = piece.id;

    // Selecting all the squares without enemy and with enemy in all four direction

    // Down
    for(let i = row+1; i < 8; i++) {
        const p = squares[i][col].querySelector('img');
        if(p && p.id.includes(id.includes('white')?'black':'white')){
            captures.push([i, col]);
            break;
        }
        if(p && p.id.includes(id.includes('white')?'white':'black'))break;
        moves.push([i, col]);
    }

    // Up
    for(let i = row-1; i >= 0; i--) {
        const p = squares[i][col].querySelector('img');
        if(p && p.id.includes(id.includes('white')?'black':'white')){
            captures.push([i, col]);
            break;
        }
        if(p && p.id.includes(id.includes('white')?'white':'black'))break;
        moves.push([i, col]);
    }

    //Left
    for(let i = col-1; i >= 0; i--) {
        const p = squares[row][i].querySelector('img');
        if(p && p.id.includes(id.includes('white')?'black':'white')){
            captures.push([row, i]);
            break;
        }
        if(p && p.id.includes(id.includes('white')?'white':'black'))break;
        moves.push([row, i]);
    }

    // Right
    for(let i = col+1; i < 8; i++) {
        const p = squares[row][i].querySelector('img');
        if(p && p.id.includes(id.includes('white')?'black':'white')){
            captures.push([row, i]);
            break;
        }
        if(p && p.id.includes(id.includes('white')?'white':'black'))break;
        moves.push([row, i]);
    }

    return (demandMoves)?moves.map(([r, c]) => squares[r][c]):captures.map(([r, c]) => squares[r][c]);
}

export default checkRookMoves;