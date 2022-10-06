import {BoardPlayer} from "./board_player"
import {ShogiPiece} from "./shogi_piece";

export interface Move {
  call(board: BoardPlayer): void
}

export class BoardMove implements Move {
  constructor(private from: { [key: string]: string}, private to: { [key: string]: string}) {
    this.from = from;
    this.to = to;
  }

  call(board: BoardPlayer) {
    const fromPiece = board.pickPiece(this.from['x'], this.from['y']);
    const toPiece = board.pickPiece(this.to['x'], this.to['y'])

    this.validate(fromPiece, toPiece)

    if(toPiece) { board.takePiece(toPiece) }

    if (board.isPromotionZone(this.to['y'], fromPiece)) {
      fromPiece.promote()
    }
    
    board.putPiece(this.to['x'], this.to['y'], fromPiece)
  }

  private validate(fromPiece: ShogiPiece, toPiece: ShogiPiece) :void {
    if(!fromPiece) { throw new Error('打つ駒が見つからない....') }
    if(fromPiece == toPiece) { throw new Error('自分の駒を取ろうとしてる.....') }
  }
}

export class StandMove implements Move {
  constructor(private to: { [key: string]: number}, private pieceType: string, private player: string) {
    this.to = to;
    this.pieceType = pieceType;
  }

  call(board: BoardPlayer) {
    const toPiece = board.pickPiece(this.to['x'], this.to['y'])
    const standPiece = board.pickPieceFromStand(this.pieceType, this.player)
    this.validate(toPiece)
    board.putPiece(this.to['x'], this.to['y'], standPiece)
  }

  private validate(toPiece: ShogiPiece) :void {
    if(toPiece){
      throw new Error('駒台から、相手の駒のマスには打てません')
    }
  }
}
