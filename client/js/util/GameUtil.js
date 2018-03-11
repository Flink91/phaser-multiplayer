var GameApi = function(game) {
    this.game = game;


    this.getRndInteger = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}