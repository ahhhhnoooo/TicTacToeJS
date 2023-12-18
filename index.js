import { TicTacToeGame } from "./tictactoe-game";

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

let game = new TicTacToeGame();
game.init();
let renderer = new HTMLRenderer();
renderer.init(game);