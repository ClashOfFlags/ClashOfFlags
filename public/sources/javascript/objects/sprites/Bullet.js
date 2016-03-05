import Sprite from './Sprite';


export default class Bullet extends Sprite{
  boot() {
    this.enableArcadePhysics();
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  }

}
