export class TicTacToeGame {

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

        this.winner = this.checkWinner(this.board, this.turn);
        if (this.winner === '') {
            this.turn = this.nextTurn(this.turn);
        }
    }

    //Manually checking for the winner
    checkWinner = (board, turn) => {
        if (
            (turn === board[0] && turn === board[1] && turn === board[2]) ||
            (turn === board[3] && turn === board[4] && turn === board[5]) ||
            (turn === board[6] && turn === board[7] && turn === board[8]) ||
            (turn === board[0] && turn === board[3] && turn === board[6]) ||
            (turn === board[1] && turn === board[4] && turn === board[7]) ||
            (turn === board[2] && turn === board[5] && turn === board[8]) ||
            (turn === board[0] && turn === board[4] && turn === board[8]) ||
            (turn === board[2] && turn === board[4] && turn === board[6])) {
            console.log(turn, " WINS");
            return true;
        } else {
            return false;
        }
    }

    //Change to the other player's turn
    nextTurn = (turn) => {
        turn = (turn === 'x') ? 'o' : 'x';
    }
}