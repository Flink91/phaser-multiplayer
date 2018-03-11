var mysql = require('mysql');

var con = mysql.createConnection({
    host: creds.host,
    user: creds.user,
    password: creds.pawd,
    database: creds.db
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
        "CREATE TABLE pkr_questions (id INT AUTO_INCREMENT PRIMARY KEY, question VARCHAR(255), tip1 VARCHAR(255), tip2 VARCHAR(255), solution INT, tags VARCHAR(255), upvotes INT, downvotes INT)";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});