var BasicGame = {};
/**
 * @author Felix Gellner
 * This state initializes a few settings and loads the first assets needed, before heading into the preloader state
 * @param game
 * @constructor
 */
BasicGame.Boot = function(game) {

};

BasicGame.Boot.prototype = {

    init: function() {

        console.log("Boot State");

        //  Unless you specifically know your game needs to support multi-touch set this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus.
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        } else {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // this.scale.setMinMax(640, 360, 1920, 1080);
            // this.scale.forceLandscape = true;
            // this.scale.pageAlignHorizontally = true;
        }

    },

    preload: function() {
        var path = "../client/";
        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderLogo', path + 'assets/img/preloader_logo.jpg');
        this.load.image('preloaderBar', path + 'assets/img/preloader_bar.png');

    },

    create: function() {

        //loading screen will have a white background
        this.game.stage.backgroundColor = '#fff';

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');

    }

};