'use strict';

const socket = require('../socket');
const eventBus = require('../events/event-bus');
const RoomCloseEvent = require('../events/RoomCloseEvent');
const _ = require('lodash');

module.exports = class Room {

    constructor(id) {
        this.id = id;
        this.players = [];
        this.redTickets = 300;
        this.blueTickets = 300;
        this.redFlags = 3;
        this.blueFlags = 3;

        this.roomSlots = {
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            6: null,
            7: null,
            8: null,
            9: null,
            10: null
        };
    }

    isFull() {
        return this.players.length === 10;
    }

    addPlayer(player) {
        const roomSlot = this.freeRoomSlot();
        this.roomSlots[roomSlot] = player;
        player.roomSlot = roomSlot;

        player.socket.join(this.id);
        player.tellRoom(this, roomSlot);
        this.players.push(player);
        player.socket.on('disconnect', () => this.onPlayerDisconnect(player));
    }

    onPlayerDisconnect(player) {
        console.log('Player ' + player.id + ' disconnected from room ' + this.id + ' and cleared slot ' + player.roomSlot + ', nice.');
        this.roomSlots[player.roomSlot] = null;
        _.remove(this.players, {id: player.id});
        socket.io.sockets.to(this.id).emit('PlayerDisconnectEvent', {id: player.id, slot: player.roomSlot});

        if (this.players.length === 0) {
            console.log('No more players left in room ' + this.id + ', closing...');
            this.close();
        }
    }

    freeRoomSlot() {
        var playersInRedTeam = this.usedSlots(1, 5);
        var playersInBlueTeam = this.usedSlots(6, 10);

        for (var i in this.roomSlots) {
            if (!this.roomSlots[i] && (
                    (playersInBlueTeam >= playersInRedTeam && i <= 5) || (playersInRedTeam >= playersInBlueTeam && i > 5)
                ))
                return i;
        }

        return false;
    }

    usedSlots(from, to) {
        var count = 0;
        for (var i in this.roomSlots) {
            if (this.roomSlots[i] && from <= i && to >= i)
                count++;
        }

        return count;
    }

    close() {
        const event = new RoomCloseEvent(this);

        eventBus.fire(event);
    }

};