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
        this.updateName();

        if(this.isFacingDirection(newDirection, true)){
            return false;
        }

        this.direction = newDirection;
        this.resetVelocity();

        switch (this.direction) {
            case direction.TOP:
            {
                this.body.velocity.y -= this.speed;

                this.angle = -90;
                break;
            }
            case direction.BOTTOM:
            {
                this.body.velocity.y += this.speed;
                this.angle = 90;
                break;
            }

            case direction.LEFT:
            {
                this.angle = 180;
                this.body.velocity.x -= this.speed;
                break;
            }
            case direction.RIGHT:
            {
                this.body.velocity.x += this.speed;
                this.angle = 0;
                break;
            }
        }

        console.log('send moving');


        this.animations.play('walk');
    }

    isFacingDirection(direction, isMoving) {

        if(direction !== this.direction){
            return false;
        }

        if(isMoving !== this.isMoving()){
            return false;
        }

        return true;
    }

    isMoving(){
        return this.body.velocity.x !== 0 || this.body.velocity.y !== 0;
    }


    stopMoving() {
        if(this.isFacingDirection(this.direction, false)){
            return false;
        }

        this.resetVelocity();

        this.animations.stop();
        this.frame = 0;
    }

    resetVelocity() {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

    }
}
