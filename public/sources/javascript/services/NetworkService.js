export default class NetworkService {

    constructor($container) {
        this.$container = $container;
        this.objects = $container.ObjectsService;
        this.playerFactory = $container.PlayerFactory;
        this.teamManager = $container.TeamManager;
        this.socket = io();
        this.player = null;
        this.players = {}; // workaround, should not be here I guess
    }

    init() {
        this.connect();

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
    }

    connect() {
        this.socket.emit('PlayerConnectEvent');
    }

    onPlayerConnect(player) {
        const playerStartPos = this.objects.byType('spawn', 'objectsLayer');
        const playerSprite = this.playerFactory
            .position(playerStartPos[0])
            .team(this.teamManager.teams.red)
            .key('player')
            .number(11 + player.id)
            .make();

        this.players[player.id] = playerSprite;
    }

    onPlayerDisconnect(player) {
        const playerSprite = this.players[player.id];

        if (playerSprite) {
            playerSprite.kill();
        }
    }

    onPlayerPosition(player) {
        const playerSprite = this.players[player.id];
        playerSprite.x = player.position.x;
        playerSprite.y = player.position.y;
    }

    onPlayerShoot(data) {
        //player = this.teamManager.allPlayers()[data.player];

        console.log('shoot over network', data);
    }

    sendPosition(player) {
        const position = {
            x: player.x,
            y: player.y
        };

        this.socket.emit('PlayerPositionEvent', position);
    }

    sendShoot(player) {
        const data = {
            direction: player.direction,
            x: player.x,
            y: player.y
        };

        this.socket.emit('PlayerShootEvent', data);
    }

}