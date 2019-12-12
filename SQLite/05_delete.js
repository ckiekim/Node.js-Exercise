var sqlite3 = require('sqlite3').verbose();
var file = "db/my.db";
var db = new sqlite3.Database(file);

sql = 'DELETE FROM Bbs WHERE id=?;'
var id = 101;

db.serialize(function(){
    var stmt = db.prepare(sql);
    stmt.run(id);
    stmt.finalize();

    db.each("SELECT * FROM Bbs", function(err, row) {
        console.log(row.id, row.title, row.writer, row.datetime, row.content);
    });
});
db.close();