import {ShogiPiece} from "./shogi_piece";

export class PieceName {
  static readonly PIECE_NAMES: { [key: string]: string }  = {
    FU: '歩', KY: '香', KE: '桂', GI: '銀', KI: '金', OU: '王', KA: '角', HI: '飛', UM: '馬', RY: '龍'
  }

  static translate(piece: ShogiPiece): string {
    return this.PIECE_NAMES[piece.getType()];
  }
}
