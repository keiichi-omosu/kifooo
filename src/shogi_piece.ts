export class ShogiPiece {
  // 後からUnicon型とやらを使ってみよう
  constructor(private type: string, private player: string) {
    this.type = type;
    this.player = player;
  }

  get_type(): string {
    return this.type;
  }

  get_player(): string {
    return this.player;
  }
}
