import Sprite from './Sprite';
import config from '../../setup/config';


export default class Base extends Sprite{
    boot() {
        this.enableArcadePhysics();
        this.body.immovable = true;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.team = 'none';
    }

    setTeam(team) {
        this.team = team;
    }

}
