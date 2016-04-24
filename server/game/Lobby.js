'use strict';

const _ = require('lodash');
const eventBus = require('../events/event-bus');
const SocketConnectEvent = require('../events/SocketConnectEvent');
const Player = require('./Player');

let nextRoomId = 0;

module.exports = class Lobby {

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
        socket.on('PlayerConnectEvent', (data, callback) => this.onPlayerConnect(data, callback));
    }

    onPlayerConnect(data, callback) {
        const room = this.findRoom(data.targetRoomId);
        
        const player = new Player(this, socket);

        player.roomSlot = this.freeRoomSlot();
        this.roomSlots[player.roomSlot] = player;

        console.log('Player connected! ID ' + player.id);
        player.socket.emit('PlayerHandshakeEvent', {id: player.id, slot: player.roomSlot});

        this.addPlayer(player);
    }
    
    findRoom(targetRoomId = null) {
        let room = null;
        
        if(targetRoomId) {
            room = this.getRoomById(targetRoomId);
        }
        
        if(room === null || room.isFull()) {
            room = this.getFreeRoomOrCreateNew();
        }
        
        return room;
    }

    addPlayer(player) {
        this.players.push(player);

        var room = null;

        if (!player.targetRoomName) {
            room = this.getFreeRoomOrCreateNew();
        } else {
            room = this.findFreeRoomWithNameOrFindNext(player.targetRoomName);
        }


        player.tellRoom(room);
        room.addPlayer(player);
    }

    findFreeRoomWithNameOrFindNext(roomNickName){
        //TODO @Marc
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


};