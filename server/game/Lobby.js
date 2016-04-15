'use strict';

const _ = require('lodash');
const eventBus = require('../events/event-bus');
const SocketConnectEvent = require('../events/SocketConnectEvent');
const Player = require('./Player');

let nextRoomId = 0;

module.exports = class Lobby {

    constructor() {
        this.players = [];
        this.rooms = [];

        this.registerSocketConnectEvent();
    }

    registerSocketConnectEvent() {
        eventBus.register(new SocketConnectEvent(), event => {
            const socket = event.socket;

            socket.on('PlayerConnectEvent', () => {
                const player = new Player(this, socket);

                player.roomSlot = this.freeRoomSlot();
                this.roomSlots[player.roomSlot] = player;

                console.log('Player connected! ID ' + player.id);
                player.socket.emit('PlayerHandshakeEvent', {id: player.id, slot: player.roomSlot});

                this.addPlayer(player);
            });
        });
    }


    addPlayer(player) {
        this.players.push(player);

        var room = this.getFreeRoomOrCreateNew();
        player.tellRoom(room);
        room.addPlayer(player);
    }

    getFreeRoomOrCreateNew() {
        var freeRoom = this.getFreeRoom();

        if (freeRoom) {
            return freeRoom;
        }

        return this.makeRoom()
    }

    getFreeRoom() {
        var freeRooms = _.filter(this.rooms, (room) => {
            return !room.isFull();
        });

        if (freeRooms.length == 0) {
            return null;
        }

        return freeRooms[0];
    }

    makeRoom() {
        var room = new Room(nextRoomId);

        nextRoomId = nextRoomId + 1;

        return room;
    }

    disconnect(player) {
        _.remove(this.players, {id: player.id});

        this.players.forEach(otherPlayer => {
            otherPlayer.removePlayer(player);
        });
    }


}