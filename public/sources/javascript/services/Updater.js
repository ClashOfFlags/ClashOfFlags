

export default class Updater {

  constructor(game, $container) {
      this.game = game;
      this.$container = $container;
  }


  run() {

    this.game.physics.arcade.collide(this.player, this.obstacleLayer);
    this.game.physics.arcade.collide(this.player, this.waterlayer);
    this.game.physics.arcade.collide(this.player, this.objects.get('barrels'));
    this.game.physics.arcade.overlap(this.player.weapon.bullets, this.objects.get('barrels'), this.bulletHitBarrel, null, this);
    this.game.physics.arcade.collide(this.objects.get('barrels'), this.obstacleLayer);
    this.game.physics.arcade.collide(this.player.weapon.bullets, this.obstacleLayer, this.bulletHitObstacle, null, this);

    this.game.physics.arcade.collide(this.player, this.objects.get('playerGroup'), this.playerHitPlayer, null, this);
    this.game.physics.arcade.overlap(this.player.weapon.bullets, this.objects.get('playerGroup'), this.bulletHitPlayer, null, this);
    this.game.physics.arcade.collide(this.objects.get('playerGroup'), this.obstacleLayer);

    this.flagRedGroup = this.objects.get('flags.red');
    this.game.physics.arcade.overlap(this.player, this.flagRedGroup, this.playerCollectsFlag, null, this);

    this.flagBlueGroup = this.objects.get('flags.blue');
    this.game.physics.arcade.overlap(this.player, this.flagBlueGroup, this.playerCollectsFlag, null, this);

    this.inputs.applyToPlayer(this.player);
    this.network.sendPosition(this.player);

    this.updateMiniMap();
  }


  updateMiniMap() {

    this.miniMapOverlay.context.clearRect(0, 0, this.miniMapOverlay.width, this.miniMapOverlay.height);

    for (var i = 0; i < this.teamManager.teams[this.player.team.name].players.length; i++) {
      var teamPlayer = this.teamManager.teams[this.player.team.name].players[i];
      var color = '#0AFF12';

      if(teamPlayer === this.player){
        color = '#FFFF00';
      }

      this.miniMapOverlay.rect(
        Math.floor(teamPlayer.x / 64) * this.miniMapSize,
        Math.floor(teamPlayer.y / 64) * this.miniMapSize,
        this.miniMapSize * 2, this.miniMapSize * 2, color);
      this.miniMapOverlay.dirty = true;
    }
  }

  bulletHitBarrel(bullet, barrel) {
    this.bulletHitObstacle(bullet);

    this.createExplosionAnimation({
      x: barrel.x,
      y: barrel.y - barrel.height,
      key: 'flame_a',
      frameName: 'flame_a_000',
      frameNameMax: 6,
      frameSpeed:60,
      repeat: false,
      scale: 0.4
    });
    barrel.kill();
  }

  createExplosionAnimation(data) {
    var sprite = this.game.add.sprite(data.x, data.y, data.key);
    sprite.anchor.setTo(0.5, 0.5);
    sprite.scale.x = data.scale;
    sprite.scale.y = data.scale;
    sprite.animations.add('animation', Phaser.Animation.generateFrameNames(data.frameName, 1, data.frameNameMax), data.frameSpeed, data.repeat);
    sprite.animations.play('animation');

    sprite.events.onAnimationComplete.add(function () {
        sprite.kill();
    }, this);
  }

  playerHitPlayer(ownPlayer, otherPlayer){
    otherPlayer.body.moves = false;
  }

  bulletHitObstacle(bullet) {
    this.createExplosionAnimation({
      x: bullet.x,
      y: bullet.y,
      key: 'explosion',
      frameName: 'fireball_hit_000',
      frameNameMax: 9,
      frameSpeed:100,
      repeat: false,
      scale: 1
    });
    bullet.kill();
  }

  bulletHitPlayer(bullet, player) {
    if(player !== this.player){
      this.createExplosionAnimation({
        x: bullet.x,
        y: bullet.y,
        key: 'explosion',
        frameName: 'fireball_hit_000',
        frameNameMax: 9,
        frameSpeed:100,
        repeat: false,
        scale: 1
      });
      bullet.kill();
    }
  }

  playerCollectsFlag(player, flag) {
      flag.collectFlag(player);
  }
}
