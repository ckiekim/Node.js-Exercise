var sqlite3 = require('sqlite3').verbose();
var file = "db/my.db";
var db = new sqlite3.Database(file);

var sql = 'DELETE FROM bbs WHERE id=?';
var id = 101;
var sql2 = "SELECT id, title, writer, strftime('%m%d%H%M', timestamp, 'localtime') ts, content FROM bbs";

db.serialize(function(){
    var stmt = db.prepare(sql);
    stmt.run(id);
    stmt.finalize();

    db.each(sql2, function(err, row) {
        console.log(row.id, row.title, row.writer, row.ts, row.content);
    });
});
db.close();