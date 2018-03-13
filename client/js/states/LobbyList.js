/**
 * @author Felix Gellner
 * This is the Game state. The player code gets loaded here, all the entities get instanciated here. It is the center of this software.
 * @param game
 * @constructor
 */

BasicGame.LobbyList = function(game) {

    this.gameProperties = {
        gameWidth: canvas_width,
        gameHeight: canvas_height,
        game_elemnt: "gameDiv",
        in_game: false,
        centerX: canvas_width / 2,
        centerY: canvas_height / 2
    };

    this.rooms = {};
};

BasicGame.LobbyList.prototype = {

    init: function() {
        console.log("LobbyList State");
    },

    preload: function() {
        $('#lobby_container').fadeIn();
    },

    create: function() {

        this.createEnvironment();

        this.socketActions();
        this.lobbyActions();

    },

    update: function() {},
};

/**
 * Creates A game scene with a background and the floor. Creates Instances of the other entities
 */
BasicGame.LobbyList.prototype.createEnvironment = function() {
    // Scaling, not really necessary when size fixed, but cleaner
    this.scale.maxWidth = this.game.width;
    this.scale.maxHeight = this.game.height;

    // background color
    this.stage.backgroundColor = '#cde7d3';

};

BasicGame.LobbyList.prototype.lobbyActions = function() {

    var self = this;

    // handle when the create new game button is pressed
    $('#lobby_container').on('click', '#btn_host_game', function() {
        // create a new socket.io room and assign socket
        //var readableName = window.prompt("Room Name?", socket.id);
        $('#room_name_modal').modal();

    });

    $('#room_name_modal_submit').on("click", function() {
        let room_name = $('#room_name').val();
        if (room_name) {
            socket.emit('host', socket.id, room_name, function(roomID) {
                console.log("Callback: RoomID is " + roomID);
                joinRoom();
            });
        }
    })

    $('#lobby_container').on('click', '#btn_join_game', function() {
        var roomID = $(this).data('button');
        socket.emit('join', roomID, function(data) {
            console.log("Callback: RoomID is " + data);
            joinRoom();
        });
    });

    function joinRoom() {
        $('#lobby_container').hide();
        self.state.start("Lobby");
    }

};

BasicGame.LobbyList.prototype.updatePlayer = function() {
    this.player.update();
};

BasicGame.LobbyList.prototype.onsocketConnected = function() {
    console.log("connected to server");
    // var playerName = window.prompt("Nickname?", "Jeff");
    $('#player_name_modal').modal();

    $('#player_name_modal_submit').on("click", function() {
            let player_name = $('#player_name').val();
            if (player_name) {
                socket.emit('new_player', player_name);
            }
        })
        //this.gameProperties.in_game = true;
        // send the server our initial position and tell it we are connected

};

BasicGame.LobbyList.prototype.socketActions = function() {

    var self = this;

    socket = io({ transports: ['websocket'], upgrade: false });

    //connect to server
    socket.on("connect", this.onsocketConnected);
    // all players of the room shall change state to game

    socket.on('update_rooms', function(rooms) {
        console.log("update_rooms");
        var room, key;
        $('.room_list_item').remove();
        for (key in rooms) {
            if (rooms.hasOwnProperty(key)) {
                room = rooms[key];

                //save rooms locally
                self.rooms = rooms;
                self.players_in_room = room.clients;

                addSingleRoomToList(room);
            }
        }
    });

    socket.on('debugMessage', function(msg) {
        $('#debug').append('<p>' + msg + '</p>');
    });

    function addSingleRoomToList(room) {

        console.log("addSingleRoomToList: " + room.id);
        $('#lobby_list_table').append(
            `<tr class="room_list_item">
                <td>` + room.readableName + `</td>
                <td>` + room.clients.length + `/8</td>
                <td>
                    <button id=btn_join_game data-button=` + room.id + `>Join Room</button>
                </td>
             </tr>`
        );

    }
};