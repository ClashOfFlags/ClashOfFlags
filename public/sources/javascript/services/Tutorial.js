
export default class Tutorial {
  constructor(game, $container) {
      this.game = game;
      this.objects = $container.ObjectsService;
  }

  hideMoveHint() {
    if(this.objects.get("moveHint").alpha === 1){
      this.hintFadeOut("moveHint");
      this.game.time.events.add(Phaser.Timer.SECOND * 3, this.showShootHint, this);
      this.game.time.events.add(Phaser.Timer.SECOND * 8, this.showMapHint, this);
    }
  }

  showShootHint() {
    this.player = this.objects.get('hero');
    if(this.player.bulletsShot === 0){
      this.objects.get("shootHint").visible = true;
      this.objects.get("shootHint").alpha = 0;
      this.hintFadeIn("shootHint");
    }
  }

  hideShootHint() {
    if(this.objects.get("shootHint").visible === true){
      this.hintFadeOut("shootHint");
    }
  }

  showMapHint() {
    this.objects.get("mapHint").visible = true;
    this.objects.get("mapHint").alpha = 0;
    this.hintFadeIn("mapHint");
    this.game.time.events.add(Phaser.Timer.SECOND * 6, this.hideMapHint, this);
  }

  hideMapHint() {
    this.hintFadeOut("mapHint");
  }

  hintFadeOut(hint){
    this.game.add.tween(this.objects.get(hint)).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
  }

  hintFadeIn(hint){
    this.game.add.tween(this.objects.get(hint)).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
  }


}
