/**
 * @author Felix Gellner
 * This is the Game state. The player code gets loaded here, all the entities get instanciated here. It is the center of this software.
 * @param game
 * @constructor
 */

BasicGame.Lobby = function(game) {

    this.gameProperties = {
        gameWidth: canvas_width,
        gameHeight: canvas_height,
        game_elemnt: "gameDiv",
        in_game: false,
        centerX: canvas_width / 2,
        centerY: canvas_height / 2
    };

    this.players_in_room = [];
    this.room;
};

BasicGame.Lobby.prototype = {

    init: function() {
        console.log("Lobby State");
    },

    preload: function() {
        $('#lobby_list').hide();
        $('#lobby_container').hide();
        this.initGame();
        this.drawStartGameButton();
    },

    create: function() {

        this.createEnvironment();


        this.socketActions();
        this.lobbyActions();

        socket.emit('get_people_in_room', socket.id);
        console.log(this.room);


    },

    update: function() {},
};

/**
 * Creates A game scene with a background and the floor. Creates Instances of the other entities
 */
BasicGame.Lobby.prototype.createEnvironment = function() {
    // Scaling, not really necessary when size fixed, but cleaner
    this.scale.maxWidth = this.game.width;
    this.scale.maxHeight = this.game.height;

    // background color
    this.stage.backgroundColor = '#fdecde';

};

BasicGame.Lobby.prototype.initPokerGame = function() {
    socket.emit('create_game', socket.id);
};

BasicGame.Lobby.prototype.lobbyActions = function() {

    var self = this;

    $('#single_lobby_container').on('click', '#start_game_button', function() {
        // create a new socket.io room and assign socket
        self.initPokerGame();
    });

    $('#single_lobby_container').on('submit', 'form', function() {
        socket.emit('chatMessage', $('#chat_box_input').val());
        $('#chat_box_input').val('');
        return false;
    });
};

BasicGame.Lobby.prototype.initGame = function() {
    $('#single_lobby_container').fadeIn();
};

BasicGame.Lobby.prototype.drawStartGameButton = function() {
    $('#start_game_button').fadeIn();
};

BasicGame.Lobby.prototype.showPlayerList = function() {
    $('#player_list').html("<p>Players in room:</p>");
    for (var i = 0; i < this.players_in_room.length; i++) {
        $('#player_list').append('<li>' + this.players_in_room[i].name + '</li>');
    }
};

BasicGame.Lobby.prototype.updatePlayer = function() {
    this.player.update();
};

BasicGame.Lobby.prototype.socketActions = function() {

    var self = this;

    // all players of the room shall change state to game
    socket.on("game_started_by_host", function() {
        $('#lobby').hide();
        self.game.state.start('Game', true, false, self.players_in_room);
    });

    socket.on('addChatMessage', function(msg, clientID, color) {
        $('#game').append('<p style="color:' + color + ';">' + clientID + ": " + '<span>' + msg);
        $('#game')[0].scrollTop = $('#game')[0].scrollHeight;
    });

    socket.on('get_room_info', function(room) {
        self.room = room;
        console.log(self.room);
        self.players_in_room = room.clients;
        self.showPlayerList();
    });
};