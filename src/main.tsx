import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Parsers } from 'json-kifu-format'
import { BoardPlayer } from './board_player'
import { KifuHistory } from './kifu_history'
import { ShogiPiece } from './shogi_piece';

class Square extends React.Component {
  render() {
    // useStateを使えば楽ってほんと？
    let className = 'square';

    if(this.props.piece) {
      className += ` piece-${this.props.piece.player}` 
      return (
          <button className={className}>
          { this.props.piece.type }
          </button>
      );

    } else {
      return <button className={className} />
    }
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = { board: props.board };
  }

  renderSquare(piece: ShogiPiece) {
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
     this.state = { board_player: new BoardPlayer(), kifu_history: null };
   }

   renderKif() {
     if(this.state.kifu_history == null) {
       return <div></div>
     } else {
       return <div><div><button onClick={ this.prevKif }>prev</button><button onClick={ this.nextKif }>next</button></div></div>;
     }
   }

   openKif = (event) => {
     const reader = new FileReader()
     reader.onload = async (e) => {
       const text = (e.target.result)
       const kif = Parsers.parseCSA(text);

       this.setState({ board_player: this.state.board_player, kifu_history: new KifuHistory(kif) });
     }
     reader.readAsText(event.target.files[0])
   }

   prevKif = () => {
     const move = this.state.kifu_history.getCurrentKifu()['move'];
     this.state.board_player.move(move['to']['x'], move['to']['y'], move['from']['x'], move['from']['y'], move['piece'])
     this.state.kifu_history.prev()
     this.setState({ board_player: this.state.board_player, kifu_history: this.state.kifu_history });
   }

   nextKif = () => {
     this.state.kifu_history.next()
     const move = this.state.kifu_history.getCurrentKifu()['move'];
     this.state.board_player.move(move['from']['x'], move['from']['y'], move['to']['x'], move['to']['y'], move['piece'])
     this.setState({ board_player: this.state.board_player, kifu_history: this.state.kifu_history });
   }

   render() {
       return (
           <div className="game">
               <div><input type='file' onChange={this.openKif} /></div>
               <div className="game-board">
                   <Board board = { this.state.board_player.get_board() } />
               </div>
               <div className="game-info">
                 <div>{ this.renderKif() }</div>
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
