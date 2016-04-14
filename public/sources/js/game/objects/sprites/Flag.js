import Sprite from './Sprite';
import config from '../../setup/config';


export default class Flag extends Sprite{
    boot() {
        this.enableArcadePhysics();
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.spawnx = 0;
        this.spawny = 0;

        this.team = 'none';
        this.collected = false;

    }

    collectFlag(player, source = "user") {
        if(player.team.name != this.team && player.carryingFlag == false && this.collected == false) {
            this.collected = true;
            this.visible = false;
            player.getFlag(this);
        }

        eventSystem().emit('flag.getscollected', {
            flag: this.team,
            source: source
        });

    }

    respawn() {
        this.collected = false;
        this.reset(this.spawnx, this.spawny);
    }

    setTeam(team) {
        this.team = team;
    }

    setSpawn(x, y) {
        this.spawnx = x;
        this.spawny = y;
    }

}
