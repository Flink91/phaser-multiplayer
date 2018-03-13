BasicGame.TurnManager = function(game_state) {

    this.game_state = game_state;

    this.turn = 0;

};

BasicGame.TurnManager.prototype.constructor = BasicGame.TurnManager;

BasicGame.TurnManager.prototype = {

    init: function() {},

    preload: function() {},

    create: function() {},

    update: function() {}

};


BasicGame.TurnManager.prototype.nextTurn = function() {
    this.turn++;

    switch (this.turn) {
        case 1:
            this.startRound();
            break;
        case 2:
            this.setBlinds();
            break;
        case 3:
            this.showQuestion();
            break;
        case 4:
            this.getGuess();
            break;
        case 5:
            this.bettingRound1();
            break;
        case 6:
            this.showHint1();
            break;
        case 7:
            this.bettingRound2();
            break;
        case 8:
            this.showHint2();
            break;
        case 8:
            this.bettingRound3();
            break;
        case 9:
            this.endRound();
            break;
        default:
            console.warn("Turn number seems wrong");
            break;

    }
};

BasicGame.TurnManager.prototype.startRound = function() {
    //set up some stuff
    console.log("Start Round");
    new BasicGame.ActionMessage(this.game_state, canvas_width / 2, canvas_height / 2, "Starting Game");
};

BasicGame.TurnManager.prototype.setBlinds = function() {
    console.log("Set Blinds");
    this.nextTurn();
};

BasicGame.TurnManager.prototype.showQuestion = function() {
    console.log("Show Question");
    socket.emit('get_question', socket.id);
};

BasicGame.TurnManager.prototype.getGuess = function() {
    console.log("Get Guess");
    this.game_state.showGuessHUD();
};

BasicGame.TurnManager.prototype.bettingRound1 = function() {
    console.log("Betting Round 1");
};

BasicGame.TurnManager.prototype.bettingRound2 = function() {
    console.log("Betting Round 2");
};

BasicGame.TurnManager.prototype.bettingRound3 = function() {
    console.log("Betting Round 3");
};

BasicGame.TurnManager.prototype.showHint1 = function() {
    console.log("Show Hint 1");
};

BasicGame.TurnManager.prototype.showHint2 = function() {
    console.log("Show Hint 2");
};

BasicGame.TurnManager.prototype.endRound = function() {
    console.log("End Round");
};