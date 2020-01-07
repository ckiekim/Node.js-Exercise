var sqlite3 = require('sqlite3').verbose();
var file = "db/my.db";
var db = new sqlite3.Database(file);

/* var sql = "INSERT INTO bbs2(id, title, writer, content) VALUES(100, 't1', 'w1', 'content 1')";
db.run(sql);
sql = "delete from bbs2 where id=100";
db.run(sql);

sql = 'INSERT INTO bbs2(title, writer, content) VALUES(?, ?, ?)';

db.serialize(function() {
    var stmt = db.prepare(sql);
    for (let i=101; i<106; i++) {
        stmt.run(`title${i}`, `writer${i}`, `content${i}`);
    }
    stmt.finalize();

    let sql_ts = "SELECT id, title, writer, strftime('%m-%d %H:%M', timestamp, 'localtime') ts, hit, content FROM bbs2";
    db.each(sql_ts, function(err, row) {
        console.log(row.id, row.title, row.writer, row.ts, row.hit);
    });
}); */

function incHit(id) {
    db.serialize(function() {
        let incSql = 'update bbs2 set hit=(select hit from bbs2 where id=?)+1 where id=?';
        var stmt = db.prepare(incSql);
        stmt.run(id, id);
        stmt.finalize();

        let sql_ts = "SELECT id, title, writer, strftime('%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs2 where id=?";
        stmt = db.prepare(sql_ts);
        stmt.get(id, function(err, row) {
            console.log(row);
        });
        stmt.finalize();
    });
}

incHit(103);
db.close();