export default class Updater {

    constructor(game, $container) {
        this.game = game;
        this.$container = $container;
        this.inputs = $container.InputService;
        this.objects = this.$container.ObjectsService;
        this.network = $container.NetworkService;
        this.teamManager = $container.TeamManager;
    }

    readObjects() {
        this.obstacleLayer = this.objects.get('obstacleLayer');
        this.waterLayer = this.objects.get('waterLayer');
        this.obstacleLayer = this.objects.get('obstacleLayer');
        this.flagRedGroup = this.objects.get('flags.red');
        this.flagBlueGroup = this.objects.get('flags.blue');
        this.barrels = this.objects.get('barrels');
        this.player = this.objects.get('hero');
        this.playerGroup = this.objects.get('playerGroup');
        this.bulletGroup = this.objects.get('bulletGroup');
    }

    isHero(player) {
        return player === this.player;
    }

    run() {

        this.readObjects();

        if (!this.player)
            return;

        this.updateCollide();
        this.updatePlayerPosition();
        this.updateMiniMap();
    }

    updatePlayerPosition() {
        this.inputs.applyToPlayer(this.player);
    }

    updateMiniMap() {
        this.miniMapOverlay = this.objects.get('miniMapOverlay');
        this.miniMapSize = this.objects.get('miniMapSize');

        this.miniMapOverlay.context.clearRect(0, 0, this.miniMapOverlay.width, this.miniMapOverlay.height);

        for (var i = 0; i < this.teamManager.teams[this.player.team.name].players.length; i++) {
            var teamPlayer = this.teamManager.teams[this.player.team.name].players[i];
            var color = '#0AFF12';

            if (teamPlayer === this.player) {
                color = '#FFFF00';
            }

            this.miniMapOverlay.rect(
                Math.floor(teamPlayer.x / 64) * this.miniMapSize,
                Math.floor(teamPlayer.y / 64) * this.miniMapSize,
                this.miniMapSize * 2, this.miniMapSize * 2, color);
            this.miniMapOverlay.dirty = true;
        }
    }

    updateCollide() {
        this.game.physics.arcade.collide(this.playerGroup, this.obstacleLayer);
        this.game.physics.arcade.collide(this.playerGroup, this.waterLayer);
        this.game.physics.arcade.collide(this.playerGroup, this.barrels);
        this.game.physics.arcade.collide(this.player, this.playerGroup, this.playerHitPlayer, null, this);
        this.game.physics.arcade.overlap(this.playerGroup, this.flagRedGroup, this.playerCollectsFlag, null, this);
        this.game.physics.arcade.overlap(this.playerGroup, this.flagBlueGroup, this.playerCollectsFlag, null, this);

        this.game.physics.arcade.overlap(this.bulletGroup, this.barrels, this.bulletHitBarrel, null, this);
        this.game.physics.arcade.collide(this.bulletGroup, this.obstacleLayer, this.bulletHitObstacle, null, this);
        this.game.physics.arcade.overlap(this.bulletGroup, this.playerGroup, this.bulletHitPlayer, null, this);

        this.game.physics.arcade.collide(this.barrels, this.obstacleLayer);
        this.game.physics.arcade.collide(this.playerGroup, this.obstacleLayer);
    }

    bulletHitBarrel(bullet, barrel) {
        this.bulletHitObstacle(bullet);
        barrel.kill();

        this.createExplosionAnimation({
            x: barrel.x,
            y: barrel.y - barrel.height,
            key: 'flame_a',
            frameName: 'flame_a_000',
            frameNameMax: 6,
            frameSpeed: 60,
            repeat: false,
            scale: 0.4
        });

        if(!this.isHero(bullet.shooter)) {
            return;
        }

        const players = this.teamManager.allPlayers();

        _.forIn(players, player => {
            const distanceToBarrel = this.game.physics.arcade.distanceBetween(barrel, player);
            const barrelMaxRange = barrel.barrel.maxRange;

            if(distanceToBarrel > barrelMaxRange) {
                return;
            }

            const damage = Math.round((1 - (distanceToBarrel - 90) / barrelMaxRange) * barrel.barrel.maxDamage);

            player.damage(damage);
            this.network.sendDamage(player, damage);
        });
    }

    createExplosionAnimation(data) {
        var sprite = this.game.add.sprite(data.x, data.y, data.key);
        sprite.anchor.setTo(0.5, 0.5);
        sprite.scale.x = data.scale;
        sprite.scale.y = data.scale;
        sprite.animations.add('animation', Phaser.Animation.generateFrameNames(data.frameName, 1, data.frameNameMax), data.frameSpeed, data.repeat);
        sprite.animations.play('animation');

        sprite.events.onAnimationComplete.add(function () {
            sprite.kill();
        }, this);
    }

    playerHitPlayer(ownPlayer, otherPlayer) {
        otherPlayer.body.moves = false;
    }

    bulletHitObstacle(bullet) {
        this.createExplosionAnimation({
            x: bullet.x,
            y: bullet.y,
            key: 'fireball_hit',
            frameName: 'fireball_hit_000',
            frameNameMax: 9,
            frameSpeed: 100,
            repeat: false,
            scale: 1
        });
        bullet.kill();
    }

    bulletHitPlayer(bullet, player) {
        if (player === bullet.shooter || !player.isVisible()) {
            return;
        }

        this.createExplosionAnimation({
            x: bullet.x,
            y: bullet.y,
            key: 'fireball_hit',
            frameName: 'fireball_hit_000',
            frameNameMax: 9,
            frameSpeed: 100,
            repeat: false,
            scale: 1
        });

        bullet.kill();

        if(bullet.team.name === player.team.name) {
            return;
        }

        player.damage(bullet.power);

        if(this.isHero(bullet.shooter)) {
            this.network.sendDamage(player, bullet.power);
        }
    }

    playerCollectsFlag(player, flag) {
        flag.collectFlag(player);
    }

}
