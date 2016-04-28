'use strict';

const _ = require('lodash');
const eventBus = require('../events/event-bus');
const SocketConnectEvent = require('../events/SocketConnectEvent');
const RoomCloseEvent = require('../events/RoomCloseEvent');
const Player = require('./Player');
const idService = require('../services/idService');
const Room = require('./Room');

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

        console.log('A player connected to the lobby! Data:', data);

        const targetRoomId = data.targetRoomId;
        const room = this.findRoomForPlayer(targetRoomId);
        const playerId = idService.nextPlayerId();
        const player = new Player(playerId, socket);

        console.log('Found room ' + room.id + ' for player ' + playerId);
        room.addPlayer(player);
    }

    findRoomForPlayer(targetRoomId) {
        let room = null;

        if (targetRoomId) {
            console.log('Target room ID provided, finding room...');
            room = this.getRoomById(targetRoomId);
        }

        if (!room || room.isFull()) {
            console.log('Room was null or full, getting free room or creating a new one...');
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

        console.log('Could not find a free room, creating a new one... Hang tight.');

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
        console.log('Created room with ID ' + roomId + ', there are ' + this.rooms.length + ' rooms now.');

        return room;
    }

    freeRooms() {
        return _.filter(this.rooms, room => {
            return !room.isFull();
        });
    }

    onRoomClose(event) {
        const room = event.room;

        console.log('Lobby received RoomCloseEvent, removing room ' + room.id);
        _.remove(this.rooms, {id: room.id});
        console.log('There are ' + this.rooms.length + ' rooms left.');
    }

};