import config from '../../setup/config';

export default class NetworkService {

    constructor(game, $container) {
        this.game = game;
        this.$container = $container;
        this.objects = $container.ObjectsService;
        this.playerFactory = $container.PlayerFactory;
        this.teamManager = $container.TeamManager;
        this.authService = $container.AuthService;
        this.socket = io();

        this.registerEvents();
    }

    registerEvents() {
        this.registerEvent('RoomJoinEvent', this.onRoomJoin);
        this.registerEvent('PlayerPositionEvent', this.onPlayerPosition);
        this.registerEvent('PlayerShootEvent', this.onPlayerShoot);
        this.registerEvent('TreasureChestStatusEvent', this.onTreasureChestStatus);
        this.registerEvent('PlayerUpdateWeaponEvent', this.onPlayerUpdateWeapon);
        this.registerEvent('PlayerAlienEvent', this.onPlayerAlien);
        this.registerEvent('PlayerDamageEvent', this.onPlayerDamage);
        this.registerEvent('AskForExp', this.answerWithExp);
        this.registerEvent('AnswerWithExp', this.onAnswerWithExp);
        this.registerEvent('FlagCollected', this.onFlagCollected);
        this.registerEvent('TicketsChangedEvent', this.onTicketsChanged);
        this.registerEvent('FlagsChangedEvent', this.onFlagsChanged);
        this.registerEvent('ReleaseFlagEvent', this.onReleaseFlag);

        eventSystem().on('bullet.shoot', (payload) => {
            this.objects.get('bulletGroup').add(payload.bullet);
        });

        eventSystem().on('treasureChest.newStatus', (payload) => {
            if (payload.source == "network") {
                return;
            }
            this.sendTreasureChestStatus(payload);
        });

        eventSystem().on('player.updateWeapon', (payload) => {
            if (payload.source == "network") {
                return;
            }
            this.sendPlayerUpdateWeapon(payload);
        });

        eventSystem().on('player.alien', (payload) => {
            this.sendPlayerAlien(payload);
        });

        eventSystem().on('player_dead', (payload) => {
            this.sendPlayerDead(payload.team);
        });

        eventSystem().on('flag_captured', payload => {
            this.sendFlagCaptured(payload.player, payload.team);
        });

        eventSystem().on('player.change_direction:after', (payload) => {
            console.log(' ' + payload.source);
            if (payload.source == "network") {
                return;
            }

            this.sendPosition(payload.player);
        });

        eventSystem().on('player.stop_moving:after', (payload) => {
            if (payload.source == "network") {
                return;
            }

            this.sendPosition(payload.player);
        });

        eventSystem().on('flag.getscollected', (payload) => {
            if (payload.source == "network") {
                return;
            }
            this.sendFlagCollected(payload);
        });

        eventSystem().on('player.exp', payload => {
            const player = payload.player;
            const hero = this.objects.get('hero');

            if (player !== hero) {
                return;
            }

            if (!this.authService.isLoggedIn()) {
                return;
            }

            this.sendExp(hero);
            this.answerWithExp();
        });

        eventSystem().on('stat.entry', payload => {
            const player = payload.player;
            const hero = this.objects.get('hero');

            if (player !== hero) {
                return;
            }

            this.statEntry(payload.key, payload.team, payload.options);
        });

        eventSystem().on('login', () => {
            this.getExp();
        });
    }

    sendFlagCollected(payload) {
        this.broadcast('FlagCollected', payload);
    }

    connect() {
        const data = {};
        const targetRoomId = this.targetRoomId();

        if (targetRoomId) {
            data.targetRoomId = targetRoomId;

            console.log('Trying to join target room with id ' + targetRoomId);
        }

        this.emit('PlayerConnectEvent', data);
    }

    /* Convenience Functions */
    emit(event, data) {
        this.socket.emit(event, data);
    }

    broadcast(event, data) {
        const payload = {
            event: event,
            data: data
        };

        this.socket.emit('broadcast', payload);
    }

    registerEvent(event, callback) {
        this.socket.on(event, callback.bind(this));
    }

    /* Convenience Functions */

    /* Send Functions */
    sendPosition(player) {
        const payload = {
            player: player.number,
            x: player.x,
            y: player.y,
            direction: player.direction,
            moving: player.isMoving()
        };

        this.broadcast('PlayerPositionEvent', payload);
    }

    sendShoot(player) {
        const payload = {
            player: player.number,
            direction: player.direction
        };

        console.log('sendShoot', payload);
        this.broadcast('PlayerShootEvent', payload);
    }

    sendTreasureChestStatus(payload) {
        this.broadcast('TreasureChestStatusEvent', payload);
    }

    sendPlayerUpdateWeapon(payload) {
        this.broadcast('PlayerUpdateWeaponEvent', payload);
    }

    sendPlayerAlien(payload) {
        this.broadcast('PlayerAlienEvent', payload);
    }

    sendDamage(player, damage) {
        const payload = {
            player: player.number,
            health: player.health,
            damage: damage
        };

        console.log('sendDamage', payload);
        this.broadcast('PlayerDamageEvent', payload);
    }

    sendExp(player) {
        const token = this.authService.token();
        const payload = {
            token: token,
            exp: player.exp
        };

        console.log('sendExp', payload);
        this.emit('exp:set', payload);
    }

    getExp() {
        if (!this.authService.isLoggedIn()) {
            return;
        }

        const token = this.authService.token();

        this.socket.emit('exp:get', {token: token}, exp => {
            const hero = this.objects.get('hero');

            hero.setExp(exp);
            this.answerWithExp();
        });
    }

    askForExp() {
        this.broadcast('AskForExp');
    }

    answerWithExp() {
        const hero = this.objects.get('hero');

        this.broadcast('AnswerWithExp', {
            player: hero.number,
            exp: hero.exp
        });
    }

    statEntry(key, team, options) {
        this.emit('stat-entry', {
            key: key,
            team: team,
            options: options
        });
    }

    sendPlayerDead(team) {
        this.emit('PlayerDeadEvent', {team: team});
    }

    sendFlagCaptured(player, team) {
        this.emit('FlagCapturedEvent', {team: team}); // for the server
        this.broadcast('ReleaseFlagEvent', {player: player.slot}); // for the other clients
    }

    /* Send Functions */

    /* Receive Functions */
    onRoomJoin(event) {
        const networkPlayer = {
            id: event.playerId,
            slot: event.slot
        };

        eventSystem().emit('network.handshake:before', networkPlayer);

        const player = this.teamManager.allPlayers()[networkPlayer.slot];
        this.teamManager.hero = player;

        eventSystem().emit('network.handshake:after', {
            hero: player
        });

        const roomId = event.roomId;
        const targetRoomId = this.targetRoomId();

        console.log('Joined room ' + roomId);

        if (targetRoomId && roomId !== targetRoomId) {
            console.log('Given room id ' + roomId + ' does not match ' + targetRoomId + ', target room seems to be full or closed.');
            toastr.warning('You have joined a different room', 'Target room was full or has been closed');
        }

        const newUrl = window.location.origin + window.location.pathname + '?room=' + roomId;

        window.history.pushState({path: newUrl}, '', newUrl);

        this.teamManager.maxTickets = event.maxTickets;

        this.teamManager.updateTickets(event.redTickets, event.blueTickets);
        this.teamManager.updateFlags(event.redFlags, event.blueFlags);
        this.getExp();
        this.askForExp();
    }

    onFlagCollected(event) {
        console.log('onFlagCollected', event);
        var flagObject = this.objects.get('flags.' + event.flag);
        flagObject.collected = true;
        flagObject.visible = false;
        const flag = flagObject.children[0];
        const player = this.teamManager.findPlayer(event.player);

        player.getFlag(flag);
    }

    onReleaseFlag(event) {
        const player = this.teamManager.findPlayer(event.player);

        player.releaseFlag();
    }

    onPlayerPosition(event) {
        console.log('onPlayerPosition', event);

        const player = this.teamManager.findPlayer(event.player);

        if (!player) {
            console.warn('Player number ' + event.player + ' not found yet!');
            return;
        }

        if (player.number == this.teamManager.hero.number) {
            console.error('Reposition the hero. ', player.number, this.teamManager.hero.number);
            return;
        }

        player.x = event.x;
        player.y = event.y;

        if (event.moving) {
            player.moveToDirection(event.direction, "network");
        }
        else
            player.stopMoving(event.direction, "network");

    }

    onPlayerShoot(event) {
        const player = this.teamManager.findPlayer(event.player);

        if (!player) {
            console.warn('Player number ' + event.player + ' not found yet!');
            return;
        }

        player.shoot(event.direction);
    }

    onTreasureChestStatus(payload) {
        this.objects.get('treasureChest.' + payload.id).setStatus(payload.newStatus);
    }

    onPlayerUpdateWeapon(payload) {
        const player = this.teamManager.findPlayer(payload.player);
        player.weapon.updateWeapon(payload.newWeapon);
    }

    onPlayerAlien(payload) {
        const player = this.teamManager.findPlayer(payload.player);
        player.getAlien();
    }

    onRemoveFlagFromStatusBar(payload) {
        console.log("onRemoveFlagFromStatusBar", payload);
        this.objects.get(payload.flag).visible = false;
        if (payload.gameOver) {
            this.game.input.enabled = false;
            this.game.physics.arcade.isPaused = true;
            this.objects.get('gameOverText').setText('Game Over!\n ' + payload.color + ' wins the game!');
            this.objects.get('gameOverText').visible = true;
            this.game.time.events.add(Phaser.Timer.SECOND * config.game.reloadPage.wait, this.reloadPage, this);
        }
    }

    reloadPage() {
        window.location.reload();
    }

    onPlayerDamage(event) {
        const player = this.teamManager.findPlayer(event.player);

        player.setHealth(event.health);
    }

    onAnswerWithExp(event) {
        const player = this.teamManager.findPlayer(event.player);

        player.setExp(event.exp);
    }

    onTicketsChanged(event) {
        console.log('onTicketsChanged', event);
        this.teamManager.updateTickets(event.redTickets, event.blueTickets);
    }

    onFlagsChanged(event) {
        console.log('onFlagsChanged', event);
        this.teamManager.updateFlags(event.redFlags, event.blueFlags);
    }

    targetRoomId() {
        const search = window.location.search;
        const searchSplit = search.split('=');

        if (searchSplit.length !== 2) {
            return null;
        }

        return searchSplit[1];
    }

}
