export class ShogiPiece {
  // 後からUnicon型とやらを使ってみよう
  constructor(private type: string, private player: string) {
    this.type = type;
    this.player = player;
  }

  getType(): string {
    return this.type;
  }

  getPlayer(): string {
    return this.player;
  }

  togglePlayer() {
    if(this.player == 'white') {
      this.player = 'black'
    } else {
      this.player = 'white'
    }
  }
}

export class WhitePiece extends ShogiPiece {
  constructor(private type: string) {
    super(type, 'white');
  }
}

export class BlackPiece extends ShogiPiece {
  constructor(private type: string) {
    super(type, 'black');
  }
}
