import Sprite from './Sprite';
import config from '../../setup/config';


export default class TreasureChest extends Sprite{
  boot() {
    this.enableArcadePhysics();
    this.body.immovable = true;
    this.setStatus('full');
  }

  setStatus(newStatus) {
    this.status = newStatus;
    this.loadTexture('treasureChest_' + this.status, 0, true);
  }

  setID(id){
    this.id = id;
  }

  collect(player){
    if(this.status === 'full'){

      this.updateStatus('empty');
       this.updateWeapon(player, 'fireball_red');

      var realoadTreasure = this.game.rnd.integerInRange(config.game.treasureChest.reloadTreasureMin, config.game.treasureChest.reloadTreasureMax);
      this.game.time.events.add(Phaser.Timer.SECOND * realoadTreasure, this.realoadTreasure, this);
    }
  }

  updateStatus(status, source = "user") {
    this.setStatus(status);

    eventSystem().emit('treasureChest.newStatus', {
      id: this.id,
      newStatus: this.status,
      source: source
    });
  }

  updateWeapon(player, weapon, source = "user") {
    player.weapon.updateWeapon(weapon);

    eventSystem().emit('player.updateWeapon', {
       player: player.number,
       newWeapon: weapon,
       source: source
    });
  }

  realoadTreasure() {
    this.updateStatus('empty');
  }

}
