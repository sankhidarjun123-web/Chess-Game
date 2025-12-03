// =====================
//  BISHOP MOVES
// =====================


function checkBishopMoves(square, row, col, squares, demandMoves) {

    let moves = [], captures = [];
    const piece = square.querySelector('img');
    const id = piece.id;

    // Selecting all the squares without enemy and with enemy in all four direction


    // Bottom-right
    for(let i = row+1, j = col+1; i < 8 && j < 8; i++, j++) {

        const p = squares[i][j].querySelector('img');
        if(p && p.id.includes(id.includes('white')?'black':'white')){
            captures.push([i, j]);
            break;
        }
        if(p && p.id.includes(id.includes('white')?'white':'black'))break;

        moves.push([i, j]);
    }

    // Bottom-left
    for(let i = row+1, j = col-1; i < 8 && j >= 0; i++, j--) {

        const p = squares[i][j].querySelector('img');
        if(p && p.id.includes(id.includes('white')?'black':'white')){
            captures.push([i, j]);
            break;
        }
        if(p && p.id.includes(id.includes('white')?'white':'black'))break;

        moves.push([i, j]);
    }

    // Top-left
    for(let i = row-1, j = col-1; i >= 0 && j >= 0; i--, j--) {

        const p = squares[i][j].querySelector('img');
        if(p && p.id.includes(id.includes('white')?'black':'white')){
            captures.push([i, j]);
            break;
        }
        if(p && p.id.includes(id.includes('white')?'white':'black'))break;

        moves.push([i, j]);
    }

    // Top-right
    for(let i = row-1, j = col+1; i >= 0 && j < 8; i--, j++) {

        const p = squares[i][j].querySelector('img');
        if(p && p.id.includes(id.includes('white')?'black':'white')){
            captures.push([i, j]);
            break;
        }
        if(p && p.id.includes(id.includes('white')?'white':'black'))break;

        moves.push([i, j]);
    }

    return (demandMoves)?moves.map(([r, c]) => squares[r][c]):captures.map(([r, c]) => squares[r][c]);
}

export default checkBishopMoves;