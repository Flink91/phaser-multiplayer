//imagine this line
//var exports = module.exports = {};



// create_question("In which year did the first world war start?", "It started on July 28", "The war ended 1918.", "1914", "history, easy");


module.exports.create_question = function(question, tip1, tip2, solution, tags) {

    var mysql = require('mysql2');
    const myModule = require('./db_creds');
    var db = myModule.creds();

    var myTags = makeTagsObjectToString(tags);

    console.log("host: " + db.host);
    console.log("user: " + db.user);
    console.log("db: " + db.db);
    console.log("pawd: " + db.pawd);

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
        if (err) return err;
        console.log("Connected!");
        var sql = "INSERT INTO pkr_questions (question, hint1, hint2, solution, tags, upvotes, downvotes) VALUES ('" + question + "', '" + tip1 + "', '" + tip2 + "', " + solution + ", '" + myTags + "', 0, 0)";
        con.query(sql, function(err, result) {
            if (err) return err;
            console.log("Question created");
            return result;
        });
    });

    function makeTagsObjectToString(tags) {
        console.log("make tags to String:" + tags.history);

        var tagsAsString = "";

        if (tags.easy == "on") { tagsAsString = tagsAsString.concat("easy,"); }
        if (tags.medium == "on") { tagsAsString = tagsAsString.concat("medium,"); }
        if (tags.hard == "on") { tagsAsString = tagsAsString.concat("hard,"); }
        if (tags.history == "on") { tagsAsString = tagsAsString.concat("history,"); }
        if (tags.sports == "on") { tagsAsString = tagsAsString.concat("sports,"); }
        if (tags.science == "on") { tagsAsString = tagsAsString.concat("science,"); }
        if (tags.media == "on") { tagsAsString = tagsAsString.concat("media,"); }
        if (tags.funny == "on") { tagsAsString = tagsAsString.concat("funny,"); }
        if (tags.nsfw == "on") { tagsAsString = tagsAsString.concat("nsfw,"); }
        if (tags.google == "on") { tagsAsString = tagsAsString.concat("google,"); }
        if (tagsAsString.length > 0) { tagsAsString = tagsAsString.slice(0, -1); } //delete last comma

        console.log("String Result: " + tagsAsString);

        return tagsAsString;
    }
}