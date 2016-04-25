'use strict';

const _ = require('lodash');
const eventBus = require('../events/event-bus');
const SocketConnectEvent = require('../events/SocketConnectEvent');
const RoomCloseEvent = require('../events/RoomCloseEvent');
const Player = require('./Player');
const idService = require('../services/idService');

module.exports = class Lobby {

    constructor() {
        this.rooms = [];

        this.registerEvents();
    }

    registerEvents() {
        eventBus.register(SocketConnectEvent, event => this.onSocketConnect(event));
        eventBus.register(RoomCloseEvent, event => this.onRoomClose(event));
    }

    onSocketConnect(event) {
        const socket = event.socket;
        
        socket.on('PlayerConnectEvent', data => this.onPlayerConnect(socket, data));
    }

    onPlayerConnect(socket, data) {
        if(!data) {
            data = {};
        }

        const targetRoomId = data.targetRoomId;
        const room = this.findRoomForPlayer(targetRoomId);
        const playerId = idService.nextPlayerId();
        const player = new Player(playerId, socket);

        room.addPlayer(player);
    }

    findRoomForPlayer(targetRoomId) {
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

    onRoomClose(event) {
        const room = event.room;

        _.remove(this.rooms, {id: room.id});
    }

};