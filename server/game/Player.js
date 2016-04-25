'use strict';

const userService = require('../services/userService');
const statisticRepository = require('../repositories/statisticRepository');

module.exports = class Player {

    constructor(id, socket) {
        this.id = id;
        this.socket = socket;
        this.team = '';
        this.roomSlot = null;
        this.room = null;

        this.init();
    }

    init() {
        this.socket.on('broadcast', payload => {
            this.socket.broadcast.emit(payload.event, payload.data);
        });

        this.socket.on('exp:set', payload => {
            if (!payload.token || !payload.exp) {
                return;
            }

            userService.saveExp(payload.token, payload.exp);
        });

        this.socket.on('exp:get', (payload, callback) => {
            if (!payload.token) {
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

    tellRoom(room, roomSlot) {
        this.room = room;
        this.roomSlot = roomSlot;

        this.emit('RoomJoinEvent', {
            roomId: room.id,
            slot: roomSlot,
            playerId: this.id,
            redTickets: room.redTickets,
            blueTickets: room.blueTickets,
            redFlags: room.redFlags,
            blueFlags: room.blueFlags
        });
    }

};