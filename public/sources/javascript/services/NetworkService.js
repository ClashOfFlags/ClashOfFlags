export default class NetworkService {

    constructor($container) {
        this.$container = $container;
        this.objects = $container.ObjectsService;
        this.playerFactory = $container.PlayerFactory;
        this.teamManager = $container.TeamManager;
        this.socket = io();

        this.waitForHandshake = function(){

        };

        this.registerEvents();
    }

    registerEvents() {
        this.registerEvent('PlayerHandshakeEvent', this.onPlayerHandshake);
        this.registerEvent('PlayerPositionEvent', this.onPlayerPosition);
        this.registerEvent('PlayerShootEvent', this.onPlayerShoot);
        this.registerEvent('PlayerDamageEvent', this.onPlayerDamage);
    }

    connect() {
        this.emit('PlayerConnectEvent');
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

    debug(message, data = '') {
        console.log('[NetworkService]', message, data);
    }
    /* Convenience Functions */

    /* Send Functions */
    sendPosition(player) {
        const payload = {
            player: player.number,
            x: player.x,
            y: player.y,
            direction: player.direction
        };

        this.debug('sendPosition', payload);
        this.broadcast('PlayerPositionEvent', payload);
    }

    sendShoot(player) {
        const payload = {
            player: player.number,
            direction: player.direction
        };

        this.debug('sendShoot', payload);
        this.broadcast('PlayerShootEvent', payload);
    }

    sendDamage(player, damage) {
        const payload = {
            player: player.number,
            health: player.health,
            damage: damage
        };

        this.debug('sendDamage', payload);
        this.broadcast('PlayerDamageEvent', payload);
    }
    /* Send Functions */

    /* Receive Functions */
    onPlayerHandshake(networkPlayer) {
        this.debug('onPlayerHandshake', networkPlayer);

        const player = this.teamManager.allPlayers()[networkPlayer.slot];
        this.teamManager.hero = player;
        this.waitForHandshake(player);
    }

    onPlayerPosition(event) {
        this.debug('onPlayerPosition', event);

        const player = this.teamManager.findPlayer(event.player);
        player.x = event.x;
        player.y = event.y;

        player.setDirection(event.direction);
        player.updateName();
    }

    onPlayerShoot(event) {
        this.debug('onPlayerShoot', event);

        const player = this.teamManager.findPlayer(event.player);

        player.shoot(event.direction);

    }

    onPlayerDamage(event) {
        this.debug('onPlayerDamage', event);

        const player = this.teamManager.findPlayer(event.player);

        player.setHealth(event.health);
    }
    /* Receive Functions */

}
