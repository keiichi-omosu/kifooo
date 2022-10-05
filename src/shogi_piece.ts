//TODO 抽象クラス or interface  + 規定クラス
export class ShogiPiece {

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

  //TODO abstract
  isPromoted() : boolean {
    return false
  }

  //TODO abstract
  promote() {
    throw Error('not implement yet')
  }

  //TODO abstract
  initPromote() {
    throw Error('not implement yet')
  }

  togglePlayer() {
    if(this.player == 'W') {
      this.player = 'B'
    } else {
      this.player = 'W'
    }
  }
}

export class Ou extends ShogiPiece {
  constructor(player: string) {
    super('OU', player);
  }
  isPromoted(): boolean {
    return false;
  }
  promote(): void {}

  initPromote(): void {}
}

export class Ki extends ShogiPiece {
  constructor(player: string) {
    super('KI', player);
  }
  isPromoted(): boolean {
    return false;
  }
  promote(): void {}

  initPromote(): void {}
}

class PromotablePiece extends ShogiPiece {
  constructor(type: string, player: string, private promote_type: string, private promoted: boolean) {
    super(type, player);
    this.promote_type = promote_type;
  }

  isPromoted(): boolean {
    return this.promoted;
  }

  promote(): void {
    this.promoted = true;
  }

  initPromote(): void {
    this.promoted = false;
  }

  /* override */
  getType(): string {
   if (this.isPromoted()) {
     return this.promote_type;
   } 
   return super.getType();
  }
}

// 各クラス別ファイルにするとimport面倒そうだけど...どうしたらええんや
export class Fu extends PromotablePiece {
  constructor(player: string ) {
    super('FU', player, 'NA', false)
  }
}

export class Ky extends PromotablePiece {
  constructor(player: string ) {
    super('KY', player, 'NA', false)
  }
}

export class Ke extends PromotablePiece {
  constructor(player: string ) {
    super('KE', player, 'NA', false)
  }
}

export class Gi extends PromotablePiece {
  constructor(player: string ) {
    super('GI', player, 'NA', false)
  }
}

export class Ka extends PromotablePiece {
  constructor(player: string ) {
    super('KA', player, 'UM', false)
  }
}

export class Hi extends PromotablePiece {
  constructor(player: string ) {
    super('HI', player, 'RY', false)
  }
}
