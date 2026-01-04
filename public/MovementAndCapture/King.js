// =====================
//  KING MOVES
// =====================

import { castleStatus } from "../script.js";
import checkForChecks from "../Checks&CheckMate/Check.js";

function checkKingMoves(row, col, initialBoard, demandMoves) {
    let moves = [], captures = [];
    const piece = initialBoard[row][col];

    const possibleMoves = [
        [1, 0], [0, 1], [-1, 0], [0, -1],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];

    const castleMoves = [
        [0, 2], [0, -2]
    ];

    const checkStatus = checkForChecks(piece, row, col, initialBoard);

    if(piece.includes('w')) {
        if(!castleStatus.WkingMoved && !castleStatus.WAcastleMoved 
            && castlingAllowed(initialBoard, piece, -2) && !checkStatus.isCheck) {
            possibleMoves.push([0, -2]);
        }

        if(!castleStatus.WkingMoved && !castleStatus.WHcastleMoved 
            && castlingAllowed(initialBoard, piece, 2) && !checkStatus.isCheck) {
            possibleMoves.push([0, 2]);
        }
    }

    if(piece.includes('b')) {
        if(!castleStatus.BkingMoved && !castleStatus.BAcastleMoved 
            && castlingAllowed(initialBoard, piece, -2) && !checkStatus.isCheck) {
            possibleMoves.push([0, -2]);
        }

        if(!castleStatus.BkingMoved && !castleStatus.BHcastleMoved 
            && castlingAllowed(initialBoard, piece, 2) && !checkStatus.isCheck) {
            possibleMoves.push([0, 2]);
        }
    }

    // This line do something after it okkie
    console.log(checkForChecks(piece, row, col, initialBoard));
 
    for(let x of possibleMoves) {

        let r, c;
        r = row + x[0];
        c = col + x[1];

        if((r < 0 || r > 7) || (c < 0 || c > 7)) continue;

        const p = initialBoard[r][c];

        if(!checkSquare(piece, r, c, initialBoard)) continue;

        if(p !== '0' && p.includes(piece.includes('w') ? 'b' : 'w')){
            captures.push([r, c]);
            continue;
        }
        if(p !== '0' && p.includes(piece.includes('w') ? 'w' : 'b')) {
            continue;
        }

        if(p === '0') moves.push([r, c]);
    }

    return (demandMoves)?moves:captures;
}


export function checkSquare(piece, r, c, initialBoard) {

    // Pawn check logic
    if(piece.includes("w")) {

        if(r-1 >= 0 && c-1 >= 0) {
            const pawnCheck = initialBoard[r-1][c-1];
            if(pawnCheck !== '0' && pawnCheck === "bp") return false;
        }

        if(r-1 >= 0 && c+1 < 8) {
            const pawnCheck = initialBoard[r-1][c+1];
            if(pawnCheck !== '0' && pawnCheck === "bp") return false;
        }
    }

    if(piece.includes("b")) {

        if(r+1 < 8 && c-1 >= 0) {
            const pawnCheck = initialBoard[r+1][c-1];
            if(pawnCheck !== '0' && pawnCheck === "wp") return false;
        }

        if(r+1 < 8 && c+1 < 8) {
            const pawnCheck = initialBoard[r+1][c+1];
            if(pawnCheck !== '0' && pawnCheck === "wp") return false;
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

        const pr = initialBoard[rif][c];

        if(pr !== '0') {

            if(pr.includes(piece.includes('w') ? 'bq' : 'wq') || 
               pr.includes(piece.includes('w') ? 'br' : 'wr')) return false;

            else break;
        }

        rif++;
    }

    // Checking for rooks and queens on top side
    while(rir >= 0) {

        const pr = initialBoard[rir][c];

        if(pr !== '0') {

            if(pr.includes(piece.includes('w') ? 'bq' : 'wq') || 
               pr.includes(piece.includes('w') ? 'br' : 'wr')) return false;

            else break;
        }

        rir--;
    }

    // Checking for rooks and queens on right side
    while(cif < 8) {

        const pr = initialBoard[r][cif];

        if(pr !== '0') {

            if(pr.includes(piece.includes('w') ? 'bq' : 'wq') || 
               pr.includes(piece.includes('w') ? 'br' : 'wr')) return false;

            else break;
        }

        cif++;
    }

    // Checking for rooks and queens on left side
    while(cir >= 0) {

        const pr = initialBoard[r][cir];

        if(pr !== '0') {

            if(pr.includes(piece.includes('w') ? 'bq' : 'wq') || 
               pr.includes(piece.includes('w') ? 'br' : 'wr')) return false;

            else break;
        }

        cir--;
    }

    // Checking for bishops and queens on diagonals
    for(let rir = r-1, cir = c-1; rir >= 0 && cir >= 0; rir--, cir--) {

        const pr = initialBoard[rir][cir];

        if(pr !== '0') {

            if(pr.includes(piece.includes('w') ? 'bq' : 'wq') || 
               pr.includes(piece.includes('w') ? 'bB' : 'wB')) return false;

            else break;
        }
    }

    for(let rir = r-1, cif = c+1; rir >= 0 && cif < 8; rir--, cif++) {

        const pr = initialBoard[rir][cif];

        if(pr !== '0') {

            if(pr.includes(piece.includes('w') ? 'bq' : 'wq') || 
               pr.includes(piece.includes('w') ? 'bB' : 'wB')) return false;

            else break;
        }
    }

    for(let rif = r+1, cif = c+1; rif < 8 && cif < 8; rif++, cif++) {

        const pr = initialBoard[rif][cif];

        if(pr !== '0') {

            if(pr.includes(piece.includes('w') ? 'bq' : 'wq') || 
               pr.includes(piece.includes('w') ? 'bB' : 'wB')) return false;

            else break;
        }
    }

    for(let rif = r+1, cir = c-1; rif < 8 && cir >= 0; rif++, cir--) {

        const pr = initialBoard[rif][cir];

        if(pr !== '0') {

            if(pr.includes(piece.includes('w') ? 'bq' : 'wq') || 
               pr.includes(piece.includes('w') ? 'bB' : 'wB')) return false;

            else break;
        }
    }

    // Knight check logic
    for(const x of knightCheck) {

        const rr = r + x[0];
        const cc = c + x[1];

        if(rr >= 0 && rr < 8 && cc >= 0 && cc < 8) {
            const p = initialBoard[rr][cc];
            if(p !== '0' && p.includes(piece.includes('w') ? 'bn' : 'wn')) return false;
        }
    }

    // King check logic
    for(const x of kingCheck) {

        const rr = r + x[0];
        const cc = c + x[1];

        if(rr >= 0 && rr < 8 && cc >= 0 && cc < 8) {
            const p = initialBoard[rr][cc];
            if(p !== '0' && p.includes(piece.includes('w') ? 'bk' : 'wk')) return false;
        }
    }

    return true;
}

const castlingAllowed = function(initialBoard, piece, direction) {

    if(direction === 2 && piece.includes('b')) {

        for(let i = 1; i <= direction; i++) {

            const pt = initialBoard[0][4+i];
            if(pt !== '0' || !checkSquare(piece, 0, 4+i, initialBoard)) return false;
        }
    }

    if(direction === 2 && piece.includes('w')) {

        for(let i = 1; i <= direction; i++) {

            const pt = initialBoard[7][4+i];
            if(pt !== '0' || !checkSquare(piece, 7, 4+i, initialBoard)) return false;
        }
    }

    if(direction === -2 && piece.includes('b')) {

        for(let i = 1; i <= Math.abs(direction); i++) {

            const pt = initialBoard[0][4-i];
            if(!checkSquare(piece, 0, 4-i, initialBoard)) return false;
        }

        for(let i = 1; i <= Math.abs(direction-1); i++) {

            const pt = initialBoard[0][4-i];
            if(pt !== '0') return false;
        }
    }

    if(direction === -2 && piece.includes('w')) {

        for(let i = 1; i <= Math.abs(direction); i++) {

            const pt = initialBoard[7][4-i];
            if(!checkSquare(piece, 7, 4-i, initialBoard)) return false;
        }

        for(let i = 1; i <= Math.abs(direction-1); i++) {

            const pt = initialBoard[7][4-i];
            if(pt !== '0') return false;
        }
    }
    return true;
}

export default checkKingMoves;
