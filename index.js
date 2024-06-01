import readline from "node:readline";
import Board from "./Board.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function boardFromUser() {
    rl.question("Input one number for board's width: ", (width) => {
        rl.question("Input number for number of mines: ", (numberOfMines) => {
            if (numberOfMines < (width * width)) {
                const board = new Board(width, numberOfMines);
                board.printBoard();
                CoordinateFromUser(board);
                board.placeMines();
            } else {
                rl.question("❌ Number of mines can't bigger than the width squared！", () => {
                    boardFromUser();
                })
            }
        })
    })
}

function CoordinateFromUser(board){
    rl.question("Input the coordinates, with row and column separated by a space: ", (coordinates) => {
        let row = coordinates.split(" ")[0];
        let col = coordinates.split(" ")[1];
        board.revealCell(row, col);
        board.printBoard();
    })
}

boardFromUser();