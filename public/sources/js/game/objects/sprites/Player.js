import Sprite from './Sprite';
import direction from './../values/direction';
import Weapon from './../values/Weapon';
import config from '../../setup/config';
import Splatter from './Splatter';
import Flag from './Flag';

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
        this.flag = null;
        this.exp = 0;
        this.killStreak = 0;
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
      if(this.isAlien()){
        this.loadTexture(this.team.name+'_alien', 0, true);
      }else {
        this.loadTexture('player_'+this.team.name+'_'+this.playerSprite, 0, true);
      }

    }

    updateName() {
        this.name.x = this.x;
        this.name.y = this.y - this.height * 1.2;
    }

    updateHealthbar() {
        this.healthbar.x = this.x - this.width / 2;
        this.healthbar.y = this.y - this.height * 1.5;
    }

    showCarryingFlag() {
        //TODO: Show Flag sign next to player
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

        const rank = this.rank();
        const rankSpriteKey = 'rank' + rank;
        this.rankSprite = this.game.add.sprite(0, 0, rankSpriteKey);
        this.rankSprite.scale.x = 0.1;
        this.rankSprite.scale.y = 0.1;

        this.updateRank();
    }

    checkNewPlayerSprite() {
      const rank = this.rank();
      if(rank >= 0 && rank < 7){
        this.playerSprite = "pistol";
      }else if(rank >= 7 && rank < 14){
        this.playerSprite = "flamer";
      }else if(rank >= 14 && rank < 21){
        this.playerSprite = "rifle";
      }else if(rank >= 21 && rank < 28){
        this.playerSprite = "laser";
      }else if(rank >= 28 && rank < 35){
        this.playerSprite = "plasma";
      }else if(rank >= 35 && rank < 42){
        this.playerSprite = "pistol2";
      }else if(rank >= 42 && rank < 49){
        this.playerSprite = "flamer2";
      }else if(rank >= 49 && rank < 56){
        this.playerSprite = "rifle2";
      }else if(rank >= 56 && rank < 63){
        this.playerSprite = "laser2";
      }else if(rank >= 63 && rank < 70){
        this.playerSprite = "plasma2";
      }

      this.loadTexture('player_'+this.team.name+'_'+this.playerSprite, 0, true);
    }

    isAlien() {
      return this.alien === true;
    }

    getFlag(flag) {
        this.carryingFlag = true;
        this.flag = flag;
        this.addExp(4);
        this.showCarryingFlag();
        this.statEntry('flag.collected');
    }

    releaseFlag() {
        this.carryingFlag = false;
        this.flag.respawn();
        this.flag = null;
        this.addExp(10);
        this.statEntry('flag.captured');
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
            this.body.velocity.y = 0;
            this.body.velocity.x = 0;
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
            this.health = 0;
            this.dead();
        }
    }

    dead() {
        var splatterSprite = this.isAlien() ? this.team.name + '_alien_dead' : this.team.name + '_dead';
        new Splatter(this.game, this.x, this.y, splatterSprite);
        this.visible = false;
        this.name.visible = false;
        this.healthbar.visible = false;
        this.rankSprite.visible = false;
        this.killStreak = 0;
        this.carryingFlag = false;
        if(this.flag){
          this.flag.respawn();
        }

        if(this.isAlien()){
          this.resetAlien();
        }

        this.game.time.events.add(Phaser.Timer.SECOND * config.game.player.waitForRespawn, this.resetPlayer, this);

        eventSystem().emit('player_dead', {
           team: this.team.name
        });

        this.statEntry('player.dead', {x: this.x, y: this.y});
    }

    getAlien() {
      this.alien = true;
      this.speed = 600;
      this.loadTexture(player.team.name+'_alien', 0, true);
      this.weapon.updateWeapon(player, 'alien');
    }

    resetAlien() {
      this.speed = 400;
      this.alien = false;
      this.checkNewPlayerSprite();
      this.weapon.updateWeapon('fireball');
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

    setExp(exp) {
        const rankBefore = this.rank();
        this.exp = exp;
        const rankAfter = this.rank();
        const newRanks = rankAfter - rankBefore;

        if(newRanks > 0) {
            this.createRankSprite();
            if(!this.isAlien()){
              this.checkNewPlayerSprite();
            }
        }
    }

    addExp(amount) {
        this.setExp(this.exp + amount);

        eventSystem().emit('player.exp', {
            player: this,
            exp: this.exp
        });
    }

    rank() {
        for(let rank = 1; rank <= 75; rank++) {
            const maxExp = this.expFor(rank);

            if(this.exp < maxExp) {
                return rank;
            }
        }
    }

    expFor(rank) {
        return Math.round(10 + rank * rank * Math.log(rank));
    }

    killedPlayer() {
        this.killStreak++;

        const exp = this.expForKillStreak();

        this.addExp(exp);
    }

    expForKillStreak() {
        if(this.killStreak >= 5) {
            return 16;
        }

        switch(this.killStreak) {
            case 1: return 1;
            case 2: return 2;
            case 3: return 4;
            case 4: return 8;
            default: return 1;
        }
    }

    statEntry(key, options) {
        if(typeof options === 'undefined') options = {};

        console.log('send stat entry', {
            player: this,
            key: key,
            options: options,
            team: this.team.name
        });

        eventSystem().emit('stat.entry', {
            player: this,
            key: key,
            options: options,
            team: this.team.name
        });
    }

}
