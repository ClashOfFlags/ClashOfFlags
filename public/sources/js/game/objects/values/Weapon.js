import Bullet from '../sprites/Bullet';
import direction from './direction';
import config from '../../setup/config';

export default class Weapon {
    constructor(player, game) {
        this.game = game;
        this.player = player;
        this.weapon = 'fireball';
        this.munition = 1;
        this.nextShotAt = Date.now() + config.game.weapons[this.weapon].shotDelay;

        this.currentWeapon();

    }

    currentWeapon() {
      this.weaponSprite = this.game.add.sprite(30, 20, this.weapon);
      this.weaponSprite.animations.add(this.weapon, Phaser.Animation.generateFrameNames(this.weapon + '_000', 1, 6), 60, true);
      this.weaponSprite.animations.play(this.weapon);
      this.weaponSprite.anchor.setTo(0.5, 0.5);
      this.weaponSprite.angle = 90;
      this.weaponSprite.scale.x = 0.7;
      this.weaponSprite.scale.y = 0.7;
      this.weaponSprite.fixedToCamera = true;
    }

    updateWeapon(newWeapon) {
      this.weapon = newWeapon;

      if(newWeapon === "fireball_red") {
        this.munition = 20;
      }
    }

    shoot(overwriteDirection = null) {
        if (this.nextShotAt > Date.now()) {
            return;
        }

        var shootDirection = (overwriteDirection) ? overwriteDirection : this.player.direction;

        this.nextShotAt = Date.now() + config.game.weapons[this.weapon].shotDelay;

        this.player.loadTexture('player_'+this.player.team.name+'_'+this.player.playerSprite+'_shoot', 0, true);
        this.game.time.events.add(Phaser.Timer.SECOND * 0.2, this.player.stopShooting, this.player);

        var bullet = new Bullet(this.game, this.player.body.center.x, this.player.body.center.y, this.weapon);
        bullet.setTeam(this.player.team);
        bullet.setShooter(this.player);
        bullet.setWeapon(this.weapon);
        bullet.animations.add(this.weapon, Phaser.Animation.generateFrameNames(this.weapon + '_000', 1, 6), 60, true);
        bullet.animations.play(this.weapon);
        bullet.anchor.setTo(0.5, 0.5);

        if (shootDirection === direction.BOTTOM) {
            bullet.body.velocity.y = config.game.weapons[this.weapon].bulletSpeed;
            bullet.angle = 180;
        } else if (shootDirection === direction.TOP) {
            bullet.angle = 0;
            bullet.body.velocity.y = -config.game.weapons[this.weapon].bulletSpeed;
        } else if (shootDirection === direction.RIGHT) {
            bullet.angle = 90;
            bullet.body.velocity.x = config.game.weapons[this.weapon].bulletSpeed;
        } else if (shootDirection === direction.LEFT) {
            bullet.angle = -90;
            bullet.body.velocity.x = -config.game.weapons[this.weapon].bulletSpeed;
        }

        this.player.bulletsShot++;

        eventSystem().emit('bullet.shoot', {
           bullet: bullet
       });

       if(this.munition > 1) {
         this.munition--;

         if(this.munition <= 1) {
           this.sendUpdateWeapon('fireball');
         }
       }

       console.log('munition', this.munition);
    }

    sendUpdateWeapon(weapon, source = "user") {
      this.updateWeapon(weapon);

      eventSystem().emit('player.updateWeapon', {
         player: this.player.number,
         newWeapon: weapon,
         source: source
      });
    }
}
