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
    
    applyToPlayer(player){
        if (this.cursorKeys().up.isDown || this.wasd().up.isDown) {
            if (player.body.velocity.y == 0)
                player.body.velocity.y -= player.getSpeed();
        }
        else if (this.cursorKeys().down.isDown || this.wasd().down.isDown) {
            if (player.body.velocity.y == 0)
                player.body.velocity.y += player.getSpeed();
        }
        else {
            player.body.velocity.y = 0;
        }
        if (this.cursorKeys().left.isDown || this.wasd().left.isDown) {
            player.body.velocity.x -= player.getSpeed();
        }
        else if (this.cursorKeys().right.isDown || this.wasd().right.isDown) {
            player.body.velocity.x += player.getSpeed();
        }

    }
}