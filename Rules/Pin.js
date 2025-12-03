//-----------
//PIN LOGIC
//-----------

const checkPin = function(piece, r, c, squares) {


    // 2D array to check and detect the pawn move when Pinned
    const pawnAttacks = [
        [1, 1], [1, -1]
    ];

    let kingOneSider = false, enemyOtherSider = false;
    for(let i = r+1; i < 8; i++) {

        const p = squares[i][c].querySelector('img');

        if(p) {
            if(p.id.includes(piece.id.includes('white')?'white-king':'black-king')) {
                kingOneSider = true;
                break;
            }

            else if((p.id.includes(piece.id.includes('white')?'black-queen':'white-queen') ||
            p.id.includes(piece.id.includes('white')?'black-rook':'white-rook'))) {
                enemyOtherSider = true;
                break;
            }else {
                break;
            }
        }
    }

    for(let i = r-1; i >= 0; i--) {

        const p = squares[i][c].querySelector('img');

        if(p) {
            if(p.id.includes(piece.id.includes('white')?'white-king':'black-king')) {
                kingOneSider = true;
                break;
            }

            else if((p.id.includes(piece.id.includes('white')?'black-queen':'white-queen') ||
            p.id.includes(piece.id.includes('white')?'black-rook':'white-rook'))) {
                if(enemyOtherSider === false) {
                    enemyOtherSider = true;
                    break;
                } else {
                    break;
                }
            }else {
                break;
            }
        }
    }

    let kingOneSidec = false, enemyOtherSidec = false;
    for(let i = c+1; i < 8; i++) {

        const p = squares[r][i].querySelector('img');

        if(p) {
            if(p.id.includes(piece.id.includes('white')?'white-king':'black-king')) {
                kingOneSidec = true;
                break;
            }

            else if((p.id.includes(piece.id.includes('white')?'black-queen':'white-queen') ||
            p.id.includes(piece.id.includes('white')?'black-rook':'white-rook'))) {
                enemyOtherSidec = true;
                break;
            }else {
                break;
            }
        }
    }

    for(let i = c-1; i >= 0; i--) {

        const p = squares[r][i].querySelector('img');

        if(p) {
            if(p.id.includes(piece.id.includes('white')?'white-king':'black-king')) {
                kingOneSidec = true;
                break;
            }

            else if((p.id.includes(piece.id.includes('white')?'black-queen':'white-queen') ||
            p.id.includes(piece.id.includes('white')?'black-rook':'white-rook'))) {
                if(enemyOtherSidec === false) {
                    enemyOtherSidec = true;
                    break;
                } else {
                    break;
                }
            }else {
                break;
            }
        }
    }

    let kingOneSided1 = false, enemyOtherSided1 = false;
    for(let i = r+1, j = c+1; i < 8 && j < 8; i++, j++) {

        const p = squares[i][j].querySelector('img');

        if(p) {
            if(p.id.includes(piece.id.includes('white')?'white-king':'black-king')) {
                kingOneSided1 = true;
                break;
            }

            else if((p.id.includes(piece.id.includes('white')?'black-queen':'white-queen') ||
            p.id.includes(piece.id.includes('white')?'black-bishop':'white-bishop'))) {
                enemyOtherSided1 = true;
                break;
            }else {
                break;
            }
        }
    }

    for(let i = r-1, j = c-1; i >= 0 && j >= 0; i--, j--) {

        const p = squares[i][j].querySelector('img');

        if(p) {
            if(p.id.includes(piece.id.includes('white')?'white-king':'black-king')) {
                kingOneSided1 = true;
                break;
            }

            else if((p.id.includes(piece.id.includes('white')?'black-queen':'white-queen') ||
            p.id.includes(piece.id.includes('white')?'black-bishop':'white-bishop'))) {
                if(enemyOtherSided1 === false) {
                    enemyOtherSided1 = true;
                    break;
                } else {
                    break;
                }
            }else {
                break;
            }
        }
    }

    let kingOneSided2 = false, enemyOtherSided2 = false;
    for(let i = r+1, j = c-1; i < 8 && j >= 0; i++, j--) {

        const p = squares[i][j].querySelector('img');

        if(p) {
            if(p.id.includes(piece.id.includes('white')?'white-king':'black-king')) {
                kingOneSided2 = true;
                break;
            }

            else if((p.id.includes(piece.id.includes('white')?'black-queen':'white-queen') ||
            p.id.includes(piece.id.includes('white')?'black-bishop':'white-bishop'))) {
                enemyOtherSided2 = true;
                break;
            }else {
                break;
            }
        }
    }

    for(let i = r-1, j = c+1; i >= 0 && j < 8; i--, j++) {

        const p = squares[i][j].querySelector('img');

        if(p) {
            if(p.id.includes(piece.id.includes('white')?'white-king':'black-king')) {
                kingOneSided2 = true;
                break;
            }

            else if((p.id.includes(piece.id.includes('white')?'black-queen':'white-queen') ||
            p.id.includes(piece.id.includes('white')?'black-bishop':'white-bishop'))) {
                if(enemyOtherSided2 === false) {
                    enemyOtherSided2 = true;
                    break;
                } else {
                    break;
                }
            }else {
                break;
            }
        }
    }

    // Determining the pin Status for different pieces
    const pinStatus = {
        isPin: false,
        vertical: false,
        horizontal: false,
        leftDiagonal: false,
        rightDiagonal: false,
        pawnDiagonal: null
    };

    if(kingOneSider && enemyOtherSider) {
        pinStatus.isPin = true;
        pinStatus.vertical = true;
    }

    if(kingOneSidec && enemyOtherSidec) {
        pinStatus.isPin = true;
        pinStatus.horizontal = true;
    }

    if(kingOneSided1 && enemyOtherSided1) {
        pinStatus.isPin = true;
        pinStatus.leftDiagonal = true;
        pinStatus.pawnDiagonal = pawnAttacks[0];
    }

    if(kingOneSided2 && enemyOtherSided2) {
        pinStatus.isPin = true;
        pinStatus.rightDiagonal = true;
        pinStatus.pawnDiagonal = pawnAttacks[1];
    }

    return pinStatus;
}

export default checkPin;