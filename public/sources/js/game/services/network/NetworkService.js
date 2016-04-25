export default class NetworkService {

    constructor($container) {
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

        eventSystem().on('flag.getscollected', (payload) => {
            if (payload.source == "network") {
                return;
            }
            this.sendFlagCollected(payload);
        });

        eventSystem().on('player.exp', payload => {
            const player = payload.player;
            const hero = this.objects.get('hero');

            if(player !== hero) {
                return;
            }

            if(!this.authService.isLoggedIn()) {
                return;
            }

            this.sendExp(hero);
            this.answerWithExp();
        });

        eventSystem().on('stat.entry', payload => {
            const player = payload.player;
            const hero = this.objects.get('hero');

            if(player !== hero) {
                return;
            }

            this.statEntry(payload.key, payload.team);
        });

        eventSystem().on('login', () => {
            this.getExp();
        });
    }

    sendFlagCollected(flag) {
        const payload = {
            flag: flag
        };

        this.broadcast('FlagCollected', payload);
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
        if(!this.authService.isLoggedIn()) {
            return;
        }

        const token = this.authService.token();

        this.socket.emit('exp:get', { token: token }, exp => {
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

    statEntry(key, team) {
        this.socket.emit('stat-entry', {
            key: key,
            team: team
        });
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

        this.objects.get('points.red').setText(event.redTickets + '/300');
        this.objects.get('points.blue').setText(event.blueTickets + '/300');
        this.getExp();
        this.askForExp();
    }

    onFlagCollected(event) {
        var flagObject = this.objects.get('flags.' + event.flag);
        flagObject.collected = true;
        flagObject.visible = false;

        const player = this.teamManager.findPlayer(event.player);
        player.getFlag(this);
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

    onTreasureChestStatus(payload){
      this.objects.get('treasureChest.' + payload.id).setStatus(payload.newStatus);
    }

    onPlayerUpdateWeapon(payload){
      const player = this.teamManager.findPlayer(payload.player);
      player.weapon.updateWeapon(payload.newWeapon);
    }

    onPlayerAlien(payload){
      const player = this.teamManager.findPlayer(payload.player);
      player.getAlien();
    }

    onPlayerDamage(event) {
        const player = this.teamManager.findPlayer(event.player);

        player.setHealth(event.health);
    }

    onAnswerWithExp(event) {
        const player = this.teamManager.findPlayer(event.player);

        player.setExp(event.exp);
    }

}
