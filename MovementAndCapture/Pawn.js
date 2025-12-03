import checkPin from "../Rules/Pin.js";

// =====================
//  PAWN MOVES
// =====================

function checkpawnMoves(square, row, col, squares, demandMoves) {

    row = Number(row);
    col = Number(col);

    let moves = [], captures = [];
    const piece = square.querySelector('img');
    const id = piece.id;

    const pinStatus = checkPin(piece, row, col, squares);   // Object to determine the pin on the piece

    let ar = 0, ac = 0;

    if(pinStatus.pawnDiagonal) {
        if(id === "white-pawn") {
            ar = row-pinStatus.pawnDiagonal[0];
            ac = col+pinStatus.pawnDiagonal[1];
        } else if(id === "black-pawn") {
            ar = row+pinStatus.pawnDiagonal[0];
            ac = col+pinStatus.pawnDiagonal[1];
        }
    }

    const posMoves = [[1, 0]];

    if(row === 1 || row === 6) {
        posMoves.push([2, 0]);
    }

    const posCaptures = [[1, 1], [1, -1]];

    // Selecting all the squares without enemy
    for(let x of posMoves) {
        
        let r,c;
        if (id === "white-pawn") {
            r = row - x[0];
            c = col;
        } else if (id === "black-pawn") {
            r = row + x[0];
            c = col;
        }

        if (r < 0 || r > 7) continue;

        if (x[0] === 2) {
            let midR = id === "white-pawn" ? row - 1 : row + 1;
            let midSquare = squares[midR][c].querySelector('img');
            if (midSquare) continue;
        }

        const p = squares[r][c].querySelector('img');

        if (!p) moves.push([r, c]);
    }

    // Selecting all the squares with enemy
    for(let x of posCaptures) {

        let r,c;

        if(id === "white-pawn") {
            r = row-x[0];
            c = col+x[1];
        } else if(id === "black-pawn") {
            r = row+x[0];
            c = col+x[1];
        }

        if ((r < 0 || r > 7) || (c < 0 || c > 7)) continue;
        let enemyPiece = squares[r][c].querySelector('img');

        if (enemyPiece && enemyPiece.id.includes(piece.id.includes('white') ? 'black' : 'white')) {
            captures.push([r, c]);
        }

    }

    // Pin Logic for pawn
    if(pinStatus.isPin) {
        if(pinStatus.vertical) {
            return (demandMoves)?moves.map(([r, c]) => squares[r][c]):[];
        }

        if(pinStatus.horizontal) {
            return [];
        }

        if(pinStatus.leftDiagonal) {
            let i = 0;
            while(i < captures.length) {
                if(captures[i][0] === ar && captures[i][1] === ac)i++;
                else {
                    captures.splice(i, 1);
                }
            }
            return (demandMoves === false)?captures.map(([r, c]) => squares[r][c]):[];
        }

        if(pinStatus.rightDiagonal) {
            let i = 0;
            while(i < captures.length) {
                if(captures[i][0] === ar && captures[i][1] === ac)i++;
                else {
                    captures.splice(i, 1);
                }
            }
            return (demandMoves === false)?captures.map(([r, c]) => squares[r][c]):[];
        }
    }

    return (demandMoves)?moves.map(([r, c]) => squares[r][c]):captures.map(([r, c]) => squares[r][c]);
}

export default checkpawnMoves;