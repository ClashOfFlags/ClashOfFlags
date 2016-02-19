var game = game || {};

var player, cursors, cups, keys = {};

game = new Phaser.Game(600, 400, Phaser.AUTO, '');

game.state.add('Game', {
    preload: function(){

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.load.image('test', '../tutorial/2d-topdown/assets/images/player.png');
        game.load.image('cup', '../tutorial/2d-topdown/assets/images/bluecup.png');
    },
    create: function(){
        player = game.add.sprite(10,10,'test');
        game.physics.arcade.enable(player);

        player.body.collideWorldBounds = true;

        keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        game.input.onDown.add(function(){
            var cup = cups.getFirstDead();

            cup.reset(player.body.x, player.body.y);
            game.physics.arcade.moveToPointer(cup, 300);

        });

        cups = game.add.group();
        cups.enableBody = true;
        cups.physicsBodyType = Phaser.Physics.ARCADE;

        cups.createMultiple(50, 'cup');
        cups.setAll('checkWorldBounds', true);
        cups.setAll('outOfBoundsKill', true);

        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.One);

        cursors = this.game.input.keyboard.createCursorKeys();
    },
    update: function(){
        player.body.velocity.x = 0;


        game.input.enabled = true;

        if(cursors.up.isDown) {
            if(player.body.velocity.y == 0)
                player.body.velocity.y -= 50;
        }
        else if(cursors.down.isDown) {
            if(player.body.velocity.y == 0)
                player.body.velocity.y += 50;
        }
        else {
            player.body.velocity.y = 0;
        }
        if(cursors.left.isDown) {
            player.body.velocity.x -= 50;
        }
        else if(cursors.right.isDown) {
            player.body.velocity.x += 50;
        }




    }
});
game.state.start('Game');