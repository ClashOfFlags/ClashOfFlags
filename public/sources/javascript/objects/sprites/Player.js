import Sprite from './Sprite';
import direction from './../values/direction';

export default class Player extends Sprite {
    boot() {
        this.speed = 500;
        this.enableArcadePhysics();
        this.body.collideWorldBounds = true;
        this.direction = direction.BOTTOM;
        this.number = 1;
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