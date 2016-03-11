import State from './State';
import Hero from './../objects/sprites/Hero';
import Player from './../objects/sprites/Player';
import TestCup from './../objects/sprites/TestCup';
import PlayerFactory from './../factories/PlayerFactory';

export default class GameState extends State {
    constructor(game, $container) {
        super();

        this.player = null;

        this.inputs = $container.InputService;
        this.paths = $container.PathService;
        this.objects = $container.ObjectsService;
        this.preloader = $container.Preloader;
        this.creator = $container.Creator;
        this.updater = $container.Updater;
        this.playerFactory = $container.PlayerFactory;
        this.network = $container.NetworkService;
        window.clashOfFlags = this; // Publish GameState to window, Vue App needs to access pause() and unpause()
        this.teamManager = $container.TeamManager;
    }

    preload() {
        this.preloader.run(this);

    }

    create() {
        this.initPauseState();

        this.creator.run();

        this.network.init();

        this.network.waitForHandshake = (hero)=> {
            console.log('waited for handshake', hero);
            this.player = hero;
            this.game.camera.follow(this.player);
            this.objects.set('hero', hero);
        }

        this.miniMapOverlay = this.objects.get('miniMapOverlay');
        this.miniMapSize = this.objects.get('miniMapSize');
    }

    update() {
        if (!this.player)
            return;

        this.updater.run();
    }

    pause() {
        this.game.input.enabled = false;
        this.game.physics.arcade.isPaused = true;
    }

    unpause() {
        this.game.input.enabled = true;
        this.game.physics.arcade.isPaused = false;
    }

    initPauseState() {
        const isGameDivVisible = $('#game').is(':visible');

        if (isGameDivVisible) {
            this.unpause();
            return;
        }

        this.pause();
    }

}
