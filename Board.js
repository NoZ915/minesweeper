class Board{
    constructor(width, numberOfMines){
        this.width = width;
        this.numberOfMines = numberOfMines;
        this.mine = "🉐";
        this.flag = "🚩";
        this.cover = "🔲";
        this.uncover = "🔳";
        this.board = this.generateBoard();
    }

    generateBoard(){
        let board = [];

        for(let i = 0; i < this.width; i++){
            board[i] = [];
            for(let j = 0; j < this.width; j++){
                const cell = {
                    element: this.cover,
                    mine: false
                }
                board[i][j] = cell;
            }
        }
        return board;
    }

    printBoard(){
        this.board.forEach(row => {
            const element = row.map(r => Object.values(r)[0])
            console.log(element.join(""));
        });
    }

    placeMines(){
        for(let i = 0; i < this.numberOfMines; i++){
            let col = Math.floor(Math.random() * this.width);
            let row = Math.floor(Math.random() * this.width);
            if(this.board[row][col].element === this.cover){
                this.board[row][col].mile = true;
                this.board[row][col].element = this.mine; //暫時用來觀看用
            }else{
                i--;
            }
        }
    }

    revealCell(row, col){
        row = row - 1;
        col = col -1;
        if(this.board[row][col].mine === false){
            this.board[row][col].element = this.uncover;
        }else{
            this.board[row][col].element = this.mine;
        }
    }
}

export default Board;