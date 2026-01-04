//-----------
// PIN LOGIC
//-----------

const checkPin = function(piece, r, c, initialBoard) {

    let kingOneSider = false, enemyOtherSider = false;
    for(let i = r+1; i < 8; i++) {

        const p = initialBoard[i][c];

        if(p !== '0') {
            if(p.includes(piece.includes('w') ? 'wk' : 'bk')) {
                kingOneSider = true;
                break;
            }

            else if(
                p.includes(piece.includes('w') ? 'bq' : 'wq') ||
                p.includes(piece.includes('w') ? 'br' : 'wr')
            ) {
                enemyOtherSider = true;
                break;
            } else {
                break;
            }
        }
    }

    for(let i = r-1; i >= 0; i--) {

        const p = initialBoard[i][c];

        if(p !== '0') {
            if(p.includes(piece.includes('w') ? 'wk' : 'bk')) {
                kingOneSider = true;
                break;
            }

            else if(
                p.includes(piece.includes('w') ? 'bq' : 'wq') ||
                p.includes(piece.includes('w') ? 'br' : 'wr')
            ) {
                if(enemyOtherSider === false) {
                    enemyOtherSider = true;
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

    let kingOneSidec = false, enemyOtherSidec = false;
    for(let i = c+1; i < 8; i++) {

        const p = initialBoard[r][i];

        if(p !== '0') {
            if(p.includes(piece.includes('w') ? 'wk' : 'bk')) {
                kingOneSidec = true;
                break;
            }

            else if(
                p.includes(piece.includes('w') ? 'bq' : 'wq') ||
                p.includes(piece.includes('w') ? 'br' : 'wr')
            ) {
                enemyOtherSidec = true;
                break;
            } else {
                break;
            }
        }
    }

    for(let i = c-1; i >= 0; i--) {

        const p = initialBoard[r][i];

        if(p !== '0') {
            if(p.includes(piece.includes('w') ? 'wk' : 'bk')) {
                kingOneSidec = true;
                break;
            }

            else if(
                p.includes(piece.includes('w') ? 'bq' : 'wq') ||
                p.includes(piece.includes('w') ? 'br' : 'wr')
            ) {
                if(enemyOtherSidec === false) {
                    enemyOtherSidec = true;
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

    let kingOneSided1 = false, enemyOtherSided1 = false;
    for(let i = r+1, j = c+1; i < 8 && j < 8; i++, j++) {

        const p = initialBoard[i][j];

        if(p !== '0') {
            if(p.includes(piece.includes('w') ? 'wk' : 'bk')) {
                kingOneSided1 = true;
                break;
            }

            else if(
                p.includes(piece.includes('w') ? 'bq' : 'wq') ||
                p.includes(piece.includes('w') ? 'bB' : 'wB')
            ) {
                enemyOtherSided1 = true;
                break;
            } else {
                break;
            }
        }
    }

    for(let i = r-1, j = c-1; i >= 0 && j >= 0; i--, j--) {

        const p = initialBoard[i][j];

        if(p !== '0') {
            if(p.includes(piece.includes('w') ? 'wk' : 'bk')) {
                kingOneSided1 = true;
                break;
            }

            else if(
                p.includes(piece.includes('w') ? 'bq' : 'wq') ||
                p.includes(piece.includes('w') ? 'bB' : 'wB')
            ) {
                if(enemyOtherSided1 === false) {
                    enemyOtherSided1 = true;
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

    let kingOneSided2 = false, enemyOtherSided2 = false;
    for(let i = r+1, j = c-1; i < 8 && j >= 0; i++, j--) {

        const p = initialBoard[i][j];

        if(p !== '0') {
            if(p.includes(piece.includes('w') ? 'wk' : 'bk')) {
                kingOneSided2 = true;
                break;
            }

            else if(
                p.includes(piece.includes('w') ? 'bq' : 'wq') ||
                p.includes(piece.includes('w') ? 'bB' : 'wB')
            ) {
                enemyOtherSided2 = true;
                break;
            } else {
                break;
            }
        }
    }

    for(let i = r-1, j = c+1; i >= 0 && j < 8; i--, j++) {

        const p = initialBoard[i][j];

        if(p !== '0') {
            if(p.includes(piece.includes('w') ? 'wk' : 'bk')) {
                kingOneSided2 = true;
                break;
            }

            else if(
                p.includes(piece.includes('w') ? 'bq' : 'wq') ||
                p.includes(piece.includes('w') ? 'bB' : 'wB')
            ) {
                if(enemyOtherSided2 === false) {
                    enemyOtherSided2 = true;
                    break;
                } else {
                    break;
                }
            } else {
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
        pinStatus.pawnDiagonal = piece === 'wp' ? [-1, -1] : [1, 1];
    }

    if(kingOneSided2 && enemyOtherSided2) {
        pinStatus.isPin = true;
        pinStatus.rightDiagonal = true;
        pinStatus.pawnDiagonal = piece === 'wp' ? [-1, 1] : [1, -1];
    }

    return pinStatus;
}

export default checkPin;
