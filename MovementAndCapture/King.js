// =====================
//  KING MOVES
// =====================

function checkKingMoves(square, row, col, squares, demandMoves) {

    let moves = [], captures = [];
    const piece = square.querySelector('img');
    const id = piece.id;

    const possibleMoves = [
        [1, 0], [0, 1], [-1, 0], [0, -1],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];
 
    for(let x of possibleMoves) {

        let r, c;
        r = row+x[0];
        c = col+x[1];

        if((r < 0 || r > 7) || (c < 0 || c > 7)) continue;

        const p = squares[r][c].querySelector('img');

        if(!checkSquare(piece, r, c, squares))continue;

        if(p && p.id.includes(id.includes('white')?'black':'white')){
            captures.push([r, c]);
            continue;
        }
        if(p && p.id.includes(id.includes('white')?'white':'black')) continue;

        moves.push([r, c]);
    }

    return (demandMoves)?moves.map(([r, c]) => squares[r][c]):captures.map(([r, c]) => squares[r][c]);
}


function checkSquare(piece, r, c, squares) {


    const id = piece.id;

    // Pawn check logic
    if(id === "white-king") {

        if(r-1 >= 0 && c-1 >= 0) {
            const pawnCheck = squares[r-1][c-1].querySelector('img');

            if(pawnCheck && pawnCheck.id === "black-pawn")return false;
        }

        if(r-1 >= 0 && c+1 < 8) {
            const pawnCheck = squares[r-1][c+1].querySelector('img');

            if(pawnCheck && pawnCheck.id === "black-pawn")return false;
        }
    }

    if(id === "black-king") {

        if(r+1 < 8 && c-1 >= 0) {
            const pawnCheck = squares[r+1][c-1].querySelector('img');

            if(pawnCheck && pawnCheck.id === "white-pawn")return false;
        }

        if(r+1 < 8 && c+1 < 8) {
            const pawnCheck = squares[r+1][c+1].querySelector('img');

            if(pawnCheck && pawnCheck.id === "white-pawn")return false;
        }
    }

    let rif = r+1, cif = c+1;
    let rir = r-1, cir = c-1;

    // Knight logic array
    const knightCheck = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    // King logic array
    const kingCheck = [
        [1, 0], [-1, 0], [1, 1], [1, -1],
        [0, 1], [0, -1], [-1, -1], [-1, 1]
    ];

    // Checking for rooks and queens on bottom side
    while(rif < 8) {

        const pr = squares[rif][c].querySelector('img');

        if(pr) {

            if(pr.id.includes(piece.id.includes('white')?'black-queen':'white-queen') || 
            pr.id.includes(piece.id.includes('white')?'black-rook':'white-rook')) return false;            // If the rook or queen found then the square is not safe

            else break;        // Important break condition for a piece blocking the attack of the rook or queen
        }

        rif++;
    }

    // Checking for rooks and queens on top side
    while(rir >= 0) {

        const pr = squares[rir][c].querySelector('img');

        if(pr) {

            if(pr.id.includes(piece.id.includes('white')?'black-queen':'white-queen') || 
            pr.id.includes(piece.id.includes('white')?'black-rook':'white-rook')) return false;

            else break;
        }

        rir--;
    }

    // Checking for rooks and queens on right side
    while(cif < 8) {

        const pr = squares[r][cif].querySelector('img');

        if(pr) {

            if(pr.id.includes(piece.id.includes('white')?'black-queen':'white-queen') || 
            pr.id.includes(piece.id.includes('white')?'black-rook':'white-rook')) return false;

            else break;
        }

        cif++;
    }

    // Checking for rooks and queens on left side
    while(cir >= 0) {

        const pr = squares[r][cir].querySelector('img');

        if(pr) {

            if(pr.id.includes(piece.id.includes('white')?'black-queen':'white-queen') || 
            pr.id.includes(piece.id.includes('white')?'black-rook':'white-rook')) return false;

            else break;
        }

        cir--;
    }

    // Checking for bishops and queens on diagonals
    for(let rir = r-1, cir = c-1; rir >= 0 && cir >= 0; rir--, cir--) {

        const pr = squares[rir][cir].querySelector('img');

        if(pr) {

            if(pr.id.includes(piece.id.includes('white')?'black-queen':'white-queen') || 
            pr.id.includes(piece.id.includes('white')?'black-bishop':'white-bishop')) return false;

            else break;
        }
    }

    for(let rir = r-1, cif = c+1; rir >= 0 && cif < 8; rir--, cif++) {

        const pr = squares[rir][cif].querySelector('img');

        if(pr) {

            if(pr.id.includes(piece.id.includes('white')?'black-queen':'white-queen') || 
            pr.id.includes(piece.id.includes('white')?'black-bishop':'white-bishop')) return false;

            else break;
        }
    }

    for(let rif = r+1, cif = c+1; rif < 8 && cif < 8; rif++, cif++) {

        const pr = squares[rif][cif].querySelector('img');

        if(pr) {

            if(pr.id.includes(piece.id.includes('white')?'black-queen':'white-queen') || 
            pr.id.includes(piece.id.includes('white')?'black-bishop':'white-bishop')) return false;

            else break;
        }
    }

    for(let rif = r+1, cir = c-1; rif < 8 && cir >= 0; rif++, cif--) {

        const pr = squares[rif][cir].querySelector('img');

        if(pr) {

            if(pr.id.includes(piece.id.includes('white')?'black-queen':'white-queen') || 
            pr.id.includes(piece.id.includes('white')?'black-bishop':'white-bishop')) return false;

            else break;
        }
    }

    // Knight check logic
    for(const x of knightCheck) {

        const rr = r+x[0];
        const cc = c+x[1];

        if(rr >= 0 && rr < 8 && cc >= 0 && cc < 8) {
            const p = squares[rr][cc].querySelector('img');
            if(p && p.id.includes(piece.id.includes('white')?'black-knight':'white-knight')) return false;
        }

    }

    // King check logic
    for(const x of kingCheck) {

        const rr = r+x[0];
        const cc = c+x[1];

        if(rr >= 0 && rr < 8 && cc >= 0 && cc < 8) {
            const p = squares[rr][cc].querySelector('img');
            if(p && p.id.includes(piece.id.includes('white')?'black-king':'white-king')) return false;
        }

    }

    return true;
}

export default checkKingMoves;