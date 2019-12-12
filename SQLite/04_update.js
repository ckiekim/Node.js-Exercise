var sqlite3 = require('sqlite3').verbose();
var file = "db/my.db";
var db = new sqlite3.Database(file);

sql = 'UPDATE Bbs SET datetime=? WHERE id=?;'
var id = 102;
var d = new Date();
var datetime = d.toLocaleString();
//console.log(datetime);

db.serialize(function(){
    var stmt = db.prepare(sql);
    stmt.run(datetime, id);
    stmt.finalize();

    db.each("SELECT * FROM Bbs", function(err, row) {
        console.log(row.id, row.title, row.writer, row.datetime, row.content);
    });
});
db.close();