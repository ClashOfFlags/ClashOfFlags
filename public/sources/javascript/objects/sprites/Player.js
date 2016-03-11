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
        this.carryingFlag = false;
    }

    collect(item) {
        item.kill();
    }

    shoot(overwriteDirection) {
        this.weapon.shoot(overwriteDirection);
    }

    changeSpriteToNormal() {
      this.player.loadTexture('player', 0, true);
    }

    updateName() {
      this.name.x = this.x;
      this.name.y = this.y - this.height * 1.2; 
    }

    getFlag() {
        this.carryingFlag = true;
    }

    releaseFlag() {
        this.carryingFlag = false;
    }

    moveToDirection(newDirection) {
        this.direction = newDirection;

        switch (this.direction) {
            case direction.TOP:
            {
                this.angle = -90;
                break;
            }
            case direction.BOTTOM:
            {
                this.angle = 90;
                break;
            }

            case direction.LEFT:
            {
                this.angle = 180;
                break;
            }
            case direction.RIGHT:
            {
                this.angle = 0;
                break;
            }
        }

        this.updateName();

    }
}
