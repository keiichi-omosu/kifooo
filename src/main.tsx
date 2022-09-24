import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CsaParser} from './csa_parser';

class Square extends React.Component {
   render() {
       return (
           <button className="square">
             {this.props.pos_x}
             {this.props.pos_y}
           </button>
       );
   }
}

class Board extends React.Component {
  renderSquare(x, y) {
    return <Square pos_x={x} pos_y={y} />;
  }

  render() {
    let items = new Array<JSX.Element>();
    for(let y = 0; y < 9; ++y) {
      let columns = new Array<JSX.Element>();
      for(let x = 0; x < 9; ++x) {
        columns = columns.concat(this.renderSquare(x, y));
      }
      items = items.concat(<div className="board-row">{columns}</div>);
    }
    return (<div>{items}</div>);
  }
}

class Game extends React.Component {
   openKif(event) {
     const reader = new FileReader()
     reader.onload = async (e) => {
       const text = (e.target.result)
       CsaParser.parse(text)
     }
     reader.readAsText(event.target.files[0])
   }
   render() {
       return (
           <div className="game">
               <div><input type='file' onChange={this.openKif} /></div>
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
