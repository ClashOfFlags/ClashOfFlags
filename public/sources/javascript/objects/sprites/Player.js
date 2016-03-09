import Sprite from './Sprite';
import direction from './../values/direction';
import Weapon from './../values/Weapon';

export default class Player extends Sprite {
    boot() {
        this.speed = 400;
        this.enableArcadePhysics();
        this.body.collideWorldBounds = true;
        this.direction = direction.RIGHT;
        this.weapon = new Weapon(this, this.game);
        this.number = 1;
        this.networkId = null;
    }

    collect(item) {
        item.kill();
    }

    shoot() {
        this.weapon.shoot();
    }

    changeSpriteToNormal() {
      this.player.loadTexture('player', 0, true);
    }

    updateName() {
      this.name.x = this.x;
      this.name.y = this.y - this.height * 1.2; 
    }
}
