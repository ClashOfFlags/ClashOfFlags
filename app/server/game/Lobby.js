'use strict';

const _ = require('lodash');
const eventBus = require('../events/event-bus');
const SocketConnectEvent = require('../events/SocketConnectEvent');
const Player = require('./Player');

module.exports = class Lobby {

    constructor() {
        this.players = [];

        this.registerSocketConnectEvent();
    }

    registerSocketConnectEvent() {
        eventBus.register(new SocketConnectEvent(), event => {
            const socket = event.socket;

            socket.on('PlayerConnectEvent', () => {
                const player = new Player(this, socket);
                console.log('Player connected!');
                this.addPlayer(player);
            });
        });
    }

    addPlayer(player) {
        this.players.forEach(otherPlayer => {
            player.addPlayer(otherPlayer);
            otherPlayer.addPlayer(player);
        });

        this.players.push(player);
    }

    disconnect(player) {
        _.remove(this.players, { id: player.id });

        this.players.forEach(otherPlayer => {
            otherPlayer.removePlayer(player);
        });
    }

}