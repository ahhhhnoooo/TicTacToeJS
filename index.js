const SPACE_WIDTH = 200;
const SPACE_HEIGHT = 200;
const NUM_COLS = 3;
const NUM_ROWS = 3;
const NUM_SPACES = 9;

class HTMLRenderer {
    //Just display a text character
    updateCell = (element, turn) => {
        let textElement = document.createElement("p");
        textElement.innerText = turn;
        element.appendChild(textElement);
    }
    //Create an overlay that announces the winner
    drawWinner = (winner) => {
        let gameElement = document.getElementById("game");
        let gameEndElement = document.createElement("div");
        gameEndElement.className = "end";
        let gameEndTextElement = document.createElement("p");
        gameEndTextElement.innerText = winner + " WINS";
        gameEndElement.appendChild(gameEndTextElement);
        gameElement.appendChild(gameEndElement);
    }
    //Update the cell display, run game logic, and check winner
    onClickSpace = (index, element) => {
        //If winner is decided, do nothing
        if (this.game.winner) return;
        //If space is already taken, do nothing
        if (this.game.board[index]) return;
        let turn = this.game.turn;
        this.game = TicTacToeGame.onClick(this.game, index);
        this.updateCell(element, turn);
        if (this.game.winner) {
            this.drawWinner(this.game.winner);
        }
    }
    init = () => {
        this.game = TicTacToeGame.init();
        let gameBoardElement = document.createElement("div");
        gameBoardElement.className = 'board';
        let gameRowElement;
        // Create 9 spaces in columns of 3
        for (let index = 0; index < NUM_SPACES; ++index) {
            if (index % NUM_COLS === 0) {
                gameRowElement = document.createElement("div");
                gameRowElement.className = "row";
                gameBoardElement.appendChild(gameRowElement);
            }
            let gameCellElement = document.createElement("div");
            gameCellElement.className = "cell";
            gameRowElement.appendChild(gameCellElement);
            // Attach click handler for each space
            gameCellElement.onclick = (() => this.onClickSpace(index, gameCellElement));
        }
        let gameElement = document.getElementById("game");
        gameElement.appendChild(gameBoardElement);
    }
}

class CanvasRenderer {
    clearCanvas = (ctx) => {
        //Clear the whole canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    drawWinner = (ctx, game) => {
        //Don't clear the canvas, just draw over the last move
        ctx.save();
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeStyle = "black";
        ctx.strokeText(game.winner + " WINS", SPACE_WIDTH / 2, SPACE_HEIGHT / 2);
        ctx.restore();
    }
    drawX = (ctx) => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(0, 0);
        ctx.lineTo(SPACE_WIDTH, SPACE_HEIGHT);
        ctx.moveTo(0, SPACE_HEIGHT);
        ctx.lineTo(SPACE_WIDTH, 0);
        ctx.stroke();
        ctx.restore();
    }
    drawO = (ctx) => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.arc(SPACE_WIDTH / 2, SPACE_HEIGHT / 2, SPACE_WIDTH / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }
    drawSpace = (ctx, x, y, value) => {
        if (!ctx) return;
        ctx.save();
        ctx.translate(x, y);
        //Draw borders
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, SPACE_WIDTH, SPACE_HEIGHT);
        //Draw value
        if (value === 'x') {
            this.drawX(ctx);
        } else if (value === 'o') {
            this.drawO(ctx);
        }
        ctx.restore();
    }
    drawBoard = (ctx, game) => {
        this.clearCanvas(ctx);
        // Create 9 spaces in columns of 3
        for (let index = 0; index < NUM_SPACES; ++index) {
            let x = Math.floor(index % NUM_COLS) * SPACE_WIDTH;
            let y = Math.floor(index / NUM_COLS) * SPACE_HEIGHT;
            let value = game.board[index];
            this.drawSpace(ctx, x, y, value);
        }
    }
    onClick = (x, y) => {
        //If winner is decided, do nothing
        if (this.game.winner) return;
        //Check which space was clicked
        let colClicked = Math.floor(x / SPACE_HEIGHT);
        let rowClicked = Math.floor(y / SPACE_WIDTH);
        let index = colClicked + (rowClicked * NUM_COLS);
        //If space is already taken, do nothing
        if (this.game.board[index]) return;
        //Handle the click, updating the game state
        this.game = TicTacToeGame.onClick(this.game, index);
        //Redraw the whole board
        this.drawBoard(this.ctx, this.game);
        if (this.game.winner) {
            this.drawWinner(this.ctx, this.game);
        }
    }
    init = () => {
        this.game = TicTacToeGame.init();
        let gameElement = document.getElementById("game");
        let gameCanvas = document.createElement("canvas");
        this.ctx = gameCanvas.getContext("2d");
        gameCanvas.width = SPACE_WIDTH * NUM_COLS;
        gameCanvas.height = SPACE_HEIGHT * NUM_ROWS;
        gameCanvas.onclick = (event) => { this.onClick(event.x, event.y) };
        gameElement.appendChild(gameCanvas);

        //Draw the initial empty board
        this.drawBoard(this.ctx, this.game);
    }
}

//let renderer = new HTMLRenderer();
let renderer = new CanvasRenderer();
renderer.init(game);