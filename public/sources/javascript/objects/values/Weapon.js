import Bullet from '../sprites/Bullet';
import direction from './direction';

export default class Weapon {
    constructor(player, game) {
      this.game = game;
      this.player = player;
      this.shotDelay = 500;
      // this.nextShotAt = this.time.now + this.shotDelay;

      this.bullets = game.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    }

    shoot() {
      // if (this.nextShotAt > this.time.now) {
      //   return;
      // }
      //
      // this.nextShotAt = this.time.now + this.shotDelay;

      this.player.loadTexture('player_shoot', 0, true);
      this.game.time.events.add(Phaser.Timer.SECOND * 0.2, this.changeSprite, this);

      this.bulletSpeed = 600;

      // this.bullet = new Bullet(this.game, this.player.body.x, this.player.body.y, 'fireball');
      this.bullet = this.bullets.create(this.player.body.center.x, this.player.body.center.y, 'fireball');
      this.bullet.animations.add('fireball', Phaser.Animation.generateFrameNames('fireball_000', 1, 6), 60, true);
      this.bullet.animations.play('fireball');
      this.bullet.anchor.setTo(0.5, 0.5);

      if(this.player.direction === direction.BOTTOM){
        this.bullet.body.velocity.y = this.bulletSpeed;
        this.bullet.angle = 180;
      }else if(this.player.direction === direction.UP){
        this.bullet.angle = 0;
        this.bullet.body.velocity.y = -this.bulletSpeed;
      }else if(this.player.direction === direction.RIGHT){
        this.bullet.angle = 90;
        this.bullet.body.velocity.x = this.bulletSpeed;
      }else if(this.player.direction === direction.LEFT){
        this.bullet.angle = -90;
        this.bullet.body.velocity.x = -this.bulletSpeed;
      }
    }

    changeSprite() {
      this.player.loadTexture('player', 0, true);
    }
}
