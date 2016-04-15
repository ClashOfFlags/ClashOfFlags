'use strict';

const userService = require('../services/userService');
const statisticRepository = require('../repositories/statisticRepository');
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
        
        this.socket.on('stat-entry', payload => {
            statisticRepository.createEntry(payload.key, payload.team);
        });
    }

    emit(event, data) {
        this.socket.emit(event, data);
    }

    addPlayer(player) {
        this.emit('PlayerConnectEvent', {id: player.id, slot: player.roomSlot});
    }

    tellRoom(room){
        this.emit('RoomJoinEvent', {id: room.id, nickname: room.nickname});
    }

    removePlayer(player) {
        this.emit('PlayerDisconnectEvent', {id: player.id, slot: player.roomSlot});
    }

    disconnect() {
        this.room.removePlayer(this);
        this.lobby.disconnect(this);
    }

}