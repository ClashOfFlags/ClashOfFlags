'use strict';

const _ = require('lodash');
const eventBus = require('../events/event-bus');
const SocketConnectEvent = require('../events/SocketConnectEvent');
const Player = require('./Player');
const idService = require('../services/idService');

class Lobby {

    constructor() {
        this.rooms = [];

        this.registerSocketConnectEvent();
    }

    registerSocketConnectEvent() {
        eventBus.register(SocketConnectEvent, event => this.onSocketConnect(event));
    }

    onSocketConnect(event) {
        this.registerSocketEvents(event.socket);
    }

    registerSocketEvents(socket) {
        socket.on('PlayerConnectEvent', data => this.onPlayerConnect(socket, data));
    }

    onPlayerConnect(socket, data) {
        const targetRoomId = data.targetRoomId;
        const room = this.findRoomForPlayer(targetRoomId);
        const playerId = idService.nextPlayerId();
        const player = new Player(playerId, socket);

        room.join(player);
    }

    findRoomForPlayer(targetRoomId = null) {
        let room = null;

        if (targetRoomId) {
            room = this.getRoomById(targetRoomId);
        }

        if (room === null || room.isFull()) {
            room = this.getFreeRoomOrCreateNew();
        }

        return room;
    }

    getRoomById(roomId) {
        return _.find(this.rooms, {id: roomId});
    }

    getFreeRoomOrCreateNew() {
        const room = this.getFreeRoom();

        if (room) {
            return room;
        }

        return this.createNewRoom();
    }

    getFreeRoom() {
        const freeRooms = this.freeRooms();

        if (freeRooms.length === 0) {
            return null;
        }

        return _.sample(freeRooms);
    }

    createNewRoom() {
        const roomId = idService.nextRoomId();
        const room = new Room(roomId);

        this.rooms.push(room);

        return room;
    }

    freeRooms() {
        return _.filter(this.rooms, room => {
            return !room.isFull();
        });
    }

}

module.exports = Lobby;