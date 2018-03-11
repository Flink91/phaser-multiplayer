var GameManager = function(game) {
    this.game = game;

    this.GameState = Object.freeze({

        INTRO: 1, // give some time to introduce the players to the table

        BLINDS: 2, // place small and big blinds and sometimes raise blinds
        SHOW_AND_GUESS_QUESTION: 3, // show question and give some time to answer it. Save the answers of all players
        BETTING_ROUND_1: 4, // everyone can fold,check,raise
        HINT_1: 5, // show the first hint
        BETTING_ROUND_2: 6, // everyone can fold,check,raise
        HINT_2: 7, // show the first hint
        BETTING_ROUND_3: 8, // everyone can fold,check,raise
        END_ROUND: 9, // Declare winner, split pot? someone dead?  
        CHECK_END: 10, // Check if someone won

        OUTRO: 11 // Show a stat window and end button to go back to lobbylist

    });


    this.intro = function() {
        console.log("Intro");
    }

    this.blinds = function() {
        console.log("Intro");
    }

    this.showQuestion = function() {

    }

    this.endGame = function() {
        //this.game.endscreen();
        console.log("Game End");

    }
}