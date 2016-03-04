import Sprite from './Sprite';
import direction from './../values/direction';

export default class Player extends Sprite {
    boot() {
        this.speed = 500;
        this.enableArcadePhysics();
        this.body.collideWorldBounds = true;
        this.direction = direction.BOTTOM;
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