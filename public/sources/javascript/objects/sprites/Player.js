import Sprite from './Sprite';
import direction from './../values/direction';
import Weapon from './../values/Weapon';
import config from '../../setup/config';
import Splatter from './Splatter';

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
        this.rank = 1;
        this.exp = 0;

        for(let i = 1; i <= 75; i++) {
            console.log('Level:', i, 'Exp:', this.expFor(i));
        }
    }

    isAlive() {
        return this.health > 0;
    }

    isDead() {
        return this.health === 0;
    }

    isVisible() {
        return this.visible && this.alpha === 1;
    }

    canShoot() {
        return this.isAlive() && this.isVisible();
    }

    collect(item) {
        item.kill();
    }

    shoot(overwriteDirection) {
        if (!this.canShoot()) {
            return;
        }

        this.weapon.shoot(overwriteDirection);
    }

    walkAnimation() {
        this.animations.play('walk');
    }

    stopShooting() {
        this.changeSpriteToNormal();

        if (this.isMoving()) {
            this.walkAnimation();
        }
    }

    changeSpriteToNormal() {
        this.loadTexture('player', 0, true);
    }

    updateName() {
        this.name.x = this.x;
        this.name.y = this.y - this.height * 1.2;
    }

    updateHealthbar() {
        this.healthbar.x = this.x - this.width / 2;
        this.healthbar.y = this.y - this.height * 1.5;
    }

    updateRank() {
        this.rankSprite.x = this.healthbar.x - this.rankSprite.width - 5;
        this.rankSprite.y = this.healthbar.y - (this.rankSprite.height / 3);
    }

    createRankSprite() {
        if(this.rankSprite) {
            this.rankSprite.kill();

            this.rankSprite = null;
        }

        const rankSpriteKey = 'rank' + this.rank;
        this.rankSprite = this.game.add.sprite(0, 0, rankSpriteKey);
        this.rankSprite.scale.x = 0.1;
        this.rankSprite.scale.y = 0.1;

        this.updateRank();
    }

    getFlag() {
        this.carryingFlag = true;
    }

    releaseFlag() {
        this.carryingFlag = false;
    }

    setDirection(newDirection) {
        this.direction = newDirection;

        switch (this.direction) {
            case direction.TOP:
                this.angle = -90;
                break;
            case direction.BOTTOM:
                this.angle = 90;
                break;
            case direction.LEFT:
                this.angle = 180;
                break;
            case direction.RIGHT:
                this.angle = 0;
                break;
        }
    }

    moveToDirection(newDirection, source = "user") {
        if (!this.visible) {
            return false;
        }

        this.updateName();
        this.updateHealthbar();
        this.updateRank();

        if (this.isFacingDirection(newDirection, true)) {
            return false;
        }

        eventSystem().emit('player.change_direction:before', {
            player: this,
            source: source
        });

        this.direction = newDirection;
        this.setDirection(newDirection);
        this.resetVelocity();

        switch (this.direction) {
            case direction.TOP:
                this.body.velocity.y -= this.speed;
                break;
            case direction.BOTTOM:
                this.body.velocity.y += this.speed;
                break;
            case direction.LEFT:
                this.body.velocity.x -= this.speed;
                break;
            case direction.RIGHT:
                this.body.velocity.x += this.speed;
                break;
        }

        this.walkAnimation();

        eventSystem().emit('player.change_direction:after', {
            player: this,
            source: source
        });

    }

    isFacingDirection(direction, isMoving) {

        if (direction !== this.direction) {
            return false;
        }

        if (isMoving !== this.isMoving()) {
            return false;
        }

        return true;
    }

    isMoving() {
        return this.body.velocity.x !== 0 || this.body.velocity.y !== 0;
    }


    stopMoving(newDirection = false, source = "user") {
        if(newDirection){
            this.direction = newDirection;
        }

        if (this.isFacingDirection(this.direction, false)) {
            return false;
        }

        eventSystem().emit('player.stop_moving:before', {
            player: this,
            source: source
        });

        this.resetVelocity();
        this.animations.stop();
        this.frame = 0;

        eventSystem().emit('player.stop_moving:after', {
            player: this,
            source: source
        });

        return true;
    }

    resetVelocity() {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

    }

    damage(damage) {
        if (this.isDead() || !this.isVisible()) {
            return;
        }

        const newHealth = this.health - damage;

        this.setHealth(newHealth);
    }

    setHealth(health) {
        this.health = health;

        if (this.health > 0) {
            this.healthbar.scale.x = this.health / 100;
        } else {
            new Splatter(this.game, this.x, this.y, 'green_marine_dead');
            this.dead();
        }
    }

    dead() {
        new Splatter(this.game, this.x, this.y, 'green_marine_dead');
        this.visible = false;
        this.name.visible = false;
        this.healthbar.visible = false;
        this.rankSprite.visible = false;
        this.game.time.events.add(Phaser.Timer.SECOND * config.game.player.waitForRespawn, this.resetPlayer, this);

        eventSystem().emit('player_dead', {
           team: this.team.name
       });
    }

    resetPlayer() {
        this.reset(this.spawnPos.x, this.spawnPos.y);
        this.visible = true;
        this.name.visible = true;
        this.healthbar.visible = true;
        this.rankSprite.visible = true;
        this.health = 100;
        this.healthbar.scale.x = 1;
        this.updateName();
        this.updateHealthbar();
        this.updateRank();
        this.alpha = 0.2;
        this.game.time.events.add(Phaser.Timer.SECOND * config.game.player.invisible, this.endInvisible, this);
    }

    endInvisible() {
        this.alpha = 1;
    }

    addExp(amount) {

    }

    expFor(level) {
        return Math.round(10 + level * (Math.log(level) / Math.LN10));
    }

}
