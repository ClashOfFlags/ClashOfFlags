'use strict';

let playerId = 0; // Not optimal, should be changed later

module.exports = class Player {

    constructor(lobby, socket) {
        this.id = playerId++;
        this.lobby = lobby;
        this.socket = socket;

        this.init();
    }

    init() {
        // 'disconnect' Event name from socket.io
        this.socket.on('disconnect', () => {
            this.disconnect();
        });

        this.socket.on('PlayerPositionEvent', position => {
            this.lobby.players.forEach(otherPlayer => {
                if(otherPlayer.id === this.id) {
                    return;
                }

                otherPlayer.sendPosition(this, position);
            });
        });
    }

    emit(event, data) {
        this.socket.emit(event, data);
    }

    addPlayer(player) {
        this.emit('PlayerConnectEvent', { id: player.id });
    }

    removePlayer(player) {
        this.emit('PlayerDisconnectEvent', { id: player.id });
    }

    sendPosition(player, position) {
        this.emit('PlayerPositionEvent', {
            id: player.id,
            position: position
        });
    }

    disconnect() {
        this.lobby.disconnect(this);
    }

}