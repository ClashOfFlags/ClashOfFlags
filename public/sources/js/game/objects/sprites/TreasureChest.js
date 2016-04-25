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

      this.bonus(player);


      var realoadTreasure = this.game.rnd.integerInRange(config.game.treasureChest.reloadTreasureMin, config.game.treasureChest.reloadTreasureMax);
      this.game.time.events.add(Phaser.Timer.SECOND * realoadTreasure, this.realoadTreasure, this);
    }
  }

  bonus(player) {
    var bonus = this.game.rnd.integerInRange(0, 2);

    if(bonus === 0){
      this.setAlienFor(player);
    }else if(bonus === 1){
      this.updateWeapon(player, 'fireball_red');
    }else {
      this.updateWeapon(player, 'fireball_red');
    }

  }

  setAlienFor(player) {
    player.getAlien();

    eventSystem().emit('player.alien', {
       player: player.number
    });
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
    this.updateStatus('full');
  }

}
