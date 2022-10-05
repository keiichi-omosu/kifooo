import { Fu, Ky, Ke, Gi, Ka, Hi, Ou, Ki, ShogiPiece} from './shogi_piece'

function fuw() {
  return new Fu('W')
}

function fub() {
  return new Fu('B')
}

export class BoardPlayer {
  private board: Array<Array<ShogiPiece>> = [[]];
  private blackPieceStand = []
  private whitePieceStand = []

  //TODO  インスタンス生成のfunctionをpieceに作ってもよかったな....
  // やっぱpieceがposition持つか....
  constructor() {
   this.board = [
     [new Ky('W'), new Ke('W'), new Gi('W'), new Gi('W'), new Ou('W'), new Ki('W'), new Gi('W'), new Ke('W'), new Ky('W')],
     [null, new Hi('W'), null, null, null, null, null, new Ka('W'), null],
     [fuw(), fuw(), fuw(), fuw(), fuw(), fuw(), fuw(), fuw(), fuw()],
     [null, null, null, null, null, null, null, null, null],
     [null, null, null, null, null, null, null, null, null],
     [null, null, null, null, null, null, null, null, null],
     [fub(), fub(), fub(), fub(), fub(), fub(), fub(), fub(), fub()],
     [null, new Ka('B'), null,  null, null, null, null, new Hi('B'), null],
     [new Ky('B'), new Ke('B'), new Gi('B'), new Ki('B'), new Ou('B'), new Ki('B'), new Gi('B'), new Ke('B'), new Ky('B')],
   ] 
  }

  move(from_x: number, from_y: number, to_x: number, to_y: number, piece: string) {

    const oldFromPiece: ShogiPiece = this.pickPiece(from_x, from_y);
    const oldToPiece: ShogiPiece = this.pickPiece(to_x, to_y);

    /* 成駒の考慮がだるいので、一旦
    if(oldFromPiece.getType() != piece) {
      throw new Error('InvalidArgumentError');
    }
    */

    if(oldToPiece) {
      if(oldToPiece.getPlayer() == oldFromPiece.getPlayer()) {
        throw new Error('InvalidArgumentError');
      } else {
        oldToPiece.togglePlayer()
        oldToPiece.initPromote()
        this.myStand(oldFromPiece.getPlayer()).push(oldToPiece)
      }
    }

    if (this.isPromotionZone(to_y, oldFromPiece)) {
      oldFromPiece.promote()
    }
    this.putPiece(from_x, from_y, null)
    this.putPiece(to_x, to_y, oldFromPiece)
  }

  // privateメソッドどう作るん？
  // 将棋用語でコマを持つのってなんていうんだっけ...?
  pickPiece(x:number, y:number) {
    return this.board[y - 1][8 - (x - 1)];
  }

  getBlackPieceStand(): Array<ShogiPiece> {
    return this.blackPieceStand;
  }

  getWhitePieceStand(): Array<ShogiPiece> {
    return this.whitePieceStand;
  }

  getBoard(): Array<Array<string>> {
    return this.board;
  }

  private putPiece(x:number, y:number, piece: ShogiPiece) {
    this.board[y - 1][8 - (x - 1)] = piece;
  }

  private isPromotionZone(y: number, piece: ShogiPiece) {
    if(piece.getPlayer() == 'B') {
      return y <= 3
    } else {
      return y >= 7
    }
  }

  private myStand(player: string): Array<ShogiPiece> {
    if (player == 'W') {
      return this.whitePieceStand;
    } else if (player == 'B') {
      return this.blackPieceStand;
    } else {
      throw new Error('InvalidArgumentError');
    }
  }
}
