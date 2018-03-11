BasicGame.ActionMessage = function(game_state, x, y, message, duration) {

    this.game_state = game_state;

    BasicGame.Entity.call(this, this.game_state.game, x, y, 'gear');
    this.x = x;
    this.y = y;

    //default time
    if (duration) { this.duration = duration; } else { this.duration = 4; }
    // create message text
    this.message = message;


    this.fontStyle = {
        font: "25px Arial",
        fill: "#00FFF0"
    };

    //add text to game
    this.actionMessage = this.game.add.text(this.x, 50, this.message, this.fontstyle);
    this.actionMessage.anchor.setTo(0.5);
    this.actionMessage.alpha = 0;

    this.game.add.tween(this.actionMessage).to({ alpha: 1 }, 1000, "Linear", true);
    this.game.add.tween(this.actionMessage).to({ y: this.y }, 300, "Quart.easeOut", true);
    // start timer to destroy the message
    this.kill_timer = this.game.time.create();
    this.kill_timer.add(Phaser.Timer.SECOND * this.duration, this.kill, this);
    this.kill_timer.start();


};

BasicGame.ActionMessage.prototype = Object.create(BasicGame.Entity.prototype);
BasicGame.ActionMessage.prototype.constructor = BasicGame.ActionMessage;



BasicGame.ActionMessage.prototype.kill = function() {
    Phaser.Sprite.prototype.kill.call(this);
    // when the message is destroyed, call next turn
    var fadeOut = this.game.add.tween(this.actionMessage).to({ alpha: 0 }, 300, "Linear", true)
    fadeOut.onComplete.add(function() {
        this.actionMessage.kill();
        this.game_state.nextTurn();
    }, this);

};