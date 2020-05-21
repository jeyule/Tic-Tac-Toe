import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

    //square function that takes props as input and returns what to render
    function Square(props) {
        return (
            <button className="square" onClick =
                {props.onClick}>
                {props.value}
            </button>
        );
    }
  
  class Board extends React.Component {

    //store the game's state in the Board
    constructor(props) {
        super(props);

        //initial state is 9 blank squares
        //x goes first by default
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        
        //ignore clicks if game has ended or square is already filled
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        
        //mark as 'X' or 'O' depending on whose turn it is
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            //flip each turn
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        //pass down a function from board to square and have
        //square call this function when a square is clicked
        return (
            <Square 
                value = {this.state.squares[i]}
                onClick = {() => this.handleClick(i)}
            />
        );
    }
  
    render() {
        const winner = 
            calculateWinner(this.state.squares);
            
            let status;
            if (winner) {
                //display winner if game ended
                status = 'Winner: ' + winner;
            } else {
                //display which player has the turn
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  //determines if someone has filled a whole line and won
  function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  