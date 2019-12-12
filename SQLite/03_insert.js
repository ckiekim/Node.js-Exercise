var sqlite3 = require('sqlite3').verbose();
var file = "db/my.db";
var db = new sqlite3.Database(file);

sql = 'INSERT INTO Bbs VALUES(?, ?, ?, ?, ?);'
var id = 103;
var title = 'About SQLite3 v3';
var writer = 'SQ Lite';
var d = new Date();
var datetime = d.toLocaleString();
console.log(datetime);
var content = 'A quick brown fox jumps over the lazy dog.';

db.serialize(function(){
    var stmt = db.prepare(sql);
    stmt.run(id, title, writer, datetime, content);
    stmt.finalize();

    db.each("SELECT * FROM Bbs", function(err, row) {
        console.log(row.id, row.title, row.writer, row.datetime, row.content);
    });
});
db.close();