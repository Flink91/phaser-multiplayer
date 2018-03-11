// node module includes
var uuid = require('node-uuid');

// include our custom server configuration
var Server = require('./server.js');
var Room = require('./room.js');

var getQuestion = require('./make_new_questions/get_random_question.js');
var server = new Server();

var physicsPlayer = require('./server/playermovement.js');

var rooms = {};
var clients = {};
var player_lst = [];

//a player class in the server
var Player = function(id, room, isHost, color, name, money) {

    this.id = id;
    this.room = room;
    this.isHost = isHost;
    this.color = color;
    this.name = name;
    this.money = money;
    //We need to intilaize with true.
    this.sendData = true;
    this.dead = false;
    this.seat = 9;
}

// io connection from server.js
server.on('connection', function(socket) {

    clients[socket.id] = new Player(socket.id, null, false, '#FFFFFF', null, null);

    console.log("socket connected, new player");

    socket.emit('update_rooms', rooms);

    socket.on('join', function(roomID, callback) {
        // join existing room
        if (connectClientToRoom(roomID, socket.id, false)) {
            callback(roomID);
        }
    });

    socket.on('host', function(data, readableName, callback) {
        // create new room ID on host
        var newRoomID = uuid.v4();
        if (connectClientToRoom(newRoomID, socket.id, true, readableName)) {
            callback(newRoomID);
        }
    });

    socket.on('chatMessage', function(msg) {
        // find out which room the client is in
        var room = findRoomByID(socket.id, rooms);

        server.sockets.in(room.id).emit('addChatMessage', msg, socket.id, clients[socket.id].color);


    });

    socket.on('create_game', function(hostID) {
        //find room of host
        var room = findRoomByID(hostID, rooms);

        console.log("Host ID: " + hostID);
        console.log("Room ID: " + room.id);
        //send that room the game_started_by_host
        server.sockets.in(room.id).emit('game_started_by_host');

    });

    socket.on('get_question', function(hostID) {
        var room = findRoomByID(hostID, rooms);
        getQuestion.get_random_question('put tags here', function(result) {
            console.log("Question: ");
            console.log(result.question);
            server.sockets.in(room.id).emit('get_question', result);
        });

    });

    // listen for disconnection; 
    socket.on('disconnect', onClientdisconnect, { id: socket.id });
    // listen for new player
    socket.on("new_player", onNewplayer);
    //tell client who is in the room
    socket.on("get_people_in_room", getPeopleInRoom);

    function getPeopleInRoom(clientID) {

        var room = findRoomByID(clientID, rooms);
        console.log("room");
        console.log(room);
        if (room != null) {
            server.sockets.in(room.id).emit('get_room_info', room);
        }
    }

    function connectClientToRoom(roomID, clientID, isHost, readableName) {
        // if the client is already a host, or already connected to a room
        if (clients[clientID].isHost || clients[clientID].room) {
            return false;
        }

        socket.join(roomID, function(err) {
            if (!err) {

                clients[socket.id].isHost = isHost;
                clients[socket.id].room = roomID;

                if (isHost) {
                    rooms[roomID] = new Room(roomID, clients[clientID], readableName);
                    broadcastDebugMsg(clients[clientID].name + ' has created room: ' + rooms[roomID].readableName);
                } else {
                    rooms[roomID].addClient(clients[clientID]);
                    broadcastDebugMsg(clients[clientID].name + ' has joined room: ' + rooms[roomID].readableName);

                }

                server.sockets.emit('update_rooms', rooms);
                getPeopleInRoom(clientID, roomID);
            } else {
                // handle error message
                broadcastDebugMsg(socket.id + ' FAILED to join room: ' + roomID);
            }
        });

        return true;
    }

    function findRoomByID(clientID, rooms) {
        console.log("findroombyid");
        var key, room;
        for (key in rooms) {
            if (rooms.hasOwnProperty(key)) {
                room = rooms[key];
                //if (room.hostID === hostID) {
                //    return room;
                //}

                for (var i = 0; i < room.clients.length; i++) {

                    if (room.clients[i].id === clientID) {
                        return room;
                    }
                }
            }
        }
        return null;
    }

    // when a new player connects, we make a new instance of the player object,
    // and send a new player message to the client. 
    function onNewplayer(playerName) {
        broadcastDebugMsg(playerName + ' has joined the server');

        clients[socket.id].name = playerName;
        console.log("new player has name now: ");
        console.log(clients[socket.id]);
        //new player instance
        player_lst.push(clients[socket.id]);

    }

    //call when a client disconnects and tell the clients except sender to remove the disconnected player
    function onClientdisconnect(data) {
        console.log('disconnect');

        var removePlayer = find_playerid(this.id);

        if (removePlayer) {
            player_lst.splice(player_lst.indexOf(removePlayer), 1);
        }

        if (clients[socket.id].isHost) {
            var room = findRoomByID(socket.id, rooms);
            delete rooms[room.id];
            server.sockets.emit('update_rooms', rooms);
        }

        broadcastDebugMsg(clients[socket.id].name + ' has disconnected from the server');
        console.log("removing player " + clients[socket.id].name);
        delete clients[socket.id];



        //send message to every connected client except the sender
        this.broadcast.emit('remove_player', { id: this.id });

    }

    // find player by the the unique socket id 
    function find_playerid(id) {
        for (var i = 0; i < player_lst.length; i++) {

            if (player_lst[i].id == id) {
                return player_lst[i];
            }
        }

        return false;
    }

    function broadcastDebugMsg(msg) {
        server.sockets.emit('debugMessage', msg);
    }

});