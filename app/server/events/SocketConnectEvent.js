'use strict';

const Event = require('./Event');

module.exports = class SocketConnectEvent extends Event {

    constructor(socket) {
        super('SocketConnectEvent');

        this.socket = socket;
    }

}