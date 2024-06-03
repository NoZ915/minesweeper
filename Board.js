class Board {
    constructor(width, numberOfMines) {
        this.width = width;
        this.numberOfMines = numberOfMines;
        this.mine = "🉐";
        this.flag = "🚩";
        this.cover = "🔲";
        this.uncover = "🔳";
        this.board = this.generateBoard();
        this.isGameOver = false;
    }

    generateBoard() {
        let board = [];
        for (let i = 0; i < this.width; i++) {
            board[i] = [];
            for (let j = 0; j < this.width; j++) {
                const cell = {
                    element: this.cover,
                    mine: false
                }
                board[i][j] = cell;
            }
        }
        return board;
    }

    printBoard() {
        this.board.forEach(row => {
            const element = row.map(r => Object.values(r)[0])
            console.log(element.join(""));
        });
    }

    placeMines(firstRow, firstCol) {
        for (let i = 0; i < this.numberOfMines; i++) {
            let col = Math.floor(Math.random() * this.width);
            let row = Math.floor(Math.random() * this.width);
            if ((!this.board[row][col].mine) && (!(row === firstRow - 1 && col === firstCol - 1))) {
                this.board[row][col].mine = true;
                //作弊模式：暫時用來觀看用
                this.board[row][col].element = this.mine;
            } else {
                i--;
            }
        }
    }

    revealCell(row, col) {
        row = row - 1;
        col = col - 1;

        if (row < 0 || row >= this.width || col < 0 || col >= this.width || this.board[row][col].element === this.uncover) return;

        if (this.board[row][col].mine === false) {
            if (this.countNearbyMines(row, col) === 0) {
                this.uncoverNearbyCell(row, col);
            } else {
                this.board[row][col].element = ` ${this.countNearbyMines(row, col)}`;
            }
        } else {
            console.log("💥 Boooom!");
            this.isGameOver = true;
        }
    }

    countNearbyMines(row, col) {
        let numberOfNearbyMines = 0;
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
            for (let colOffset = -1; colOffset <= 1; colOffset++) {
                //檢查附近8格有沒有地雷
                if (this.board[row + rowOffset]?.[col + colOffset]?.mine) {
                    numberOfNearbyMines++;
                }
            }
        }
        return numberOfNearbyMines;
    }

    uncoverNearbyCell(row, col) {
        this.board[row][col].element = this.uncover;
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
            for (let colOffset = -1; colOffset <= 1; colOffset++) {
                let newRow = row + rowOffset;
                let newCol = col + colOffset;
                if (this.board[newRow]?.[newCol]?.mine) continue;
                if (this.board[newRow]?.[newCol]?.element !== this.cover) continue;

                else {
                    this.revealCell(newRow + 1, newCol + 1)
                }
            }
        }
    }

    checkWinTheGame() {

    }
}

export default Board;