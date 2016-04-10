import Sprite from './Sprite';
import config from '../../setup/config';


export default class TreasureChest extends Sprite{
  boot() {
    this.enableArcadePhysics();
    this.body.immovable = true;
    this.status = 'full';
  }

  setStatus(newStatus) {
    this.status = newStatus;
    this.loadTexture('treasureChest_' + this.status, 0, true);
  }

  collect(player){
    if(this.status === 'full'){
      this.status = 'empty';
      this.loadTexture('treasureChest_' + this.status, 0, true);
      player.weapon.updateWeapon('fireball_red');

        eventSystem().emit('treasureChest.newStatus', {
           treasureChest: this,
           newStatus: this.status
       });


      var realoadTreasure = this.game.rnd.integerInRange(config.game.treasureChest.reloadTreasureMin, config.game.treasureChest.reloadTreasureMax);
      this.game.time.events.add(Phaser.Timer.SECOND * realoadTreasure, this.realoadTreasure, this);
    }
  }

  realoadTreasure() {
    this.status = 'full';
    this.loadTexture('treasureChest_' + this.status, 0, true);
  }

}
