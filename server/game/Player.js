'use strict';

const userService = require('../services/userService');
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

        this.socket.on('broadcast', payload => {
            this.socket.broadcast.emit(payload.event, payload.data);
        });

        this.socket.on('exp:set', payload => {
            if(!payload.token || !payload.exp) {
                return;
            }

            userService.saveExp(payload.token, payload.exp);
        });
        
        this.socket.on('exp:get', (payload, callback) => {
            if(!payload.token) {
                return;
            } 
            
            userService.getExp(payload.token)
                .then(exp => {
                    callback(exp);
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

    disconnect() {
        this.lobby.roomSlots[this.roomSlot] = null;
        console.log('Emptied room slot ' + this.roomSlot + ' good bye player ' + this.id);
        this.lobby.disconnect(this);
    }

}