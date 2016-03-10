import Sprite from './Sprite';
import config from '../../setup/config';


export default class Flag extends Sprite{
    boot() {
        this.enableArcadePhysics();
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;

        this.team = 'none';

    }

    collectFlag(player) {
        if(player.team.name != this.team && player.carryingFlag == false) {
            this.kill();
            player.getFlag();
        }
    }

    setTeam(team) {
        this.team = team;
    }

}
