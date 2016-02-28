import Sprite from './Sprite';

export default class Hero extends Sprite {

    boot() {
        this.speed = 500;
        this.enableArcadePhysics();
        this.body.collideWorldBounds = true;
    }

    getSpeed() {
      return this.speed;
    }

    setSpeed(newSpeed) {
      this.speed = newSpeed;
    }

    collect(item) {
        item.kill();
    }

}
