'use strict';

const io = require('../socket').io;
const eventBus = require('../events/event-bus');
const RoomCloseEvent = require('../events/RoomCloseEvent');

class Room {

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
        this.players.push(player);
        player.tellRoom(this);
        player.socket.on('disconnect', () => this.onPlayerDisconnect(player));
    }

    onPlayerDisconnect(player) {
        this.roomSlots[player.roomSlot] = null;

        _.remove(this.players, {id: player.id});
        io.to(this.id).emit('PlayerDisconnectEvent', {id: player.id});

        if(this.players.length === 0) {
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

}

module.exports = Room;