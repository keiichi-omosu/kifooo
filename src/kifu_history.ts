import { BoardMove, Move, StandMove } from "./move";

export class KifuHistory {
  private currentMove: number = 0;
  private totalMove: number = 0;
  private moves: Array<Move>;

  constructor(csa) {
    this.moves = csa['moves'].filter((csaMove) => {  return csaMove['move'] !== undefined }).map((csaMove: {}, i: number) => {
      if(csaMove['move']['from']) {
        return new BoardMove(csaMove['move']['from'], csaMove['move']['to'], csaMove['move']['piece'])
      } else {
        const player: string = (i % 2) ? 'B' : 'W'
        return new StandMove(csaMove['move']['to'], csaMove['move']['piece'], player)
      }
    })
    this.totalMove = this.moves.length;
  }

  getTotalMove(): number {
    return this.totalMove;
  }

  getCurrentMove(): number {
    return this.currentMove;
  }

  getCurrentKifu(): Move {
    return this.moves[this.currentMove - 1];
  }

  next(): void {
    if(this.currentMove >= this.totalMove) {
      throw new Error('currentMove is totalMove');
    }
    this.currentMove+= 1 
  }

  prev() :void {
    if(this.currentMove <= 0) {
      throw new Error('currentMove is 0');
    }
    this.currentMove-= 1 
  }
}
