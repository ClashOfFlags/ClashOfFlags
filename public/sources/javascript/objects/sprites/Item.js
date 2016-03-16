import Sprite from './Sprite';
import config from '../../setup/config';

export default class Item extends Sprite {

  boot() {
    this.barrel = {
      range1: config.game.barrel.range1,
      range2: config.game.barrel.range2,
      range3: config.game.barrel.range3
    }
  }

}
