/**
 * @author Felix Gellner
 * This is the Game state. The player code gets loaded here, all the entities get instanciated here. It is the center of this software.
 * @param game
 * @constructor
 */

BasicGame.Game = function(game) {

    /*
     Main Information sources:
     Oneway collision: http://examples.phaser.io/_site/view_full.html?d=arcade%20physics&f=one+way+collision.js&t=one%20way%20collision
     Physics: www.gamemechanicexplorer.com
     Various: phaser.io/examples
     */

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game; //  a reference to the currently running game (Phaser.Game)
    this.add; //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera; //  a reference to the game camera (Phaser.Camera)
    this.cache; //  the game cache (Phaser.Cache)
    this.input; //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load; //  for preloading assets (Phaser.Loader)
    this.math; //  lots of useful common math operations (Phaser.Math)
    this.sound; //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage; //  the game stage (Phaser.Stage)
    this.time; //  the clock (Phaser.Time)
    this.tweens; //  the tween manager (Phaser.TweenManager)
    this.state; //  the state manager (Phaser.StateManager)
    this.world; //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics; //  the physics manager (Phaser.Physics)
    this.rnd; //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    this.fontStyle = {
        font: "16px Arial",
        fill: "#000",
        align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "left",
        boundsAlignV: "top",
        wordWrap: true,
        wordWrapWidth: 60
    };

    this.gameProperties = {
        gameWidth: canvas_width,
        gameHeight: canvas_height,
        game_elemnt: "gameDiv",
        in_game: false,
        centerX: canvas_width / 2,
        centerY: canvas_height / 2
    };

    this.gameManager = new GameManager(this);

    this.players_in_room;
    this.seatNumber;

    this.turn;
    this.question_text;
};

BasicGame.Game.prototype = {

    init: function(players_in_room) {
        $('#gameDiv').fadeIn();
        console.log("Game State");
        this.players_in_room = players_in_room;
        this.seatNumber = this.players_in_room.indexOf(socket.id);

        this.turn = 0;
    },

    preload: function() {},

    create: function() {

        this.createEnvironment();
        this.createSeats();
        this.socketActions();
        socket.emit('get_question', socket.id);

    },

    update: function() {

    }
};
/**
 * Creates A game scene with a background and the floor. Creates Instances of the other entities
 */
BasicGame.Game.prototype.createEnvironment = function() {
    // Scaling, not really necessary when size fixed, but cleaner
    this.scale.maxWidth = this.game.width;
    this.scale.maxHeight = this.game.height;

    // background color
    this.stage.backgroundColor = '#cccccc';

    //---Create all the Objects----

    //basic setup
    poker_table = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'poker_table');
    poker_table.anchor.x = 0.5;
    poker_table.anchor.y = 0.5;
    poker_table.scale.setTo(0.27, 0.27);

    this.game.world.bringToTop(poker_table);

    //-----------------------------

};

BasicGame.Game.prototype.createPlayer = function(x, y, name, money) {
    this.player = new BasicGame.Player(this.game, x, y, name, money);
    this.player.create();
};

BasicGame.Game.prototype.updatePlayer = function() {
    this.player.update();
};

BasicGame.Game.prototype.socketActions = function() {
    var self = this;
    socket.on('get_question', function(question) {
        self.getQuestion(question);
    });

};

BasicGame.Game.prototype.getQuestion = function(question) {
    this.question = question;
    console.log("Question got: " + this.question.question);

    var actionMessage = new BasicGame.ActionMessage(this, this.gameProperties.centerX, this.gameProperties.centerY, this.question.question);
};

BasicGame.Game.prototype.createSeats = function() {

    for (var i = 0; i < 8; i++) {
        if (this.players_in_room[i]) {
            this.createSeatedPlayer(this.players_in_room[i].name, i);
        } else {
            this.createSeatedPlayer("empty", i);
        }
    }

};

BasicGame.Game.prototype.createSeatedPlayer = function(playerName, pos) {
    var centerX = this.gameProperties.centerX;
    var centerY = this.gameProperties.centerY;

    var positions = [
        [centerX - 200, centerY - 200],
        [centerX + 0, centerY - 200],
        [centerX + 200, centerY - 200],
        [centerX + 330, centerY],
        [centerX + 200, centerY + 200],
        [centerX + 0, centerY + 200],
        [centerX - 200, centerY + 200],
        [centerX - 330, centerY]

    ];

    this.seatedPlayer = this.game.add.graphics(0, 0);
    this.seatedPlayer.anchor.set(0.5, 0.5);
    this.seatedPlayer.lineStyle(2, 0x0000FF, 1);
    this.seatedPlayer.pivot.x = 40;
    this.seatedPlayer.pivot.y = 40;

    //this.seatedPlayer.drawRect(positions[pos][0], positions[pos][1], 80, 80);
    // var text = this.game.add.text(positions[pos][0] - 30, positions[pos][1] - 8, playerName, this.fontStyle);

    this.createPlayer(positions[pos][0], positions[pos][1], playerName, 10000);
};

BasicGame.Game.prototype.showQuestionTop = function() {
    this.question_text = this.game.add.text(this.gameProperties.centerX, 40, this.question.question, {
        font: "16px Arial",
        fill: "#000",
        align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        wordWrap: true,
        wordWrapWidth: 400
    });
    this.question_text.anchor.set(0.5, 0.5);
};

BasicGame.Game.prototype.nextTurn = function() {
    this.turn++;
};