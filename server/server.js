const express = require("express");
const path = require("path");
let gameDetails = require("./Details");
const giveValidMoves = require("./MoveValidator");
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));


app.get("/gameDetails", (req, res) => {
    return res.json(gameDetails);
});

app.patch("/gameDetails", (req, res) => {
    const updates = req.body;

    if (!updates || !updates.board) {
        return res.status(400).json({ error: "Invalid game data" });
    }

    Object.assign(gameDetails, updates);

    res.json(gameDetails);
});

app.post("/moves", (req, res) => {
    const { selectedSquare, piece, board } = req.body;

    if (!selectedSquare || !piece || !board) {
        return res.status(400).json({ error: "Invalid request" });
    }

    const details = giveValidMoves(selectedSquare, piece, board, gameDetails.castleStatus,
         gameDetails.whiteKingPosition, gameDetails.blackKingPosition, gameDetails.currentTurn);

    res.json(details);
});

module.exports = app;