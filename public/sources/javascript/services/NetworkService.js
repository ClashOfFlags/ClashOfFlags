export default class NetworkService {

    constructor($container) {
        this.$container = $container;
        this.objects = $container.ObjectsService;
        this.playerFactory = $container.PlayerFactory;
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
    }

    connect() {
        this.socket.emit('PlayerConnectEvent');
    }

    onPlayerConnect(player) {
        const playerStartPos = this.objects.byType('spawn', 'objectsLayer');
        const playerSprite = this.playerFactory
            .position(playerStartPos[0])
            .team('red')
            .key('player')
            .make();

        this.players[player.id] = playerSprite;
    }

    onPlayerDisconnect(player) {
        const playerSprite = this.players[player.id];

        if(playerSprite) {
            playerSprite.kill();
        }
    }

    onPlayerPosition(player) {
        const playerSprite = this.players[player.id];
        playerSprite.x = player.position.x;
        playerSprite.y = player.position.y;
    }

    sendPosition(player) {
        const position = {
            x: player.x,
            y: player.y
        };

        this.socket.emit('PlayerPositionEvent', position);
    }

}