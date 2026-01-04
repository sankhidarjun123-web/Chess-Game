import checkForChecks from "./Check.js";
import { checkSquare } from "../MovementAndCapture/King.js";
import checkKingMoves from "../MovementAndCapture/King.js";


const vaildMoves = function (initialBoard, demandMoves, checkStatus, currentSelectedCor, allCapturesIndex, allMovesIndex) {

    if (!checkStatus.isCheck) return demandMoves ? allMovesIndex : allCapturesIndex;;

    // Problem here
    const squareBetween = checkStatus.squaresBetweenCalc;
    let checkedMoves = new Set();
    if (squareBetween.length) checkedMoves = returnMoves(squareBetween);

    const avaliableMoves = [];
    const availableCaptures = [];


    // Problem in king moves here -->
    if (currentSelectedCor[0] === checkStatus.checkedKingCor[0] && currentSelectedCor[1] === checkStatus.checkedKingCor[1]) {
        for (let x of allMovesIndex) {
            if (areArraysEqual(x, checkStatus.fallBack)) continue;
            avaliableMoves.push(x);
        }

        for (let x of allCapturesIndex) {
            if (areArraysEqual(x, checkStatus.fallBack)) continue;
            availableCaptures.push(x);
        }

        return (demandMoves) ? avaliableMoves : availableCaptures;
    }  // Here

    if (checkStatus.checkingPiece.length > 1) return (demandMoves) ? avaliableMoves : availableCaptures;

    for (let x of allCapturesIndex) {

        if (x[0] === checkStatus.enemyPieceCoordinates[0] && x[1] === checkStatus.enemyPieceCoordinates[1]) {
            availableCaptures.push(x);
        }
    }

    // Lots of problems here!!!
    if (squareBetween.length) {
        for (let x of allMovesIndex) {
            if (checkedMoves.has(`${x[0]},${x[1]}`)) {
                avaliableMoves.push(x);
            }

        }
    }

    return (demandMoves) ? avaliableMoves : availableCaptures;

}


function returnMoves(squareBetween) {
    const ans = new Set();

    let [x1, y1] = squareBetween[0];
    const [x2, y2] = squareBetween[1];

    // Determine step direction for x and y
    const dx = x1 === x2 ? 0 : x1 < x2 ? 1 : -1;
    const dy = y1 === y2 ? 0 : y1 < y2 ? 1 : -1;

    // Walk from start to end (inclusive)
    while (true) {
        ans.add(`${x1},${y1}`);

        if (x1 === x2 && y1 === y2) break;

        x1 += dx;
        y1 += dy;
    }

    return ans;
}

function areArraysEqual(arr1, arr2) {

    if (arr1 == null || arr2 == null) return false;
    for (let i = 0; i < arr2.length; i++) {
        if (arr1 === arr2[i]) return true;
        if (arr1.length !== arr2[i].length) continue;

        let isEqual = true;
        for (let j = 0; j < arr1.length; j++) {
            if (arr1[j] !== arr2[i][j]) {
                isEqual = false;
                break;
            }
        }
        if (isEqual) return true;
    }

    return false;
}

function areArraysEqual2(array1, array2) {
  // 1. Check if the lengths are the same
  if (array1.length !== array2.length) {
    return false;
  }

  // 2. Iterate through both arrays and compare elements
  for (let i = 0; i < array1.length; i++) {
    // Check for nested arrays or objects (deep comparison)
    if (Array.isArray(array1[i]) && Array.isArray(array2[i])) {
      if (!areArraysEqual(array1[i], array2[i])) {
        return false; // Recursive call for nested arrays
      }
    } else if (array1[i] !== array2[i]) {
      // Check primitive values for strict inequality
      return false;
    }
  }

  // 3. If all checks pass, the arrays are equal
  return true;
}

export default vaildMoves;