import Sprite from './Sprite';
import config from '../../setup/config';


export default class Splatter extends Sprite{
  boot() {
    this.scale.x = 2;
    this.scale.y = 2;
    this.anchor.setTo(0.5, 0.5);
    this.sendToBack();
    this.moveUp();
    this.game.time.events.add(Phaser.Timer.SECOND * config.game.splatter.lifetime, this.killSplatter, this);
  }

  killSplatter() {
    this.kill();
  }

}
