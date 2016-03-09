export default class NetworkService {

    constructor($container) {
        this.$container = $container;
        this.objects = $container.ObjectsService;
        this.playerFactory = $container.PlayerFactory;
        this.teamManager = $container.TeamManager;
        this.socket = io();
        this.player = null;
        this.players = {}; // workaround, should not be here I guess

        this.waitForHandshake = function(){

        }
    }

    init() {
        this.socket.on('PlayerConnectEvent', player => {
            this.onPlayerConnect(player);
        });

        this.socket.on('PlayerDisconnectEvent', player => {
            this.onPlayerDisconnect(player);
        });

        this.socket.on('PlayerPositionEvent', player => {
            this.onPlayerPosition(player);
        });

        this.socket.on('PlayerShootEvent', data => {
            this.onPlayerShoot(data);
        });

        this.socket.on('PlayerHandshakeEvent', player => {
            this.onPlayerHandshake(player);
        });

        this.connect();
    }

    connect() {
        console.log('connect network');
        this.socket.emit('PlayerConnectEvent');
    }

    onPlayerHandshake(networkPlayer) {
        const player = this.teamManager.allPlayers()[networkPlayer.slot];
        this.teamManager.hero = player;
        this.waitForHandshake(player);
    }


    onPlayerConnect(networkPlayer) {
        this.players[networkPlayer.id] = this.teamManager.allPlayers()[networkPlayer.slot];
    }

    onPlayerDisconnect(networkPlayer) {
        const playerSprite = this.players[networkPlayer.id];

        if (playerSprite) {
            playerSprite.kill();
            playerSprite.name.kill();
        }
    }

    onPlayerPosition(networkPlayer) {
        console.log('move player', networkPlayer.id);

        const playerSprite = this.players[networkPlayer.id];
        playerSprite.x = networkPlayer.position.x;
        playerSprite.y = networkPlayer.position.y;
        //playerSprite.direction = networkPlayer.position.direction;

        playerSprite.updateName();
    }

    onPlayerShoot(data) {
        var player = this.teamManager.allPlayers()[data.slot];

        console.log('shoot over network', data);
        player.shoot(data.direction);

    }

    sendPosition(player) {
        var position = {
            direction:player.direction,
            x: player.x,
            y: player.y
        };

        this.socket.emit('PlayerPositionEvent', position);
    }

    sendShoot(player) {
        var data = {
            direction:player.direction,
            x: player.x,
            y: player.y
        };

        console.log('send shoot', data);


        this.socket.emit('PlayerShootEvent', data);
    }

}
