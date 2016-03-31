
export default class Tutorial {
  constructor(game, $container) {
      this.game = game;
      this.objects = $container.ObjectsService;
  }

  hideMoveHint() {
    if(this.objects.get("moveHint").alpha === 1){
      this.hintFadeOut("moveHint");
      this.game.time.events.add(Phaser.Timer.SECOND * 3, this.showShootHint, this);
    }
  }

  showShootHint() {
    this.player = this.objects.get('hero');
    if(this.player.bulletsShot === 0){
      this.objects.get("shootHint").visible = true;
    }
  }

  hideShootHint() {
    if(this.objects.get("shootHint").visible === true){
      this.hintFadeOut("shootHint");
    }
  }

  hintFadeOut(hint){
    this.game.add.tween(this.objects.get(hint)).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
  }


}
