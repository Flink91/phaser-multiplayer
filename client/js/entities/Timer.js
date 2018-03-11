BasicGame.Timer = function(game, x, y, time) {

    this.game = game;

    BasicGame.Entity.call(this, game, x, y, 'gear');
    this.scale.setTo(0.8, 0.8);
    this.timerText = "Timer";
    this.x = x;
    this.y = y;

    this.timerText = time;
    console.log(this.timerText);

    this.fontStyle = {
        font: "18px Arial",
        fill: "#000",
        align: "left",
        boundsAlignH: "left",
        boundsAlignV: "top",
        wordWrap: true,
        wordWrapWidth: 300
    };

};

BasicGame.Timer.prototype = Object.create(BasicGame.Entity.prototype);
BasicGame.Timer.prototype.constructor = BasicGame.Timer;

BasicGame.Timer.prototype.create = function() {

    this.parentCreate();

    this.anchor.set(0.5, 0.5);
    console.log("timer create");
    this.text = this.game.add.text(0, -30, this.timerText, this.fontStyle);
    this.addChild(this.text);

    //Player sprite
    this.game.add.existing(this);
}

BasicGame.Timer.prototype.update = function() {
    this.parentUpdate();
    //nothing yet 
}