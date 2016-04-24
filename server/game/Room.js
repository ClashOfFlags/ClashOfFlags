'use strict';

class Room {
    
    constructor(id) {
        this.id = id;
        this.players = [];

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

    }

    addPlayer(player) {
        this.players.forEach(otherPlayer => {
            player.addPlayer(otherPlayer);
            otherPlayer.addPlayer(player);
        });

        this.players.push(player);
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

    removePlayer(player) {
        var slotId = this.findRoomSlot(player);
        this.roomSlots[slotId] = null;
    }

    findRoomSlot(player) {
        for (var i in this.roomSlots) {
            var playerSlot = this.roomSlots[i];

            if (!playerSlot) continue;

            if (playerSlot.id == player.id) {
                return i;
            }
        }
        return null;
    }
}

module.exports = Room;