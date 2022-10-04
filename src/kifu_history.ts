export class KifuHistory {
  private currentMove: number = 0;
  private totalMove: number = 0;
  private moves: Array<Object>;
  private isBlackTurn: boolean = true;

  constructor(csa) {
    this.moves = csa['moves']
    this.totalMove = this.moves.length;
  }

  getTotalMove(): number {
    return this.totalMove;
  }

  getCurrentMove(): number {
    return this.currentMove;
  }

  getCurrentKifu() {
    return this.moves[this.currentMove];
  }

  next() {
    if(this.currentMove >= this.totalMove) {
      throw new Error('currentMove is totalMove');
    }
    this.currentMove+= 1 
    this.toggleTurn();
  }

  prev() {
    if(this.currentMove <= 0) {
      throw new Error('currentMove is 0');
    }
    this.currentMove-= 1 
    this.toggleTurn();
  }

  private toggleTurn() {
    this.isBlackTurn = !this.isBlackTurn;
  }
}
