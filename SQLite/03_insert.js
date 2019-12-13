var sqlite3 = require('sqlite3').verbose();
var file = "db/my.db";
var db = new sqlite3.Database(file);

var sql = "INSERT INTO bbs(id, title, writer, content) VALUES(101, 't1', 'w1', 'content 1')";
db.run(sql);

sql = 'INSERT INTO bbs(title, writer, content) VALUES(?, ?, ?)';
var title = 'About SQLite3 v3';
var writer = 'DB Lee';
var content = 'A quick brown fox jumps over the lazy dog.';
db.serialize(function() {
    var stmt = db.prepare(sql);
    stmt.run(title, writer, content);
    stmt.finalize();

    db.each("SELECT * FROM Bbs", function(err, row) {
        console.log(row.id, row.title, row.writer, row.timestamp, row.content);
    });
});
db.close();