var path = require('path');

// use express to initialize a function handler to be passed to a new node HTTP server
process.env.PORT = process.env.PORT || 2000;

var Server = function() {
    var express = require('express');

    var app = express();
    var http = require('http').Server(app);

    var bodyParser = require('body-parser');

    var io = require('socket.io')(http);

    var db = require("./make_new_questions/insert_question_into_db.js");

    app.use('/client', express.static(__dirname + '/client'));
    app.use('/make_new_questions', express.static(__dirname + '/make_new_questions'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });
    app.get('/play', function(req, res) {
        res.sendFile(__dirname + '/client/index.html');
    });

    app.get('/new_question', function(req, res, next) {
        res.sendFile(__dirname + '/make_new_questions/create_question.html');
    });

    app.post('/new_question', (req, res, next) => {
        console.log(req.body);
        var tags = {
            easy: req.body.easy,
            medium: req.body.medium,
            hard: req.body.hard,
            history: req.body.history,
            sports: req.body.sports,
            science: req.body.science,
            media: req.body.media,
            funny: req.body.funny,
            nsfw: req.body.nsfw,
            google: req.body.google
        }

        var db_answer = db.create_question(req.body.question, req.body.tip1, req.body.tip2, req.body.solution, tags);

        res.send("It worked!");
    });

    // app.post('/new_question', function(req, res) {
    //     console.log('req.body');
    //     console.log(req.body);

    //     if (false) {
    //         console.log("Creating question...");
    //         db.create_question(req.body.question, req.body.tip1, req.body.tip2, req.body.solution, req.body.tags);
    //         res.sendFile(__dirname + '/make_new_questions/question_created.html');
    //     }

    // });


    // listen on port 3000 for user connections
    //app.listen(process.env.PORT);
    http.listen(process.env.PORT, function() {
        console.log('listening on *:' + process.env.PORT);
    });

    // all we need is the io handle for client sever communication - encapsulate the rest
    return io;
};

module.exports = Server;