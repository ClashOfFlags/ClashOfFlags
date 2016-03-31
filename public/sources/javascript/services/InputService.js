import direction from './../objects/values/direction';

export default class InputService {

    constructor(game, $container) {
        this.game = game;
        this.network = $container.NetworkService;
        this.objects = $container.ObjectsService;
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

        if (this.cursorKeys().up.isDown || this.wasd().up.isDown) {
            player.moveToDirection(direction.TOP);
            if(this.objects.get("moveHint").alpha === 1){
              var tween = this.game.add.tween(this.objects.get("moveHint")).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
            }
        }
        else if (this.cursorKeys().down.isDown || this.wasd().down.isDown) {
            player.moveToDirection(direction.BOTTOM);
            if(this.objects.get("moveHint").alpha === 1){
              var tween = this.game.add.tween(this.objects.get("moveHint")).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
            }
        }
        else if (this.cursorKeys().left.isDown || this.wasd().left.isDown) {
            player.moveToDirection(direction.LEFT);
            if(this.objects.get("moveHint").alpha === 1){
              var tween = this.game.add.tween(this.objects.get("moveHint")).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
            }
        }
        else if (this.cursorKeys().right.isDown || this.wasd().right.isDown) {
            player.moveToDirection(direction.RIGHT);
            if(this.objects.get("moveHint").alpha === 1){
              var tween = this.game.add.tween(this.objects.get("moveHint")).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
            }
        } else {
            const wasMoving = player.isMoving();

            player.stopMoving();

            if(wasMoving) {
                this.network.sendPosition(player);
            }
        }
    }

}
