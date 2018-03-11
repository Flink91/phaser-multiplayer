/**
 * This is the main menu state. When the game is done preloading, you'll land here.
 * @param game
 * @constructor
 */
BasicGame.MainMenu = function(game) {
    this.playButton = null;
    this.background = null;
    this.title = null;
    this.instructions = null;
};

BasicGame.MainMenu.prototype = {

    init: function() {
        console.log("MainMenu State");
    },

    create: function() {
        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is adding a picture and button
        this.stage.backgroundColor = 0x3f3c3d;

        //shaky title
        this.title = this.game.add.sprite(this.game.width / 2, 100, 'titlepage');
        this.title.anchor.set(0.5);
        this.title.angle = (1 + Math.random() * 15);
        var titleTween = this.add.tween(this.title);
        titleTween.to({
            angle: -this.title.angle
        }, 2000 + Math.random() * 4000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        //text style
        var style = { font: "20px Arial", fill: "#ffffff", align: "center" };
        var style_black = { font: "30px Arial", fill: "#ffffff", align: "center" };


        //Play Button
        this.playtext = this.add.text(this.game.width / 2, this.game.height / 2 - 130, 'Create Room ', style_black);
        this.playtext.anchor.setTo(0.5, 0.5);
        this.playButton = this.add.button(this.game.width / 2, this.game.height / 2 - 100, 'playButton', this.startGame, this);
        this.playButton.anchor.setTo(0.5, 0.5);

        //Options Button

        //Instructions

        this.instructions = this.add.text(this.game.width / 2, 500, 'Lobby list here', style);
        this.instructions.anchor.setTo(0.5, 0.5);


    },

    update: function() {

    },

    startGame: function(pointer) {

        //start the actual game
        this.game.state.start('Game');
    }

};