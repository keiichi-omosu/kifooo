export class BoardPlayer {
  private board: Array<Array<string>> = [[]];

  // 駒をVOで表現するのありそう
  constructor() {
   this.board = [
     ['KY', 'KE', 'GI', 'KI', 'OU', 'KI', 'GI', 'KE', 'KY'],
     ['',   'HI', '',   '',   '',   '',   '',   'KA',  '' ],
     ['FU', 'FU', 'FU', 'FU', 'FU', 'FU', 'FU', 'FU', 'FU'],
     ['',   '',   '',   '',   '',   '',   '',   '',    '' ],
     ['',   '',   '',   '',   '',   '',   '',   '',    '' ],
     ['',   '',   '',   '',   '',   '',   '',   '',    '' ],
     ['FU', 'FU', 'FU', 'FU', 'FU', 'FU', 'FU', 'FU', 'FU'],
     ['',   'KA', '',   '',   '',   '',   '',   'HI',  '' ],
     ['KY', 'KE', 'GI', 'KI', 'OU', 'KI', 'GI', 'KE', 'KY'],
   ] 
  }

  move(from_x: number, from_y: number, to_x: number, to_y: number, piece: string) {
    const old_piece: string = this.pick_piece(from_x, from_y);
    if(old_piece != piece) {
      throw new Error('InvalidArgumentError');
    }
    this.put_piece(from_x, from_y, '')
    this.put_piece(to_x, to_y, piece)
  }

  // privateメソッドどう作るん？
  // 将棋用語でコマを持つのってなんていうんだっけ...?
  pick_piece(x:number, y:number) {
    return this.board[y - 1][8 - (x - 1)];
  }

  put_piece(x:number, y:number, piece: string) {
    console.log(x)
    console.log(y)
    this.board[y - 1][8 - (x - 1)] = piece;
  }

  get_board() {
    return this.board;
  }
}
