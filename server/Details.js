let gameDetails = {

    board: [
        ['bra', 'bn', 'bB', 'bq', 'bk', 'bB', 'bn', 'brh'],
        ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
        ['wra', 'wn', 'wB', 'wq', 'wk', 'wB', 'wn', 'wrh']
    ],

    move: {
        from: "",
        to: "",
    },

    movedPiece: "",

    capturedPiece: "",

    whiteKingPosition: [7, 4],

    blackKingPosition: [0, 4],

    checkStatus: {
        isCheck: false,
        checkedKing: null,
        checkedKingCor: [],
        checkingPiece: [],
        checkDirection: [],
        squaresBetweenCalc: [],
        enemyPieceCoordinates: [],
        fallBack: []
    },

    castleStatus: {
        WkingMoved: false,
        WAcastleMoved: false,
        WHcastleMoved: false,
        BAcastleMoved: false,
        BHcastleMoved: false,
        BkingMoved: false
    },

    currentTurn: "w",
};

module.exports = gameDetails
