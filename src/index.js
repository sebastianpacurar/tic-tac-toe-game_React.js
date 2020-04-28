import React, {useState} from "react";
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
const Board = () => {

    // the getter and the setter. setter will be used to update the getter
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true);


    // mark the square with X or O
    const markSquare = index => {

        // if there calculateWinner returns false continue to mark squares
        if (!calculateWinner(squares)) {

            // if xIsNext is true then use X to mark the squares
            squares[index] = xIsNext ? "X" : "0";

            // set State for squares; and who is next
            setSquares(squares);
            setXisNext(!xIsNext);
        }
    };

    // resets the entire array to null, X will be the first to go again
    const resetGame = () => {

        //set state for squares to be null again; and make X be the first to go
        setSquares(Array(9).fill(null));
        setXisNext(true);
    };

    // the function which renders the squares.
    const drawSquare = index => {
        return (
            <Square
                className={"square"}
                value={squares[index]}
                clickSquare={() => markSquare(index)}
                disabled={squares[index] !== null}
            />
        );
    };

    const getWinner = () => {

        // the winner is evaluated based on three items of the same kind in a row
        const winner = calculateWinner(squares);

        let status = "";

        // if winner returns true
        if (winner) {
            status = `Winner: ${winner}`;
        }

        // if there is a draw it means nobody won
        else if (!winner && !checkNullSquares(squares)) {
            status = "Draw"
        }

        // next player will be set upon the boolean value of xIsNext state
        else {
            status = 'Next player: ' + (xIsNext ? 'X' : 'O');
        }

        return status;
    }


    return (
        <div>
            <div className="status">{getWinner()}</div>
            <div>
                {drawSquare(0)}
                {drawSquare(1)}
                {drawSquare(2)}
            </div>
            <div>
                {drawSquare(3)}
                {drawSquare(4)}
                {drawSquare(5)}
            </div>
            <div>
                {drawSquare(6)}
                {drawSquare(7)}
                {drawSquare(8)}
            </div>
            <ResetButton
                clickReset={() => resetGame()}
            />
        </div>
    );

}

// The game Component
const Game = () => {
    return (
        <div className="game">
            <Board/>
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

const calculateWinner = squares => {

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