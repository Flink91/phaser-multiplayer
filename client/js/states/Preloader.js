/**
 * @author Felix Gellner
 * This state will show a loading bar, while loading in all necessary assets for the game.
 * @param game
 * @constructor
 */
BasicGame.Preloader = function(game) {

    this.background = null;
    this.preloadBar = null;

    this.socket = null;

    this.ready = false;

    this.gameProperties = {
        gameWidth: canvas_width,
        gameHeight: canvas_height,
        game_elemnt: "gameDiv",
        in_game: false,
    };

};

BasicGame.Preloader.prototype = {

    init: function() {
        console.log("Preload State");
    },

    preload: function() {

        //Load PlayerCode


        var path = "../client/assets/";
        //	These are the assets we loaded in Boot.js
        //show loading screen
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderLogo');
        this.splash.scale.setTo(2, 2);
        this.splash.anchor.setTo(0.5);

        this.preloaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloaderBar');
        this.preloaderBar.anchor.setTo(0.5);

        //	This sets the preloadBar sprite as a loader sprite.
        //	What that does is automatically crop the sprite from 0 to full-width
        //	as the files below are loaded in.
        this.load.setPreloadSprite(this.preloaderBar);
        //	Here we load the rest of the assets our game needs.
        //	As this is just a Project Template I've not provided these assets, swap them for your own.

        //general settings
        //alt+tab won't stop the game
        this.game.stage.disableVisibilityChange = true;
        //
        this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        //
        this.game.world.setBounds(0, 0, this.gameProperties.gameWidth, this.gameProperties.gameHeight, false, false, false, false);

        //	As this is just a Project Template I've not provided these assets, swap them for your own.
        this.load.image('titlepage', path + 'img/title.jpg');
        //GUI Play Button
        this.load.image('playButton', path + 'img/playButton.png');
        //gear image
        this.load.image('gear', path + 'img/gear.png');
        //house image
        this.load.image('house', path + 'img/house.png');
        //player image
        this.load.image('player1', path + 'img/player_1.png');
        this.load.image('player2', path + 'img/player_2.png');
        this.load.image('player3', path + 'img/player_3.png');
        this.load.image('player4', path + 'img/player_4.png');
        this.load.image('player5', path + 'img/player_5.png');
        this.load.image('player6', path + 'img/player_6.png');
        this.load.image('player7', path + 'img/player_7.png');
        this.load.image('player8', path + 'img/player_8.png');
        this.load.image('player9', path + 'img/player_9.png');
        this.load.image('player10', path + 'img/player_10.png');
        this.load.image('player11', path + 'img/player_11.png');
        this.load.image('player12', path + 'img/player_12.png');

        //Poker Table
        this.load.image('poker_table', 'client/assets/img/poker_table.png');

        //physics
    },

    create: function() {
        this.game.state.start('LobbyList');
    },

    update: function() {

        //	If you don't have any music in your game then put the game.state.start line into the create function

    }

};