export default class NetworkService {

    constructor($container) {
        this.$container = $container;
        this.objects = $container.ObjectsService;
        this.playerFactory = $container.PlayerFactory;
        this.teamManager = $container.TeamManager;
        this.socket = io();

        this.registerEvents();
    }

    registerEvents() {
        this.registerEvent('PlayerHandshakeEvent', this.onPlayerHandshake);
        this.registerEvent('PlayerPositionEvent', this.onPlayerPosition);
        this.registerEvent('PlayerShootEvent', this.onPlayerShoot);
        this.registerEvent('PlayerDamageEvent', this.onPlayerDamage);

        eventSystem().on('bullet.shoot', (payload) => {
            this.objects.get('bulletGroup').add(payload.bullet);
        });

         eventSystem().on('player_dead', (payload) => {
              this.teamManager.teams[payload.team].points--;
              this.objects.get('points.' + payload.team).setText(this.teamManager.teams[payload.team].points + '/' + this.teamManager.maxPoints);
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

    sendDamage(player, damage) {
        const payload = {
            player: player.number,
            health: player.health,
            damage: damage
        };

        console.log('sendDamage', payload);
        this.broadcast('PlayerDamageEvent', payload);
    }

    /* Send Functions */

    /* Receive Functions */
    onPlayerHandshake(networkPlayer) {
        eventSystem().emit('network.handshake:before', networkPlayer);

        const player = this.teamManager.allPlayers()[networkPlayer.slot];
        this.teamManager.hero = player;

        eventSystem().emit('network.handshake:after', {
            hero: player
        });
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

    onPlayerDamage(event) {
        const player = this.teamManager.findPlayer(event.player);

        player.setHealth(event.health);
    }

}
