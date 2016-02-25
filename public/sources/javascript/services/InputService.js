export default class InputService {
    constructor(game) {
        this.game = game;

        this.inputs = {};

    }

    cursorKeys() {
        if (!this.inputs.cursorKeys) {
            this.inputs.cursorKeys =  this.game.input.keyboard.createCursorKeys();
        }


        return this.inputs.cursorKeys;
    }
}