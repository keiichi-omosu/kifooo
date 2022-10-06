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

  pickPiece(x:number, y:number) {
    const piece = this.board[y - 1][8 - (x - 1)];
    this.board[y - 1][8 - (x - 1)] = null
    return piece;
  }

  putPiece(x:number, y:number, piece: ShogiPiece) {
    this.board[y - 1][8 - (x - 1)] = piece;
  }

  takePiece(piece: ShogiPiece): void {
    piece.togglePlayer()
    piece.initPromote()
    this.myStand(piece.getPlayer()).push(piece)
  }

  pickPieceFromStand(pieceType: string, player: String): ShogiPiece {
    console.log(pieceType)
    this.myStand(player).forEach(piece => console.log(piece))
    const piece: ShogiPiece = this.myStand(player).find((piece) => { return piece.getType() == pieceType })
    if (!piece) { throw new Error('駒台に該当の駒が存在しない') }
    return piece;
  }

  getBlackPieceStand(): Array<ShogiPiece> {
    return this.blackPieceStand;
  }

  getWhitePieceStand(): Array<ShogiPiece> {
    return this.whitePieceStand;
  }

  getBoard(): Array<Array<ShogiPiece>> {
    return this.board;
  }

   isPromotionZone(y: number, piece: ShogiPiece) {
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
      throw new Error(`InvalidArgumentError ${player}`);
    }
  }
}
