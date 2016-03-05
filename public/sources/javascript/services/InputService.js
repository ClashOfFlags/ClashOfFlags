import direction from './../objects/values/direction';

export default class InputService {
    constructor(game) {
        this.game = game;

        this.inputs = {};

    }

    cursorKeys() {
        if (!this.inputs.cursorKeys) {
            this.inputs.cursorKeys = this.game.input.keyboard.createCursorKeys();
        }

        return this.inputs.cursorKeys;
    }

    wasd() {
        if (!this.inputs.wasd) {
            this.inputs.wasd = {
                up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
                down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
            };
        }

        return this.inputs.wasd;
    }

    space() {
      if (!this.inputs.space) {
          this.inputs.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      }

      return this.inputs.space;
    }

    applyToPlayer(player){
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;

      if (this.cursorKeys().up.isDown || this.wasd().up.isDown) {
        player.direction = direction.UP;
        player.body.velocity.y -= player.speed;
      }
      else if (this.cursorKeys().down.isDown || this.wasd().down.isDown) {
        player.direction = direction.BOTTOM
        player.body.velocity.y += player.speed;
      }
      else if (this.cursorKeys().left.isDown || this.wasd().left.isDown) {
        player.direction = direction.LEFT;
        player.body.velocity.x -= player.speed;
      }
      else if (this.cursorKeys().right.isDown || this.wasd().right.isDown) {
        player.direction = direction.RIGHT;
        player.body.velocity.x += player.speed;
      }else {

      }
  }
}
