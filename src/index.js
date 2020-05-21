import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

    //use a state to "remember" whether the square got clicked
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
      return (
        //when square clicked, onclick function in Board is called
        <button className="square" 
            onClick={() => this.props.onClick()}>
            
            {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {

    //store the game's state in the Board
    constructor(props) {
        super(props);

        //initial state is 9 blank squares
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
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
      const status = 'Next player: X';
  
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
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  