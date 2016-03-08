import Sprite from './Sprite';
import config from '../../setup/config';


export default class Bullet extends Sprite{
  boot() {
    this.enableArcadePhysics();
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

    this.game.time.events.add(Phaser.Timer.SECOND * config.game.weapons[this.key].lifetime, this.killBullet, this);
  }

  killBullet() {
    this.kill();
  }

}
