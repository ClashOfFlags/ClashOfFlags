'use strict';

const Event = require('./Event');

module.exports = class RoomCloseEvent extends Event {

    constructor(room) {
        super('RoomCloseEvent');

        this.room = room;
    }

};