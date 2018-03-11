BasicGame.PokerTurns = function(game_state) {

    this.game_state = game_state;

    BasicGame.Entity.call(this, this.game_state.game, x, y, 'gear');
    this.x = x;
    this.y = y;

    this.fontStyle = {
        font: "18px Arial",
        fill: "#00FFF0"
    };


};

BasicGame.PokerTurns.prototype = Object.create(BasicGame.Entity.prototype);
BasicGame.PokerTurns.prototype.constructor = BasicGame.PokerTurns;

BasicGame.PokerTurns.prototype.startTable = function() {

};

BasicGame.PokerTurns.prototype.setBlinds = function() {

};

BasicGame.PokerTurns.prototype.showQuestion = function() {

};

BasicGame.PokerTurns.prototype.getGuess = function() {

};

BasicGame.PokerTurns.prototype.bettingRound1 = function() {

};

BasicGame.PokerTurns.prototype.showHint1 = function() {

};

BasicGame.PokerTurns.prototype.showHint1 = function() {

};

BasicGame.PokerTurns.prototype.setBlinds = function() {

};