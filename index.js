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
                coordinateFromUser(board, width, (row, col) => {
                    board.placeMines(row, col);
                    board.revealCell(row, col);
                    board.printBoard();
                    gameLoop(board, width);
                });
            } else {
                rl.question("❌ Number of width or mines aren't invalid！", () => {
                    boardFromUser();
                })
            }
        })
    })
}

function coordinateFromUser(board, width, placeMinesCb) {
    rl.question("Input the coordinates, with row and column separated by a space: ", (coordinates) => {
        let row = coordinates.split(" ")[0];
        let col = coordinates.split(" ")[1];
        if ((Number(row) <= Number(width)) && (Number(row) > 0) && (Number(col) <= Number(width)) && (Number(col) > 0)) {
            if (placeMinesCb) placeMinesCb(row, col);
        } else {
            rl.question("❌ Number of row or column is invalid！", () => {
                coordinateFromUser(board, width)
            })
        }
    })
}

function gameLoop(board, width) {
    if (!board.isGameOver) {
        rl.question("Input the coordinates, with row and column separated by a space, \n  or add 'f ' before the coordinates to flag a cell: ", (coordinates) => {
            let input = coordinates.split(" ");
            if (input[0] === "f") {
                let row = coordinates.split(" ")[1];
                let col = coordinates.split(" ")[2];
                board.placeFlag(row, col);
                board.printBoard();
                gameLoop(board, width);
            } else if (input[0] !== "f") {
                let row = coordinates.split(" ")[0];
                let col = coordinates.split(" ")[1];
                if ((Number(row) <= Number(width)) && (Number(row) > 0) && (Number(col) <= Number(width)) && (Number(col) > 0)) {
                    if (!board.isGameOver) {
                        board.revealCell(row, col);
                        board.printBoard();
                        gameLoop(board, width);
                    } else {
                        rl.close();
                    }
                }
            } else {
                rl.question("❌ Number of row or column is invalid！", () => {
                    gameLoop(board, width);
                })
            }
        })
    } else {
        rl.close();
    }
}

boardFromUser();