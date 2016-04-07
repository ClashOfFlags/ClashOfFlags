import Sprite from './Sprite';
import config from '../../setup/config';

export default class Bullet extends Sprite {

    boot() {
        this.enableArcadePhysics();
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.power = config.game.weapons[this.key].power;

        this.game.time.events.add(Phaser.Timer.SECOND * config.game.weapons[this.key].lifetime, this.killBullet, this);
    }

    setTeam(team) {
        this.team = team;
    }

    setShooter(shooter) {
        this.shooter = shooter;
    }

    setWeapon(weapon) {
        this.weapon = weapon;
    }

    isShooter(player) {
        return player === this.shooter;
    }

    killBullet() {
        this.kill();
    }

}
