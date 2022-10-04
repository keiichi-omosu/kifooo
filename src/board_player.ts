import { WhitePiece, BlackPiece, ShogiPiece} from './shogi_piece'
export class BoardPlayer {
  private board: Array<Array<string>> = [[]];

  // 駒をVOで表現するのありそう
  constructor() {
   this.board = [
     [this.new_w('KY'), this.new_w('KE'), this.new_w('GI'), this.new_w('KI'), this.new_w('OU'), this.new_w('KI'), this.new_w('GI'), this.new_w('KE'), this.new_w('KY')],
     [null, this.new_w('HI'), null, null, null, null, null, this.new_w('KA'), null],
     [this.new_w('FU'), this.new_w('FU'), this.new_w('FU'), this.new_w('FU'), this.new_w('FU'), this.new_w('FU'), this.new_w('FU'), this.new_w('FU'), this.new_w('FU')],
     [null, null, null, null, null, null, null, null, null],
     [null, null, null, null, null, null, null, null, null],
     [null, null, null, null, null, null, null, null, null],
     [this.new_b('FU'), this.new_b('FU'), this.new_b('FU'), this.new_b('FU'), this.new_b('FU'), this.new_b('FU'), this.new_b('FU'), this.new_b('FU'), this.new_b('FU')],
     [null, this.new_b('KA'), null,  null, null, null, null, this.new_b('HI'), null],
     [this.new_b('KY'), this.new_b('KE'), this.new_b('GI'), this.new_b('KI'), this.new_b('OU'), this.new_b('KI'), this.new_b('GI'), this.new_b('KE'), this.new_b('KY')],
   ] 
  }

  move(from_x: number, from_y: number, to_x: number, to_y: number, piece: string) {
    const old_piece: ShogiPiece = this.pickPiece(from_x, from_y);
    if(old_piece.getType() != piece) {
      throw new Error('InvalidArgumentError');
    }
    this.putPiece(from_x, from_y, null)
    this.putPiece(to_x, to_y, old_piece)
  }

  // privateメソッドどう作るん？
  // 将棋用語でコマを持つのってなんていうんだっけ...?
  pickPiece(x:number, y:number) {
    return this.board[y - 1][8 - (x - 1)];
  }

  private putPiece(x:number, y:number, piece: string) {
    this.board[y - 1][8 - (x - 1)] = piece;
  }

  private get_board(): Array<Array<string>> {
    return this.board;
  }

  private new_w(type: string): WhitePiece {
    return new WhitePiece(type);
  }

  private new_b(type: string): BlackPiece {
    return new BlackPiece(type);
  }
}
