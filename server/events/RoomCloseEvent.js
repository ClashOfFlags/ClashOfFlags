'use strict';

const Event = require('./Event');

class RoomCloseEvent extends Event {

    constructor(room) {
        super('RoomCloseEvent');

        this.room = room;
    }

}

module.exports = RoomCloseEvent;