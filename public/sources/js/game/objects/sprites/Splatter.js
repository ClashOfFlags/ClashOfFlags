import Sprite from './Sprite';
import config from '../../setup/config';


export default class Splatter extends Sprite{
  boot() {
    this.scale.x = 2;
    this.scale.y = 2;
    this.anchor.setTo(0.5, 0.5);
    this.sendToBack();
    this.moveUp();
    this.visible = false;
    this.game.time.events.add(Phaser.Timer.SECOND * config.game.splatter.lifetime, this.killSplatter, this);
    this.createExplosionAnimation({
        x: this.x,
        y: this.y,
        key: 'splatter_animation',
        frameName: 'splatter_1_000',
        frameNameMax: 5,
        frameSpeed: 30,
        repeat: false,
        scale: 2
    });
  }

  killSplatter() {
    this.kill();
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
          this.visible = true;
      }, this);
  }

}
