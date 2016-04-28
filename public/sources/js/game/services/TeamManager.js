export default class TeamManager {

    constructor(game, $container) {
        this.game = game;
        this.$container = $container;
        this.objects = this.$container.ObjectsService;
        this.teams = {};
        this.hero = null;
        this.maxTickets = 300;
    }
    
    updateTickets(redTickets, blueTickets) {
        this.objects.get('points.red').setText(redTickets + '/' + this.maxTickets);
        this.objects.get('points.blue').setText(blueTickets + '/' + this.maxTickets);
    }
    
    updateFlags(redFlags, blueFlags) {
        for(let i = 0; i < 3; i++) {
            const redFlag = this.objects.get('statusFlag' + i + '.red');
            const blueFlag = this.objects.get('statusFlag' + i + '.blue');
            redFlag.visible = redFlags >= redFlag.minFlags;
            blueFlag.visible = blueFlags >= blueFlag.minFlags;
        }
    }

    add(team) {
        this.teams[team.name] = team;
    }

    findPlayer(number) {
        return this.allPlayers()[number];
    }

    allPlayers() {
        var players = {};

        for (var teamName in this.teams) {
            for (var i in this.teams[teamName].players) {
                var player = this.teams[teamName].players[i];

                players[player.number] = player;
            }
        }

        return players;
    }

    findFreePlayer() {
        const allPlayers = this.allPlayers()
        for (var i in allPlayers) {
            const player = allPlayers[i];

            if (!player.networkId) {
                return player;
            }
        }

        return null;
    }

}
