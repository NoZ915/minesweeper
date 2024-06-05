class Board {
    constructor(width, numberOfMines) {
        this.width = width;
        this.numberOfMines = numberOfMines;

        this.mine = "💥";
        this.skull = "💀"
        this.flag = "🚩";
        this.cover = "🔲";
        this.uncover = "🔳";
        
        this.isGameOver = false;
        this.board = this.generateBoard();
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
                //作弊模式：偷看看地雷在哪
                // this.board[row][col].element = this.mine;
                console.log(`${row+1}, ${col+1}`);
            } else {
                i--;
            }
        }
    }

    revealCell(row, col) {
        row = row - 1;
        col = col - 1;

        if (row < 0 || row >= this.width || col < 0 || col >= this.width || this.board[row][col].element === this.uncover) return;


        if(this.board[row][col].element === this.flag){
            console.log("\n 🈵 Please remove the flag first! \n")
        }else if (this.board[row][col].mine === false) {
            if (this.countNearbyMines(row, col) === 0) {
                this.uncoverNearbyCell(row, col);
                this.checkWinTheGame();
            } else {
                this.board[row][col].element = ` ${this.countNearbyMines(row, col)}`;
                this.checkWinTheGame();
            }
        } else {
            this.board[row][col].element = this.skull;
            this.isGameOver = true;
            this.revealAllMines();
            console.log("\n 💥 Boooom! \n ");
        }
        
    }

    placeFlag(selectedRow, selectedCol) {
        selectedRow = selectedRow - 1;
        selectedCol = selectedCol - 1;

        if(this.board[selectedRow][selectedCol].element === this.uncover){
            console.log("\n ❌ Can't place the flag here! \n ");
        }else if(this.board[selectedRow][selectedCol].element === this.cover){
            this.board[selectedRow][selectedCol].element = this.flag;
        }else if(this.board[selectedRow][selectedCol].element === this.flag){
            this.board[selectedRow][selectedCol].element = this.cover;
        }
    }

    revealAllMines(){
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.board[i][j].mine) {
                    if(this.board[i][j].element !== this.flag && this.board[i][j].element !== this.skull){
                        this.board[i][j].element = this.mine;
                    }
                }
            }
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
        let numberOfUncover = 0;

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.width; j++) {
                if (!this.board[i][j].mine && this.board[i][j].element !== this.cover && this.board[i][j].element !== this.flag) {
                    numberOfUncover++;
                }
            }
        }
        if ((Number(numberOfUncover) + Number(this.numberOfMines)) === (this.width * this.width)) {
            console.log("\n 👑 You Win !!!!! \n");
            this.isGameOver = true;
        } else return;
    }
}

export default Board;