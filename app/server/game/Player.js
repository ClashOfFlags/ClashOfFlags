'use strict';

let playerId = 0; // Not optimal, should be changed later

module.exports = class Player {

    constructor(lobby, socket) {
        this.id = playerId++;
        this.team = "";
        this.roomSlot = 1;
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
                if (otherPlayer.id === this.id) {
                    return;
                }

                otherPlayer.sendPosition(this, position);
            });
        });

        this.socket.on('PlayerShootEvent', data => {
            console.log('shoot', data);

            this.lobby.players.forEach(otherPlayer => {
                if (otherPlayer.id === this.id) {
                    return;
                }


                otherPlayer.sendShoot(this, data);
            });
        });

        this.socket.on('PlayerHitEvent', data => {
            this.forOtherPlayers(otherPlayer => {
                otherPlayer.emit('PlayerHitEvent', data);
            });
        });
    }

    emit(event, data) {
        this.socket.emit(event, data);
    }

    addPlayer(player) {
        this.emit('PlayerConnectEvent', {id: player.id, slot: player.roomSlot});
    }

    removePlayer(player) {

        this.emit('PlayerDisconnectEvent', {id: player.id, slot: player.roomSlot});

    }

    sendPosition(player, position) {
        this.emit('PlayerPositionEvent', {
            id: player.id,
            position: position
        });
    }

    sendShoot(player, data) {
        data.id = player.id;
        data.slot = player.roomSlot;

        console.log('send shoot', data);

        this.emit('PlayerShootEvent', data);
    }

    disconnect() {
        this.lobby.roomSlots[this.roomSlot] = null;
        console.log('Emptied room slot ' + this.roomSlot + ' good bye player ' + this.id);
        this.lobby.disconnect(this);
    }

    forOtherPlayers(callback) {
        this.lobby.players.forEach(otherPlayer => {
            if(otherPlayer.id === this.id) {
                return;
            }

            return callback(otherPlayer);
        });
    }

}