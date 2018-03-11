var mysql = require('mysql');

var con = mysql.createConnection({
    host: creds.host,
    user: creds.user,
    password: creds.password,
    database: creds.db
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM pkr_questions", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});