import checkPin from "../Rules/Pin.js";

// =====================
//  PAWN MOVES
// =====================

function checkpawnMoves(row, col, initialboard, demandMoves) {

    row = Number(row);
    col = Number(col);

    let moves = [], captures = [];
    const piece = initialboard[row][col];

    const pinStatus = checkPin(piece, row, col, initialboard);   // Object to determine the pin on the piece


    // Fixed finally I hate this part!!!!!
    let ar = 0, ac = 0; 
    if(pinStatus.pawnDiagonal) { 
        ar = row+pinStatus.pawnDiagonal[0]; 
        ac = col+pinStatus.pawnDiagonal[1]; 
    }


    const posMoves = [[1, 0]];

    if(row === 1 || row === 6) {
        posMoves.push([2, 0]);
    }

    const posCaptures = [[1, 1], [1, -1]];

    // Selecting all the squares without enemy
    for(let x of posMoves) {
        
        let r,c;
        if (piece === "wp") {
            r = row - x[0];
            c = col;
        } else if (piece === "bp") {
            r = row + x[0];
            c = col;
        }

        if (r < 0 || r > 7) continue;

        if (x[0] === 2) {
            let midR = piece === "wp" ? row - 1 : row + 1;
            let midSquare = initialboard[midR][c];
            if (midSquare !== '0') continue;
        }

        const p = initialboard[r][c];

        if (p === '0') moves.push([r, c]);
    }

    // Selecting all the squares with enemy
    for(let x of posCaptures) {

        let r,c;

        if(piece === "wp") {
            r = row-x[0];
            c = col+x[1];
        } else if(piece === "bp") {
            r = row+x[0];
            c = col+x[1];
        }

        if ((r < 0 || r > 7) || (c < 0 || c > 7)) continue;
        let enemyPiece = initialboard[r][c];

        if (enemyPiece && enemyPiece.includes(piece.includes('w') ? 'b' : 'w')) {
            captures.push([r, c]);
        }

    }

    // Pin Logic for pawn
    if(pinStatus.isPin) {
        if(pinStatus.vertical) {
            return (demandMoves)?moves:[];
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
            return (demandMoves === false)?captures:[];
        }

        if(pinStatus.rightDiagonal) {
            let i = 0;
            while(i < captures.length) {
                if(captures[i][0] === ar && captures[i][1] === ac)i++;
                else {
                    captures.splice(i, 1);
                }
            }
            return (demandMoves === false)?captures:[];
        }
    }

    // if(!ind) { 
    //     return (demandMoves)?moves.map(([r, c]) => squares[r][c]):captures.map(([r, c]) => squares[r][c]);
    // }
    return (demandMoves)?moves:captures;
}

export default checkpawnMoves;