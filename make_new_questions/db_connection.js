var mysql = require('mysql');

var con = mysql.createConnection({
    host: creds.host,
    user: creds.user,
    password: creds.pawd
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});