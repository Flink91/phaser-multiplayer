module.exports.get_random_question = function(tags, callback) {

    var mysql = require('mysql2');
    const myModule = require('./db_creds');
    var db = myModule.creds();


    var con = mysql.createConnection({
        host: db.host,
        user: db.user,
        password: db.pawd,
        database: db.db,
        "connectTimeout": 20000,
        "acquireTimeout": 20000,
        port: 3306
    });

    con.connect(function(err) {
        console.log("Connected to get question!");
        if (err) throw err;
        con.query("SELECT * FROM pkr_questions ORDER BY RAND() LIMIT 1", function(err, result, fields) {
                if (err) throw err;
                console.log("result");
                console.log(result[0]);
                callback(result[0]);
            }

        );
    });

};