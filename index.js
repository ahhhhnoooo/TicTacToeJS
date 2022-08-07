class Game {

    board;
    winner;
    turn;

    init = () => {
        this.board = [];
        this.winner = '';
        this.turn = 'x';
    }

    onClick = (index) => {
        if(this.winner) return;
        this.board[index] = this.turn;

        if (this.checkWinner()) {
            this.winner = this.turn;
        }
        else {
            this.nextTurn();
        }
    }

    //Manually checking for the winner
    checkWinner = () => {
        if (
            (this.turn === this.board[0] && this.turn === this.board[1] && this.turn === this.board[2]) ||
            (this.turn === this.board[3] && this.turn === this.board[4] && this.turn === this.board[5]) ||
            (this.turn === this.board[6] && this.turn === this.board[7] && this.turn === this.board[8]) ||
            (this.turn === this.board[0] && this.turn === this.board[3] && this.turn === this.board[6]) ||
            (this.turn === this.board[1] && this.turn === this.board[4] && this.turn === this.board[7]) ||
            (this.turn === this.board[2] && this.turn === this.board[5] && this.turn === this.board[8]) ||
            (this.turn === this.board[0] && this.turn === this.board[4] && this.turn === this.board[8]) ||
            (this.turn === this.board[2] && this.turn === this.board[4] && this.turn === this.board[6])) {
            console.log(this.turn, "WINS")
                return true;
        } else { return false; }

    }

    //Change to the other player's turn
    nextTurn = () => {
        this.turn = (this.turn === 'x') ? 'o' : 'x';
    }
}

class HTMLRenderer {

    game;
    spaces;

    onClickSpace = (index) => {
        this.spaces[index].innerText = this.game.turn;
        this.game.onClick(index); 
        if(this.game.winner){
            let gameElement = document.getElementById("game");
            let gameEndElement = document.createElement("div");
            gameEndElement.className = "end";
            gameEndElement.innerText = this.game.winner + " WINS";
            gameElement.appendChild(gameEndElement);
        }
    }

    init = (gameObj) => {
        this.spaces = [];
        this.game = gameObj;
        let gameElement = document.getElementById("game");
        let gameRowElement, gameCellElement;
        for (let index = 0; index < 9; ++index) {
            if (index % 3 === 0) {
                gameRowElement = document.createElement("div");
                gameRowElement.className = "row";
                gameElement?.appendChild(gameRowElement);
            }
            gameCellElement = document.createElement("div");
            gameCellElement.className = "cell";
            gameRowElement.appendChild(gameCellElement);
            this.spaces.push(gameCellElement)
            gameCellElement.onclick = (() => this.onClickSpace(index));
        }

    }
}

let game = new Game();
game.init();
let renderer = new HTMLRenderer();
renderer.init(game);