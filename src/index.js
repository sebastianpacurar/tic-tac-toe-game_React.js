import React from "react";
import ReactDOM from "react-dom";
import "./style.css";


// The Reset Button Component
const ResetButton = props => {
    return (
        <button onClick={props.clickReset}>
            Reset Game
        </button>
    )
}


// The Square component
const Square = props => {
    const {className, value, clickSquare, disabled} = props;

    return (
        <button className={className} onClick={clickSquare} disabled={disabled}>
            {value}
        </button>
    );
}


// The Board component
class Board extends React.Component {
    constructor(props) {
        super(props);

        // 2 props: one for square, one to check if X or 0 is next
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }

    // the function to render the squares
    drawSquare(index) {
        return (
            <Square
                className={"square"}
                value={this.state.squares[index]}
                clickSquare={() => this.markSquare(index)}
                disabled={this.state.squares[index] !== null}
            />
        );
    }

    // resets the entire array to null, X will be the first to go again
    resetGame = () => {
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true
        })
    };

    // mark the square with X or O
    markSquare = index => {

        // if there calculateWinner returns false continue to mark squares
        if (!calculateWinner(this.state.squares)) {

            // slice the array
            const squares = this.state.squares.slice();
            squares[index] = this.state.xIsNext ? "X" : "0";

            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext,
            })
        }
    };


    render() {

        // the winner is evaluated based on three items of the same kind in a row
        const winner = calculateWinner(this.state.squares);

        let status = "";

        // if winner returns true
        if (winner) {
            status = `Winner: ${winner}`;
        }

        // if there is a draw it means nobody won
        else if (!winner && !checkNullSquares(this.state.squares)) {
            status = "Draw"
        }

        // next player will be set upon the boolean value of xIsNext state
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div>
                    {this.drawSquare(0)}
                    {this.drawSquare(1)}
                    {this.drawSquare(2)}
                </div>
                <div>
                    {this.drawSquare(3)}
                    {this.drawSquare(4)}
                    {this.drawSquare(5)}
                </div>
                <div>
                    {this.drawSquare(6)}
                    {this.drawSquare(7)}
                    {this.drawSquare(8)}
                </div>
                <ResetButton
                    clickReset={() => this.resetGame()}
                />
            </div>
        );
    }
}

// The game Component
const Game = () => {
    return (
        <div className="game">
            <div className="game-board">
                <Board/>
            </div>
        </div>
    );
}


// the function used to check if there are any null squares (used for declaring draw game)
function checkNullSquares(squares) {
    for (let i = 0; i < squares.length; i++) {

        // if there is at least one null value in the square array, return true
        if (squares[i] === null) {
            return true;
        }
    }
}

function calculateWinner(squares) {

    // these are the actual lines which can match a win on horizontal, vertical or diagonal
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // there are 8 lines, 3 vertically, 3 horizontally and 3 diagonally
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        // if there are 3 of the same kind horizontally or vertically or diagonally declare winner
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

            // return the value which is on 3 spaces consecutively (X or 0)
            return squares[a];
        }
    }
}


ReactDOM.render(<Game/>, document.getElementById('root'));



