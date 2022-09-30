import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Parsers } from 'json-kifu-format'
import { BoardPlayer } from './board_player.ts'

class Square extends React.Component {
   render() {
       return (
           <button className="square">
             {this.props.piece}
           </button>
       );
   }
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = { board: props.board };
  }

  renderSquare(piece) {
    return <Square piece={piece} />;
  }

  render() {
    let items = new Array<JSX.Element>();
    this.state.board.forEach((row) => {
      let columns = new Array<JSX.Element>();
      row.forEach((piece) =>  {
        columns = columns.concat(this.renderSquare(piece));
      });
      items = items.concat(<div className="board-row">{columns}</div>);
    });
    return (<div>{items}</div>);
  }
}

class Game extends React.Component {
   constructor(props) {
     super(props)
     this.state = { board_player: new BoardPlayer() };
   }

   openKif = (event) => {
     const reader = new FileReader()
     reader.onload = async (e) => {
       const text = (e.target.result)
       const kif = Parsers.parseCSA(text);
       // TypeScriptの連想配列型定義どうなるの？
       const move = kif.moves[1]['move']
       this.state.board_player.move(move['from']['x'], move['from']['y'], move['to']['x'], move['to']['y'], move['piece'])
       this.setState({ board_player: this.state.board_player });
     }
     reader.readAsText(event.target.files[0])
   }
   render() {
       return (
           <div className="game">
               <div><input type='file' onChange={this.openKif} /></div>
               <div className="game-board">
                   <Board board = { this.state.board_player.get_board() } />
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
