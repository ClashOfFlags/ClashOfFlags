export default class Team {
    constructor(name) {
        this.name = name;
        this.players = [];
        this.points = 300;
    }

    addPlayer(player) {
        this.players.push(player);
    }

}
