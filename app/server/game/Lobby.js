'use strict';

const _ = require('lodash');
const eventBus = require('../events/event-bus');
const SocketConnectEvent = require('../events/SocketConnectEvent');
const Player = require('./Player');

module.exports = class Lobby {

    constructor() {
        this.players = [];

        //TODO: Move this to a room object
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

        this.registerSocketConnectEvent();
    }

    registerSocketConnectEvent() {
        eventBus.register(new SocketConnectEvent(), event => {
            const socket = event.socket;

            socket.on('PlayerConnectEvent', () => {
                const player = new Player(this, socket);

                // Add the player to a room slot TODO: Move this to room class
                player.roomSlot = this.freeRoomSlot();
                this.roomSlots[player.roomSlot] = player;

                console.log('Player connected! ID ' + player.id);
                player.socket.emit('PlayerHandshakeEvent', {id: player.id, slot: player.roomSlot});

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
        _.remove(this.players, {id: player.id});

        this.players.forEach(otherPlayer => {
            otherPlayer.removePlayer(player);
        });
    }

    //TODO: Move this to a room object
    freeRoomSlot() {
        for (var i in this.roomSlots) {
            if (!this.roomSlots[i])
                return i;
        }

        return false;
    }

}