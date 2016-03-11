import State from './State';
import Hero from './../objects/sprites/Hero';
import Player from './../objects/sprites/Player';
import TestCup from './../objects/sprites/TestCup';
import PlayerFactory from './../factories/PlayerFactory';

export default class GameState extends State {
    constructor(game, $container) {
        super();

        this.preloader = $container.Preloader;
        this.creator = $container.Creator;
        this.updater = $container.Updater;
        
        window.clashOfFlags = this; // Publish GameState to window, Vue App needs to access pause() and unpause()
    }

    preload() {
        this.preloader.run();
    }

    create() {
      this.initPauseState();
        this.creator.run();
    }

    update() {
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
