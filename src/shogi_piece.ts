export class ShogiPiece {
  private shogiTypes = {
    'FU': 'KI', 'KY' : 'KI', 'KE' : 'KI', 'GI' : 'KI', 'KA' : 'UM', 'HI' : 'RYU'
  }

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

  isPromoted() : boolean {
    return Object.values(this.shogiTypes).includes(this.type)
  }

  promote() {
    if(!this.isPromoted()) {
      this.type = this.shogiTypes[this.type]
    }
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
