import { TicTacToeGame } from "./tictactoe-game";

class HTMLRenderer {
    game = {
        board: [],
        winner: '',
        turn: 'x'
    }

    onClickSpace = (index) => {
        this.game = TicTacToeGame.onClick(this.game, index); 
        if(this.game.winner){
            let gameElement = document.getElementById("game");
            let gameEndElement = document.createElement("div");
            gameEndElement.className = "end";
            gameEndElement.innerText = this.game.winner + " WINS";
            gameElement.appendChild(gameEndElement);
        }
    }

    init = () => {
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

let renderer = new HTMLRenderer();
renderer.init(game);