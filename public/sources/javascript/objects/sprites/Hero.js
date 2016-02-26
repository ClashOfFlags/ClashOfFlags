import Sprite from './Sprite';

export default class Hero extends Sprite {

    boot() {
        this.enableArcadePhysics();
        this.body.collideWorldBounds = true;
    }

    getSpeed() {
      return 200;
    }

    collect(item) {
        item.kill();
    }

}
