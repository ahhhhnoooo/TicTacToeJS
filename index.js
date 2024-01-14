class HTMLRenderer {
    onClickSpace = (index, element) => {
        element.innerText = this.game.turn;
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
        this.game = TicTacToeGame.init();
        let gameElement = document.getElementById("game");
        let gameRowElement;
        for (let index = 0; index < 9; ++index) {
            if (index % 3 === 0) {
                gameRowElement = document.createElement("div");
                gameRowElement.className = "row";
                gameElement?.appendChild(gameRowElement);
            }
            let gameCellElement = document.createElement("div");
            gameCellElement.className = "cell";
            gameRowElement.appendChild(gameCellElement);
            gameCellElement.onclick = (() => this.onClickSpace(index, gameCellElement));
        }
    }
}

let renderer = new HTMLRenderer();
renderer.init(game);