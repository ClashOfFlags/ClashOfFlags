import Sprite from './Sprite';
import config from '../../setup/config';

export default class Item extends Sprite {

  boot() {
    this.barrel = {
      maxRange: config.game.barrel.maxRange,
      maxDamage: config.game.barrel.maxDamage
    }
  }

}
