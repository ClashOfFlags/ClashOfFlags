'use strict';

const chance = require('chance');
const eventBus = require('../events/event-bus');
const RoomCloseEvent = require('../events/RoomCloseEvent');

class IdService {

    constructor() {
        this.usedRoomIds = {};

        eventBus.register(RoomCloseEvent, event => this.onRoomClose(event));
    }

    nextPlayerId() {
        return chance.guid();
    }

    nextRoomId() {
        for (;;) {
            const roomId = this.generateRoomId();

            if (this.usedRoomIds(roomId)) {
                this.usedRoomIds[roomId] = true;

                return roomId;
            }
        }
    }

    freeRoomId(roomId) {
        delete this.usedRoomIds[roomId];
    }

    generateRoomId() {
        const roomIdParts = [];

        for (let i = 0; i < 6; i++) {
            const digit = chance.integer({min: 0, max: 9});

            roomIdParts.push(digit);
        }

        return roomIdParts.join('');
    }

    onRoomClose(event) {
        this.freeRoomId(event.room.id);
    }

}

module.exports = new IdService();