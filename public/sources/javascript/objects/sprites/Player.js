import Sprite from './Sprite';
import direction from './../values/direction';
import Weapon from './../values/Weapon';

export default class Player extends Sprite {
    boot() {
        this.speed = 400;
        this.enableArcadePhysics();
        this.body.collideWorldBounds = true;
        this.direction = direction.BOTTOM;
        this.weapon = new Weapon(this, this.game);
    }

    collect(item) {
        item.kill();
    }

    shoot() {
      this.weapon.shoot();
    }
}
